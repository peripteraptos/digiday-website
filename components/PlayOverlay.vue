<template>
  <div
    v-if="!hide"
    class="w-screen h-screen fixed top-0 left-0 flex z-20"
    style="cursor: url(/unmute.svg), pointer"
    @click.stop="hide = true"
  ></div>
</template>

<script>
export default {
  name: 'PlayOverlay',
  data() {
    return {
      hide: false,
    }
  },
}
</script>

<style></style>
