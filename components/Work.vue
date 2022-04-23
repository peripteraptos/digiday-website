<template>
  <div :class="{ 'has-border': document.path === $store.state.active }">
    <nuxt-content :document="document" class="content min-h-screen mb-96" />
  </div>
</template>
<script>
export default {
  name: 'WorkElement',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    observer: {},
    document: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.observer.observe(this.$el)
  },
}
</script>
<style>
.content img {
  border-radius: 6px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  margin: 2rem 0;
}
</style>
