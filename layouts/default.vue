<template>
  <div class="font-serif lg:grid lg:grid-cols-9">
    <navigation class="p-5 lg:pr-20 col-span-3 w-full lg:max-w-xs" />
    <Nuxt class="p-5 content col-span-4 lg:max-w-3xl prose mx-auto lg:mx-0" />
  </div>
</template>
<script>
import Navigation from '~/components/Navigation.vue'
export default {
  name: 'DefaultLayout',
  components: { Navigation },
  async asyncData({ $content }) {
    const page = await $content('works').fetch()

    return {
      page,
    }
  },
}
</script>
<style scoped></style>
