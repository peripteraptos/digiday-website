<template>
  <div>
    <close-button class="m-5 fixed top-1 right-1 to-blue-300" />

    <div class="content prose lg:max-w-3xl mx-auto p-5">
      <nuxt-content :document="page" />
    </div>
  </div>
</template>
<script>
import CloseButton from '~/components/CloseButton.vue'
export default {
  name: 'AboutPage',
  components: { CloseButton },
  async asyncData({ $content }) {
    return {
      page: await $content('about').fetch(),
    }
  },
}
</script>
