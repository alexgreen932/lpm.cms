<!-- todo!!! remove pageData then from here, do all in poageForms -->

<template>
    <div class="control-section fd-c g-05">
        <h3>{{ $__('Pages') }}</h3>
        <template v-for="(e, i) in pages" :key="i">
            <!-- page index --- {{ ops.page_index }}
            <br>ind {{ i }}--{{ showPage(i,e) }} sec --- {{ ops.current_section }} el --{{
                ops.current_el }} -->
            <div v-if="showPage(e.slug)" class="d-block tx-black p-05 br-5">


                <h4 class="m-0 jc-b ai-c">
                    <span>{{ e.title }}</span>
                    <span class="fs-10 g-1">
                        <span @click="switch_page(e.slug)">
                            <i v-if="ops.current_page !== e.slug" class="fa-solid fa-pen-to-square j-click""></i>
                            <i v-if="ops.current_page == e.slug" class="fa-solid fa-xmark j-click"></i>
                        </span>
                        <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
                    </span>
                </h4>
                <div v-if="ops.page_index == i">
                    <field-tip fields="null" v-model="tip" />
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
import newPage from './newPage.vue';
import pageForms from './pageForms.vue';
// import jetTip from '../utils/jetTip.vue';
import fieldTip from '../form/fields/field-tip.vue';

export default {
    components: {
        "jet-form": JetForm,
        "save-form": SaveForm,
        newPage,
        pageForms,
        fieldTip,
    },
    // props:['ops', ''],

    data() {
        return {
            tip: 'edit_page',
            fields_page: [
                { title: this.$__('Page Title'), key: 'title' },
                { title: this.$__('Meta Title'), key: 'meta_title' },
                { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
                { title: this.$__('Image'), key: 'img', type: 'media' },
            ],
            ops, 
            // ops.page_index: 0,     // dev
            pages: [],         // list of pages
            pageData: null,    // JSON for current page
            addNew: false,
            newItem: {},
        };
    },

    methods: {
        showPage(slug) {
            // console.log('slug: ', slug);
            let out = true;
            //todo maybe ro page_index
            if (this.ops.current_page !== 99) {
                console.log('used index');
                if (this.ops.current_page == slug) {
                    out = true;
                } else {
                    out = false;
                }

            }
            // console.log('out: ', out);
            return out;
        },
        //todo!! rm as all now in pageForms
        switch_page(slug) {
            console.log('clicked');
            console.log('switch slug------', slug);
            //set necessary data
            // if (this.ops.current_page !== slug) {
            //     this.$root.reset();
            //     this.ops.current_page = slug;
            //     this.ops.current = 'pages';//?? rm
            //     this.ops.current_menu = 'pages';
            // } else {
            //     this.$root.reset();
            //     this.ops.current_page = 99;
            //     // this.ops.current = 'pages';//?? rm
            //     this.ops.current_menu = 'pages';
            // }

            //todo rm all in page forms
            // If clicked on the same page -> close it
            // if (this.ops.page_index !== i) {
            //     this.$root.reset();
            //     this.ops.current_page = e.slug;
            //     this.ops.current = 'pages';
            //     this.ops.current_menu = 'pages';
            //     this.ops.page_index = i;
            // } else {
            //     //reset to home
            //     this.$root.reset();
            //     this.ops.current_page = 'homepage';
            //     this.ops.page_index = 999;

            // }
            // this.switch_page();
        },
        // switch_page(e.slug) {
        //     console.log('switch page func, current slug', e.slug);
        //     //set necessary data

        //     //todo rm all in page forms
        //     // If clicked on the same page -> close it
        //     if (this.ops.page_index !== i) {
        //         this.$root.reset();
        //         this.ops.current_page = e.slug;
        //         this.ops.current = 'pages';
        //         this.ops.current_menu = 'pages';
        //         this.ops.page_index = i;
        //     } else {
        //         //reset to home
        //         this.$root.reset();
        //         this.ops.current_page = 'homepage';
        //         this.ops.page_index = 999;

        //     }
        //     // this.switch_page();
        // },
        //todo!! rm as all now in pageForms
        // async switch_page(slug) {
        //     //set necessary data
        //     // this.$root.reset();
        //     // this.ops.current_page = e.slug;
        //     // this.ops.current = 'pages';
        //     // this.ops.current_menu = 'pages';
        //     //todo rm all in page forms
        //     // If clicked on the same page -> close it
        //     // if (this.ops.page_index == i) {
        //     //     this.ops.page_index = 999;
        //     //     this.pageData = null;//??
        //     //     return;
        // },

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

        //todo add confirm
        del(i) {
            console.log("Delete page at index:", i);
            // implement your delete logic
        },
    },

    //todo rm pages_list replacing it with fetching json datas
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
