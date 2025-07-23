<template>
    <div class="jet-forms">
        <div v-for="(form, i) in sections">
            <j-form
                :obj="form"
                :title="'Edit Style'"
                :fields="[
                    { el: 'w', title: __('Container Width'), type: 'w' },
                    { el: 'jc', title: __('Justify Content'), type: 'jc' },
                    { el: 'ai', title: __('Atem Align'), type: 'ai' },
                ]"
            >
            </j-form>
        </div>
    </div>
</template>

<script>
import { ops } from "./data.js";
import JetForm from "../form/JetForm.vue";

export default {
    components: {
        "jet-form": JetForm,
    },
    data() {
        return {
            sections: [],
        };
    },
    methods: {
        func() {},
    },
};
</script>
