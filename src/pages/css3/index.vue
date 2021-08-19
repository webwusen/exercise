<template>
  <div class="box-padding">
    <n-button-group>
      <n-button v-for="tab in tabs" :key="tab.name" @click="changeTab(tab)">
        {{ tab.label }}
      </n-button>
    </n-button-group>
    <component :is="active.component"></component>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    Component,
    defineAsyncComponent,
    getCurrentInstance
  } from 'vue'
  import { NButtonGroup, NButton } from 'naive-ui'

  export default defineComponent({
    name: 'Css3',
    components: {
      NButtonGroup,
      NButton
    },
    setup() {
      interface tabItem {
        name: string
        label: string
        component: Component
      }

      const tabs: tabItem[] = [
        {
          name: 'SkyBox',
          label: '天空盒子',
          component: defineAsyncComponent(() => import('./components/skyBox.vue'))
        }
      ]

      let active: tabItem = tabs[0]

      const changeTab = (tab: tabItem): void => {
        active = tab
      }
      
      return {
        tabs,
        active,
        changeTab
      }
    }
  })
</script>
