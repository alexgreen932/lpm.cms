<template>
    <a class="element" :class="$root.classes(e.classes)">
        <jet-toolbar :part='part' cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        {{e.el.text}}
    </a>
    <div v-if="!e.el.text" class="tx-grey">{{ $__('Enter a text') }}</div>
</template>

<script>
import jetToolbar from '../page/jetToolbar.vue';
export const meta = {
    title: 'Button',
    icon: 'fa-solid fa-link',
    props: {
        'type': 'button',
        'classes': {
            'bg': 'bg-blue',
            'col': 'tx-white',
            'but_style': 'but-normal',
            'fs': '',
            'br': 'br-5',
            "ja": ""
        },
        'el': { 
            'url': '',
            'target': '_self',
            'text': 'Read More',
         }
    },
};

export default {
    components: { jetToolbar },
    props: ['elements', 'part', 'sec', 'dir', 'e', 'index'],
};
</script>
