<template>
    <div class="">
        forms
        <!-- page ---{{pageData}} -->
        sections ---{{pageData.sections}}
        <template v-if="pageData" j-for="(section, i) in pageData.sections">
            current sec ---{{ section }} 
            <!-- fields--- {{ fields }}  -->
            <!-- index --- {{ i }} -->
            <!-- <jet-form v-if="ops.current_section == i" :title="$__('Edit Section')" :obj="section"     :fields="section_fiels" /> -->
        </template>
    </div>

</template>

<script>
import { fetchFile } from "../utils/helpers.js";
import jetForm from "../form/jetForm.vue";
import { ops } from '../data/data.js';

export default {
    components: {
        jetForm,
    },
    data() {
        return {
            ops: ops,
            // pageData: null,
            pageData: { sections: [] },
            current: 9999,
            current: 0, //dev
            section_fiels: [
                { title: this.$__('Container Width'), key: 'w', type: 'input' },
                { title: this.$__('Justify Content'), key: 'jc', type: 'input' },
                { title: this.$__('Atem Align'), key: 'ai', type: 'input' },
            ],
        };
    },

    //todo!!! load it only in necessay page, not in every
    async mounted() {
        const slug = this.ops.current_page;
        console.log('slug: ', slug);
        try {
            const page = await fetchFile(`${this.$domain}/data/${slug}.json`);
            this.pageData = page || {}; // fallback empty object if null
        } catch (e) {
            console.error(`Failed to load ${slug}.json`, e);
            this.pageData = {}; // fallback on error
        }
        console.log('this.pageData: ----',typeof this.pageData);//object
    },
};
</script>
