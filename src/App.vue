

<template>
  <div>
    <admin-bar></admin-bar>
    <admin-sidebar></admin-sidebar>
    <page-preview></page-preview>
  </div>
</template>

<script>
// const modules = import.meta.glob('./components/*.vue', { eager: true });
import {ops} from './data/data.js';
import AdminBar from './admin/AdminBar.vue';
import AdminSidebar from './admin/AdminSidebar.vue';
import methods from './admin/methods.js';
import PagePreview from './page/PagePreview.vue';
import __ from './languages/index.js';

//lang function as short global
window.__ = __;

export default {
  components:{
    'admin-bar': AdminBar,
    'admin-sidebar': AdminSidebar,
    'page-preview': PagePreview,
  },
  data() {
    return {
      ops:ops,
      items: [
        { type: 'title', props: { text: 'Hello from Title' } },
        { type: 'paragraph', props: { text: 'Hello from Paragraph' } }
      ]
    }
  },
  methods: methods,
  mounted() {
    this.$getLocal(this.ops, 'state_ops');
    this.isSidebar();//should check as it will be localstorage
    this.isBar();//should check as it will be localstorage
  }
}

</script>


