<template>
    <ul class="j-tabs top style-bg">
        <li v-for="(tab, i) in tabs" :class="$isActive(current, i)" @click="current = i">{{ tab.t }}</li>
    </ul>
    <ul class="j-tabs-content">
        <li v-if="current == 0">
            <jet-form :obj="element.el" :fields="renderFields(element.el)" />
        </li>
            
        <li v-if="current == 1">
            <jet-form :obj="element.classes" :fields="renderFields(element.classes)" />
            <jet-form v-if="element.style" :obj="element.style" :fields="renderFields(element.style)" />
        </li>
    </ul>
    <!-- content---{{renderFields(element.el)}}<br>
    classes---{{element.classes}}<br> -->
</template>
<script>
// import { ops } from "../data/data.js";
import jetForm from '../form/jetForm.vue';
import {fields_presets} from '../data/fields_presets.js';

export default {
    components: {
        jetForm,
    },
    props: ['element'],
    data() {
        return {
            // ops: ops,
            current: 0,
            // fields,
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
        
            //get existing kuys
            let keys = Object.keys(obj);
            console.log('keys: ', keys);
            
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
