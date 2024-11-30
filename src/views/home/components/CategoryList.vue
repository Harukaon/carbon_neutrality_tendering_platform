<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  activeCategory: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['category-change'])

const categories = [
  { 
    id: 1, 
    name: '招标公告',
    count: 156,
    desc: '最新招标项目信息'
  },
  { 
    id: 2, 
    name: '中标公示',
    count: 89,
    desc: '项目中标结果公示'
  },
  { 
    id: 3, 
    name: '采购公告',
    count: 234,
    desc: '政府及企业采购信息'
  },
]

const isExpanded = ref(false)
const defaultShowCount = 3

// 计算当前应该显示的分类
const displayCategories = computed(() => {
  return isExpanded.value ? categories : categories.slice(0, defaultShowCount)
})

// 切换展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 添加图标映射函数
const getCategoryIcon = (id) => {
  const iconMap = {
    1: 'Document',
    2: 'Trophy',
    3: 'ShoppingCart',
    4: 'Promotion'
  }
  return iconMap[id] || 'Document'
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
    <!-- 标题区域增加图标和样式 -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
      <el-icon class="text-blue-500"><Grid /></el-icon>
      <h2 class="text-base font-medium text-gray-900 dark:text-white">信息分类</h2>
    </div>
    
    <div class="py-2">
      <div
        v-for="category in displayCategories"
        :key="category.id"
        @click="$emit('category-change', category.id)"
        class="relative group"
      >
        <div :class="[
          'px-4 py-3 cursor-pointer transition-all duration-300',
          activeCategory === category.id
            ? 'bg-blue-50 dark:bg-blue-900/20 border-l-[3px] border-blue-500'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-l-[3px] border-transparent'
        ]">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <!-- 添加图标 -->
                <el-icon :class="[
                  'text-lg',
                  activeCategory === category.id
                    ? 'text-blue-500'
                    : 'text-gray-400 group-hover:text-blue-500'
                ]">
                  <component :is="getCategoryIcon(category.id)" />
                </el-icon>
                <div :class="[
                  'text-sm font-medium',
                  activeCategory === category.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                ]">
                  {{ category.name }}
                </div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                {{ category.desc }}
              </div>
            </div>
            <!-- 数量标签改造 -->
            <!-- <div :class="[
              'px-2 py-1 rounded-full text-xs',
              activeCategory === category.id
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            ]">
              {{ category.count }}
            </div> -->
          </div>
        </div>
      </div>

      <!-- 查看更多按钮优化 -->
      <div 
        v-if="categories.length > defaultShowCount"
        class="p-3 border-t border-gray-200 dark:border-gray-700"
      >
        <button
          @click="toggleExpand"
          class="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700/50 
                 text-sm text-blue-600 dark:text-blue-400 
                 hover:bg-blue-50 dark:hover:bg-blue-900/20 
                 transition-all duration-300
                 flex items-center justify-center space-x-1"
        >
          <span>{{ isExpanded ? '收起分类' : '查看更多分类' }}</span>
          <el-icon :class="{ 'transform rotate-180 transition-transform duration-300': isExpanded }">
            <ArrowDown />
          </el-icon>
        </button>
      </div>
    </div>
  </div>
</template> 