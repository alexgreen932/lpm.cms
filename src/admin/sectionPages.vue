<template>
  <div class="control-section fd-c g-05">
    <h3>{{ $__('Pages') }}</h3>

    <!-- List all pages; show either the whole list (no page open) or only the opened page -->
    <template v-for="(e, i) in pages" :key="e.slug || i">
      <div v-if="showPage(e.slug)" class="d-block tx-black p-05 br-5">
        <h4 class="m-0 jc-b ai-c">
          <span>{{ e.title }}</span>

          <span class="fs-10 g-1">
            <!-- Toggle open/close this page -->
            <span @click="switch_page(e.slug)">
              <i v-if="ops.current_page !== e.slug" class="fa-solid fa-pen-to-square j-click"></i>
              <i v-else class="fa-solid fa-xmark j-click"></i>
            </span>

            <!-- Delete (example) -->
            <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
          </span>
        </h4>

        <!-- Show page form only when this page is open -->
        <div v-if="ops.current_page === e.slug">
          <field-tip :fields="null" v-model="tip" />
          <!-- page settings - meta, dotmenu -->
          <div class="b-blue fs-8 jc-c br-4 j-click" @click="$root.reset(), ops.page_settings = !ops.page_settings">
            <template v-if="!ops.page_settings">
              {{ $__('Page Settings') }}
            </template>
            <template v-if="ops.page_settings">
              {{ $__('Close') }}
            </template>

          </div>

          <jet-form v-if="ops.page_settings" :obj="ops.current_page_data" cls="bg-white" :fields="fields_meta" />
        </div>
      </div>
    </template>


    <!-- <new-page :pages="pages" /> -->
  </div>
</template>

<script>
/**
 * Component: Pages Control
 *
 * Responsibilities:
 * 1) Render a list of pages (from /data/*.json or /data/index.json).
 * 2) Open a page (loads {slug}.json into ops.current_page_data, hides the list).
 * 3) Close a page (shows the list again).
 * 4) Before switching/closing, if the currently open page differs from its saved JSON file,
 *    ask for confirmation to avoid losing changes.
 *
 * Rules:
 * - "No page open" state is represented by ops.current_page === 99.
 * - Opening a page sets ops.current_page = slug and loads ops.current_page_data from {slug}.json.
 * - Closing a page sets ops.current_page = 99 and clears ops.current_page_data.
 *
 * Key helpers:
 * - showPage(slug) → controls visibility of list vs. open page.
 * - switch_page(slug) → central toggler to open/close with confirm if needed.
 * - hasUnsavedChanges(currentSlug) → deep-compare live data with saved file.
 * - stableStringify() → deterministic stringify for deep comparison.
 */

import { ops } from '../data/data.js';
import { fetchFile } from "../utils/helpers.js";

import JetForm from "../form/jetForm.vue";
import SaveForm from './SaveForm.vue';
import newPage from './newPage.vue';
import fieldTip from '../form/fields/field-tip.vue';
import jetForm from '../form/jetForm.vue';

