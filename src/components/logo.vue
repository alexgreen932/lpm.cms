<template>
    <div class="jet-logo" :class="e.classes.col">
        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <i v-if="e.el.logo_type == 'text' && e.el.logo_icon" :class="[e.el.logo_icon, e.classes.fs]"></i>
        <img v-if="e.el.logo_type == 'img'" :src="e.el.logo_img" :alt="Logo">
        <div v-if="e.el.logo_type == 'text'" class="logo-text">
            <p :class="$root.classes(e.classes)">{{ e.el.logo_text }}</p>
            <span>{{ e.el.slogan }}</span>
        </div>
    </div>

</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';

export const meta = {
    title: 'Logo',
    icon: 'fa-solid fa-jet-fighter-up',
    cat: 'parts',
    props: {
        type: 'logo',
        classes: {
            separator: 'For Type text only',
            fs: 'fs-15',
            col: '',
            effect: '',
        },
        el: {
            logo_type: 'text',
            logo_icon: '',
            logo_img: '',
            logo_text: 'MySite.Com',
            slogan: 'Smart Small Stylish',
        },
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],

    computed: {
        func() {

        }
    }
};
</script>
