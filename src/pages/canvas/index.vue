<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
    <!-- <keep-alive>
      <component :is="Component" />
    </keep-alive> -->
  </router-view>
</template>
