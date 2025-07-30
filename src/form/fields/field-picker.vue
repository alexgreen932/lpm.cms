<template>
  <div class="picker-select b-grey-d4 br-4" :class="cls(show)">
    <div v-if="!show" class="w-1-1" @click="show = !show">{{ $__('Select') }}</div>
    <span class="jc-b a-c" v-else>
      <div class="fg-1" @click="show = !show">{{ $__('Close') }}</div>
      <label class="ai-c tx-white" for="keep_open">
        <!-- use checkbox instead of radio -->
        <input id="keep_open" type="checkbox" v-model="keep_open" />
        {{ $__('Keep Open') }}
      </label>
    </span>
  </div>

  <transition name="slideV">
    <div v-if="show" class="picker-box">
      <ul :class="f.ops">
        <li
          v-for="op in ops()"
          :key="op.v"
          :class="op.v"
          @click="selectItem(op.v)"
        >
          <span v-if="f.ops == 'col'">Abc</span>
          <i v-if="f.ops == 'icons'" :class="op.v"></i>
        </li>
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
    };
  },
  methods: {
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

