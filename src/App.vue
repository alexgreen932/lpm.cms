

<template>
  <div>
    <h2>Dynamic Components 1</h2>
    <admin-bar></admin-bar>
    <admin-sidebar></admin-sidebar>
  </div>
</template>

<script>
const modules = import.meta.glob('./components/*.vue', { eager: true });
import {ops} from './admin/data.js';
import AdminBar from './admin/AdminBar.vue';
import AdminSidebar from './admin/AdminSidebar.vue';
import methods from './admin/methods.js';

export default {
  components:{
    'admin-bar': AdminBar,
    'admin-sidebar': AdminSidebar,
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


