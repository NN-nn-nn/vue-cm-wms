<template>
  <!-- 页面主容器 -->
  <div class="page-container inbound-price-list">
    <div class="filter-container">
      <!-- 左侧box -->
      <div class="filter-left-box">
        <div class="filter-item">
          <el-date-picker
            v-model="dateArr"
            type="monthrange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="timestamp"
            :picker-options="pickerOptions"
            :clearable="false"
            @change="dateChange"
          />
        </div>
      </div>
      <!-- 右侧box -->
      <div class="filter-right-box">
        <div class="filter-item">
          <el-tooltip class="item" effect="dark" :content="currentTip" placement="right">
            <i class="el-icon-question" style="font-size:20px;" />
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table v-loading="tableLoading" :data="listData" max-height="700" style="width: 100%" border stripe @row-click="rowClick">
        <el-table-column min-width="150" property="date" label="日期" align="center" />
        <el-table-column min-width="150" property="price" label="价格（元）" align="center" />
      </el-table>
    </div>
    <!-- 其他模块（例如弹窗等） -->
  </div>
</template>

<script>
import moment from 'moment'
import { MATERIAL_BASE_TYPE, MONTH_PICKER_OPTION } from '@/utils/conventionalContent'
import { fetchInboundPriceList as fetchList } from '@/api/warehouse'

export default {
  name: 'InboundPriceListComponent',
  props: {
    projectId: {
      type: [String, Number],
      default: undefined
    },
    baseType: {
      type: [String, Number],
      default: undefined
    },
    materialCode: {
      required: true,
      type: String,
      default: undefined
    },
    thickness: {
      type: Number,
      default: undefined
    },
    specification: {
      type: String,
      default: undefined
    },
    price: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      pickerOptions: MONTH_PICKER_OPTION,
      materialBaseType: MATERIAL_BASE_TYPE,
      currentTip:
       `价格查询：
        一般物料： 编号
        彩卷/带钢： 编号 + 厚度
        钢板： 编号 + 厚度
        型钢： 编号 + 规格
        围护： 编号 + 型号

        点击表格中某行可将价格回填`,
      dateArr: [],
      hasSearch: false,
      tableLoading: false,
      listData: []
    }
  },
  watch: {
    projectId(newVal, oldVal) {
      this.propsChange()
    },
    materialCode(newVal, oldVal) {
      this.propsChange()
    },
    thickness(newVal, oldVal) {
      this.propsChange()
    }
  },
  created() {
    const date = new Date().getTime()
    this.dateArr = [date, date]
    this.propsChange()
  },
  methods: {
    propsChange: async function() {
      if (this.hasSearch) return
      this.hasSearch = true
      // 未搜索 有编号和厚度
      await this.getList()
      this.hasSearch = false
    },
    dateChange: function() {
      this.getList()
    },
    getList: async function() {
      try {
        const params = {
          type: this.baseType || 0,
          projectId: this.projectId,
          materialCode: this.materialCode,
          startDate: this.dateArr && this.dateArr.length === 2 ? moment(this.dateArr[0]).startOf('month').format('YYYY-MM-DD') : '',
          endDate: this.dateArr && this.dateArr.length === 2 ? moment(this.dateArr[1]).endOf('month').format('YYYY-MM-DD') : ''
        }
        // 钢板/彩卷
        if (this.baseType === this.materialBaseType.stripSteel.index || this.baseType === this.materialBaseType.steelPlate.index) {
          params.thickness = this.thickness
        }
        // 型钢/围护
        if (this.baseType === this.materialBaseType.steel.index || this.baseType === this.materialBaseType.enclosure.index) {
          params.specification = this.specification
        }

        this.tableLoading = true
        const { data, code, message } = await fetchList(params)
        if (code === 200) {
          this.listData = data
        } else {
          this.$message({ message: message, type: 'error' })
        }
      } catch (error) {
        this.$message({ message: '获取价格列表失败', type: 'error' })
      } finally {
        this.tableLoading = false
      }
    },
    rowClick: function(row, column, event) {
      this.$emit('update:price', row.price)
    }
  }
}
</script>

<style scoped>
.inbound-price-list .filter-container .filter-item {
    margin: 0;
}
</style>
