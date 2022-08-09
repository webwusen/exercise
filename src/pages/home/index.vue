<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { NMenu } from 'naive-ui'
  import { baseRoutes } from '@/router'
  import { formatMenuData } from '@/utils/formatMenuData'
  import type { menuItem } from '@/utils/formatMenuData'

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
<template>
  <n-menu
    class="w-80 h-full border-r border-gray-300"
    :value="currentMenut"
    :options="routesList"
    :default-expanded-keys="defaultExpandedKeys"
    @update:value="handleUpdateValue"
  ></n-menu>
  <div class="flex-1 overflow-x-hidden overflow-y-auto">
    <router-view></router-view>
  </div>
</template>
