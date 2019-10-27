<template>
  <div class="notify-component">
    <el-popover
      trigger="click"
      placement="right"
      width="400"
    >
      <div v-infinite-scroll="getList" :infinite-scroll-disabled="!hasNextPage" class="infinite-list" style="overflow:auto;min-height:100px;max-height:600px;">
        <div v-for="(item,index) in listData" :key="index" class="inventory-item">
          <div>
            <span>物料名称：{{ `${item.typeName}-${item.className}-${item.detailName}` }}</span>
            <el-tag size="mini">{{ item.materialCode }}</el-tag>
          </div>
          <div class="inventory-num-box">
            <span>剩余数量：<span style="color:red">{{ item.currentInventory }}</span></span>
            <span>预警数量：{{ item.minimumInventory }}</span>
          </div>
        </div>
      </div>
      <el-badge slot="reference" :value="total" :max="99" :hidden="total < 1" class="item">
        <svg-icon icon-class="notify" @click="changeVisible" />
      </el-badge>
    </el-popover>
  </div>
</template>

<script>
import { fetchInventoryWarningList } from '@/api/material'
export default {
  name: 'NotifyComponent',
  data() {
    return {
      visible: false,
      count: 0,
      total: 0,
      listQuery: {
        page: 0,
        size: 10
      },
      hasNextPage: true,
      listData: []
    }
  },
  mounted() {
    // this.polling()
  },
  methods: {
    changeVisible() {
      this.visible = !this.visible
      if (this.visible) {
        this.listData = []
        this.listQuery.page = 0
        this.hasNextPage = true
        this.getList()
      }
    },
    getList() {
      this.listQuery.page++
      fetchInventoryWarningList(this.listQuery).then(({ data, code, message }) => {
        if (code === 200) {
          if (this.listQuery.page === 1) {
            this.listData = []
          }
          if (data && data.data && data.data.length) {
            this.listData = this.listData.concat(data.data)
          }
          this.total = data.totalCount
          this.hasNextPage = data.hasNextPage
        } else {
          this.$message({ message: message, type: 'error' })
        }
      }).catch(e => {
        this.$message({ message: '获取库存预警列表失败', type: 'error' })
      })
    },
    polling() {
      setInterval(() => {
        fetchInventoryWarningList({ page: 1, size: 1 }).then(({ data, code, message }) => {
          if (code === 200) {
            this.total = data.totalCount
          }
        })
      }, 10000)
    }
  }
}
</script>
<style scoped>
.inventory-item {
    width: 100%;
    height: 68px;
    background: #fff6f6;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}
.inventory-num-box {
    width: 100%;
}
.inventory-num-box >span {
    display: inline-block;
    width: 40%;
}
</style>
<style>
.notify-component .el-badge__content.is-fixed {
    top:10px;
}
</style>
