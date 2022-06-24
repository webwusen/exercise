<template>
  <canvas id="mycanvas"></canvas>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'Particle',
    setup() {
      // 粒子效果
      onMounted(() => {
        let canvas = document.getElementById('mycanvas') as HTMLCanvasElement
        let lineDis = 8000 //连线距离
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        let rangeX = window.innerWidth / 2 //设置鼠标移入连线位置
        let rangeY = window.innerHeight / 2
        function size() {
          canvas.height = window.innerHeight - 50
          canvas.width = window.innerWidth - 50
        }
        size()
        class Ball {
          x: number
          y: number
          r: number
          red: number
          green: number
          blue: number
          aph: number
          color: string
          // 构造器
          constructor(x: number, y: number, r: number) {
            this.x = x
            this.y = y
            this.r = r
            this.red = Math.random() * 255 //用于连线随机颜色的保持
            this.green = Math.random() * 255 //用于连线随机颜色的保持
            this.blue = Math.random() * 255 //用于连线随机颜色的保持
            this.aph = Math.random() //用于连线随机透明度的保持
            this.color = '#' + Math.floor(Math.random() * 16777215).toString(16) //记录小球的颜色
          }
          render() {
            ctx.save()
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.restore()
          }
        }

        class moveBall extends Ball {
          dx: number
          dy: number
          constructor(x: number, y: number, r: number) {
            super(x, y, r)
            this.dx = Math.random() * 2 - 1
            this.dy = Math.random() * 2 - 1
          }
          upDate() {
            this.x += this.dx
            this.y += this.dy
            if (this.x >= window.innerWidth || this.x <= 0) {
              this.dx = -this.dx
            }
            if (this.y >= window.innerHeight || this.y <= 0) {
              this.dy = -this.dy
            }
          }
        }
        let dots: Array<moveBall> = [] //小球集中营
        for (let i = 0; i < 500; i++) {
          dots.push(
            new moveBall(
              Math.random() * window.innerWidth,
              Math.random() * window.innerHeight,
              Math.random() * 2
            )
          )
        }
        interface WareaProp {
          x: number | null
          y: number | null
        }
        // 鼠标活动时，获取鼠标坐标
        let warea: WareaProp = { x: null, y: null }
        canvas.onmousemove = function (e) {
          e = e || window.event
          warea.x = e.clientX - canvas.offsetLeft
          warea.y = e.clientY - canvas.offsetTop
          rangeX = warea.x
          rangeY = warea.y
        }
        canvas.onmouseout = function () {
          warea.x = null
          warea.y = null
          rangeX = window.innerWidth / 2
          rangeY = window.innerHeight / 2
        }
        /**
         * 逐个对比连线
         * @param ndots
         */
        function bubDrawLine(ndots: Array<WareaProp | moveBall>) {
          let ndot
          dots.forEach(function (dot) {
            dot.render()
            dot.upDate()
            // 循环比对粒子间的距离
            for (let i = 0; i < ndots.length; i++) {
              ndot = ndots[i] as moveBall

              if (dot === ndot || ndot.x === null || ndot.y === null) continue

              let xc = dot.x - ndot.x
              let yc = dot.y - ndot.y

              // 两个粒子之间的距离
              let dis = xc * xc + yc * yc

              // 如果粒子距离超过max,则不做处理
              if (dis > lineDis) continue

              // 距离比
              // var ratio

              // 如果是鼠标，则让粒子向鼠标的位置移动
              if (ndot === warea && dis < 20000) {
                // dot.dx = -xc * 0.01;
                // dot.dy = -yc * 0.01;
                dot.x -= xc * 0.01
                dot.y -= yc * 0.01
              }
              if (
                dot.x < rangeX - 100 ||
                dot.x > rangeX + 100 ||
                dot.y < rangeY - 100 ||
                dot.y > rangeY + 100
              ) {
                //允许小球连线范围
                continue
              }

              // 计算距离比
              // ratio += (lineDis - dis) / lineDis
              // 粒子间连线
              ctx.beginPath()
              ctx.lineWidth = 1
              ctx.strokeStyle = `rgba(${(dot.red + ndot.red) / 2},${(dot.green + ndot.green) / 2},${
                (dot.blue + ndot.blue) / 2
              },${(dot.aph + ndot.aph) / 2})`
              ctx.moveTo(dot.x, dot.y)
              ctx.lineTo(ndot.x, ndot.y)
              ctx.stroke()
            }

            // 将已经计算过的粒子从数组中删除
            ndots.splice(ndots.indexOf(dot), 1)
          })
        }

        function start() {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
          bubDrawLine([warea].concat(dots))
          window.requestAnimationFrame(start)
        }
        start()
      })
    }
  })
</script>

<style scoped></style>
