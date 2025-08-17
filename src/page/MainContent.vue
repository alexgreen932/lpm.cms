<template>
    <div v-if="warn" class="b-red g-1">Data not found...</div>

    <div v-else-if="ops.current_page_data && ops.current_page_data.sections && ops.current_page_data.sections.length">
        <template v-for="(sec, i) in ops.current_page_data.sections">
            <render-section :sec="sec" :i="i" />
        </template>

        <!-- dev & debugs --------  -->
         <div class="ja ja-fade-in b-blue p-1">Animation Test</div>
        
        <div class="w-container b-blue g-1 p-1 nv-1 wc-1-4">
            <textarea rows="40" cols="50">{{ ops }}</textarea>
            <textarea rows="40" cols="50">{{ ops.current_page_data.sections }}</textarea>
            <textarea rows="40" cols="50">{{ pageJson() }}</textarea>
        </div>
    </div>
</template>

<script>
import { ops } from "../data/data.js";
// import AddNew from "./addNew.vue";//rm
import JetToolbar from "./jetToolbar.vue";
import JetElements from "./JetElements.vue";//rm //todo rm com too if directly
const modules = import.meta.glob("../components/*.vue", { eager: true });

import renderSection from "./renderSection.vue";

export default {
    components: {
        // "jet-add": AddNew,
        "jet-toolbar": JetToolbar,
        "jet-elements": JetElements,
        renderSection,
    },
    data() {
        return {
            isAdmin: true,
            ops: ops,
            page: { sections: [] }, // avoids null errors //rm
            warn: false,
        };
    },
    methods: {
        addElem(i){
            this.ops.current_menu = 'add';
                this.ops.current_section = i;
                this.ops.current_el = 0;
                // console.log('this.index: ', this.index);
        },
        getComponent(type) {
            const name = `../components/${type}.vue`;
            return modules[name].default;
        },

        pageJson() {//todo!! replace with $root.dataString
            return JSON.stringify(this.ops.current_page_data);
        },
        sectionId(i) {
            return "section-" + (i + 1);
        },
        //TODO IMPORT file fetch
        async fetchFile(path) {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error("File not found");
                const data = await response.json();
                return data && typeof data === "object" ? data : null;
            } catch (err) {
                console.warn("Fetch error:", err);
                return null;
            }
        },
    },
    async mounted() {
        const site = window.location.origin;
        let slug = this.ops.current_page;
        //by default always homepage
        if (slug==99) {
            slug = 'homepage';
        }

        const path = `${site}/data/${slug}.json`;

        let page = await this.fetchFile(path);
        //prevent error
        if (page) {
            this.ops.current_page_data = page;
        } else {
            this.warn = true;
        }
    },
};
</script>
