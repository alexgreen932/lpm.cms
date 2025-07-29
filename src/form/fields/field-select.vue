<template>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <option v-for="op in ops()" :value="op.v">{{op.t}}</option>
    </select>
</template>

<script>
import {options} from './presets/options.js';

export default {
    name: 'field-select',
    props: ['modelValue', 'f'],
    data() {
        return {
            placeholder: 'Enter value...'
        };
    },
    methods: {
        ops() {
            let arr = [];
                console.log('this.f.ops: ', this.f.ops);
            if (!this.f.ops) {
                console.error(this.$__('Options in select form is missed'));
                return arr;
            }
            // return this.f.ops || 'text';
            if (typeof this.f.ops === 'string') {
                let key = this.f.ops;
                console.log('options[key]: ', options[key]);
                return options[key];
            } else {
                return this.f.ops;
            }
        }
    }
};
</script>
