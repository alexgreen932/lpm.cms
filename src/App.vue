<template>
  <div>
    <h2>Dynamic Components 1</h2>
    <component
      v-for="(block, i) in items"
      :key="i"
      :is="getComponent(block.type)"
      v-bind="block.props"
    />
  </div>
</template>

<script>
const modules = import.meta.glob('./components/*.vue', { eager: true })

export default {
  data() {
    return {
      items: [
        { type: 'title', props: { text: 'Hello from Title' } },
        { type: 'paragraph', props: { text: 'Hello from Paragraph' } }
      ]
    }
  },
  methods: {
    getComponent(type) {
      const name = `./components/com-${type}.vue`
      return modules[name].default
    }
  }
}
</script>


