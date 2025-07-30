<template>
    <ul class="j-tabs top style-bg">
        <li v-for="tab in tabs" @click="current == tab.v">{{ tab.t }}</li>
    </ul>
    <ul class="j-tabs-content">
        <li v-if="current == 'content'"></li>
        <li v-if="current == 'style'">
            <jet-form :obj="dev" :fields="renderFields(dev.classes)" />
        </li>
    </ul>
</template>
<script>
// import { ops } from "../data/data.js";
import jetForm from '../form/jetForm.vue';

export default {
    components: {
        jetForm,
    },
    data() {
        return {
            // ops: ops,
            current: 'style',
            tabs: [
                { v: 'content', t: this.$__('Content') },
                { v: 'style', t: this.$__('Style') }
            ],
            dev: {
                "type": "title",
                "tag": "h1",
                "classes": {
                    "fs": "fs-20",
                    "fw": "",
                    "col": ""
                },
                "content": { "text": "This is Sample Title" }

            }
        };
    },
    methods: {
        renderFields(obj){
            let fields = [];
            
            //woll be imported when big, for starting dev it's here
            let fields_presets = {
                bg:{ title: this.$__('Background'), key: 'bg', type: 'picker', ops:'bg' },
                w:{ title: this.$__('Container Width'), key: 'w', type: 'select', ops:'w' },
                jc:{ title: this.$__('Justify Content'), key: 'jc', type: 'select', ops:'jc' },
                ai:{ title: this.$__('Align Items'), key: 'ai', type: 'select', ops:'ai' },
                fs:{ title: this.$__('Font Size'), key: 'fs', type: 'range', ops:'fs' },
                fw:{ title: this.$__('Font Weight'), key: 'fw', type: 'select', ops:'fw' },
                col:{ title: this.$__('Color'), key: 'col', type: 'picker', ops:'col' },
            }
            // obj.forEach((e) => {})
            //get existing kuys
            let keys = Object.keys(obj);
            
            keys.forEach((e) => {
                //key exist in fields_preset
                if (e in fields_presets) {
                    let field = fields_presets[e];
                    fields.push(field);
                }
            })
            
            return fields;
        },
    },
};
</script>
