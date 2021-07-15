<template>
  <div style="padding: 20px">
    <canvas id="snake"></canvas>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'Snake',
    setup() {
      interface SnakePoint {
        [key: number]: number
      }

      class Snake {
        width = 601
        height = 401
        gap = 10
        row = Math.floor(this.width / this.gap)
        col = Math.floor(this.height / this.gap)
        offset = 0.5
        container
        ctx
        snake: SnakePoint[] = [
          [15, 20],
          [14, 20],
          [13, 20],
          [12, 20],
          [11, 20]
        ]
        direction = 'left'
        snakeColor = '#FF0000'

        constructor(container: HTMLCanvasElement) {
          this.container = container
          this.container.width = this.width
          this.container.height = this.height
          this.ctx = this.container.getContext('2d') as CanvasRenderingContext2D
          this.drawGrid()
          this.drawSnkae()
        }

        drawGrid() {
          for (let i = 0; i <= this.col; i++) {
            this.ctx.moveTo(0, i * this.gap + this.offset)
            this.ctx.lineTo(this.width, i * this.gap + this.offset)
          }
          for (let i = 0; i <= this.row; i++) {
            this.ctx.moveTo(i * this.gap + this.offset, 0)
            this.ctx.lineTo(i * this.gap + this.offset, this.height)
          }
          this.ctx.stroke()
        }

        drawFood() {}

        drawSnkae() {
          for (let i = 0; i < this.snake.length; i++) {
            const item = this.snake[i]
            this.ctx.fillStyle = this.snakeColor
            this.ctx.fillRect(
              item[0] * this.gap + this.offset,
              item[1] * this.gap + this.offset,
              this.gap,
              this.gap
            )
          }
        }

        drawMoveSnake(data: SnakePoint) {
          this.snake.push(data)
          this.ctx.fillStyle = this.snakeColor
          this.ctx.fillRect(
            data[0] * this.gap + this.offset,
            data[1] * this.gap + this.offset,
            this.gap,
            this.gap
          )
        }

        snakeMove() {
          switch (this.direction) {
            case 'left': {
              break
            }
            case 'left': {
              break
            }
            case 'left': {
              break
            }
            case 'left': {
              break
            }
          }
        }
      }

      onMounted(() => {
        new Snake(document.getElementById('snake') as HTMLCanvasElement)
      })

      return {}
    }
  })
</script>
