<template>
  <div class="box">
    <img id="brush" src="@/assets/images/brush.png" />
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

        // 画笔
        const brush = document.getElementById('brush') as HTMLDivElement

        /* 使用promise，让龙是一点一点绘制出来的 */
        const draw = (
          imageData: Uint8ClampedArray,
          width: number,
          height: number,
          w: number
        ): Promise<number> => {
          // 移动画笔
          brush.style.left = `${w}px`
          return new Promise((res) => {
            requestAnimationFrame(() => {
              ctx.fillStyle = 'rgba(255,215,0,.8)'
              for (let h = 0; h < height; h += gap) {
                const position = (width * h + w) * 4
                const r = imageData[position]
                const g = imageData[position + 1]
                const b = imageData[position + 2]
                if (r + g + b === 0) {
                  ctx.fillRect(w, h, 2, 2)
                }
              }
              res(1)
            })
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
          // 绘制结束隐藏画笔
          brush.style.display = 'none'
        }
      })
      return {}
    }
  })
</script>
<style scoped>
  .box {
    position: relative;
    display: inline-block;
    font-size: 0;
  }
  #brush {
    position: absolute;
    width: 20px;
    top: 0;
    left: 0;
    animation: anim 1s infinite;
  }

  @keyframes anim {
    0% {
      top: 0;
    }
    50% {
      top: calc(100% - 20px);
    }
    100% {
      top: 0;
    }
  }
</style>
