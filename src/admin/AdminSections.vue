<template>
    <div v-if="ops.current_menu !== 99" class="admin-sec">
         <!-- current---{{ops.current}} -->
         <div class="control-section">
            <h3 v-if="ops.current_menu=='pages'">{{t_pages}}</h3>
            <section-pages />   
            <form-wrapper />        

         </div> 
         <add-new v-if="ops.current_menu=='add'" />
    </div>
</template>

<script>
import { ops } from "../data/data.js";
import sectionPages from "./sectionPages.vue";
import MediaManager from "../form/MediaManager.vue";
import pageForms from './pageForms.vue';
// import FormSection from "./FormSection.vue";//todo rm if not used
//dev //todo rm then 
import formWrapper from "./formWrapper.vue";
import addNew from './addNew.vue';

export default {
    components: {
        "media-manager": MediaManager,
        sectionPages,
        pageForms,
        formWrapper,
        addNew,

    },
    data() {
        return {
            test: 42,//dev
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
