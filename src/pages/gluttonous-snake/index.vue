<template>
  <div class="snake">
    <canvas id="grid"></canvas>
    <canvas id="snake"></canvas>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'Snake',
    setup() {
      type Point = number[]

      class Snake {
        width = 0
        height = 0
        gap = 10
        row = 60
        col = 40
        offset = 0.5
        container: HTMLCanvasElement
        ctx: CanvasRenderingContext2D
        snake: Point[] = []
        gridContainer: HTMLCanvasElement
        gridCtx: CanvasRenderingContext2D
        grid: Point[] = []
        food: Point = []
        direction = 'right'
        foodColor = 'green'
        snakeColor = 'red'
        speed = 150
        timer: null | number = null

        constructor(container: HTMLCanvasElement, grid: HTMLCanvasElement) {
          this.width = this.row * this.gap + 1
          this.height = this.col * this.gap + 1
          this.container = container
          this.container.width = this.width
          this.container.height = this.height
          this.ctx = this.container.getContext('2d') as CanvasRenderingContext2D

          this.gridContainer = grid
          this.gridContainer.width = this.width
          this.gridContainer.height = this.height
          this.gridCtx = this.gridContainer.getContext('2d') as CanvasRenderingContext2D
          window.addEventListener('keydown', this.getDreiction)
          this.drawGrid()
          this.createGridPos()
          this.createFood()
          this.drawFood()
          this.createSnake()
          this.drawSnkae()
          this.snakeMove()
        }

        createGridPos() {
          for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
              this.grid.push([i, j])
            }
          }
        }

        drawGrid() {
          for (let i = 0; i <= this.col; i++) {
            this.gridCtx.moveTo(0, i * this.gap + this.offset)
            this.gridCtx.lineTo(this.width, i * this.gap + this.offset)
          }
          for (let i = 0; i <= this.row; i++) {
            this.gridCtx.moveTo(i * this.gap + this.offset, 0)
            this.gridCtx.lineTo(i * this.gap + this.offset, this.height)
          }
          this.gridCtx.stroke()
        }

        createSnake() {
          this.snake = [
            [4, 20],
            [3, 20],
            [2, 20],
            [1, 20],
            [0, 20]
          ]
        }

        createFoodPos(): Point {
          const food = this.grid[(Math.random() * this.grid.length) | 0]
          for (let i = 0; i < this.snake.length; i++) {
            const item = this.snake[i]
            if (item[0] === food[0] && item[1] === food[1]) {
              return this.createFoodPos()
            }
          }
          return food
        }

        createFood() {
          this.food = this.createFoodPos()
          if (this.speed > 50) {
            this.speed--
          }
        }
        drawFood() {
          this.ctx.fillStyle = this.foodColor
          this.ctx.fillRect(
            this.food[0] * this.gap + this.offset,
            this.food[1] * this.gap + this.offset,
            this.gap,
            this.gap
          )
        }

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

        draw() {
          // 清空画布
          this.ctx.clearRect(0, 0, this.width, this.height)
          this.drawFood()
          this.drawSnkae()
        }

        snakeMove() {
          let [x, y] = this.snake[0]
          switch (this.direction) {
            case 'left': {
              x -= 1
              break
            }
            case 'right': {
              x += 1
              break
            }
            case 'up': {
              y -= 1
              break
            }
            case 'down': {
              y += 1
              break
            }
          }
          if (x === this.food[0] && y === this.food[1]) {
            this.createFood()
          } else {
            this.snake.pop()
          }
          this.snake.unshift([x, y])
          this.draw()
          this.timer = window.setTimeout(() => {
            this.snakeMove()
          }, this.speed)
        }

        getDreiction(e: KeyboardEvent) {
          switch (e.key) {
            case 'ArrowLeft': {
              if (this.direction !== 'right') {
                this.direction = 'left'
              }
              break
            }
            case 'ArrowRight': {
              if (this.direction !== 'left') {
                this.direction = 'right'
              }
              break
            }
            case 'ArrowUp': {
              if (this.direction !== 'bottom') {
                this.direction = 'top'
              }
              break
            }
            case 'ArrowDown': {
              if (this.direction !== 'top') {
                this.direction = 'bottom'
              }
              break
            }
          }
          console.log(e, this.direction)
        }

        remove() {
          window.removeEventListener('keydown', this.getDreiction)
        }
      }

      onMounted(() => {
        new Snake(
          document.getElementById('snake') as HTMLCanvasElement,
          document.getElementById('grid') as HTMLCanvasElement
        )
      })

      return {}
    }
  })
</script>
<style scoped>
  .snake {
    padding: 20px;
  }
  .snake canvas {
    position: absolute;
  }
</style>
