<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAllArticles,getArticlesByType } from '@/api/api'
import { onMounted } from 'vue'
import BidsDetail from './components/BidsDetail.vue'
import { Reading, Clock, Document } from '@element-plus/icons-vue'

const router = useRouter()

// 动态数据列表
const dynamicList = ref()

const MygetAllArticles = async () => {
  const res = await getAllArticles()
  dynamicList.value = res
  // 统计不同type的数量
  const typeCount = {}
  
  // 遍历数据统计各类型数量
  res.forEach(item => {
    if (!typeCount[item.type]) {
      typeCount[item.type] = 1
    } else {
      typeCount[item.type]++
    }
  })
  
  // 更新categories
categories.value = [
    { id: 'all', name: '全部动态', count: res.length },
    ...Object.entries(typeCount).map(([type, count]) => {
      // 根据类型返回对应的id
      const getTypeId = (type) => {
        switch(type) {
          case '政策发布': return '0'
          case '工作通知': return '1'
          case '新闻资讯': return '2'
          default: return type.toLowerCase()
        }
      }
      
      return {
        id: getTypeId(type),
        name: type,
        count: count
      }
    })
  ]
}

const showDetail = ref(false)
const showData = ref()
// 分类标签
const categories = ref([
  { id: 'all', name: '全部动态', count: 0 }
])


const activeCategory = ref('all')

// 处理分类切换
const handleCategoryChange = async (categoryId) => {
  if(categoryId === 'all'){MygetAllArticles();activeCategory.value = 'all';return}
  const res = await getArticlesByType(categoryId)
  activeCategory.value = categoryId
  dynamicList.value = res
}

// 跳转到详情页
const goToDetail = (item) => {
  showDetail.value = true
  showData.value = item
  // router.push(`/bids/detail/${id}`)
}

// 获取图标类型
const getTypeIcon = (type) => {
  const iconMap = {
    policy: 'Document',
    notice: 'Bell',
    news: 'News'
  }
  return iconMap[type] || 'Document'
}

// 添加背景图片URL
const bgPattern = 'https://pic.88tph.com/87/c9/h8m8dbbfEeyEcQAWPgWqLw-0.jpg!/fw/700/watermark/url/L3BhdGgvbG9nby5wbmc/align/center/repeat/true' // 请替换为实际的背景图片URL

onMounted(() => {
  MygetAllArticles()
})
</script>

<template>
   <div>
  <div v-show="!showDetail" class=" min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <!-- 顶部装饰图案 -->
    <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 -skew-y-6 transform origin-top-left"></div>
    
    <div class="relative">
      <!-- 页面主体内容 -->
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- 页面标题区域 -->
        <div class="mb-16 text-center">
          <div class="inline-block">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              碳中和资讯平台
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              <span class="inline-flex items-center">
                <el-icon class="mr-2"><Reading /></el-icon>
                及时了解双碳平台最新动态信息
              </span>
            </p>
          </div>
        </div>

        <div class="bg-white max-w-[1300px] mx-auto dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/30 p-6 border border-black/20 dark:border-white/20">
        <!-- 分类标签区域 -->
        <div class="flex flex-wrap gap-3 mb-8 border-b border-black/20 dark:border-white/20 pb-6">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="handleCategoryChange(category.id)"
            :class="[
              'px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center shadow-sm border',
              activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-200 dark:shadow-blue-900/30 border-black/30 dark:border-white/30'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow border-black/20 dark:border-white/20'
            ]"
          >
            <el-icon class="mr-2" :size="16">
              <component :is="getTypeIcon(category.id)" />
            </el-icon>
            {{ category.name }}
            <span class="ml-2 px-2.5 py-0.5 text-xs rounded-full border" :class="[
              activeCategory === category.id
                ? 'bg-blue-700/30 text-white border-black/30 dark:border-white/30'
                : 'bg-gray-200/70 dark:bg-gray-600/70 text-gray-600 dark:text-gray-300 border-black/20 dark:border-white/20'
            ]">
              {{ category.count }}
            </span>
          </button>
        </div>

        <!-- 动态列表区域 -->
        <div class="space-y-4">
          <div
            v-for="item in dynamicList"
            :key="item.id"
            @click="goToDetail(item)"
            class="group bg-white dark:bg-gray-800 rounded-lg border border-black/20 dark:border-white/20 p-5 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1 hover:border-black/30 dark:hover:border-white/30"
          >
            <div class="flex items-start space-x-4">
              <!-- 图标 -->
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 border border-black/20 dark:border-white/20 group-hover:border-black/30 dark:group-hover:border-white/30">
                <span class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-2xl font-medium w-6 h-6 flex items-center justify-center">
                  {{ item.issuingDepartment.charAt(0) }}
                </span>
              </div>

              <!-- 标题和信息 -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                    {{ item.title }}
                  </h3>
                
                </div>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-6">
                  <span class="flex items-center">
                    <el-icon class="mr-1.5"><Clock /></el-icon>
                    {{ item.publishDate }}
                  </span>
                  <span class="flex items-center">
                    <el-icon class="mr-1.5"><Document /></el-icon>
                    {{ item.issuingDepartment }}
                  </span>
                </div>
              </div>

              <!-- 箭头图标 -->
              <!-- <div class="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 border rounded-full p-1 border-black/20 dark:border-white/20 group-hover:border-black/30 dark:group-hover:border-white/30">
                <el-icon :size="20"><ArrowRight /></el-icon>
              </div>   -->
            </div>
          </div>
        </div>
        </div>


      </div>
    </div>
  </div>
  <BidsDetail v-if="showDetail" @close="showDetail = false" :item="showData" />
  </div>
</template>

<style scoped>
/* 添加平滑滚动效果 */
html {
  scroll-behavior: smooth;
}

/* 添加卡片悬浮动画 */
.group:hover {
  transform: translateY(-2px);
}

/* 确保渐变文字在 Safari 中也能正常显示 */
.bg-clip-text {
  -webkit-background-clip: text;
}
</style>
