<template>
  <div class="camera box-padding">
    <div class="space" id="space">
      <div class="front">3</div>
      <div class="back">4</div>
      <div class="left">6</div>
      <div class="right">1</div>
      <div class="bottom">2</div>
      <div class="top">6</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue'

  export default defineComponent({
    name: 'SkyBox',
    setup() {
      // 清除事件句柄函数
      let removeFun: Function | null = null
      onMounted(() => {
        let rotateX = 0
        let rotateY = 0
        let startX = 0
        let startY = 0
        let timer = -1
        // 旋转速度(越小速度越快)
        const speed = 1
        const space = document.getElementById('space') as HTMLDivElement
        const bindMouseFn = () => {
          /**
           * 鼠标按下时记录当前点为初始点
           * 绑定鼠标移动事件开始执行动画函数go
           */
          function mouseDownHandler(event: MouseEvent) {
            startX = event.pageX
            startY = event.pageY
            document.addEventListener('mousemove', mouseMoveHandler)
            go()
          }
          // 鼠标按键松开时，解绑鼠标移动事件，清除动画函数
          function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler)
            if (timer > -1) {
              cancelAnimationFrame(timer)
            }
          }

          /**
           * 鼠标移动时用移动到的点减去上次停留的点来计算盒子的旋转度数
           * 改变度数后，更新停留点start的数据
           */
          function mouseMoveHandler(event: MouseEvent) {
            rotateX = rotateX + -(event.pageY - startY / speed)
            rotateY = rotateY + (event.pageX - startX / speed)
            startY = event.pageY
            startX = event.pageX
          }

          document.addEventListener('mousedown', mouseDownHandler)
          document.addEventListener('mouseup', mouseUpHandler)
          removeFun = () => {
            document.removeEventListener('mousedown', mouseDownHandler)
            document.removeEventListener('mouseup', mouseUpHandler)
            document.removeEventListener('mousemove', mouseMoveHandler)
          }
        }
        const go = () => {
          space.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          timer = requestAnimationFrame(go)
        }
        bindMouseFn()
      })

      onUnmounted(() => {
        if (removeFun) {
          removeFun()
        }
      })
    }
  })
</script>

<style scoped>
  .camera {
    perspective: 200px;
    perspective-origin: 50% 50%;
    margin-top: 100px;
  }
  .space {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    transform-style: preserve-3d;
  }

  .space div {
    position: absolute;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    border: 1px solid;
    user-select: none;
  }

  .space .front {
    transform: rotateZ(0) rotateY(0) rotateZ(0) translateZ(-50px);
  }
  .space .back {
    transform: rotateY(180deg) translateZ(-50px);
  }
  .space .left {
    transform: rotateY(90deg) translateZ(-50px);
  }
  .space .right {
    transform: rotateY(-90deg) translateZ(-50px);
  }
  .space .bottom {
    transform: rotateX(90deg) translateZ(-50px);
  }
  .space .top {
    transform: rotateX(-90deg) translateZ(-50px);
  }
</style>
