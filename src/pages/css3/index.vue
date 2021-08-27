<template>
  <div class="box-padding container">
    <n-button-group vertical>
      <n-button v-for="tab in tabs" :key="tab.name" @click="changeTab(tab)">
        {{ tab.label }}
      </n-button>
    </n-button-group>
    <keep-alive><component :is="active.component"></component></keep-alive>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Component, defineAsyncComponent } from 'vue'
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
