<template>
  <div class="font-serif lg:grid lg:grid-cols-9">
    <!--<intro-page class="lg:col-span-9" />-->
    <navigation class="p-5 lg:pr-26 col-span-3 w-full lg:max-w-xs" />
    <Nuxt class="p-5 content col-span-4 lg:max-w-3xl prose mx-auto lg:mx-0" />
  </div>
</template>
<script>
import Navigation from '~/components/Navigation.vue'
export default {
  name: 'DefaultLayout',
  components: { Navigation },
}
</script>
<style scoped></style>
