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
        style="width: 100%"
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
          width="150"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号"
          align="center"
          width="80"
        />
        <el-table-column label="物料类别" align="center">
          <el-table-column prop="name" label="名称" align="center" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.name }}</span>
              <el-select v-else v-model="scope.row.name" placeholder="请选择">
                <el-option
                  v-for="item in nameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="kind" label="种类" align="center" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.kind }}</span>
              <el-select v-else v-model="scope.row.kind" placeholder="请选择">
                <el-option
                  v-for="item in kindList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="material" label="材质" align="center" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.material }}</span>
              <el-select v-else v-model="scope.row.material" placeholder="请选择">
                <el-option
                  v-for="item in materialList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="规格" align="center">
          <el-table-column prop="long" label="长(m)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory">{{ scope.row.long }}</span>
              <el-input v-else v-model="scope.row.long" placeholder="" />
            </template>
          </el-table-column>

          <el-table-column prop="width" label="宽(m)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory">{{ scope.row.width }}</span>
              <el-input v-else v-model="scope.row.width" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column prop="thick" label="厚(mm)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory">{{ scope.row.thick }}</span>
              <el-input v-else v-model="scope.row.thick" placeholder="" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="数量(张)"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory">{{ scope.row.quantity }}</span>
            <el-input v-else v-model="scope.row.quantity" placeholder="" />
          </template>

        </el-table-column>
        <el-table-column
          label="总重(kg)"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.weight }}</template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.remarks }}</span>
            <el-input v-else v-model="scope.row.remarks" placeholder="" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechQuotaFormuSteelPlate',
  data() {
    return {
      date: '',
      searchInp: '',
      data: [{
        date: '2016-05-03',
        number: '',
        name: '',
        kind: '',
        material: '',
        long: '',
        width: '',
        thick: '',
        quantity: '',
        weight: 0,
        remarks: ''
      }],
      multipleSelection: [],
      nameList: [{
        label: '钢板',
        value: 0
      }],
      kindList: [{
        label: '油漆',
        value: 0
      }],
      materialList: [{
        label: 'Q2555',
        value: 0
      }]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    exportHandle() { // 记录导出

    }
  }
}
</script>

<style scoped>

</style>
