import { getRandomIntInclusive } from '@/utils/getRandomIntInclusive'
export interface Option {
  type?: string
  data?: Array<DataItem>
  [key: string]: any
}

export interface DataItem {
  value: number
  label: string
}

type optionType = Option | null

export default class Chart {
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width = 0
  private height = 0
  private left = 0
  private right = 0
  private top = 0
  private bottom = 0
  private gap = 20
  private barGap = 20
  private option: optionType = null
  private colorList: Array<string> = []

  constructor(dom: HTMLElement) {
    this.container = dom
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }
  init() {
    this.createColor()
    this.setBaseData()
    this.container.appendChild(this.canvas)
  }

  createColor() {
    for (let i = 0; i < 20; i++) {
      const color = this.randomColor()
      this.colorList.push(color)
    }
  }

  randomColor() {
    let color =
      '#' +
      getRandomIntInclusive(0, 255).toString(16) +
      getRandomIntInclusive(0, 255).toString(16) +
      getRandomIntInclusive(0, 255).toString(16)
    if (this.colorList.includes(color)) {
      color = this.randomColor()
    }
    return color
  }

  setBaseData() {
    this.width = this.canvas.width = this.container.offsetWidth
    this.height = this.canvas.height = this.container.offsetHeight
    this.left = 0 + this.gap
    this.right = this.width - this.gap
    this.top = 0 + this.gap
    this.bottom = this.height - this.gap
  }

  setOption(option: optionType = null) {
    this.option = option
    console.log(option)
    this.drawCoordinate()
    this.drawBar()
  }

  drawCoordinate() {
    // X轴
    this.ctx.moveTo(this.left, this.bottom)
    this.ctx.lineTo(this.right, this.bottom)
    this.ctx.stroke()

    this.ctx.moveTo(this.right, this.bottom)
    this.ctx.lineTo(this.right - 5, this.bottom - 5)
    this.ctx.stroke()

    this.ctx.moveTo(this.right, this.bottom)
    this.ctx.lineTo(this.right - 5, this.bottom + 5)
    this.ctx.stroke()

    // Y轴
    this.ctx.moveTo(this.left, this.bottom)
    this.ctx.lineTo(this.left, this.top)
    this.ctx.stroke()

    this.ctx.moveTo(this.left, this.top)
    this.ctx.lineTo(this.left - 5, this.top + 5)
    this.ctx.stroke()

    this.ctx.moveTo(this.left, this.top)
    this.ctx.lineTo(this.left + 5, this.top + 5)
    this.ctx.stroke()
  }

  drawBar() {
    if (this.option?.data?.length) {
      const len = this.option.data.length
      const allBarWidth = this.right - this.left - this.gap * 2 - this.barGap * (len - 1)
      const barWidth = allBarWidth / len
      let left = this.left + this.gap
      this.option.data.forEach((item, index) => {
        const bottom = this.bottom - item.value
        this.ctx.beginPath()
        this.ctx.fillStyle = this.colorList[index]
        this.ctx.fillRect(left, bottom, barWidth, item.value)

        const textLeft = left + barWidth / 2
        this.ctx.font = '14px Verdana'
        this.ctx.fillStyle = '#333'
        this.ctx.fillText(item.label, textLeft, this.bottom + 15)
        this.ctx.fillText(`${item.value}`, textLeft, this.bottom - item.value - 10)

        left = left + barWidth + this.barGap
      })
    }
  }

  resize() {
    this.init()
    if (this.option) {
      this.setOption(this.option)
    }
  }
}
