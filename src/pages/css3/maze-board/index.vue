<template>
  <div id="mazeBoard" class="maze-board">
    <div id="mazeWall" class="maze-board-wall">
      <div class="maze-piece-box">
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
  import { defineComponent, ref, Ref, onMounted, onUnmounted } from 'vue'
  import type { EventListener } from '@/type/index'

  export default defineComponent({
    name: 'MazeBoard',
    setup() {
      /* 
      格子数据，0不能通过，1可以通过
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
      const grid: Ref<number[]> = ref([
        0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
        1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
        1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
        0, 0, 1, 1, 0, 0, 0, 0
      ])
      interface InitClass {
        remove: Function
      }
      let initClass: null | InitClass = null
      const init = () => {
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
        const eventHandler = (eventName: 'addEventListener' | 'removeEventListener') => {
          board[eventName]('mousedown', mouseDownHandler as EventListener)
          board[eventName]('mouseup', mouseUpHandler as EventListener)
          board[eventName]('mousemove', mouseMoveHandler as EventListener)
        }
        eventHandler('addEventListener')

        let time: number | null = null
        const animate = () => {
          pan.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          time = requestAnimationFrame(animate)
        }

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
  .maze-board-grid:first-child {
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
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
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
