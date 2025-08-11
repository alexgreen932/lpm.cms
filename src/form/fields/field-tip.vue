<template>
    <div class="tip-heading j-click" @click="show = !show">{{ $__('Tips') }} <i
            class="fa-solid fa-circle-exclamation"></i>
    </div>
    <transition name="pop">
        <div v-if="show" class="tips-box" @click="show = !show">
            <div class="jc-e"><i class="fa-solid fa-xmark j-click"></i></div>
            <div v-html="tipData()"></div>
        </div>
    </transition>

</template>

<script>
import {tips} from './presets/tips.js';

export default {
    name: 'field-tip',
    props: ['modelValue', 'f'],
    data() {
        return {
            show: false,
        };
    },
    methods: {
        tipData() {
            let output = tips[this.modelValue];
            return output;
        }
    }
};
</script>
