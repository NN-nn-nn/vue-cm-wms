<template>
  <!-- 页面主容器 -->
  <div class="page-container price-control">
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
      <div class="card-box">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>价格显示控制</span>
            <el-button v-permission="[pagePermission.o]" :loading="savePriceShowLoading" type="primary" size="small" @click="submitPriceShow()">保存</el-button>
          </div>
          <div>
            <el-form ref="priceShowForm" :model="priceShowData">
              <el-form-item label="物料仓" :label-width="'100px'" prop="length">
                <div class="form-item-margin-left">
                  <el-radio-group v-model="priceShowData.materialWarehouse" :disabled="!checkPermission([pagePermission.o])">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item label="入库审核" :label-width="'100px'" prop="length">
                <div class="form-item-margin-left">
                  <el-radio-group v-model="priceShowData.inboundAudit" :disabled="!checkPermission([pagePermission.o])">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item label="出库记录" :label-width="'100px'" prop="length">
                <div class="form-item-margin-left">
                  <el-radio-group v-model="priceShowData.outboundRecord" :disabled="!checkPermission([pagePermission.o])">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item label="退库审核" :label-width="'100px'" prop="length">
                <div class="form-item-margin-left">
                  <el-radio-group v-model="priceShowData.returnRecord" :disabled="!checkPermission([pagePermission.o])">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item label="出库退料" :label-width="'100px'" prop="length">
                <div class="form-item-margin-left">
                  <el-radio-group v-model="priceShowData.outboundReturnRecord" :disabled="!checkPermission([pagePermission.o])">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { configPriceControl as pagePermission, checkPermission } from '@/utils/permission' // 权限判断函数
import { fetchPriceShowDetail, updatePriceShowDetail } from '@/api/config'

export default {
  name: 'ConfigPriceControl',
  data() {
    return {
      pagePermission,
      savePriceShowLoading: false,
      priceShowData: {
        materialWarehouse: undefined,
        inboundAudit: undefined,
        outboundRecord: undefined,
        returnRecord: undefined,
        outboundReturnRecord: undefined
      }
    }
  },
  created() {
    this.getPriceShowDetail()
  },
  methods: {
    checkPermission,
    getPriceShowDetail: async function() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const { data, code, message } = await fetchPriceShowDetail()
        if (code === 200) {
          this.$set(this.priceShowData, 'materialWarehouse', data.materialWarehouse)
          this.$set(this.priceShowData, 'inboundAudit', data.inboundAudit)
          this.$set(this.priceShowData, 'outboundRecord', data.outboundRecord)
          this.$set(this.priceShowData, 'returnRecord', data.returnRecord)
          this.$set(this.priceShowData, 'outboundReturnRecord', data.outboundReturnRecord)
        } else {
          this.$message({
            message: `${message}。查询失败，请刷新页面`,
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          message: `查询失败，请刷新页面`,
          type: 'error'
        })
      } finally {
        loading.close()
      }
    },
    submitPriceShow: async function() {
      try {
        this.savePriceShowLoading = true
        const { code, message } = await updatePriceShowDetail(this.priceShowData)
        if (code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: message,
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      } finally {
        this.savePriceShowLoading = false
      }
    }
  }
}
</script>

<style scoped>
    .form-item-margin-left{
        margin-left: 40px;
    }
    .box-card {
        width: 480px;
        margin: 0 20px 20px 0;
    }
    .scrap-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        /* height: 60px; */
    }
    .scrap-title {
        font-size: 30px;
    }
    .scrap-tip {
        color: red;
    }
    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
</style>
