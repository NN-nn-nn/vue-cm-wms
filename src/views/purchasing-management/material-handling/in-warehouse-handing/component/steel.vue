<template>
  <!-- 页面主容器 -->
  <div class="page-container inbound-table">
    <div :class="{'mask-container':submitLoading}" />
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <div class="list-info-item">
            <span>项目：</span>
            <el-cascader
              v-model="currentProjectId"
              placeholder="试试搜索：项目名称"
              :options="projectCascadeList"
              :props="{ value: 'id', label: 'name', children: 'children', expandTrigger: 'hover' }"
              :disabled="dailyMateCheck"
              :show-all-levels="false"
              clearable
              filterable
              style="width:250px"
              @change="projectChange"
            />
          </div>
        </div>
        <div class="filter-item">
          <div class="list-info-item">
            <span>入库时间：</span>
            <el-date-picker
              v-model="inboundList.storageTime"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              :picker-options="pickerOptions"
            />
          </div>
        </div>
        <div class="filter-item">
          <div class="list-info-item">
            <span>入库人：</span>
            {{ name }}
          </div>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box">
        <div class="filter-item">
          <el-tooltip class="item" effect="dark" content="甲供材料：必须选择项目(采购单价、品牌、供应商无需填写)" placement="top">
            <el-checkbox v-model="provideMateCheck" :disabled="dailyMateCheck" @change="changeProvide">甲供材料</el-checkbox>
          </el-tooltip>
        </div>
        <div class="filter-item">
          <el-tooltip class="item" effect="dark" content="日常备料：常规入库(无需项目信息)" placement="top">
            <el-checkbox v-model="dailyMateCheck" :disabled="provideMateCheck" @change="inboundTypeChange">日常备料</el-checkbox>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table :data="tableData" max-height="600" style="width: 100%" border stripe>
        <el-table-column label="序号" align="center" type="index" min-width="50" />
        <el-table-column prop="province" align="center" label="编号" min-width="90">
          <template slot-scope="scope">
            <div class="mask-td">
              <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="`物料类别 \n [名称/种类/材质]`" align="center" min-width="260">
          <template slot-scope="scope">
            <div class="mask-td">
              <div :class="{'mask-red': scope.row.rules.detailId}" />
              <el-cascader
                v-model="scope.row.materialClassIds"
                placeholder="试试搜索：名称、种类或材质"
                :options="mateOption"
                :props="props"
                filterable
                style="width:235px"
                @change="() =>{scope.row.rules.detailId = false;materialChange(scope.row);}"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center">
          <el-table-column label="规格" align="center" min-width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="`${scope.row.specification || '暂未填写'}`" placement="top">
                <div class="mask-td number-input">
                  <div :class="{'mask-red': scope.row.rules.specification}" />
                  <el-input v-model="scope.row.specification" size="small" placeholder="规格" @change="() => {scope.row.rules.specification = false;}" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="`定尺长度(m)`" align="center" min-width="100">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="`${scope.row.length || 0}`" placement="top">
                <div class="mask-td number-input">
                  <div :class="{'mask-red': scope.row.rules.length}" />
                  <el-input-number v-model="scope.row.length" controls-position="right" :min="0" :precision="3" size="mini" @change="() => {scope.row.rules.length = false;calcNetWeight(scope.row)}" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column prop="province" :label="`数量 \n (根)`" align="center" min-width="85">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="`${scope.row.number || 0}`" placement="top">
              <div class="mask-td number-input">
                <div :class="{'mask-red': scope.row.rules.number}" />
                <el-input-number v-model="scope.row.number" controls-position="right" :min="1" :step="5" :precision="0" size="mini" @change="() => {scope.row.rules.number = false;calcNetWeight(scope.row)}" />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="province" :label="`总重 \n (t)`" align="center" min-width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="`${scope.row.weight || 0}`" placement="top">
              <div class="mask-td number-input">
                <div :class="{'mask-red': scope.row.rules.weight}" />
                <el-input-number v-model="scope.row.weight" controls-position="right" :min="0" :step="0.5" :precision="DECIMAL_NUMBER.ton" size="mini" @change="() => {scope.row.rules.weight = false;calcTotal();calcNetWeight(scope.row)}" />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="province" :label="`采购单价 \n (t/元)`" align="center" min-width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="`${scope.row.purchasePrice || 0}`" placement="top">
              <div class="mask-td number-input">
                <div :class="{'mask-red': scope.row.rules.purchasePrice}" />
                <el-input-number v-model="scope.row.purchasePrice" controls-position="right" :min="0" :step="100" :precision="2" size="mini" style="width:160px" @change="() => {scope.row.rules.purchasePrice = false;calcTotal()}" />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="province" :label="`总额 \n (元)`" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="mask-td">
              <el-tag v-if="scope.row.taxIncludedAmount !== null && scope.row.taxIncludedAmount !== undefined && scope.row.taxIncludedAmount !== ''" type="success" size="medium">{{ scope.row.taxIncludedAmount }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="province" :label="`单位净重 \n (kg/㎡)`" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="mask-td">
              <el-tag type="warning" size="medium">{{ scope.row.netWeight || '0.00' }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="province" label="品牌" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="mask-td">
              <div :class="{'mask-red': scope.row.rules.brand}" />
              <el-input v-model="scope.row.brand" size="small" placeholder="品牌" @change="scope.row.rules.brand = false" />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="province" label="供应商" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="mask-td">
              <div :class="{'mask-red': scope.row.rules.supplierId}" />
              <el-select v-model="scope.row.supplierId" size="small" filterable clearable placeholder="供应商" @change="scope.row.rules.supplierId = false">
                <el-option
                  v-for="item in supplierList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="province" label="炉批号" align="center" min-width="170">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="`${scope.row.furnaceLotNumber || '暂未填写'}`" placement="top">
              <div class="mask-td">
                <div :class="{'mask-red': scope.row.rules.furnaceLotNumber}" />
                <el-input v-model="scope.row.furnaceLotNumber" placeholder="炉批号" size="small" />
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="supplierId" label="计量方式" align="center" width="100">
          <template slot-scope="scope">
            <div class="mask-td">
              <div :class="{'mask-red': scope.row.rules.measurementType}" />
              <el-select v-model="scope.row.measurementType" size="small" filterable clearable placeholder="计量" @change="scope.row.rules.measurementType = false">
                <el-option
                  v-for="item of materialMeasure"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="65">
          <template slot-scope="scope">
            <div class="mask-td" style="justify-content:left">
              <el-button size="small" class="el-icon-delete" type="danger" @click="deleteRow(scope.$index)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-drawer">
        <el-button class="cancel-btn" size="small" icon="el-icon-circle-plus-outline" type="warning" style="margin-right:15px" @click="addRow()">继续添加</el-button>

      </div>
    </div>
    <div class="footer-toolbar">
      <div class="footer-toolbar-drawer">
        <div class="price-drawer">
          <div class="price-total-tip">
            <span>合计</span>
          </div>
          <div class="price-total-num">
            <span>{{ totalAmount }}元</span>
          </div>
          <div class="price-total-tip">
            <span>大写</span>
          </div>
          <div class="price-total-num" style="width:60%">
            <span>{{ totalAmount | digitUppercase }}</span>
          </div>
        </div>
        <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="closeDlg">返回</el-button>
        <el-popover v-model="successVisible" placement="top" width="160" trigger="click">
          <p>确认提交？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="successVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="()=> {successVisible = false;submitScrap()}">确定</el-button>
          </div>
          <el-button slot="reference" :loading="submitLoading" type="primary" size="small" icon="el-icon-s-promotion" style="margin-left:10px;">提交入库清单</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeTreeEmptyFiled, getNodeInfoByIds, getCascaderNameByIds, getNodeIdsById } from '@/utils'
import { MATERIAL_BASE_TYPE, MATERIAL_MEASURE, DAY_PICKER_OPTION, MATERIAL_INBOUND_TYPE } from '@/utils/conventionalContent'
import { changeProjectToCascadeByYear, calcWeightByMateName } from '@/utils/other'
import { fetchMaterialTree } from '@/api/material'
import { fetchListByBaseType } from '@/api/supplier'
import { fetchProjectGroupByYear } from '@/api/project'
import { createInboundList } from '@/api/warehouse'
export default {
  name: 'SteelComponent',
  props: {
    resetData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pickerOptions: DAY_PICKER_OPTION,
      currentBaseType: MATERIAL_BASE_TYPE.steel, // 型钢物料类型
      materialMeasure: MATERIAL_MEASURE, // 计量方式
      materialInboundType: MATERIAL_INBOUND_TYPE,
      successVisible: false,
      provideMateCheck: false,
      dailyMateCheck: false,
      props: { value: 'id', label: 'name', children: 'childrenList', expandTrigger: 'hover' }, // 级联列表格式
      mateOption: [], // 物料级联列表
      supplierList: [], // 供应商列表
      submitLoading: false, // 提交load
      inboundList: {
        storageTime: undefined,
        type: 0,
        formType: undefined,
        projectId: undefined
      }, // 入库清单
      tableData: [], // 列表数据
      rules: {
        detailId: false, // 物料编号
        length: false, // 长
        specification: false, // 规格
        purchasePrice: false, // 单价
        number: false, // 数量
        weight: false, // 总重
        supplierId: false, // 供应商
        measurementType: false, // 计量方式
        brand: false, // 品牌
        color: false // 颜色
      },
      needValid: {
        detailId: true, // 物料编号
        length: true, // 长
        specification: true, // 规格
        purchasePrice: true, // 单价
        number: true, // 数量
        weight: true, // 总重
        supplierId: true, // 供应商
        measurementType: true, // 计量方式
        brand: true // 品牌
      },
      provideMateValid: {
        detailId: true, // 物料编号
        length: true, // 长
        specification: true, // 规格
        number: true, // 数量
        measurementType: true, // 计量方式
        weight: true // 总重
      },
      totalAmount: 0, // 总金额
      currentProjectId: [], // 需要入库的项目
      projectCascadeList: [] // 项目级联列表
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    resetData(newVal, oldVal) {
      this.initData()
    }
  },
  async created() {
    await this.getMaterialClassTree(this.currentBaseType.index)
    await this.getProjectYearCascade()
    await this.getSupplierList(this.currentBaseType.index)
    this.initData()
  },
  methods: {
    initData() {
      this.tableData = []
      if (this.resetData && this.resetData.detailList && this.resetData.detailList.length > 0) {
        this.tableData = this.resetData.detailList.map(l => {
          l.rules = { ...this.rules }
          l.materialClassIds = [l.typeId, l.classId, l.detailId]
          this.calcNetWeight(l)
          return l
        })
        // 是项目则为日常备料
        this.dailyMateCheck = !this.resetData.projectId
        this.provideMateCheck = +this.resetData.type === this.materialInboundType.partyA
        if (this.resetData.projectId) {
          this.currentProjectId = getNodeIdsById(this.projectCascadeList, this.resetData.projectId)
        }
        this.calcTotal()
      } else {
        this.tableData.push({ rules: { ...this.rules }})
      }
      this.inboundList.storageTime = new Date().getTime()
      this.inboundList.formType = this.currentBaseType.index
    },
    submitScrap() {
      this.submitLoading = true
      this.validSubmit().then(({ data }) => {
        console.log(data)
        createInboundList(data).then(({ code, message }) => {
          if (code === 200) {
            this.$message({ message: '保存成功', type: 'success' })
            // this.$emit('closeEvent')
            this.tableData = [{ rules: { ...this.rules }}]
          } else {
            this.$message({ message: message, type: 'error' })
          }
          this.submitLoading = false
        }).catch(e => {
          this.submitLoading = false
          this.$message({ message: '保存失败', type: 'error' })
        })
        this.submitLoading = false
      }).catch(e => {
        this.submitLoading = false
      })
    },
    /**
     * 获取项目年份级联列表
     */
    getProjectYearCascade: async function() {
      try {
        const { data, code, message } = await fetchProjectGroupByYear()
        if (code === 200) {
          // this.projectCascadeList = changeProjectToCascadeByYear(data, '入库总额(万元)', 'totalPrice')
          this.projectCascadeList = changeProjectToCascadeByYear(data)
        } else {
          this.$message.error(message)
        }
      } catch (error) {
        this.$message.error('获取项目级联列表失败')
      }
    },
    /**
     * 获取物料列表
     */
    getMaterialClassTree: async function(baseType) {
      try {
        const { data, code, message } = await fetchMaterialTree(baseType)
        if (code === 200) {
          if (data && data.length) {
            this.mateOption = data
            // setInfoOfTree(this.mateOption, 'childrenList', 'name', 'otherInfo', 2)
            this.mateOption = removeTreeEmptyFiled(this.mateOption, 'childrenList')
          }
        } else {
          this.$message({
            message: message,
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          message: '获取物料失败',
          type: 'error'
        })
        console.log(error)
      }
    },
    getSupplierList: async function(baseType) {
      try {
        const { data, code, message } = await fetchListByBaseType(baseType)
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
      } catch (error) {
        this.$message({
          message: '拉取供应商信息失败',
          type: 'error'
        })
        console.log(error)
      }
    },
    materialChange: function(item) {
      if (item.materialClassIds && item.materialClassIds.length === 3) {
        const _materialNode = getNodeInfoByIds(this.mateOption, item.materialClassIds, 'id', 'childrenList')
        item.materialCode = _materialNode.otherInfo
        item.detailId = item.materialClassIds[2]
      }
    },
    projectChange: function() {
      this.inboundList.projectId = this.currentProjectId[1]
    },
    inboundTypeChange: function(check) {
      if (check) {
        this.currentProjectId = []
        this.inboundList.projectId = undefined
      }
    },
    calcTotal: function() {
      let totalAmount = 0
      this.tableData.forEach(v => {
        if (v.purchasePrice === undefined || v.weight === undefined) {
          v.taxIncludedAmount = undefined
        } else {
          v.taxIncludedAmount = ((v.purchasePrice || 0) * (v.weight || 0)).toFixed(2)
        }
        totalAmount += Number(v.taxIncludedAmount)
      })
      this.totalAmount = totalAmount
    },
    calcNetWeight: function(item) {
      const length = item.length || 0
      const number = item.number || 0
      const weight = item.weight || 0
      if (length && number && weight) {
        item.netWeight = (item.weight * 1000 / number / length).toFixed(2)
      } else {
        item.netWeight = '0.00'
      }
    },
    /**
     * 型钢无需自动计算
     * TODO: 方法弃用
     */
    calcMateTotalWeight: function(item) {
      const length = item.length || 0
      const width = item.width || 0
      const thickness = item.thickness || 0
      const number = item.number || 0
      const name = getCascaderNameByIds(this.mateOption, item.materialClassIds, 'id', 'childrenList')
      if (length && width && thickness && number) {
        item.weight = Number((calcWeightByMateName(length, width, thickness, number, name) / 1000).toFixed(this.DECIMAL_NUMBER.ton))
        item.netWeight = (item.weight * 1000 / number / length / width).toFixed(2)
        item.rules.weight = false
      } else {
        item.weight = undefined
        item.netWeight = '0.00'
      }
    },
    validSubmit() {
      return new Promise((resolve, reject) => {
        if (!this.dailyMateCheck) {
          if (!this.inboundList.projectId) {
            this.notifyFun({ title: `${this.currentBaseType.name}入库`, message: '请选择入库项目或选择日常备料', type: 'warning' })
            reject()
          }
        }
        if (!this.inboundList.storageTime) {
          this.notifyFun({ title: `${this.currentBaseType.name}入库`, message: '请选择入库时间', type: 'warning' })
          reject()
        }
        this.clearAllValid()
        const _tableData = JSON.parse(JSON.stringify(this.tableData))
        if (!_tableData || _tableData.length < 1) {
          this.notifyFun({ title: `${this.currentBaseType.name}入库`, message: '请添加入库记录', type: 'warning' })
          reject()
        }
        let errorFlag = false
        _tableData.forEach(v => {
          const _valid = this.provideMateCheck ? this.provideMateValid : this.needValid
          for (const r in _valid) {
            if (_valid[r] && (v[r] === undefined || v[r] === null)) {
              v.rules[r] = true
              errorFlag = true
            }
          }
        })
        this.tableData = JSON.parse(JSON.stringify(_tableData))
        if (errorFlag) {
          this.notifyFun({ title: `${this.currentBaseType.name}入库`, message: '请修正表格中标红的信息', type: 'warning' })
          reject()
          return
        }
        _tableData.forEach(v => {
          delete v.materialClassIds
          delete v.rules
        })
        const _inboundList = JSON.parse(JSON.stringify(this.inboundList))
        _inboundList.detailList = _tableData
        _inboundList.totalPrice = this.totalAmount
        resolve({ data: _inboundList })
      })
    },
    clearAllValid: function() {
      this.tableData.forEach(v => {
        for (const r in this.rules) {
          v.rules[r] = false
        }
      })
    },
    // 添加行
    addRow: function() {
      this.tableData.push({ rules: { ...this.rules }})
    },
    // 删除行
    deleteRow: function(index) {
      this.tableData.splice(index, 1)
      this.calcTotal()
    },
    notifyFun: function({ message, type, title }) {
      setTimeout(() => {
        this.$notify({ title: title, message: message, type: type })
      }, 50)
    },
    changeProvide: function(check) {
      this.inboundList.type = check ? 1 : 0
    },
    closeDlg() {
      this.$emit('closeEvent')
    }
  }
}
</script>

<style scoped>
.content-container {
  margin-bottom: 60px;
}
.filter-item {
  margin-right: 20px;
}
.page-container {
  position: relative;
  padding: 0;
}
.footer-drawer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.list-info-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.list-info-item >span {
  font-weight: bold;
  font-size: 15px;
  margin-right: 10px;
}

.list-info-item >span:nth-child(2) {
  font-weight: 300
}

.footer-toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 45px;
  box-shadow: 0 -1px 2px rgba(0,0,0,.03);
  background: #ffffff;
  /* border-top: 1px solid #e9e9e9; */
  padding: 0 25px 0 0;
  transition: .3s;
  z-index: 14;
}
.footer-toolbar-drawer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.price-drawer {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
}
.price-total-tip {
  width: 60px;
  height: 100%;
  background-color: #606266;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.08);
}
.price-total-num {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* color: #ffffff; */
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}

</style>
<style>
.inbound-table .el-table .cell {
  padding: 0;
}
.inbound-table .el-table .el-table--border th:first-child .cell, .el-table--border td:first-child .cell {
  padding:  0
}
.inbound-table .el-table--border th:first-child .cell, .el-table--border td:first-child .cell {
  padding:  0
}
.inbound-table .el-table--medium td {
  padding: 0;
}
.number-input .el-input-number.is-controls-right .el-input__inner {
  padding-left: 0;
  padding-right: 25px;
}
</style>
