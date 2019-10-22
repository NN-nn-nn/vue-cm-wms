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
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        border
        max-height="600"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
        />
        <el-table-column
          label="日期"
          align="center"
          width="120"
        >
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column
          prop="materialCode"
          label="编号"
          align="center"
          width="80"
        />
        <el-table-column label="物料类别 | 名称/种类/材质" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory">{{ scope.row.materialClassIds }}</span>
            <el-cascader
              v-else
              v-model="scope.row.materialClassIds"
              placeholder="试试搜索：焊接材料"
              :options="mateOption"
              :props="props"
              filterable
              style="width:250px"
              @change="materialHandle(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="颜色"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory">{{ scope.row.formModal.color }}</span>
            <el-input v-else v-model="scope.row.formModal.color" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory">{{ scope.row.formModal.quantity }}</span>
            <el-input v-else v-model="scope.row.formModal.quantity" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="库存查询" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="queryInventory(scope.$index, scope.row)"
            >查询</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          width="310"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory">{{ scope.row.remarks }}</span>
            <el-input v-else v-model="scope.row.remarks" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isHistory"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editHandle(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.isHistory =='0'"
              size="mini"
              type="success"
              icon="el-icon-circle-plus-outline"
            >确定</el-button>
            <el-button
              v-if="scope.row.isHistory == '0'"
              size="mini"
              type="warning"
              icon="el-icon-refresh"
              @click="cancelHandle(scope.$index, scope.row)"
            >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-nation">
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
      <div class="formulate-btn">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addHandle">添加</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="confirmHandle">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setInfoOfTree, removeTreeEmptyFiled, getNodeInfoByIds } from '@/utils'
import { fetchMaterialTree } from '@/api/material'
import { MATERIAL_BASE_TYPE } from '@/utils/conventionalContent'
import { qutoList } from '@/api/quotaMmanage'
export default {
  name: 'TechQuotaFormuGeneral',
  props: {
    projectId: {
      type: Number,
      default: () => {}
    }
  },
  data() {
    return {
      props: { value: 'id', label: 'name', children: 'childrenList', expandTrigger: 'hover' },
      currnetBaseType: MATERIAL_BASE_TYPE.material,
      searchInp: '',
      page: 1,
      size: 10,
      totalCount: 0,
      data: [{
        date: '2016-05-03',
        number: '21',
        remarks: '有库存',
        isHistory: 1,
        formModal: {
          name: '钢板',
          kind: '油漆',
          material: 'Q255',
          color: '蓝色',
          unit: '吨',
          quantity: '255'
        }
      }],
      mateOption: [],
      multipleSelection: []
    }
  },
  watch: {
    projectId(newVal, oldVal) {
      if (newVal) this.projectId = newVal
    }
  },
  mounted() {
    this.getMaterialClassTree(this.currnetBaseType.index)
  },
  methods: {
    getList() {
      qutoList()
    },
    sizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    pageChange(val) {
      console.log(`当前页: ${val}`)
    },
    getMaterialClassTree: function(baseType) { // 获取物料类别
      fetchMaterialTree(baseType).then(({ data, code, message }) => {
        if (code === 200) {
          if (data && data.length) {
            this.mateOption = data
            setInfoOfTree(this.mateOption, 'childrenList', 'name', 'otherInfo', 2)
            this.mateOption = removeTreeEmptyFiled(this.mateOption, 'childrenList')
            // console.log(this.mateOption)
          }
        } else {
          this.$message(message)
        }
      }).catch(e => {
        this.$message.error('获取物料失败')
        console.log(e)
      })
    },
    materialHandle(item) {
      if (item.materialClassIds && item.materialClassIds.length === 3) {
        const _node = getNodeInfoByIds(this.mateOption, item.materialClassIds, 'id', 'childrenList')
        item.materialCode = _node.otherInfo
      }
    },
    exportHandle() { // 记录导出

    },
    queryInventory(index, item) {

    },
    addHandle() {
      const newObj = {
        number: '',
        remarks: '',
        formModal: {
          name: '',
          kind: '',
          material: '',
          color: '',
          unit: '',
          quantity: ''
        }
      }
      this.data.push(newObj)
    },
    editHandle(index, item) { // 修改每一天数据
      item.isHistory = 0
      this.data[index].isHistory = 0
      console.log(item)
    },
    cancelHandle(index, item) {
      item.isHistory = 1
    },
    confirmHandle() { // 确定新增
      let paramsArr = []
      paramsArr = this.data.filter(v => {
        return !v.isHistory
      })
      paramsArr.forEach(v => {

      })
    }
  }
}
</script>

<style scoped>
.page-nation{
  margin: 30px 0 0 0;
  text-align: center;
}
</style>
