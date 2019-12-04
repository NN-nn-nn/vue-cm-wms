<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-radio-group v-model="checkHasProject" size="medium" @change="projectTypeChange">
            <el-radio-button :label="false">常规</el-radio-button>
            <el-radio-button :label="true">项目</el-radio-button>
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
            style="width:250px"
            @change="projectChange"
          />
        </div>
        <div class="filter-item">
          <el-date-picker
            v-model="listQuery.month"
            type="month"
            value-format="timestamp"
            placeholder="选择月"
            :clearable="false"
            @change="getList"
          />
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box" />
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table v-loading="listLoading" :data="tableData" max-height="700" style="width: 100%" border stripe>
        <el-table-column label="序号" align="center" type="index" width="80" />
        <el-table-column prop="name" align="center" label="分类" width="180" />
        <el-table-column prop="money" label="金额(万元)" align="center" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.money || scope.row.money === 0" type="success" size="medium">{{ scope.row.money/10000 | toFixed(2) }}</el-tag>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-permission="[pDownloadExcel.v]" type="success" :loading="exportLoad[scope.$index]" icon="el-icon-download" size="small" @click="downloadExcel(scope.row,scope.$index)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
import moment from 'moment'
import { downloadExcel as pDownloadExcel } from '@/utils/permission'
import { changeProjectToCascadeByYear } from '@/utils/other'
import { fetchProjectGroupByYear } from '@/api/project'
import { fetchProjectDataAnalysisByMonth as fetchList } from '@/api/warehouse'
import { exportProjectSummaryExcel as exportExcel } from '@/api/exportFiles'

export default {
  name: 'FinancialReportDetail',
  data() {
    return {
      pDownloadExcel,
      listQuery: {
        startDate: undefined,
        endDate: undefined,
        projectId: undefined,
        month: undefined
      },
      total: 0,
      listLoading: false,
      tableData: [],
      exportLoad: [],
      currentProjectId: [], // 当前项目id：[年份,项目id]
      projectCascadeList: [], // 项目级联列表
      checkHasProject: false
    }
  },
  created() {
    this.getProjectYearCascade()
    this.listQuery.month = new Date().getTime()
    // this.dateChange()
    this.getList()
  },
  methods: {
    downloadExcel: async function(row, index) {
      try {
        this.$set(this.exportLoad, index, true)
        const params = {
          projectId: this.listQuery.projectId,
          type: row.type,
          yearMonth: moment(this.listQuery.month).format('YYYY-MM')
        }
        const flag = await exportExcel(params)
        if (!flag) {
          this.$message({ message: '导出失败', type: 'error' })
        }
      } catch (error) {
        this.$message({ message: '导出失败', type: 'error' })
      } finally {
        this.$set(this.exportLoad, index, false)
      }
    },
    getList: async function() {
      this.listLoading = true
      if (this.listQuery.projectId === undefined && this.checkHasProject) {
        this.listQuery.projectId = 0
      }
      this.listQuery.yearMonth = moment(this.listQuery.month).format('YYYY-MM')
      this.listQuery.type = this.checkHasProject ? 1 : 0
      try {
        const { data, code, message } = await fetchList(this.listQuery)
        if (code === 200) {
          console.log('data------------------------', data)
          this.tableData = data
        } else {
          this.$message({ message: message, type: 'error' })
        }
      } catch (error) {
        this.$message({ message: '获取汇总数据失败', type: 'error' })
        console.log(error)
      } finally {
        this.listLoading = false
      }
    },
    projectTypeChange: function(check) {
      if (check) {
        if (!this.listQuery.projectId && this.projectCascadeList[0] && this.projectCascadeList[0].children[0] && this.projectCascadeList[0].children[0].id) {
          this.currentProjectId.push(this.projectCascadeList[0].id)
          this.currentProjectId.push(this.projectCascadeList[0].children[0].id)
          this.listQuery.projectId = this.currentProjectId[1]
        }
      } else {
        this.currentProjectId = []
        this.listQuery.projectId = undefined
      }
      this.getList()
      // if (!check) {
      //   this.currentProjectId = []
      //   this.listQuery.projectId = undefined
      // }
    },
    projectChange: function() {
      this.listQuery.projectId = this.currentProjectId[1]
      this.getList()
    },
    dateChange: function() {
      this.listQuery.startDate = this.listQuery.month ? moment(this.listQuery.month).startOf('month').format('YYYY-MM-DD') : ''
      this.listQuery.endDate = this.listQuery.month ? moment(this.listQuery.month).endOf('month').format('YYYY-MM-DD') : ''
    },
    /**
     * 获取项目年份级联列表
     */
    getProjectYearCascade: async function() {
      try {
        const { data, code, message } = await fetchProjectGroupByYear()
        if (code === 200) {
          this.projectCascadeList = changeProjectToCascadeByYear(data)
        } else {
          this.$message.error(message)
        }
      } catch (error) {
        this.$message.error('获取项目级联列表失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
