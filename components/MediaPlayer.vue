<template>
  <div>
    <client-only>
      <video
        v-if="videoSrc"
        ref="player"
        :autoplay="mutedAutoplay"
        :muted="mutedAutoplay"
        @click="onClick"
        @dblclick="onDblclick"
        @timeupdate="onTimeupdate"
      >
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <audio
        v-else-if="audioSrc"
        ref="player"
        class="mx-auto"
        @click="onClick"
        @dblclick="onDblclick"
        @timeupdate="onTimeupdate"
      >
        <source :src="audioSrc" type="video/mp4" />
      </audio>
      <div class="embed-container select-none" v-else-if="vimeoId">
        <vimeo-player
          ref="vimeoPlayer"
          class="w-full"
          :video-id="'' + vimeoId"
          :options="{ dnt: true, loop: true, title: false, controls: false }"
          @timeupdate="onVimeoTimeupdate"
        />
      </div>
      <div v-if="audioSrc" class="text-center text-2xl h-16">
        <span class="speaker -on"></span>
      </div>

      <div
        v-if="(audioSrc || vimeoId || videoSrc) && play"
        class="fixed bottom-4 left-0 w-full"
      >
        <div class="flex max-w-4xl mx-auto px-4 py-1 relative">
          <div
            class="flex-grow relative h-4 transition-all cursor-pointer"
            @click="onTimelineClick"
            @mousemove="onMousemove"
          >
            <div
              class="absolute left-0 h-0.5 bottom-0 bg-black transition-all pointer-events-none"
              :style="{ width: 100 * currentPercent + '%' }"
            />
          </div>
          <div
            class="absolute bottom-5 right-0 leading-4 text-black pointer-events-none px-4"
          >
            {{ toHHMMSS(currentTime) }} / {{ toHHMMSS(duration) }}
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'MediaPlayer',
  props: {
    audioSrc: { type: String, default: null },
    videoSrc: { type: String, default: null },
    play: { type: Boolean, default: false },
    vimeoId: { type: [String, Number], default: null },
    mutedAutoplay: { type: Boolean, default: false },
  },
  data() {
    return {
      currentTime: '00:00',
      duration: '00:00',
    }
  },
  computed: {
    currentPercent() {
      if (this.duration === 0) return 0
      return this.currentTime / this.duration
    },
    player() {
      return this.$refs.player || this.$refs.vimeoPlayer
    },
  },
  watch: {
    play(play) {
      let promise
      if (this.player) promise = play ? this.player.play() : this.player.pause()

      if (promise) {
        promise.catch(this.onPlaybackError)
      }
    },
  },

  methods: {
    toHHMMSS: (secs) => {
      const secNum = parseInt(secs, 10)
      const hours = Math.floor(secNum / 3600)
      const minutes = Math.floor(secNum / 60) % 60
      const seconds = secNum % 60

      return [hours, minutes, seconds]
        .map((v) => (v < 10 ? '0' + v : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':')
    },
    onPlaybackError(e) {
      console.log('playback error')
    },

    moveTo(x, width) {
      const time = this.duration * (x / width)
      if (this.$refs.vimeoPlayer)
        this.$refs.vimeoPlayer.player.setCurrentTime(time)
      if (this.$refs.player) this.$refs.player.currentTime = time

      this.currentTime = time
    },
    onMousemove({ offsetX, target: { offsetWidth }, buttons }) {
      if (buttons !== 1) return
      this.moveTo(offsetX, offsetWidth)
    },
    onTimelineClick({ offsetX, target: { offsetWidth } }) {
      this.moveTo(offsetX, offsetWidth)
    },
    onClick() {},
    onDblclick() {},
    onTimeupdate({ target: { currentTime, duration } }) {
      this.currentTime = currentTime
      this.duration = duration
    },
    onVimeoTimeupdate({ seconds, duration }) {
      this.currentTime = seconds
      this.duration = duration
    },
  },
}
</script>

<style>
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

.speaker {
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
  background: currentColor;
  background-clip: content-box;
  width: 1em;
  height: 1em;
  border: 0.333em solid transparent;
  border-right-color: currentColor;
  position: relative;
  left: -0.337em;
}
.speaker.-on:before,
.speaker.-on:after {
  content: '';
  background: currentColor;
  width: 0.1em;
  position: absolute;
}
.speaker.-on:before {
  height: 0.333em;
  right: -0.533em;
}
.speaker.-on:after {
  height: 0.667em;
  right: -0.733em;
  top: -50%;
}
</style>
