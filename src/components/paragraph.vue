<template>
    <div v-if="e.text" v-html="e.text"></div>
    <span v-if="!e.text" class="tx-grey">{{$__('Enter a text')}}</span>
</template>

<script>
export default {
    props: ["e"],
};
</script>
 
