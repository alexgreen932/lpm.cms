<template>
    <component :is="e.tag" :class="[e.fs, e.col, e.jc, e.effect]">
        {{ e.text }}
        <span v-if="!e.text" class="tx-grey">{{placeholder}}</span>
    </component>
</template>

<script>
export default {
  data() {
        return {
            placeholder: this.$__('Click and enter a title'),
        };
    },
    props: ["e"],
};
</script>
