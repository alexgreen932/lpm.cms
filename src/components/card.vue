<template>
    <div class="element card" :class="$root.classes(e.classes, 'link_rad, link_style, p, fd')">  
                  <!-- 'bg': 'bg-white',
            'p': '',
            'br': '',
            'fs': '',
            'col': 'tx-black',
            'br': 'br-5',
            'link_style': 'but-blue',
            '': 'br-5',       -->
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <figure v-if="e.el.img">
            <img :src="e.el.img" :alt="title()">
        </figure>
        <div :class="[e.classes.p, dir()]">
            <h3 v-if="e.el.title">{{e.el.title}}</h3>
            <div :class="e.classes.fs" v-htmk="e.el.text"></div>
            <div v-if="!e.el.text" class="tx-grey">{{ $__('Enter a text') }}</div>
            <a v-if="e.el.button" :href="e.el.url" :class="[e.classes.link_classes, e.classes.link_rad]">e.el.link_text</a>
        </div>


    </div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: 'Card',
    icon: 'fa-solid fa-address-card',
    props: {
        'type': 'card',
        'classes': {
            'wi': '',
            'bs': '',
            'bg': 'bg-white',
            'col': 'tx-black',
            'p_card': '',
            'fd': '',
            'p': '',
            'pc': '',
            'br': '',
            'fs': '',
            'br': 'br-5',
            'link_style': 'but-blue',
            'link_rad': 'br-5',
        },
        'el': {
            'title': '',
            'text': '',
            'img': '',
            'icon': '',
            'button': false,
            'url': '',
            'target': '_self',
            'link_text': '',
        }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'sec', 'dir', 'e', 'index'],
    methods:{
        title(){
            return this.el?.title || 'Image';
        },
        dir(){
            return this.el?.fd || 'fd-c';
        },
    }
};
</script>
