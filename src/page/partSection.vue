<template>
  <div v-if="sec" :id="sectionId(i)" class="jet-section" :class="$root && $root.classes ? $root.classes(sec.sec) : ''" :style="">


    <toolbar-parts v-if="type=='header'" type="header" cls="section" dir="fd-c" :elements="theme.header?.sections || []" :index="i" />

    <div class="cntr" :class="$root && $root.classes ? $root.classes(sec.cont) : ''">
      <template v-if="sec.content && sec.content.length">
        <template v-for="(e, i2) in sec.content" :key="i2">
          <component :is="getComponent(e.type)" :sec="i" :elements="sec.content" :dir="sec.fd" :e="e" :index="i2" />
        </template>
      </template>

      <div v-else class="b-blue p-1 jc-c m-1 j-click g-05" @click="addElem(i)">
        <i class="fa-solid fa-plus"></i><span>{{ $__('Add Elements') }}</span>
      </div>
    </div>

    <div v-if="sec.img" class="img-bg" :class="$root && $root.classes ? $root.classes(sec.img, 'img') : ''"
      :style="{ 'background-image': 'url(' + sec.img.src + ')' }"></div>
  </div>
</template>


<script>
import { ops, theme } from "../data/data.js";
import jetToolbar from "./jetToolbar.vue";
import toolbarParts from "./toolbarParts.vue";
const modules = import.meta.glob("../components/*.vue", { eager: true });

export default {
  components: { 
  jetToolbar,
  toolbarParts,
},
  props: ['sec', 'i', 'type'],
  data() {
    return { 
      ops,
      theme,
     };
  },
  methods: {
    addElem(i) {
      this.ops.current_menu = 'add';
      this.ops.current_section = i;
      this.ops.current_el = 0;
    },
    getComponent(type) {
      const name = `../components/${type}.vue`;
      return modules[name]?.default || null;
    },
    sectionId(i) {
      if (this.ops.preview) {
        return "section-preview";
      }
      return "section-" + (i + 1);
    },
    // sectionType(){
    //   let out = this.type
    // }
  },
  mounted(){
  console.log('%c Section type ---', 'color: #997373', this.type);
  // console.log('%c Themee -------', 'color: #1045f3', this.theme);
  //loads default template if part---- currenntly on dev loads from data.... maybe load it directly to prop in edit mode
  }
};
</script>
