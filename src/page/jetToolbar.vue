<template>
    <div class="form-toolbar" :class="cls">
        <i class="fa-solid fa-pen-to-square" @click="editItem(index)"></i>
        <i v-if="notFirst(index)" class="fa-solid" :class="prev" @click="moveItem(index, index - 1)"></i>
        <i v-if="notLast(index)" class="fa-solid" :class="next" @click="moveItem(index, index + 1)"></i>
        <i class="fa-solid fa-trash" @click="del(index)"></i>
        <i v-if="cls !== 'section'" class="fa-solid fa-plus" @click="addItem(index)"></i>
        <i v-if="cls == 'section'" class="add-section" :class="showClose()" @click="show = !show">
            <transition name="slideV">
                <div v-if="show" class="d-drop drop p-1 g-1">
                    <div class="but-blue fs-8" @click="addPattern()">{{ $__('Add Pattern') }}</div>
                    <div class="but-grey fs-8" @click="addItem(index)">{{ $__('Add Empty Section') }}</div>
                </div>
            </transition>

        </i>
    </div>
</template>

<script>
//todo simplify index is this.index
// import { ops } from "../data/data.js";
// import JetForms from "./JetForms.vue";

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};

//RM
const newItem = {
            "edit": false,
            "add": false,
            "sec": {
                "bg": "bg-white",
                "col": "tx-gray-d3"
            },
            "cont": {
                "w": "w-container",
                "bg": "bg-white-alpha-4",
                "br": "br-14",
                "m": "mv-1",
                "p": "p-1",
                "jc": "jc-c",
                "ai": "ai-s",
                "g": "g-1",
                "fd": "fd-c",
                "bs": "",
                "a": ""
            },
            "img": {
                "src": "",
                "blur": null,
                "opacity": null,
                "ba": "ba-s",
                "bp": "bp-cc"
            },
            "content": []
        };

import { ops } from '../data/data.js';
import { fetchFile } from "../utils/helpers.js";

export default {
    // components: {
    //     "jet-forms ": JetForms,
    // },
    //   cls="section"
    //         :elements="page.sections"
    //         :section="i"
    //         :element=null 
    //section optionally
    props: ["elements", "index", "page_index", "cls", "sec", "dir"],
    data() {
        return {
            ops: ops,
            isAdmin: true,
            add: false,
            prev: 'fa-angle-up',
            next: 'fa-angle-down',
            show: false,
        };
    },
    methods: {
        showClose() {
            if (this.show) {
                return 'fa-solid fa-xmark';
            } else {
                return 'fa-solid fa-plus';
            }
        },
        async setPageIndex() {
            try {
                const pages = await fetchFile('/data/pages_list.json');
                if (pages && Array.isArray(pages)) {
                    const index = pages.findIndex(
                        (page) => page.slug === this.ops.current_page
                    );
                    this.ops.page_index = index !== -1 ? index : null;
                    console.log("Page index set to:", this.ops.page_index);
                } else {
                    console.warn("pages_list.json returned empty or invalid data");
                }
            } catch (error) {
                console.error("Error setting page index:", error);
            }
        },

        async editItem(i) {
            console.log('edit item func', this.cls);
            switch (this.cls) {
                case 'section':
                    this.$root.reset();
                    this.ops.current_menu = 'pages';
                    this.ops.current_section = this.index;
                    this.ops.current_el = null;
                    this.ops.current_edit = 'section';

                    await this.setPageIndex();
                    break;

                case 'element':
                    this.$root.reset();
                    this.ops.current_menu = 'pages';
                    this.ops.current_section = this.sec;
                    this.ops.current_el = this.index;
                    this.ops.current_edit = 'element';

                    await this.setPageIndex();
                    break;

                default:
                    break;
            }
        },

        notFirst(i) {
            return i !== 0;
        },

        notLast(i) {
            return i !== this.elements.length - 1;
        },

        moveItem(from, to) {
            this.elements.move(from, to);
        },

        del(i) {
            this.elements.splice(i, 1);
        },

        addItem(i) {
            //add section //todo add pattern too
            if (this.cls === "section") {
                this.elements.push(newItem);
            } else {
                //add elem
                this.ops.current_menu = 'add';
                this.ops.current_section = this.sec;
                this.ops.current_el = this.index;
                console.log('this.index: ', this.index);
            }
        },

        addPattern() {

        },
    },
    mounted() {
        // console.log('this.dir ------- ', this.dir);
        if (this.dir && this.dir == 'fd-c') {

        } else {
            this.prev = 'fa-angle-left';
            this.next = 'fa-angle-right';
        }
    }

};
</script>
