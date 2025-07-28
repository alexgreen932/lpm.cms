<template>
    <div class="fd-c g-05">
        <div class="fs-8">{{ $__('Hover any elemets and click:') }}</div>
        <ul class="fs-8 mt-0 ml-1">
            <li><i class="fa-solid fa-pen-to-square"></i> {{ $__('to edit element')}}</li>
            <li><i class="fa-solid fa-chevron-up"></i><i class="fa-solid fa-chevron-down"></i> {{ $__('to move') }}</li>
            <li><i class="fa-solid fa-plus"></i> {{ $__('to add') }}</li>
            <li><i class="fa-solid fa-trash"></i> {{ $__('to delete') }}</li>
        </ul>
        <div class="but-default br-4" @click="edit_meta!=edit_meta">{{ $__('Edit Meta') }}</div>
        <jet-form :obj="pageData" :fields="fiels_meta"/>
        <!-- page -->-{{ pageData }} -->
        sections ---{{ pageData.sections }}
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
            // meta: false,
            ops: ops,
            // pageData: null,
            pageData: { sections: [] },
            current: 9999,
            current: 0, //dev
            fiels_meta: [
                { title: this.$__('Page Title'), key: 'title',  },
                { title: this.$__('Meta Title'), key: 'meta_title',  },
                { title: this.$__('Meta Description'), key: 'meta_description', type: 'textarea' },
                // { title: this.$__('Atem Align'), key: 'ai', type: 'input' },
            ],
            fiels_section: [
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
