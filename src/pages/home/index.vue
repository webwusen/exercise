<template>
  <n-menu
    class="menu"
    :value="currentMenut"
    :options="routesList"
    :default-expanded-keys="defaultExpandedKeys"
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
  import { baseRoutes } from '@/router'
  import { formatMenuData } from '@/utils'
  import type { menuItem } from '@/utils'

  export default defineComponent({
    name: 'Home',
    components: {
      NMenu
    },
    setup() {
      const hashPath = location.hash.slice(1)
      const currentMenut = ref(hashPath)
      const localPathList = hashPath.split('/')
      const localPath = '/' + localPathList[1]
      const defaultExpandedKeys = reactive([localPath])

      const routesList = formatMenuData(baseRoutes || [])

      const router = useRouter()
      const handleUpdateValue: any = (key: string, item: menuItem) => {
        currentMenut.value = key
        router.push(item.path)
      }

      return {
        currentMenut,
        defaultExpandedKeys,
        routesList,
        handleUpdateValue
      }
    }
  })
</script>
