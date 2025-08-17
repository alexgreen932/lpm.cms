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
                            <i v-if="ops.current_page !== e.slug" class="fa-solid fa-pen-to-square j-click"></i>
                            <i v-if="ops.current_page == e.slug" class="fa-solid fa-xmark j-click"></i>
                        </span>
                        <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
                    </span>
                </h4>
                <div v-if="ops.current_page == e.slug">
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
            //check if current changed
            if (this.isDataChanged(slug)) {
                this.loadCurentData(slug);
            } else {
                return;
            }
            //set necessary data
            if (this.ops.current_page !== slug) {
                this.$root.reset();
                this.ops.current_page = slug;
                this.ops.current = 'pages';//?? rm
                this.ops.current_menu = 'pages';
            } else {
                this.$root.reset();
                this.ops.current_page = 99;
                // this.ops.current = 'pages';//?? rm
                this.ops.current_menu = 'pages';
            }


        },
        async loadCurentData(slug) {
            this.ops.current_page_data = await fetchFile(`${this.$domain}/data/${slug}.json`);
        },
        async isDataChanged(slug) {
            let saved = await fetchFile(`${this.$domain}/data/${slug}.json`);
            saved = JSON.stringify();//saved in starage
            let current = JSON.stringify(this.ops.current_page_data);//data loaded in current_page_data
            if (saved == current) {
                return true;
            } else {
                const result = confirm(this.$__('Current page had been changed, all unsaved data will be lost! Are you sure you want to leave this page without saving?'));
                if (result) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        //todo add confirm
        del(i) {
            console.log("Delete page at index:", i);
            // implement your delete logic
        },
    },

    //todo rm pages_list replacing it with fetching json datas
    //todo!!! rm pages_list.json from save page as it's not used anymore
    async mounted() {
        //dev only for html, for php use index.php
        // let file = 'index.php';
        let file = 'index.json';
        try {
            const pages = await fetchFile(`${this.$domain}/data/${file}`);
            if (pages) this.pages = pages;
        } catch (e) {
            console.error("Failed to load pages list", e);
        }
        console.log('this.pages: ', this.pages);
    },

};
</script>
