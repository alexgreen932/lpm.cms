<template>
    <component :is="e.tag" v-if="e.content.text" class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        {{ e.content.text }}
    </component>
    <div v-if="!e.content.text" class="tx-grey">{{ $__('Enter a title') }}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: "Heading",
    icon: "fa-solid fa-heading",
    props: {
        "type": "title",
        "tag": "h1",
        "classes": {
            "fs": "fs-20",
            "fw": "",
            "col": ""
        },
        "content": { "text": "This is Sample Title" }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
