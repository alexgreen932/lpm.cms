<template>
    <div class="patterb-preview tx-black">
        <header class="jc-b">
            <h3>{{ $__('Preview Pattern') }} - <span class="tx-blue-d1">{{ preview_data.title }}</span></h3>
            <div class="ai-c g-1">
                <div class="but-indigo">{{ $__('Clone and Edit') }}</div>
                <div v-if="ops.current_section !== 99" class="but-blue" @click="addPattern()">{{ $__('Add') }}</div>
                <div class="but-grey" @click="ops.preview = false">{{ $__('Close') }}</div>
            </div>
        </header>
        <!-- preview_data.data---{{ preview_data.data}} -->
        <render-section v-if="preview_data.data" :sec="preview_data.data" :i="0" />
        <div class="b-blue bg-blue-l5 p-1 jc-c mh-1 br-5">
            {{ $__('To add this pattern close this window, open a page, mouse over any section click "+" and select')}} {{ $__('Add Pattern') }}
            </div>

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
            preview_data: { title: null, sec: null },
        };
    },
    methods: {
        addPattern() {
            let item = this.preview_data.data;
            let target = this.ops.current_page_data;
            let insertIndex = this.ops.current_section + 1;
            target.sections.splice(insertIndex, 0, item);
            this.ops.preview = false;
        },
    },
    async mounted() {
        const path = `${this.$domain}/data/patterns/${this.ops.pattern_slug}.json`;//!!! dev ver as testing on html
        
        this.preview_data = await fetchFile(path);
        //  
        
    }
};
</script>
