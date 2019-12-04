<template>
  <!-- 页面主容器 -->
  <div class="page-container in-warehouse-verify-index">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-radio-group v-model="listQuery.formType" size="medium" @change="handleFilter">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button :label="4">一般物料</el-radio-button>
            <el-radio-button :label="0">钢板</el-radio-button>
            <el-radio-button :label="1">型钢</el-radio-button>
            <el-radio-button :label="2">彩卷/带钢</el-radio-button>
            <el-radio-button :label="3">成品围护</el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-item">
          <el-radio-group v-model="checkHasProject" size="medium" @change="projectTypeChange">
            <el-radio-button :label="false">常规退料</el-radio-button>
            <el-radio-button :label="true">项目退料</el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-item">
          <el-cascader
            v-model="currentProjectId"
            placeholder="试试搜索：项目名称"
            :options="projectCascadeList"
            :props="{ value: 'id', label: 'name', children: 'children', expandTrigger: 'hover' }"
            :disabled="!checkHasProject"
            :show-all-levels="false"
            filterable
            clearable
            style="width:250px"
            @change="projectChange"
          />
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box">
        <div class="filter-item">
          <el-button type="primary" size="medium" icon="el-icon-view" @click="topDrawerVisible = true">查看所有项目退料总额</el-button>
        </div>
      </div>
    </div>
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-radio-group v-model="listQuery.status" size="medium" @change="handleFilter">
            <el-radio-button :label="undefined">全部</el-radio-button>
            <el-radio-button :label="0">未审核</el-radio-button>
            <el-radio-button :label="1">已通过</el-radio-button>
            <el-radio-button :label="2">已退回</el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-item">
          <el-date-picker
            v-model="listQuery.month"
            type="month"
            value-format="timestamp"
            placeholder="选择月"
            @change="dateChange"
          />
        </div>
        <div class="filter-item">
          <el-input v-model="listQuery.className" placeholder="请输入物料种类名称" class="input-with-select" @keyup.enter.native="handleFilter">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="handleFilter" />
          </el-input>
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table
        v-loading="listLoading"
        :data="listData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="100" />
        <el-table-column prop="projectName" label="项目名称" align="center" />
        <el-table-column prop="formType" label="物料类型" align="center">
          <template slot-scope="scope">
            <span>{{ materialBaseNum[scope.row.formType] ? materialBaseNum[scope.row.formType].name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="returnWarehouseTime" label="退料申请日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.returnWarehouseTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="returnWarehouseListNo" label="退料凭证号" align="center" />
        <el-table-column prop="totalPrice" label="退料额(元)" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.totalPrice || scope.row.totalPrice == 0">{{ scope.row.totalPrice | toFixed(2) }}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column prop="className" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == 1 ? 'success' : scope.row.status == 2 ? 'danger' : 'warning'" size="medium">{{ outboundReturnVerifyStatus[scope.row.status] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-view" @click="openDetail(scope.row)">查看</el-button>
            <el-button v-permission="[pDownloadExcel.v]" type="success" :loading="exportLoad[scope.$index]" icon="el-icon-download" size="small" @click="downloadExcel(scope.row,scope.$index)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination v-show="total > 0" :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 其他模块（例如弹窗等） -->
    <el-dialog
      :title="`${ materialBaseNum[currentData.formType] ? materialBaseNum[currentData.formType].name : ''}退料详情：${currentData.returnWarehouseListNo}`"
      :visible.sync="detailVisible"
      :fullscreen="true"
    >
      <div slot="title" class="dialog-title">
        <span>{{ `${ materialBaseNum[currentData.formType] ? materialBaseNum[currentData.formType].name : ''}退料详情：${currentData.returnWarehouseListNo}` }}</span>
        <el-tag effect="dark" :type="currentData.status == 1 ? 'success' : currentData.status == 2 ? 'danger' : 'warning'" size="small">{{ outboundReturnVerifyStatus[currentData.status] }}</el-tag>
      </div>
      <component v-bind="materialProps()" @closeEvent="detailVisible = false" @refreshEvent="refreshInfo" />
    </el-dialog>

    <el-drawer
      title="项目退料汇总"
      :visible.sync="topDrawerVisible"
      direction="rtl"
      size="50%"
    >
      <Summary :visible="topDrawerVisible" />
    </el-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import GeneralMat from '@/views/component/outboundReturnDetail/generalMate'
import SteelPlate from '@/views/component/outboundReturnDetail/steelPlate'
import Steel from '@/views/component/outboundReturnDetail/steel'
import StripSteel from '@/views/component/outboundReturnDetail/stripSteel'
import Enclosure from '@/views/component/outboundReturnDetail/enclosure'
import Summary from '@/views/component/outboundReturnDetail/outboundReturnSummary'
import { changeProjectToCascadeByYear } from '@/utils/other'
import { MATERIAL_BASE_TYPE, MATERIAL_BASE_NUM, OUTBOUND_RETURN_VERIFY_STATUS } from '@/utils/conventionalContent'
import { downloadExcel as pDownloadExcel } from '@/utils/permission'
import { fetchProjectGroupByYear } from '@/api/project'
import { fetchOutboundReturnList as fetchList, fetchOutboundReturnListByRoles as fetchListByRoles } from '@/api/warehouse'
import { exportOutboundReturnExcelByOrderId as exprotDetailExcel } from '@/api/exportFiles'

const materialBaseNum = MATERIAL_BASE_NUM
materialBaseNum[MATERIAL_BASE_TYPE.material.index].component = 'GeneralMat'
materialBaseNum[MATERIAL_BASE_TYPE.steelPlate.index].component = 'SteelPlate'
materialBaseNum[MATERIAL_BASE_TYPE.steel.index].component = 'Steel'
materialBaseNum[MATERIAL_BASE_TYPE.stripSteel.index].component = 'StripSteel'
materialBaseNum[MATERIAL_BASE_TYPE.enclosure.index].component = 'Enclosure'

export default {
  name: 'FinancialOutboundReturnVerify',
  // eslint-disable-next-line
  components: { GeneralMat, SteelPlate, Steel, StripSteel, Enclosure, Summary },
  data() {
    return {
      pDownloadExcel,
      materialBaseType: MATERIAL_BASE_TYPE,
      outboundReturnVerifyStatus: OUTBOUND_RETURN_VERIFY_STATUS,
      materialBaseNum,
      priceControl: false,
      checkHasProject: false,
      topDrawerVisible: false,
      detailVisible: false,
      exportLoad: [],
      currentData: {},
      currentProjectId: [], // 当前项目id：[年份,项目id]
      projectCascadeList: [], // 项目级联列表
      listLoading: false, // 列表load
      listData: [], // 列表数据
      total: 0,
      listQuery: {
        className: undefined,
        startDate: undefined,
        endDate: undefined,
        projectId: undefined,
        formType: undefined,
        status: undefined,
        month: undefined,
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.getProjectYearCascade()
    this.listQuery.month = new Date()
    this.dateChange()
  },
  methods: {
    downloadExcel: function(row, index) {
      this.$set(this.exportLoad, index, true)
      exprotDetailExcel({ id: row.id }).then(() => {
        this.$set(this.exportLoad, index, false)
      }).catch(e => {
        this.$set(this.exportLoad, index, false)
        this.$message({ message: '导出失败', type: 'error' })
      })
    },
    getList: async function() {
      this.listLoading = true
      if (this.listQuery.projectId === undefined && this.checkHasProject) {
        this.listQuery.projectId = 0
      }
      try {
        const { data, code, message } = this.priceControl ? await fetchListByRoles(this.listQuery) : await fetchList(this.listQuery)
        if (code === 200) {
          this.listData = []
          if (data && data.data && data.totalCount) {
            this.listData = data.data
            this.total = data.totalCount
          }
        } else {
          this.$message({ message: message, type: 'error' })
        }
      } catch (error) {
        this.$message({ message: '获取退料清单失败', type: 'error' })
        console.log(error)
      } finally {
        this.listLoading = false
      }
    },
    materialProps: function() {
      if (!this.currentData || (!this.currentData.formType && this.currentData.formType !== 0)) {
        return {
          is: 'span'
        }
      }
      return {
        is: this.materialBaseNum[this.currentData.formType].component,
        detailId: this.currentData.id,
        isVerify: true
      }
    },
    refreshInfo: function(data) {
      this.currentData.status = data
    },
    openDetail(item) {
      this.currentData = item
      this.detailVisible = true
    },
    // 搜索界面
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // page组件相关
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    /**
     * 获取项目年份级联列表
     */
    getProjectYearCascade: function() {
      fetchProjectGroupByYear().then(({ data, code, message }) => {
        if (code === 200) {
          this.projectCascadeList = changeProjectToCascadeByYear(data)
        } else {
          this.$message.error(message)
        }
      }).catch(e => {
        this.$message.error('获取项目级联列表失败')
      })
    },
    projectChange: function() {
      this.listQuery.projectId = this.currentProjectId[1]
      this.handleFilter()
    },
    projectTypeChange: function(check) {
      if (!check) {
        this.currentProjectId = []
        this.listQuery.projectId = undefined
      }
      this.handleFilter()
    },
    dateChange: function() {
      this.listQuery.startDate = this.listQuery.month ? moment(this.listQuery.month).startOf('month').format('YYYY-MM-DD') : ''
      this.listQuery.endDate = this.listQuery.month ? moment(this.listQuery.month).endOf('month').format('YYYY-MM-DD') : ''
      this.handleFilter()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
<style>
.in-warehouse-verify-index .filter-item .el-input-group__append, .el-input-group__prepend {
  background-color: #1890ff;
  color: #ffffff;
  border: none;
}
.dialog-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.dialog-title >span {
  margin-right: 10px;
}
.dialog-title >span:nth-child(1)  {
  font-weight: bold;
  font-size: 18px;
}
</style>
