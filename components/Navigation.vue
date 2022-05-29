<template>
  <nav
    class="navigation z-10 bg-white sticky top-0 lg:h-screen flex flex-col"
    :class="{ 'h-screen': open, 'bg-opacity-95': open }"
  >
    <div class="flex justify-between">
      <nuxt-link to="/" class="italic">The Städelschule Anthology</nuxt-link>
      <a class="lg:hidden cursor-pointer" @click="open = !open">ᐁ</a>
    </div>
    <div :class="{ hidden: !open }" class="lg:block">
      <work-list  />
      <p class="mt-7 underline" @click="open = false">
        <nuxt-link v-if="$nuxt.$route.path !== '/about'" to="/about">
          About
        </nuxt-link>
        <nuxt-link v-if="$nuxt.$route.path !== '/'" to="/">Works</nuxt-link>
      </p>
    </div>
  </nav>
</template>
<script>
import WorkList from './WorkList.vue'
export default {
  name: 'NavigationBar',
  components: { WorkList },
  data() {
    return {
      open: false,
    }
  },
  methods: {
    shuffle() {
     
    },
  },
}
</script>

<style scoped></style>
