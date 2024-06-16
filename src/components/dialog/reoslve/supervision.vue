<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <div>
        <DialogForm
            :Form="form"
            :DialogFormConfig="formConfig"
            ref="ruleForm"
          />
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'SupervisionDialog',
  data() {
    return {
      form: {},
      formConfig: {
        rulesForm: {
          type: {
            required: true,
            trigger: ["blur", "input"],
            message: "请选择督办类型",
          },
          suggest: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入督办意见",
          },
        },
        columns: [
          {
            label: "督办类型",
            prop: "type",
            type: "select",
            option: [
              {
                text: "催办",
                id: 1,
              },
              {
                text: "挂牌督办",
                id: 2,
              },
            ],
            span: 24,
          },
          {
            label: "督办意见",
            prop: "suggest",
            type: "textarea",
            span: 24,
          },
        ]
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
      default: '督办',
    },
    nofoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>