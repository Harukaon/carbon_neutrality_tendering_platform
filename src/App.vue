<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<template>
  <el-container class="w-full">
    <el-header class="p-0">
      <TheNavbar />
    </el-header>
    <el-main class="p-0">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 确保容器占满宽度 */
.el-container {
  min-height: 100vh;
  width: 100vw;
}

.el-main {
  width: 100%;
  padding: 0;
}
</style>
