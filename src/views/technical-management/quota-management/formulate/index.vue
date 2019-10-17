<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-cascader
            v-model="currentProjectId"
            placeholder="试试搜索：2019"
            :options="projectCascadeList"
            :props="props"
            filterable
          />
        </div>
        <div class="filter-item">
          <el-radio-group v-model="materialBaseType" size="medium">
            <el-radio-button :label="4">一般物料</el-radio-button>
            <el-radio-button :label="0">钢板</el-radio-button>
            <el-radio-button :label="1">型钢</el-radio-button>
            <el-radio-button :label="2">彩卷/带钢</el-radio-button>
            <el-radio-button :label="3">成品围护</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <generalMaterial v-show="materialBaseType == 4" />
      <SteelPlate v-show="materialBaseType == 0" />
      <Steel v-show="materialBaseType == 1" />
      <ColorStrip v-show="materialBaseType == 2" />
      <FinishedProduct v-show="materialBaseType == 3" />
    </div>

  </div>
</template>

<script>
import generalMaterial from './component/generalMaterial'
import SteelPlate from './component/steelPlate'
import Steel from './component/steel'
import ColorStrip from './component/colorStrip'
import FinishedProduct from './component/finishedProduct'
import { changeProjectToCascadeByYear } from '@/utils/other'
import { fetchProjectGroupByYear } from '@/api/project'

export default {
  name: 'TechQuotaFormulate',
  components: {
    generalMaterial,
    SteelPlate,
    Steel,
    ColorStrip,
    FinishedProduct
  },
  data() {
    return {
      props: { value: 'id', label: 'name', children: 'children', expandTrigger: 'hover' },
      year: new Date(),
      list: [{
        value: '选项1',
        label: '江干区高沙大学生联谊会'
      }, {
        value: '选项2',
        label: '江干区高沙大学生联谊会'
      }],
      project: '',
      materialBaseType: 4,
      currentProjectId: [],
      projectCascadeList: []
    }
  },
  created() {
    this.getProjectYearCascade()
  },
  mounted() {

  },
  methods: {
    yearHandle(val) {
      console.log(this.year)
    },
    /**
   * 获取项目年份级联列表
   */
    getProjectYearCascade: function() {
      fetchProjectGroupByYear().then(({ data, code, message }) => {
        if (code === 200) {
          // this.projectCascadeList = changeProjectToCascadeByYear(data, '入库总额(万元)', 'totalPrice')
          this.projectCascadeList = changeProjectToCascadeByYear(data)
          if (this.projectCascadeList[0] && this.projectCascadeList[0].children[0] && this.projectCascadeList[0].children[0].id) {
            this.currentProjectId.push(this.projectCascadeList[0].id)
            this.currentProjectId.push(this.projectCascadeList[0].children[0].id)
          }
        } else {
          this.$message.err(message)
        }
      }).catch(e => {
        this.$message.error('获取项目级联列表失败')
      })
    }
  }

}
</script>

<style scoped>
.filter-item {
  margin: 0 10px;
}
.el-cascader {
  width: 300px;
}
</style>
