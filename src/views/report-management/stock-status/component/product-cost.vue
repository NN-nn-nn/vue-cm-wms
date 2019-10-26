<template>
  <!-- 页面主容器 -->
  <div class="page-container myEcharts">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年份筛选"
          />
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box"><span class="unit">单位：元</span></div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table
        :data="data"
        border
        stripe
        show-summary
        :summary-method="getSummaries"
        style="width: 100%"
      >
        <el-table-column prop="month" label="月份" align="center" />
        <el-table-column prop="output" :label="`产量 \n (t)`" align="center" />
        <el-table-column prop="labor" label="消耗明细(不含主材和油漆)" width="130" align="center">
          <el-table-column prop="date" label="劳保用品" width="130" />
          <el-table-column prop="date" label="焊接材料" width="130" />
          <el-table-column prop="date" label="生产耗材" width="130" />
          <el-table-column prop="date" label="设备配件" width="130" />
          <el-table-column prop="date" label="电气线缆" width="130" />
          <el-table-column prop="date" label="工机具" width="130" />
          <el-table-column prop="date" label="气体" width="130" />
          <el-table-column prop="date" label="水电费" width="130" />
          <el-table-column prop="date" label="总额" width="130" />
          <el-table-column prop="date" label="平均成本" width="130" />
        </el-table-column>
      </el-table>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ReportManagementProduct',
  data() {
    return {
      year: moment(new Date()).format('YYYY'),
      data: [{
        month: '1月',
        output: '120',
        labor: '12',
        date: 123
      }, {
        month: '1月',
        output: '120',
        labor: '12',
        date: 123
      }, {
        month: '1月',
        output: '120',
        labor: '12',
        date: 123
      }]
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '年平均'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style scoped>
.filter-right-box .unit {
  font-size: 20px;
}
</style>
