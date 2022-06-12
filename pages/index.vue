<template>
  <div
    class="font-serif"
    style="cursor: url(/menu.svg), help"
    @click="open = true"
  >
    <play-overlay />
    <intro-page class="lg:col-span-9" />
    <nav
      class="navigation z-0 top-0 fixed overflow-auto p-5 w-full transition-colors flex flex-col select-none"
      style="cursor: url(/close.svg), crosshair"
      :class="{ 'h-full ': open }"
      @click.stop="open = false"
    >
      <header class="flex justify-between">
        <nuxt-link to="/" class="italic">The Städelschule Anthology</nuxt-link>
        <a class="cursor-pointer font-mono" @click.stop="open = !open">
          {{ open ? 'close' : 'menu' }}
        </a>
      </header>
      <div
        :class="{ hidden: !open }"
        class="flex flex-col h-full flex-grow max-w-md"
      >
        <ul class="mt-8" :class="{ 'lg:block': $nuxt.$route.path === '/' }">
          <li
            v-for="{ author, isActive } in $store.getters.getAuthors"
            :key="author"
            class="inline author"
          >
            <span :class="{ active: isActive }" :data-text="author">
              {{ author }}
            </span>
          </li>
        </ul>
        <div class="mt-8 font-sans flex-grow">
          <a
            class="text-red-500 underline cursor-pointer"
            @click="$store.dispatch('shuffleWorks')"
            >RANDOM</a
          >
          <p class="mt-3 underline text-blue-700">
            <nuxt-link to="/about" @click.stop>ABOUT</nuxt-link>
          </p>
        </div>
        <!--<p class="mt-10">
          <b>{{ $store.getters.getActiveWork.author }}</b>
        </p>-->
      </div>
      <div v-if="$store.getters.getActiveWork" class="fixed bottom-10 h-16">
        <p class="font-bold">{{ $store.getters.getActiveWork.author }}</p>
        <p>
          <span class="italic">{{ $store.getters.getActiveWork.title }}</span
          ><span v-if="$store.getters.getActiveWork.year"
            >, {{ $store.getters.getActiveWork.year }}
          </span>
        </p>
        <p>{{ $store.getters.getActiveWork.description }}</p>
      </div>
    </nav>
    <div class="p-5 col-span-4 max-w-2xl mx-auto">
      <work
        v-for="p in $store.getters.getWorks"
        :key="p.path"
        class="first-of-type:pt-0 work cursor-default select-none prose max-w-none"
        :data-index="p.path"
        :active="
          $store.getters.getActiveWork &&
          $store.getters.getActiveWork.path == p.path
        "
        :intersect="p.intersect"
        :document="p"
        :observer="observer"
      />
      <div
        key="RANDOM"
        ref="circle"
        class="flex flex-col justify-around min-h-screen items-center"
        data-index="RANDOM"
      >
        <intro-page />
      </div>
    </div>
  </div>
</template>

<script>
import IntroPage from '~/components/IntroPage.vue'
import PlayOverlay from '~/components/PlayOverlay.vue'
import Work from '~/components/Work.vue'
export default {
  name: 'IndexPage',
  components: { Work, IntroPage, PlayOverlay },
  async asyncData({ $content }) {
    return {
      page: await $content('about').fetch(),
    }
  },

  data() {
    return {
      observer: null,
      visible: null,
      visibleNext: null,
      intersect: {},
      works: [],
      zoomOut: false,
      open: false,
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
      threshold: [0, 0.1, 0.25, 0.5, 0.6, 0.75, 1],
      // rootMargin: '49%',
    })
  },
  mounted() {
    this.observer.observe(this.$refs.circle)
    this.$store.dispatch('shuffleWorks')
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        const i = target.getAttribute('data-index')
        if (
          i === 'RANDOM' &&
          isIntersecting &&
          intersectionRatio > 0.5 &&
          !this.$store.state.shuffling
        ) {
          this.$store.dispatch('shuffleWorks')
        } else {
          this.$store.commit('SET_INTERSECT', {
            work: i,
            intersect: intersectionRatio,
          })
          this.intersect[i] = intersectionRatio
        }
      })

      const bla = Object.entries(this.intersect).sort(
        (a, b) => b[1] - a[1]
      )[0][0]
      this.$store.commit('SET_ACTIVE', bla)
    },
  },
}
</script>
<style scoped>
.author {
  white-space: normal;
}
.author span {
  white-space: nowrap;
  letter-spacing: 0.1px;
}

.author span[data-text].active {
  visibility: hidden;
  position: relative;
}

.author span[data-text].active:before {
  visibility: visible;
  position: absolute;
  font-weight: bold;
  letter-spacing: 0;
  content: attr(data-text);
  white-space: nowrap;
}

.author:not(:last-of-type):after {
  content: '·';
  margin: 0 0.3em;
  white-space: nowrap;
}
.author::before {
  content: ' ';
  white-space: normal;
}

.work {
  /* max-height: 100vh; */
  margin-bottom: 80vh;
}

.work:first-of-type {
  margin-top: 25vh;
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
