<script lang="ts">
  import { defineComponent, onMounted } from 'vue'

  export default defineComponent({
    name: 'Drop',
    setup() {
      onMounted(() => {
        const canvas = document.getElementById('drop') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        console.log(ctx)
      })
    }
  })
</script>
<template>
  <canvas id="drop" style="display: block; width: 100%; height: 100%"></canvas>
</template>
