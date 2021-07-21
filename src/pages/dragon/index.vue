<template>
  <div class="box">
    <canvas class="canvas" id="dragon"></canvas>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import dragonSrc from '@/assets/images/dragon.jpeg'

  export default defineComponent({
    name: 'Dragon',
    setup() {
      onMounted(() => {
        const canvas = document.getElementById('dragon') as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const image = new Image()
        image.src = dragonSrc
        const gap = 1

        const draw = (
          imageData: Uint8ClampedArray,
          width: number,
          height: number,
          w: number
        ): Promise<number> => {
          return new Promise((res) => {
            setTimeout(() => {
              for (let h = 0; h < height; h += gap) {
                const position = (width * h + w) * 4
                const r = imageData[position]
                const g = imageData[position + 1]
                const b = imageData[position + 2]
                if (r + g + b === 0) {
                  ctx.fillStyle = 'rgba(255,215,0,.8)'
                  ctx.fillRect(w, h, 2, 2)
                }
              }
              res(1)
            }, 0)
          })
        }

        image.onload = async () => {
          const { width, height } = image
          canvas.width = width
          canvas.height = height
          ctx.fillStyle = '#fff'
          ctx.drawImage(image, 0, 0)
          const imageData = ctx.getImageData(0, 0, width, height).data

          ctx.fillStyle = '#fff'
          ctx.fillRect(0, 0, width, height)

          for (let w = 0; w < width; w += gap) {
            await draw(imageData, width, height, w)
          }
        }
      })
      return {}
    }
  })
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .canvas {
    animation: move 9s;
  }
  @keyframes move {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
