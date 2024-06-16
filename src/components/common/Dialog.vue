<template>
  <el-dialog
    v-el-drag-dialog
    :class="[isHome ? 'HomeDialog' : 'NormalDialog']"
    :title="title"
    :visible.sync="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="true"
    :show-close="showClose"
    :append-to-body="appendToBody"
    :modal="isHome ? false : true"
    :modal-append-to-body="false"
    :width="width"
    :top="top"
    @closed="showClose?closed:()=>{}"
  >
     <div v-if="!title" slot="title" class="header-title">
        <slot name="Header"></slot>
       <div v-if="!showClose" style="display: flex;">
         <div class="icons" @click="miniSize">
           <i class="el-icon-minus"/>
         </div>
         <div class="icons" @click="closed">
           <i class="el-icon-close"/>
         </div>
       </div>
     </div>
    <div class="dialog" v-if="dialogComponents">
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from "@/utils/directive/el-drageDialog";
export default {
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    top: {
      type: String,
      default: "15vh",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "550px",
    },
    isHome: {
      type: Boolean,
      default: false,
    },
  },
  // directives: {
  //   elDragDialog,
  // },
  created() {},
  watch: {
    dialogVisible(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("updateStatus", val);
      if (val) this.dialogComponents = val;
    },
  },
  data() {
    return {
      visible: false,
      dialogComponents: false,
    };
  },
  methods: {
    closed() {
      console.log(888999)
      //this.dialogComponents = false;
      this.$emit("closed");
    },
    miniSize(){
      this.$emit('miniSize')
    }
  },
};
</script>

<style scoped lang="scss">
.dialog {
  width: 100%;
}
::v-deep .el-dialog__body {
  padding: 0;
}
.NormalDialog {
  ::v-deep .el-dialog {
    pointer-events: auto; // 弹窗层元素不可穿透点击事件（不影响弹窗层元素的点击事件）
  }
  ::v-deep .el-dialog__header {
    // background: #e5eaf5;
    border-bottom: 1px solid #cccaca;
    position: relative;
    padding: 18px;
    border-radius: 5px 5px 0px 0px;

    .el-dialog__title {
      // color: #00644b;
      font-size: 16px;
    }

    .el-dialog__headerbtn {
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
    }

    .el-dialog__close {
      color: rgba(153, 165, 187, 0.7);
    }
  }
}
// 覆盖层元素增加可穿透点击事件
.Home .el-dialog__wrapper {
  pointer-events: none;
}
.HomeDialog {
  ::v-deep .el-dialog {
    background: url("~@/assets/img/popup-bg.png") no-repeat;
    background-size: 100% 100%;
    pointer-events: auto; // 弹窗层元素不可穿透点击事件（不影响弹窗层元素的点击事件）
  }
  ::v-deep .el-dialog__headerbtn{
    top:25px;
  }
  .header-title {
    height: 30px;
    color: #aaaaaa;
    border-bottom: 1px solid rgba(1, 198, 150, 0.4);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icons{
      cursor: pointer;
      margin-right: 11px;
      i{
        font-size: 16px;
      }
      i:hover{
        color:rgba(1, 198, 150, 0.4);
      }
    }
  }
}
</style>
