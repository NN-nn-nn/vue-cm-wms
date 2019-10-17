<template>
  <!-- 页面主容器 -->
  <div class="page-container in-ware-house-handing">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item" />
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <!-- <el-button type="primary" size="medium" @click="">一般物料入库</el-button>
      <el-button type="primary" size="medium">钢板入库</el-button>
      <el-button type="primary" size="medium">型钢入库</el-button>
      <el-button type="primary" size="medium">彩卷/带钢入库</el-button>
      <el-button type="primary" size="medium">成品围护入库</el-button> -->
      <el-button v-for="(item, i) in warehouseType" :key="i" type="primary" size="medium" @click="item.visible = true"><svg-icon :icon-class="item.icon" />{{ item.name }}</el-button>
    </div>
    <!-- 其他模块（例如弹窗等） -->
    <!-- 一般物料入库Dlg -->
    <el-dialog
      title="入库办理"
      :visible.sync="warehouseType.type_one.visible"
      :fullscreen="true"
      :before-close="handleClose"
    >
      <GeneralMat />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDlg('type_one')">取 消</el-button>
        <el-button type="primary" @click="warehouseType.type_one.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GeneralMat from './component/generalMate'

export default {
  name: 'MatInWarehouseHanding',
  components: { GeneralMat },
  data() {
    return {
      warehouseType: {
        type_one: { name: '一般物料入库', visible: false, type: 0, icon: 'material' },
        type_two: { name: '钢板入库', visible: false, type: 1, icon: 'steel-plate' },
        type_three: { name: '型钢入库', visible: false, type: 2, icon: 'steel' },
        type_four: { name: '彩卷/带钢入库', visible: false, type: 3, icon: 'strip-steel' },
        type_five: { name: '成品围护入库', visible: false, type: 4, icon: 'enclosure' }
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeDlg(type) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.warehouseType[type].visible = false
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.in-ware-house-handing .content-container .el-button--medium {
    width: 200px;
    height: 60px;
    font-size: 18px;
}
.svg-icon {
  margin-right: 10px;
}
</style>
