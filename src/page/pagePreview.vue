<template>
    <div id="page-preview" :class="[theme.page.bg, theme.page.col]" :style="pageStyle()">
        <jet-header :el="theme.header" />
        <main-content />
        <jet-footer :el="theme.footer" />
    </div>
</template>

<script>
import { style, theme } from "../data/data.js"; //todo!!! rm style and theme after i'll do fetching
import JetHeader from "./JetHeader.vue";
import JetFooter from "./JetFooter.vue";
import MainContent from "./MainContent.vue";

export default {
    components: {
        "jet-header": JetHeader,
        "jet-footer": JetFooter,
        "main-content": MainContent,
    },
    data() {
        return {
            style: style,
            theme,
        };
    },
    methods:{
        pageStyle(){
            if (theme.page.bg_type =='gr') {
                return `background: ${theme.page.bg1};background: linear-gradient(${theme.page.grad_dir}, ${theme.page.bg1} 0%, ${theme.page.bg2} 100%);`;
            }
        }
    }
};
</script>
