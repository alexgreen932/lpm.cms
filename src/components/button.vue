<template>
    <a v-if="e.el.text" class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
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
            'but_style': 'but-normal',
            'bg': 'bg-blue',
            'fs': '',
            'col': 'tx-white',
            'br': 'br-5'
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
    props: ['elements', 'sec', 'dir', 'e', 'index'],
};
</script>
