<template>
  <div style="padding: 20px">
    <canvas id="snake"></canvas>
  </div>
</template>
<script lang="ts">
  import { type } from 'os'
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'Snake',
    setup() {
      type Point = number[]

      class Snake {
        width = 601
        height = 401
        gap = 10
        row = Math.floor(this.width / this.gap)
        col = Math.floor(this.height / this.gap)
        offset = 0.5
        container
        ctx
        snake: Point[] = []
        grid: Point[] = []
        direction = 'left'
        foodColor = 'green'
        snakeColor = 'red'
        speed = 50
        time: number | null = null

        constructor(container: HTMLCanvasElement) {
          this.container = container
          this.container.width = this.width
          this.container.height = this.height
          this.ctx = this.container.getContext('2d') as CanvasRenderingContext2D
          this.drawGrid()
          this.createGridPos()
          this.createSnake()
          this.drawSnkae()
          this.drawFood()
          /* this.loop() */
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
            this.ctx.moveTo(0, i * this.gap + this.offset)
            this.ctx.lineTo(this.width, i * this.gap + this.offset)
          }
          for (let i = 0; i <= this.row; i++) {
            this.ctx.moveTo(i * this.gap + this.offset, 0)
            this.ctx.lineTo(i * this.gap + this.offset, this.height)
          }
          this.ctx.stroke()
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

        createFood(): Point {
          const food = this.grid[(Math.random() * this.grid.length) | 0]
          for (let i = 0; i < this.snake.length; i++) {
            const item = this.snake[i]
            if (item[0] === food[0] && item[1] === food[1]) {
              return this.createFood()
            }
          }
          return food
        }

        drawFood() {
          const food = this.createFood()
          this.ctx.fillStyle = this.foodColor
          this.ctx.fillRect(
            food[0] * this.gap + this.offset,
            food[1] * this.gap + this.offset,
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

        drawMoveSnake(data: Point) {
          this.snake.unshift(data)
          this.snake.pop()
        }

        loop() {
          this.time = window.setTimeout(() => {
            this.snakeMove()
            console.log(this.snake)
            this.drawGrid()
            this.drawSnkae()
            this.loop()
          }, this.speed * 20)
        }
        snakeMove() {
          let [x, y] = this.snake[0]
          switch (this.direction) {
            case 'left': {
              const newPoint = this.snake[0]
              this.drawMoveSnake([newPoint[0] + 1, newPoint[1]])
              break
            }
            case 'right': {
              break
            }
            case 'up': {
              break
            }
            case 'down': {
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
