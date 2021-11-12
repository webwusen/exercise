<template>
  <div>
    <ul>
      <li v-for="(item, index) in newList" :key="index">{{ item }}</li>
    </ul>
    <teleport to="body">
      <div style="position: fixed; top: 0; right: 0">teleport</div>
    </teleport>
  </div>
</template>

<script lang="ts">
  import { toRefs } from 'vue'
  export default {
    props: {
      list: Array
    },
    setup(props) {
      console.log(props)
      const { list } = toRefs(props)
      return {
        newList: list
      }
    }
  }
</script>

<style scoped></style>
