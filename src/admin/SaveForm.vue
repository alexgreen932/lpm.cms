<template>
    <form method="post" action="">
        <!-- textarea for check only - will be comented on prode -->
        <!-- <textarea name="page_json" style="width:100%; height:100px;">{{ jsonSrting() }}</textarea> -->
        <input name="string" :value="jsonSrting()">
        <input type="hidden" name="string" :value="jsonSrting()">
        <input type="text" name="slug" :value="target">
        <button type="submit">
            <span v-if="button">{{ button }}</span>
            <span v-if="!button">{{ $__('Save') }}</span>
        </button>
    </form>
</template>

<script>

export default {
    props: ['button', 'obj', 'target'],
    data() {
        return {
            // ops: ops,
        };
    },
    methods: {
        jsonSrting() { return JSON.stringify(this.obj) },
    },
};
</script>
