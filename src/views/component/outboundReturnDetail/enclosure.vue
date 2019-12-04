<template>
  <!-- 页面主容器 -->
  <div class="page-container outbound-return-record">
    <div :class="{'mask-container':submitLoading}" />
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div v-if="listDetail.projectName" class="filter-item">
          <div class="list-info-item">
            <span>项目：</span>
            <span>{{ listDetail.projectName }}</span>
          </div>
        </div>
        <div class="filter-item">
          <div class="list-info-item">
            <span>退料单提交时间：</span>
            <span>{{ listDetail.storageTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
        </div>
        <div class="filter-item">
          <div class="list-info-item">
            <span>退料申请人：</span>
            <span>{{ listDetail.createUserName }}</span>
          </div>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table v-loading="tableLoading" :data="listDetail.detailList" max-height="600" style="width: 100%" border stripe>
        <el-table-column label="序号" align="center" type="index" min-width="80" />

        <el-table-column prop="materialCode" align="center" label="编号" min-width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.type == materialInboundType.partyA" class="party-tip">甲供</div>
            <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="物料类别" align="center">
          <el-table-column prop="typeName" label="名称" align="center" min-width="90">
            <template slot-scope="scope">
              <div v-if="scope.row.measurementType || scope.row.measurementType == 0" :style="{'background-color': `${materialMeasure[scope.row.measurementType].color}`}" class="party-tip">{{ materialMeasure[scope.row.measurementType].name }}</div>
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="className" label="种类" align="center" min-width="90" />
          <el-table-column prop="detailName" label="材质" align="center" min-width="90" />
        </el-table-column>

        <el-table-column prop="color" label="颜色" align="center" min-width="110" />

        <el-table-column label="规格" align="center">
          <el-table-column prop="specification" label="型号" align="center" min-width="100" />
          <el-table-column prop="length" label="长(m)" align="center" min-width="70">
            <template slot-scope="scope">
              <span>{{ scope.row.length | toFixed(3) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thickness" label="厚(mm)" align="center" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.thickness | toFixed(3) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="number" :label="`数量 \n (张)`" align="center" min-width="70" />

        <el-table-column prop="totalLength" :label="`总长度 \n (m)`" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.totalLength | toFixed(3) }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="purchasePrice" :label="`采购单价 \n (m/元)`" align="center" min-width="130">
          <template slot-scope="scope">
            <div class="mask-td number-input">
              <div :class="{'mask-red': scope.row.priceError}" />
              <template v-if="!isVerify || listDetail.status !== outboundReturnVerify.unfinished">
                <span v-if="scope.row.purchasePrice || scope.row.purchasePrice == 0">{{ scope.row.purchasePrice | toFixed(2) }}</span>
                <span v-else>/</span>
              </template>
              <template v-else>
                <el-input-number v-model="scope.row.purchasePrice" controls-position="right" :min="0" :step="100" :precision="2" size="mini" style="width:160px" @change="scope.row.priceError = false" />
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click"
                >
                  <PriceList
                    :project-id="listDetail.projectId"
                    :material-code="scope.row.materialCode"
                    :thickness="scope.row.theoryThickness"
                    :specification="scope.row.specification"
                    :base-type="scope.row.formType"
                    :price.sync="scope.row.purchasePrice"
                  />
                  <el-button slot="reference" type="primary" size="mini" icon="el-icon-search" style="margin-left:10px;padding:6px" />
                </el-popover>
              </template>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="taxIncludedAmount" :label="`总额 \n (元)`" align="center" min-width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.purchasePrice || scope.row.purchasePrice === 0" type="success" size="medium">{{ (scope.row.totalLength || 0 ) * (scope.row.purchasePrice || 0) | toFixed(2) }}</el-tag>
            <span v-else>/</span>
          </template>
        </el-table-column>

        <el-table-column prop="brand" label="品牌" align="center" min-width="140" />

        <el-table-column prop="supplierName" label="供应商" align="center" min-width="140" />

        <el-table-column prop="warehouse" label="仓库位置" align="center" min-width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="`${scope.row.warehouse || '无'}`" placement="left" :disabled="!scope.row.warehouse">
              <span>{{ scope.row.warehouse }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="footer-toolbar">
      <div class="footer-toolbar-drawer">
        <div class="price-drawer">

          <template v-if="listDetail.totalPrice || listDetail.totalPrice == 0">
            <div class="price-total-tip">
              <span>合计</span>
            </div>
            <div class="price-total-num">
              <span>{{ listDetail.totalPrice }}元</span>
            </div>
            <div class="price-total-tip">
              <span>大写</span>
            </div>
            <div class="price-total-num" style="width:60%">
              <span>{{ listDetail.totalPrice | digitUppercase }}</span>
            </div>
          </template>

        </div>
        <div class="submit-item">
          <el-button type="primary" icon="el-icon-arrow-left" @click="closeDlg">返回</el-button>

          <template v-if="isVerify && listDetail.status === outboundReturnVerify.unfinished">
            <el-popover v-model="retrunVisible" placement="top" width="160" trigger="click">
              <p>确认退回？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="retrunVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="()=> {retrunVisible = false;submitVerifyResult(outboundReturnVerify.return)}">确定</el-button>
              </div>
              <el-button slot="reference" v-permission="['50_203_1']" :loading="submitLoading" type="danger" icon="el-icon-circle-close">退回</el-button>
            </el-popover>

            <el-popover v-model="successVisible" placement="top" width="160" trigger="click">
              <p>确认通过？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="successVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="()=> {successVisible = false;submitVerifyResult(outboundReturnVerify.success)}">确定</el-button>
              </div>
              <el-button slot="reference" v-permission="['50_203_1']" :loading="submitLoading" type="success" icon="el-icon-circle-check">通过</el-button>
            </el-popover>
          </template>

          <template v-if="!isVerify && listDetail.status === 2">
            <el-button type="warning" icon="el-icon-document-copy" @click="resubmit">重新提交</el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriceList from '@/views/component/inbound/priceList'
import { MATERIAL_BASE_TYPE, OUTBOUND_RETURN_VERIFY, OUTBOUND_RETURN_VERIFY_STATUS, MATERIAL_MEASURE, MATERIAL_INBOUND_TYPE } from '@/utils/conventionalContent'
import { fetchOutboundReturnDetailList as fetchDetailList, fetchOutboundReturnDetailListByRoles as fetchDetailListByRoles, verifyOutboundReturnList as verify } from '@/api/warehouse'
export default {
  name: 'InboundStripSteelComponent',
  components: { PriceList },
  props: {
    detailId: {
      type: Number,
      default: 0
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    priceControl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      outboundReturnVerify: OUTBOUND_RETURN_VERIFY,
      outboundReturnVerifyStatus: OUTBOUND_RETURN_VERIFY_STATUS,
      currentBaseType: MATERIAL_BASE_TYPE.enclosure, // 钢板
      materialMeasure: MATERIAL_MEASURE, // 计量方式
      materialInboundType: MATERIAL_INBOUND_TYPE,
      retrunVisible: false,
      successVisible: false,
      submitLoading: false, // 提交load
      tableLoading: false, // 列表加载
      tableData: [], // 列表数据
      listDetail: {}, // 退料清单
      totalAmount: 0 // 总金额
    }
  },
  watch: {
    detailId(newVal, oldVal) {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    resubmit: function() {
      const data = this.listDetail
      this.$router.push({ name: 'WareOutboundReturnApply', params: { resetData: data }})
    },
    getList: async function() {
      this.tableLoading = true
      this.tableData = []
      const queryData = { id: this.detailId }
      try {
        const { data, code, message } = this.priceControl ? await fetchDetailListByRoles(queryData) : await fetchDetailList(queryData)
        if (code === 200) {
          if (data) {
            this.listDetail = data
            if (data && data.detailList) {
              this.listDetail.detailList = data.detailList.map(v => {
                this.$set(v, 'priceError', false)
                if (!v.purchasePrice && v.purchasePrice !== 0) {
                  delete v.purchasePrice
                }
                return v
              })
            }
          }
        } else {
          this.$message({ message: message, type: 'error' })
        }
      } catch (error) {
        this.$message({ message: '获取清单详情失败', type: 'error' })
      } finally {
        this.tableLoading = false
      }
    },
    clearAllValid: function() {
      this.listDetail.detailList.forEach(v => {
        v.priceError = false
      })
    },
    submitVerifyResult: async function(status) {
      const submitData = {
        id: this.detailId,
        status: status
      }
      if (this.outboundReturnVerify.success === status) {
        try {
          await this.validSubmit()
          submitData.details = this.getSubmitInfo()
        } catch (error) {
          return
        }
      }
      this.submitLoading = true
      verify(submitData).then(({ data, code, message }) => {
        if (code === 200) {
          const _message = `当前退料单${this.outboundReturnVerifyStatus[status]}`
          this.$message({ message: _message, type: 'success' })
          this.getList()
          this.updateListInfo(status)
        } else {
          this.$message({ message: message, type: 'error' })
        }
        this.submitLoading = false
      }).catch(e => {
        console.log(e)
        this.$message({ message: '操作失败', type: 'error' })
        this.submitLoading = false
      })
    },
    updateListInfo(status) {
      this.$emit('refreshEvent', status)
    },
    closeDlg() {
      this.$emit('closeEvent')
    },
    validSubmit() {
      return new Promise((resolve, reject) => {
        this.clearAllValid()
        let errorFlag = false
        this.listDetail.detailList.forEach(v => {
          if (+v.type !== this.materialInboundType.partyA && (!v['purchasePrice'] && v['purchasePrice'] !== 0)) {
            v['priceError'] = true
            errorFlag = true
          }
        })
        if (errorFlag) {
          this.$notify({ title: '出库退料审核', message: '请修正表格中标红的信息(填写采购单价)', type: 'warning' })
          reject()
          return
        }
        resolve(true)
      })
    },
    getSubmitInfo: function() {
      if (!this.listDetail.detailList) {
        return []
      }
      const arr = this.listDetail.detailList.map(v => {
        return {
          id: v.id,
          purchasePrice: v.purchasePrice
        }
      })
      return arr || []
    }
  }
}
</script>

<style scoped>
.content-container {
  margin-bottom: 80px;
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
  height: 50px;
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
  width: 80px;
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
.submit-item {
  width: 220px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.submit-item :nth-child(n) {
  margin-left: 5px;
}
</style>
