<template>
    <p v-if="e.text" :class="[e.fs, e.col, e.fw]" v-html="e.text"></p>
    <span v-if="!e.text" class="tx-grey">{{placeholder}}</span>
</template>

<script>
export default {
  data() {
        return {
            placeholder: __('Click and enter a title'),
        };
    },
    props: ["e"],
};
</script>
 
