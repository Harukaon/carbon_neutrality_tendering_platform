<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 实时数据
const realtimeData = ref({
  totalProjects: '23,890',
  totalAmount: '1,523.6',
  carbonReduction: '856.2',
  energySaving: '35.8'
})

// 图表初始化
onMounted(() => {
  initCarbonChart()
})

const initCarbonChart = () => {
  const chartDom = document.getElementById('carbonChart')
  const myChart = echarts.init(chartDom)
  
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
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)'
      }
    },
    series: [
      {
        name: '碳排放量',
        data: [150, 230, 224, 218, 135, 147],
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
  
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#001529]">
    <!-- 首屏区域 -->
    <div class="relative min-h-screen overflow-hidden">
      <!-- 背景效果 -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-[#001529] via-[#002140] to-[#001529]"></div>
        <div class="absolute inset-0" 
             style="background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); 
                    background-size: 50px 50px;">
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="relative z-10 container mx-auto h-screen px-8">
        <div class="h-full flex items-center pt-24 -mt-32">
          <!-- 左侧内容 -->
          <div class="w-5/12 pr-16">
            <div class="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-8">
              <span class="text-blue-400 text-base font-medium tracking-wider">
                国家重点项目招标平台
              </span>
            </div>
            <h1 class="text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                双碳
              </span>
              <span class="text-white">招投标平台</span>
            </h1>
            <p class="text-lg text-gray-300 mb-10 leading-relaxed">
              深入贯彻"双碳"战略，推进能源低碳转型，助力实现"碳达峰、碳中和"目标
            </p>
            <div class="space-y-5 mb-12">
              <div class="flex items-center space-x-4 text-gray-300 group hover:text-gray-200 transition-colors duration-300 cursor-default">
                <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                <span class="text-base">打造全国领先的双碳招投标服务平台</span>
              </div>
              <div class="flex items-center space-x-4 text-gray-300 group hover:text-gray-200 transition-colors duration-300 cursor-default">
                <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                <span class="text-base">汇聚优质节能减排和清洁能源项目</span>
              </div>
              <div class="flex items-center space-x-4 text-gray-300 group hover:text-gray-200 transition-colors duration-300 cursor-default">
                <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
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
                class="px-10 h-14 text-base font-medium border-2 border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                寻找项目
              </button>
            </div>
          </div>

          <!-- 右侧数据展示 -->
          <div class="w-7/12 pl-16">
            <!-- 数据统计卡片 -->
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div v-for="(item, index) in Object.entries(realtimeData)" 
                   :key="index"
                   class="bg-[#002140] rounded-lg p-6 border border-[#003a6d] hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-lg bg-[#003a6d] flex items-center justify-center group-hover:bg-[#004a8d] transition-colors duration-300">
                    <i :class="[
                      'text-2xl transition-transform duration-300 group-hover:scale-110',
                      index === 0 ? 'el-icon-data-line text-blue-400' :
                      index === 1 ? 'el-icon-money text-green-400' :
                      index === 2 ? 'el-icon-wind-power text-yellow-400' :
                      'el-icon-lightning text-purple-400'
                    ]"></i>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {{ item[1] }}
                      <span class="text-sm text-gray-400 ml-1">
                        {{ index === 1 ? '亿元' : index === 2 ? '万吨' : index === 3 ? '%' : '' }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-400">
                      {{ 
                        index === 0 ? '累计招标项目' :
                        index === 1 ? '总投资额' :
                        index === 2 ? '碳减排量' :
                        '能源节约率'
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 图表展示 -->
            <div class="bg-[#002140] rounded-lg p-6 border border-[#003a6d] hover:border-blue-500/50 transition-all duration-300">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-medium text-white">碳排放趋势分析</h3>
                <button class="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm">
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

<style scoped>
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#carbonChart {
  background: linear-gradient(to bottom right, rgba(0,58,109,0.1), rgba(0,21,41,0.1));
  border-radius: 0.5rem;
}
</style> 