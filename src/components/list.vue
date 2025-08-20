<template>
<!-- List -->
    <ul class="element" :class="$root.classes(e.classes, 'i_fs, i_col')">
        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <li v-for="(el, i) in e.items" :key="i">
            <i v-if="e.el.icon" :class="[e.el.icon, e.classes.i_col, e.classes.i_fs]"></i>
            {{ el.text }}
            <span v-if="!el.text" class="bg-grey-l2 br-3 p-05">{{$__('Enter text and add more items')}}</span>
        </li>
    </ul>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: "List",
    icon: "fa-solid fa-list-check",
    props: {
        "type": "list",
        "classes": {
            "col": "",
            "fs": "",
            "i_col": "",
            "i_fs": "",
            "jag": ""
        },
        "el": { "icon": "fa-solid fa-check" },
        "items": [{ "text": "" }]
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],
};
</script>
