<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="内容" prop="name" required>
            <el-input
              type="textarea"
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="附件上传" prop="fileList">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="ruleForm.fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'suggestDialog',
  data() {
    return {
      ruleForm: {
        name: '',
        fileList: ''
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>