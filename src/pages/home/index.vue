<template>
  <n-menu
    class="menu"
    :value="currentMenut"
    :options="routesList"
    @update:value="handleUpdateValue"
  ></n-menu>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { NMenu } from 'naive-ui'
  import { routes } from '@/router'
  import { formatMenuData, menuItem } from '@/utils'

  export default defineComponent({
    name: 'Home',
    components: {
      NMenu
    },
    setup() {
      const currentMenut = ref(location.pathname)

      const routesList: menuItem[] = reactive(formatMenuData(routes[0].children || []))
      const router = useRouter()
      const handleUpdateValue = (key: string, item: menuItem): void => {
        currentMenut.value = key
        router.push(item.path)
      }

      return {
        currentMenut,
        routesList,
        handleUpdateValue
      }
    }
  })
</script>
