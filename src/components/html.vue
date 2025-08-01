<template>
    <div class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <div v-html="e.el.html"></div>
    </div>
    <div v-if="!e.el.html" class="tx-grey">{{ $__('Enter a code') }}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: "HTML",
    icon: "fa-brands fa-html5",
    props: {
        "type": "html",
        "classes": {
            
        },
        "el": { "html": "" }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
