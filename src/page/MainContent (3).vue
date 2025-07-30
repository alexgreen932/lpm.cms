<template>
    <div v-if="warn" class="b-red g-1">Data not found...</div>

    <div v-else-if="ops.current_page_data && ops.current_page_data.sections && ops.current_page_data.sections.length">
        <div v-for="(sec, i) in ops.current_page_data.sections" :key="i" :id="sectionId(i)" class="jet-section"
            :class="[sec.bg, sec.col]">
            <jet-toolbar v-if="isAdmin" cls="section" :elements="ops.current_page_data.sections" :index="i" />

            <div class="cntr" :class="[sec.w, sec.jc, sec.ai, sec.p, sec.fd]">
                <!-- section --- {{sec}} -->
                <jet-elements :sec="i" :dir="sec.fd" :elements="sec.content" />
                <!-- //todo add note box that content is empty -->
            </div>


            <!-- <div v-if="!sec.content || !sec.content.length" class="w-container g-1 mv-1 b-blue jc-c fd-c"
                @click="sec.add = true">
                <div v-if="!sec.add" class="fd-c g-05 p-1 ai-c">
                    <i class="fa-solid fa-circle-plus fs-25"></i>
                    <p>Click Here to add elements</p>
                </div>
            </div> -->
            <!-- ----{{sec.img}} -->
            <div v-if="sec.img" class="img-bg" :class="[sec.bp, sec.ba, sec.blur, sec.opacity]" :style="{ 'background-image': 'url(' + sec.img + ')' }"></div>
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
import AddNew from "./addNew.vue";
import JetToolbar from "./jetToolbar.vue";
import JetElements from "./JetElements.vue";

export default {
    components: {
        "jet-add": AddNew,
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
        //todo!! move to root maybe
        // let slug = window.location.pathname;

        // Handle root paths like '/', '/index.php', etc.
        // if (slug === '/' || slug === '/index.php') {
        //     slug = 'homeops.current_page_data';
        // } else {
        //     // Remove leading slash and extension if needed
        //     slug = slug.replace(/^\/|\.php$/g, '');
        // }

        let slug = this.ops.current_page;

        const path = `${site}/data/${slug}.json`;

        let page = await this.fetchFile(path);
        //prevent error
        if (page) {
            this.ops.current_page_data = page;
        } else {
            this.warn = true;
        }
        // console.log("%c PAGE", "color: #e00808", this.page);
        // console.log("%c sections", "color: #26d603", this.ops.current_page_data.sections);
    },
};
</script>
