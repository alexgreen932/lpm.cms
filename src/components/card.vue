<template>
    <a class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        {{e.el.text}}
    </a>
    <div v-if="!e.el.text" class="tx-grey">{{ $__('Enter a text') }}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: 'Card',
    icon: 'fa-solid fa-address-card',
    props: {
        'type': 'card',
        'classes': {
            'but_style': 'but-normal',
            'bg': 'bg-blue',
            'fs': '',
            'col': 'tx-white',
            'br': 'br-5'
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
};
</script>
