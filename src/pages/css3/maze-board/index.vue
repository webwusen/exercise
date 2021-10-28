<template>
  <div id="mazeBoard" class="maze-board">
    <div id="mazeWall" class="maze-board-wall">
      <div
        id="move"
        class="maze-piece-box"
        style="transform: translateZ(25px) rotateX(0deg) rotateY(0deg)"
      >
        <div class="maze-piece front">z</div>
        <div class="maze-piece back">z</div>
        <div class="maze-piece left">x</div>
        <div class="maze-piece right">x</div>
        <div class="maze-piece top">y</div>
        <div class="maze-piece bottom">y</div>
      </div>
      <div v-for="(item, index) in grid" :key="index" class="maze-board-grid">
        <div v-if="item === 1" class="maze-roadblock-box">
          <div class="maze-board-roadblock front"></div>
          <div class="maze-board-roadblock back"></div>
          <div class="maze-board-roadblock left"></div>
          <div class="maze-board-roadblock right"></div>
          <div class="maze-board-roadblock top"></div>
          <div class="maze-board-roadblock bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue'
  import type { EventListener } from '@/type/index'

  export default defineComponent({
    name: 'MazeBoard',
    setup() {
      /*
      格子数据，0能通过，1不能通过
        0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
        0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
        1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
        1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1,
        0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
        1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0
      */
      const grid: number[] = [
        0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
        1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
        1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
        0, 0, 1, 1, 0, 0, 0, 0
      ]
      interface InitClass {
        remove: Function
      }

      let initClass: null | InitClass = null
      const init = () => {
        let point: number[] = [15, 15]
        const move = document.getElementById('move') as HTMLDivElement
        const pan = document.getElementById('mazeWall') as HTMLDivElement
        const board = document.getElementById('mazeBoard') as HTMLDivElement
        let startX = 0
        let startY = 0
        let rotateX = 0
        let rotateY = 0
        let speed = 0.2
        let allowMove = false
        const mouseDownHandler = (event: MouseEvent) => {
          animate()
          allowMove = true
          startX = event.clientX
          startY = event.clientY
        }
        const mouseUpHandler = () => {
          allowMove = false
          if (time) {
            cancelAnimationFrame(time)
          }
        }
        const mouseMoveHandler = (event: MouseEvent) => {
          if (!allowMove) return
          rotateX = rotateX + -(event.clientY - startY) * speed
          rotateY = rotateY + (event.clientX - startX) * speed
          startX = event.clientX
          startY = event.clientY
        }

        const calcPoint = ([x, y]: number[]): number => {
          const index: number = (y - 1) * 15 + x - 1
          const item = grid[index]
          return item
        }

        const onKeyDownHandler = (event: KeyboardEvent) => {
          const p = [...point]
          let x = 0
          let y = 0
          switch (event.key) {
            case 'ArrowUp': {
              if (p[1] !== 1) {
                p[1] = p[1] - 1
                x += 360
              }
              break
            }
            case 'ArrowDown': {
              if (p[1] !== 15) {
                p[1] = p[1] + 1
                x -= 360
              }
              break
            }
            case 'ArrowLeft': {
              if (p[0] !== 1) {
                p[0] = p[0] - 1
                y -= 360
              }
              break
            }
            case 'ArrowRight': {
              if (p[0] !== 15) {
                p[0] = p[0] + 1
                y += 360
              }
              break
            }
          }

          if (!(p[0] === point[0] && p[1] === point[1]) && calcPoint(p) === 0) {
            point = [...p]
            move.style.right = (15 - point[0]) * 50 + 'px'
            move.style.bottom = (15 - point[1]) * 50 + 'px'
            const tran = move.style.transform
            if (tran) {
              console.log(tran)
              const re = /\([^)]+\)/g
              const tranList = tran.match(re) as RegExpMatchArray
              x = +tranList[1].substring(1, tranList[1].length - 4) + x
              y = +tranList[2].substring(1, tranList[2].length - 4) + y
              console.log(x, y)
              move.style.transform = `translateZ(25px) rotateX(${x}deg) rotateY(${y}deg)`
            }
          }
        }

        const eventHandler = (eventName: 'addEventListener' | 'removeEventListener') => {
          board[eventName]('mousedown', mouseDownHandler as EventListener)
          board[eventName]('mouseup', mouseUpHandler as EventListener)
          board[eventName]('mousemove', mouseMoveHandler as EventListener)
          document[eventName]('keydown', onKeyDownHandler as EventListener)
        }
        eventHandler('addEventListener')

        let time: number | null = null
        const animate = () => {
          pan.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          time = requestAnimationFrame(animate)
        }

        document.addEventListener
        const remove = () => {
          if (time) {
            cancelAnimationFrame(time)
          }
          eventHandler('removeEventListener')
        }
        return {
          remove
        }
      }

      onMounted(() => {
        initClass = init()
      })
      onUnmounted(() => {
        initClass?.remove()
      })
      return {
        grid
      }
    }
  })
</script>
<style scoped>
  .maze-board {
    width: 100%;
    height: 100%;
    text-align: center;
    perspective: 1200px;
    overflow: hidden;
    user-select: none;
  }
  .maze-board-wall {
    position: relative;
    display: inline-block;
    width: 750px;
    height: 750px;
    vertical-align: middle;
    border: 1px solid;
    box-sizing: content-box;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
  }
  .maze-board:after {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
  .maze-board-grid {
    width: 50px;
    height: 50px;
    float: left;
    border: 1px solid;
  }
  .maze-piece-box + .maze-board-grid {
    background-color: orange;
  }
  .maze-board-grid:last-child {
    background-color: orange;
  }
  .maze-piece-box,
  .maze-roadblock-box {
    position: relative;
    transform: translateZ(25px);
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transition: all 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .maze-board-grid {
    position: relative;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transition: all 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .maze-board-roadblock,
  .maze-piece-box,
  .maze-piece {
    position: absolute;
  }

  .maze-piece-box,
  .maze-piece,
  .maze-roadblock-box,
  .maze-board-roadblock {
    width: 50px;
    height: 50px;
    line-height: 48px;
    font-size: 30px;
  }

  .maze-piece-box {
    right: 0;
    bottom: 0;
    z-index: 999;
  }
  .maze-piece {
    background-color: orange;
    border: 1px solid #333;
  }
  .maze-board-roadblock {
    border: 1px solid cyan;
    background-color: brown;
  }
  .front {
    transform: translateZ(25px);
  }
  .back {
    transform: rotateX(180deg) translateZ(25px);
  }
  .left {
    transform: rotateY(-90deg) translateZ(25px);
  }
  .right {
    transform: rotateY(-90deg) translateZ(-25px);
  }
  .top {
    transform: rotateX(-90deg) translateZ(25px);
  }
  .bottom {
    transform: rotateX(-90deg) translateZ(-25px);
  }
</style>
