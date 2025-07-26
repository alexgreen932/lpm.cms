<template>
    <div class="ai-c br-4 bg-white j-click">
        <div class="fg-1 ph-1" @click="show = !show">
            <span v-if="!modelValue">{{ $__('Select') }}</span>
            <span v-if="modelValue">{{ $__('Change') }}</span>
        </div>
        <div class="bg-blue tx-white p-05" @click="$emit('update:modelValue', '')"><i class="fa-solid fa-xmark"></i>
        </div>

    </div>

    dev---{{file}}
    <transition name="pop">
        <media-manager v-if="show" v-model="file" src="media" cls="main-frame" layout="grid"  @close="show=false" />
    </transition>
         
</template>

<script>
import mediaManager from '../MediaManager.vue';
export default {
    components:{mediaManager},
    name: 'field-input',
    props: ['modelValue', 'f'],
    data() {
        return {
            file:'',
            show: false,
            // placeholder: 'Enter value...'
        };
    },
    methods: {
        inputType() {
            // fallback to text if not provided
            // return this.f.ops || 'text';
        }
    },
    mounted(){
        this.file = this.modelValue ? this.modelValue : '';
    }
};
</script>
