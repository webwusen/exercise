<template>
  <div class="word-group">
    <div class="word">Iphone</div>
    <div class="word">Android</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'FilterContrast',
    setup() {}
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';

  $count: 2;
  $speed: 8s;
  .word-group {
    position: relative;
    height: 100%;
    font-size: 120px;
    filter: contrast(15);
  }
  .word {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: change 8s infinite ease-in-out;

    @for $i from 0 to $count {
      &:nth-child(#{$i + 1}) {
        animation-delay: (math.div($speed, $count + 1) * $i) - $speed;
      }
    }
  }
  @keyframes change {
    0%,
    5%,
    100% {
      filter: blur(0);
      opacity: 1;
    }
    50%,
    80% {
      filter: blur(80px);
      opacity: 0;
    }
  }
</style>
