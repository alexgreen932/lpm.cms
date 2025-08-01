<template>
    <div class="patterb-preview tx-black">
        <header class="jc-b">
            <h3>{{ $__('Preview Pattern') }} - <span class="tx-blue-d1">{{ preview_data.title }}</span></h3>
            <div class="ai-c g-1">
                <div class="but-indigo">{{ $__('Clone and Edit') }}</div>
                <div class="but-blue">{{ $__('Add') }}</div>
                <div class="but-grey" @click="ops.preview = false">{{ $__('Close') }}</div>
            </div>
        </header>
        <!-- ////{{ preview_data.data}} -->
        <render-section v-if="preview_data.data" :sec="preview_data.data" :i="0" />

    </div>
</template>

<script>
import { ops } from "../data/data.js";
import { fetchFile } from "../utils/helpers.js";
import renderSection from "../page/renderSection.vue";
// import JetForms from "./JetForms.vue";

export default {
    components: {
        renderSection
    },
    data() {
        return {
            ops,
            preview_data: {title:null,sec:null},
        };
    },
    methods: {
        func() { },
    },
    async mounted(){
        const path = `${this.$domain}/data/patterns/${this.ops.pattern_slug}.json`;//!!! dev ver as testing on html
        console.log('path: ', path);
        this.preview_data = await fetchFile(path);
        console.log('this.pattern_data----- ', this.data);
    }
};
</script>
