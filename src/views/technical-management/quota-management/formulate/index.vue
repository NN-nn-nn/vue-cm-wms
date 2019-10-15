<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-date-picker
            v-model="year"
            type="year"
            value-format="yyyy"
            placeholder="选择年"
          />
        </div>
        <div class="filter-item">
          <el-select v-model="project" style="width:260px;" filterable placeholder="请选择相关项目">
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
    </div>

  </div>
</template>

<script>
import SteelPlate from './steelPlate'
import generalMaterial from './generalMaterial'
export default {
  name: 'TechQuotaFormulate',
  components: {
    SteelPlate,
    generalMaterial
  },
  data() {
    return {
      year: new Date(),
      list: [{
        value: '选项1',
        label: '江干区高沙大学生联谊会'
      }, {
        value: '选项2',
        label: '江干区高沙大学生联谊会'
      }],
      project: '',
      materialBaseType: 4
    }
  },
  mounted() {

  },
  methods: {
    yearHandle(val) {
      console.log(this.year)
    }
  }
}
</script>

<style scoped>
.filter-item {
  margin: 0 10px;
}
</style>
