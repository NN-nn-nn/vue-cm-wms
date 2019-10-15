<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="openClassDlg('create')">添加种类</el-button>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-tabs id="classTabs" v-model="currentTabId" :tab-position="'left'" style="min-height: 200px;" @tab-click="changeTab">
        <el-tab-pane v-for="(item,i) in classList" :key="i" :label="item.className + ' | ' + item.classCode" :name="`${item.id}`">
          <div class="filter-container">
            <!-- 左侧box -->
            <div class="filter-left-box">
              <div class="filter-item">
                <el-button type="primary" size="medium" icon="el-icon-edit" @click="openClassDlg('update', item)">修改种类信息</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteTip('class', item)">删除当前种类</el-button>
              </div>
            </div>
            <!-- 右侧box -->
            <div class="filter-right-box">
              <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="materialDlgVisible = true">添加材质</el-button>
            </div>
          </div>
          <div class="content-container">
            <el-table
              v-loading="matelistLoading"
              :data="materialList"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column prop="typeName" label="物料名称" align="center" width="180" />
              <el-table-column prop="className" label="物料种类" align="center" width="180" />
              <el-table-column prop="detailName" label="材质/型号/品种" align="center" width="220">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <div class="edit-item">
                      <el-input v-model="scope.row.detailName" class="edit-input" size="small" @blur="validateName(scope.row.detailName, scope.row.id)" />
                      <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
                    </div>
                  </template>
                  <span v-else>{{ scope.row.detailName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="materialCode" label="代码" align="center" width="180" />
              <el-table-column prop="createTime" label="时间" align="center" width="180" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">保存</el-button>
                  <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteTip('material', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination v-show="total > 0" :current-page="listQuery.pageNumber" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 其他模块（例如弹窗等） -->
    <el-dialog :title="operateMap[operateDlgStatus]" :visible.sync="classDlgVisible" width="500px" @closed="handleClose('classForm')">
      <el-form ref="classForm" :model="classForm" :rules="classRule">
        <el-form-item label="名称" :label-width="'80px'" prop="className">
          <el-input v-model="classForm.className" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose('classForm')">取 消</el-button>
        <el-button :loading="submitClassLoadBtn" type="primary" @click="submitClass">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加物料材质" :visible.sync="materialDlgVisible" width="500px" @closed="handleClose('materialForm')">
      <el-form ref="materialForm" :model="materialForm" :rules="materialRule">
        <el-form-item label="名称" :label-width="'80px'" prop="detailName">
          <el-input v-model="materialForm.detailName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose('materialForm')">取 消</el-button>
        <el-button :loading="submitMaterialBtn" type="primary" @click="submitMaterial">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validatorCN } from '@/utils/validatePattern'
import { fetchClassList, createClass, updateClass, delClass, fetchMaterialList, createMaterial, updateMaterial, delMaterial } from '@/api/material'

export default {
  name: 'WareMaterialClassDetail',
  data() {
    return {
      classDlgVisible: false,
      classEditDlgVisible: false,
      materialDlgVisible: false,
      submitClassLoadBtn: false,
      submitMaterialBtn: false,
      matelistLoading: false,
      operateMap: {
        create: '添加种类信息',
        update: '修改种类信息'
      },
      total: 0,
      operateDlgStatus: 'create',
      currentTabId: undefined,
      classList: [], // 种类列表
      materialList: [],
      listQuery: {
        id: undefined
      },
      materialForm: {}, // 物料材质表单
      classForm: {}, // 物料种类表单
      classRule: { // 物料种类表单验证
        className: [
          { required: true, message: '请输入种类名称', trigger: 'blur' },
          { min: 1, max: 7, message: '请输入1-7个字', trigger: 'blur' },
          { pattern: validatorCN.pattern, message: validatorCN.message, trigger: 'blur' }
        ]
      },
      materialRule: { // 物料种类表单验证
        detailName: [
          { required: true, message: '请输入材质名称', trigger: 'blur' }
          // { min: 1, max: 7, message: '请输入1-7个字', trigger: 'blur' }
          // { pattern: validatorCN.pattern, message: validatorCN.message, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.backRouterName = this.$route.query && this.$route.query.backRouterName
    this.typeId = this.$route.query && this.$route.query.id
    this.fetchClassList()
  },
  methods: {
    openClassDlg: function(status, item) {
      this.operateDlgStatus = status
      if (item && item.id) {
        this.classForm = Object.assign({}, item)
      }
      this.classDlgVisible = true
    },
    editMaterial: function() {
      this.$refs['materialEditForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.submitMaterialBtn = true
          updateMaterial(this.materialForm).then(() => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.submitMaterialBtn = false
            this.materialDlgVisible = false
            this.$refs['materialForm'].resetFields()
            this.getMaterialList()
          }).catch(e => {
            this.submitMaterialBtn = false
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    deleteMaterial: function(id) {
      delMaterial(id).then(res => {
        this.getMaterialList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(e => {
        this.$message({
          // message: error.message,
          message: '删除失败',
          type: 'error'
        })
      })
    },
    getMaterialList: function() {
      this.matelistLoading = true
      this.materialList = []
      this.listQuery.id = this.currentTabId
      fetchMaterialList(this.listQuery).then(res => {
        this.materialList.push({ id: 1, typeName: '焊接材料', className: '焊条', detailName: 'AUFAS', materialCode: 'HJ61', createTime: '2017-08-02' })
        this.materialList.push({ id: 1, typeName: '焊接材料', className: '焊条', detailName: 'AUFAS', materialCode: 'HJ61', createTime: '2017-08-02' })
        this.materialList.push({ id: 1, typeName: '焊接材料', className: '焊条', detailName: 'AUFAS', materialCode: 'HJ61', createTime: '2017-08-02' })
        this.materialList.push({ id: 1, typeName: '焊接材料', className: '焊条', detailName: 'AUFAS', materialCode: 'HJ61', createTime: '2017-08-02' })
        this.materialList.push({ id: 1, typeName: '焊接材料', className: '焊条', detailName: 'AUFAS', materialCode: 'HJ61', createTime: '2017-08-02' })
        this.materialList.push({ id: 1, typeName: '焊接材料', className: '焊条', detailName: 'AUFAS', materialCode: 'HJ61', createTime: '2017-08-02' })
        this.materialList = this.materialList.map(v => {
          this.$set(v, 'edit', false)
          v.originalName = v.detailName
          return v
        })
        this.total = this.materialList.length || 0
        // if (res.data.resultCode === 200) {
        //   resolve(res.data.resultContent)
        // } else {
        //   this.$message({
        //     // message: error.message,
        //     message: res.data.resultMsg,
        //     type: 'error'
        //   })
        //   reject()
        // }
        this.matelistLoading = false
      }).catch(e => {
        this.$message({
          message: '获取列表失败',
          type: 'error'
        })
        this.matelistLoading = false
        console.log(e)
      })
      // this.list = _venderLabels.map(v => {
      //       this.$set(v, 'edit', false)
      //       v.originalName = v.name
      //       return v
      //     })
    },
    // 搜索界面
    handleFilter() {
      this.listQuery.pageNumber = 1
      this.getMaterialList()
    },
    // page组件相关
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getMaterialList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getMaterialList()
    },
    // 验证材质名称是否正确
    validateName: function(name, id) {
      // checkName(name, id).then(
      //   response => {
      //     this.resultMsg = response.data.resultMsg
      //     this.resultCode = response.data.resultCode
      //     if (response.data.resultCode !== 200) {
      //       this.$message({
      //         message: response.data.resultMsg,
      //         type: 'warning'
      //       })
      //     }
      //   }
      // )
    },
    submitMaterial: function() {
      this.$refs['materialForm'].validate((valid) => {
        if (valid) {
          this.submitMaterialBtn = true
          createMaterial(this.materialForm).then(() => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.submitMaterialBtn = false
            this.materialDlgVisible = false
            this.$refs['materialForm'].resetFields()
            this.getMaterialList()
          }).catch(e => {
            this.submitMaterialBtn = false
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    // 退出修改
    cancelEdit(row) {
      row.name = row.originalName
      row.edit = false
      this.$message({
        message: '已退出修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      // 如果名称检测结果为‘重复’ 400
      // if (this.resultCode !== null && this.resultCode !== 200) {
      //   this.$message({
      //     message: this.resultMsg,
      //     type: 'warning'
      //   })
      //   return
      // }
      updateMaterial({ id: row.id, detailName: row.detailName }).then(res => {
        if (res.data.resultCode === 200) {
          row.edit = false
          row.originalName = row.name
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.resultMsg,
            type: 'error'
          })
        }
      }).catch(e => {
        console.log(e)
      })
    },
    changeTab: function(e) {
      this.currentTabId = e.name
      this.getMaterialList()
    },
    fetchClassList: function() {
      const loading = this.$loading({
        target: '#classTabs',
        lock: true,
        text: '正在切换',
        fullscreen: false
        // spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
      })
      fetchClassList({ id: this.typeId }).then(res => {
        this.classList.push({ id: 1, className: '焊条', classCode: '6' })
        this.classList.push({ id: 2, className: '焊条2', classCode: '7' })
        this.currentTabId = this.classList[0].id + ''
        this.getMaterialList()
        // if (res.data.resultCode === 200) {
        //   resolve(res.data.resultContent)
        // } else {
        //   this.$message({
        //     // message: error.message,
        //     message: res.data.resultMsg,
        //     type: 'error'
        //   })
        //   reject()
        // }
        loading.close()
      }).catch(e => {
        this.$message({
          message: '获取列表失败',
          type: 'error'
        })
        loading.close()
        console.log(e)
      })
    },
    submitClass: function() {
      if (this.loading) {
        this.$message({
          message: '正在提交，请勿重复点击',
          type: 'info'
        })
        return
      }
      if (this.operateDlgStatus === 'create') {
        this.saveClass()
      } else {
        this.editClass()
      }
    },
    saveClass: function() {
      this.$refs['classForm'].validate((valid) => {
        if (valid) {
          this.submitClassLoadBtn = true
          createClass(this.classForm).then(() => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.submitClassLoadBtn = false
            this.classDlgVisible = false
            this.$refs['classForm'].resetFields()
            // this.getTypeList()
          }).catch(e => {
            this.submitClassLoadBtn = false
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    editClass: function() {
      this.$refs['classForm'].validate((valid) => {
        if (valid) {
          this.submitClassLoadBtn = true
          updateClass(this.classForm).then(() => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.submitClassLoadBtn = false
            this.classDlgVisible = false
            this.$refs['classForm'].resetFields()
            // this.getTypeList()
          }).catch(e => {
            this.submitClassLoadBtn = false
            this.$message({
              message: '修改失败',
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    deleteClass: function(id) {
      delClass(id).then(res => {
        // this.getMaterialList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(e => {
        this.$message({
          // message: error.message,
          message: '删除失败',
          type: 'error'
        })
      })
    },
    deleteTip(status, item) {
      const tipName = status === 'class' ? item.className : `材质${item.detailName}`
      this.$confirm(`确认删除 “${tipName}”，一经删除不可恢复?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (status === 'class') {
          this.deleteClass(item.id)
        } else {
          this.deleteMaterial(item.id)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    openAddClassDlg: function() {
      this.classDlgVisible = true
    },
    handleClose: function(fromName) {
      this.$refs[fromName].resetFields()
      this.classDlgVisible = false
      this.materialDlgVisible = false
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 300px;
}
.edit-item {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.edit-input {
  /* padding-right: 100px; */
  width: 120px;
  margin-right: 10px;
}
.cancel-btn {
  /* position: absolute;
  right: 15px;
  top: 10px; */
}
</style>
