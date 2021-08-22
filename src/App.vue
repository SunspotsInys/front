<template>
  <th-navigation></th-navigation>
  <router-view></router-view>
  <div class="web-info">
    Copyright ©
    <template v-if="new Date().getFullYear() === 2021">2021</template>
    <template v-else>2021-{{ new Date().getFullYear() }}</template>. All rights reserved.
    <br />Powered By
    <a href="https://github.com/SunspotsInys">SunspotsInys</a>.
  </div>
</template>

<script lang="ts" setup>
import ThNavigation from "./components/thNav.vue";
</script>

<style lang="scss">
.el-pagination {
  margin: auto;
  text-align: center;
}
.web-info {
  padding-bottom: 80px;
  text-align: center;
}
</style>
