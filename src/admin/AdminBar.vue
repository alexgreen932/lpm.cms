<template>
    <div class="admin-bar fd-c jc-b">
            <!-- //old -->
        <!-- <ul class="m-0">
            <li v-for="(e, i) in menu" class="fd-c" :class="[e.cls, $isActive(ops.current_menu, e.slug)]" v-tt:top-left="e.title">
                <i :class="e.icon" @click="showSidebar(e.slug), $saveLocal(ops, 'menu_state')"></i>
                <span class="fs-6">{{e.title}}</span>
            </li>
        </ul> -->
        <ul class="m-0">
            <li v-for="(e, i) in menu" class="fd-c" :class="[e.cls, $isActive(ops.current_menu, e.slug)]" @click="showSidebar(e.slug), $saveLocal(ops, 'menu_state')">
                <i :class="e.icon"></i>
                <span class="fs-6">{{e.title}}</span>
            </li>
        </ul>
        <ul class="m-0">
            <li v-for="(e, i) in menu2" class="fd-c" :class="[e.cls, $isActive(ops.current_menu, e.slug)]" @click="showSidebar(e.slug), $saveLocal(ops, 'menu_state')">
                <i :class="e.icon"></i>
                <span class="fs-6">{{e.title}}</span>
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
        showSidebar(e) {
            // 
            if (this.ops.current_menu == e) {
                this.ops.current_menu = 99;
            } else {
                this.ops.current_menu = e;
                if (e=='theme') {
                    this.ops.sample_data = true;
                }
            }
            this.isBar();
            this.isSidebar();
        },
        isSidebar() {
            
            let page = document.getElementById("app");
            if (this.ops.current_menu && this.ops.current_menu !== 99) {
                page.classList.remove("isBar");
                page.classList.add("isSidebar");
            } else {
                page.classList.remove("isSidebar");
            }
        },
        isBar() {
            
            let page = document.getElementById("app");
            if (this.ops.current_menu == 99) {
                page.classList.remove("isSidebar");
                page.classList.add("isBar");
            } else {
                page.classList.add("isBar");
            }
        },
    },
    mounted(){

        
        this.$getLocal(this.ops, 'menu_state');
    }
};
</script>
