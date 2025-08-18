<template>
    <div v-if="ops.editable" class="form-toolbar wc-x" :class="cls">
        <div class="d-bg">
            <div v-if="cls !== 'group-toolbar'" class="d-wrap">
                <i class="fa-solid fa-pen-to-square" v-tt:top-center-small="$__('Edit')" @click="editItem(index)"></i>
            </div>
            <div v-if="notFirst(index)" class="d-wrap">
                <i class="fa-solid" :class="prev" v-tt:top-center-small="$__('Move +')"
                    @click="moveItem(index, index - 1)"></i>
            </div>
            <div v-if="notLast(index)" class="d-wrap">
                <i class="fa-solid" :class="next" v-tt:top-center-small="$__('Move -')"
                    @click="moveItem(index, index + 1)"></i>
            </div>
            <div v-if="cls == 'section' && notPart()" class="d-wrap">
                <i class="fa-solid fa-floppy-disk" v-tt:top-center-small="$__('Save as Pattern')"
                    @click="saveAsPattern()"></i>
            </div>
            <div v-if="elements.length > 1" class="d-wrap">
                <i class="fa-solid fa-trash" v-tt:top-center-small="$__('Delete')" @click="del(index)"></i>
            </div>
            <div v-if="cls == 'element'" class="d-wrap">
                <i class="fa-solid fa-clone" v-tt:top-center-small="$__('Clone Element')" @click="clone()"></i>
            </div>
            <div v-if="cls == 'element'" class="d-wrap">
                <i class="fa-solid fa-plus" v-tt:top-center-small="$__('Add')" @click="addItem(index)"></i>
            </div>
            <div v-if="cls == 'header'" class="d-wrap">
                -----<i class="fa-solid fa-plus" v-tt:top-center-small="$__('Add')" @click="addItem(index)"></i>
            </div>

            <div v-if="cls == 'section' && notPart()">
                <i class="add-section" :class="showClose()" v-tt:top-center-small="$__('Add')" @click="show = !show">
                    <transition name="slideV">
                        <div v-if="show" class="d-drop drop p-1 g-1">
                            <div class="but-blue fs-8" @click="addPattern()">
                                {{ $__('Add Pattern') }}
                            </div>
                            <div class="but-grey fs-8" @click="addItem(index)">
                                {{ $__('Add Empty Section') }}</div>
                        </div>
                    </transition>

                </i>
            </div>


        </div>

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
        "col": "tx-gray-d3",
        p_sec: ""
    },
    "cont": {
        "w": "w-container",
        "bg": "bg-white-alpha-4",
        "br": "br-14",
        // "m": "mv-1",
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

import { ops, theme } from '../data/data.js';
import { fetchFile } from "../utils/helpers.js";

export default {
    props: ["elements", "index", "page_index", "cls", "sec", "dir", "type"],
    data() {
        return {
            ops,
            isAdmin: true,
            add: false,
            prev: 'fa-angle-up',
            next: 'fa-angle-down',
            show: false,
            save_as_pattern: false,
            theme,
        };
    },
    methods: {
        clone() {
            // let cloned = this.elements[this.index];//get elem clicked to clone
            // let cloned = JSON.parse(JSON.stringify(this.elements[this.index]));//get elem clicked to clone
            let cloned = this.$freshId(this.elements[this.index]);//create element with fresh id
            // delete cloned.id;
            // cloned.id = this.$id();//set random id, if id exists return
            // 

            let insertIndex = this.ops.current_el + 1;
            this.elements.splice(insertIndex, 0, cloned);
        },
        saveAsPattern() {
            if (this.ops.save_as_pattern) {
                this.ops.save_as_pattern = false;
                return;
            }
            this.ops.save_as_pattern = true;
            this.ops.pattern.data = this.elements[this.index]; //set elements clicked data as pattern.data
        },
        showSub() {
            this.show = !this.show;
            this.ops.current_section = this.index;
        },
        showClose() {
            if (this.show) {
                return 'fa-solid fa-xmark';
            } else {
                return 'fa-solid fa-plus';
            }
        },
        //todo replace pages_list with data/index
        async setPageIndex() {
            try {
                const pages = await fetchFile('/data/pages_list.json');
                if (pages && Array.isArray(pages)) {
                    const index = pages.findIndex(
                        (page) => page.slug === this.ops.current_page
                    );
                    this.ops.page_index = index !== -1 ? index : null;

                } else {

                }
            } catch (error) {

            }
        },

        async editItem(i) {
            if (this.type === 'header') {
                this.$root.reset();
                this.ops.current_menu = 'theme';
                this.ops.theme_part = 'Header';
                // this.ops.current_section = this.index;
                // this.ops.current_el = null;
                // this.ops.current_edit = 'section';
                return;
            } else if (this.type === 'footer') {

            }



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
            const result = confirm(this.$__('Confirm deleting Item!'));
            if (result) {
                this.elements.splice(i, 1);
            }

        },

        addItem(i) {
            //add section //todo add pattern too
            switch (this.cls) {
                case 'section':
                    let insertIndex = this.ops.current_section + 1;
                    this.elements.splice(insertIndex, 0, newItem);
                    break;
                case 'element':
                    this.ops.current_menu = 'add';
                    this.ops.current_section = this.sec;
                    this.ops.current_el = this.index;
                    this.ops.current_part = null;
                    break;

                default://for parts
                    this.ops.current_menu = 'add';
                    this.ops.current_part = this.cls;
                    this.ops.current_section = this.sec;
                    this.ops.current_el = this.index;
                    break;
            }
            // if (this.cls === "section") {
            //     let insertIndex = this.ops.current_section + 1;
            //     this.elements.splice(insertIndex, 0, newItem);
            // } else {
            //     //add elem
            //     this.ops.current_menu = 'add';
            //     this.ops.current_section = this.sec;
            //     this.ops.current_el = this.index;
            // }
        },

        addPattern() {

        },
        notPart() {
            if (this.type === 'header' || this.type === 'footer') {
                return false;
            } else {
                return true;
            }
        },
    },
    mounted() {
        // all props "elements", "index", "page_index", "cls", "sec", "dir"           
        console.log('%c Cls ---', 'color: #f31010', this.cls);
        // console.log('%c Elements ---', 'color: #01f501', this.elements);
        // console.log('%c Sec ---', 'color: #1045f3', this.sec);
        if (this.dir && this.dir == 'fd-c') {

        } else {
            this.prev = 'fa-angle-left';
            this.next = 'fa-angle-right';
        }

        //replace sections of page if it is a part of theme
        //rm
        // if (this.type == 'header') {
        //     this.elements = this.theme.header.sections;
        // } else if(this.type == 'footer') {

        // }
    }

};
</script>
