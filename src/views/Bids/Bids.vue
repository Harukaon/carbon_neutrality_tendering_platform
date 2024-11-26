<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 动态数据列表
const dynamicList = ref([
  {
    id: 1,
    title: '关于推进工业领域碳达峰实施方案的通知',
    type: 'policy', // 政策通知
    publishTime: '2024-03-20 14:30',
    department: '国家发展改革委',
    status: 'new'
  },
  {
    id: 2,
    title: '2024年光伏发电项目建设工作方案',
    type: 'notice', // 工作通知
    publishTime: '2024-03-19 10:15',
    department: '国家能源局',
    status: 'normal'
  },
  {
    id: 3,
    title: '碳排放权交易管理办法（试行）解读',
    type: 'policy', // 政策通知
    publishTime: '2024-03-18 09:00',
    department: '生态环境部',
    status: 'normal'
  },
  {
    id: 4,
    title: '2024年可再生能源发展监测评价报告',
    type: 'news', // 新闻资讯
    publishTime: '2024-03-17 16:45',
    department: '国家能源局',
    status: 'normal'
  },
  {
    id: 5,
    title: '关于加快推进工业绿色低碳转型的指导意见',
    type: 'policy', // 政策通知
    publishTime: '2024-03-16 11:20',
    department: '工业和信息化部',
    status: 'new'
  },
  {
    id: 6,
    title: '碳达峰碳中和科技创新行动计划发布',
    type: 'news', // 新闻资讯
    publishTime: '2024-03-15 15:30',
    department: '科技部',
    status: 'normal'
  },
  {
    id: 7,
    title: '关于开展碳普惠机制试点工作的通知',
    type: 'notice', // 工作通知
    publishTime: '2024-03-14 13:40',
    department: '国家发展改革委',
    status: 'normal'
  },
  {
    id: 8,
    title: '2024年全国碳市场交易工作要点',
    type: 'policy', // 政策通知
    publishTime: '2024-03-13 10:00',
    department: '生态环境部',
    status: 'new'
  }
])

// 分类标签
const categories = ref([
  { id: 'all', name: '全部动态', count: 125 },
  { id: 'policy', name: '政策发布', count: 45 },
  { id: 'notice', name: '工作通知', count: 38 },
  { id: 'news', name: '新闻资讯', count: 42 }
])

const activeCategory = ref('all')

// 处理分类切换
const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}

// 跳转到详情页
const goToDetail = (id) => {
  router.push(`/bids/detail/${id}`)
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
</script>

<template>
  <div class=" min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
            @click="goToDetail(item.id)"
            class="group bg-white dark:bg-gray-800 rounded-lg border border-black/20 dark:border-white/20 p-5 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1 hover:border-black/30 dark:hover:border-white/30"
          >
            <div class="flex items-start space-x-4">
              <!-- 图标 -->
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 border border-black/20 dark:border-white/20 group-hover:border-black/30 dark:group-hover:border-white/30">
                <el-icon :size="24" class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  <component :is="getTypeIcon(item.type)" />
                </el-icon>
              </div>

              <!-- 标题和信息 -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                    {{ item.title }}
                  </h3>
                  <span
                    v-if="item.status === 'new'"
                    class="flex-shrink-0 ml-2 px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full border border-black/30 dark:border-white/30"
                  >
                    NEW
                  </span>
                </div>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-6">
                  <span class="flex items-center">
                    <el-icon class="mr-1.5"><Clock /></el-icon>
                    {{ item.publishTime }}
                  </span>
                  <span class="flex items-center">
                    <el-icon class="mr-1.5"><Document /></el-icon>
                    {{ item.department }}
                  </span>
                </div>
              </div>

              <!-- 箭头图标 -->
              <div class="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 border rounded-full p-1 border-black/20 dark:border-white/20 group-hover:border-black/30 dark:group-hover:border-white/30">
                <el-icon :size="20"><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
        </div>
        </div>


      </div>
    </div>
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
