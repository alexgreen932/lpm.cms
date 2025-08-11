<template>
    <TransitionGroup name="fade">
    <div v-if="isActive" class="admin-modal-bg" @click="isActive = !isActive"><i class="fa-solid fa-xmark"></i></div>
    <div class="grouped-forms" :class="{ active: isActive }">
        <h3 class="fs-12 jc-b ai-c">
            <span>{{ $__('Items') }}</span>
            <div class="max-min" @click="isActive = !isActive">
                <template v-if="!isActive"><i class="fa-solid fa-maximize"></i> {{ $__('max window') }}</template>
                <template v-if="isActive"><i class="fa-solid fa-minimize"></i> {{ $__('min window') }}</template>
            </div>
        </h3>
        <!-- Grouped form -->
        <!-- ---88{{group}} -->
        <ul class="">
            <!-- <li v-for="(item, i) in group" :class="$isActive(current, i)" @click="current = i"> -->
            <li v-for="(item, i) in group" :key="i">
                <!-- {{item}} -->
                <h4>
                    <span>{{ itemTitle(i) }}</span>
                    <jet-toolbar cls="group-toolbar" :elements="group || []" dir="fd-c" :index="i" />

                </h4>
                <jet-form :obj="item" :fields="renderFields(item)" />
                <!-- <jet-form :obj="group" :fields="renderFields(group.items)" /> -->
            </li>
            <div class="add-in-el">
                <h3>{{ $__('Add More') }}</h3>
                <jet-form :obj="newItem" :fields="renderFields(group[0])" />
                <!-- {{newItem}} -->
                <div class="but-blue br-4 mt-05" @click="addNew">{{ $__('Add') }}</div>
            </div>
        </ul>
    </div>
    </TransitionGroup>

</template>

<script>
// import { ops } from "../data/data.js";
import jetForm from '../form/jetForm.vue';
import { fields_presets } from '../data/fields_presets.js';
import jetToolbar from '../page/jetToolbar.vue';

export default {
    components: {
        jetForm,
        jetToolbar,
    },
    props: ['group'],
    data() {
        return {
            newItem: {},
            isActive: false,
        };
    },
    methods: {
        itemTitle(i) {
            let num = i + 1;
            return this.$__('Item') + '-' + num;
        },
        addNew() {
            this.group.push(this.newItem);
        },
        renderFields(obj) {
            let fields = [];

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
