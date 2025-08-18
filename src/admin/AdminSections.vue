<template>
    <div v-if="ops.current_menu !== 99" class="admin-sec">
        <!-- <div v-if="ops.current_menu == 'pages'" class="control-section">
        </div> -->
        <!-- current---{{ops.current}} -->
        <section-pages v-if="ops.current_menu == 'pages'" />
        <section-patterns v-if="ops.current_menu == 'patterns'" />
        <section-theme v-if="ops.current_menu == 'theme'" />

        <add-new v-if="ops.current_menu == 'add'" />

        <!-- <textarea rows="40" cols="50">{{ ops }}</textarea> -->
         <!-- FORMS -------  -->
          <save-pattern v-if="ops.save_as_pattern" />
          <!-- rm temp for dev -->
          <!-- {{ $id()}} -->
        <!-- <div class="delay-tooltip top-left">test</div> -->
         <!-- <textarea rows="40" cols="50">{{ pageJson() }}</textarea> -->
          <!-- dev only ---  -->
           <dev-fields />

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
import sectionTheme from "./sectionTheme.vue";
import savePattern from "../page/savePattern.vue";
//dev only 
import devFields from "./devFields.vue";
import { fetchFile } from "../utils/helpers.js";

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
        sectionTheme,
        savePattern,
        devFields,

    },
    data() {
        return {
            test: 42,//dev
            ops: ops,
            t_pages: this.$__('Page Management'),
            pattern: this.$__('Pattern is a ready fragment which you can use as base for your own sections. You can use preset ones, create your own or download from our collection'),
        };
    },
    methods: {
        // pageJson() {//todo!! replace with $root.dataString
        //     return JSON.stringify(this.ops.current_page_data);
        // },
    },
};
</script>
