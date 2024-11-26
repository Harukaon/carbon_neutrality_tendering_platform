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
            :to="`/announcement/${item.id}`"
            class="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium truncate"
          >
            {{ item.title }}
          </router-link>
        </div>

        <!-- 发布单位 -->
        <div class="col-span-2 flex items-center">
          <span class="text-gray-600 dark:text-gray-400 truncate">{{ item.company }}</span>
        </div>

        <!-- 发布时间 -->
        <div class="col-span-2 flex items-center">
          <span class="text-gray-600 dark:text-gray-400">{{ item.date }}</span>
        </div>

        <!-- 项目金额 -->
        <div class="col-span-2 flex items-center">
          <span class="text-blue-600 dark:text-blue-400 font-medium">{{ item.amount }}</span>
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

// 每次加载的数量
const ITEMS_PER_LOAD = 5

// 当前显示的数量
const displayCount = ref(ITEMS_PER_LOAD)

// 模拟数据
const announcements = [
  {
    id: 1,
    title: '某市光伏发电项目招标公告',
    company: '某新能源科技有限公司',
    date: '2024-03-20 14:30',
    amount: '1.2亿元',
    status: '进行中'
  },
  {
    id: 2,
    title: '工业园区节能改造项目中标结果公示',
    company: '某工业科技集团',
    date: '2024-03-19 16:45',
    amount: '3.5亿元',
    status: '已结束'
  },
  {
    id: 3,
    title: '新能源汽车充电桩建设项目招标公告',
    company: '城市发展集团',
    date: '2024-03-19 10:30',
    amount: '2.8亿元',
    status: '进行中'
  },
  {
    id: 4,
    title: '大型风电场建设项目招标公告',
    company: '风能开发有限公司',
    date: '2024-03-18 15:20',
    amount: '5.6亿元',
    status: '进行中'
  },
  {
    id: 5,
    title: '工业废热回收利用项目中标公示',
    company: '节能环保科技公司',
    date: '2024-03-18 09:15',
    amount: '0.8亿元',
    status: '已结束'
  },
  {
    id: 6,
    title: '绿色建筑节能技术改造项目招标',
    company: '建筑节能研究院',
    date: '2024-03-17 16:20',
    amount: '2.3亿元',
    status: '进行中'
  },
  {
    id: 7,
    title: '智慧能源管理系统建设项目',
    company: '智慧能源科技公司',
    date: '2024-03-17 11:30',
    amount: '1.5亿元',
    status: '进行中'
  },
  {
    id: 8,
    title: '垃圾发电厂设备采购招标公告',
    company: '城市环保集团',
    date: '2024-03-16 14:45',
    amount: '4.2亿元',
    status: '进行中'
  },
  {
    id: 9,
    title: '海上风电场运维服务项目中标公示',
    company: '海洋能源集团',
    date: '2024-03-16 09:30',
    amount: '1.8亿元',
    status: '已结束'
  },
  {
    id: 10,
    title: '工业节能技术服务项目招标',
    company: '节能服务有限公司',
    date: '2024-03-15 15:40',
    amount: '0.9亿元',
    status: '进行中'
  },
  {
    id: 11,
    title: '储能电站建设项目招标公告',
    company: '新能源投资集团',
    date: '2024-03-15 10:20',
    amount: '3.7亿元',
    status: '进行中'
  },
  {
    id: 12,
    title: '碳排放监测系统采购项目',
    company: '环境监测中心',
    date: '2024-03-14 16:15',
    amount: '0.6亿元',
    status: '已结束'
  },
  {
    id: 13,
    title: '氢能源示范项目设备采购',
    company: '氢能科技有限公司',
    date: '2024-03-14 11:25',
    amount: '2.9亿元',
    status: '进行中'
  },
  {
    id: 14,
    title: '生物质能发电项目EPC总承包',
    company: '生物能源集团',
    date: '2024-03-13 14:50',
    amount: '6.4亿元',
    status: '进行中'
  },
  {
    id: 15,
    title: '园区能源管理中心项目中标公示',
    company: '产业园区管理处',
    date: '2024-03-13 09:40',
    amount: '1.1亿元',
    status: '已结束'
  }
]

// 计算当前显示的公告列表
const displayedAnnouncements = computed(() => {
  return announcements.slice(0, displayCount.value)
})

// 是否还有更多项目可以加载
const hasMoreItems = computed(() => {
  return displayCount.value < announcements.length
})

// 加载更多
const loadMore = () => {
  displayCount.value += ITEMS_PER_LOAD
}
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