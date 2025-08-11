<template>
    <div v-if="ops.current_menu !== 99" class="admin-sec">
        <!-- <div v-if="ops.current_menu == 'pages'" class="control-section">
        </div> -->
        <!-- current---{{ops.current}} -->
        <section-pages v-if="ops.current_menu == 'pages'" />
        <section-patterns v-if="ops.current_menu == 'patterns'" />

        <add-new v-if="ops.current_menu == 'add'" />
        //dev only
        <textarea rows="40" cols="50">{{ ops }}</textarea>
         <!-- FORMS -------  -->
          <save-pattern v-if="ops.save_as_pattern" />
          <!-- rm temp for dev -->
          <!-- {{ $id()}} -->
        <!-- <div class="delay-tooltip top-left">test</div> -->

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
import jetTip from '../utils/jetTip.vue';
// import listPattern from './listPattern.vue';
import patternRender from "./patternRender.vue";
import sectionPatterns from "./sectionPatterns.vue";
import savePattern from "../page/savePattern.vue";

export default {
    components: {
        "media-manager": MediaManager,
        sectionPages,
        pageForms,
        formWrapper,
        addNew,
        jetTip,
        // listPattern,
        patternRender,
        sectionPatterns,
        savePattern,

    },
    data() {
        return {
            test: 42,//dev
            ops: ops,
            t_pages: this.$__('Page Management'),
            pattern: this.$__('Pattern is a ready fragment which you can use as base for your own sections. You can use preset ones, create your own or download from our collection'),
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
