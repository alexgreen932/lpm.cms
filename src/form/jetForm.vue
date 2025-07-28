<template>
    <div class="jet-form" :class="formstyle">
        <h3 v-if="title">{{ title }}</h3>
        <div v-for="(f, i) in normalizedFields" :key="i" class="control-group">
            <label>{{ f.title }}</label>
            <!-- dynamically resolve component -->
            <component :is="getComponent(f.type)" v-model="obj[f.key]" :f="f" />
        </div>
    </div>
</template>

<script>
/**
 * Load all field components from /fields folder eagerly.
 * File names must match pattern: field-*.vue (e.g., field-input.vue, field-select.vue)
 */
const modules = import.meta.glob('./fields/*.vue', { eager: true });

export default {
    props: ['title', 'formstyle', 'obj', 'fields'],
    //todo render form even props missed

    computed: {
        /**
         * Ensure each field has a type (default is 'input').
         */
        normalizedFields() {
            //protection if form fields are empty
            if (!this.obj) {
                console.error('Form fields props is empty!')
                return;
            }
            if (!this.fields) {
                console.error('Form fields props is empty!')
                return;
            }
            return this.fields.map(f => ({
                type: 'input',  // default type if not provided
                ...f
            }));
        }
    },

    methods: {
        /**
         * Get correct component for a given field type.
         * Example: type="input" → ./fields/field-input.vue
         */
        getComponent(type) {
            const file = `./fields/field-${type}.vue`;
            return modules[file]?.default || null;
        }
    }
};
</script>
