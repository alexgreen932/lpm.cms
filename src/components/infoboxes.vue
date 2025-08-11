<template>
    <ul class="element info-box-container">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <li v-for="(el, i) in e.items" :key="i" class="info-box"
            :class="$root.classes(e.classes, 'e.classes.bg_h, i_fs, icon_place, fs_h')" :data-hover-bg="e.classes.bg_h">
            <template v-if="e.classes.icon_place == 'icn-aside'">
                <i v-if="e.classes.symbol_mode == 'icons'" class="mr-1" :class="[el.icon, e.classes.i_col, e.classes.i_fs]"></i>
            </template>
            <div class="d-wrap">
                <div class="d-heading" :class="[el.col_h, e.classes.fs_h, e.classes.icon_place, e.classes.fs_h]">
                    <template v-if="e.classes.icon_place !== 'icn-aside'">
                        <i v-if="e.classes.symbol_mode == 'icons'"
                            :class="[el.icon, e.classes.i_col, e.classes.i_fs]"></i>
                    </template>

                    <div v-if="el.title">{{ el.title }}</div>
                </div>
                <div v-if="el.text" class="d-content" :class="e.classes.icon_place">{{ el.text }}</div>
            </div>

        </li>
    </ul>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
import __ from '../languages/index.js';
export const meta = {
    title: "Info Boxes",
    icon: "fa-solid fa-circle-exclamation",
    props: {
        "type": "infoboxes",
        "classes": {
            wi: 'w-1-3',
            "bg": "bg-indigo-l5",
            "bg_h": "bg-indigo-l3",
            "col": "",
            "fs": "",
            "fs_h": "fs-15",
            "i_fs": "fs-15",
            "p": "p-2",
            "br": "br-30",
            "symbol_mode": "icons",
            "icon_place": "",
            "jag": "",
        },
        "el": {
            tip: 'infoboxes',
        },
        "items": [
            { "icon": "fa-solid fa-check", title: '', col_t: '', "text": "", url: '', url_type: 'link', bg: '' }
        ]
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
