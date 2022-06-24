<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'DragonBoatFestival',
    setup() {
      return {}
    }
  })
</script>
<template>
  <div id="zongzi">
    <div class="loading">
      <div class="loading-assets">
        <img class="loading-item" src="./svg/rice.svg" />
        <img class="loading-item" src="./svg/jujube.svg" />
        <img class="loading-item" src="./svg/palm-leaf.svg" />
      </div>
      <img class="loading-result" src="./svg/zongzi.svg" />
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="mix">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>
<style lang="scss">
  @use "sass:math";
  #zongzi {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: black;
  }

  $duration: 4.2s;
  $delay: math.div(-$duration, 2);

  .loading {
    width: 200px;
    height: 200px;
    position: relative;

    .loading-assets {
      width: 100%;
      height: 100%;
      animation: rotate $duration infinite, mix $duration infinite;
      animation-delay: $delay;
    }

    .loading-result {
      width: 50px;
      height: 50px;
      left: 50%;
      top: 50%;
      position: absolute;
      margin-left: -25px;
      margin-top: -25px;
      animation: show $duration infinite;
      animation-delay: $delay;
      filter: drop-shadow(0px 0px 8px rgba(252, 233, 124, 0.5));
    }

    .loading-item {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -30px 0 0 -30px;
      filter: drop-shadow(0px 0px 8px rgba(252, 233, 124, 0.8));
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          animation: #{'item-move-' + $i} $duration infinite;
          animation-delay: $delay;
        }
      }
    }
  }

  @keyframes item-move-1 {
    0%,
    20%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    40% {
      transform: translate(0, -18px) scale(0.7);
    }
    60% {
      transform: translate(0, -85px) scale(0.7);
    }
    80% {
      transform: translate(0, -85px) scale(0.7);
    }
  }

  @keyframes item-move-2 {
    0%,
    20%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    40% {
      transform: translate(-16px, 12px) scale(0.7);
    }
    60% {
      transform: translate(-90px, 65px) scale(0.7);
    }
    80% {
      transform: translate(-90px, 65px) scale(0.7);
    }
  }

  @keyframes item-move-3 {
    0%,
    20%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    40% {
      transform: translate(16px, 12px) scale(0.7);
    }
    60% {
      transform: translate(90px, 65px) scale(0.7);
    }
    80% {
      transform: translate(90px, 65px) scale(0.7);
    }
  }

  @keyframes rotate {
    0%,
    60% {
      transform: rotate(0deg);
    }
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes mix {
    0%,
    40% {
      filter: url(#mix);
      opacity: 1;
    }
    8%,
    36% {
      opacity: 0;
    }
    48%,
    80% {
      filter: none;
      opacity: 1;
    }
    100% {
      filter: url(#mix);
      opacity: 1;
    }
  }

  @keyframes show {
    0%,
    48%,
    100% {
      opacity: 0;
      transform: scale(1);
    }
    8%,
    36% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
</style>
