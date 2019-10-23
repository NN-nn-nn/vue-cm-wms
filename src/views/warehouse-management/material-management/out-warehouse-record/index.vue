<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">左</div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box">右</div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">常规出库汇总</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">物料出库汇总</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
export default {
  name: 'WareOutWarehouseRecord',
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
