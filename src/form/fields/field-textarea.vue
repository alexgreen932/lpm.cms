<template>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :rows="rows"
        :cols="cols"
        :placeholder="placeholder"
    ></textarea>
</template>

<script>
export default {
    name: 'field-input',
    props: ['modelValue', 'f'],
    data() {
        return {
            rows: 5,
            cols: '',
            placeholder: this.$__('Enter text...'),
        };
    },
    mounted() {
        if (this.f.ops && this.f.ops === 'big') {
            this.rows = 10;
        }
    },
};
</script>
