<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 主要内容容器 -->
    <div class="content-container" />
    <!-- 供应商详情页 -->
    <el-dialog :visible.sync="show" class="box" :before-close="close">
      <div v-loading="loading" class="wrap">
        <div>
          <p> <span class="style">供应商全称：</span> {{ info.name }}</p>
          <p> <span class="style">简称：</span>{{ info.shortName }}</p>
          <p> <span class="style">供应商编号：</span>{{ info.supplierCode }}</p>
        </div>
        <div>
          <p><span class="style">详细地址：</span>{{ info.address }}</p>
        </div>
        <div>
          <p><span class="style">社会统一代码：</span>{{ info.socialCode }}</p>
          <p><span class="style">成立日期：</span>{{ info.registrationDate }}</p>
          <p><span class="style">营业期限：</span>{{ info.businessTerm }}</p>
        </div>
        <div>
          <p><span class="style">法定代表人：</span>{{ info.legalRepresentative }}</p>
          <p><span class="style">注册资本：</span>{{ info.registeredCapital }}</p>
          <p><span class="style">企业类型：</span>{{ info.enterpriseType }}</p>
        </div>
        <div>
          <p><span class="style">开户行名称：</span>{{ info.firstBankName }}</p>
          <p><span class="style">银行账号：</span>{{ info.firstBankAccount }}</p>
        </div>
        <div>
          <p><span class="style">公司官方网站：</span>{{ info.website }}</p>
          <p><span class="style">单位邮箱：</span>{{ info.companyEmail }}</p>
          <p><span class="style">电话：</span>{{ info.companyPhone }}</p>
        </div>
        <div>
          <p><span class="style">联系人1：</span>{{ info.firstContact }}</p>
          <p><span class="style">联系电话：</span>{{ info.firstContactPhone }}</p>
          <p><span class="style">个人邮箱：</span>{{ info.firstContactEmail }}</p>
        </div>
        <div>
          <p><span class="style">联系人2：</span>{{ info.secondContact }}</p>
          <p><span class="style">联系电话：</span>{{ info.secondContactPhone }}</p>
          <p><span class="style">个人邮箱：</span>{{ info.secondContactEmail }}</p>
        </div>
        <div>
          <p><span class="style">主营业务：</span>{{ info.mainBusiness }}</p>
          <p><span class="style">供应商分类：</span>{{ info.supplierClassification }}</p>
        </div>
        <div>
          相关资料
        </div>
      </div>
    </el-dialog>
    <!--  删除的弹窗  -->
    <el-dialog
      title="删除"
      :visible.sync="delShow"
      width="30%"
      :before-close="close"
    >
      <span>确定要删除该条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="deleteHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { detail, delItem } from '@/api/supplier'
export default {
  name: 'SuppperManagementBulletBox',
  props: {
    id: {
      type: Number,
      default: () => {}
    },
    delId: {
      type: Number,
      default: () => {}
    },
    show: {
      type: Boolean
    },
    delShow: {
      type: Boolean
    }
  },
  data() {
    return {
      info: {},
      loading: false
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal) {
        this.getInfo()
      }
    },
    delShow(newVal, oldVal) {
      if (newVal) {
        console.log(this.delId)
      }
    }
  },
  mounted() {},
  methods: {
    getInfo() {
      this.loading = true
      const params = {
        id: this.id
      }
      detail(params).then(res => {
        this.loading = false
        this.info = res.data
      }).catch(e => {
        this.loading = false
      })
    },
    deleteHandle() { // 确定删除
      this.$emit('closeBox')
      const params = {
        id: this.delId
      }
      delItem(params).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功!')
        } else {
          this.$message.error('删除失败!')
        }
      }).catch(e => {
        this.$message.error('数据接口失败或网络失败!')
      })
    },
    close() {
      this.$emit('closeBox')
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 1000;
}
.wrap {
  font-size: 14px;
  width: 100%;
  height: 600px;
  background: #ffffff;
  padding: 0 15px;
  line-height: 25px;
}
.wrap div {
  display: flex;
}
.wrap p {
  width: 33%;
}
.style {
  font-weight: 700;
  font-size: 15px;
  color: rgb(16, 16, 17);
}
</style>
