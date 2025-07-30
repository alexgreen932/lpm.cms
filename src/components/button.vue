<template>
    <a v-if="e.content.text" class="element" :class="$root.classes(e.classes)">
        <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="index" />
        {{e.content.text}}
    </a>
    <div v-if="!e.content.text" class="tx-grey">{{ $__('Enter a text') }}</div>
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
        'content': { 
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
