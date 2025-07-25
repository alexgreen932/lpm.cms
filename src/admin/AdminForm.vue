<template>
    <form method="post" action="">
        <!-- textarea for check only - will be comented on prod -->
        <textarea name="page_json" style="width:100%; height:200px;">{{ jsonSrting() }}</textarea>
        <input type="hidden" name="slug" :value="jsonSrting()">
        <button type="submit">{{text}}</button>
    </form>
</template>

<script>

export default {
    props: ['text', 'obj'],
    data() {
        return {
            // ops: ops,
        };
    },
    methods: {
        jsonSrting() { return JSON.Parce },
    },
};
</script>
