<template>
    <div class="media-manager bs-2" :class="[cls, width]">
        <div class="d-main">
            <div class="d-header">
                <select v-model="filter_type">
                    <option v-for="o in options" :value="o">{{o}}</option>
                </select>
            </div>
            <input type="text" v-model="filter_input" :placeholder="$__('Filter By Name')" @input="filterTrigger()"/>
            <ul class="d-files">
                <li v-for="(file, i) in files">
                    // if layou grid, should add thambnail and input radio on it top right, like other do
                    //if list ,simple radio list

                </li>

            </ul>
        </div>
        <div class="d-sidebar">
            here will be select how to display, grid or list 
            buttons: 
                close  
                upload(do not know how to do),
                select, select is unactive until data.selected empty, on @click ="$emit('update:modelValue', $event.target.value)"  
        </div>
        
    </div>
</template>

<script>

//filers should

export default {
    //eg cls - j-modal, width - w-3-4, layout - grid/list, selct - false(if for uploading only)
    props: ['src', 'modelValueel', 'cls', 'width', 'layout', 'select'],
    data() {
        return {
            layout: 'grid',
            selected: '',//file selected for click 'Select'
            filter_input: '',
            options: ['Filter By Type', 'jpg', 'png', 'mp4', 'zip'],//probably, will add more
        };
    },

    
    computed: {
       
    },
//i did filters, but long ago and in vue2, see fa picker as example
    methods: {
        filterTrigger(){
            //if this.filter_input.length more than 3 should return all which names includes this.filter_input
        },
        filteredFiles() {
            //1.if no filter applyed returns all
            //2. if by type return only necessary type
        }
    }
};
</script>
