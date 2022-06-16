<template>
  <div
    class="z-10 relative"
    :class="{
      'has-border': document.path === $store.state.active,
    }"
    @click.stop="fullscreen = !fullscreen"
  >
    <nuxt-content :document="document" class="content" />
    <media-player
      :audio-src="document['audio-src']"
      :play="active"
      :video-src="document['video-src']"
      :vimeo-id="document['vimeoID']"
      :muted-autoplay="document['autoplay']"
    />
    <a
      v-if="document['image-src']"
      :href="document['image-href'] || document['image-src']"
      target="_blank"
      class="content"
      ><img :src="document['image-src']" class="mx-auto"
    /></a>
    <!--
    <div v-else-if="!!document['video-src']">
      <video
        :ref="!document['autoplay'] ? 'player' : null"
        :autoplay="!!document['autoplay']"
        :muted="!!document['autoplay']"
        :controls="!!document['show-controls']"
        :loop="!!document['loop']"
      >
        <source :src="document['video-src']" />
      </video>
    </div>-->
    <client-only>
      <!--<div v-if="!!document.vimeoID" class="embed-container select-none">
        <vimeo-player
          ref="player"
          :video-id="'' + document.vimeoID"
          :options="{ dnt: true, loop: true, title: false, controls: false }"
        />
      </div>-->
    </client-only>
  </div>
</template>
<script>
import MediaPlayer from './MediaPlayer.vue'
export default {
  components: { MediaPlayer },
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
.embed-container,
.con video {
  /*border-radius: 6px;*/
  /*box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);*/
}
</style>
