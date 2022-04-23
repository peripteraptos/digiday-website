<template>
  <nav
    class="navigation z-10 bg-white sticky top-0 lg:h-screen flex flex-col"
    :class="{ 'h-screen': open, 'bg-opacity-95': open }"
  >
    <div class="flex justify-between">
      <nuxt-link to="/" prefetch><i>The Städelschule Anthology</i></nuxt-link>
      <a class="lg:hidden cursor-pointer" @click="open = !open">ᐁ</a>
    </div>

    <ul
      class="mt-7 flex-grow"
      :class="{ hidden: !open, 'lg:block': $nuxt.$route.path === '/' }"
    >
      <li
        v-for="{ author, isActive } in $store.getters.getAuthors"
        :key="author"
      >
        <span :class="{ 'font-bold': isActive }">{{ author }}</span>
      </li>
      <li class="text-red-500 font-bold mt-3 font-sans">
        <a class="cursor-pointer" @click="shuffle">RANDOM</a>
      </li>
      <li></li>
      <!--<p class="mt-10">
          <b>{{ $store.getters.getActiveWork.author }}</b>
        </p>-->
      <div v-if="$store.getters.getActiveWork" class="mt-10">
        <i>{{ $store.getters.getActiveWork.title }}</i>
        <p>{{ $store.getters.getActiveWork.description }}</p>
      </div>
    </ul>
    <p :class="{ hidden: !open }" class="lg:block mt-7" @click="open = false">
      <nuxt-link v-if="$nuxt.$route.path !== '/about'" to="/about" prefetch
        >About</nuxt-link
      >
      <nuxt-link v-if="$nuxt.$route.path !== '/'" to="/">Works</nuxt-link>
    </p>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      pages: [],
      open: false,
    }
  },
  async fetch({ store: { dispatch } }) {
    await dispatch('getWorks')
  },
  computed: {
    authors() {
      return this.pages.map((p) => p.author)
      // .slice()
      // .sort((a, b) => a.localeCompare(b))
    },
  },
  methods: {
    shuffle() {
      this.open = false
      document.activeElement.blur()
      window.scrollTo({ top: 1000000, behavior: 'auto' })
      this.$store.dispatch('shuffleWorks')
    },
  },
}
</script>

<style scoped></style>
