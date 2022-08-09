<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'SkyBox'
  })
</script>
<script lang="ts" setup></script>

<template>
  <div id="space" class="space">
    <div class="front">front</div>
    <div class="back">back</div>
    <div class="right">right</div>
    <div class="left">left</div>
    <div class="bottom">bottom</div>
    <div class="top">top</div>
  </div>
</template>

<style scoped></style>
