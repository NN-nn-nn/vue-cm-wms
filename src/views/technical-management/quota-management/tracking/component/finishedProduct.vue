<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 查询容器 -->
    <div class="position-rela">
      <!-- 右侧box -->
      <div class="dowmload"><el-button type="primary" class="el-icon-download"> 下载</el-button></div>
    </div>
    <!-- 主要内容容器 -->
    <div class="content-container">
      <el-table v-loading="loading" :data="data" tooltip-effect="dark" stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="70" />
        <el-table-column prop="materialCode" label="编号" align="center" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.materialCode" size="medium">{{ scope.row.materialCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物料类别" align="center" width="120">
          <el-table-column prop="typeName" label="名称" align="center" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.typeName" type="success" size="medium">{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="className" label="种类" align="center" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.className" type="success" size="medium">{{ scope.row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="detailName" label="材质" align="center" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.detailName" type="success" size="medium">{{ scope.row.detailName }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="规格" align="center">
          <el-table-column prop="specification" label="型号" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.specification" size="medium">{{ scope.row.specification }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="length" label="长(m)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.length" size="medium">{{ scope.row.length }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thickness" label="厚(mm)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.thickness" size="medium">{{ scope.row.thickness }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="颜色" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.color }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="定额数量" width="170" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.quotaNumber }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实际采购" width="170" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.actualStorageNumber }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实际使用" width="170" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.actualUseNumber }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="差值" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.difference<0?'red': 'green'">{{ scope.row.difference }}</span>
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
    </div>
  </div>
</template>
<script>
import { quotaTrackList } from '@/api/quotaMmanage'
export default {
  name: 'TechQuotaTrackFinishedProduct',
  props: {
    projectId: {
      type: Number,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      loading: false,
      totalCount: 0,
      field: {
        projectId: '',
        formType: 3,
        page: 1,
        size: 10
      }
    }
  },
  watch: {
    projectId(newVal, oldVal) {
      this.field.projectId = newVal
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.field.projectId = this.projectId
      quotaTrackList(this.field).then(({ data, code, message }) => {
        if (code === 200) {
          this.loading = false
          this.data = data.data
          this.data = this.data.map(v => {
            v.difference = (Number(v.quotaNumber) - Number(v.actualUseNumber)) < 0 ? '+' + Number(v.quotaNumber) - Number(v.actualUseNumber) : Number(v.quotaNumber) - Number(v.actualUseNumber)
            return v
          })
          this.totalCount = data.totalCount
        } else {
          this.loading = false
        }
      }).catch(e => {
        this.loading = false
      })
    },
    sizeChange(val) {
      this.field.size = val
      this.getList()
    },
    pageChange(val) {
      this.field.page = val
      this.getList()
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
.red {
  color: brown;
}
.green {
  color: #00B050;
}
.position-rela {
  position: relative;
}
.dowmload {
  position:absolute;
  top: -60px;
  right: 5px
}
</style>
