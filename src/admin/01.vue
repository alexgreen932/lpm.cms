<template>
    <div class="w-container p-1">Section Theme</div>
    <field-tip :fields="null" v-model="tip" />
</template>

<script>
import { ops } from "../data/data.js";
import fieldTip from '../form/fields/field-tip.vue';
// import JetForms from "./JetForms.vue";

export default {
    components: {
        fieldTip,
    },
    data() {
        return {
            ops,
            tip: 'themes',
        };
    },
    methods: {
        func() {},
    },
};
</script>
