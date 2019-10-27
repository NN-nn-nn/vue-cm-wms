<template>
  <!-- 页面主容器 -->
  <div class="page-container myEcharts">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-date-picker
            v-model="queryParams.year"
            type="year"
            placeholder="选择年份筛选"
          />
        </div>
        <div class="filter-item">
          <el-select v-model="queryParams.typeIdList" filterable multiple placeholder="请选择物料类型" style="width: 750px">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <el-button type="primary" @click="queryHandle">查询</el-button>
        </div>
      </div>

      <!-- 右侧box -->
      <div class="filter-right-box"><span class="unit" /></div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table
        v-loading="loading"
        :data="data"
        border
        stripe
        show-summary
        :summary-method="getSummaries"
        style="width:100%"
      >
        <el-table-column prop="month" label="月份" width="120" align="center" />
        <el-table-column prop="output" :label="`产量 \n (t)`" width="150" align="center" />
        <el-table-column :label="`消耗明细(不含主材和油漆) \n 单位：元`" align="center">
          <el-table-column prop="utility" label="水电费" align="center" />
          <template slot-scope>
            <el-table-column
              v-for="(item, index) in dataHead"
              :key="index"
              :prop="item.details.totalMoney"
              :label="item.typeName"
              align="center"
            />
          </template>

          <el-table-column prop="sumMoney" label="总额" align="center" />
          <el-table-column prop="date" label="平均成本" align="center" />
        </el-table-column>
      </el-table>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
import moment from 'moment'
import { productCost } from '@/api/report'
import { fetchTypeList } from '@/api/material'
import { dataMonth } from '@/utils/product-cost'
export default {
  name: 'ReportManagementProduct',
  data() {
    return {
      typeList: [],
      formType: { formType: 4 },
      data: dataMonth,
      dataHead: [],
      queryParams: {
        typeIdList: [],
        year: moment(new Date()).format('YYYY')
      },
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.dataHead = []
      productCost(this.queryParams).then(({ data, code, message }) => {
        if (code === 200) {
          this.loading = false
          data.forEach((v, index) => {
            let headerObj = {}
            if (v.typeName !== '水电费' && v.typeName !== '产量(t)' && v.details.length) {
              headerObj = Object.assign({}, v)
              this.dataHead.push(headerObj)
            }
            console.log(this.dataHead)

            this.data.map(da => {
              v.details.forEach((item, index) => {
                if (Number(v.typeId) === 0) {
                  if (v.typeName === '水电费' && item.month === da.value) {
                    da.utility = item.totalMoney
                  }
                  if (v.typeName === '产量(t)' && item.month === da.value) {
                    da.output = item.totalMoney
                  }
                } else {
                  const arr = []
                  if (item.month === da.value) {
                    arr.push(item)
                    da.details = arr
                  }
                  console.log(arr)
                  da.details = arr
                }

                return da
              })
            })
          })
          this.data = JSON.parse(JSON.stringify(this.data))
          // console.log(JSON.parse(JSON.stringify(this.data)))
        } else {
          this.loading = false
          this.$message.error(message)
        }
      }).catch(e => {
        this.$message.error(e)
      })
      fetchTypeList(this.formType).then(({ data, code, message }) => {
        if (code === 200) {
          this.typeList = data
        } else {
          this.$message.error(message)
        }
      }).catch(e => {
        this.$message.error(e)
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
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

          if (index === 1) {
            sums[index] += ' '
          } else {
            sums[index] += ' 元'
          }
        } else {
          sums[index] = '0'
        }
      })

      return sums
    },
    queryHandle() {
      this.getList()
    }
  }
}
</script>

<style scoped>
.filter-right-box .unit {
  font-size: 20px;
}
</style>
