<template>
<el-scrollbar>
    <div class="h-full">
      <el-row :gutter="20" style="margin: 0;">
        <el-col :span="8" class="mt-4">
          <!-- 第一列卡片 -->
          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[29vh] bgMy">
              <ConsumptionSum class="h-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>

          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[29vh] bgMy">
              <EnergyConsumptionRatio class="h-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>

          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[28vh] bgMy">
              <InventoryWarning class="h-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>
        </el-col>

        <el-col :span="8" class="mt-4">
          <!-- 第二列卡片 -->
          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[45vh] bgMy">
              <DataOverview class="h-full w-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>

          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[43vh] bgMy">
              <SalesPlanning class="h-full w-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>
        </el-col>

        <el-col :span="8" class="mt-4">
          <!-- 第三列卡片 -->
          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[29vh] bgMy">
              <SalesStatistics class="h-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>

          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[29vh] bgMy">
              <SalesRank class="h-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>

          <div class="card-container">
            <div class="card-header">
              <div class="header-left"></div>
              <div class="header-right"></div>
            </div>
            <el-scrollbar class="h-[28vh] bgMy">
              <ProductionFigures class="h-full" />
            </el-scrollbar>
            <div class="card-footer">
              <div class="footer-left"></div>
              <div class="footer-right"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script setup>
import ConsumptionSum from './components/consumptionSum.vue'
import EnergyConsumptionRatio from './components/EnergyConsumptionRatio.vue'
import InventoryWarning from './components/InventoryWarning.vue'
import DataOverview from './components/DataOverview.vue'
import SalesPlanning from './components/SalesPlanning.vue'
import SalesStatistics from './components/SalesStatistics.vue'
import SalesRank from './components/SalesRank.vue'
import ProductionFigures from './components/ProductionFigures.vue'
import { ElScrollbar } from 'element-plus'

</script>

<style scoped>  
.bgMy {
  @apply bg-[rgba(245,247,255,0.84)] dark:bg-[rgba(30,32,47,0.95)] 
         relative
         border border-[rgba(58,77,233,0.2)] dark:border-[rgba(58,77,233,0.3)]
         border-solid;
  /* 移除圆角，改用直角设计 */
  border-radius: 0;
}

/* 卡片容器 */
.card-container {
  position: relative;
  padding: 2px;
  margin-bottom: 8px;
}

/* 边角装饰 */
.card-header, .card-footer {
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(58, 77, 233, 0.3) 50%,
    transparent 100%
  );
}

.card-header { top: 0; }
.card-footer { bottom: 0; }

/* 左上角和右上角装饰 */
.header-left, .header-right {
  position: absolute;
  width: 20px;
  height: 20px;
  border-style: solid;
  border-color: #3a4de9;
  border-width: 2px 0 0 2px;
  top: -2px;
}

.header-left {
  left: -2px;
}

.header-right {
  right: -2px;
  transform: rotate(90deg);
}

/* 左下角和右下角装饰 */
.footer-left, .footer-right {
  position: absolute;
  width: 20px;
  height: 20px;
  border-style: solid;
  border-color: #3a4de9;
  border-width: 0 0 2px 2px;
  bottom: -2px;
}

.footer-left {
  left: -2px;
}

.footer-right {
  right: -2px;
  transform: rotate(-90deg); 
}

/* 发光动画效果 */
@keyframes borderGlow {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
}

.header-left, .header-right,
.footer-left, .footer-right {
  animation: borderGlow 2s ease-in-out infinite;
}

/* 添加科技感线条 */
.card-container::before,
.card-container::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent,
    rgba(58, 77, 233, 0.8),
    transparent
  );
}

.card-container::before {
  top: 10px;
  right: 0;
}

.card-container::after {
  bottom: 10px;
  left: 0;
}
</style>
