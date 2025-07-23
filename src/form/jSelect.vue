import { options } from './presets/options.js';

export default {
    template: `
            <select
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            >
                <option v-for="(e, i) in options" :value="e.v">{{e.t}}</option>
            </select>
    `,
    props: ['modelValue', 'type', 'ops'],
    emits: ["update:modelValue"],
    data() {
        return {
            options:[],
            presets: options,
        };
    },
    methods: {
        setOptions() {
            switch (this.type) {
                case 'jc':
                case 'w':
                case 'ai':
                case 'p':
                case 'g':
                case 'fd':
                case 'fw':
                    this.options = this.presets[this.type];
                    break;
                default:
                    this.options = this.ops;
                    break;
            }
        }
    },
    mounted() {
        this.setOptions();

        // console.log('%c el ---', 'color: #00bf00', this.modelValue);
        // console.log('%c type ---', 'color: #133cf0', this.type);
        // console.log('%c options ---', 'color: #bf1d00', options);
        // console.log('%c this.options ---', 'color: #bf1d00', this.options);
        // //if options have presets

        // console.log('this.options--------------', this.ops);
    },
}
