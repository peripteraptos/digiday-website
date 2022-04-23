<template>
  <div class="zoom" :class="{ 'zoom-out': false }">
    <TransitionGroup tag="div" name="list" class="works" duration="1000">
      <work
        v-for="page in $store.getters.getWorks"
        :key="page.path"
        class="mb-96 flex flex-col justify-around min-h-screen py-36 text-center"
        :data-index="page.path"
        :document="page"
        :observer="observer"
      />
    </TransitionGroup>
    <div
      class="flex flex-col justify-around min-h-screen py-36 items-center"
      data-index="RANDOM"
      ref="circle"
    >
      <random-circle />
    </div>
  </div>
</template>

<script>
import RandomCircle from '~/components/RandomCircle.vue'
import Work from '~/components/Work.vue'
export default {
  name: 'IndexPage',
  components: { RandomCircle, Work },

  data() {
    return {
      observer: null,
      visible: null,
      visibleNext: null,
      intersect: {},
      works: [],
      zoomOut: false,
    }
  },
  async fetch({ store: { dispatch } }) {
    await dispatch('getWorks')
  },
  beforeDestroy() {
    this.$store.commit('SET_ACTIVE', '/')
    this.observer.disconnect()
  },
  beforeMount() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      // rootMargin: '49%',
    })
  },
  mounted() {
    this.observer.observe(this.$refs.circle)
  },
  methods: {
    log(...e) {
      console.log(...e)
    },
    onElementObserved(entries) {
      console.log(
        ...entries.map(({ target, isIntersecting }) => ({
          isIntersecting,
        }))
      )
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        const i = target.getAttribute('data-index')
        if (
          i === 'RANDOM' &&
          intersectionRatio > 0.5 &&
          !this.$store.state.shuffling
        ) {
          this.$store.dispatch('shuffleWorks')
        } else {
          this.intersect[i] = intersectionRatio
        }

        /* if (!isIntersecting) {
          if (this.visible === i || this.visible === null) {
            if (this.visibleNext !== null) {
              this.visible = this.visibleNext
              this.$store.commit('SET_ACTIVE', this.visibleNext)
            }
          }
        } else {
          this.visibleNext = i
        } */
      })

      const bla = Object.entries(this.intersect).sort(
        (a, b) => b[1] - a[1]
      )[0][0]
      console.log(bla)
      this.$store.commit('SET_ACTIVE', bla)
    },
  },
}
</script>
<style scoped>
.works {
  /* max-height: 100vh; */
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active, .zoom {
  transition: all 2.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.zoom-out {
  transform: scale(0.01);
}
</style>
