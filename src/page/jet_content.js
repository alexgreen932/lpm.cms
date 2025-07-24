import toolbar from './toolbar.js';
import jet_add from './jet_add.js';
import elements from '../coms/index.js';
import jet_elements from '../src/jet_elements.js';

export default {

    template: `

    `,

    // img: null,
    // ib: null, //image-blur
    // i0: null, //image-opacity
    props: ['sections'],
    // emits: ["nv"],
    // props: ['modelValue', 'lang'],
    // emits: ["update:modelValue"],
    data() {
        return {
            isAdmin: true,
            show: false,
            ops:{add:false}
        };
    },
    
    mounted() {
        // this.sections
        //localsorage 
        // console.log('this.sections------------- ', this.sections);
        // console.log('is Admin------------- ', this.isAdmin);
    },
};