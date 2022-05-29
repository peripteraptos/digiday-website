<template>
  <div>
    <ul
      v-if="false"
      class="mt-7 flex-grow max-w-sm"
      :class="{ 'lg:block': $nuxt.$route.path === '/' }"
    >
      <li
        v-for="{ author, isActive } in $store.getters.getAuthors"
        :key="author"
        :class="{ 'font-bold': isActive }"
      >
        <span>{{ author }}</span>
      </li>
    </ul>
    <div>
      <div class="text-red-500 font-bold mt-3 font-sans">
        <a class="cursor-pointer" @click="$emit('shuffle')">RANDOM</a>
      </div>
      <!--<p class="mt-10">
          <b>{{ $store.getters.getActiveWork.author }}</b>
        </p>-->
      <div v-if="$store.getters.getActiveWork" class="mt-6">
        <p class="font-bold">{{ $store.getters.getActiveWork.author }}</p>
        <p>
          <span class="italic">{{ $store.getters.getActiveWork.title }}</span
          ><span v-if="$store.getters.getActiveWork.year"
            >, {{ $store.getters.getActiveWork.year }}</span
          >
        </p>

        <p class="">
          {{ $store.getters.getActiveWork.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.author + .author:before {
  content: ', ';
  font-weight: normal;
}
</style>
