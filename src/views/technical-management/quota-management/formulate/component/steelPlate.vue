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
        ref="data"
        :data="data"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="40"
        />
        <el-table-column
          label="日期"
          align="center"
          width="100"
        >
          <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          prop="materialCode"
          label="编号"
          align="center"
          width="90"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物料类别" align="center" width="230">
          <template slot-scope="scope">
            <span v-if="!scope.row.isHistory || scope.row.isHistory == 1">
              {{ scope.row.typeName&&scope.row.className&&scope.row.detailName? scope.row.typeName +'/'+ scope.row.className +'/'+ scope.row.detailName:'' }}
            </span>
            <el-cascader
              v-else
              v-model="scope.row.materialClassIds"
              placeholder="试试搜索：焊接材料"
              :options="mateOption"
              :props="props"
              filterable
              @change="materialHandle(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center">
          <el-table-column prop="length" label="长(m)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="!scope.row.isHistory">{{ scope.row.length }}</span>
              <el-input v-else v-model="scope.row.length" placeholder="" />
            </template>
          </el-table-column>

          <el-table-column prop="width" label="宽(m)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="!scope.row.isHistory">{{ scope.row.width }}</span>
              <el-input v-else v-model="scope.row.width" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column prop="thickness" label="厚(mm)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="!scope.row.isHistory">{{ scope.row.thickness }}</span>
              <el-input v-else v-model="scope.row.thickness" placeholder="" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="数量(张)"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.isHistory">{{ scope.row.number }}</span>
            <el-input-number v-else v-model="scope.row.number" :min="0" :step="5" :precision="0" size="small" />
          </template>

        </el-table-column>
        <el-table-column
          label="总重(kg)"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.isHistory">{{ scope.row.weight }}</el-tag>
            <el-tag v-else> {{ scope.row.length&&scope.row.width&&scope.row.thickness&&scope.row.number? ((scope.row.length)*(scope.row.width)*(scope.row.thickness)*(scope.row.number)*7.85).toFixed(2): 0 }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="库存查询" width="80" align="center">
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
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip v-if="!scope.row.isHistory" class="item" effect="dark" :content="scope.row.remark" placement="top">
              <span>{{ scope.row.remark }}</span>
            </el-tooltip>
            <el-input v-else v-model="scope.row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.isHistory"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editHandle(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.isHistory == 1"
              size="mini"
              type="success"
              icon="el-icon-circle-check-outline"
              @click="editConfirm(scope.$index, scope.row)"
            >确定</el-button>
            <el-button
              v-if="scope.row.isHistory == 1"
              size="mini"
              type="warning"
              icon="el-icon-refresh"
              @click="cancelHandle(scope.$index, scope.row)"
            >取消</el-button>
            <el-button
              v-if="scope.row.isHistory == 2"
              type="danger"
              icon="el-icon-delete"
              @click="removeHandle(scope.$index)"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="page-nation">
        <el-pagination
          :current-page="field.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="field.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
      <div class="formulate-btn">
        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addDefaultHandle">继续添加</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" @click="confirmHandle">确定添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setInfoOfTree, removeTreeEmptyFiled, getNodeInfoByIds } from '@/utils'
import { fetchMaterialTree } from '@/api/material'
import { MATERIAL_BASE_TYPE } from '@/utils/conventionalContent'
import { qutoList, saveQuto, updateQuto } from '@/api/quotaMmanage'
export default {
  name: 'TechQuotaFormuSteelPlate',
  props: {
    projectId: {
      type: Number,
      default: () => {}
    }
  },
  data() {
    return {
      props: { value: 'id', label: 'name', children: 'childrenList', expandTrigger: 'hover' },
      currnetBaseType: MATERIAL_BASE_TYPE.STEEL_PLATE,
      searchInp: '',
      totalCount: 0,
      data: [],
      mateOption: [],
      multipleSelection: [],
      field: {
        projectId: '',
        formType: MATERIAL_BASE_TYPE.STEEL_PLATE.index,
        page: 1,
        size: 10
      },
      defaultObj: {
        isHistory: 2
      }
    }
  },
  watch: {
    projectId(newVal, oldVal) {
      if (newVal) {
        this.field.projectId = this.projectId
        this.getList()
      }
    }
  },
  mounted() {
    this.getMaterialClassTree(this.currnetBaseType.index)
    this.getList()
  },
  methods: {
    getList() {
      this.field.projectId = this.projectId
      qutoList(this.field).then(res => {
        if (res.code === 200) {
          this.data = res.data.data
          this.totalCount = res.data.totalCount
          if (!this.data.length) {
            this.data.push({ ...this.defaultObj })
          }
        }
      })
    },
    sizeChange(val) {
      this.field.size = val
      this.getList()
    },
    pageChange(val) {
      this.field.page = val
      this.getList()
    },
    getMaterialClassTree: function(baseType) { // 获取物料类别
      fetchMaterialTree(baseType).then(({ data, code, message }) => {
        if (code === 200) {
          if (data && data.length) {
            this.mateOption = data
            setInfoOfTree(this.mateOption, 'childrenList', 'name', 'otherInfo', 2)
            this.mateOption = removeTreeEmptyFiled(this.mateOption, 'childrenList')
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
    queryInventory(index, item) {

    },
    exportHandle() { // 记录导出

    },
    addDefaultHandle() {
      this.data.push({ ...this.defaultObj })
    },
    editHandle(index, item) { // 修改每一天数据
      this.data[index].isHistory = 1
      this.data[index].materialClassIds = [item.typeId, item.classId, item.detailId]
    },
    editConfirm(index, item) {
      item.remark = this.data[index].remark
      item.detailId = item.materialClassIds[2]
      const params = {
        'id': item.id,
        'number': item.number,
        'thickness': item.thickness,
        'weight': ((item.length) * (item.width) * (item.thickness) * (item.number) * 7.85).toFixed(2),
        'length': item.length,
        'width': item.width,
        'unit': item.unit,
        'remark': item.remark
      }
      updateQuto(params).then(res => {
        if (res.code === 200) {
          this.$message.success('更新成功！')
          this.getList()
        } else {
          this.$message.error('更新失败！')
        }
      }).catch(e => {})
    },
    cancelHandle(index, item) {
      item.isHistory = 0
    },
    removeHandle(index) {
      this.data.splice(index, 1)
    },
    confirmHandle() { // 确定新增
      let paramsArr = []
      paramsArr = this.data.filter(v => {
        return v.isHistory
      })
      console.log(paramsArr)

      if (paramsArr.length) {
        paramsArr.forEach(v => {
          delete v.isHistory
          v.formType = MATERIAL_BASE_TYPE.STEEL_PLATE.index
          v.detailId = v.materialClassIds[2]
          v.projectId = this.projectId
          v.weight = (v.length) * (v.width) * (v.thickness) * 7.85 * (v.number).toFixed(2)
        })
        saveQuto(paramsArr).then(res => {
          if (res.code === 200) {
            this.$message.success('添加成功!')
            this.getList()
          } else {
            this.$message.error('添加失败!')
          }
        }).catch(e => { })
      } else {
        this.$message.error('无数据可添加')
      }
    },
    updateHandle() {

    }
  }
}
</script>

<style scoped>
.btn {
    margin: 20px 0 0 0;
    text-align: right;
}
.page-nation {
  margin: 30px 0 0 0;
  text-align: center;
}
</style>
