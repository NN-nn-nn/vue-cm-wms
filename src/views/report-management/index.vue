<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box" />
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="库存状态" name="first">库存状态</el-tab-pane>
        <el-tab-pane label="物料使用分析" name="second">物料使用分析</el-tab-pane>
        <el-tab-pane label="生产成本分析" name="third">生产成本分析</el-tab-pane>
        <el-tab-pane label="项目成本分析" name="fourth">项目成本分析</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
export default {
  name: 'ReportManagement',
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
