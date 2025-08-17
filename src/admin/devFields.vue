<template>
    ---{{ops.current_page}}
    <ul class="g-05">
        <li v-for="(e, i) in menu" class="but-default" @click="showCurrent(e.v)">{{ e.t }}</li>
    </ul>
    <!-- <div class="but-default mt-1" @click="show = !show">Show Current</div> -->
    <div class="fd-c" style="height: 400px!important;">
        <textarea v-if="show == 'ops'" rows="40" style="height: 400px!important;">{{ this.ops }}</textarea>
        <textarea v-if="show == 'lang'" rows="40" style="height: 400px!important;">{{ dev_language }}</textarea>
        <template v-if="show == 'current_page_data'" class="fd-c" style="height: 400px!important;">
            <div class="but-green mv-1" @click="copyIt()">Copy</div>
            <textarea rows="40" style="height: 400px!important;">{{ pageJson() }}</textarea>
        </template>
    </div>

</template>

<script>
import { ops } from "../data/data.js";
import { dev_language } from "../languages/index.js";
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
            show: null,
            current_data: null,
            dev_language,
            menu: [
                { t: 'Ops', v: 'ops' },
                { t: 'Current', v: 'current_page_data' },
                { t: 'lang', v: 'lang' },
            ],
        };
    },
    methods: {
        showCurrent(v) {
            if (this.show == v) {
                this.show = null;
            } else {
                this.show = v;
            }
        },
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
