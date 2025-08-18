<template>
    <component :is="part" :id="part" :class="[el.sec.bg0, el.sec.col]" :style="gradientStyle()">
        <template v-for="(sec, i) in el.sections">
            <render-section :sec="sec" :type="part" :i="i" />
        </template>
        <div v-if="sec.bg_type == 'img'" class="img-bg" :class="[sec.o, sec.fb, sec.ba, sec.bp]"
            :style="{ 'background-image': 'url(' + sec.img + ')' }"></div>
    </component>
</template>

<script>
import renderSection from './renderSection.vue';
import { ops } from "../data/data.js";
//todo!!! rm partSection if not used

export default {
    components: {
        renderSection
    },
    props: ['el', 'part'],

    data() {
        return {
            ops,
        };
    },
    methods: {
        gradientStyle() {
            let partSec = this.ops.theme[this.part];
            if (this.part == 'header') {
                this.sec = this.ops.theme.header.sec;
            } else {

            }

            if (this.sec.bg_type == 'gr') {
                return `background: ${this.sec.bg1};background: linear-gradient(${this.sec.grad_dir}, ${this.sec.bg1} 0%, ${this.sec.bg2} 100%);`;
            } else {
                return null;
            }
        }
    }
};
</script>
