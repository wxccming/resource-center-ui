import { closeWebSocket } from '@/utils/websocket';
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <div class="content">
        <div class="left">
          <DialogForm
            :Form="form"
            :DialogFormConfig="formConfig"
            ref="ruleForm"
          />
        </div>
        <div class="right">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">保存</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DisputUserDialog',
  data() {
    return {
      form: {},
      formConfig: {
        rulesForm: {
          phone: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入联系电话",
          },
        },
        columns: [
          {
            label: "姓名",
            prop: "name",
            type: "input",
            span: 12,
          },
          {
            label: "联系电话",
            prop: "phone",
            type: "input",
            span: 12,
          },
          {
            label: "身份证号码",
            prop: "number",
            type: "input",
            span: 12,
          },
          {
            label: "联系地址",
            prop: "address",
            type: "input",
            span: 12,
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            option: [
              {
                text: "男",
                id: 1,
              },
              {
                text: "女",
                id: 2,
              },
            ],
            span: 12,
          },
          {
            label: "出生日期",
            prop: "brown",
            type: "dateTime",
            span: 12,
          },
          {
            label: "民族",
            prop: "nation",
            type: "select",
            option: [
              {
                text: "汉族",
                id: 1,
              },
              {
                text: "其他",
                id: 2,
              },
            ],
            span: 12,
          },
          {
            label: "文化程度",
            prop: "educational",
            type: "select",
            option: [
              {
                text: "小学",
                id: 1,
              },
              {
                text: "初中",
                id: 2,
              },
              {
                text: "高中",
                id: 3,
              },
              {
                text: "中专",
                id: 4,
              },
              {
                text: "大专",
                id: 5,
              },
              {
                text: "本科",
                id: 6,
              },
              {
                text: "其他",
                id: 7,
              },
            ],
            span: 12,
          },
          {
            label: "户籍地址",
            prop: "residence",
            type: "input",
            span: 12,
          },
          {
            label: "人员类型",
            prop: "type",
            type: "input",
            span: 12,
          },
        ]
      }, 
      imageUrl: ''
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '查看',
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  width: 100%;
  .left {
    width: 66.66%;
  }
  .right {
    width: 33.33%;
    display: flex;
    justify-content: center;
  }
}
/deep/.avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
  // background: url();
}
</style>