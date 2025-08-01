<template>
    <div v-for="(e, i) in patterns" class="lm-pattern">

        <h3 class="jc-b">
            <span>{{ e.title }}</span>
            <div class="g-05">
                <i class="fa-solid fa-eye" v-tip-delay="$__('Preview')" @click="preview(e.slug)"></i>
                <i class="fa-solid fa-plus" v-tip-delay="$__('Add')"></i>
            </div>
        </h3>
        <div>{{ e.description }}</div>

        <!-- <div class="d-icons">
            
        </div> -->
    </div>

    <template v-if="ops.preview">
        <transition name="pop">
            <pattern-render />
        </transition>
        preview
    </template>
    <!-- <div class="delay-tooltip">tttttt</div> -->
</template>

<script>
//todo!!! add tip
import { fetchFile } from "../utils/helpers.js";
import jetTip from '../utils/jetTip.vue';
import { ops } from "../data/data.js";
import patternRender from "./patternRender.vue";
// import JetForms from "./JetForms.vue";

export default {
    components: {
        patternRender,
    },
    data() {
        return {
            ops,
            // preview:false,
            patterns: [],
        };
    },
    methods: {
        preview(e) {
            if (!this.ops.preview) {
                this.ops.preview = true;
                this.ops.pattern_slug = e;
            } else {
                this.ops.preview = false;
            }
        },
    },
    async mounted() {
        // const path = `${this.$domain}/data/patterns/index.php`;//!!! prod ver
        const path = `${this.$domain}/data/patterns/index.json`;//!!! dev ver as testing on html
        console.log('path: ', path);
        this.patterns = await fetchFile(path);
        console.log('this.patterns----- ', this.patterns);
    }
};
</script>
