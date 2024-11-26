<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 导航菜单配置
const navItems = [
  { name: '首页', path: '/home' },
  { name: '动态菜单', path: '/bids' },
  { name: '数据统计', path: '/news' },

]

const router = useRouter()
const route = useRoute()
const activeIndex = ref('/')

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 主题状态
const isDark = ref(false)

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value
  // 修改 html 标签的 class
  document.documentElement.classList.toggle('dark')
  // 保存主题偏好到本地存储
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 初始化主题
const initTheme = () => {
  // 优先使用本地存储的主题设置
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  } else {
    // 如果没有保存的主题设置，则使用系统主题
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  }
}

// 在组件挂载时初始化主题
initTheme()

// 更新处理导航的方法
const handleNav = (path) => {
  router.push(path)
  isMobileMenuOpen.value = false
}

// 使用 watch 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath
  },
  { immediate: true }
)

// 在组件挂载时初始化
onMounted(() => {
  activeIndex.value = route.path
})

// 添加 Logo 点击处理方法
const handleLogoClick = () => {
  router.push('/')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 
              bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900 dark:to-gray-900/95 
              backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
    <div class="container mx-auto px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo 添加点击事件 -->
        <div 
          class="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300" 
          @click="handleLogoClick"
        >
          <img src="/vite.svg" class="h-8 w-8" alt="Logo" />
          <span class="text-xl font-bold text-gray-900 dark:text-white">双碳平台</span>
        </div>

        <!-- 导航链接 -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.path"
            @click.prevent="handleNav(item.path)"
            href="#"
            :class="[
              'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300',
              { 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600 dark:border-blue-400': activeIndex === item.path }
            ]"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- 右侧按钮组 -->
        <div class="flex items-center space-x-4">
          <!-- 主题切换按钮 -->
          <button 
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <!-- 根据主题显示不同图标 -->
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <button class="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300">
            登录
          </button>
          <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            注册
          </button>
        </div>
      </div>
    </div>
  </nav>
</template> 