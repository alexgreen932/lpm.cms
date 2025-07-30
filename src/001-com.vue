<template>
    <div v-if="e.content.text" class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="i2" />
        <p v-html="e.content.text"></p>
    </div>
    <div v-if="!e.content.text" class="tx-grey">{{ $__('Enter a text') }}</div>
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
            "col": ""
        },
        "content": { "text": "This is Sample Text" }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
