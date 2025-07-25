<template>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :rows="rows()"
        :placeholder="placeholder"
    ></textarea>
</template>

<script>
export default {
    name: 'field-input',
    props: ['modelValue', 'f'],
    data() {
        return {
            placeholder: this.$__('Enter text...'),
        };
    },
    methods: {
        rows() {
            // fallback to text if not provided
            return this.f.ops || 5;
        }
    },
};
</script>
