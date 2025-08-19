<template>
  <label :for="f.key">
    <input 
      :id="f.key"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    >
    {{ f.title }}
  </label>
</template>

<script>
export default {
  name: 'field-checkbox',
  props: ['modelValue', 'f'],
};
</script>

