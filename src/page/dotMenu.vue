<template>
    dot menu
    <div class="dot-menu">
        <a v-for="(e, i) in ops.current_page_data.sections" :href="link(i)" :data-tooltip="e.title" data-flow="left"></a>
    </div>
</template>

<script>
import { ops } from "../data/data.js";
// import JetForms from "./JetForms.vue";

export default {
    // components: {
    //     "jet-forms ": JetForms,
    // },
    data() {
        return {
            ops: ops,
        };
    },
    methods: {
        link(i) {
            let num = i + 1;
            return '#section-'+num;
        },
    },
};
</script>
