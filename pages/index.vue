<template>
  <div class="font-serif max-w-4xl mx-auto bg-white relative">
    <nav
      class="navigation z-0 top-0 left-0 fixed w-full h-6 transition-colors select-none"
      :class="{ 'h-full ': open }"
    >
      <div class="max-w-4xl mx-auto flex flex-col px-4 py-2">
        <a class="italic cursor-pointer" @click.stop="open = !open"
          ><header class="flex justify-between items-start">
            <span>The Städelschule Anthology<br />Digitaltag 2022</span>
            <div
              class="ml-10 transition-transform origin-center whitespace-nowrap"
              :class="{ '-scale-y-1': open }"
            >
              <span class="text-lg">▼ </span>
              <span class="align-top not-italic">menu</span>
            </div>
            <!--<a class="cursor-pointer font-mono" @click.stop="open = !open">
          {{ open ? 'close' : 'menu' }}
        </a>-->
          </header></a
        >
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
              >random</a
            >
            <p class="mt-3 underline text-blue-700">
              <nuxt-link to="/about" @click.stop>about</nuxt-link>
            </p>
          </div>
        </div>
        <div
          v-if="$store.getters.getActiveWork"
          class="fixed bottom-8 max-w-xs"
        >
          <p class="font-bold">{{ $store.getters.getActiveWork.author }}</p>
          <p>
            <span class="italic">{{ $store.getters.getActiveWork.title }}</span
            ><span v-if="$store.getters.getActiveWork.year"
              >, {{ $store.getters.getActiveWork.year }}
            </span>
          </p>
          <p>{{ $store.getters.getActiveWork.description }}</p>
        </div>
      </div>
    </nav>
    <div>
      <intro-page
        key="INTRO"
        :observer="observer"
        data-index="INTRO"
        class="intro"
      />
      <template v-if="$store.state.clicked">
        <work
          v-for="p in $store.getters.getWorks"
          v-show="!$store.state.shuffling"
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
        <intro-page
          v-show="!$store.state.shuffling && $store.state.clicked"
          key="RANDOM"
          ref="circle"
          :observer="observer"
          data-index="RANDOM"
        />
      </template>
    </div>
  </div>
</template>

<script>
import IntroPage from '~/components/IntroPage.vue'
import Work from '~/components/Work.vue'
export default {
  name: 'IndexPage',
  components: { Work, IntroPage },
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
    // this.$store.dispatch('shuffleWorks')
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        const i = target.getAttribute('data-index')
        if (
          i === 'RANDOM' &&
          isIntersecting &&
          intersectionRatio > 0.75 &&
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
  margin-top: 80vh;
}

.work + .work {
  margin-top: 0;
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
