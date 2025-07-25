<template>
    <div v-if="ops.current !== 99" class="admin-sec">
         <!-- current---{{ops.current}} -->
         <div v-if="ops.current=='pages'" class="control-section">
            <h3>{{t_pages}}</h3>
            <section-pages />
         </div>
         <media-manager cls="j-modal" width="w-3-5" />
         <!-- <jet-pages v-if="ops.current=='pages'" /> -->
    </div>
</template>

<script>
import { ops } from "../data/data.js";
import SectionPages from "./SectionPages.vue";
import MediaManager from "../form/MediaManager.vue";
// import FormSection from "./FormSection.vue";//todo rm if not used

export default {
    components: {
        "media-manager": MediaManager,
        "section-pages": SectionPages,
    },
    data() {
        return {
            ops: ops,
            t_pages: this.$__('Page Management'),
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
