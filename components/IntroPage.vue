<template>
  <div
    v-if="visible"
    class="w-full h-screen flex justify-center items-start text-center flex-wrap"
  >
    <h1
      class="italic align-top block w-full self-start justify-self-start mt-5"
    >
      The Städelschule Anthology
    </h1>
    <div class="flex justify-center items-center">
      <div class="absolute mx-auto -rotate-90">
        <random-circle
          :style="{
            transform:
              'rotateZ(' +
              (45 + parseInt((1 - intersectionRatio) * 360 * 5)) +
              'deg)',
          }"
        />
      </div>
      <ul class="leading-5">
        <li v-for="{ author, path } in $store.getters.getWorks" :key="path">
          {{ author }}
        </li>
      </ul>
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

<style></style>
