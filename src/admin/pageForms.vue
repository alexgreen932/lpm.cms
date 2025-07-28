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
        <jet-form v-if="ops.edit_meta" :obj="pageData" cls="bg-white" :fields="fields_meta" />

        <template v-if="pageData" v-for="(section, i) in pageData.sections">
            current_section---{{ ops.current_section }} === index ---{{ i }}
            <template v-if="ops.current_section == i">
                <jet-form v-if="ops.current_section == i && ops.current_edit == 'section'" :title="title_section" :obj="section"
                    :fields="fields_section" />
            </template>

            <!-- current sec ---{{ section }} -->
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
            // meta: false,
            title_section: this.$__('Edit Section'),
            ops: ops,
            // pageData: null,
            pageData: { sections: [] },
            current: 9999,
            current: 0, //dev
            fields_meta: [
                { title: this.$__('Page Title'), key: 'title', },
                { title: this.$__('Meta Title'), key: 'meta_title', },
                { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
                // { title: this.$__('Atem Align'), key: 'ai', type: 'input' },
            ],
            fields_section: [
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
        console.log('this.pageData: ----', typeof this.pageData);//object
    },
};
</script>
