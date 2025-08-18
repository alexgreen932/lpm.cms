<template>
    <div id="page-preview" :class="[ops.theme.page.bg0, ops.theme.page.p]" :style="gradientStyle()">
        <!-- <jet-header :el="ops.theme.header" /> -->
        <theme-part part="header" :el="ops.theme.header" />
        <main-content />
        <!-- <jet-footer :el="ops.theme.footer" /> -->
        <!-- <theme-part part="footer" :el="ops.theme.footer" /> -->
    </div>
</template>

<script>
//todo!!! rm header and footer, replacing with section/part
import { ops } from "../data/data.js"; //todo!!! rm style and theme after i'll do fetching
import JetHeader from "./JetHeader.vue";
import JetFooter from "./JetFooter.vue";
import MainContent from "./MainContent.vue";
import themePart from "./themePart.vue";

export default {
    components: {
        "jet-header": JetHeader,
        "jet-footer": JetFooter,
        "main-content": MainContent,
        themePart,
    },
    data() {
        return {
            ops,
        };
    },
    methods:{
        gradientStyle(){
            if (ops.theme.page.bg_type =='gr') {
                return `background: ${ops.theme.page.bg1};background: linear-gradient(${ops.theme.page.grad_dir}, ${ops.theme.page.bg1} 0%, ${ops.theme.page.bg2} 100%);`;
            }
        }
    }
};
</script>
