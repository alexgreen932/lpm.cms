<template>
    <form method="post" action="">
        <input type="hidden" name="action" value="savepage">
        <input type="hidden" name="string" :value="jsonString()">
        <input type="hidden" name="slug" :value="slug">
        <button type="submit">
            <span v-if="button">{{ button }}</span>
            <span v-else>{{ $__('Save') }}</span>
        </button>
    </form>
</template>

<script>
export default {
    /**
     * Universal save form component
     * 
     * Props:
     * - obj: Object or Array - data to save
     * - slug: String - file name (slug)
     * - button: String (optional) - custom button text
     */
    props: {
        obj: {
            type: [Object, Array],  // supports both object and array
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        button: {
            type: String,
            default: ''
        }
    },
    methods: {
        /**
         * Converts object/array to a JSON string.
         * Returns '{}' on error.
         */
        jsonString() {
            try {
                return JSON.stringify(this.obj ?? {}, null, 2);
            } catch (e) {
                console.error('Failed to stringify object', e);
                return '{}';
            }
        }
    }
};
</script>
