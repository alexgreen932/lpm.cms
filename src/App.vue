<template>
  <transition name="slideHL">
    <div v-if="ops.current_menu == 101" class="start-button" @click="ops.current_menu = 99">
      <i class="fa-solid fa-gear"></i>
    </div>
  </transition>
  <transition name="slideHL">
    <div v-if="ops.current_menu !== 101">
      <admin-bar></admin-bar>
      <admin-sections></admin-sections>
      <page-preview></page-preview>
    </div>
  </transition>


</template>

<script>
// const modules = import.meta.glob('./components/*.vue', { eager: true });
import { ops } from './data/data.js';
import AdminBar from './admin/AdminBar.vue';
import AdminSections from './admin/AdminSections.vue';
import methods from './admin/methods.js';
import PagePreview from './page/pagePreview.vue';
import pagePreview from './page/pagePreview.vue';
import {fields_presets} from './data/fields_presets.js';
// console.log('fields_presets: ', fields_presets);

export default {
  components: {
    'admin-bar': AdminBar,
    'admin-sections': AdminSections,
    pagePreview,
  },
  data() {
    return {
      ops: ops,
      items: [
        { type: 'title', props: { text: 'Hello from Title' } },
        { type: 'paragraph', props: { text: 'Hello from Paragraph' } }
      ]
    }
  },
  methods: methods,
  mounted() {
    // this.$getLocal(this.ops, 'state_ops');//todo temp off
    this.isSidebar();//should check as it will be localstorage
    this.isBar();//should check as it will be localstorage
  }
}

</script>
