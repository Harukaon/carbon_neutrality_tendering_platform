<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const bidId = route.params.id

// 模拟动态详情数据
const detail = ref({
  id: bidId,
  title: '关于推进工业领域碳达峰实施方案的通知',
  content: `为深入贯彻落实党中央、国务院关于碳达峰碳中和的重大战略决策部署，扎实推进工业领域碳达峰工作，现就有关事项通知如下：

一、总体要求
（一）指导思想
以习近平新时代中国特色社会主义思想为指导，全面贯彻党的二十大精神，深入贯彻习近平生态文明思想...

二、主要目标
到2025年，规模以上工业单位增加值能耗比2020年下降13.5%，单位工业增加值二氧化碳排放下降幅度大于全社会下降幅度...`,
  publishTime: '2024-03-20 14:30:00',
  department: '国家发展改革委',
  type: 'policy'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[70px]">
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-3xl mx-auto">
        <!-- 返回按钮 -->
        <button 
          @click="$router.back()"
          class="mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <el-icon><ArrowLeft /></el-icon>
          <span>返回列表</span>
        </button>

        <!-- 详情内容 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ detail.title }}
          </h1>
          
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <span>{{ detail.department }}</span>
            <span>{{ detail.publishTime }}</span>
          </div>

          <div class="prose prose-blue dark:prose-invert max-w-none">
            <div class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {{ detail.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>