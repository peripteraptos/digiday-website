<template>
  <div
    v-if="visible"
    class="w-full min-h-screen flex justify-center items-center py-20 text-center flex-wrap"
  >
    <div class="flex justify-center items-center align-middle">
      <div class="absolute mx-auto -rotate-90">
        <random-circle
          :style="{
            transform:
              'rotateZ(' +
              (45 + parseInt((1 - intersectionRatio) * 360 * 3)) +
              'deg)',
          }"
        />
      </div>
      <TransitionGroup name="fade" tag="ul" class="leading-5">
        <li v-for="{ author, path } in $store.getters.getWorks" :key="path">
          {{ author }}
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import RandomCircle from './RandomCircle.vue'

const threshold = Array(360)
  .fill(1)
  .map((x, y) => (x + y) / 360)
export default {
  name: 'IntroPage',
  components: { RandomCircle },
  data() {
    return {
      observer: null,
      visible: true,
      intersectionRatio: 0,
    }
  },
  beforeMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, intersectionRatio }) => {
          this.intersectionRatio = intersectionRatio
          // if (!isIntersecting) this.visible = false
        })
      },
      { threshold }
    )
  },
  mounted() {
    this.observer.observe(this.$el)
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
</style>
