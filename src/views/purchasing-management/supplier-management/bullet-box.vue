<template>
  <!-- 页面主容器 -->
  <div class="pagination-container">
    <!-- 主要内容容器 -->
    <div class="content-container" />
    <!-- 供应商详情页 -->
    <el-dialog :visible.sync="show" class="box" :before-close="close">
      <div class="wrap">
        <div>
          <p>供应商全称：杭州市江干区</p>
          <p>简称：</p>
          <p>供应商编号:</p>
        </div>
        <div>
          <p>详细地址:</p>
        </div>
        <div>
          <p>社会统一代码:</p>
          <p>成立日期:</p>
          <p>营业期限:</p>
        </div>
        <div>
          <p>法定代表人:</p>
          <p>注册资本:</p>
          <p>企业类型:</p>
        </div>
        <div>
          <p>开户行名称:</p>
          <p>银行账号:</p>
        </div>
        <div>
          <p>公司官方网站:</p>
          <p>单位邮箱:</p>
          <p>电话:</p>
        </div>
        <div>
          <p>联系人1:</p>
          <p>联系电话:</p>
          <p>个人邮箱:</p>
        </div>
        <div>
          <p>联系人2:</p>
          <p>联系电话:</p>
          <p>个人邮箱:</p>
        </div>
        <div>
          <p>主营业务:</p>
          <p>供应商分类:</p>
        </div>
        <div>
          相关资料
        </div>
        <!-- <el-button type="primary" @click="close">关闭</el-button> -->
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
export default {
  name: 'SuppperManagementBulletBox',
  props: {
    detail: {
      type: Object,
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
    return {}
  },
  mounted() { },
  methods: {
    deleteHandle() { // 确定删除
      this.$emit('closeBox')
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
</style>
