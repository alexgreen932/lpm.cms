<template>
    <div id="page-preview" :class="[ops.theme.page.bg0, ops.theme.page.p]" :style="gradientStyle()">
        <!-- <jet-header :el="ops.theme.header" /> -->
        <theme-part part="header" :el="ops.theme.header" />
        <div v-if="sampleData()" class="w-container pv-1">
            <img :src="dataImg()" alt="Sample data">
        </div>
        <main-content v-if="!sampleData()" />
        <!-- <jet-footer :el="ops.theme.footer" /> -->
        <!-- <theme-part part="footer" :el="ops.theme.footer" /> -->
         <div v-if="ops.sample_data" class="theme-edit-mode">
            <jet-form :obj="ops" :fields="[{ title:'Click to leave blank data mode',key: 'sample_data', type: 'checkbox' }]" />
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
    methods:{
        gradientStyle(){
            if (ops.theme.page.bg_type =='gr') {
                return `background: ${ops.theme.page.bg1};background: linear-gradient(${ops.theme.page.grad_dir}, ${ops.theme.page.bg1} 0%, ${ops.theme.page.bg2} 100%);`;
            }
        },
        sampleData(){
            if (this.ops.sample_data) {
                return true;
            }else{
                return false;
            }
        },
        dataImg(){
            return this.$domain + '/media/data.png';
        }
    }
};
</script>
