export default {
    template: `
        <div v-show="showIt()" class="j-field">
            <label class="j_title">{{title}} <span v-if="type=='range'">{{modelValue}}</span></label>
            <input
            v-if="!withOps(type)"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="plh"
            />
            <input
            v-if="withOps(type)"
            :type="type"
            :value="modelValue"
            :min="ops.min"
            :max="ops.max"
            :step="ops.step"
            @input="$emit('update:modelValue', $event.target.value)"
            />
        </div>
    `,
    props: {
        title: {
            type: String,
            required: false,
            default: "Form",
        },
        modelValue: {
            type: String,
            required: true,
            default: "",
        },
        type: {
            type: String,
            required: false,
            default: "text",
        },
        cls: {
            type: String,
            required: false,
            default: "j-form",
        },
        plh: {
            type: String,
            required: false,
            default: "Enter value here...",
        },
        ops: {
            type: Object,
            required: false,
            default: "",
        },
        shIf: {
            type: String,
            required: false,
            default: null,
        },
        cond: {
            type: Array,
            required: false,
            default: false,
        }
    },
    emits: ["update:modelValue"],
    data() {
        return {
            t: true,
            show: true,
        };
    },
    methods: {
        withOps(e) {             
            var rt = false; 
            if (e == 'number' || e == 'range')  {
                rt = true;
            } 
            return rt;
            
        },
        showIt() {
            if (this.shIf == null) {
                return true;
            } 
            if (this.cond.includes(this.shIf)) {
                console.log('this.shIf: ', this.shIf);
                console.log('this.cond: ', this.cond);
                return true;
            } else {
                return false;
            }
        },
    },
};
