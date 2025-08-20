<template>
    <!-- todo in front link ----- -->
    <figure v-if="e.el.text" class="element" :class="$root.classes(e.classes)" :style="position">
        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <img v-if="e.el.src" :src="e.el.src" :alt="e.el.text">
        <img v-if="!e.el.src" :src="$domain + '/media/default.jpg'">
        <figcaption v-if="e.el.show_caption">{{ e.el.text }}</figcaption>
    </figure>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';

export const meta = {
    title: 'Image',
    icon: 'fa-solid fa-image',
    props: {
        type: 'image',
        classes: {
            wi: '',
            br: '',
            "ja": ""
        },
        el: {
            src: '',
            text: 'Read More',
            show_caption: false,
            url: '',
        },
        style: {
            pos_a: false,        // <-- added this so position works
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
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],

    computed: {
        position() {
            const { pos_a, use_top, use_bottom, use_left, use_right, top, bottom, left, right } = this.e.style;
            if (!pos_a) return null;

            return {
                position: 'absolute',
                ...(use_top && { top: `${top}px` }),
                ...(use_bottom && { bottom: `${bottom}px` }),
                ...(use_left && { left: `${left}px` }),
                ...(use_right && { right: `${right}px` }),
            };
        }
    }
};
</script>
