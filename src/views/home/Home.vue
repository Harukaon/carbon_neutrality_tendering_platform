<script setup>
import { ref, onMounted, nextTick } from 'vue'
import CategoryList from './components/CategoryList.vue'
import AnnouncementList from './components/AnnouncementList.vue'

const activeCategory = ref(1)

// 轮播图数据
const carouselItems = [
  {
    id: 1,
    title: '"双碳"目标下的绿色发展之路',
    desc: '到2030年，中国单位GDP二氧化碳排放将比2005年下降65%以上',
    image: 'https://treelion.com/promo/wp-content/uploads/2022/11/image-13.png'
  },
  {
    id: 2,
    title: '新能源产业发展新机遇',
    desc: '光伏、风电等清洁能源产业快速发展，助力能源结构转型',
    image: 'https://www.gzweisu.com/file/upload/202111/08/091328261.jpg'
  }
]

// 政策要点数据
const policyHighlights = [
  {
    title: '碳达峰碳中和',
    desc: '2030年前实现碳达峰，2060年前实现碳中和',
    icon: 'Aim'
  },
  {
    title: '能源转型',
    desc: '大力发展可再生能源，提高能源利用效率',
    icon: 'Lightning'
  },
  {
    title: '绿色金融',
    desc: '完善绿色金融体系，支持低碳产业发展',
    icon: 'Money'
  }
]

// 统计数据
const statistics = [
  { 
    value: '1,234', 
    label: '本月发布公告',
    trend: '+12.5%'
  },
  { 
    value: '89%', 
    label: '信息完整度',
    trend: '+2.1%'
  },
  { 
    value: '562', 
    label: '进行中项目',
    trend: '+5.8%'
  },
  { 
    value: '12.5亿', 
    label: '总投资金额',
    trend: '+8.3%'
  }
]

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}

// 添加新的动画控制
import { stagger, animate } from 'motion'

onMounted(async () => {
  // 等待下一个 DOM 更新周期
  await nextTick()
  
  // 确保元素存在后再执行动画
  const statItems = document.querySelectorAll('.stat-item')
  if (statItems.length) {
    animate(statItems, 
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, delay: stagger(0.1) }
    )
  }
  
  const policyCards = document.querySelectorAll('.policy-card')
  if (policyCards.length) {
    animate(policyCards, 
      { opacity: [0, 1], y: [40, 0] },
      { duration: 0.6, delay: stagger(0.15) }
    )
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white dark:from-gray-900 dark:to-gray-800">
    <!-- 轮播图区域 -->
    <div class="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] h-[600px] overflow-hidden">
      <el-carousel 
        height="600px" 
        :interval="5000" 
        arrow="hover" 
        indicator-position="none"
        :initial-index="0"
      >
        <el-carousel-item v-for="item in carouselItems" :key="item.id">
          <div class="relative h-full">
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <img 
              :src="item.image" 
              class="w-full h-full object-cover carousel-image" 
              :alt="item.title"
            >
            <div class="absolute inset-0 flex items-center">
              <div class="container mx-auto px-6">
                <div class="max-w-2xl space-y-6">
                  <h2 class="text-5xl font-bold text-white mb-4 leading-tight animate-fade-in">
                    {{ item.title }}
                  </h2>
                  <p class="text-xl text-gray-200 leading-relaxed animate-fade-in-delay">
                    {{ item.desc }}
                  </p>
                  <button class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full
                               transition-all duration-300 hover:scale-105 
                               shadow-lg hover:shadow-blue-500/50">
                    了解更多
                  </button>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 政策要点区域优化 -->
    <div class="container mx-auto px-6 -mt-32 relative z-10 mb-16">
      <div class="grid grid-cols-3 gap-8">
        <div 
          v-for="(policy, index) in policyHighlights" 
          :key="index"
          class="policy-card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl 
                 shadow-xl hover:shadow-2xl transition-all duration-500 
                 border border-gray-200 dark:border-gray-700 overflow-hidden group"
        >
          <div class="p-8">
            <div class="flex flex-col space-y-4">
              <div class="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 
                          dark:from-blue-900/20 dark:to-blue-800/20 
                          group-hover:from-blue-100 group-hover:to-blue-200 
                          dark:group-hover:from-blue-800/30 dark:group-hover:to-blue-700/30 
                          transition-colors duration-300 w-fit">
                <el-icon :size="32" class="text-blue-600 dark:text-blue-400">
                  <component :is="policy.icon" />
                </el-icon>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 
                           group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {{ policy.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {{ policy.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 信息公告区域优化 -->
    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-6">
        <!-- 标题和统计数据 -->
      

        <div class="flex items-center justify-between mb-12">
            <div class="flex items-center space-x-4">
              <div class="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">信息公告</h2>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              及时发布双碳相关项目招标信息
            </p>
          </div>
        <!-- 分类和列表区域优化 -->
        <div class="py-12 grid grid-cols-12 gap-8">
          
          <!-- 左侧分类 -->
          <div class="col-span-3 space-y-6">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <CategoryList 
                :active-category="activeCategory"
                @category-change="handleCategoryChange"
              />
            </div>
            
            <!-- 数据统计卡片 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4
                        border border-gray-200 dark:border-gray-700">
              <h3 class="text-base font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2
                         pb-3 border-b border-gray-200 dark:border-gray-700">
                <el-icon class="text-blue-500"><TrendCharts /></el-icon>
                <!-- <span>数据统计</span> -->
              </h3>
         
            </div>
          </div>

          <!-- 右侧列表 -->
          <div class="col-span-9">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <AnnouncementList :category-id="activeCategory" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1440px;
}

/* 移除之前的轮播图相关样式，替换为以下样式 */
.carousel-image {
  transition: transform 0.6s ease-out;
}

.carousel-image:hover {
  transform: scale(1.05);
}

/* Element Plus 轮播图过渡效果覆盖 */
:deep(.el-carousel__container) {
  .el-carousel__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }

  .el-carousel__item.is-active {
    z-index: 2;
  }

  .el-carousel__item.is-animating {
    transition: transform 0.4s ease-in-out;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

/* 添加鼠标悬停时的光晕效果 */
.policy-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.policy-card:hover::after {
  opacity: 1;
}
</style> 