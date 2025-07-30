<template>
    <!-- <component
        :is="getComponent(e.type)"
        :e="e"
    /> -->
    <template v-if="elements && elements.length" v-for="(e, i2) in elements" :key="i2">
        <!-- dev---{{ e.type }} -->
        <component v-if="e.type == 'title'" :is="e.tag" class="element" :class="classes(e.classes)">
            <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="i2" />
            <template v-if="e.content.text">
                {{ e.text }}
            </template>

            <span v-if="!e.text" class="tx-grey">{{ $__('Enter a title') }}</span>
        </component>
        <div v-if="e.type!=='title'" :is="e.tag" class="element" :class="classes(e.classes)">
            <!-- <h3>not title---{{e.type}}</h3> -->
            <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements" :index="i2" />
            <component :is="getComponent(e.type)" :e="e" />
        </div>
    </template>
</template>

<script>
//TODO!!! RM not used anymore
import jetToolbar from './jetToolbar.vue';
const modules = import.meta.glob("../components/*.vue", { eager: true });

export default {
    props: ['elements', 'sec', 'dir'],
    components: {
        "jet-toolbar": jetToolbar,
    },
    methods: {
        classes(e) {
           return Object.values(e).filter(Boolean);
        },
        getComponent(type) {
            const name = `../components/${type}.vue`;
            return modules[name].default;
        },
    },
};
</script>
