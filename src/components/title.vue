<template>
    <template v-if="e.text">
       {{ e.text }} 
    </template>
    
        <span v-if="!e.text" class="tx-grey">{{$__('Click and enter a title')}}</span>
</template>

<script>
export default {
    props: ["e"],
};
</script>
