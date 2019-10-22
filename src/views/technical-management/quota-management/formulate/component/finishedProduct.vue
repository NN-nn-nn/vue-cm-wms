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
          width="70"
        />
        <el-table-column
          label="日期"
          align="center"
          width="100"
        >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号"
          align="center"
          width="70"
        />
        <el-table-column label="物料类别" align="center">
          <el-table-column prop="name" label="名称" align="center" width="80">
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

          <el-table-column prop="kind" label="种类" align="center" width="80">
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

          <el-table-column prop="material" label="材质" align="center" width="80">
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
          <el-table-column prop="model" label="型号" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory">{{ scope.row.model }}</span>
              <el-input v-else v-model="scope.row.model" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column prop="long" label="长(m)" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isHistory">{{ scope.row.long }}</span>
              <el-input v-else v-model="scope.row.long" placeholder="" />
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
          label="颜色"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory">{{ scope.row.color }}</span>
            <el-input v-else v-model="scope.row.color" placeholder="" />
          </template>

        </el-table-column>
        <el-table-column
          label="总重(kg)"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.weight }}</template>
        </el-table-column>
        <el-table-column label="库存查询" width="100" align="center">
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
          width="310"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.remarks }}</span>
            <el-input v-else v-model="scope.row.remarks" placeholder="" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isHistory"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editHandle(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.isHistory =='0'"
              size="mini"
              type="success"
              icon="el-icon-circle-plus-outline"
            >确定</el-button>
            <el-button
              v-if="scope.row.isHistory == '0'"
              size="mini"
              type="warning"
              icon="el-icon-refresh"
              @click="cancelHandle(scope.$index, scope.row)"
            >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="formulate-btn">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addHandle">添加</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="confirmHandle">确定</el-button>
      </div>
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
        number: '21',
        remarks: '有库存',
        isHistory: 1,
        long: 10,
        model: 10,
        thick: 10,
        formModal: {
          name: '钢板',
          kind: '油漆',
          material: 'Q255',
          color: '蓝色',
          unit: '吨'
        }
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
    queryInventory(index, item) {

    },
    exportHandle() { // 记录导出

    },
    addHandle() {
      const newObj = {
        number: '',
        remarks: '',
        formModal: {
          name: '',
          kind: '',
          material: '',
          color: '',
          unit: ''
        }
      }
      this.data.push(newObj)
    },
    editHandle(index, item) { // 修改每一天数据
      item.isHistory = 0
      this.data[index].isHistory = 0
      console.log(item)
    },
    cancelHandle(index, item) {
      item.isHistory = 1
    },
    confirmHandle() { // 确定新增
      let paramsArr = []
      paramsArr = this.data.filter(v => {
        return !v.isHistory
      })
      paramsArr.forEach(v => {

      })
    }
  }
}
</script>

<style scoped>
</style>
