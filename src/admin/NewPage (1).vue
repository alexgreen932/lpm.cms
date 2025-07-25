<template>
    <div class="jc-c">
        <!-- trigger icon add under list of existinf pages if more than the only homepage -->
        <i v-if="!show" class="fa-solid fa-circle-plus" @click="show = true"></i>
        <jet-form v-if="show" formstyle="side" :obj="pages" :fields="fields" />
    </div>
</template>


<script>
// import { ops } from "../data/data.js";
import JetForm from "../form/JetForm.vue";
import SaveForm from './SaveForm.vue';

export default {
    //prop 'pages if fetched 'pages_list.json' from parent component
    props: ['pages'],
    components: {
        "jet-form": JetForm,
        "save-form": SaveForm,
    },
    data() {
        return {
            show: false,
            fields: [
                { title: this.$__('Page Title'), key: 'title' },
                { title: this.$__('Url'), key: 'slug' },
            ],
            new_page: {//object for form},
            empty_page: {//blank new page}
        };
    },
    methods: {
        add() { },
    },
};
</script>
