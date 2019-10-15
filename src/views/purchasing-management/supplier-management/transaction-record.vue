<template>
  <!-- 页面主容器 -->
  <div class="pagination-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <div>时间范围：</div>
          <div class="block">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <el-input v-model="searchInp" class="search" clearable filterable placeholder="请输入您要搜索的内容" />
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box"><el-button type="primary">查询</el-button></div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-button class="export" type="primary" @click="exportHandle">记录导出</el-button>
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          label="交易日期"
          width="180"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="供应商简称"
          width="220"
        />
        <el-table-column
          prop="address"
          label="采购金额(万元)"
          show-overflow-tooltip
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupplierManagementTranRecord',
  data() {
    return {
      date: '',
      searchInp: '',
      data: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    exportHandle() { // 记录导出

    }
  }
}
</script>

<style scoped>
.filter-item {
  display: -webkit-box;
  align-items: center;
}
.filter-container {
  justify-content: start;
  align-items: baseline;
}
.search {
  margin-left: 15px;
}
.filter-right-box {
  margin-left: 35px;
}
.export {
  margin-bottom: 20px;
}
</style>
