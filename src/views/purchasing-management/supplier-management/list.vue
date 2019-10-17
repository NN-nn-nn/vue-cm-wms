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
          v-loading="loading"
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
              <span style="margin-left: 10px">{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            width="180"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.supplierCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="供应商简称"
            width="190"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.shortName }}</span>
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
              <span style="margin-left: 10px">{{ scope.row.supplierClassType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"

                @click="checkDetail(scope.row.id)"
              >详情
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.row.id)"
              >修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
              >删除
              </el-button>
              <el-button
                size="mini"
                type="info"
                @click="goRecord()"
              >交易记录
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="pagination">
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :total="totalCount"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 详情页弹窗 -->
    <bullet-box :id="id" :del-id="delId" :show="detailShow" :del-show="delShow" @closeBox="closeBox" /></div>
</template>

<script>
import bulletBox from './bullet-box'
import { list } from '@/api/supplier'
import { parseTime } from '@/utils/index'
import { supplierType } from '@/utils/commonType'
export default {
  name: 'SupplierManagementList',
  components: {
    bulletBox
  },
  filters: {
    parseTime
  },
  data() {
    return {
      data: [],
      searchInp: '',
      id: null,
      delId: null,
      detailShow: false,
      delShow: false,
      page: 1,
      size: 10,
      totalCount: 0,
      loading: false,
      supplierClassType: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      list().then(res => {
        if (res.code === 200) {
          this.loading = false
          this.data = res.data.data
          this.data.forEach((v, index) => {
            v.supplierClassificationList.forEach(item => {
              supplierType.filter(typeItem => {
                if (typeItem.value === item) {
                  this.supplierClassType += typeItem.label + '  '
                }
              })
              console.log(this.supplierClassType)
            })
            v.supplierClassType = this.supplierClassType
          })
          console.log(this.data)
          this.totalCount = res.data.totalCount
        } else {
          this.loading = false
        }
      }).catch(e => {
        // this.$message.error(e.$message)
        this.loading = false
      })
    },
    goCreate() {
      this.$router.push({ path: '/purchasing-management/supplier-management/create' })
    },
    handleEdit(item) {
      this.$router.push({
        name: 'SupplierManagementEdit',
        params: { id: item }
      })
    },
    handleDelete(id) { // 删除数据
      this.delId = id
      this.delShow = true
    },
    goRecord() {
      this.$router.push({ path: '/purchasing-management/supplier-management/transaction-record', query: { userId: 123 }})
    },
    checkDetail(item) { // 查看详情
      this.detailShow = true
      this.id = item
    },
    closeBox() {
      this.detailShow = false
      this.delShow = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
