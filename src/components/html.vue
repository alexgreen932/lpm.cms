<template>
    <div class="element" :class="$root.classes(e.classes)">
        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <div v-html="e.el.html"></div>
    </div>
    <div v-if="!e.el.html" class="b-blue p-1 jc-c">{{$__('Add HTML code here')}}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: "HTML",
    icon: "fa-brands fa-html5",
    props: {
        "type": "html",
        "classes": {
            "ja": ""  
        },
        "el": { "html": "" }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],
};
</script>
