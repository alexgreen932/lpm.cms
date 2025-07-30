<template>
    <div class="admin-bar fd-c jc-b">
        <ul class="m-0">
            <li v-for="(e, i) in menu" :class="[e.cls, $isActive(ops.current_menu, e.slug)]">
                <i :class="e.icon" @click="showSidebar(e.slug), $root.saveLocal()"></i>
            </li>
        </ul>
        <ul class="m-0">
            <li v-for="(e, i) in menu2" :class="[e.cls, $isActive(ops.current_menu, e.slug)]">
                <i :class="e.icon" @click="showSidebar(e.slug), $root.saveLocal()"></i>
            </li>
        </ul>
    </div>
</template>


<script>
import { ops, menu, menu2 } from "../data/data.js";
export default {
    data() {
        return {
            ops,
            menu,
            menu2,
            current: 99,
        };
    },
    methods: {
        // isActive(s){
        //     if (this.ops.current_menu) {
                
        //     }
        // },
        showSidebar(e) {
            // console.log('%c clicked show sidebar', 'color: #e50000',);
            if (this.ops.current_menu == e) {
                this.ops.current_menu = 99;
            } else {
                this.ops.current_menu = e;
            }
            this.isBar();
            this.isSidebar();
        },
        isSidebar() {
            console.log("this.ops.current_menu: ", this.ops.current_menu);
            let page = document.getElementById("app");
            if (this.ops.current_menu && this.ops.current_menu !== 99) {
                page.classList.remove("isBar");
                page.classList.add("isSidebar");
            } else {
                page.classList.remove("isSidebar");
            }
        },
        isBar() {
            console.log("this.ops.current_menu: ", this.ops.current_menu);
            let page = document.getElementById("app");
            if (this.ops.current_menu == 99) {
                page.classList.remove("isSidebar");
                page.classList.add("isBar");
            } else {
                page.classList.add("isBar");
            }
        },
    },
};
</script>
