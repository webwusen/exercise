<template>
  <div class="snake">
    <n-space>
      <n-button @click="begin">begin</n-button>
      <n-button @click="control">{{ status }}</n-button>
      <n-button @click="end">end</n-button>
      <div class="score"> Score: {{ scroe }} </div>
    </n-space>
    <canvas id="grid"></canvas>
    <canvas id="snake"></canvas>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
  import { useMessage, NButton, NSpace } from 'naive-ui'

  export default defineComponent({
    name: 'Snake',
    components: {
      NButton,
      NSpace
    },
    setup() {
      const message = useMessage()
      const status = ref('pause')
      const scroe = ref(0)
      let snake: Snake

      type Point = number[]
      type Tfunc = (scroe: number) => void
      class Snake {
        private width = 0
        private height = 0
        private gap = 10
        private row = 60
        private col = 40
        private offset = 0.5
        private container: HTMLCanvasElement
        private ctx: CanvasRenderingContext2D
        private snake: Point[] = []
        private gridContainer: HTMLCanvasElement
        private gridCtx: CanvasRenderingContext2D
        private grid: Point[] = []
        private food: Point = []
        private direction = 'right'
        private foodColor = 'green'
        private snakeColor = 'red'
        private speed = 150
        private canChange = true
        private timer: null | number = null
        private isStart = false
        private score = 0
        sendScroe: Tfunc

        constructor(container: HTMLCanvasElement, grid: HTMLCanvasElement, sendScroe: Tfunc) {
          this.sendScroe = sendScroe
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
          this.init()
        }

        init() {
          this.drawGrid()
          this.createGridPos()
          this.createFood()
          this.drawFood()
          this.createSnake()
          this.firstDrawSnake()
        }

        createGridPos() {
          for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
              this.grid.push([i, j])
            }
          }
        }

        drawGrid() {
          this.gridCtx.beginPath()
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
          if (this.food.length) {
            // 清空食物
            this.ctx.clearRect(
              this.food[0] * this.gap + this.offset,
              this.food[1] * this.gap + this.offset,
              this.gap,
              this.gap
            )
          }
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

        firstDrawSnake() {
          for (let i = 0; i < this.snake.length; i++) {
            const point = this.snake[i]
            this.ctx.fillStyle = this.snakeColor
            this.ctx.fillRect(
              point[0] * this.gap + this.offset,
              point[1] * this.gap + this.offset,
              this.gap,
              this.gap
            )
          }
        }

        drawSnkae() {
          const point = this.snake[0]
          this.ctx.fillStyle = this.snakeColor
          this.ctx.fillRect(
            point[0] * this.gap + this.offset,
            point[1] * this.gap + this.offset,
            this.gap,
            this.gap
          )
        }

        draw() {
          this.drawFood()
          this.drawSnkae()
        }

        gameOver(point: Point): boolean {
          if (point[0] > this.row || point[0] < 0 || point[1] > this.col || point[1] < 0) {
            message.error('Game Over!')
            return true
          }
          return false
        }

        calcScore(isEnd?: boolean) {
          if (isEnd) {
            this.score = 0
          } else {
            this.score += 10
          }
          this.sendScroe(this.score)
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
          if (this.gameOver([x, y])) {
            if (this.timer) {
              clearTimeout(this.timer)
            }
            return
          }
          if (x === this.food[0] && y === this.food[1]) {
            this.createFood()
            this.calcScore()
          } else {
            const tail = this.snake.pop() as Point
            // 清除尾部
            this.ctx.clearRect(
              tail[0] * this.gap,
              tail[1] * this.gap,
              this.gap + this.offset,
              this.gap + this.offset
            )
          }
          this.snake.unshift([x, y])
          this.draw()
          this.canChange = true
          this.timer = window.setTimeout(() => {
            this.snakeMove()
          }, this.speed)
        }

        getDreiction = (e: KeyboardEvent): void => {
          if (!this.canChange) return
          this.canChange = false
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
              if (this.direction !== 'down') {
                this.direction = 'up'
              }
              break
            }
            case 'ArrowDown': {
              if (this.direction !== 'up') {
                this.direction = 'down'
              }
              break
            }
          }
        }

        remove() {
          window.removeEventListener('keydown', this.getDreiction)
        }

        begin() {
          if (!this.isStart) {
            this.isStart = true
            this.snakeMove()
          }
        }

        pause(callback?: Function) {
          if (this.isStart && this.timer) {
            clearTimeout(this.timer)
            callback && callback()
          }
        }
        continue(callback: Function) {
          if (this.isStart) {
            callback()
            this.snakeMove()
          }
        }

        end() {
          this.calcScore(true)
          this.pause()
          this.isStart = false
          this.gridCtx.clearRect(0, 0, this.width, this.height)
          this.ctx.clearRect(0, 0, this.width, this.height)
          this.init()
        }
      }

      onMounted(() => {
        snake = new Snake(
          document.getElementById('snake') as HTMLCanvasElement,
          document.getElementById('grid') as HTMLCanvasElement,
          (s) => {
            scroe.value = s
          }
        )
      })

      onUnmounted(() => {
        snake.remove()
      })

      const begin = () => {
        snake.begin()
      }

      const control = () => {
        if (status.value === 'pause') {
          snake.pause(() => {
            status.value = 'continue'
          })
        } else {
          snake.continue(() => {
            status.value = 'pause'
          })
        }
      }

      const end = () => {
        snake.end()
        status.value = 'pause'
      }

      return {
        status,
        scroe,
        begin,
        control,
        end
      }
    }
  })
</script>
<style scoped>
  .snake {
    padding: 20px;
    height: 100%;
  }
  .snake canvas {
    position: absolute;
    margin-top: 10px;
  }
  .score {
    flex: 1;
    text-align: right;
  }
</style>
