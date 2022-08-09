<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import Chart from './chart/index'

  export default defineComponent({
    name: 'Drop',
    setup() {
      onMounted(() => {
        const canvas = document.getElementById('drop') as HTMLElement
        const chart = new Chart(canvas)
        chart.init()
        chart.setOption({
          type: 'bar',
          data: [
            {
              value: 50,
              label: 'cs1'
            },
            {
              value: 100,
              label: 'cs2'
            }
          ]
        })
      })
    }
  })
</script>
<template>
  <div id="drop"></div>
</template>
<style lang="scss" scoped>
  #drop {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
