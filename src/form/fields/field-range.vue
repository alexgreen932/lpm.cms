<template>
    <div class="fd-r">
        <input
            class="fg-1"
            type="range"
            :value="val"
            @input="onInput"
            :min="min"
            :max="max"
            :step="step"
        />
        <span>{{ pre }}{{ val }}</span>
    </div>
</template>

<script>
export default {
    name: 'field-input',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        f: {
            type: Object,
            required: true
        }
    },
    emits: ["update:modelValue"],
    data() {
        return {
            val: 0,
            min: 1,
            max: 10,
            step: 1,
            prefixMap: {
                blur: 'fb-',
                opacity: 'o-',
                font_size: 'fs',
                height: 'h',
                height_rem: 'hr',
                line_height: 'lh',
                width: 'w',
                br: 'br-',
                num: '',
                pre: null,
                post: null,
            }
        };
    },
    methods: {
        onInput(event) {
            this.val = event.target.value;
            this.emitClass();
        },
        emitClass() {
            const prefix = this.prefixMap[this.f.ops] ?? '';
            const value = prefix === '' ? this.val : prefix + this.val;
            this.$emit("update:modelValue", value);
        },
        parseInitialValue() {
            const prefix = this.prefixMap[this.f.ops] ?? '';
            if (!this.modelValue) return 0;
            return prefix ? this.modelValue.replace(prefix, '') : this.modelValue;
        }
    },
    mounted() {
        this.val = this.parseInitialValue();
        switch (this.f.ops) {
            case 'br':
                this.min = 0;
                this.max = 50;
                break;
            case 'opacity':
                // this.pre = '0.';//todo
                break;
        
            default:
                break;
        }
    }
};
</script>
