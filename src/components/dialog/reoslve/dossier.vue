<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="90%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="封面" name="1">
            <div class="content">
              <div class="title">
                <el-input class="w120" v-model="form.data1.name"></el-input>
                <span>镇(街道)人民调解委员会</span>
                <el-input class="w120" v-model="form.data1.name1"></el-input>
                <span>调字(20</span>
                <el-input class="w120" v-model="form.data1.name1"></el-input>
                <span>) 号</span>
              </div>
              <div class="formContent">
                 <DialogForm
                    class="form"
                    :Form="form1"
                    :DialogFormConfig="form1Config"
                    ref="ruleForm"
                  />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="目录" name="2">
            <div>
              <div class="title">卷内目录</div>
              <div class="tableContent">
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="序号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="文书名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="页号">
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="备注">
                    <template slot-scope="scope">
                      <el-input style="margin: 10px 0"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解申请书" name="3">
            <div>
              <div class="title">人民调解申请书</div>
              <div class="formContent">
                <DialogForm
                  class="form"
                  :Form="form2"
                  :DialogFormConfig="form2Config"
                  ref="rule1Form"
                />
              </div>
              <div class="time">
                <div>人民调解委员会已将申请人民调解的相关规定告知我，现资源申请人民调解委员会进行调解。</div>
                <div>
                  <div class="agist"><span>申请人</span> <el-input></el-input></div>
                  <div>
                    <el-input></el-input><span>年</span>
                    <el-input></el-input><span>月</span>
                    <el-input></el-input><span>日</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解受理登记表" name="4">
            <div>
              <div class="title">人民调解受理登记表</div>
              <div class="formContent">
                <div class="form accept">
                  <div>
                    <el-input></el-input><span>年</span>
                    <el-input></el-input><span>月</span>
                    <el-input></el-input><span>日，人民调解委员会依申请人申请（人民调解委员会主动调解），经申请人同意，调解 </span>
                    <el-input style="width: 200px"></el-input><span>之间的纠纷。</span>
                  </div>
                  <DialogForm
                    :Form="form3"
                    :DialogFormConfig="form3Config"
                    ref="rule2Form"
                  />
                  <div>备注：此表由人民调解委员会填写</div>
                  <div class="time">
                  <div>
                    <div>
                      <el-input></el-input><span>年</span>
                      <el-input></el-input><span>月</span>
                      <el-input></el-input><span>日</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解调查记录" name="5">
            <div>
              <div class="title">人民调解受理登记表</div>
              <div class="formContent">
                <div class="form">
                  <DialogForm
                    :Form="form4"
                    :DialogFormConfig="form4Config"
                    ref="rule3Form"
                  />
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解记录" name="6">
            <div>
              <div class="title">人民调解记录</div>
              <div class="formContent">
                <div class="form">
                  <DialogForm
                    :Form="form5"
                    :DialogFormConfig="form5Config"
                    ref="rule4Form"
                  />
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解协议书" name="7">
            <div>
              <div class="title">人民调解协议书</div>
              <div class="formContent">
                <div class="form">
                  <div class="accept boxNum">
                    <span>编号</span>
                    <el-input style="width: 200px"></el-input>
                  </div>
                  <DialogForm
                    :Form="form6"
                    :DialogFormConfig="form6Config"
                    ref="rule5Form"
                  />
                  <div class="accept">
                    <div class="mb20">
                      <span>履行方式、时限</span>
                      <el-input></el-input>
                    </div>
                    <div class="mb20">
                      <span>本协议一式</span>
                      <el-input></el-input>
                      <span>份，申请人、人民调解委员会各持一份。</span>
                    </div>
                    <div class="mb20">
                      <span>申请人</span>
                      <el-input></el-input>
                      <span>人民调解员 </span>
                      <el-input></el-input>
                    </div>
                    <div class="mb20">
                      <span>申请人</span>
                      <el-input></el-input>
                    </div>
                  </div>
                  <div class="time">
                  <div>
                    <div>
                      <el-input></el-input><span>年</span>
                      <el-input></el-input><span>月</span>
                      <el-input></el-input><span>日</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解口头协议登记表" name="8">
            <div>
              <div class="title">人民调解口头协议登记表</div>
              <div class="formContent">
                <div class="form">
                  <div class="accept boxNum">
                    <span>编号</span>
                    <el-input style="width: 200px"></el-input>
                  </div>
                  <DialogForm
                    :Form="form6"
                    :DialogFormConfig="form6Config"
                    ref="rule5Form"
                  />
                  <div class="accept">
                    <div class="mb20">
                      <span>履行方式、时限</span>
                      <el-input></el-input>
                    </div>
                    <div class="mb20">
                      <span>人民调解员</span>
                      <el-input></el-input>
                    </div>
                  </div>
                  <div class="time">
                    <div>
                      <div>
                        <el-input></el-input><span>年</span>
                        <el-input></el-input><span>月</span>
                        <el-input></el-input><span>日</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="卷宗情况说明" name="9">
            <div>
              <div class="title">卷宗说明情况</div>
              <div class="tableContent">
                <el-input type="textarea" :rows="5"></el-input>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="调解相关材料" name="10">
            <div class="textcenter">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
          </el-tab-pane>
          <el-tab-pane label="尾页" name="11">
            <div class="flexEnd tableContent">
              <div class="accept">
                <div class="mb20">
                  <span>立卷人</span>
                  <el-input></el-input>
                </div>
                <div class="mb20">
                  <span>审核人</span>
                  <el-input></el-input>
                </div>
                <div class="mb20">
                  <el-input></el-input><span>年</span>
                  <el-input></el-input><span>月</span>
                  <el-input></el-input><span>日</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DossierDialog',
  data() {
    return {
      fileList: [],
      form: {
        data1: {
          name: '',
          name1: ''
        }
      },
      form1Config: {
        rulesForm: {
          num: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入卷号",
          },
          name: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入卷名",
          },
          person: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入人民调解员",
          },
          startTime: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入调解日期",
          },
          creater: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入立卷人",
          },
          endTime: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入立卷日期",
          },
        },
        columns: [
          {
            label: "卷号",
            prop: "num",
            type: "input",
            span: 24,
          },
          {
            label: "卷名",
            prop: "name",
            type: "input",
            span: 24,
          },
          {
            label: "人民调解员",
            prop: "person",
            type: "input",
            span: 12,
          },
          {
            label: "调解日期",
            prop: "startTime",
            type: "dateTime",
            span: 12,
          },
          {
            label: "立卷人",
            prop: "creater",
            type: "input",
            span: 12,
          },
          {
            label: "立卷日期",
            prop: "endTime",
            type: "dateTime",
            span: 12,
          },
          {
            label: "保管期限",
            prop: "expresix",
            type: "input",
            span: 24,
          },
          {
            label: "备注",
            prop: "mark",
            type: "input",
            span: 24,
          },
        ]
      },
      activeName: '1',
      form1: {},
      tableData: [
        {
          id: 1,
          name: '人民调解申请书或人民调解受理登记表'
        },
        {
          id: 2,
          name: '人民调解调查记录'
        },
        {
          id: 3,
          name: '人民调解记录'
        },
        {
          id: 4,
          name: '人民调解协议书或人民调解口头协议登记表'
        },
        {
          id: 5,
          name: '卷宗情况说明'
        },
        {
          id: 6,
          name: '封底'
        },
      ],
      form2: {
      },
      form2Config: {
        rulesForm: {
          creater: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入申请人姓名",
          },
          sex: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入性别",
          },
          person: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入名族",
          },
          age: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入年龄",
          },
          mark: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入纠纷简要情况",
          },
        },
        columns: [
          {
            label: "申请人姓名",
            prop: "creater",
            type: "input",
            span: 6,
          },
          {
            label: "性别",
            prop: "sex",
            type: "input",
            span: 6,
          },
          {
            label: "名族",
            prop: "person",
            type: "input",
            span: 6,
          },
          {
            label: "年龄",
            prop: "age",
            type: "input",
            span: 6,
          },
          {
            label: "职业或业务",
            prop: "work",
            type: "input",
            span: 12,
          },
          {
            label: "联系方式",
            prop: "phone",
            type: "input",
            span: 12,
          },
          {
            label: "单位或住址",
            prop: "address",
            type: "input",
            span: 24,
          },
          {
            label: "被申请人姓名",
            prop: "name1",
            type: "input",
            span: 6,
          },
          {
            label: "性别",
            prop: "sex1",
            type: "input",
            span: 6,
          },
          {
            label: "名族",
            prop: "person1",
            type: "input",
            span: 6,
          },
          {
            label: "年龄",
            prop: "age1",
            type: "input",
            span: 6,
          },
          {
            label: "职业或业务",
            prop: "work1",
            type: "input",
            span: 12,
          },
          {
            label: "联系方式",
            prop: "phone1",
            type: "input",
            span: 12,
          },
          {
            label: "单位或住址",
            prop: "address1",
            type: "input",
            span: 24,
          },
          {
            label: "纠纷简要情况",
            prop: "mark",
            type: "textarea",
            span: 24,
          },
          {
            label: "申请人申请事项",
            prop: "attention",
            type: "textarea",
            span: 24,
          },
        ]
      },
      form3: {},
      form3Config: {
        rulesForm: {
          phone: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入联系方式",
          },
          type: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入纠纷类型",
          },
          from: {
            required: true,
            trigger: ["blur", "input"],
            message: "请选择案件来源",
          },
          creater: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入申请人",
          },
          assign: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入登记人",
          },
        },
        columns: [
          {
            label: "职业或职务",
            prop: "work",
            type: "input",
            span: 12,
          },
          {
            label: "联系方式",
            prop: "phone",
            type: "input",
            span: 12,
          },
          {
            label: "纠纷类型",
            prop: "type",
            type: "input",
            span: 12,
          },
          {
            label: "案件来源",
            prop: "from",
            type: "select",
            option: [
              {
                text: '申请人申请',
                id: 1
              },
              {
                text: '人民调解委员会主动调解',
                id: 2
              },
            ],
            span: 12,
          },
          {
            label: "纠纷简要情况",
            prop: "mark",
            type: "textarea",
            span: 24,
          },
          {
            label: "申请人",
            prop: "creater",
            type: "input",
            span: 12,
          },
          {
            label: "登记人",
            prop: "assign",
            type: "input",
            span: 12,
          },
        ]
      },
      form4: {},
      form4Config: {
        columns: [
          {
            label: "时间",
            prop: "time",
            type: "input",
            span: 12,
          },
          {
            label: "地点",
            prop: "address",
            type: "input",
            span: 12,
          },
          {
            label: "参加人",
            prop: "adder",
            type: "input",
            span: 12,
          },
          {
            label: "被调查人",
            prop: "namer",
            type: "input",
            span: 12,
          },
          {
            label: "记录",
            prop: "mark",
            type: "textarea",
            span: 24,
          },
          {
            label: "调查人",
            prop: "name1",
            type: "input",
            span: 12,
          },
          {
            label: "被调查人",
            prop: "name2",
            type: "input",
            span: 12,
          },
          {
            label: "记录人",
            prop: "name3",
            type: "input",
            span: 12,
          },
        ]
      },
      form5: {},
      form5Config: {
        rulesForm: {
          time: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入",
          },
          address: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入",
          },
          adder: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入",
          },
          mark: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入",
          },
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请选择",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入",
          },
        },
        columns: [
          {
            label: "时间",
            prop: "time",
            type: "input",
            span: 12,
          },
          {
            label: "地点",
            prop: "address",
            type: "input",
            span: 12,
          },
          {
            label: "申请人",
            prop: "adder",
            type: "input",
            span: 12,
          },
          {
            label: "参加人",
            prop: "namer",
            type: "input",
            span: 12,
          },
          {
            label: "调解记录",
            prop: "mark",
            type: "textarea",
            span: 24,
          },
          {
            label: "调解结果",
            prop: "name1",
            type: "select",
            option: [
              {
                text: '调解成功',
                id: 1
              },
              {
                text: '调解失败',
                id: 2
              },
              {
                text: '调解终止',
                id: 3
              },
              {
                text: '调解撤销',
                id: 4
              },
              {
                text: '调解调解',
                id: 5
              },
            ],
            span: 12,
          },
          {
            label: "人民调查员",
            prop: "name2",
            type: "input",
            span: 12,
          },
          {
            label: "记录人",
            prop: "name3",
            type: "input",
            span: 12,
          },
        ]
      },
      form6: {},
      form6Config: {
        columns: [
          {
            label: "申请人姓名",
            prop: "creater",
            type: "input",
            span: 6,
          },
          {
            label: "性别",
            prop: "sex",
            type: "input",
            span: 6,
          },
          {
            label: "名族",
            prop: "person",
            type: "input",
            span: 6,
          },
          {
            label: "年龄",
            prop: "age",
            type: "input",
            span: 6,
          },
          {
            label: "职业或业务",
            prop: "work",
            type: "input",
            span: 12,
          },
          {
            label: "联系方式",
            prop: "phone",
            type: "input",
            span: 12,
          },
          {
            label: "单位或住址",
            prop: "address",
            type: "input",
            span: 24,
          },
          {
            label: "被申请人姓名",
            prop: "name1",
            type: "input",
            span: 6,
          },
          {
            label: "性别",
            prop: "sex1",
            type: "input",
            span: 6,
          },
          {
            label: "名族",
            prop: "person1",
            type: "input",
            span: 6,
          },
          {
            label: "年龄",
            prop: "age1",
            type: "input",
            span: 6,
          },
          {
            label: "职业或业务",
            prop: "work1",
            type: "input",
            span: 12,
          },
          {
            label: "联系方式",
            prop: "phone1",
            type: "input",
            span: 12,
          },
          {
            label: "单位或住址",
            prop: "address1",
            type: "input",
            span: 24,
          },
          {
            label: "纠纷主要事实、争议事项",
            prop: "mark",
            type: "textarea",
            span: 24,
          },
          {
            label: "经调解，自愿达成以下协议",
            prop: "attention",
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
.w120 {
  width: 240px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 30px;
  span {
    margin: 0 10px;
  }
}

.formContent {
    display: flex;
    justify-content: center;
  .form {
    width: 70%;
  }
}
.accept {
  .el-input {
    width: 60px;
  }
  span {
    margin: 0 10px;
  }
}
.tableContent {
  width: 70%;
  margin-left: 15%;
}
.time {
  width: 70%;
  margin-left: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .agist {
    text-align: end;
    margin: 20px 0;
    .el-input {
      width: 200px;
    }
  }
  span {
    margin: 0 10px;
  }
  .el-input {
    width: 100px;
  }
}
.boxNum {
  text-align: end;
}
.mb20 {
  margin-bottom: 20px;
}
.textcenter {
  text-align: center;
}
.flexEnd {
  display: flex;
  justify-content: flex-end;
  div {
    text-align: end;
    // margin: 10px 20px;
  }
}
</style>