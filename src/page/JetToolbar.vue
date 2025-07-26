<template>
    <div class="form-toolbar" :class="cls">
        <i class="fa-solid fa-pen-to-square" @click="editItem(index)"></i>
        <i v-if="notFirst(index)" class="fa-solid fa-angle-up" @click="moveItem(index, index - 1)"></i>
        <i v-if="notLast(index)" class="fa-solid fa-angle-down" @click="moveItem(index, index + 1)"></i>
        <i class="fa-solid fa-trash" @click="del(index)"></i>
        <i class="fa-solid fa-plus" @click="addItem(index)"></i>
    </div>
</template>

<script>
// import { ops } from "../data/data.js";
// import JetForms from "./JetForms.vue";

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};

//RM
const newItem = {
    edit: false,
    w: "w-container",
    bg: "bg-white",
    p: "p-1",
    img: null,
    ib: null, //image-blur
    i0: null, //image-opacity
    col: "tx-gray-d3",
    jc: "jc-c",
    ai: "ai-c",
    g: "g-1",
    fd: "fd-c",
    fd: "fd-c",
    content: [],
};

import { ops } from '../data/data.js';

export default {
    // components: {
    //     "jet-forms ": JetForms,
    // },
    //   cls="section"
    //         :elements="page.sections"
    //         :section="i"
    //         :element=null 
    //section optionally
    props: ["elements", "index", "cls", "sec"],
    data() {
        return {
            ops: ops,
            isAdmin: true,
            add: false,
        };
    },
    methods: {
        editItem(i) {
            // this.$root.ops.current = "pages";
            // this.$root.ops[]= "pages";
            this.ops.current = "pages";
            switch (this.cls) {
                case 'section':
                    this.ops.current_section = this.index;
                    this.ops.current_el = null;
                    break;

                default:
                    break;
            }


        },
        notFirst(i) {
            //
            if (i !== 0) {
                return true;
            }
        },
        notLast(i) {
            let num = this.elements.length - 1;

            if (i !== num) {
                return true;
            }
        },
        moveItem(from, to) {
            this.elements.move(from, to);
        },
        del(i) {
            this.elements.splice(i, 1);
        },
        addItem(i) {
            if (this.cls === "section") {
                this.elements.push(newItem);
            } else {
                this.sec.add = true;
            }
        },
    },
};
</script>
