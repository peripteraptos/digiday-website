<template>
  <ul
    class="mt-7 flex-grow max-w-sm"
    :class="{ 'lg:block': $nuxt.$route.path === '/' }"
  >
    <li v-for="{ author, isActive } in $store.getters.getAuthors" :key="author">
      <span :class="{ 'font-bold': isActive }">{{ author }}</span>
    </li>
    <li class="text-red-500 font-bold mt-3 font-sans">
      <a class="cursor-pointer" @click="$emit('shuffle')">RANDOM</a>
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
</template>

<script>
export default {}
</script>

<style></style>
