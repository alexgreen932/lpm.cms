<!-- todo!!! remove pageData then from here, do all in poageForms -->

<template>
    <div class="fd-c g-05">
        <template v-for="(e, i) in pages" :key="i">
            ind {{ i }}--{{ showPage(i) }} sec --- {{ ops.current_section }} el --{{ ops.current_el }}
            <div v-if="showPage(i)" class="d-block tx-black p-05 br-5">
                <h4 class="m-0 jc-b ai-c">
                    <span>{{ e.title }}</span>
                    <span class="fs-10 g-1">
                        <i v-if="ops.page_id !== i" class="fa-solid fa-pen-to-square j-click" @click="edit(i)"></i>
                        <i v-else class="fa-solid fa-xmark j-click" @click="edit(i)"></i>
                        <!-- homepage never delete -->
                        <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
                    </span>
                </h4>
                 <!-- <page-forms /> -->

                <!-- Show form only when correct page is active and pageData loaded -->
                <!-- ----{{i}}---{{pageData}} -->
                 <!-- // OPTIMIZE IT FOR EASY OPEN META -->
                <transition name="fade">
                    <template v-if="ops.current_section == null && ops.current_el == null">
                        <div v-if="ops.page_id === i && pageData" class="block-inner">
                            <jet-form formstyle="small-transparent" :obj="pageData" :fields="fields_page" />
                            <save-form :obj="pageData" :slug="e.slug" />
                        </div>
                    </template>

                </transition>
                <transition name="fade">
                    <!-- <template v-if="ops.current_section !== null && ops.current_el !== null"> -->
                       
                    <!-- </template> -->

                </transition>
            </div>
        </template>
        <new-page :pages="pages" />
    </div>
</template>

<script>
import { ops } from '../data/data.js';
import { fetchFile } from "../utils/helpers.js";
import JetForm from "../form/jetForm.vue";
import SaveForm from './SaveForm.vue';
import NewPage from './NewPage.vue';
import pageForms from './pageForms.vue';

export default {
    components: {
        "jet-form": JetForm,
        "save-form": SaveForm,
        "new-page": NewPage,
        pageForms,
    },
    // props:['ops', ''],

    data() {
        return {
            fields_page: [
                { title: this.$__('Page Title'), key: 'title' },
                // { title: this.$__('Url'), key: 'slug' },
                { title: this.$__('Meta Title'), key: 'meta_title' },
                { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
                { title: this.$__('Image'), key: 'img', type: 'media' },
            ],
            ops: ops,     // which index is being edited
            // ops.page_id: 0,     // dev
            pages: [],         // list of pages
            pageData: null,    // JSON for current page
            addNew: false,
            newItem: {},
        };
    },

    methods: {
        showPage(i) {
            return true;
          
            let out = true;
            console.log('i: ', i);
            console.log('this.ops.page_id: ', this.ops.page_id);
            if (this.ops.page_id) {
                if (this.ops.page_id == i) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        //todo!! rm as all now in pageForms
        async edit(i) {
            // If clicked on the same page -> close it
            if (this.ops.page_id === i) {
                this.ops.page_id = null;
                this.pageData = null;
                return;
            }

            // Set ops.page_id and fetch JSON
            this.ops.page_id = i;
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
