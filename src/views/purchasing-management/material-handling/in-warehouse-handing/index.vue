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
      <el-button v-for="(item, i) in MATERIAL_BASE_TYPE" :key="i" type="primary" size="medium" @click="selectBaseType(item)"><svg-icon :icon-class="item.icon" />{{ item.name }}</el-button>
    </div>
    <!-- 其他模块（例如弹窗等） -->
    <!-- 入库Dlg -->
    <el-dialog
      :title="`${currrentBaseType.name}入库办理`"
      :visible.sync="createVisible"
      :fullscreen="true"
      :before-close="handleClose"
    >
      <GeneralMat v-if="currrentBaseType.index === MATERIAL_BASE_TYPE.MATERIAL.index" @closeEvent="createVisible = false" />
      <SteelPlate v-if="currrentBaseType.index === MATERIAL_BASE_TYPE.STEEL_PLATE.index" @closeEvent="createVisible = false" />
      <Steel v-if="currrentBaseType.index === MATERIAL_BASE_TYPE.STEEL.index" @closeEvent="createVisible = false" />
      <StripSteel v-if="currrentBaseType.index === MATERIAL_BASE_TYPE.STRIP_STEEL.index" @closeEvent="createVisible = false" />
      <Enclosure v-if="currrentBaseType.index === MATERIAL_BASE_TYPE.ENCLOSURE.index" @closeEvent="createVisible = false" />
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDlg('type_one')">返 回</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import GeneralMat from './component/generalMate'
import SteelPlate from './component/steelPlate'
import Steel from './component/steel'
import StripSteel from './component/stripSteel'
import Enclosure from './component/enclosure'
import { MATERIAL_BASE_TYPE } from '@/utils/conventionalContent'

export default {
  name: 'MatInWarehouseHanding',
  components: { GeneralMat, SteelPlate, Steel, StripSteel, Enclosure },
  data() {
    return {
      createVisible: false,
      currrentBaseType: {},
      MATERIAL_BASE_TYPE
    }
  },
  methods: {
    selectBaseType: function(item) {
      this.createVisible = true
      this.currrentBaseType = item
    },
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
          this.createVisible = false
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
