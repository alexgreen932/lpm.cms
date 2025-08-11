<template>
    <div class="control-section">
            <h3>{{ $__('Patterns') }} <jet-tip :content="pattern" /></h3>
            <ul class="g-05">
                <li v-for="(e, i) in preview_tabs" class="but-default br-5 fs-9 p-05" :class="$isActive(current, i)" @click="current=i">{{e}}</li>
            </ul>
            <list-pattern v-if="current==0" />
            <div v-if="current==1"  class="b-blue bg-blue-l5 tx-black jc-c p-05">{{$__('Coming soon')}}</div>
            <pattern-create v-if="current==2" />


            <!-- <form-wrapper />         -->

        </div>
</template>

<script>
import { ops } from "../data/data.js";
import listPattern from "./listPattern.vue";
import patternCreate from "./patternCreate.vue";
// import JetForms from "./JetForms.vue";

export default {
    components: {
        listPattern,
        patternCreate
    },
    data() {
        return {
            ops,
            preview_tabs: [this.$__('Patterns'),this.$__('Get More'),this.$__('Create New')],
            current:0,
        };
    },
    methods: {
        func() {},
    },
};
</script>
