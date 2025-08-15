<template>
    <!-- <ul class="">
        <li v-for="(e, i) in menu" @click="showCurrent(e.v)">{{ t }}</li>
    </ul> -->
    <div class="but-blue mt-1" @click="show = !show">Show Current</div>
    <div v-if="show" class="fd-c" style="height: 400px!important;">
        <div class="but-green mv-1" @click="copyIt()">Copy</div>
        <textarea rows="40" style="height: 400px!important;">{{ pageJson() }}</textarea>
    </div>

</template>

<script>
import { ops } from "../data/data.js";
// import JetForms from "./JetForms.vue";
// import get

export default {
    // components: {
    //     "jet-forms ": JetForms,
    // },
    data() {
        return {
            ops,
            // current: 99,
            show: false,
            current_data: null,
            menu: [
                { t: 'Homepahe', v: 'homepage' }
            ],
        };
    },
    methods: {
        pageJson() {//todo!! replace with $root.dataString
            return JSON.stringify(this.ops.current_page_data);
        },
        async copyIt(text) {
            try {
                await navigator.clipboard.writeText(JSON.stringify(this.ops.current_page_data));
                console.log('Текст успешно скопирован в буфер обмена');
            } catch (err) {
                console.error('Ошибка при копировании текста: ', err);
            }
        }
        // showCurrent(v) {
        //     // const path = `${this.$domain}/data/patterns/${v}.json`;//if tetch
        //     this.current_data = JSON.stringify(this.ops.current_page_data);
        // },
        // async mounted() {
        //     // const path = `${this.$domain}/data/patterns/index.php`;//!!! prod ver
        //     const path = `${this.$domain}/data/patterns/index.json`;//!!! dev ver as testing on html

        //     this.patterns = await fetchFile(path);
        // }
    },
};
</script>
