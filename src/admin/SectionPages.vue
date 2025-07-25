<template>
    <div class="fd-c g-1">
        <div v-for="(e, i) in pages" :key="i" class="b-blue-grey bg-blue-grey-l2 tx-black p-1 br-5">
            <h5 class="m-0 jc-b ai-c">
                <span>{{ e.title }} --- {{ e.slug }} -- {{ current }}</span>
                <span class="fs-10 g-1">
                    <i v-if="current !== i" class="fa-solid fa-pen-to-square j-click" @click="edit(i)"></i>
                    <i v-else class="fa-solid fa-xmark j-click" @click="edit(i)"></i>
                    <!-- homepage never delete -->
                    <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
                </span>
            </h5>

            <!-- Show form only when correct page is active and pageData loaded -->
             <!-- ----{{i}}---{{pageData}} -->
            <div v-if="current === i && pageData" class="form-inner">
                <jet-form formstyle="side" :obj="pageData" :fields="fields_page" />
                <save-form :obj="pageData" :target="e.slug" />
            </div>
        </div>

        ---new
        <div class="jc-c fs-15 j-click">
            <i class="fa-solid fa-circle-plus" @click="addNew = true"></i>
        </div>
    </div>
</template>

<script>
import { fetchFile } from "../utils/helpers.js";
import JetForm from "../form/JetForm.vue";
import SaveForm from './SaveForm.vue';

export default {
    components: {
        "jet-form": JetForm,
        "save-form": SaveForm ,
    },

    data() {
        return {
            fields_page: [
                { title: this.$__('Page Title'), key: 'title' },
                { title: this.$__('Url'), key: 'slug' },
                { title: this.$__('Meta Title'), key: 'meta_title' },
                { title: this.$__('Meta Description'), key: 'meta_description' },
            ],
            current: null,     // which index is being edited
            // current: 0,     // dev
            pages: [],         // list of pages
            pageData: null,    // JSON for current page
            addNew: false,
            newItem: {},
        };
    },

    methods: {
        async edit(i) {
            // If clicked on the same page -> close it
            if (this.current === i) {
                this.current = null;
                this.pageData = null;
                return;
            }

            // Set current and fetch JSON
            this.current = i;
            this.pageData = null; // reset to avoid old data flashing

            const slug = this.pages[i].slug;
            try {
                const page = await fetchFile(`${this.$domain}/data/${slug}.json`);
                this.pageData = page || {}; // fallback empty object if null
            } catch (e) {
                console.error(`Failed to load ${slug}.json`, e);
                this.pageData = {}; // fallback on error
            }
        },

        del(i) {
            console.log("Delete page at index:", i);
            // implement your delete logic
        },
    },

    async mounted() {
        try {
            const pages = await fetchFile(`${this.$domain}/data/pages_list.json`);
            if (pages) this.pages = pages;
        } catch (e) {
            console.error("Failed to load pages list", e);
        }
    },
};
</script>
