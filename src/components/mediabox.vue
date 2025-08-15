<template>
    <div class="element card" :class="$root.classes(e.classes, 'link_rad, link_style, p, fd, ratio, hover_effect')">  
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        <div :class="[e.classes.p, dir()]">
            <h3 v-if="e.el.title">{{e.el.title}}</h3>
            <!-- {{e}} -->
            <div v-if="e.el.text" :class="e.classes.fs" v-html="e.el.text"></div>
            <div v-if="!e.el.text" class="b-blue p-1 jc-c">{{$__('Add some text to your card')}}</div>
            <a v-if="e.el.button" :href="e.el.url" :class="[e.classes.link_style, e.classes.link_rad]">{{e.el.link_text}}</a>
        </div>
        <figure v-if="e.el.img" :class="[e.classes.ratio, e.classes.hover_effect]">
            <img v-if="e.el.media_type=='img'" :src="e.el.media" :alt="title()">
        </figure>
    </div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
import __ from '../languages/index.js';
import {id} from '../utils/globals.js';
export const meta = {
    title: 'Media box',
    icon: 'fa-solid fa-rocket',
    desc: 'Lorem Ipsum',
    props: {
        'type': 'mediabox',
        'id': id(),
        'classes': {
            'wi': '',
            'bs': '',
            'bg': 'bg-white',
            'link_style': 'but-blue',
            'dir_main': '',
            'dir_title': '',
            'dir_conent': '',
            'media': '',//??
            'p': 'p-1',
            'pc': '',
            'br': '',
            'fs': 'fs-10',
            'br': 'br-5',
            'separator': __('Button Style'),
            'style_but1': 'but-blue',
            'style_but2': 'but-blue',
            'link_rad': 'br-5',
            'ratio': 'ratio-auto',
            'hover_effect': '',
            'ja': '',
        },
        'el': {
            'title': 'Media Box',
            'an_h': '',
            'text': '',
            'an_t': '',
            'media_type': 'img',
            'media': 'media/girl.png',
            'an_m': '',
            'icon': '',
            'an_i': '',
            'button1': 'Demo',
            'url': '',
            'an_b1': '',
            'button2': 'Download',
            'url2': '',
            'an_b2': '',
            'url': '',
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
