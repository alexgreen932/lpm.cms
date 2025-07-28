<template>
    <p v-if="e.text" v-html="e.text"></p>
    <span v-if="!e.text" class="tx-grey">{{$__('Enter a text')}}</span>
</template>

<script>
export default {
    props: ["e"],
};
</script>
 
