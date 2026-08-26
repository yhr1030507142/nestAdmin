<script setup>
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { initFireworks } from '@/utils'
// onMounted(() => {
//   initFireworks('fireworksCanvas')
// })
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="bg"></div>
    <!-- <canvas class="absolute" id="fireworksCanvas"></canvas> -->
    <RouterView />
  </el-config-provider>
</template>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--MainBg) url('/static/logo.svg') no-repeat center;
  opacity: 0.5;
  filter: blur(100px);
}
</style>
