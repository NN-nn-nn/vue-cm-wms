<template>
  <!-- 页面主容器 -->
  <div class="page-container inventory-icon myEcharts">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item" />
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-row :gutter="12">
        <el-col v-for="(item, index) in cardList" :key="index" :offset="index > 0 ? 2 : 0" :span="6" style="margin: 0 0px 20px 0">
          <el-card shadow="hover" :body-style="{ padding: '0px'}">
            <div class="inventory-top">
              <svg-icon :icon-class="item.icon" />{{ item.name }}
            </div>
            <div class="inventory-bottom">
              <span class="amount">{{ item.amount }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
export default {
  name: 'ReportManagementInventory',
  data() {
    return {
      cardList: [
        { name: '库存总额', icon: 'inventory', amount: 100, unit: '万元' },
        { name: '当月采购总额', icon: 'monthPurchase', amount: 100, unit: '万元' },
        { name: '年度采购总额', icon: 'yearPurchase', amount: 100, unit: '万元' },
        { name: '月出库总额', icon: 'out', amount: 100, unit: '万元' },
        { name: '钢板实时库存', icon: 'steelPlates', amount: 100, unit: '万元' },
        { name: '型钢实时库存', icon: 'steels', amount: 100, unit: '万元' },
        { name: '彩卷/带钢实时库存', icon: 'stripSteel', amount: 100, unit: '万元' },
        { name: '成品围护实时库存', icon: 'finishProduct', amount: 100, unit: '万元' },
        { name: '劳保用品实时库存', icon: 'labor', amount: 100, unit: '万元' },
        { name: '焊接材料实时库存', icon: 'welding', amount: 100, unit: '万元' },
        { name: '紧固件实时库存', icon: 'fastener', amount: 100, unit: '万元' },
        { name: '工机具实时库存', icon: 'machineTool', amount: 100, unit: '万元' },
        { name: '设备配件实时库存', icon: 'device', amount: 100, unit: '万元' },
        { name: '生产耗材实时库存', icon: 'produce', amount: 100, unit: '万元' },
        { name: '电气线缆实时库存', icon: 'electric', amount: 100, unit: '万元' },
        { name: '油漆涂料实时库存', icon: 'paint', amount: 100, unit: '万元' },
        { name: '成品配套库存', icon: 'package', amount: 100, unit: '万元' }

      ]
    }
  }
}
</script>

<style>
.inventory-top {
    color: #ffffff;
    background: rgb(85, 86, 87);
    text-align: center;
    line-height: 45px;
    font-size: 18px;
}
.inventory-bottom {
    line-height: 90px;
    text-align: center;
    border-top: none;
}
.inventory-bottom .amount {
    font-size: 50px;
    color: rgb(52, 180, 109);
    display: inline-block;
    margin-right: 10px;
}
.inventory-bottom .unit {
    color: rgb(67, 142, 204);
}
.inventory-top .svg-icon{
  font-size: 24px;
  margin-right: 5px;
}
</style>
