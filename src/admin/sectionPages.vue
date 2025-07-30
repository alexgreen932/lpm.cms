<!-- todo!!! remove pageData then from here, do all in poageForms -->

<template>
    <div class="control-section fd-c g-05">
        <h3>{{$__('Pages')}}</h3>
        <template v-for="(e, i) in pages" :key="i">
            <!-- page index --- {{ ops.page_index }}
            <br>ind {{ i }}--{{ showPage(i,e) }} sec --- {{ ops.current_section }} el --{{
                ops.current_el }} -->
            <div v-if="showPage(i,e)" class="d-block tx-black p-05 br-5">
                <h4 class="m-0 jc-b ai-c">
                    <span>{{ e.title }}</span>
                    <span class="fs-10 g-1">
                        <i v-if="ops.page_index !== i" class="fa-solid fa-pen-to-square j-click"
                            @click="switch_page(i, e)"></i>
                        <i v-else class="fa-solid fa-xmark j-click" @click="switch_page(i,e)"></i>
                        <!-- homepage never delete -->
                        <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
                    </span>
                </h4>
                <div v-if="ops.page_index == i">
                    switch_page
                    <page-forms />
                </div>
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
            ops: ops,     // which index is being switch_pageed
            // ops.page_index: 0,     // dev
            pages: [],         // list of pages
            pageData: null,    // JSON for current page
            addNew: false,
            newItem: {},
        };
    },

    methods: {
        showPage(i, e) {
            // return true;

            let out = true;
            if (this.ops.page_index !== 999) {
                console.log('used index');
                if (this.ops.page_index == i && this.ops.current_page == e.slug) {
                    out = true;
                } else {
                    out = false;
                }

            }
            return out;
        },
        //todo!! rm as all now in pageForms
        switch_page(i, e) {
            console.log('switch page func, current slug', e.slug);
            //set necessary data

            //todo rm all in page forms
            // If clicked on the same page -> close it
            if (this.ops.page_index !== i) {
                this.$root.reset();
                this.ops.current_page = e.slug;
                this.ops.current = 'pages';
                this.ops.current_menu = 'pages';
                this.ops.page_index = i;
            } else {
                //reset to home
                this.$root.reset();
                this.ops.current_page = 'homepage';
                this.ops.page_index = 999;

            }
        },
        //todo!! rm as all now in pageForms
        // async switch_page(i) {
        //     //set necessary data
        //     this.$root.reset();
        //     this.ops.current_page = e.slug;
        //     this.ops.current = 'pages';
        //     this.ops.current_menu = 'pages';
        //     //todo rm all in page forms
        //     // If clicked on the same page -> close it
        //     if (this.ops.page_index == i) {
        //         this.ops.page_index = 999;
        //         this.pageData = null;//??
        //         return;
        //     }

        //     // Set ops.page_index and fetch JSON
        //     this.ops.page_index = i;
        //     this.pageData = null; // reset to avoid old data flashing

        //     //?? rm
        //     const slug = this.pages[i].slug;
        //     try {
        //         const page = await fetchFile(`${this.$domain}/data/${slug}.json`);
        //         this.pageData = page || {}; // fallback empty object if null
        //     } catch (e) {
        //         console.error(`Failed to load ${slug}.json`, e);
        //         this.pageData = {}; // fallback on error
        //     }
        // },

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
