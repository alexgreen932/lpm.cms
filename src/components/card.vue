<template>
    <div class="element card" :class="$root.classes(e.classes, 'link_rad, link_style, p, fd, ratio, hover_effect')">  
        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <figure v-if="e.el.img" :class="[e.classes.ratio, e.classes.hover_effect]">
            <img :src="e.el.img" :alt="title()">
        </figure>
        <div :class="[e.classes.p, dir()]">
            <h3 v-if="e.el.title">{{e.el.title}}</h3>
            <!-- {{e}} -->
            <div v-if="e.el.text" :class="e.classes.fs" v-html="e.el.text"></div>
            <div v-if="!e.el.text" class="b-blue p-1 jc-c">{{$__('Add some text to your card')}}</div>
            <a v-if="e.el.button" :href="e.el.url" :class="[e.classes.link_style, e.classes.link_rad]">{{e.el.link_text}}</a>
        </div>
    </div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
import __ from '../languages/index.js';
import {id} from '../utils/globals.js';
export const meta = {
    title: 'Card',
    icon: 'fa-solid fa-address-card',
    props: {
        'type': 'card',
        'id': id(),
        'classes': {
            'wi': '',
            'bs': '',
            'bg': 'bg-white',
            'link_style': 'but-blue',
            'p_card': '',
            'fd': '',
            'p': 'p-1',
            'pc': '',
            'br': '',
            'fs': 'fs-10',
            'br': 'br-5',
            'separator': __('Button Style'),
            'link_style': 'but-blue',
            'link_color': 'but-blue-d2',
            'col': 'tx-black',
            'link_rad': 'br-5',
            'ratio': 'ratio-auto',
            'hover_effect': '',
            'ja': '',
        },
        'el': {
            'title': '',
            'text': '',
            'img': '',
            'icon': '',
            'button': false,
            'url': '',
            'target': '_self',
            'link_text': 'Read More',
        }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],
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
