<template>
  <div id="car"></div>
</template>

<script lang="ts">
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
  import { defineComponent, onMounted, onUnmounted } from 'vue'

  export default defineComponent({
    name: 'Three',
    setup() {
      let scene: THREE.Scene | null = null,
        camera: THREE.PerspectiveCamera | null = null,
        renderer: THREE.WebGLRenderer | null = null,
        controls: OrbitControls | null = null

      const init = () => {
        let container = document.getElementById('car') as HTMLDivElement
        const width = container.clientWidth
        const height = container.clientHeight

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
        renderer = new THREE.WebGLRenderer({ antialias: true })
        controls = new OrbitControls(camera, container)

        camera.position.set(4.25, 1.4, -4.5)

        controls.target.set(0, 0.5, 0)
        controls.update()

        const pmremGenerator = new THREE.PMREMGenerator(renderer)
        scene.background = new THREE.Color(0xeeeeee)
        scene.background = new THREE.Color(0xeeeeee)
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
        scene.fog = new THREE.Fog(0xeeeeee, 10, 50)

        const grid = new THREE.GridHelper(100, 40, 0x000000, 0x000000)
        ;(grid.material as THREE.Material).opacity = 0.1
        ;(grid.material as THREE.Material).depthWrite = false
        ;(grid.material as THREE.Material).transparent = true

        scene.add(grid)

        renderer.setSize(width, height)

        container.appendChild(renderer.domElement)
        addCar()
        loop()
      }

      const addCar = () => {
        const loader = new GLTFLoader()

        const darcoloader = new DRACOLoader()
        darcoloader.setDecoderPath('/node_modules/three/examples/js/libs/draco/')
        loader.setDRACOLoader(darcoloader)

        loader.load(
          '/public/models/ferrari.glb',
          (gltf) => {
            const carModel = gltf.scene
            carModel.rotation.y = -1.5
            ;(scene as THREE.Scene).add(carModel)
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
      let time: number
      let loop = () => {
        if (renderer && scene && camera) {
          time = requestAnimationFrame(loop)
          renderer.render(scene, camera)
        } else if (time) cancelAnimationFrame(time)
      }

      onMounted(() => {
        init()
      })
      onUnmounted(() => {
        cancelAnimationFrame(time)
        scene = null
        camera = null
        renderer = null
        controls = null
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
