<template>
    <ul class="element">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <li v-for="(el, i) in e.items" :key="i" :class="$root.classes(e.classes, 'e.classes.bg_h, i_col')" :data-hover-bg="e.classes.bg_h">
            <i v-if="el.icon" :class="[el.icon, e.classes.i_col, e.classes.i_fs]"></i>
            <div :class="[el.col_h, e.classes.fs_h]">{{ el.title }}</div>
            <h3>{{ el.text }}</h3>
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
            wc:'wc-1-3',
            "bg": "bg-indigo-l5",
            "bg_h": "bg-indigo-l3",
            "col": "",
            "fs": "",
            "fs_h": "fs-15",
            "p": "p-2",
            "br": "br-30",
            "symbol_mode": "icons",
            "icon_place": "",
            "jag": "",
        },
        "el": {
            tip:'infoboxes',
        },
        "items": [
            { "icon": "fa-solid fa-check", title: '', col_t: '', "text": "", url: '', url_type: 'link', bg: ''}
        ]
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
