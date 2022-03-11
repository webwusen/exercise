<script lang="ts">
  import { toRefs } from 'vue'

  export default {
    setup(props: any) {
      const { list } = toRefs(props)
      return {
        list
      }
    }
  }
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <teleport to="body">
      <div style="position: fixed; top: 0; right: 0">teleport</div>
    </teleport>
  </div>
</template>

<style scoped></style>
