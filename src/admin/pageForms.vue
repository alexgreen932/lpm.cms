<template>
    <div class="fd-c g-05">
        <div class="b-blue fs-8 jc-c br-4 j-click" @click="$root.reset(), ops.page_settings = !ops.page_settings">
            <template v-if="!ops.page_settings">
                {{ $__('Page Settings') }}
            </template>
            <template v-if="ops.page_settings">
                {{ $__('Close') }}
            </template>

        </div>

        <jet-form v-if="ops.page_settings" :obj="ops.current_page_data" cls="bg-white" :fields="fields_meta" />

        <template v-if="ops.current_page_data" v-for="(section, i) in ops.current_page_data.sections">
            

            <!-- render only current section  -->
            <template v-if="ops.current_section == i">
                <!-- remdered section  ---{{ i }}<br>
 sec---{{ops.current_section}} index ---{{ i }} -->
                <template v-if="ops.current_section == i && ops.current_edit == 'section'">
                    <!-- section forms -->
                    <jet-form :obj="section" :fields="$root.renderFields(section)" />
                    <jet-form :title="$__('Section Colors')" :obj="section.sec" :fields="$root.renderFields(section.sec)" />
                    <jet-form :title="$__('Container')" :obj="section.cont" :fields="$root.renderFields(section.cont)" />
                    <jet-form :title="$__('Image(optionaly)')" :obj="section.img" :fields="$root.renderFields(section.img)" />
                    <!-- <jet-form :title="$__('Section Colors')" :obj="section.sec" :fields="f_section" /> -->
                    
                    <!-- old ----- -->
                    <!-- <jet-form :obj="section" :fields="[{ title: this.$__('Title'), tip: this.$__('Optionally - requires if you use a Page Menu or Dotted Menu'), key: 'title' }]" /> -->
                    <!-- <jet-form :title="$__('Section Colors')" :obj="section.sec" :fields="f_section" /> -->
                    <!-- <jet-form :title="$__('Container OLD')" :obj="section.cont" :fields="f_container" /> -->
                    <!-- <jet-form :title="$__('Image(OLD)')" :obj="section.img" :fields="f_img" /> -->
                </template>


                <template v-for="(element, i2) in section.content">
                    <!-- ----{{element.type}}---- -->
                    <form-wrapper v-if="ops.current_el == i2 && ops.current_edit == 'element'" :element="element" />
                    <!-- <jet-form v-if="ops.current_el == i2 && ops.current_edit == 'element'" :title="titleEl(element.type)" :obj="section" :fields="fields_el" /> -->
                </template>


            </template>

        </template>
    </div>

</template>

<script>
import { fetchFile } from "../utils/helpers.js";
import jetForm from "../form/jetForm.vue";
import { ops } from '../data/data.js';
import formWrapper from "./formWrapper.vue";

