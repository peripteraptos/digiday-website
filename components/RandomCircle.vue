<template>
  <div class="random" :class="{ spinning: $store.state.shuffling }" />
</template>
<script>
export default {
  name: 'RandomCircle',
}
</script>
<style scoped>
.random {
  --size: min(70vmin, 500px);
  width: var(--size);
  height: var(--size);
  border: 1.5px solid black;
  border-radius: 50%;
  position: relative;
  transition: transform 0.1s ease;
  transform-origin: center;
  transform: rotateZ(130deg);
}

.random.spinning {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(130deg);
  }
  100% {
    transform: rotate(490deg);
  }
}
.random:after {
  top: calc(var(--size) / 2);
  left: -15px;
  line-height: 0;
  position: absolute;
  content: '▲';
  font-size: 30px;
}
</style>
