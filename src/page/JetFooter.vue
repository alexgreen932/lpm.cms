<template>
    <footer id="footer" :class="[el.bg, el.col]">
        <div :class="[el.w, el.ai, el.p, el.g]">Footer</div>
    </footer>
</template>

<script>
export default {
    // data() {
    //     return {
    //         test: '',
    //     };
    // },
    props:['el'],
};
</script>
