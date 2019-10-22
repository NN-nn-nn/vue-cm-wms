<template>
  <!-- 页面主容器 -->
  <div class="page-container steelPlate">
    <!-- 查询容器 -->
    <div class="position-rela">
      <!-- 右侧box -->
      <div class="dowmload"><el-button type="primary" class="el-icon-download"> 下载</el-button></div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table ref="data" v-loading="dataLoading" :data="data" tooltip-effect="dark" stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50" />
        <el-table-column label="日期" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column prop="materialCode" label="编号" align="center" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物料类别" align="center" width="230">
          <template slot-scope="scope">
            <div class="mask-td">
              <div :class="{'mask-red': scope.row.rules.detailId}" />
              <span
                v-if="!scope.row.isHistory || scope.row.isHistory == 1"
              >{{ scope.row.materialName }}</span>
              <el-cascader
                v-else
                v-model="scope.row.materialClassIds"
                placeholder="试试搜索：焊接材料"
                :options="mateOption"
                :props="props"
                filterable
                @change="() =>{materialHandle(scope.row);scope.row.rules.detailId = false}"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center">
          <el-table-column prop="specification" label="型号" align="center" width="120">
            <template slot-scope="scope">
              <div class="mask-td">
                <div :class="{'mask-red': scope.row.rules.specification}" />
                <span v-if="!scope.row.isHistory">{{ scope.row.specification }}</span>
                <el-input v-else v-model="scope.row.specification" placeholder @change="scope.row.rules.specification = false" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="length" label="长(m)" align="center" width="120">
            <template slot-scope="scope">
              <div class="mask-td">
                <div :class="{'mask-red': scope.row.rules.length}" />
                <span v-if="!scope.row.isHistory">{{ scope.row.length | toFixed(2) }}</span>
                <el-input v-else v-model="scope.row.length" placeholder @change="scope.row.rules.length = false" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="thickness" label="厚(mm)" align="center" width="120">
            <template slot-scope="scope">
              <div class="mask-td">
                <div :class="{'mask-red': scope.row.rules.thickness}" />
                <span v-if="!scope.row.isHistory">{{ scope.row.thickness | toFixed(3) }}</span>
                <el-input v-else v-model="scope.row.thickness" placeholder @change="scope.row.rules.thickness = false" />
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="颜色" width="120" align="center">
          <template slot-scope="scope">
            <div class="mask-td">
              <el-tag v-if="!scope.row.isHistory" type="success">{{ scope.row.color }}</el-tag>
              <el-input v-else v-model="scope.row.color" placeholder @change="scope.row.rules.color = false" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量(张)" width="120" align="center">
          <template slot-scope="scope">
            <div class="mask-td">
              <div :class="{'mask-red': scope.row.rules.number}" />
              <el-tag v-if="!scope.row.isHistory" type="info">{{ scope.row.number }}</el-tag>
              <el-input-number
                v-else
                v-model="scope.row.number"
                :min="0"
                :step="5"
                :precision="0"
                size="small"
                @change="scope.row.rules.number = false"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存查询" width="90" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="queryInventory(scope.$index, scope.row)"
            >查询</el-button>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="280" align="center">
          <template slot-scope="scope">
            <div class="mask-td">
              <el-tooltip
                v-if="!scope.row.isHistory"
                class="item"
                effect="dark"
                :content="scope.row.remark"
                placement="top"
              >
                <span>{{ scope.row.remark }}</span>
              </el-tooltip>
              <el-tooltip
                v-else
                effect="dark"
                :content="scope.row.remark"
                placement="top"
              >
                <el-input v-model="scope.row.remark" style="200px" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="mask-td" style="justify-content:left">
              <el-button
                v-if="!scope.row.isHistory"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editHandle(scope.$index, scope.row)"
              >修改</el-button>
              <!-- <el-button
                v-if="!scope.row.isHistory"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="delHandle(scope.row.id)"
              >删除</el-button> -->
              <el-button
                v-if="scope.row.isHistory == 1"
                size="mini"
                type="success"
                icon="el-icon-success"
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
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-nation">
        <el-pagination
          v-if="totalCount>0"
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
        <el-button type="primary" icon="el-icon-success" @click="confirmHandle">确定添加</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import { removeTreeEmptyFiled, getNodeInfoByIds } from '@/utils'
