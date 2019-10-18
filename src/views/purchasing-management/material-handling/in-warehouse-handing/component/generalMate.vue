<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item" />
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box">
        <el-button :loading="submitLoading" type="primary" size="small" @click="submitScrap()">提交入库清单</el-button>
      </div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table :data="tableData" :max-height="800" style="width: 100%" border stripe>
        <el-table-column label="序号" align="center" type="index" width="100" />
        <el-table-column prop="province" align="center" label="编号" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物料类别 | 名称/种类/材质" align="center" width="400">
          <template slot-scope="scope">
            <el-cascader
              v-model="scope.row.materialClassIds"
              placeholder="试试搜索：名称、种类或材质"
              :options="mateOption"
              :props="props"
              filterable
              style="width:350px"
              @change="materialChange(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column prop="province" label="颜色" align="center" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.color" size="small" placeholder="颜色" />
          </template>
        </el-table-column>

        <el-table-column prop="province" label="数量" align="center" width="170">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number" :min="0" :step="5" :precision="0" size="small" />
          </template>
        </el-table-column>

        <el-table-column prop="province" label="采购单价(元)" align="center" width="190">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.purchasePrice" :min="0" :step="5" :precision="2" size="small" style="width:160px" />
          </template>
        </el-table-column>

        <el-table-column prop="province" label="含税总额(元)" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ (scope.row.price || 0) * (scope.row.num || 0) | toFixed(2) }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="province" label="品牌" width="200" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.brand" size="small" placeholder="品牌" />
          </template>
        </el-table-column>

        <el-table-column prop="province" label="供应商" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.supplierId" filterable placeholder="供应商">
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer-drawer">
        <el-button class="cancel-btn" size="small" icon="el-icon-circle-plus-outline" type="warning" @click="cancelEdit(scope.row)">继续添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setInfoOfTree, removeTreeEmptyFiled, getNodeInfoByIds } from '@/utils'
import { MATERIAL_BASE_TYPE } from '@/utils/conventionalContent'
import { fetchMaterialTree } from '@/api/material'
import { fetchListByBaseType } from '@/api/supplier'
export default {
  data() {
    return {
      props: { value: 'id', label: 'name', children: 'childrenList', expandTrigger: 'hover' },
      supplierList: [],
      currentBaseType: MATERIAL_BASE_TYPE.MATERIAL,
      submitLoading: false,
      mateOption: [],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '0.1111',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  created() {
    this.getMaterialClassTree(this.currentBaseType.index)
    this.getSupplierList(this.currentBaseType.index)
  },
  methods: {
    /**
     * 获取物料列表
     */
    getMaterialClassTree: function(baseType) {
      fetchMaterialTree(baseType).then(({ data, code, message }) => {
        if (code === 200) {
          if (data && data.length) {
            this.mateOption = data
            setInfoOfTree(this.mateOption, 'childrenList', 'name', 'otherInfo', 2)
            this.mateOption = removeTreeEmptyFiled(this.mateOption, 'childrenList')
          }
        } else {
          this.$message({
            message: message,
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '获取物料失败',
          type: 'error'
        })
        console.log(e)
      })
    },
    materialChange: function(item) {
      console.log(item.materialClassIds)
      if (item.materialClassIds && item.materialClassIds.length === 3) {
        const _node = getNodeInfoByIds(this.mateOption, item.materialClassIds, 'id', 'childrenList')
        item.materialCode = _node.otherInfo
      }
    },
    getSupplierList: function(baseType) {
      fetchListByBaseType(baseType).then(({ data, code, message }) => {
        if (code === 200) {
          if (data) {
            this.supplierList = data
          }
        } else {
          this.$message({
            message: `拉取供应商信息失败,${message}`,
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '拉取供应商信息失败',
          type: 'error'
        })
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.page-container {
  padding: 0;
}
.footer-drawer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
