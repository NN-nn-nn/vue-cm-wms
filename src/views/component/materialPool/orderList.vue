<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        max-height="750"
      >
        <el-table-column label="序号" align="center" type="index" width="100" />
        <el-table-column prop="materialCode" align="center" label="编号" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物料名称" align="center" width="210">
          <template slot-scope="scope">
            <span>{{ `${scope.row.typeName} - ${scope.row.className} - ${scope.row.detailName}` }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" align="center" width="80" />
        <el-table-column prop="weight" label="重量" align="center" width="80" />
        <el-table-column prop="number" label="出库数量" align="center" width="220">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <div class="edit-item">
                <el-input-number v-model="scope.row.number" :min="0" :precision="0" label="描述文字" size="small" />
                <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
              </div>
            </template>
            <span v-else>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-plus-outline" @click="confirmEdit(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button> -->
            <el-button :loading="deleteLoadingBtn" icon="el-icon-delete" size="small" type="danger" @click="handleDelete(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 其他模块（例如弹窗等） -->
    <div v-if="tableData && tableData.length" class="footer-drawer">
      <el-button v-if="submitAble" :loading="submitLoading" icon="el-icon-s-promotion" type="success" @click="submitOutboundOrder">提交出库单(并打印)</el-button>
      <el-button v-else :loading="submitLoading" icon="el-icon-s-promotion" type="success" @click="printOrder">打印</el-button>
    </div>
  </div>
</template>

<script>
import { updateOutboundOrderItem, deleteOrderItem, fetchOutboundOrder, createOutboundOrder } from '@/api/warehouse'
export default {
  name: 'PoolOrderComponent',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitAble: true,
      deleteLoadingBtn: false,
      submitLoading: false,
      tableLoading: false,
      tableData: [],
      listQuery: {}
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal) {
        this.getList()
        this.submitAble = true
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      this.tableData = []
      fetchOutboundOrder().then(({ data, code, message }) => {
        if (code === 200) {
          if (data && data.length) {
            this.tableData = data.map(v => {
              this.$set(v, 'edit', false)
              v.originalNum = v.number
              return v
            })
          }
        } else {
          this.$message({ message: message, type: 'error' })
        }
        this.tableLoading = false
      }).catch(() => {
        this.$message({ message: '获取出库单详情失败', type: 'error' })
        this.tableLoading = false
      })
    },
    submitOutboundOrder: function() {
      console.log(this.tableData)
      if (!(this.tableData && this.tableData.length && this.tableData[0].outboundId)) {
        this.$message({ message: '出库失败', type: 'error' })
        return
      }
      this.submitLoading = true
      createOutboundOrder({ id: this.tableData[0].outboundId }).then(({ data, code, message }) => {
        if (code === 200) {
          this.$message({ message: '出库成功', type: 'success' })
          this.submitAble = false
          this.$emit('inboundEvent', true)
          this.printOrder()
        } else {
          this.$message({ message: message, type: 'error' })
        }
        this.submitLoading = false
      }).catch(e => {
        this.$message({ message: '出库失败', type: 'error' })
        this.submitLoading = false
        console.log(e)
      })
    },
    printOrder: function() {

    },
    handleDelete: function(id) {
      this.deleteLoadingBtn = true
      deleteOrderItem(id).then(({ data, code, message }) => {
        if (code === 200) {
          this.getList()
          this.$message({ message: '删除成功', type: 'success' })
        } else {
          this.$message({ message: message, type: 'error' })
        }
        this.deleteLoadingBtn = false
      }).catch(e => {
        // loading.close()
        this.$message({ message: '删除失败', type: 'error' })
        this.deleteLoadingBtn = false
      })
    },
    // 退出修改
    cancelEdit(row) {
      row.number = row.originalNum
      row.edit = false
      this.$message({ message: '已退出修改', type: 'warning' })
    },
    // 确认修改
    confirmEdit(row) {
      const updateFrom = {
        id: row.id,
        number: row.number
      }
      updateOutboundOrderItem(updateFrom).then(({ data, code, message }) => {
        if (code === 200) {
          row.edit = false
          row.originalNum = row.number
          this.$message({ message: '修改成功', type: 'success' })
        } else {
          this.$message({ message: message, type: 'error' })
        }
      }).catch(e => {
        console.log(e)
        this.$message({ message: '保存失败', type: 'error' })
      })
    }
  }
}
</script>

<style scoped>
.edit-item {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.edit-input {
  width: 120px;
  margin-right: 10px;
}
.el-input-number {
  width: 160px;
  margin-right: 10px;
}
.footer-drawer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
