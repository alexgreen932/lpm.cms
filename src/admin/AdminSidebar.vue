<template>
    <div v-if="ops.current !== 99" class="admin-sec">
        Lorem
        <!-- <form-section :sections="sections"></form-section> -->
    </div>
</template>

<script>
import { ops } from "./data.js";
import FormSection from "./FormSection.vue";

export default {
    components: {
        "form-section ": FormSection,
    },
    data() {
        return {
            ops: ops,
        };
    },
    // methods: {
    //     showSidebar(e) {
    //         // console.log('%c clicked show sidebar', 'color: #e50000',);
    //         if (this.ops.current == e) {
    //             this.ops.current = null;
    //         } else {
    //             this.ops.current = e;
    //         }
    //         this.isBar();
    //         this.isSidebar();
    //     },
    //     isSidebar() {
    //         console.log("this.ops.current: ", this.ops.current);
    //         let page = document.getElementById("app");
    //         if (this.ops.current && this.ops.current !== 99) {
    //             page.classList.remove("isBar");
    //             page.classList.add("isSidebar");
    //         } else {
    //             page.classList.remove("isSidebar");
    //         }
    //     },
    //     isBar() {
    //         console.log("this.ops.current: ", this.ops.current);
    //         let page = document.getElementById("app");
    //         if (this.ops.current == 99) {
    //             page.classList.remove("isSidebar");
    //             page.classList.add("isBar");
    //         } else {
    //             page.classList.add("isBar");
    //         }
    //     },
    // },
};
</script>
