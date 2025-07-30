<template>
    <div class="fd-c g-05">
        <div class="fs-8">{{ $__('Hover any elemets and click:') }}</div>
        <ul class="fs-8 mt-0 ml-1">
            <li><i class="fa-solid fa-pen-to-square"></i> {{ $__('to edit element') }}</li>
            <li><i class="fa-solid fa-chevron-up"></i><i class="fa-solid fa-chevron-down"></i> {{ $__('to move') }}</li>
            <li><i class="fa-solid fa-plus"></i> {{ $__('to add') }}</li>
            <li><i class="fa-solid fa-trash"></i> {{ $__('to delete') }}</li>
        </ul>
        <div class="b-blue fs-8 jc-c br-4 j-click" @click="$root.reset(), ops.edit_meta = !ops.edit_meta">
            <template v-if="!ops.edit_meta">
                {{ $__('Edit Meta') }}
            </template>
            <template v-if="ops.edit_meta">
                {{ $__('Close Meta') }}
            </template>

        </div>

        <jet-form v-if="ops.edit_meta" :obj="ops.current_page_data" cls="bg-white" :fields="fields_meta" />

        <template v-if="ops.current_page_data" v-for="(section, i) in ops.current_page_data.sections">
            opacity---{{section.opacity}}
            <!-- current_section---{{ ops.current_section }} === index ---{{ i }} -->
            <!-- <template v-if="ops.current_section == i"> -->
                <jet-form v-if="ops.current_section == i && ops.current_edit == 'section'" :title="titleSec(i)"
                    :obj="section" :fields="fields_section" />
                <template v-for="(element, i2) in section.content">
                    <!-- ----{{element.type}}---- -->
                    <jet-form v-if="ops.current_el == i2 && ops.current_edit == 'element'" :title="titleEl(element.type)"
                        :obj="section" :fields="fields_el" />
                </template>
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
            // meta: false,
            title_section: this.$__('Edit Section'),
            ops: ops,
            // pageData: null,
            pageData: { sections: [] }, //rm all if tate from data
            current: 9999,
            current: 0, //dev
            fields_meta: [
                { title: this.$__('Page Title'), key: 'title', },
                { title: this.$__('Meta Title'), key: 'meta_title', },
                { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
                // { title: this.$__('Atem Align'), key: 'ai', type: 'input' },
            ],
            fields_section: [
                { title: this.$__('Background'), key: 'bg', type: 'picker', ops:'bg' },
                { title: this.$__('Container Width'), key: 'w', type: 'select', ops:'w' },
                { title: this.$__('Justify Content'), key: 'jc', type: 'select', ops:'jc' },
                { title: this.$__('Align Items'), key: 'ai', type: 'select', ops:'ai' },

                { title: this.$__('Background Image'), key: 'img', type: 'media' },
                { title: this.$__('Image Position'), key: 'bp', type: 'select', ops:'bp' },
                { title: this.$__('Image Attachment'), key: 'ba', type: 'select', ops:'ba' },
                { title: this.$__('Image Blur'), key: 'blur', type: 'range', ops:'blur' },
                { title: this.$__('Image Opacity'),  tip: this.$__('Useful for creating contrast backgroumd - for example set background image Black and opacity 5(0.5)'), key: 'opacity', type: 'range', ops:'opacity' },
            ],
            fields_el: [
                // { title: this.$__('Container Width'), key: 'w', type: 'input' },
                // { title: this.$__('Justify Content'), key: 'jc', type: 'input' },
                { title: this.$__('Text'), key: 'text', type: 'texyarea' },
            ],
        };
    },
    methods:{
        titleSec(i){
            let sec = i + 1;
            return this.$__('Edit Section-') + sec;
        },
        titleEl(v){
            return this.$__('Edit')  + ' ' + v;
        },
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
        console.log('this.pageData: ----', typeof this.pageData);//object
    },
};
</script>
