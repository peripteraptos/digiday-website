<template>
  <div
    v-if="!$store.state.clicked"
    class="w-screen h-screen fixed top-0 left-0 flex z-20"
    style="cursor: url(/unmute.svg), pointer"
    @click.stop="() => $store.commit('SET_CLICKED')"
  ></div>
</template>

<script>
export default {
  name: 'PlayOverlay',
}
</script>

<style></style>
