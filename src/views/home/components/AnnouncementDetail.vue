<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {getAnnouncementDetailById} from '@/api/api'
const route = useRoute()
const announcementDetailId = route.params.id
const getAnnouncementDetail = async () => {
  const res = await getAnnouncementDetailById(announcementDetailId)
  detail.value = res
}
onMounted(() => {
  getAnnouncementDetail()
})
const detail = ref()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 max-w-[1200px] mx-auto pt-[30px]">
    <div class="w-full px-8 py-4">
      <!-- 返回按钮 -->
      <button 
        @click="$router.back()"
        class="group mb-4 flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-200 dark:border-gray-700"
      >
        <el-icon class="transition-transform duration-300 group-hover:-translate-x-1"><ArrowLeft /></el-icon>
        <span>返回列表</span>
      </button>

      <!-- 详情内容 -->
      <div v-if="detail" class="bg-white dark:bg-gray-800 border-t border-gray-900 dark:border-gray-700">
        <!-- 文档头部信息 -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4 mt-6">
            <span class="text-blue-600 dark:text-blue-400">
              公告
            </span>
            <!-- <span class="text-blue-600 dark:text-blue-400">
              预算金额：{{ detail.budget }}
            </span> -->
          </div>
          
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {{ detail.title }}
          </h1>
          
          <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-900 dark:border-gray-700">
            <div class="flex items-center">
              <el-icon class="mr-2"><Document /></el-icon>
              <span>项目编号：{{ detail.projectNumber }}</span>
            </div>
            <div class="flex items-center">
              <el-icon class="mr-2"><OfficeBuilding /></el-icon>
              <span>招标单位：{{ detail.tenderUnit }}</span>
            </div>
            <!-- <div class="flex items-center">
              <el-icon class="mr-2"><Clock /></el-icon>
              <span>发布时间：{{ detail.publishTime }}</span>
            </div> -->
          </div>
        </div>

        <!-- 文档正文 -->
        <div class="prose dark:prose-invert max-w-none">
          <div class="text-gray-600 dark:text-gray-300 leading-relaxed text-left whitespace-pre-line">
            {{ detail.content }}
          </div>
        </div>

        <!-- 附件列表 -->
        <div class="mt-8 pt-6 border-t border-gray-900 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">附件列表</h3>
          <div class="space-y-3">
            <div 
              v-for="(file, index) in detail.attachments" 
              :key="index"
              class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center space-x-3">
                <el-icon class="text-blue-600 dark:text-blue-400"><Document /></el-icon>
                <span class="text-gray-700 dark:text-gray-300">{{ file.name }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">({{ file.size }})</span>
              </div>
              <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                下载
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>