<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 导航菜单配置
const navItems = [
  { name: '首页', path: '/' },
  { name: '招标信息', path: '/bids' },
  { name: '双碳资讯', path: '/news' },
  { name: '政策法规', path: '/policies' },
  { name: '关于我们', path: '/about' }
]

const router = useRouter()
const activeIndex = ref('/')

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 处理导航
const handleNav = (path) => {
  activeIndex.value = path
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="bg-[#001529]/95 backdrop-blur-md border-b border-[#003a6d]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              双碳招投标网
            </span>
          </div>

          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-4">
              <template v-for="item in navItems" :key="item.path">
                <router-link
                  :to="item.path"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300',
                    activeIndex === item.path
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-300'
                  ]"
                  @click="activeIndex = item.path"
                >
                  {{ item.name }}
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template> 