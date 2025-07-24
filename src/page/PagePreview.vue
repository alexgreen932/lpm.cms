<template>
    <div id="page" :class="[style.page.bg, style.page.col]">
        <jet-header :el="style.header" />
        <main-content />
        <jet-footer :el="style.footer" />
    </div>
</template>

<script>
import { style } from "../data/data.js"; //todo temp
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
        };
    },
};
</script>
