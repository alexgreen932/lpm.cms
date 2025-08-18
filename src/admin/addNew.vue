<template>
  <div class="jet-add">
    <div class="d-wrap">
      <i class="fa-solid fa-xmark" @click="sec.add = false"></i>
      <div v-for="(e, i) in elems" :key="i" class="d-icon" @click="addItem(e.props)">
        <i :class="e.icon"></i>
        <span>{{ e.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const modules = import.meta.glob('../components/*.vue', { eager: true });


export const elems = Object.values(modules).map(m => m.meta);


import { ops } from '../data/data.js';


export default {
  props: ["content", "sec"],
  data() {
    return {
      ops,
      elems,
      // elems: [meta],
      show: false
    };
  },
  methods: {
    addItem(e) {
      const item = JSON.parse(JSON.stringify(e));
      let target = this.ops.current_page_data.sections[this.ops.current_section];
      //if adds to part
      if (this.ops.current_part) {
        let part = this.ops.theme[this.ops.current_part];//defines part
        target = part.sections[this.ops.current_section];
      }

      //if has elements, add in correct place 
      if (target.content.length) {
        // Insert new element right after the clicked one
        const insertIndex = this.ops.current_el + 1;
        target.content.splice(insertIndex, 0, item);
      } else {
        //if content arr is empty push
        target.content.push(item);
      }






    }
  },
  mounted() {

  }
};
</script>
