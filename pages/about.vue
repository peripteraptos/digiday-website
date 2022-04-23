<template>
  <nuxt-content :document="page" />
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
