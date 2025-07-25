<template>
  <form method="post" action="">
    <input type="hidden" name="action" value="newpage">
    <label>{{ $__('Page Title') }}</label>
    <input name="title" v-model="new_page.title" />

    <label>{{ $__('Url') }}</label>
    <input name="slug" v-model="new_page.slug" />

    <button type="submit">{{ $__('Add Page') }}</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      new_page: {
        title: '',
        slug: ''
      }
    };
  },
  watch: {
    'new_page.title'(val) {
      if (!this.new_page.slug) {
        this.new_page.slug = val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }
    }
  }
};
</script>
