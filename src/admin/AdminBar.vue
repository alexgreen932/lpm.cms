<template>
    <div class="admin-bar">
        <ul>
            <li v-for="(e, i) in ops.menu" :class="e.cls">
                <template v-if="i == 0">
                    <i
                        v-if="ops.current !== 99"
                        class="fa-solid fa-ellipsis-vertical"
                        @click="showSidebar(e.slug), $root.saveLocal()"
                    ></i>
                    <i
                        v-if="ops.current == 99"
                        class="fa-solid fa-xmark"
                        @click="$root.closeAdmin(), $root.saveLocal()"
                    ></i>
                </template>
                <i
                    v-if="i !== 0"
                    :class="e.icon"
                    @click="showSidebar(e.slug), $root.saveLocal()"
                ></i>
            </li>
        </ul>
    </div>
</template>


<script>
import { ops } from "./data.js";
export default {
    data() {
        return {
            ops:ops,
        };
    },
    methods: {
        showSidebar(e) {
            // console.log('%c clicked show sidebar', 'color: #e50000',);
            if (this.ops.current == e) {
                this.ops.current = null;
            } else {
                this.ops.current = e;
            }
            this.isBar();
            this.isSidebar();
        },
        isSidebar() {
            console.log("this.ops.current: ", this.ops.current);
            let page = document.getElementById("app");
            if (this.ops.current && this.ops.current !== 99) {
                page.classList.remove("isBar");
                page.classList.add("isSidebar");
            } else {
                page.classList.remove("isSidebar");
            }
        },
        isBar() {
            console.log("this.ops.current: ", this.ops.current);
            let page = document.getElementById("app");
            if (this.ops.current == 99) {
                page.classList.remove("isSidebar");
                page.classList.add("isBar");
            } else {
                page.classList.add("isBar");
            }
        },
    },
};
</script>
