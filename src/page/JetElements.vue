<template>
    <!-- <component
        :is="getComponent(e.type)"
        :e="e"
    /> -->
    <template v-if="elements && elements.length" v-for="(e, i2) in elements" :key="i2"> {{ e.type
        }}
        ---{{e.type}}
        <component v-if="e.type == 'title'" :is="e.tag" class="element" :class="classes(e)">
            <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements"  :index="i2" />
            <template v-if="e.text">
                {{ e.text }}
            </template>

            <span v-if="!e.text" class="tx-grey">{{ $__('Enter a title') }}</span>
        </component>
        <dev v-if="e.type !== 'title'" :is="e.tag" class="element" :class="classes(e)">
            <jet-toolbar cls="element" :sec="sec" :dir="dir" :elements="elements"  :index="i2" />
            <component is:="e.type" :e="e"/>
        </dev>
    </template>
</template>

<script>
import jetToolbar from './jetToolbar.vue';
const modules = import.meta.glob("../components/*.vue", { eager: true });

export default {
    props: ['elements', 'sec', 'dir'],
    components: {
        "jet-toolbar": jetToolbar,
    },
    methods: {
                classes(e) {
            let col = e.col ? e.col : '';
            let fs = e.fs ? e.fs : '';
            let bg = e.bg ? e.bg : '';
            let effect = e.effect ? e.effect : '';
            let stl = e.stl ? e.stl : '';
            let br = e.br ? e.br : '';
            let p = e.p ? e.p : '';
            let m = e.m ? e.m : '';
            let g = e.g ? e.g : '';
            let fd = e.fd ? e.fd : '';
            let class_list = [col, fs, bg, stl, effect, br, p, m, fd];
            let arr = [];
            class_list.map(cls => {
                if (cls !== '') {
                    arr.push(cls);
                }
            });
            return arr;
            //can be added more
            //return an array of above or string via map.join, just how is better and simplie
        },
        getComponent(type) {
            const name = `../components/${type}.vue`;
            return modules[name].default;
        },
    },
};
</script>
