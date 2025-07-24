// import jet_add from "./jet_add";



export default {
    components:{
        // 'jet-add': jet_add,
    },
    template: `

        <!-- <jet-add v-if="sec.add" :add="add" :content="elemens">88888</jet-add> -->
    `,

    mounted() {
        // this.elements
        
        
        
    },
};



function toolbar(args) {
    //redo from ышьзду args to object args/default values, which used often and can be skiped in args
    const arr = args.array;
    const index = args.index;
    const newItem = args.newItem;
    const form = args.form ? args.form : true;//adds form to chamge ubjuct before to push, optionally false
    const move = args.move ? args.move : true;//optionally false/'vertical'
    const del = args.del ? args.del : true;//optionally false


    let html = `<div class="toolbar-wrap"><div class="form-toolbar">`;

    if (newItem && typeof newItem == 'object') {
        html += `<i class="fa-solid fa-plus" @click="addItem()"></i>`;
        //method
        this.addItem = function () {
            let array = this[arr];
            array.push(newItem);
            setTimeout(() => {
                this.render();
            }, 300);
        }
    }

    //move
    if (move) {
        if (move === 'vertical') {
            html += `
                <i j-if="notFirst(index)" class="fa-solid fa-angle-up" @click="move('${index}', '${index - 1}')"></i>
                <i j-if="notLast(index)" class="fa-solid fa-angle-down" @click="move('${index}', '${index + 1}')"></i>`;
        } else {
            html += `
                <i j-if="notFirst(index)" class="fa-solid fa-angle-left" @click="move('${index}', '${index - 1}')"></i>
                <i j-if="notLast(index)" class="fa-solid fa-angle-right" @click="move('${index}', '${index - 1}')"></i>`;

        }
        //methods 
        this.notFirst = function (i) {
            if (i !== 0) return true;
        }
        this.notLast = function (i) {
            let array = this[arr];
            if (array.length !== i) return true;
        }

        this.move = function (from, to) {
            let array = this[arr];
            array.move(from, to);
            setTimeout(() => {
                this.render();
            }, 300);
        }
    }

    //del
    if (del) {
        html += `<i class="fa-solid fa-trash" @click="deleteItem(index)"></i>`;
        //method
        this.deleteItem = function (i) {
            let array = this[arr];
            array.splice(i, 1);
            setTimeout(() => {
                this.render();
            }, 300);
        }
    }

    html += `</div></div>`;

    return html;

}