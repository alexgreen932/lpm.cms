<template>
    <div class="fd-c g-05">
        <h3 class="fs-15 g-05">{{$__('Theme')}}<field-tip no_title="1" :fields="null" v-model="tip" /></h3>
        
        <ul class="j-tabs top style-bg tx-black">
            <li v-for="(e, i) in menu" :class="$isActive(current, e)" @click="current = e">{{ e }}</li>
        </ul>
        <ul class="j-tabs-content">
            <li v-if="current == 'Page'">
                <jet-form :obj="default_theme.page" :fields="$root.renderFields(default_theme.page)" />
            </li>

            <li v-if="current == 1">
                <jet-form :obj="element.classes" :fields="$root.renderFields(element.classes)" />
                <jet-form v-if="element.style" :obj="element.style" :fields="$root.renderFields(element.style)" />
            </li>
        </ul>
    </div>


</template>

<script>
import { ops, theme } from "../data/data.js";
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
            current: 'Page',
            default_theme: theme,//temp for dec
        };
    },
    methods: {
        func() { },
    },
};
</script>
