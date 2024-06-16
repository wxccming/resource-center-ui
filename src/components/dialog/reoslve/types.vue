<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <slot></slot>
      <div class="content">
        <DialogForm
          class="form"
          :Form="form"
          :DialogFormConfig="config"
          ref="form"
        />
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'TypesDialog',
  data() {
    return {
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '纠纷类型操作',
    },
    width: {
      type: String,
      default: '50%',
    },
    config: {
      type: Object,
      default: {},
    },
    form: {
      type: Object,
      default: {},
    },
    nofoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      // this.reset();
      this.$refs.form.$refs.ruleForm.resetFields();
      this.$emit('close')
    },
    submit() {
      this.$refs.form.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit')
        } else {
          console.log('error submit!! 校验未通过');
          return false;
        }
      });
      
    },
    reset() {
      this.$refs.form.$refs.ruleForm.resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  .form {
    width: 70%;
  }
}
</style>