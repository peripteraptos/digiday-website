<template>
  <div class="flex flex-col justify-around min-h-screen items-center">
    <div
      class="w-full min-h-screen flex justify-center items-center text-center flex-wrap"
    >
      <div v-if="!$store.state.clicked" class="play" @click.stop="play"></div>
      <div v-else class="z-30 w-screen background-rtw pointer-events-none">
        <div class="flex justify-center items-center align-middle">
          <div class="absolute mx-auto -rotate-90">
            <random-circle
              class=""
              :style="{
                transform:
                  'rotateZ(' +
                  (45 + parseInt((1 - intersectionRatio) * 360 * 3)) +
                  'deg)',
              }"
            />
          </div>
          <TransitionGroup name="fade" tag="ul" class="leading-5 z-20">
            <li v-for="{ author, path } in $store.getters.getWorks" :key="path">
              <span>{{ author }}</span>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RandomCircle from './RandomCircle.vue'

/* const threshold = Array(360)
  .fill(1)
  .map((x, y) => (x + y) / 360) */
export default {
  name: 'IntroPage',
  components: { RandomCircle },
  props: ['observer'],
  data() {
    return {
      ownObserver: null,
      visible: true,
      intersectionRatio: 0,
    }
  },
  /* beforeMount() {
    this.ownObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, intersectionRatio }) => {
          this.intersectionRatio = intersectionRatio
          // if (!isIntersecting) this.visible = false
        })
      },
      { threshold }
    )
  }, */
  mounted() {
    // this.ownObserver.observe(this.$el)
    this.observer.observe(this.$el)
  },
  methods: {
    play() {
      this.$store.commit('SET_CLICKED')
      this.$nextTick(() => {
        this.$store.dispatch('shuffleWorks')
      })
    },
  },
}
</script>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 2s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

.background-rtw {
  background: radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.play {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;

  border-left: 100px solid black;
  cursor: pointer;
}

.play:hover {
  border-left-color: lightgray;
}
</style>
