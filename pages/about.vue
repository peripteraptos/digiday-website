<template>
  <div>
    <nuxt-link
      to="/"
      class="no-underline text-2xl p-5 fixed top-0 right-0 font-serif"
      >✖</nuxt-link
    >

    <div class="content prose lg:max-w-2xl mx-auto px-5 py-32 mt-1">
      <nuxt-content :document="page" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutPage',
  async asyncData({ $content }) {
    return {
      page: await $content('about').fetch(),
    }
  },
}
</script>
