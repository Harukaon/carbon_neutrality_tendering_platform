<template>
  <div class="announcement-list">
    <!-- 表头 -->
    <div class="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="col-span-5 text-gray-600 dark:text-gray-400 font-medium">公告标题</div>
      <div class="col-span-2 text-gray-600 dark:text-gray-400 font-medium">发布单位</div>
      <div class="col-span-2 text-gray-600 dark:text-gray-400 font-medium">发布时间</div>
      <div class="col-span-2 text-gray-600 dark:text-gray-400 font-medium">项目金额</div>
      <div class="col-span-1 text-gray-600 dark:text-gray-400 font-medium text-right">状态</div>
    </div>

    <!-- 列表内容 -->
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <div 
        v-for="item in displayedAnnouncements" 
        :key="item.id"
        class="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
      >
        <!-- 标题 -->
        <div class="col-span-5 flex items-center">
          <router-link 
            :to="`/announcementdetail/${item.id}`"
            class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium truncate"
          >
            {{ maskText(item.title) }}
          </router-link>
        </div>

        <!-- 发布单位 -->
        <div class="col-span-2 flex items-center">
          <span class="text-gray-600 dark:text-gray-400 truncate">{{ maskText(item.publishingUnit) }}</span>
        </div>

        <!-- 发布时间 -->
        <div class="col-span-2 flex items-center">
          <span class="text-gray-600 dark:text-gray-400">{{ formatDate(item.publishDate) }}</span>
        </div>

        <!-- 项目金额 -->
        <div class="col-span-2 flex items-center">
          <span class="text-blue-600 dark:text-blue-400 font-medium">{{ item.projectAmount }}</span>
        </div>

        <!-- 状态 -->
        <div class="col-span-1 flex items-center justify-end">
          <span 
            :class="[
              'px-2 py-1 text-xs rounded-full',
              item.status === '进行中' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            {{ item.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- 查看更多按钮 -->
    <div class="flex justify-center px-6 py-6 border-t border-gray-200 dark:border-gray-700">
      <button 
        v-if="hasMoreItems"
        @click="loadMore"
        class="group flex items-center space-x-2 px-6 py-2.5 bg-white dark:bg-gray-800 
               border border-gray-300 dark:border-gray-600 rounded-full
               hover:border-blue-500 dark:hover:border-blue-400
               transition-colors duration-300"
      >
        <span class="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          查看更多
        </span>
        <el-icon class="text-gray-400 group-hover:text-blue-500">
          <ArrowDown />
        </el-icon>
      </button>
      <div 
        v-else 
        class="text-gray-500 dark:text-gray-400"
      >
        已显示全部内容
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { getAnnouncementTitlesByCategoryWithPagination } from '@/api/api'
import { onMounted } from 'vue'
import dayjs from 'dayjs' // 添加 dayjs 导入
import { watch } from 'vue'
import maskText from '@/utils/mask'
// 每次加载的数量
const ITEMS_PER_LOAD = 5

// 当前显示的数量
const displayCount = ref(ITEMS_PER_LOAD)
const pageNum = ref(1)
const pageSize = ref(5)
const props = defineProps({
  categoryId: {
    type: Number,
    required: true, // 设置为必传属性
    default: 0 // 默认值为1
  }
})

const announcements = ref([])
const hasMore = ref(true)

const updateAnnouncements = async (categoryId) => {
  const res = await getAnnouncementTitlesByCategoryWithPagination({
    category: categoryId - 1,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  });
  if (res.length < pageSize.value) {
    hasMore.value = false;
  }
  announcements.value = res;
}

// 计算当前显示的公告列表
const displayedAnnouncements = computed(() => {
  return announcements.value
})

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
// 是否还有更多项目可以加载
const hasMoreItems = computed(() => {
  return hasMore.value
})
watch(()=>announcements.value,(newVal)=>{
  console.log(newVal.length)
})
// 加载更多
const loadMore = async () => {
  const oldLength = announcements.value.length
  pageSize.value += ITEMS_PER_LOAD
  await updateAnnouncements(props.categoryId)
  
  if (announcements.value.length === oldLength) {
    hasMore.value = false
  }
}
watch(()=>props.categoryId,(newVal)=>{
  updateAnnouncements(newVal)
})
onMounted(()=>{
  updateAnnouncements(props.categoryId)

})
</script>

<style scoped>
/* 添加过渡动画 */
.announcement-list {
  position: relative;
}

/* 按钮悬停动画 */
button:hover .el-icon {
  transform: translateY(2px);
  transition: transform 0.3s ease;
}
</style> 