<template>
  <div id="camera" class="camera flex-cemtered box-padding">
    <div id="space" class="space">
      <div class="front">3</div>
      <div class="back">4</div>
      <div class="left">6</div>
      <div class="right">1</div>
      <div class="bottom">2</div>
      <div class="top">5</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue'

  export default defineComponent({
    name: 'SkyBox',
    setup() {
      interface point {
        pageX: number
        pageY: number
      }
      let skybox: SkyBox | null = null
      class SkyBox {
        private rotateX = 0
        private rotateY = 0
        private startX = 0
        private startY = 0
        private timer = -1
        // 旋转速度(越小速度越快)
        private speed = 1
        private space: HTMLDivElement
        private camera: HTMLDivElement
        private cameraInfo = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }

        constructor(space: HTMLDivElement, camera: HTMLDivElement) {
          this.space = space
          this.camera = camera
          this.cameraInfo = {
            top: this.camera.offsetTop,
            bottom: this.camera.offsetTop + this.camera.offsetHeight,
            left: this.camera.offsetLeft,
            right: this.camera.offsetLeft + this.camera.offsetWidth
          }
          this.init()
        }

        // 初始化绑定
        init = () => {
          this.camera.addEventListener('mousedown', this.mouseDownHandler)
          this.camera.addEventListener('mouseup', this.mouseUpHandler)
        }

        // 移除
        remove = () => {
          if (this.timer > -1) {
            cancelAnimationFrame(this.timer)
          }
          this.rotateX = 0
          this.rotateY = 0
          this.camera.removeEventListener('mousedown', this.mouseDownHandler)
          this.camera.removeEventListener('mouseup', this.mouseUpHandler)
          this.camera.removeEventListener('mousemove', this.mouseMoveHandler)
          document.removeEventListener('mousemove', this.documentMouseMoveHandler)
        }

        // 开始动画
        animate = () => {
          this.space.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
          this.timer = requestAnimationFrame(this.animate)
        }

        /**
         * 鼠标按下时记录当前点为初始点
         * 绑定鼠标移动事件开始执行动画函数animate
         */
        mouseDownHandler = (event: MouseEvent) => {
          this.startX = event.pageX
          this.startY = event.pageY
          this.camera.addEventListener('mousemove', this.mouseMoveHandler)
          document.addEventListener('mousemove', this.documentMouseMoveHandler)
          this.animate()
        }
        // 鼠标按键松开时，解绑鼠标移动事件，清除动画函数
        mouseUpHandler = () => {
          this.camera.removeEventListener('mousemove', this.mouseMoveHandler)
          document.removeEventListener('mousemove', this.documentMouseMoveHandler)
          if (this.timer > -1) {
            cancelAnimationFrame(this.timer)
          }
        }

        /**
         * 鼠标移动时用移动到的点减去上次停留的点来计算盒子的旋转度数
         * 改变度数后，更新停留点start的数据
         */
        mouseMoveHandler = (event: MouseEvent) => {
          this.rotateX = this.rotateX + -(event.pageY - this.startY / this.speed)
          this.rotateY = this.rotateY + (event.pageX - this.startX / this.speed)
          this.startY = event.pageY
          this.startX = event.pageX
        }
        documentMouseMoveHandler = (event: MouseEvent) => {
          if (this.calcBoundary(event)) {
            this.camera.removeEventListener('mousemove', this.mouseMoveHandler)
            document.removeEventListener('mousemove', this.documentMouseMoveHandler)
          }
        }
        // 判断鼠标是否移除camera范围
        calcBoundary = ({ pageX: x, pageY: y }: point) => {
          const { top, bottom, left, right } = this.cameraInfo
          return x <= left || x >= right || y <= top || y >= bottom
        }
      }

      onMounted(() => {
        skybox = new SkyBox(
          document.getElementById('space') as HTMLDivElement,
          document.getElementById('camera') as HTMLDivElement
        )
      })

      onUnmounted(() => {
        if (skybox) {
          skybox.remove()
        }
      })
    }
  })
</script>

<style scoped>
  .camera {
    height: calc(100% - 34px);
    perspective: 200px;
    perspective-origin: 50% 50%;
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
