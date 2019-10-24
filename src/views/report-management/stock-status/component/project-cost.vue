<template>
  <!-- 页面主容器 -->
  <div class="page-container myEcharts">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-select v-model="project" placeholder="请选择项目">
            <el-option
              v-for="item in projectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <div class="project-top">
        <div id="pieEcharts" />
        <div class="chart-right">
          <div v-for="item in projectWeight" :key="item.id" class="project-weight">
            <div class="top">
              <span class="weight">{{ item.weight }}</span>
              <span>{{ item.unit }}</span>
            </div>
            <div class="bottom">{{ item.status }}</div>
          </div>
        </div>
      </div>
      <div class="project-bottom">
        <el-table
          :header-cell-style="headerBg"
          :data="data"
          stripe
          border
        >
          <el-table-column prop="steelPlate" label="钢板" align="center" />
          <el-table-column prop="steel" label="型材" align="center" />
          <el-table-column prop="color" label="彩卷" align="center" />
          <el-table-column prop="paint" label="油漆涂料" align="center" />
          <el-table-column prop="other" label="其他摊销" align="center" />
        </el-table>
      </div>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
export default {
  name: 'ReportManagementProject',
  data() {
    return {
      headerBg: { 'background': '#F5F7FA' },
      project: '',
      projectList: [],
      projectWeight: [{
        weight: 1000,
        unit: '吨',
        status: '已生产量',
        id: 1
      }, {
        weight: 1000,
        unit: '吨',
        status: '累计成本',
        id: 2
      }],
      data: [{
        steelPlate: 23,
        steel: 12,
        color: 12,
        paint: 98,
        other: 34
      }, {
        steelPlate: '23%',
        steel: '12%',
        color: '12%',
        paint: '98%',
        other: '34%'
      }]
    }
  },
  mounted() {
    this.getCharts()
  },
  methods: {
    getCharts() {
      const pieEcharts = this.$echarts.init(document.getElementById('pieEcharts'))
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
          orient: 'vertical',
          left: 'left',
          top: '40%',
          data: ['钢板', '型钢', '彩卷带钢', '其他摊销']
        },
        grid: {

          bottom: '40%',
          containLabel: true
        },
        series: [
          {
            name: '详细数据',
            type: 'pie',
            radius: '75%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '钢板' },
              { value: 310, name: '型钢' },
              { value: 234, name: '彩卷带钢' },
              { value: 135, name: '其他摊销' }
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
                    '#ED7D31', '#4472C4', '#FFC000', '#FE8463'
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

<style scoped>
.project-top {
  display: flex;
  margin: 20px 0 35px 0;
  justify-content: space-between;
}
#pieEcharts {
  width: 50%;
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
.project-top .el-row {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.chart-right {
  width: 43%;
  margin-top: 55px;
  text-align: center;
}
.chart-right .project-weight {
  width: 450px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
}
.project-weight .weight {
  color: rgb(52, 180, 109);
}
.chart-right .top {
  line-height: 100px;
  border-bottom: 1px solid #eeeeee;
}
.chart-right .bottom {
  line-height: 55px;
  background: rgb(124, 189, 104);
  color: #ffffff;
}
.chart-right .weight {
  font-size: 40px;
}
</style>
