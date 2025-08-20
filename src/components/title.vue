<template>
    <component :is="e.el.tag" class="element" :class="$root.classes(e.classes)">

        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <i v-if="e.el.icon" :class="e.el.icon"></i>
        <template v-if="e.classes.h_style !== 'h-line'">
            {{ e.el.text }}
        </template>
        <span v-else>
            {{ e.el.text }}
        </span>

    </component>
    <div v-if="!e.el.text" class="tx-grey">{{ $__('Enter a title') }}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: "Heading",
    icon: "fa-solid fa-heading",
    props: {
        "type": "title",
        "classes": {
            "fs": "fs-20",
            "fw": "",
            "col": "",
            "h_style": "",
            "jc": "",
            "ja": ""
        },
        "el": {
            "tag": "h1",
            "icon": "",
            "text": "This is Sample Title"
        }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],
};
</script>
