<template>
    <div class="fd-c g-1">
        <div v-for="(e, i) in pages" class="b-blue-grey bg-blue-grey-l2 tx-black p-1 br-5">
 <form-page :e="e" />           
        </div>

        -----new
        <div class="jc-c fs-15 j-click">
            <i class="fa-solid fa-circle-plus" @click="addNew = true"></i>
        </div>
    </div>
</template>

<script>
//todo rm after use Form Pade
import { fetchFile } from "../utils/helpers.js";
import FormPage from "./FormPage.vue";

export default {
    components: {
        "form-page": FormPage,
    },

    data() {
        return {
            title: __('Page Management'),
            current: 9999,
            current: 0, //dev
            tabs: [__("Meta"), __("Style")],
            tab_current: 0,
            pages: [],
            addNew: false,
            newItem: {},
        };
    },
    methods: {
        edit(i) {
            console.log("i: ", i);
            //some more options will be added

            if (this.current !== i) {
                this.current = i;
            } else {
                this.current = 9999;
            }
        },
        del(i) { },
        //todo, keep commented
        // pageJson() {
        //     return JSON.stringify(this.page);
        // },
        // sectionId(i) {
        //     return "section-" + (i + 1);
        // },
    },
    async mounted() {
        const site = window.location.origin;

        const path = `${site}/data/pages_list.json`; //permanent file, not dynamic

        let pages = await fetchFile(path);
        console.log("pages in JetPages --------------- ", pages);
        //prevent error
        if (pages) {
            this.pages = pages;
        }
    },
};
</script>
