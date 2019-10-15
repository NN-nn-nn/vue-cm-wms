<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-radio-group v-model="listQuery.materialBaseType" size="medium" @change="getTypeList">
            <el-radio-button :label="4">一般物料</el-radio-button>
            <el-radio-button :label="0">钢板</el-radio-button>
            <el-radio-button :label="1">型钢</el-radio-button>
            <el-radio-button :label="2">彩卷/带钢</el-radio-button>
            <el-radio-button :label="3">成品围护</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box">
        <UploadBtn :action="action" :btn-name="'物料分类导入'" />
      </div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <div id="typeBox" class="type-box">
        <div v-for="(item, i) in typeList" :key="i" class="type-item" @click="openDetail">
          <span v-text="item.typeName" />
          <span v-text="item.typeCode" />
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <div class="del-img-item" @click="deleteType(item.id)">
              <img class="del-img" src="@/assets/images/delete.png">
            </div>
          </el-tooltip>
        </div>
        <el-tooltip class="item" effect="dark" content="添加" placement="right">
          <div class="type-item" @click="dialogFormVisible = true">
            <div class="add-img-item">
              <img class="add-img" src="@/assets/images/add.png">
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>
    <!-- 其他模块（例如弹窗等） -->
    <el-dialog title="添加物料大类" :visible.sync="dialogFormVisible" width="500px" @close="handleClose">
      <el-form ref="createTypeForm" :model="typeForm" :rules="typeRule">
        <el-form-item label="名称" :label-width="'80px'" prop="typeName">
          <el-input v-model="typeForm.typeName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="代码" :label-width="'80px'" prop="typeCode">
          <el-input v-model="typeForm.typeCode" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button :loading="saveLoadingBtn" type="primary" @click="saveType">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadBtn from '@/components/UploadSingleFileBtn'
import { fetchTypeList, delType, createType } from '@/api/material'
import { validatorCN, validatorEn } from '@/utils/validatePattern'

export default {
  name: 'WareMaterialClassList',
  components: { UploadBtn },
  data() {
    return {
      listQuery: { // 大类查询条件
        materialBaseType: 4
      },
      typeForm: { // 大类表单

      },
      typeRule: { // 验证规则
        typeName: [
          { required: true, message: '请输入大类名称', trigger: 'blur' },
          { min: 1, max: 4, message: '请输入1-4个字', trigger: 'blur' },
          { pattern: validatorCN.pattern, message: validatorCN.message, trigger: 'blur' }
        ],
        typeCode: [
          { required: true, message: '请输入大类代码', trigger: 'blur' },
          { min: 1, max: 2, message: '请输入2个英文字符', trigger: 'blur' },
          { pattern: validatorEn.pattern, message: validatorEn.message, trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      saveLoadingBtn: false,
      typeList: [
        { id: 1, typeName: '焊接材料', typeCode: 'SJ' }
      ],
      action: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    openDetail: function(id) {
      this.$router.push({ name: 'WareMaterialClassDetail', query: { id, backRouterName: this.$options.name }})
    },
    /**
     * 更改基础类型
     * 0-钢板，1-型材，2-彩卷，3-围护，4-一般物料
     */
    changeBaseType: function() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    },
    /**
     * 删除物料类型
     * @param id {number} 物料类型id
     */
    deleteType: function(id) {
      const loading = this.$loading({
        target: '#typeBox',
        lock: true,
        text: '正在删除',
        fullscreen: false
      })
      delType(id).then(res => {
        this.getTypeList()
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
      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    handleClose(done) {
      this.$refs['createTypeForm'].clearValidate()
      this.dialogFormVisible = false
    },
    saveType: function() {
      this.$refs['createTypeForm'].validate((valid) => {
        if (valid) {
          this.saveLoadingBtn = true
          createType(this.typeForm).then(() => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.saveLoadingBtn = false
            this.dialogFormVisible = false
            this.$refs['createTypeForm'].resetFields()
            this.getTypeList()
          }).catch(e => {
            this.saveLoadingBtn = false
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
    /**
     * 获取物料类型
     * 0-钢板，1-型材，2-彩卷，3-围护，4-一般物料
     */
    getTypeList: function() {
      const loading = this.$loading({
        target: '#typeBox',
        lock: true,
        text: '正在切换',
        fullscreen: false
        // spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
      })
      fetchTypeList(this.listQuery).then(res => {
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
    delTip(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteType(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 300px;
}
.type-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
  min-height: 300px;
}
.type-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1682e6;
  border-radius: 4px;
  min-width: 150px;
  width: 200px;
  height: 70px;
  margin: 0 20px 20px 0;
  color: #FFFFFF;
  font-weight: bold;
}
.del-img-item {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}
.del-img-item >img {
  width: 20px;
  height: 20px;
}
.add-img-item {
  width: 40px;
  height: 40px;
}
.add-img-item >img {
  width: 40px;
  height: 40px;
}
</style>
