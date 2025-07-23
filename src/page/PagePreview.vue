<template>
    <div id="page" :class="[style.page.bg, style.page.col]">
        <jet-header :el="style.header" />
        <jet-footer :el="style.footer" />
    </div>
</template>

<script>
import { style } from "../admin/data.js"; //todo temp
import JetHeader from "./JetHeader.vue";
import JetFooter from "./JetFooter.vue";

export default {
    components: {
        "jet-header": JetHeader,
        "jet-footer": JetFooter,
    },
    data() {
        return {
            style: style,
        };
    },
};
</script>
