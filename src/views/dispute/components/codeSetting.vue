import { Style } from '@svgdotjs/svg.js';
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose"
      :close-on-click-modal="false"
      >
        <div>
          <div class="showCode">
            <el-dropdown>
              <el-button>二维码预览</el-button>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <img src="data:image/png;base64,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" alt="二维码预览" style="width: 100px;height: 100px;">
              </el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
          </div>
          <div class="pointer" @click="getNameCode(info.itemName)">
            项目标题：{{ info.itemName || "-" }}
          </div>
          <div class="content">
            <div class="left">
              <div class="title">目录</div>
              <div>
                <div class="listTitle">{{ info.itemName || "-" }}</div>
                <el-tree
                  :data="list"
                  @node-click="handleNodeClick"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  :default-expanded-keys="defaultCheckClo"
                  :default-checked-keys="defaultCheckRow"
                ></el-tree>
              </div>
            </div>
            <div class="right">
              <div class="title">基础设置</div>
              <div class="codeName">
                <span>二维码名称：</span>
                <el-input style="width: 400px;margin-left: 10px;" v-model="form.codeName"></el-input>
              </div>
              <div  v-if="getShowAddResoce">
                <div class="title mt20">资源设置</div>
                <div class="mt20">
                  <el-radio-group v-model="form.resoue">
                    <el-radio-button label="学生自主学习"></el-radio-button>
                    <el-radio-button label="教师备课授课"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div v-else>
                <div class="title mt20">资源设置</div>
                <div class="mt20">
                  图书二维码由章节二维码共同构成，在完成章节二维码内容配置后即可点击生成
                </div>
              </div>
              <div v-if="getShowAddResoce">
                <div @click="addResocus" class="mt20 pointer">
                  <i style="color: blue;margin-right: 5px" class="el-icon-plus"></i>添加资源
                </div>
                <div @click="addResocus" class="fileList"></div>
              </div>
            </div>
          </div>
        </div>
        <span v-if="!nofoot" slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
    </el-dialog>
    <Resocus @close="closeDialog"  @submit="setSubmit" :dialogVisible="visible" width="75%" />
  </div>
</template>
<script>
import Resocus from "./resocus"
export default {
  name: 'settingDialog',
  data() {
    return {
      defaultCheckClo: [this.list[0].id || null],
      defaultCheckRow: [this.list[0].children[0].id || null],
      form: {
        codeName: '',
        resoue: '学生自主学习'
      },
      visible: false,
      isTitleCode: false
    }
  },
  components: {Resocus},
  computed: {
    getShowAddResoce() {
      return !this.isTitleCode && this.list.length;
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '二维码设置',
    },
    width: {
      type: String,
      default: '50%',
    },
    nofoot: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    }
  },
  mounted() {
    if(this.list && this.list.length) {
      if(this.list[0].children && this.list[0].children.length) {
        this.form.codeName = this.list[0].children[0].chapterName;
      } else {
        this.form.codeName = this.list[0].chapterName;
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    submit() {
      this.$emit('submit')
    },
    handleNodeClick(data) {
      console.log(data);
      this.$refs.tree.setCheckedKeys([data.id]);
      this.isTitleCode = false;
      this.form.codeName = data.chapterName;
    },
    setSubmit() {
      console.log("添加资源成功");
    },
    closeDialog() {
      this.visible = false;
    },
    addResocus() {
      this.visible = true;
    },
    getNameCode(val) {
      this.isTitleCode = true;
      this.form.codeName = val;
      this.$refs.tree.setCheckedKeys([]);
    }
  },
}
</script>

<style lang="scss" scoped>
.showCode {
  display: flex;
  justify-content: flex-end;
};
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: rgb(122, 122, 122);
  }
  .left {
    width: 30%;
    background: rgba(250, 250, 250, 1);
    padding: 15px 20px;
    border-radius: 4px;
    
    .listTitle {
      margin: 20px 0 10px;
    }
    /deep/ .el-tree {
      background: unset;
    }
  };
  .right {
    width: 69%;
    border: 1px solid #eee;
    padding: 15px 20px;
    .codeName {
      display: flex;
      align-items: center;
      margin-top: 20px;
    }
    .mt20 {
      margin-top: 20px;
    }
    .raido {
      margin-top: 20px;
    }
    .fileList {
      height: 160px;
      // border: 2px dashed blue;
      background: url("~@/assets/image/border.svg") no-repeat;
      background-size: contain;
      margin-top: 10px;
      cursor: pointer;
    }
  };
}
.pointer {
  cursor: pointer;
}
</style>