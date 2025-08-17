<template>
    <div class="tip-heading j-click" @click="show = !show">{{ $__('Tips') }} <i
            class="fa-solid fa-circle-exclamation"></i>
    </div>
    <TransitionGroup name="pop">
        <div v-if="show" class="admin-modal-bg" @click="show = !show">
            <div class="jc-e"><i class="fa-solid fa-xmark j-click"></i></div>
        </div>
        <div v-if="show" class="tips-box" @click="show = !show">
            <i class="fa-solid fa-xmark j-click float-r"></i>
            <div v-html="tipData()"></div>
        </div>
    </TransitionGroup>

</template>

<script>
import { tips } from './presets/tips.js';

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
            console.log('this.modelValue: ', this.modelValue);
            console.log('tips----- ', tips);
            console.log('output----- ', output);
            return output;
        }
    }
};
</script>
