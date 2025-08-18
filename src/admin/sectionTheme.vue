<template>
    <div class="fd-c g-05">
        <h3 class="fs-15 g-05">{{$__('Theme')}}<field-tip no_title="1" :fields="null" v-model="tip" /></h3>
        
        <ul class="j-tabs top style-bg tx-black">
            <li v-for="(e, i) in menu" :class="$isActive(ops.theme_part, e)" @click="ops.theme_part = e">{{ e }}</li>
        </ul>
        <ul class="j-tabs-content">
            <li v-if="ops.theme_part == 'Page'">
                <jet-form :obj="ops.theme.page" :fields="$root.renderFields(ops.theme.page)" />
            </li>

            <li v-if="ops.theme_part == 'Header'">
                header
                <jet-form :title="$__('Header Style')" :obj="ops.theme.header.sec" :fields="$root.renderFields(ops.theme.header.sec)" />
                <!-- <jet-form v-if="element.style" :obj="element.style" :fields="$root.renderFields(element.style)" /> -->
            </li>
        </ul>
    </div>


</template>

<script>
import { ops } from "../data/data.js";
import fieldTip from '../form/fields/field-tip.vue';
import jetForm from "../form/jetForm.vue";

export default {
    components: {
        fieldTip,
        jetForm,
    },
    data() {
        return {
            ops,
            tip: 'theme',
            menu: ['Page', 'Header', 'Footer'],
            //theme: ops.theme//temp for dev.... not anymore - todo load default data on app start
        };
    },
    methods: {
        func() { },
    },
    mounted(){
    //     console.log('%c -------', 'color: #d90000', this.ops.theme.header.sec);
    }
};
</script>
