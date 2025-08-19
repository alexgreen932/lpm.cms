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
        <span>{{ pre }}{{ showVal() }}</span>
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
                fs: 'fs-',
                height: 'h',
                height_rem: 'hr',
                line_height: 'lh',
                width: 'w',
                br: 'br-',
                showVal: '',
                pre: null,
                post: null,
            }
        };
    },
    methods: {
        showVal(){
            switch (this.f.ops) {
                case 'fs':
                    let out = this.val / 10;
                    return out + 'rem';            
                default:
                    return this.val;
            }
        },
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
            case 'fs':
                this.min = 8;
                this.max = 50;
                break;
            case 'abs_pos':
                this.min = -200;
                this.max = 200;
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
