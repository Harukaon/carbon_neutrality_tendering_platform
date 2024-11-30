import axios from 'axios'
import { ElMessage } from 'element-plus' 

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
    config => {
      return config
    },
    error => {
      // 处理请求错误
      console.error('请求错误:', error)
      return Promise.reject(error)
    }
) 

// 响应拦截器
request.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
        // 如果 code 不是 200，显示错误信息
        ElMessage.error(res.msg || '请求失败')
        return Promise.reject(new Error(res.msg || 'Error'))
        } else {
        return res.data
        }
    },
    error => {
        // 统一错误处理
        ElMessage.error('API请求错误：' + error)
        return Promise.reject(error)
    }
)

export function getProjectData() {
    return request({
      url: '/carbonReduction/getProjectData', 
      method: 'get', 
    })
}


// 获取碳排放趋势数据
export function getCarbonTendency() {
    return request({
        url: '/carbonReduction/getCarbonTendency',
        method: 'get'
    })
}

// 获取招标动态数据
export function getAllArticles() {
    return request({
        url: '/article/getAllArticles',
        method: 'get'
    })
}

// 获取指定类型的文章列表
export const getArticlesByType = (typeId) => {
  return request({
    url: `/article/getArticlesByType/${typeId}`,
    method: 'get'
  })
}
export const getAnnouncementTitlesByCategoryWithPagination = (data) => {
  return request({
    url: `/announcementTitle/getAnnouncementTitlesByCategoryWithPagination`,
    method: 'get',
    params: {
      category: data.category||0,
      pageNum: data.pageNum || 1,
      pageSize: data.pageSize || 5
    }
  })
}
export const getAnnouncementDetailById = (id) => {
  return request({
    url: `/announcementDetail/getAnnouncementDetailById/${id}`,
    method: 'get',
  })
}

// 图表左上角数据
export const getOverviewData = () => {
  return request({
    url: `/energyData/getOverviewData`,
    method: 'get',
  })
}

// 图表左中角数据
export const getUsageData = () => {
  return request({
    url: `/energyData/getUsageData`,
    method: 'get',
  })
}
// 左下角数据
export const getAllProducts = () => {
  return request({
    url: `/product/getAllProducts`,
    method: 'get',
  })
}

// 中上数据
export const getAllMonthlyPerformances = () => {
  return request({
    url: `/monthlyPerformance/getAllMonthlyPerformances`,
    method: 'get',
  })
}
// 中下数据
export const getAllSalesPlans = () => {
  return request({
    url: `/salesPlan/getAllSalesPlans`,
    method: 'get',
  })
}

// 右上数据
export const getAllSalesStatistics = () => {
  return request({
    url: `/salesStatistics/getAllSalesStatistics`,
    method: 'get',
  })
}

// 右中数据
export const getAllSalespersons = () => {
  return request({
    url: `/salesperson/getAllSalespersons`,
    method: 'get',
  })
}
// 右下
export const getAllProductionPlans = () => {
  return request({
    url: `/productionPlan/getAllProductionPlans`,
    method: 'get',
  })
}
// API接口
export default {
    getProjectData,
    getCarbonTendency,
    getAllArticles,
    getArticlesByType,
    getAnnouncementDetailById,
    getOverviewData,
    getUsageData,
    getAllProducts,
    getAllMonthlyPerformances,
    getAllSalesPlans,
    getAllSalesStatistics,
    getAllSalespersons,
    getAllProductionPlans
} 