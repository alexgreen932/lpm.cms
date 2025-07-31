<template>
    <figure v-if="e.el.text" class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <img :src="e.el.src" alt="e.el.text">
        <figcaption v-if="e.el.text">{{ e.el.text }}</figcaption>
    </figure>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: 'Image',
    icon: 'fa-solid fa-image',
    props: {
        'type': 'image',
        'classes': {
            'wi': '',
            'br': 'br-5',
            pos: 'p-r',
        },
        'el': {
            'src': '',
            'text': 'Read More',
        },
        'style': {
            use_top: false,
            top: '',
            use_right: false,
            right: '',
            use_bottom: false,
            bottom: '',
            use_left: false,
            left: '',
        }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
