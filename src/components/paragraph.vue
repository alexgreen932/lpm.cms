<template>
    <div class="element" :class="$root.classes(e.classes)">
        <jet-toolbar :cls="cls" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <p v-html="e.el.text"></p>
    </div>
    <div v-if="!e.el.text" class="tx-grey">{{ $__('Enter a text') }}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: "Paragraph",
    icon: "fa-solid fa-text-width",
    props: {
        "type": "paragraph",
        "classes": {
            "fs": "",
            "col": "",
            "ja": ""
        },
        "el": { "text": "This is Sample Text" }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index', 'cls'],
};
</script>
