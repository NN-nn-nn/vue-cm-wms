<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <div class="filter-left-box">
        <div class="filter-item">
          <el-input v-model="searchInp" placeholder="请输入搜索名称" clearable filterable />
        </div>
      </div>
      <div class="filter-right-box"><el-button type="primary" @click="goCreate">添加供应商</el-button></div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <template>
        <el-table
          :data="data"
          border
          :header-cell-style="{background:'#eef1f6'}"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          />
          <el-table-column
            label="录入时间"
            width="160"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            width="180"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商简称"
            width="190"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="地区"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商分类"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"

                @click="checkDetail(scope.row)"
              >详情
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)"
              >修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
              <el-button
                size="mini"
                type="success"
                @click="goRecord()"
              >交易记录
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 详情页弹窗 -->
    <bullet-box :detail="detail" :show="detailShow" :del-show="delShow" @closeBox="closeBox" /></div>
</template>

<script>
import bulletBox from './bullet-box'
export default {
  name: 'SupplierManagementList',
  components: {
    bulletBox
  },
  data() {
    return {
      data: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      searchInp: '',
      detail: { },
      detailShow: false,
      delShow: false
    }
  },
  methods: {
    goCreate() {
      this.$router.push({ path: '/purchasing-management/supplier-management/create' })
    },
    handleEdit(index, row) {
      this.$router.push({ path: '/purchasing-management/supplier-management/edit', query: { userId: 123 }})
    },
    handleDelete(index, row) { // 删除数据
      console.log(row)
      this.delShow = true
    },
    goRecord() {
      this.$router.push({ path: '/purchasing-management/supplier-management/transaction-record', query: { userId: 123 }})
    },
    checkDetail(item) { // 查看详情
      this.detailShow = true
    },
    closeBox() {
      this.detailShow = false
      this.delShow = false
    }
  }
}
</script>

<style scoped>
</style>
