<template>
    <div class="jet-forms">
        <!-- <jet-pages v-if="ops.current=='pages'" /> -->
        <!-- <div v-for="(form, i) in pages">

         <j-form
                :obj="form"
                :title="'Edit Style'"
                :fields="[
                    { el: 'w', title: __('Container Width'), type: 'w' },
                    { el: 'jc', title: __('Justify Content'), type: 'jc' },
                    { el: 'ai', title: __('Atem Align'), type: 'ai' },
                ]"
         
            </j-form> 
        </div> -->
    </div>
</template>

<script>
import { ops } from "../data/data.js";
import JetPages from "./JetPages.vue";
// import JetForm from "../form/JetForm.vue";

export default {
    components: {
        "jet-pages": JetPages,
    },
    data() {
        return {
            ops,
            sections: [],
        };
    },
    methods: {
        func() {},
    },
};
</script>
