<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="detail">
        <div class="left">
          <div class="header">
            <div class="blue"></div>
            <div>事件查看</div>
          </div>
          <div class="status">
            <div>一码一案<span class="number">{{ info.id }}</span><span class="statu">{{ info.status }}</span></div>
            <div class="tags">
              <el-tag type="success">邻里纠纷</el-tag>
            </div>
          </div>
          <div class="list">
            <div class="listItem" v-for="item in lists" :key="item.value">
              <div class="label">{{ item.label }}</div>
              <div class="value">
                <el-tag  v-if="item.value == 'type' || item.value == 'leve'">{{ info[item.value] || 'test' }}</el-tag>
                <el-tag  v-else-if="item.value == 'isurgent' || item.value == 'isrisk'"  type="success">{{ info[item.value] || 'test' }}</el-tag>
                <div v-else>{{ info[item.value] || 'test' }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left">
          <div class="list">
            <div class="listItem" v-for="item in lists" :key="item.value">
              <div class="label">{{ item.label }}</div>
              <div class="value">
                <el-tag  v-if="item.value == 'type' || item.value == 'leve'">{{ info[item.value] || 'test' }}</el-tag>
                <el-tag  v-else-if="item.value == 'isurgent' || item.value == 'isrisk'"  type="success">{{ info[item.value] || 'test' }}</el-tag>
                <div v-else>{{ info[item.value] || 'test' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div slot="footer">
        <div class="footer">
          <div>
            <div v-if="showButtons">
              <el-button type="primary" plain @click="getDetail1('自主调解', 1)">自主调解</el-button>
              <el-button type="primary" plain @click="getDetail1('交办\转办', 2)">交办\转办</el-button>
              <el-button type="primary" plain @click="getDetail1('上报', 3)">上报</el-button>
              <el-button type="primary" plain @click="getDetail1('资源申请', 4)">资源申请</el-button>
              <el-button type="primary" plain @click="getDetail1('申请延期', 5)">申请延期</el-button>
              <el-button type="primary" plain @click="getDetail1('申请延期',6)">申请挂起</el-button>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="getDetail">完善卷宗</el-button>
            <el-button type="primary" @click="openSuggest('评论')">评论</el-button>
            <el-button type="primary" @click="getDetail1('添加会商记录', 7)">添加会商记录</el-button>
            <el-button type="primary" @click="getDetail1('任务下发', 8)">任务下发</el-button>
            <el-button type="primary" @click="openSuggest('风险管控')">风险管控</el-button>
          </div>
        </div>
      </div> -->
    </el-dialog>
    <!-- <Suggest :dialogVisible="suggestVisible" :title="suggestTitle" @close="closeSuggest"></Suggest>
    <Types @close="closeDialog1" :dialogVisible="dialogVisible2" width="40%" :title="suggestTitle" :form="{}" :config="config">
      <template v-if="showSlot" v-slot>
        <div>
          <div>
            <el-card v-for="item in cardList" :key="item" class="box-card">
              <div slot="header" class="clearfix">
                <span>{{item.title}}</span>
              </div>
              <div class="itemlist">
                <div v-for="o in item.children" :key="o" class="text item" :class="{'noData': !o.title}">
                  <div class="itemTitle">{{ o.title }}</div>
                  <div class="scrollItem">
                    <div class="itemContent" v-for="itm in o.children" :key="itm">{{itm}}</div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </template>
    </Types>
    <Dossier @close="closeDialog" :dialogVisible="dialogVisible1"/> -->
  </div>
</template>

<script>
// import Types from '@/components/dialog/reoslve/types.vue';
// import Dossier from '@/components/dialog/reoslve/dossier.vue';
// import Suggest from './suggest.vue';
export default {
  name: 'detailDialog',
  // components: {Suggest, Types, Dossier},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: {},
    },

  },
  data() {
    return {
      lists: [
        {
          label: "发现时间",
          value: "time"
        },
        {
          label: "涉及人数",
          value: "number"
        },
        {
          label: "纠纷类型",
          value: "type"
        },
        {
          label: "是否紧急",
          value: "isurgent"
        },
        {
          label: "是否风险",
          value: "isrisk"
        },
        {
          label: "定级",
          value: "leve"
        },
        {
          label: "事发区域",
          value: "responsible"
        },
        {
          label: "地址",
          value: "address"
        },
        {
          label: "纠纷简要内容",
          value: "context"
        },
        {
          label: "纠纷主要诉求",
          value: "demand"
        },
        {
          label: "备注",
          value: "sugges"
        },
        {
          label: "申请人列表",
          value: "name"
        },
        {
          label: "附件信息",
          value: "file"
        },
      ],
      btnNames: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '送审',
          value: 1,
        },
        {
          label: '送审撤销',
          value: 2,
        },
        {
          label: '新增',
          value: 3,
        },
      ],
      activeName: 'first',
      activeBtnName: 0,
      stepList: [
        {
          id: 1,
          time: '2024-04-18 15:52:54',
          title: '送审',
          content: '发起送审申请',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 2,
          time: '2024-04-16 15:52:54',
          title: '送审',
          content: '发起送审申请',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 3,
          time: '2024-04-13 15:52:54',
          title: '送审撤销',
          content: '送审撤销',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 4,
          time: '2024-04-01 15:52:54',
          title: '送审',
          content: '发起送审申请',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 5,
          time: '2024-03-18 15:52:54',
          title: '送审撤销',
          content: '送审撤销',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 6,
          time: '2024-03-15 15:52:54',
          title: '新增',
          content: '新增申请',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 7,
          time: '2024-03-15 15:52:54',
          title: '新增test',
          content: '新增申请test',
          nameCn: '用户test（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        }
      ],
      suggestVisible: false,
      suggestTitle: '',
      dialogVisible2: false,
      config: {},
      dialogVisible1: false,
      showSlot: false,
      cardList: [
        {
          title: '主办部门',
          children: [
            {
              title: '行政单位',
              children: [
                '测试1',
                '测试2',
                '测试3',
                '测试4',
                '测试5',
                '测试6',
                '测试7',
              ]
            },
            {
              title: '职能部门',
              children: [
                '测试1',
                '测试2',
                '测试3',
                '测试4',
                '测试5',
                '测试6',
                '测试7',
              ]
            },
            {
              title: '调解组织',
              children: [
                '测试1',
                '测试2',
                '测试3',
                '测试4',
                '测试5',
                '测试6',
                '测试7',
              ]
            },
            
          ]
        },
        {
          title: '协办部门',
          children: [
            {
              title: '行政单位',
              children: [
                '测试1',
                '测试2',
                '测试3',
                '测试4',
                '测试5',
                '测试6',
                '测试7',
              ]
            },
            {
              title: '职能部门',
              children: [
                '测试1',
                '测试2',
                '测试3',
                '测试4',
                '测试5',
                '测试6',
                '测试7',
              ]
            },
            {}
          ]
        },
      ]
    }
  },
  computed: {
    getdrawList() {
      let arr = {};
      for (let i = 0; i < this.stepList.length; i++) {
        const name = 'step' + Math.floor(i / 3);
        console.log(123123, name);
        if(!arr[name]) {
          arr[name] = [];
        }
        this.stepList[i].listIndex = Math.floor(i / 3);
        arr[name].push(this.stepList[i])
      }
      console.log(arr, 'arr');
      return arr;
    }
  },
  methods: {
    handleClose() {
      console.log('关闭详情弹窗');
      this.$emit("close");
    },
    handleClick(val, event) {
      // console.log(val, event,'tabs', this.activeName);
    },
    checkBtn(val) {
      this.activeBtnName = val;
    },
    closeSuggest() {
      this.suggestVisible = false;
    },
    openSuggest(val) {
      this.suggestTitle = val;
      this.suggestVisible = true;
    },
    getDetail1(val, type) {
      this.showSlot = type === 2;
      switch (type) {
        case 1:
        this.config = {
            rulesForm: {
              date: {
                required: true,
                message: "请选择",
              },
              creater: {
                required: true,
                trigger: ["blur", "input"],
                message: "请输入",
              },
              message: {
                required: true,
                trigger: ["blur", "input"],
                message: "请输入",
              },
              result: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
              leve: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
              file: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
            },
            columns: [
              {
                label: "调解时间",
                prop: "date",
                type: "dateTime",
                span: 24,
              },
              {
                label: "调解地点",
                prop: "address",
                type: "input",
                span: 24,
              },
              {
                label: "申请人",
                prop: "creater",
                type: "input",
                span: 24,
              },
              {
                label: "调解记录",
                prop: "message",
                type: "textarea",
                span: 24,
              },
              {
                label: "调解方式",
                prop: "types",
                type: "select",
                option: [
                  {
                    text: '促进和解',
                    id: 0
                  },
                  {
                    text: '人民调解',
                    id: 1
                  },
                  {
                    text: '行政调解',
                    id: 2
                  },
                  {
                    text: '司法调解',
                    id: 3
                  },
                  
                ],
                span: 24,
              },
              {
                label: "调解方式",
                prop: "result",
                type: "select",
                option: [
                  {
                    text: '调解成功',
                    id: 0
                  },
                  {
                    text: '其他途径解决',
                    id: 1
                  },
                  {
                    text: '调解终止',
                    id: 2
                  },
                  {
                    text: '调解撤销',
                    id: 3
                  },
                  {
                    text: '继续调解',
                    id: 4
                  }
                ],
                span: 24,
              },
              {
                label: "定级",
                prop: "leve",
                type: "select",
                option: [
                  {
                    text: '红',
                    id: 0
                  },
                  {
                    text: '黄',
                    id: 1
                  },
                  {
                    text: '篮',
                    id: 2
                  },
                ],
                span: 24,
              },
              {
                label: "是否回访",
                prop: "isBack",
                type: "select",
                option: [
                  {
                    text: '需回访',
                    id: 0
                  },
                  {
                    text: '不需回访',
                    id: 1
                  },
                ],
                span: 24,
              },
              {
                label: "调解员",
                prop: "person",
                type: "input",
                span: 24,
              },
              {
                label: "记录人",
                prop: "person1",
                type: "input",
                span: 24,
              },
              {
                label: "调解协议书或口头协议书",
                prop: "file",
                type: "uploadInput",
                span: 24,
              },
              {
                label: "其他附件",
                prop: "file1",
                type: "uploadInput",
                span: 24,
              },
            ]
          };
          break;
          case 2:
          this.config = {
            rulesForm: {},
            columns: [
              {
                label: "工作意见",
                prop: "reason",
                type: "textarea",
                span: 24,
              },
              {
                label: "是否短信通知",
                prop: "isMsg",
                type: "select",
                option: [
                  {
                    text: '是',
                    id: 0
                  },
                  {
                    text: '否',
                    id: 1
                  }
                ],
                span: 24,
              },
              {
                label: "短信内容",
                prop: "reason2",
                type: "textarea",
                span: 24,
              },
            ]
          }
          break;
        case 3:
          this.config = {
            rulesForm: {
              reason: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
            },
            columns: [
              {
                label: "上报时间",
                prop: "date",
                type: "dateTime",
                span: 24,
              },
              {
                label: "上报至",
                prop: "msg",
                type: "input",
                span: 24,
              },
              {
                label: "上报原因",
                prop: "reason",
                type: "select",
                option: [
                  {
                    text: '本层级无法处理,请求上级处置',
                    id: 0
                  },
                  {
                    text: '应申请人要求,到上级处理',
                    id: 1
                  },
                  {
                    text: '本级资源不足,请上级处置',
                    id: 2
                  },
                  {
                    text: '其他',
                    id: 3
                  },
                  
                ],
                span: 24,
              },
              {
                label: "备注",
                prop: "mark",
                type: "textarea",
                span: 24,
              },
              {
                label: "是否短信通知",
                prop: "isMsg",
                type: "select",
                option: [
                  {
                    text: '是',
                    id: 0
                  },
                  {
                    text: '否',
                    id: 1
                  },
                ],
                span: 24,
              },
              {
                label: "通知内容",
                prop: "content",
                type: "textarea",
                span: 24,
              },
            ]
          }
          break;
          case 4:
          this.config = {
            rulesForm: {
              date: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
              types: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
            },
            columns: [
              {
                label: "预约时间",
                prop: "date",
                type: "dateTime",
                span: 24,
              },
              {
                label: "资源类型",
                prop: "types",
                type: "select",
                option: [
                  {
                    text: '调解室',
                    id: 0
                  },
                  {
                    text: '在线资源',
                    id: 1
                  },
                  {
                    text: '调解人员',
                    id: 2
                  },
                ],
                span: 24,
              },
            ]
          }
          break;
          case 5:
          this.config = {
            rulesForm: {
              date: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
              reason: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
            },
            columns: [
              {
                label: "申请延期至",
                prop: "date",
                type: "dateTime",
                span: 24,
              },
              {
                label: "申请原因",
                prop: "reason",
                type: "textarea",
                span: 24,
              },
              {
                label: "附件上传",
                prop: "file",
                type: "uploadInput",
                span: 24,
              },
            ]
          }
          break;
          case 6:
          this.config = {
            rulesForm: {
              reason: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
            },
            columns: [
              {
                label: "申请原因",
                prop: "reason",
                type: "textarea",
                span: 24,
              },
              {
                label: "附件上传",
                prop: "file",
                type: "uploadInput",
                span: 24,
              },
            ]
          }
          break;
          case 7:
          this.config = {
            rulesForm: {
              reason: {
                required: true,
                message: "请选择",
              },
              leve: {
                required: true,
                message: "请选择",
              },
            },
            columns: [
              {
                label: "概况",
                prop: "reason",
                type: "textarea",
                span: 24,
              },
              {
                label: "风险与措施",
                prop: "reason1",
                type: "textarea",
                span: 24,
              },
              {
                label: "参与单位",
                prop: "reason2",
                type: "textarea",
                span: 24,
              },
              {
                label: "定级",
                prop: "leve",
                type: "select",
                option: [
                  {
                    text: '红',
                    id: 0
                  },
                  {
                    text: '黄',
                    id: 1
                  },
                  {
                    text: '篮',
                    id: 2
                  },
                  
                ],
                span: 24,
              },
              {
                label: "附件上传",
                prop: "file",
                type: "uploadInput",
                span: 24,
              },
            ]
          }
          break;
          case 8:
          this.config = {
            rulesForm: {},
            columns: [
              {
                label: "任务执行人",
                prop: "executor",
                type: "select",
                option: [
                  {
                    text: '执行人红',
                    id: 0
                  },
                  {
                    text: '执行人黄',
                    id: 1
                  },
                  {
                    text: '执行人篮',
                    id: 2
                  },
                  
                ],
                span: 24,
              },
              {
                label: "任务说明",
                prop: "reason",
                type: "textarea",
                span: 24,
              },
              {
                label: "短信发送",
                prop: "isMsg",
                type: "select",
                option: [
                  {
                    text: '是',
                    id: 0
                  },
                  {
                    text: '否',
                    id: 1
                  }
                ],
                span: 24,
              },
              {
                label: "短信内容",
                prop: "reason2",
                type: "textarea",
                span: 24,
              },
            ]
          }
          break;
        default:
          break;
      }
      
      this.suggestTitle = val;
      this.dialogVisible2 = true;
      console.log('detail');
    },
    closeDialog1() {
        this.dialogVisible2 = false;
    },
    getDetail(val) {
      this.dialogVisible1 = true;
      console.log('detail', val);
    },
    closeDialog() {
      this.dialogVisible1 = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  .header {
    display: flex;
    font-size: 20px;
    .blue {
      width: 5px;
      background: blue;
      margin-right: 10px;
    }
  }
  .left {
    flex: 1;
    .status {
      background: #f0f6fe;
      border-radius: 5px;
      padding: 20px;
      margin: 10px 0 20px;
      font-size: 18px;
      line-height: 24px;
      .tags {
        margin-top: 10px;
      }
      .number {
        color: #1c6ff9;
        font-size: 24px;
        margin: 0 40px 0 20px;
        vertical-align: bottom;
        font-weight: bold;
      }
      .statu {
        font-weight: bold;
      }
    }
    .list {
      border-bottom: 1px solid #eee;
      height: 500px;
      overflow-y: scroll;
      .listItem {
        display: flex;
        border: 1px solid #eee;
        border-bottom: unset;
        .label {
          background: #f0f6fe;
          padding: 0 10px;
          width: 140px;
          display: flex;
          align-items: center;
        }
        .value {
          padding: 20px;
        }
      }
    }
  }
  .right {
    flex: 1;
    margin-left: 20px;
    .tabs {
      margin-top: 20px;
      .btns {
        display: flex;
        justify-content: space-between;
      }
      .content {
        margin-top: 20px;
        height: 500px;
        overflow-y: scroll;
        .contentHead {
          background: #90b8fa;
          line-height: 40px;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .contentMsg {
          display: flex;
          color: #000;
          font-size: 14px;
          .msgTitle {
            width: 100px;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            border: 1px solid #eee;
          }
          .msgContent {
            padding: 10px 20px;
            flex: 1;
            border: 1px solid #eee;
          }
        }
        .contentDetail {
          color: #000;
          font-size: 14px;
          border: 1px solid #eee;
          border-top: unset;
          line-height: 24px;
          padding: 10px 20px 20px;
          margin-bottom: 20px;
        }
      }
    }
    .steps {
      .stepClo {
        display: flex;
        justify-content: space-between;
      }
      .stepItem {
        // display: flex;
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        line-height: 38px;
        .stepAddress {
          width: 70%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .stepTime {
          color: #ccc;
        }
      }
      .stepLine {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: 80%;
          top: 10%;
          width: 50%;
          height: 10px;
          background: url('~@/assets/img/dialogImg/right.png') no-repeat;
          background-size: 100%;
          z-index: 11111111;
        }
      }
      .stepLine1 {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: 80%;
          top: 10%;
          width: 50%;
          height: 10px;
          background: url('~@/assets/img/dialogImg/left.png') no-repeat;
          background-size: 100%;
          z-index: 11111111;
        }
      }
      .downLine {
        display: flex;
        justify-content: flex-end;
        margin-right: 16%;
        margin-bottom: 20px;
      }
      .downLine1 {
        margin-left: 16%;
        margin-bottom: 20px;
      }
    }
  }
}
/deep/ .el-tabs__nav-scroll {
  display: flex;
  justify-content: flex-end;
}
/deep/ .el-step__description {
  padding-right: unset;
}
.noRusult {
  text-align: center;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.box-card {
  margin-bottom: 20px;
  .itemlist {
    display: flex;
    justify-content: space-between;
    .item {
      width: 31%;
      border: 1px solid #eee;
      border-radius: 4px;
      line-height: 42px;
      font-size: 14px;
      .itemTitle {
        background: #eee;
        padding: 0 20px;
        font-size: 16px;
        // font-weight: bold;
      }
      .scrollItem  {
        height: 140px;
        overflow-y: scroll;
        .itemContent {
          padding: 0 20px;
          border-bottom: 1px solid #eee;
        }
      }
    }
    .noData {
      border: unset;
      .scrollItem {
        overflow: unset;
      }
    }
  }
}
</style>