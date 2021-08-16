<template>
  <th-navigation></th-navigation>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import ThNavigation from "./components/thNav.vue";
</script>

<style lang="scss">
.el-pagination {
  margin: auto;
  text-align: center;
}
</style>
