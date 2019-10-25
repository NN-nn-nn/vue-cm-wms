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
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table
        :data="data"
        border
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label="序号" align="center" type="index" width="100" />
        <el-table-column prop="month" label="月份" align="center" width="150" />
        <el-table-column prop="base" label="底数(kwh)" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.base" :step="50" :min="0" :precision="3" />
          </template>
        </el-table-column>
        <el-table-column prop="now" label="抄表数(kwh)" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.now" :step="50" :min="0" :precision="3" />
          </template>
        </el-table-column>
        <el-table-column prop="practical" label="实用数(kwh)" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.practical" :step="50" :min="0" :precision="3" />
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="电费总额(元)" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.sum" :step="50" :min="0" :precision="3" />
          </template>
        </el-table-column>
        <el-table-column prop="average" label="平均电价(元)" align="center">
          <template slot-scope="scope">
            <el-tag type="danger"> {{ scope.row.average }}  </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ReportManagementUtility',
  data() {
    return {
      year: moment(new Date()).format('YYYY'),
      data: [{
        month: '1月',
        base: '135',
        now: '236',
        practical: '78',
        sum: '136',
        average: '98'
      }]
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        console.log(values)
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            console.log(value)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  }
}
</script>

<style scoped>

</style>
