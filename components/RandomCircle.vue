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
  width: 200px;
  height: 200px;
  border: 1.5px solid black;
  border-radius: 50%;
  position: relative;
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
  top: 100px;
  left: -15px;
  line-height: 0;
  position: absolute;
  content: '▲';
  font-size: 30px;
}
</style>
