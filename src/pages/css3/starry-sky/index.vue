<template>
  <div class="group-body">
    <div class="g-container">
      <div class="g-group">
        <div class="item item-right"></div>
        <div class="item item-left"></div>
        <div class="item item-top"></div>
        <div class="item item-bottom"></div>
        <div class="item item-middle"></div>
      </div>
      <div class="g-group">
        <div class="item item-right"></div>
        <div class="item item-left"></div>
        <div class="item item-top"></div>
        <div class="item item-bottom"></div>
        <div class="item item-middle"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped>
  @use "sass:math";
  @function randomColor() {
    @return rgb(random(255), random(255), random(255));
  }

  @function shadowSet($maxWidth, $maxHeight, $count) {
    $shadow: 0 0 0 0 randomColor();
    @for $i from 0 through $count {
      $x: #{math.div(random(10000), 10000) * $maxWidth};
      $y: #{math.div(random(10000), 10000) * $maxHeight};
      $shadow: $shadow, #{$x} #{$y} 0 #{random(5)}px randomColor();
    }
    @return $shadow;
  }

  .group-body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #000;
    display: flex;
  }
  .g-container {
    margin: auto;
    perspective: 5px;
    perspective-origin: 50% 50%;
    position: relative;
    animation: hueRotate 20s infinite linear;
  }

  .g-group {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: -50vw;
    top: -50vh;
    transform-style: preserve-3d;
    animation: move 8s infinite linear;
  }

  .g-group:nth-child(2) {
    animation: move 8s infinite linear;
    animation-delay: -4s;
  }

  .item {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#05040a, #03010e);
    background-size: cover;
    opacity: 1;
    animation: fade 8s infinite linear;
    animation-delay: 0;
  }
  .item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: shadowSet(100vw, 100vh, 500);
  }

  .g-group:nth-child(2) .item {
    animation-delay: -4s;
  }

  .item-right {
    transform: rotateY(90deg) translateZ(500px);
  }

  .item-left {
    transform: rotateY(-90deg) translateZ(500px);
  }

  .item-top {
    transform: rotateX(90deg) translateZ(500px);
  }

  .item-bottom {
    transform: rotateX(-90deg) translateZ(500px);
  }

  .item-middle {
    transform: rotateX(180deg) translateZ(1000px);
  }

  @keyframes move {
    0% {
      transform: translateZ(-200px) rotate(0deg);
    }
    100% {
      transform: translateZ(150px) rotate(0deg);
    }
  }

  @keyframes fade {
    0% {
      opacity: 0.2;
    }
    25%,
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }

  @keyframes hueRotate {
    0% {
      filter: hue-rotate(0);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
</style>
