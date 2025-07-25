<template>
  <div class="jet-add">
    <div class="d-wrap">
      <i class="fa-solid fa-xmark" @click="sec.add = false"></i>
      <div
        v-for="(e, i) in elems"
        :key="i"
        class="d-icon"
        @click="addItem(e)"
      >
        <i :class="e.icon"></i>
        <span>{{ e.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {elems} from '../data/elements.js';

export default {
  props: ["content", "sec"],
  data() {
    return {
      elems,
      show: false
    };
  },
  methods: {
    addItem(e) {
      // push a new copy so edits don’t affect original template
      const item = JSON.parse(JSON.stringify(e));
      this.content.push(item);
      this.sec.add = false; // close after adding
    }
  }
};
</script>
