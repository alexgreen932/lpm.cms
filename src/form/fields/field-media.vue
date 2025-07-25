<template>
    <div class="ai-c br-4 bg-white j-click">
        <div class="fg-1 ph-1" @click="show = !show">
            <span v-if="!modelValue">{{ $__('Select') }}</span>
            <span v-if="modelValue">{{ $__('Change') }}</span>
        </div>
        <div class="bg-blue tx-white p-05" @click="$emit('update:modelValue', '')"><i class="fa-solid fa-xmark"></i>
        </div>

    </div>

    <media-manager v-if="show" src="media" cls="j-modal" width="w-3-5" />
</template>

<script>
export default {
    name: 'field-input',
    props: ['modelValue', 'f'],
    data() {
        return {
            show: false,
            // placeholder: 'Enter value...'
        };
    },
    methods: {
        inputType() {
            // fallback to text if not provided
            // return this.f.ops || 'text';
        }
    }
};
</script>
