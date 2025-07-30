<template>
    <div v-if="warn" class="b-red g-1">Data not found...</div>

    <div v-else-if="ops.current_page_data && ops.current_page_data.sections && ops.current_page_data.sections.length">
        <div v-for="(sec, i) in ops.current_page_data.sections" :key="i" :id="sectionId(i)" class="jet-section"
            :class="[sec.bg, sec.col]">
            <jet-toolbar v-if="isAdmin" cls="section" :elements="ops.current_page_data.sections" :index="i" />

            <div class="cntr" :class="[
                sec.w,
                sec.jc,
                sec.ai,
                sec.p,
                sec.fd,
                sec.cbg,
                sec.cbr,
                sec.m,
                sec.g
            ]">


                <!-- //todo add note box that content is empty -->
                <template v-if="sec.content && sec.content.length" v-for="(e, i2) in sec.content" :key="i2">
                    <!-- dev---{{ e.type }} -->
                    <component :is="getComponent(e.type)" :sec="i" :elements="sec.content" :dir="sec.fd" :e="e"
                        :index="i2" />

                </template>
            </div>

            <!-- <jet-add v-if="sec.add" :sec="sec" :content="sec.content" /> -->
            <div v-if="sec.img" class="img-bg" :class="[sec.bp, sec.ba, sec.blur, sec.opacity]"
                :style="{ 'background-image': 'url(' + sec.img + ')' }"></div>
        </div>

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

export default {
    components: {
        // "jet-add": AddNew,
        "jet-toolbar": JetToolbar,
        "jet-elements": JetElements,
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
        getComponent(type) {
            const name = `../components/${type}.vue`;
            return modules[name].default;
        },

        pageJson() {
            return JSON.stringify(this.ops.current_page_data);
        },
        sectionId(i) {
            return "section-" + (i + 1);
        },
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
