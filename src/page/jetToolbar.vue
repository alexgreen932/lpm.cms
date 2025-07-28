<template>
    <div class="form-toolbar" :class="cls">
        <i class="fa-solid fa-pen-to-square" @click="editItem(index)"></i>
        <i v-if="notFirst(index)" class="fa-solid" :class="prev" @click="moveItem(index, index - 1)"></i>
        <i v-if="notLast(index)" class="fa-solid" :class="next" @click="moveItem(index, index + 1)"></i>
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
    content: [],
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
        };
    },
    methods: {
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
            switch (this.cls) {
                case 'section':
                    this.$root.reset();
                    this.ops.current_section = this.index;
                    this.ops.current_el = null;
                    this.ops.current_edit = 'section';

                    await this.setPageIndex();
                    break;

                case 'element':
                    this.$root.reset();
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
            if (this.cls === "section") {
                this.elements.push(newItem);
            } else {
                this.sec.add = true;
            }
        },
    },
    mounted() {
            // console.log('this.dir ------- ', this.dir);
        if (this.dir && this.dir == 'fd-c') {
            
        }else{
            this.prev = 'fa-angle-left';
            this.next = 'fa-angle-right';
        }
    }

};
</script>
