<template>
    <input
        :type="inputType()"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
    />
</template>

<script>
export default {
    name: 'field-input',
    props: ['modelValue', 'f'],
    data() {
        return {
            placeholder: 'Enter value...'
        };
    },
    methods: {
        inputType() {
            // fallback to text if not provided
            return this.f.ops || 'text';
        }
    }
};
</script>
