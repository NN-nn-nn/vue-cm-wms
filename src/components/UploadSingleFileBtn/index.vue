<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :action="action"
    :on-success="uploadSuccess"
    :on-progress="uploadProgress"
    :on-error="uploadError"
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :show-file-list="false"
  >
    <el-button :loading="uploadLoading" size="small" type="primary">{{ btnName }}</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadSingleFileBtn',
  props: {
    action: {
      type: String,
      default: ''
    },
    btnName: {
      type: String,
      default: '点击上传'
    }
  },
  data() {
    return {
      uploadLoading: false,
      fileList: []
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    uploadSuccess() {
      this.uploadLoading = false
      this.$refs.upload.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    uploadError() {
      this.uploadLoading = false
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    uploadProgress() {
      this.uploadLoading = true
    }
  }
}
</script>
