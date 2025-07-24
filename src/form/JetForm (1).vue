<template>
    <div class="jet-form" :class="formtyle">
        <h3 v-if="title">{{title}}</h3>
        ---{{fields}}
        <div v-for="(e, i) in fields" class="control-group">
            <label>{{e.title}}</label>
            <component :is="e.type" :e="e" />
        </div>

    </div>
</template>

<script>
// import { ops } from "../data/data.js";
// import JetForms from "./JetForms.vue";

export default {
    props:['title', 'formtyle', 'arr', 'fields'],
    // components: {
    //     "jet-forms ": JetForms,
    // },
    data() {
        return {
            // ops: ops,
        };
    },
    methods: {
        func() {
        },
    },
};
</script>
