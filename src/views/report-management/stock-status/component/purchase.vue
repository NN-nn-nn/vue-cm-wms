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
      <!-- <div class="filter-right-box">右</div> -->
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <div class="purchase-top">
        <div class="title-flex">
          <div>采购额汇总统计</div>
          <div class="unit">单位: 万元</div>
        </div>
        <div id="columnarEchart" />
      </div>
      <div class="purchase-bottom">
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="选择月份筛选"
        />
        <div class="purchase-bottom-flex">
          <div id="pieEcharts" />
          <el-table
            class="purchase-table"
            :header-cell-style="headerBg"
            :data="data"
            max-height="310"
            stripe
            border
            style="width: 200px"
          >
            <el-table-column prop="date" label="物料名称" width="180" align="center" />
            <el-table-column prop="name" label="金额(元)" width="180" align="center" />
            <el-table-column prop="address" label="占比(%)" align="center" />
          </el-table>
        </div>
      </div>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ReportManagementPurchase',
  data() {
    return {
      headerBg: { 'background': '#F5F7FA' },
      year: moment(new Date()).format('YYYY'),
      month: moment(new Date()).format('YYYY-MM'),
      data: [{
        date: '钢板',
        name: '34000',
        address: '30%'
      }, {
        date: '型钢',
        name: '34000',
        address: '30%'
      }, {
        date: '彩卷带钢',
        name: '34000',
        address: '30%'
      }, {
        date: '劳保用品',
        name: '34000',
        address: '30%'
      }, {
        date: '焊接材料',
        name: '34000',
        address: '30%'
      }, {
        date: '工具机',
        name: '34000',
        address: '30%'
      }]
    }
  },
  mounted() {
    this.getCharts()
  },
  methods: {
    getCharts() {
      const columnarEchart = this.$echarts.init(document.getElementById('columnarEchart'))
      const pieEcharts = this.$echarts.init(document.getElementById('pieEcharts'))

      columnarEchart.setOption({ // 柱状图
        title: { text: '' },
        color: '#4472C4',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [30, 100, 200, 334, 390, 330, 220, 112, 34, 56, 33, 178]
          }
        ]
      })

      pieEcharts.setOption({ // 饼图
        title: {
          text: '', // 主标题
          subtext: '', // 副标题
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          top: '5%',
          data: ['钢板', '型钢', '彩卷带钢', '劳保用品', '焊接材料', '工具机']
        },
        series: [
          {
            name: '详细数据',
            type: 'pie',
            radius: '75%',
            center: ['48%', '60%'],
            data: [
              { value: 335, name: '钢板' },
              { value: 310, name: '型钢' },
              { value: 234, name: '彩卷' },
              { value: 135, name: '劳保用品' },
              { value: 120, name: '焊接材料' },
              { value: 253, name: '工具机' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  var colorList = [
                    '#ED7D31', '#4472C4', '#FFC000', '#FE8463', '#A5A5A5', '#FEEC73'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
    }

  }
}
</script>

<style>
#columnarEchart {
  height: 500px;
}
#pieEcharts {
  width: 55%;
  height: 500px;
}
.purchase-top {
  margin: 20px 0 50px 0;
}
.purchase-bottom-flex {
  display: flex;
}
.purchase-table {
  margin: 120px 80px 0 0;
}
</style>
