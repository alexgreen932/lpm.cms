<template>
    <component
        v-for="(el, i) in elems"
        :key="i"
        :is="getComponent(el.type)"
        :e="el.props"
    />
</template>

<script>
const modules = import.meta.glob("../components/*.vue", { eager: true });

export default {
    props:['elems'],
    methods: {
        getComponent(type) {
            const name = `../components/${type}.vue`;
            return modules[name].default;
        },
    },
};
</script>