export default {
    components: {
        jetForm,
        formWrapper,
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
                { title: this.$__('Page Title'), tip: this.$__('This adds a Dotted Menu Between Sections. Menu Item Titles should be added → Section Edit ->Title'), key: 'title', },
                { title: this.$__('Meta Title'), key: 'meta_title', },
                { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
                { title: this.$__('Add Dotted Menu'), key: 'dot_menu', type: 'checkbox' },
                // { title: this.$__('Atem Align'), key: 'ai', type: 'input' },
            ],

            f_section: [
                { title: this.$__('Background'), key: 'bg', type: 'picker', ops: 'bg' },
                { title: this.$__('Color'), key: 'col', type: 'picker', ops: 'col' },
                // { title: this.$__('Color'), key: 'p_sec', type: 'select', ops: 'pv' },
                // { title: 'Tip', tip: this.$__('This adds a Dotted Menu Between Sections. Menu Item Titles should be added → Section Edit ->Title'), key: 'tip', type: 'select', ops: 'pv' },
            ],
            f_container: [

                { title: this.$__('Width'), key: 'w', type: 'select', ops: 'w' },
                { title: this.$__('Justify Content'), key: 'jc', type: 'select', ops: 'jc' },
                { title: this.$__('Align Items'), key: 'ai', type: 'select', ops: 'ai' },


                { title: this.$__('Background(optional)'), key: 'bg', type: 'picker', ops: 'bg' },
                { title: this.$__('Border Radius'), key: 'br', type: 'range', ops: 'br' },
                { title: this.$__('Shadow'), key: 'bs', type: 'select', ops: 'bs' },
                { title: this.$__('Padding'), key: 'p', type: 'select', ops: 'p' },
                { title: this.$__('Margin'), key: 'm', type: 'select', ops: 'm' },
                { title: this.$__('Direction'), key: 'fd', type: 'select', ops: 'fd' },
                { title: this.$__('Gap'), key: 'g', type: 'select', ops: 'g' },



                { title: this.$__('Group Animation'), tip: this.$__('Animation is applying for all elements of section, you can also add it for every separately, in elements'), key: 'a', type: 'picker', ops: 'a' },
            ],
            f_img: [
                { title: this.$__('Background Image'), key: 'src', type: 'media' },
                { title: this.$__('Image Position'), key: 'bp', type: 'select', ops: 'bp' },
                { title: this.$__('Image Attachment'), key: 'ba', type: 'select', ops: 'ba' },
                { title: this.$__('Image Blur'), key: 'blur', type: 'range', ops: 'blur' },
                { title: this.$__('Image Opacity'), tip: this.$__('Useful for creating contrast backgroumd - for example set background image Black and opacity 5(0.5)'), key: 'opacity', type: 'range', ops: 'opacity' },
            ],
            fields_section: [

                { title: this.$__('Animation'), key: 'a', type: 'select', ops: 'ag' },
                { title: this.$__('Container Width'), key: 'w', type: 'select', ops: 'w' },
                { title: this.$__('Justify Content'), key: 'jc', type: 'select', ops: 'jc' },
                { title: this.$__('Align Items'), key: 'ai', type: 'select', ops: 'ai' },


                { title: this.$__('Container Background'), key: 'cbg', type: 'picker', ops: 'bg' },
                { title: this.$__('Container Border Radius'), key: 'cbr', type: 'range', ops: 'br' },
                { title: this.$__('Container Shadow'), key: 'bs', type: 'select', ops: 'bs' },
                { title: this.$__('Padding'), key: 'p', type: 'select', ops: 'p' },
                { title: this.$__('Margin'), key: 'm', type: 'select', ops: 'm' },
                { title: this.$__('Direction'), key: 'fd', type: 'select', ops: 'fd' },
                { title: this.$__('Gap'), key: 'g', type: 'select', ops: 'g' },


                { title: this.$__('Background Image'), key: 'img', type: 'media' },
                { title: this.$__('Image Position'), key: 'bp', type: 'select', ops: 'bp' },
                { title: this.$__('Image Attachment'), key: 'ba', type: 'select', ops: 'ba' },
                { title: this.$__('Image Blur'), key: 'blur', type: 'range', ops: 'blur' },
                { title: this.$__('Image Opacity'), tip: this.$__('Useful for creating contrast backgroumd - for example set background image Black and opacity 5(0.5)'), key: 'opacity', type: 'range', ops: 'opacity' },
                { title: this.$__('Group Animation'), tip: this.$__('Animation is applying for all elements of section, you can also add it for every separately, in elements'), key: 'a', type: 'picker', ops: 'a' },
            ],

            fields_el: [
                // { title: this.$__('Container Width'), key: 'w', type: 'input' },
                // { title: this.$__('Justify Content'), key: 'jc', type: 'input' },
                { title: this.$__('Text'), key: 'text', type: 'texyarea' },
            ],
        };
    },
    methods: {
        titleSec(i) {
            let sec = i + 1;
            return this.$__('Edit Section-') + sec;
        },
        titleEl(v) {
            return this.$__('Edit') + ' ' + v;
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
