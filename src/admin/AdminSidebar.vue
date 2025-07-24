<template>
    <div v-if="ops.current !== 99" class="admin-sec">
        <!-- Lorem -->
        <!-- <form-section :sections="sections"></form-section> -->
         current---{{ops.current}}
         <jet-pages v-if="ops.current=='pages'" />
    </div>
</template>

<script>
import { ops } from "../data/data.js";
import JetPages from "./JetPages.vue";
// import FormSection from "./FormSection.vue";//todo rm if not used

export default {
    components: {
        // "form-section ": FormSection,//?? rm
        "jet-pages": JetPages,
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
