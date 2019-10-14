<template>
  <!-- 页面主容器 -->
  <div class="page-container">
    <!-- 主要内容容器 -->
    <div class="content-container">
      <div class="form">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
          <div class="rule-row">
            <el-form-item label="供应商全称" prop="fullName">
              <el-input v-model="ruleForm.fullName" />
            </el-form-item>
            <el-form-item label="简称" prop="abbreviation">
              <el-input v-model="ruleForm.abbreviation" />
            </el-form-item>
            <el-form-item label="供应商编号" prop="code">
              <el-input v-model="ruleForm.code" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="选择地区" prop="area">
              <el-cascader
                :options="options"
                :show-all-levels="false"
              />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请您输入详细地址" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="社会统一代码" prop="uniteCode">
              <el-input v-model="ruleForm.uniteCode" />
            </el-form-item>
            <el-form-item label="成立日期" prop="dateEstablish">
              <el-date-picker
                v-model="ruleForm.dateEstablish"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="营业期限" prop="operatePeriod">
              <el-input v-model="ruleForm.operatePeriod" placeholder="请输入营业期限" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="法定代表人" prop="legal">
              <el-input v-model="ruleForm.legal" />
            </el-form-item>
            <el-form-item label="注册资本" prop="registCapital">
              <el-input v-model="ruleForm.registCapital" />
            </el-form-item>
            <el-form-item label="企业类型" prop="enterpries" required>
              <el-select v-model="ruleForm.enterpries">
                <el-option label="美食/餐厅线上活动" value="1" />
              </el-select>
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="开户行名称" prop="bankName">
              <el-input v-model="ruleForm.bankName" placeholder="请输入开户行名称" />
            </el-form-item>
            <el-form-item label="银行账户" prop="bankAccount">
              <el-input v-model="ruleForm.bankAccount" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="公司官网" prop="companyWebsite">
              <el-input v-model="ruleForm.companyWebsite" placeholder="请输入公司官网" />
            </el-form-item>
            <el-form-item label="单位邮箱" prop="unitMailbox">
              <el-input v-model="ruleForm.unitMailbox" placeholder="请输入单位邮箱" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入电话" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="联系人1" prop="contactOne">
              <el-input v-model="ruleForm.contactOne" placeholder="请输入联系人1" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactPhoneOne">
              <el-input v-model="ruleForm.contactPhoneOne" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item label="个人邮箱" prop="personalMailOne">
              <el-input v-model="ruleForm.personalMailOne" placeholder="请输入个人邮箱" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="联系人2" prop="contactTwo">
              <el-input v-model="ruleForm.contactTwo" placeholder="请输入联系人2" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactPhoneTwo">
              <el-input v-model="ruleForm.contactPhoneTwo" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item label="个人邮箱" prop="personalMailTwo">
              <el-input v-model="ruleForm.personalMailTwo" placeholder="请输入个人邮箱" />
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="主营业务" prop="mainBusiness">
              <el-input v-model="ruleForm.mainBusiness" placeholder="请输入主营业务" />
            </el-form-item>
            <el-form-item label="供应商分类" prop="supplierClass">
              <el-select v-model="ruleForm.supplierClass">
                <el-option label="美食/餐厅线上活动" value="1" />
              </el-select>
            </el-form-item>
          </div>
          <div class="rule-row">
            <el-form-item label="相关资料">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :auto-upload="false"
              >
                <el-button size="small" type="primary">上传附件</el-button>
                <span slot="tip" class="el-upload__tip">可上传PDF文件和图片文件</span>
              </el-upload>
            </el-form-item>
          </div>
          <div class="center">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>

        </el-form>
      </div>
    </div>
    <!-- 其他模块（例如弹窗等） -->

  </div>
</template>
<script>
import { validatorEmail, validatorTel, validatorBankAcount } from '@/utils/validatePattern'
export default {
  name: 'SupplierManagementList',
  data() {
    return {
      ruleForm: {
        fullName: '',
        abbreviation: '',
        code: '',
        area: '',
        address: '',
        uniteCode: '',
        dateEstablish: '',
        operatePeriod: '',
        legal: '',
        registCapital: '',
        enterpries: '',
        bankName: '',
        bankAccount: '',
        companyWebsite: '',
        unitMailbox: '',
        phone: '',
        contactOne: '',
        contactPhoneOne: '',
        personalMailOne: '',
        contactTwo: '',
        contactPhoneTwo: '',
        personalMailTwo: '',
        mainBusiness: '',
        supplierClass: ''
      },
      rules: {
        fullName: [
          { required: true, message: '请输入供应商全称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        abbreviation: [
          { required: true, message: '请输入简称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入供应商编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        uniteCode: [
          { required: true, message: '请输入社会统一代码', trigger: 'blur' }
        ],
        dateEstablish: [
          { required: true, message: '请选择成立日期', trigger: 'change' }
        ],
        registCapital: [
          { required: true, message: '请输入注册资本', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入开户行名称', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请输入银行账户', trigger: 'blur' },
          { pattern: validatorBankAcount, message: '请输入正确的银行账户', trigger: 'blur' }
        ],
        unitMailbox: [
          { pattern: validatorEmail, message: '请输入正确的邮箱号码', trigger: 'blur' }
        ],
        phone: [
          { pattern: validatorTel, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        contactOne: [
          { required: true, message: '请输入联系人1', trigger: 'blur' }
        ],
        contactPhoneOne: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: validatorTel, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        personalMailOne: [
          { required: true, message: '请输入个人邮箱', trigger: 'blur' },
          { pattern: validatorEmail, message: '请输入正确的邮箱号码', trigger: 'blur' }
        ],
        personalMailTwo: [
          { pattern: validatorEmail, message: '请输入正确的邮箱号码', trigger: 'blur' }
        ]
      },
      options: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.form {
  padding:  45px 60px 35px 35px;
}
.demo-ruleForm .rule-row {
  display: flex;
  margin-bottom: 20px;
}
.form .el-form-item {
  width: 30%;
  margin-right: 30px;
}
.form .el-upload__tip {
  padding-left: 15px;
}
.center {
  text-align: center;
}
</style>