export default {
  components: {
    "jet-form": JetForm,
    "save-form": SaveForm,
    newPage,
    jetForm,
    fieldTip,
  },

  data() {
    return {
      tip: 'edit_page',
      ops,
      pages: [], // list of { title, slug }
      fields_meta: [
        { title: this.$__('Page Title'), tip: this.$__('This adds a Dotted Menu Between Sections. Menu Item Titles should be added → Section Edit ->Title'), key: 'title', },
        { title: this.$__('Meta Title'), key: 'meta_title', },
        { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
        { title: this.$__('Add Dotted Menu'), key: 'dot_menu', type: 'checkbox' },
        // { title: this.$__('Atem Align'), key: 'ai', type: 'input' },
      ],
    };
  },

  methods: {
    /**
     * UI visibility:
     * - When no page is open (ops.current_page === 99), show ALL items.
     * - When a page is open, show ONLY that page’s card.
     */
    showPage(slug) {
      return this.ops.current_page === 99 || this.ops.current_page === slug;
    },

    /**
     * Toggle open/close for a page by slug.
     * Behavior:
     * - If some page is open (ops.current_page !== 99), check for unsaved changes.
     *   If changed and user cancels → abort.
     * - If clicking the SAME slug that’s open → close it (return to list).
     * - If clicking a different slug → open that page (after change check).
     */
    async switch_page(slug) {
      const isSomeOpen = this.ops.current_page !== 99;
      const clickingSame = this.ops.current_page === slug;

      // If something is open, protect against losing unsaved changes
      if (isSomeOpen) {
        const changed = await this.hasUnsavedChanges(this.ops.current_page);
        if (changed) {
          const ok = confirm(
            this.$__(
              'Current page had been changed, all unsaved data will be lost! Are you sure you want to leave this page without saving?'
            )
          );
          if (!ok) return; // user canceled
        }
      }

      // Close if clicking the same page; otherwise open the requested one
      if (clickingSame) {
        this.$root.reset?.();
        this.ops.current_page = 99;
        this.ops.current_menu = 'pages';
        this.ops.current_page_data = null;
      } else {
        await this.loadCurrentData(slug);
        this.$root.reset?.();
        this.ops.current_page = slug;
        this.ops.current_menu = 'pages';
      }
    },

    /**
     * Load the selected page JSON into ops.current_page_data.
     * If fetch fails, set it to an empty object to avoid undefined usage.
     */
    async loadCurrentData(slug) {
      try {
        const data = await fetchFile(`${this.$domain}/data/${slug}.json`);
        this.ops.current_page_data = data || {};
      } catch (e) {
        console.warn('Failed to load page data for', slug, e);
        this.ops.current_page_data = {};
      }
    },

    /**
     * Check if the currently open page (by slug) has diverged from disk.
     * Returns true if CHANGED (unsaved), false if identical or nothing is open.
     */
    async hasUnsavedChanges(currentSlug) {
      if (currentSlug === 99) return false; // nothing open
      // No live data means “not changed” (nothing to lose)
      if (!this.ops.current_page_data || typeof this.ops.current_page_data !== 'object') {
        return false;
      }

      const saved = await fetchFile(`${this.$domain}/data/${currentSlug}.json`);
      if (!saved || typeof saved !== 'object') {
        // If we can’t read the saved file, treat as changed to be safe.
        return true;
      }

      return !this.deepEqual(saved, this.ops.current_page_data);
    },

    /**
     * Deep equality using deterministic stringify (sorted keys).
     */
    deepEqual(a, b) {
      return this.stableStringify(a) === this.stableStringify(b);
    },

    /**
     * Deterministic JSON stringify:
     * - Recursively sorts object keys so ordering differences don’t cause false negatives.
     * - Leaves arrays in their natural order.
     */
    stableStringify(value) {
      const seen = new WeakSet();

      const sorter = (v) => {
        if (v && typeof v === 'object') {
          if (seen.has(v)) return null; // prevent cycles (shouldn’t occur for your data)
          seen.add(v);

          if (Array.isArray(v)) {
            return v.map(sorter);
          }

          const obj = {};
          Object.keys(v)
            .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
            .forEach((k) => {
              obj[k] = sorter(v[k]);
            });
          return obj;
        }
        return v;
      };

      return JSON.stringify(sorter(value));
    },

    /**
     * Delete page handler (placeholder).
     */
    del(i) {
      console.log('Delete page at index:', i);
      // Implement your delete logic (server call + refresh pages).
    },
  },

  /**
   * On mount, load the list of pages from /data/index.json (or index.php in PHP mode).
   */
  async mounted() {
    // For dev JSON:
    const file = 'index.json';
    // For server-side PHP: const file = 'index.php';

    try {
      const pages = await fetchFile(`${this.$domain}/data/${file}`);
      if (Array.isArray(pages)) this.pages = pages;
    } catch (e) {
      console.error('Failed to load pages list', e);
    }
  },
};
</script>
