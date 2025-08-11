<template>
  <div class="f-media">
    <div class="d-select" :class="cls(show)">
      <div v-if="!show" @click="show = !show">{{ $__('Select') }}</div>
      <template v-if="show" class="jc-b">
        <div class="fg-1" @click="show = !show">{{ $__('Close') }}</div>
        <label class="ai-c small" for="keep_open">
          {{ $__('Keep Open') }}
          <input id="keep_open" type="checkbox" v-model="keep_open" />
        </label>
      </template>
    </div>


    <div class="d-del fs-8" @click="$emit('update:modelValue', '')">
      Clean
      <!-- <i class="fa-solid fa-xmark"></i> -->
    </div>
  </div>

  <transition name="slideV">
    <div v-if="show" class="picker-box">
      <input type="text" :placeholder="$__('Type at list 2 letters to filter')" v-model="filter">
      <ul :class="f.ops">
        <template v-for="op in ops()" :key="op.v"">
        <li v-if="filtered(op.v)" :class="op.v" @click="selectItem(op.v)">
          <span v-if="f.ops == 'col'">Abc</span>
          <i v-if="f.ops == 'icons'" :class="op.v"></i>
          <span v-if="f.ops == 'ja' || f.ops == 'jag'">{{op.t}}</span>
          </li>
        </template>
      </ul>
    </div>
  </transition>
</template>

<script>
import { options } from "./presets/options-picker.js";

export default {
  name: "field-select",
  props: ["modelValue", "f"],
  emits: ["update:modelValue"], // declare emits in Vue 3
  data() {
    return {
      show: false,
      keep_open: true,
      filter: null,
    };
  },
  methods: {
    filtered(v) {
      let out = true;
      if (this.filter && this.filter.length > 1) {
        if (v.includes(this.filter.toLowerCase())) {
          out = true;
        } else {
          out = false;
        }
      }
      return out;
    },
    cls(v) {
      return v ? "doClose" : "doOpen";
    },
    selectItem(v) {
      this.$emit("update:modelValue", v); // FIXED
      if (!this.keep_open) {
        this.show = false;
      }
    },
    ops() {
      if (!this.f.ops) {
        console.error(this.$__("Options in select form is missed"));
        return [];
      }
      if (typeof this.f.ops === "string") {
        return options[this.f.ops] || [];
      }
      return this.f.ops;
    },
  },
};
</script>
