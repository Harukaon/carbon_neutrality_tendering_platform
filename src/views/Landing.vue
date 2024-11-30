<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { getProjectData, getCarbonTendency } from '@/api/api'

// 实时数据
const realtimeData = ref()

// 获取当前主题状态
const isDark = computed(() => document.documentElement.classList.contains('dark'))

const MygetProjectData = async () => {
  const res = await getProjectData()
  realtimeData.value = res
  realtimeData.value.energySaveRate = (realtimeData.value.energySaveRate * 100).toFixed(2)
  console.log(realtimeData.value)
}

const MygetCarbonTendency = async () => {
  const res = await getCarbonTendency()
  const sortedData = Object.entries(res).sort(([a], [b]) => new Date(a) - new Date(b))
  const dates = sortedData.map(([date]) => date)
  const values = sortedData.map(([, value]) => value)
  
  // 更新图表数据
  myChart.setOption({
    xAxis: {
      data: dates
    },
    series: [{
      data: values
    }]
  })
  console.log(res)
}

let myChart

// 图表初始化
const initCarbonChart = () => {
  const chartDom = document.getElementById('carbonChart')
  myChart = echarts.init(chartDom)
  
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: 10,
      right: 20,
      bottom: 20,
      left: 40,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: [], // 初始为空，稍后更新
      axisLine: {
        lineStyle: {
          color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      axisLabel: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      axisLabel: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
      }
    },
    series: [
      {
        name: '碳排放量',
        data: [], // 初始为空，稍后更新
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1890ff' },
            { offset: 1, color: '#39c8c8' }
          ])
        },
        itemStyle: {
          color: '#1890ff',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24,144,255,0.3)' },
            { offset: 1, color: 'rgba(24,144,255,0.1)' }
          ])
        }
      }
    ]
  }
  
  myChart.setOption(option)
  
  // 监听主题变化
  const observer = new MutationObserver(() => {
    const newIsDark = document.documentElement.classList.contains('dark')
    // 更新图表配置
    myChart.setOption({
      xAxis: {
        axisLine: {
          lineStyle: {
            color: newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        },
        axisLabel: {
          color: newIsDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        },
        axisLabel: {
          color: newIsDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
        }
      }
    })
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  // 清理观察器
  onUnmounted(() => {
    observer.disconnect()
  })
  
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

onMounted(() => {
  initCarbonChart()
  MygetProjectData()
  MygetCarbonTendency()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="relative min-h-screen overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 
             dark:from-blue-950 dark:via-gray-900 dark:to-blue-900/50"></div>
        
        <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-blue-50/50
             dark:from-transparent dark:via-blue-500/5 dark:to-blue-400/10"></div>
        
        <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent
             dark:from-blue-400/10 dark:via-transparent dark:to-transparent"></div>
        
        <div class="absolute inset-0 bg-dots-light dark:bg-dots-dark bg-dots opacity-60 dark:opacity-70"></div>
      </div>

      <div class="relative z-10 container mx-auto px-8 pt-[70px]">
        <div class="flex items-center">
          <div class="w-5/12 pr-16">
            <div class="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
              <span class="text-blue-600 dark:text-blue-400 text-base font-medium tracking-wider">
                国家重点项目招标平台
              </span>
            </div>
            <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                双碳
              </span>
              <span class="text-gray-800 dark:text-gray-100">招投标平台</span>
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              深入贯彻"双碳"战略，推进能源低碳转型，助力实现"碳达峰、碳中和"目标
            </p>
            <div class="space-y-5 mb-12">
              <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-300 group hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-default">
                <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors duration-300"></div>
                <span class="text-base">打造全国领先的双碳招投标服务平台</span>
              </div>
              <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-300 group hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-default">
                <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors duration-300"></div>
                <span class="text-base">汇聚优质节能减排和清洁能源项目</span>
              </div>
              <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-300 group hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-default">
                <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors duration-300"></div>
                <span class="text-base">提供专业的双碳项目咨询服务</span>
              </div>
            </div>
            <div class="flex space-x-6">
              <button 
                class="px-10 h-14 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
              >
                发布招标
              </button>
              <button 
                class="px-10 h-14 text-base font-medium border-2 border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                寻找项目
              </button>
            </div>
          </div>

          <div class="w-7/12 pl-16">
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div v-if="realtimeData" v-for="(item, index) in Object.entries(realtimeData)" 
                   :key="index"
                   class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <i :class="[
                      'text-2xl transition-transform duration-300 group-hover:scale-110',
                      index === 0 ? 'el-icon-data-line text-blue-600' :
                      index === 1 ? 'el-icon-money text-green-600' :
                      index === 2 ? 'el-icon-wind-power text-yellow-600' :
                      'el-icon-lightning text-purple-600'
                    ]"></i>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {{ item[1] }}
                      <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        {{ index === 1 ? '元' : index === 2 ? '%' : index === 3 ? '吨' : '' }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ 
                        index === 0 ? '累计招标项目' :
                        index === 1 ? '总投资额' :
                        index === 2 ? '能源节约率' :
                        '碳减排量'
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">碳排放趋势分析</h3>
                <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 text-sm">
                  查看详情 →
                </button>
              </div>
              <div id="carbonChart" class="h-[260px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>