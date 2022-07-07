<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script lang="ts">
  import { NMessageProvider } from 'naive-ui'
  import { defineComponent } from 'vue'
  import cloneDeep from '@/write-function/cloneDeep'

  const date = new Date()
  const date2 = cloneDeep(date)
  console.log(date, date2)
  export default defineComponent({
    name: 'App',
    components: {
      NMessageProvider
    }
  })
</script>
