<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script lang="ts">
  import { NMessageProvider } from 'naive-ui'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'App',
    components: {
      NMessageProvider
    }
  })
</script>