import { fetchMaterialTree } from '@/api/material'
import { MATERIAL_BASE_TYPE } from '@/utils/conventionalContent'
import { qutoList, saveQuto, updateQuto, delQuto } from '@/api/quotaMmanage'
export default {
  name: 'TechQuotaFormuFinishedProduct',
  props: {
    projectId: {
      type: Number,
      default: () => {}
    }
  },
  data() {
    return {
      props: {
        value: 'id',
        label: 'name',
        children: 'childrenList',
        expandTrigger: 'hover'
      },
      currnetBaseType: MATERIAL_BASE_TYPE.enclosure,
      searchInp: '',
      totalCount: 0,
      data: [],
      mateOption: [],
      multipleSelection: [],
      field: {
        projectId: '',
        formType: MATERIAL_BASE_TYPE.enclosure.index,
        page: 1,
        size: 10
      },
      defaultObj: {
        isHistory: 2,
        rules: {
          detailId: false,
          specification: false,
          length: false,
          thickness: false,
          color: false,
          number: false
        }
      },
      rules: {
        detailId: false,
        specification: false,
        length: false,
        thickness: false,
        color: false,
        number: false
      },
      needValid: {
        detailId: true,
        specification: true,
        length: true,
        thickness: true,
        color: true,
        number: true
      },
      dataLoading: false
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
      this.data = []
      this.dataLoading = true
      this.field.projectId = this.projectId
      qutoList(this.field).then(({ data, code, message }) => {
        if (code === 200) {
          this.dataLoading = false
          if (data && data.length) {
            this.data = data
            this.data = this.data.map(v => {
              v.rules = { ...this.rules }
              v.materialName = (v.typeName && v.className && v.detailName) ? `${v.typeName + ' / ' + v.className + ' / ' + v.detailName}` : ''
              return v
            })
          } else {
            this.data.push({ ...this.defaultObj })
          }
        } else {
          this.dataLoading = false
        }
      }).catch(e => {
        this.dataLoading = false
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
    getMaterialClassTree: function(baseType) {
      // 获取物料类别
      fetchMaterialTree(baseType)
        .then(({ data, code, message }) => {
          if (code === 200) {
            if (data && data.length) {
              this.mateOption = data
              // setInfoOfTree(this.mateOption, 'childrenList', 'name', 'otherInfo', 2)
              this.mateOption = removeTreeEmptyFiled(
                this.mateOption,
                'childrenList'
              )
            }
          } else {
            this.$message(message)
          }
        })
        .catch(e => {
          this.$message.error('获取物料失败')
          console.log(e)
        })
    },
    materialHandle(item) {
      if (item.materialClassIds && item.materialClassIds.length === 3) {
        const _node = getNodeInfoByIds(
          this.mateOption,
          item.materialClassIds,
          'id',
          'childrenList'
        )
        item.materialCode = _node.otherInfo
        item.detailId = item.materialClassIds[2]
      }
    },
    queryInventory(index, item) { // 库存查询

    },
    exportHandle() { // 记录导出
    },
    addDefaultHandle() { // 继续添加
      this.data.push({ ...this.defaultObj })
    },
    editHandle(index, item) {
      item.isHistory = 1
      this.data[index].materialClassIds = [
        item.typeId,
        item.classId,
        item.detailId
      ]
      // this.data[index] = Object.assign({}, this.data[index])
      this.$set(this.data, index, Object.assign({}, this.data[index]))
      // this.data = JSON.parse(JSON.stringify(this.data))
    },
    editConfirm(index, item) {
      item.remark = this.data[index].remark
      item.detailId = item.materialClassIds[2]
      const params = {
        id: item.id,
        specification: item.specification,
        length: item.length,
        thickness: item.thickness,
        color: item.color,
        number: item.number,
        remark: item.remark
      }
      updateQuto(params)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('更新成功！')
            this.getList()
          } else {
            this.$message.error('更新失败！')
          }
        })
        .catch(e => {})
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
      // console.log(paramsArr, 'ddd')
      if (paramsArr.length) {
        let errorFlag = false
        this.data.forEach(v => {
          const _valid = this.needValid
          for (const r in _valid) {
            if (_valid[r] && (v[r] === undefined || v[r] === null)) {
              v.rules[r] = true
              errorFlag = true
            }
          }
        })
        if (errorFlag) {
          this.notifyFun({ message: '请新增钢板', type: 'warning' })
          return
        } else {
          paramsArr.forEach(v => {
            delete v.isHistory
            v.formType = MATERIAL_BASE_TYPE.enclosure.index
            v.detailId = v.materialClassIds[2]
            v.projectId = this.projectId
          })
          saveQuto(paramsArr).then(res => {
            if (res.code === 200) {
              this.$message.success('添加成功!')
              this.getList()
            } else {
              this.$message.error('添加失败!')
            }
          }).catch(e => {})
        }
      } else {
        this.notifyFun({ message: '无新增数据添加', type: 'warning' })
      }
    },
    delHandle(id) {
      delQuto({ id: id }).then(({ code }) => {
        if (code) {
          this.$message.success('删除成功!')
          this.getList()
        } else {
          this.$message.error('删除失败!')
        }
      })
    },
    notifyFun: function({ message, type, title }) {
      setTimeout(() => {
        this.$notify({ message: message, type: type })
      }, 50)
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
<style>
.steelPlate .el-table .cell {
  padding: 0;
}
.steelPlate .el-table .el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  padding: 0;
}
.steelPlate .el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  padding: 0;
}
.steelPlate .el-table--medium td {
  padding: 0;
}
</style>
