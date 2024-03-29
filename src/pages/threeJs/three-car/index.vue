<template>
  <div id="car"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
  import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

  export default defineComponent({
    name: 'Car',
    setup() {
      interface NewObject3D extends THREE.Object3D {
        material?: THREE.Material
        isMesh?: boolean
      }

      class Car {
        // 容器
        private container: HTMLDivElement | null = null
        private width = 0
        private height = 0
        private scene: THREE.Scene | null = null
        private camera: THREE.PerspectiveCamera | null = null
        private renderer: THREE.WebGLRenderer | null = null
        private controls: OrbitControls | null = null
        private grid: THREE.GridHelper | null = null
        private renderTimer: number | null = null
        private composer: EffectComposer | null = null
        // 选中部件
        private outlinePass: OutlinePass | null = null
        private clearEvents: Function | null = null
        constructor(container: HTMLDivElement) {
          this.container = container
          this.width = container.clientWidth
          this.height = container.clientHeight
          // 场景
          this.scene = new THREE.Scene()
          //相机
          this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 100)
          this.camera.position.set(4.25, 1.4, -4.5)

          this.renderer = new THREE.WebGLRenderer({ antialias: true })

          this.controls = new OrbitControls(this.camera, this.container)
          this.controls.target.set(0, 0.5, 0)
          this.controls.update()

          const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
          this.scene.background = new THREE.Color(0xeeeeee)
          this.scene.background = new THREE.Color(0xeeeeee)
          this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
          this.scene.fog = new THREE.Fog(0xeeeeee, 10, 50)

          // 地板网格
          this.grid = new THREE.GridHelper(100, 40, 0x000000, 0x000000)
          ;(this.grid.material as THREE.Material).opacity = 0.1
          ;(this.grid.material as THREE.Material).depthWrite = false
          ;(this.grid.material as THREE.Material).transparent = true

          this.scene.add(this.grid)
          this.renderer.setSize(this.width, this.height)

          this.composer = new EffectComposer(this.renderer)
          let renderPass = new RenderPass(this.scene, this.camera)
          this.composer.addPass(renderPass)

          // 添加选中效果，选中的部位添加outline
          this.outlinePass = new OutlinePass(
            new THREE.Vector2(this.width, this.height),
            this.scene,
            this.camera
          )
          this.outlinePass.renderToScreen = true
          this.outlinePass.edgeStrength = 2 //粗
          this.outlinePass.edgeGlow = 1.5 //发光
          this.outlinePass.visibleEdgeColor.set('yellow') // 设置显示的颜色
          this.outlinePass.hiddenEdgeColor.set('white') // 设置隐藏的颜色

          this.composer.addPass(this.outlinePass)
          this.container.appendChild(this.renderer.domElement)
          this.addCar()
          this.render()
        }

        addCar() {
          const loader = new GLTFLoader()

          const darcoloader = new DRACOLoader()
          darcoloader.setDecoderPath('/three/draco/')
          loader.setDRACOLoader(darcoloader)

          // 加载车的模型
          loader.load(
            '/three/models/ferrari.glb',
            (gltf) => {
              const carModel = gltf.scene
              carModel.rotation.y = -1.5
              console.log(carModel)
              // 场景添加车的模型
              ;(this.scene as THREE.Scene).add(carModel)

              const raycaster = new THREE.Raycaster()
              const mouse = new THREE.Vector2()

              // 选中当前点击的车的部件
              const selectHandler = (ev: MouseEvent) => {
                mouse.x = (ev.clientX / this.width) * 2 - 1
                mouse.y = (ev.clientY / this.height) * 2 - 1
                raycaster.setFromCamera(mouse, this.camera as THREE.PerspectiveCamera)
                let intersects = raycaster.intersectObjects(carModel.children, true)
                if (intersects.length > 0) {
                  let selectedObjects: NewObject3D = intersects[0].object
                  let newMaterrial = (selectedObjects.material as THREE.Material).clone()
                  selectedObjects.material = newMaterrial
                  // 更新选中的部件
                  ;(this.outlinePass as OutlinePass).selectedObjects = [selectedObjects]
                }
              }

              document.body.addEventListener('click', selectHandler, false)
              if (!this.clearEvents) {
                this.clearEvents = () => {
                  document.body.removeEventListener('click', selectHandler)
                }
              }
            },
            (xhr) => {
              //侦听模型加载进度
              console.log('loaded: ' + (xhr.loaded / xhr.total) * 100 + '%')
            },
            (error) => {
              console.error(error)
            }
          )
        }

        remove() {
          cancelAnimationFrame(this.renderTimer as number)
          this.scene = null
          this.camera = null
          this.renderer = null
          this.controls = null
          this.composer = null
          this.clearEvents && this.clearEvents()
        }

        render = () => {
          if (this.composer && this.scene && this.camera) {
            this.renderTimer = requestAnimationFrame(this.render)
            this.composer.render()
          } else if (this.renderTimer) cancelAnimationFrame(this.renderTimer)
        }
      }

      let car: Car

      onMounted(() => {
        car = new Car(document.getElementById('car') as HTMLDivElement)
      })
      onUnmounted(() => {
        car.remove()
      })
      return {}
    }
  })
</script>
<style scoped>
  #car {
    height: 100%;
  }
</style>
