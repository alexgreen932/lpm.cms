<template>
    <div v-if="warn" class="b-red g-1">Data not found...</div>
    <div
        v-if="page"
        :id="sectionId(i)"
        v-for="(sec, i) in page.sections"
        class="jet-section"
        :class="[sec.bg, sec.col]"
    >
        <jet-toolbar
            v-if="isAdmin"
            cls="section"
            :elements="page.sections"
            :index="i"
        />
        <div :class="[sec.jc, sec.ai, sec.p, sec.p]">
            <template v-if="sec.content.length" v-for="(el, i2) in sec.content">
                <jet-toolbar
                    v-if="isAdmin"
                    cls="element"
                    :elements="sec.content"
                    :sec="sec"
                    :index="i2"
                ></jet-toolbar>
                {{ el.slug }}
                elements
                <jet-elements :elems="sec.content"></jet-elements>
            </template>
        </div>
        <jet-add v-if="sec.add" :sec="sec" :content="sec.content"></jet-add>
        <div
            v-if="!sec.content.length"
            class="w-container g-1 mv-1 b-blue jc-c fd-c"
            @click="sec.add = true"
        >
            <div v-if="!sec.add" class="fd-c g-05 p-1 ai-c">
                <i class="fa-solid fa-circle-plus fs-25"></i>
                <p>Click Here to add elements</p>
            </div>
            ---{{ sec.add }}
        </div>
    </div>
    <div class="w-container b-blue g-1 p-1 nv-1 wc-1-2">
        <textarea rows="40" cols="50">{{ page.sections }}</textarea>
        <textarea rows="40" cols="50">{{ pageJson() }}</textarea>
    </div>
</template>

<script>
import { ops } from "../data/data.js";
import AddNew from "./AddNew.vue";
import JetToolbar from "./JetToolbar.vue";
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
            page: { sections: [] }, // <— default safe structure
            warn: false,
        };
    },

    methods: {
        pageJson() {
            return JSON.stringify(this.page);
        },
        sectionId(i) {
            return "section-" + (i + 1);
        },
        async fetchFile(path) {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error("File not found");
                const data = await response.json();
                return data;
            } catch (err) {
                alert(err);
                return [];
            }
        },
    },
    async mounted() {
        const site = window.location.origin;
        //todo!! move to root maybe
        // let slug = window.location.pathname;

        // Handle root paths like '/', '/index.php', etc.
        // if (slug === '/' || slug === '/index.php') {
        //     slug = 'homepage';
        // } else {
        //     // Remove leading slash and extension if needed
        //     slug = slug.replace(/^\/|\.php$/g, '');
        // }

        let slug = this.ops.current_page;

        const path = `${site}/data/${slug}.json`;

        let page = await this.fetchFile(path);
        //prevent error
        if (page) {
            this.page = page;
        } else {
            this.warn = true;
        }
        // this.page = page ? page.sections : []; //todo add message section not exist. maybe
        // this.sections = page.sections ? page.sections : []; //todo add message section not exist. maybe
        // console.log("%c Path", "color: #2f13ce", path);
        console.log("%c PAGE", "color: #e00808", this.page);
        // console.log("%c sections", "color: #26d603", this.page.sections);
    },
};
</script>
