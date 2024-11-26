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
以习近平新时代中国特色社会主义思想为指导，全面贯彻党的二十大精神，深入贯彻习近平生态文明思想，立足新发展阶段，完整、准确、全面贯彻新发展理念，构建新发展格局，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以改革创新为根本动力，以满足人民日益增长的美好生活需要为根本目的，坚持节约优先、效率优先、循环优先，把碳达峰、碳中和纳入经济社会发展全局，推动经济社会发展全面绿色转型。

（二）基本原则
1. 系统推进，重点突破。坚持全国统筹、节能优先，处理好发展和减排、整体和局部、短期和中长期的关系。
2. 创新引领，技术支撑。发挥科技创新的支撑引领作用，加快低碳零碳负碳技术研发和推广应用。
3. 政府引导，市场驱动。更好发挥政府作用，充分发挥市场机制作用，形成有效激励约束机制。

二、主要目标
到2025年，规模以上工业单位增加值能耗比2020年下降13.5%，单位工业增加值二氧化碳排放下降幅度大于全社会下降幅度，重点行业能源利用效率达到国际先进水平。

到2030年，工业领域二氧化碳排放达到峰值，重点行业碳排放强度实现大幅下降，绿色低碳发展能力显著提升，为实现碳中和奠定坚实基础。

三、重点任务
（一）推动产业结构优化升级
1. 严格控制高耗能高排放项目盲目发展
2. 大力发展绿色低碳产业
3. 加快传统产业绿色化改造

（二）加快工业节能降碳
1. 实施节能降碳改造工程
2. 推广先进节能技术
3. 提升能源资源利用效率

（三）加强技术创新和推广应用
1. 开展低碳零碳负碳技术攻关
2. 加快先进适用技术推广应用
3. 建设低碳技术创新平台`,
  publishTime: '2024-03-20 14:30:00',
  department: '国家发展改革委',
  type: 'policy',
  fileNo: '发改产业〔2024〕123号',
  importance: '重要',
  attachments: [
    { name: '工业领域碳达峰实施方案.pdf', size: '2.5MB' },
    { name: '相关政策解读.docx', size: '1.2MB' }
  ]
})
</script>

<template>
  <div class="bg-white max-w-[1200px] mx-auto pt-[30px]">
    <div class="w-full px-8 py-4">
      <!-- 返回按钮 -->
      <button 
        @click="$router.back()"
        class="group mb-4 flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 border-b border-gray-200"
      >
        <el-icon class="transition-transform duration-300 group-hover:-translate-x-1"><ArrowLeft /></el-icon>
        <span>返回列表</span>
      </button>

      <!-- 详情内容 -->
      <div class="bg-white border-t border-gray-900">
        <!-- 文档头部信息 -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4 mt-6">
            <span class="text-blue-600">
              {{ detail.type === 'policy' ? '政策文件' : '通知公告' }}
            </span>
            <span class="text-red-600">
              {{ detail.importance }}
            </span>
          </div>
          
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ detail.title }}
          </h1>
          
          <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-900">
            <div class="flex items-center">
              <el-icon class="mr-2"><Document /></el-icon>
              <span>文号：{{ detail.fileNo }}</span>
            </div>
            <div class="flex items-center">
              <el-icon class="mr-2"><OfficeBuilding /></el-icon>
              <span>发布部门：{{ detail.department }}</span>
            </div>
            <div class="flex items-center">
              <el-icon class="mr-2"><Clock /></el-icon>
              <span>发布时间：{{ detail.publishTime }}</span>
            </div>
          </div>
        </div>

        <!-- 文档正文 -->
        <div class="prose max-w-none">
          <div class="text-gray-600 leading-relaxed text-left">
            {{ detail.content }}
          </div>
        </div>

        <!-- 附件列表 -->
        <div class="mt-8 pt-6 border-t border-gray-900">
          <h3 class="text-lg font-medium text-gray-900 mb-4">附件列表</h3>
          <div class="space-y-3">
            <div 
              v-for="(file, index) in detail.attachments" 
              :key="index"
              class="flex items-center justify-between p-3 border-b border-gray-200"
            >
              <div class="flex items-center space-x-3">
                <el-icon class="text-blue-600"><Document /></el-icon>
                <span class="text-gray-700">{{ file.name }}</span>
                <span class="text-sm text-gray-500">({{ file.size }})</span>
              </div>
              <button class="text-blue-600 hover:text-blue-700">
                下载
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>