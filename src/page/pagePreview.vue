<template>
    <div id="page-preview" :class="[ops.theme.page.bg0, ops.theme.page.p]" :style="gradientStyle()">
        <!-- <jet-header :el="ops.theme.header" /> -->
        <theme-part part="header" :el="ops.theme.header" />
        <div v-if="sampleData()" class="w-container pv-1">
            img here in prod
            <!-- <img :src="dataImg()" alt="Sample data"> -->
        </div>
        <main-content v-if="!sampleData()" />
        <!-- <jet-footer :el="ops.theme.footer" /> -->
        <!-- <theme-part part="footer" :el="ops.theme.footer" /> -->
        <div v-if="ops.sample_data" class="theme-edit-mode">
            <jet-form :obj="ops"
                :fields="[{ title: 'Click to leave blank data mode', key: 'sample_data', type: 'checkbox' }]" />
        </div>
        <!-- dev //todo!!! rin -->
        <div class="w-container wc-1-4 b-blue g-1 p-1 nv-1 wc-1-2">
            <div class="b-blue fd-c g-1 p-1">
                sample_data --- {{ ops.sample_data }}<br/>
                current_part --- {{ ops.theme_part }}<br/>
                ops.current_section --- {{ ops.current_section }}<br/>
                this.ops.current_el--- {{ this.ops.current_el }}<br/>
                ops.current_edit --- {{ ops.current_edit }}<br/>
                </div>
            <textarea rows="40"></textarea>
            <textarea rows="40">theme --- {{ ops.theme }}</textarea>
        </div>
    </div>
</template>

<script>
//todo!!! rm header and footer, replacing with section/part
import { ops } from "../data/data.js"; //todo!!! rm style and theme after i'll do fetching
import JetHeader from "./JetHeader.vue";
import JetFooter from "./JetFooter.vue";
import MainContent from "./MainContent.vue";
import themePart from "./themePart.vue";
import jetForm from "../form/jetForm.vue";

export default {
    components: {
        "jet-header": JetHeader,
        "jet-footer": JetFooter,
        "main-content": MainContent,
        themePart,
        jetForm,
    },
    data() {
        return {
            ops,
        };
    },
    methods: {
        gradientStyle() {
            if (ops.theme.page.bg_type == 'gr') {
                return `background: ${ops.theme.page.bg1};background: linear-gradient(${ops.theme.page.grad_dir}, ${ops.theme.page.bg1} 0%, ${ops.theme.page.bg2} 100%);`;
            }
        },
        sampleData() {
            if (this.ops.sample_data) {
                return true;
            } else {
                return false;
            }
        },
        dataImg() {
            return this.$domain + '/media/data.png';
        }
    }
};
</script>
