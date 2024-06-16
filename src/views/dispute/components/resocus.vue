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
        <general />
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'ResocusDialog',
  components: {
    general: () => import("./resocusList"),
  },
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
      default: '添加资源',
    },
    width: {
      type: String,
      default: '50%',
    },
    nofoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
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
      
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  overflow-y: scroll;
}
</style>