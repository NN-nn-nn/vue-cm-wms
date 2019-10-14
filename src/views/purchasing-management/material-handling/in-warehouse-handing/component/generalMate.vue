<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="序号" align="center" type="index" width="50" />
    <el-table-column prop="province" align="center" label="编号" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>
    <el-table-column label="物料类别" align="center">
      <el-table-column prop="province" label="名称" align="center" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.xxx }}</span>
          <el-input v-else v-model="scope.row.xxx" placeholder="" />
        </template>
      </el-table-column>

      <el-table-column prop="province" label="种类" align="center" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.isHistory" style="margin:0;">{{ scope.row.className }}</span>
          <el-input v-else v-model="scope.row.className" placeholder="" />
        </template>
      </el-table-column>

      <el-table-column prop="province" label="材质" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>

    </el-table-column>
    <el-table-column label="规格">
      <el-table-column prop="province" label="长(m)" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="province" label="宽(m)" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="province" label="厚(mm)" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>

    </el-table-column>
    <el-table-column prop="province" label="理论厚度" align="center" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="数量(张)" align="center" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="总重(t)" align="center" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="采购单价(元)" align="center" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="含税总额(元)" align="center" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="单位净重(kg/㎡)" align="center" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="品牌" width="150" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="供应商" width="150" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="province" label="炉批号" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '0.1111',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style scoped>

</style>
