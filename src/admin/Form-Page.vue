<template>
    <div class="b-blue-grey bg-blue-grey-l2 tx-black p-1 br-5">
        <h5 class="m-0 jc-b ai-c">
            <span>{{ e.title }} --- {{ i }} --{{ current }}</span>
            <span class="fs-10 g-1">
                <i v-if="this.current !== i" class="fa-solid fa-pen-to-square j-click" @click="edit(i)"></i>
                <i v-if="this.current == i" class="fa-solid fa-xmark j-click" @click="edit(i)"></i>
                <!-- homepage never delete -->
                <i v-if="i !== 0" class="fa-solid fa-trash j-click" @click="del(i)"></i>
            </span>
        </h5>

        <div v-if="this.current == i" class="form-inner">
            <div class="wc-1-2 fd-r">
                <div v-for="(tab, i2) in tabs" class="admin-tab" :class="$isActive(tab_current, i2)"
                    @click="tab_current = i2">
                    {{ tab }}
                </div>
            </div>
            <jet-form v-if="tab_current == 0" formtyle="side" title="Edit Meta" :obj="e" :fields="[
                { title: 'Page Title', key: 'title' },
            ]" />
            <jet-form v-if="tab_current == 1" formtyle="side" title="Edit Style" />
        </div>
    </div>
</template>

<script>
import { fetchFile } from "../utils/helpers.js";
import JetForm from "../form/jetForm.vue";

export default {
    components: {
        "jet-form": JetForm,
    },
    props: ['e'],
    data() {
        return {
            current: 9999,
            current: 0, //dev
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
