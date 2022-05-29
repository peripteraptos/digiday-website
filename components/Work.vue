<template>
  <div :class="{ 'has-border': document.path === $store.state.active }">
    <nuxt-content :document="document" class="content" />
    <client-only>
      <div v-if="!!document.vimeoID" class="embed-container">
        <vimeo-player ref="player" :video-id="'' + document.vimeoID" />
      </div>
    </client-only>
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
.content img,
.content .embed-container {
  border-radius: 6px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  margin: 2rem 0;
}

.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
