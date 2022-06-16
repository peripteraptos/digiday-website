<template>
  <div>
    <div class="fixed left-0 top-0 right-0">
      <div class="max-w-4xl mx-auto text-right px-4 py-2">
        <nuxt-link to="/" class="no-underline"
          ><span class="font-serif mr-2">◀</span><span>back</span></nuxt-link
        >
      </div>
    </div>

    <div class="content prose lg:max-w-2xl mt-1 text-left">
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
