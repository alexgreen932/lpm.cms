import input from './input.js'
import textarea from './textarea.js'
import select from './select.js'
import toggle from './toggle.js'
import style from './style.js'
import icon from './icon.js'
import range from './range.js'
import j_filter from './j-filter.js'//todo replace range
import note from './note.js'
import text_line from './text-line.js'
import editor from './editor.js'
import divider from './divider.js'
// import media from './media.js'
import anim from './anim.js'
import inline from './inline-note.js'
import select_content from './select-content.js'
import display from './display-on-select.js'
 

export default {
    components:{
        'j-input': input,
        'j-textarea': textarea,
        'j-select': select,
        'j-toggle': toggle,
        'j-style': style,
        'j-icon': icon,
        'j-range': range,
        'j-filter': j_filter,
        'j-note': note,
        'j-text_line': text_line,
        'j-editor': editor,
        'j-divider': divider,
        // 'j-media': media,
        'j-anim': anim,
        'inline-note': inline,
        'select-content': select_content,
        'display-on': display,
    },
    template: `
        <div class="j-form bg-blue-grey-l3 tx-black fd-c p-05 br-5" :class="cls">
            <h3 :class="{isOpen: open_inner}" @click="open_inner=!open_inner">
                {{title}}
                    <!-- <i v-if="open_inner" class="fa-solid fa-angle-up"></i>
                    <i v-if="!open_inner" class="fa-solid fa-angle-down"></i>                -->
            </h3> 
            <div class="control-group">
                <template v-for="(e, index) in fields">
                    <label>{{e.title}}</label>
                    <!-- ---{{e}} ---{{isSelect(e.type)}} obj-----{{obj}} obj.el-----{{obj[e.el]}}-----{{e.ops}} -->
                    <j-select v-if="isSelect(e.type)" :type="e.type"  v-model="obj[e.el]" :ops="e.ops"></j-select>
 
                    <display-on v-if="e.type=='display'" :type="e.type" title="Display On"  :el="obj[e.el]" :mode="obj[e.mode]" :lang="lang"></display-on>

                    <select-content v-if="e.type=='content'" :type="e.type" :title="e.title" :shIf='e.shIf' :cond='e.cond' v-model="obj[e.el]" :lang="lang"></select-content>

                    <j-anim v-if="e.type=='anim'" :type="e.type" :title="e.title" :shIf='e.shIf' :cond='e.cond' v-model="obj[e.el]"></j-anim>

                    <!-- <j-media v-if="e.type=='media' || e.type=='img'" :type="e.type" :title="e.title" :shIf='e.shIf' :cond='e.cond' v-model="obj[e.el]"></j-media> -->

                    <j-input v-if="isInput(e.type)" :type="e.type" :title="e.title" :ops='e.ops' :shIf='e.shIf' :cond='e.cond' v-model="obj[e.el]"></j-input>

                    <j-textarea v-if="e.type=='textarea'" :title="e.title" v-model="obj[e.el]" :shIf='e.shIf' :cond='e.cond'></j-textarea>


                    <j-toggle v-if="e.type=='toggle'" :el="obj[e.el]" :title="e.title" :ops='e.ops' @nv="obj[e.el]=$event" :shIf='e.shIf' :cond='e.cond' :lang="lang"></j-toggle>

                    <j-style v-if="isStyle(e.type)" :el="obj[e.el]" :title="e.title" :type="e.type" :ops='e.ops' @nv="obj[e.el]=$event" :shIf='e.shIf' :cond='e.cond'></j-style>

                    <j-range v-if="isRange(e.type)" :el="obj[e.el]" :title="e.title" :type="e.type" :ops='e.ops' @nv="obj[e.el]=$event" :shIf='e.shIf' :cond='e.cond'></j-range>
                    
                    <j-editor v-if="e.type=='editor'" :el="obj[e.el]" :title="e.title" :type="e.type" :ops='e.ops' @nv="obj[e.el]=$event" :shIf='e.shIf' :cond='e.cond'></j-editor>

                    <j-icon v-if="e.type=='icon'" :el="obj[e.el]" :title="e.title" @nv="obj[e.el]=$event" :shIf='e.shIf' :cond='e.cond'></j-icon>
 
                    <inline-note v-if="e.type=='inline_note'" :el="e.ops" :title="e.title" :shIf='e.shIf' :cond='e.cond'></inline-note>

                    <j-note v-if="e.type=='note'" :title="e.title" :desc="e.desc" :desc2="e.desc2" :desc3="e.desc3" :desc4="e.desc4" :img="e.img" :shIf='e.shIf' :cond='e.cond'></j-note>
                    
                    <j-divider v-if="e.type=='divider'" :title="e.title" :cls="e.cls" :shIf='e.shIf' :cond='e.cond'></j-divider>

                    <hr v-if="e.type=='hr'">
                    <!-- <template v-if="e.type=='filters'" > -->
                    <template v-if="showGroup(e)" >
                        <j-filter title="blur" v-model="obj['blur']" :max="10"></j-filter>
                        <j-filter title="brightness" v-model="obj['brightness']" :max="200"></j-filter>
                        <j-filter title="contrast" v-model="obj['contrast']" :max="200"></j-filter>
                        <j-filter title="grayscale" v-model="obj['grayscale']"></j-filter>
                        <j-filter title="huerotate" v-model="obj['huerotate']" :max="360"></j-filter>
                        <j-filter title="invert" v-model="obj['invert']"></j-filter>
                        <j-filter title="saturate" v-model="obj['saturate']" :max="200"></j-filter>
                        <j-filter title="sepia" v-model="obj['sepia']"></j-filter>
                        <j-filter title="opacity" v-model="obj['opacity']"></j-filter>
                    </template>
                </template> 
                <div v-if="add" class="uk-button uk-button-primary" @click="addItem()">Add</div>
            </div>

        </div>
        
    `,
    props: {
        title:{
            type:String,
            required:false,
            default: 'Form',
        },
        add:{
            type:Boolean,
            required:false,
            default: false,
        },
        target:{
            type:Array,
            required:false,
            default: null,
        },
        obj:{
            type:Object,
            required:true,
            default: '',
        },
        type:{//??
            type:String,
            required:false,
            default: 'edit',
        },
        open:{
            type:Boolean,
            required:false,
            default: true,
        },
        cls:{
            type:String,
            required:false,
            default: 'light',
        },
        fields:{
            type:Array,
            required:true,
            default: '',
        },
        toggle:{//??
            type:Boolean,
            required:false,
            default: false,
        },
        lang:{
            type:Object,
            required:false,
            default: {},
        },
    },
    emits: ['nv', 'opn', 'close', 'update:modelValue'],//todo //rm
    data() {
        return {
            placeholder: 'Enter value here...',
            open_inner: true
        };
    },
    methods: {
        isSelect(e){
            console.log('%ce------- ', 'background: #F00', e);
            let out = false;
            switch (e) {
                case 'jc':
                case 'w':
                case 'ai':
                case 'p':
                case 'g':
                case 'fd':
                case 'fw':
                    return true;         
                    break;
            }
            return out;
        },
        addItem() {
            var new_item = {};
            var $this = this;
        
            // Loop through the fields defined in props
            for (let index = 0; index < $this.fields.length; index++) {
                const field = $this.fields[index];
                // Access the field value from the obj data property
                new_item[field.el] = $this.obj[field.el];
            }
        
            // Push the newly created item to the target array
            $this.target.push(new_item);
        
            // Create a new empty object for the next item
            // new_item = {};
        
            // clean obj
            for (let index = 0; index < $this.fields.length; index++) {
                const field = $this.fields[index];
                $this.obj[field.el] = null;
            }
        },       
        
        openInner(){
            if (this.open) {
                this.$emit('opn', false);
            } else {
                this.$emit('opn', true); 
            }
        },
        //rules to display for group, checks type and show if conditions
        showGroup(e){
            var rt = false;
            if ( e.type=='filters' ) {
                if (e.cond.includes(e.shIf)) {
                    rt = true;
                }
            }
            return rt;
        },
        isRange(e){
            switch (e) {
                case 'num':
                case 'font_size':
                case 'height':
                case 'height_rem':
                case 'line_height':
                case 'width':
                case 'border_radius':
                    return true;
                    break;          
                default:
                    return false;
                    break;
            }
        },
        isStyle(e){
            switch (e) {
                case 'bg':
                case 'col':
                    return true;
                    break;          
                default:
                    return false;
                    break;
            }
        },
        isInput(e){
            switch (e) {
                case 'text':
                case 'email':
                case 'tel':
                case 'hidden':
                case 'range':
                case 'date':
                case 'time':
                case 'color':
                    return true;
                    break;          
                default:
                    return false;
                    break;
            }
        },
        updateField(fieldName, value) {//rm
            // Emit an event to notify the parent component about the field value change
            this.$emit('nv', { [fieldName]: value });
        },
        plh(e){
            var rt = 'Enter value here...';
            if (e) {
                rt = e; 
            }
            return rt;
        },
    },
    mounted() {
        this.open_inner = this.open;
    }
}
