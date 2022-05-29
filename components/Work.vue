<template>
  <div
    :class="{
      'has-border': document.path === $store.state.active,
    }"
    @click.stop="fullscreen = !fullscreen"
  >
    <nuxt-content :document="document" class="content" />
    <a
      v-if="document.imageUrl"
      :href="document.imageUrl"
      target="_blank"
      class="content"
      ><img :src="document.imageUrl"
    /></a>
    <client-only>
      <div v-if="!!document.vimeoID" class="embed-container select-none">
        <vimeo-player
          ref="player"
          :video-id="'' + document.vimeoID"
          :options="{ dnt: true, loop: true, title: false }"
        />
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
    active: {
      type: Boolean,
    },
    intersect: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      fullscreen: false,
    }
  },
  watch: {
    intersect(v) {
      // if (!this.$refs.player) return
      // this.$refs.player.player.setVolume(v)
    },
    active(active) {
      if (!this.$refs.player) return
      console.log(this.$refs.player)
      if (active) {
        this.$refs.player.play()
      } else {
        this.$refs.player.pause()
      }
    },
  },
  mounted() {
    this.observer.observe(this.$el)
  },
}
</script>
<style>
.content img,
.embed-container {
  /*border-radius: 6px;*/
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
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
