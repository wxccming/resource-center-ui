<template>
    <div>
          <!--纠纷简易新增-->
      <Dialog
      title="纠纷简易新增"
      :width="`1200px`"
      :dialogVisible="dialogVisible"
      @updateStatus="(val) => (this.dialogVisible = val)"
      @closed="form = {}"
    >
      <div class="dialogContent">
        <div class="dialogForm">
          <DialogForm
            :Form="form"
            :DialogFormConfig="adddialogFormConfig"
            ref="ruleForm"
          />
        </div>

        <div class="dialogFooter">
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            @click="handleClose"
            >取 消</el-button
          >
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            v-preventReClick
            v-loading="load"
            :disabled="load"
            @click="submit"
            type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </Dialog>
       <!--当事人-->
       <Dialog
     title="当事人列表"
      :width="`800px`"
      :dialogVisible="partydialogVisible"
      @updateStatus="(val) => (this.partydialogVisible = val)"
      @closed="dsrform = {}"
    >

    <div name="Header"  class="contabs">
          <el-tabs v-model="dayactiveName" type="card" @tab-click="dayhandleClick">

            <el-tab-pane label="自然人" name="daytab1">

            </el-tab-pane>
            <el-tab-pane label="法人" name="daytab2">

            </el-tab-pane>
            <el-tab-pane label="组织信息" name="daytab3">

            </el-tab-pane>
       

          </el-tabs>
        </div>
      <div class="dialogContent">
        <div class="dialogForm">
          <DialogForm
            :Form="dsrform"
            :DialogFormConfig="partyialogFormConfig"
            ref="ruleForm"
          />
        </div>

        <div class="dialogFooter">
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            @click="partydialogVisible = false"
            >取 消</el-button
          >
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            v-preventReClick
            v-loading="load"
            :disabled="load"
            @click="submit"
            type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </Dialog>
         <!--代理人-->
         <Dialog
     title="代理人"
      :width="`520px`"
      :dialogVisible="dlrdialogVisible"
      @updateStatus="(val) => (this.dlrdialogVisible = val)"
      @closed="dsrform = {}"
    >
      <div class="dialogContent">
        <div class="dialogForm">
          <DialogForm
            :Form="dsrform"
            :DialogFormConfig="dlrdialogFormConfig"
            ref="ruleForm"
          />
        </div>

        <div class="dialogFooter">
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            @click="dlrdialogVisible = false"
            >取 消</el-button
          >
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            v-preventReClick
            v-loading="load"
            :disabled="load"
            @click="submit"
            type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </Dialog>
         <!--陪同方-->
         <Dialog
     title="陪同方"
      :width="`520px`"
      :dialogVisible="ptfdialogVisible"
      @updateStatus="(val) => (this.ptfdialogVisible = val)"
      @closed="dsrform = {}"
    >
      <div class="dialogContent">
        <div class="dialogForm">
          <DialogForm
            :Form="dsrform"
            :DialogFormConfig="ptfdialogFormConfig"
            ref="ruleForm"
          />
        </div>

        <div class="dialogFooter">
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            @click="ptfdialogVisible = false"
            >取 消</el-button
          >
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            v-preventReClick
            v-loading="load"
            :disabled="load"
            @click="submit"
            type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </Dialog>
    </div>
  </template>
  <script>
  export default {
    name: 'suggestDialog',
    data() {
      return {
      
        form:{},
        adddialogFormConfig: {
        rulesForm: {
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 发现时间",
          },

          name2: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 纠纷来源",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 是否紧急",
          },
          name4: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 纠纷类型",
          },
          name5: {
            required: true,
            trigger: ["blur", "popover"],
            message: "请输入 事发区域",
          },
          name6: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 发生地址",
          },
          name7: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 纠纷简述",
          },
          name8: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 当事人列表",
          },
          name20: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 调解地点",
          },
          name21: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 调解时间",
          },
          name22: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 调解定级",
          },
          name23: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 调解记录",
          },
        },
        columns: [
          {
            label: "发现时间",
            prop: "name1",
            type: "dateTime",
            span: 6,
          },
          {
            label: "纠纷来源",
            prop: "name2",
            type: "select",
            option: [
              {
                text: "中心交办",
                id: 1,
              },
              {
                text: "排查发现",
                id: 2,
              },
            ],
            span: 6,
          },
          {
            label: "初步定级",
            prop: "name10",
            type: "select",
            option: [
              {
                text: "红",
                id: 1,
              },
              {
                text: "黄",
                id: 2,
              },
              {
                text: "蓝",
                id: 3,
              },
            ],
            span: 6,
          },
          {
            label: "涉及人数",
            prop: "name11",
            type: "input",
            span: 6,
          },
          {
            label: "是否紧急",
            prop: "name3",
            type: "radio",
            radioList: [
              {
                text: "紧急",
                value: "紧急",
              },
              {
                text: "普通",
                value: "普通",
              },
            ],
            span: 6,
          },
          {
            label: "是否风险",
            prop: "name12",
            type: "radio",
            radioList: [
              {
                text: "无",
                value: "无",
              },
              {
                text: "有",
                value: "有",
              },
            ],
            span: 6,
          },
          {
            label: "纠纷类型",
            prop: "name4",
            type: "select",
            option: [
              {
                text: "婚恋家庭纠纷",
                id: 1,
              },
              {
                text: "邻里纠纷",
                id: 2,
              },
              {
                text: "特殊人群纠纷",
                id: 3,
              },
            ],

            span: 24,
          },

          {
            label: "事发区域",
            prop: "name5",
            type: "cascader",
            options: [
              {
                label1: "中国",
                children1: [
                  {
                    label1: "测试1",
                    children1: [
                      {
                        label1: "测试2",
                      },
                    ],
                  },
                ],
              },
            ],
            props: {
              children: "children1",
              label: "label1",
            },
            onChange(v) {
              console.log(v);
              // 用于清除form校验
              // this.$refs['formItem'].$emit('el.form.blur', v)
            },
            span: 24,
          },
          {
            label: "发生地址",
            prop: "name6",
            type: "input",

            span: 18,
          },
          {
           
            text: "添加定位",
            type: "btn",
            style:"margin-left:0 !important;",
            span: 4,
          },
          {
            label: "纠纷简述",
            prop: "name7",
            type: "textarea",

            span: 24,
          },
          {
            label: "调解地点",
            prop: "name20",
            type: "input",

            span: 24,
          },
          {
            label: "调解时间",
            prop: "name21",
            type: "dateTime",

            span: 6,
          },
          {
            label: "调解定级",
            prop: "name22",
            type: "select",
            option: [
              {
                text: "红",
                id: 1,
              },
              {
                text: "黄",
                id: 2,
              },
              {
                text: "蓝",
                id: 3,
              },
            ],

            span: 6,
          },
          {
            label: "调解记录",
            prop: "name23",
            type: "textarea",

            span: 24,
          },
          {
            label: "主要诉求",
            prop: "name13",
            type: "addinput",
            addarray: [1],
            addClick() {
              this.addarray.push(1);
              // 用于清除form校验
              // this.$refs['formItem'].$emit('el.form.blur', v)
            },
            delClick(index) {
              console.log(index);
              // this.form.value.splice(index,1)   //先删除form中value对应索引的值
              this.addarray.splice(index, 1); //然后删除array对应索引的值，实现点击删除按钮，减少input框效果
            },

            span: 20,
          },
       
          {
            label: "当事人列表",
            prop: "name8",
            addClick:()=>{
      
            this.partydialogVisible=true
            },

            type: "addlist",
            adddatalist:[{name:1}],
            span: 24,
          },
          {
            label: "调解协议书",
            prop: "name30",
            type: "uploadInput",
            span: 12,
          },
          {
            label: "附件信息",
            prop: "name31",
            type: "uploadInput",
            span: 12,
          },
        
        ],
      },
      partydialogVisible:false,
      ptfdialogFormConfig: {
        rulesForm: {
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 姓名",
          },

          name2: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 证件号码",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 性别",
          },
          name4: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 联系方式",
          },
    
        },
        columns: [
          {
            label: "姓名",
            prop: "name1",
            type: "input",
            span: 24,
          },
          {
            label: "证件号码",
            prop: "name2",
            type: "input",
            span: 24,
          },
          {
            label: "性别",
            prop: "name3",
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
            span: 24,
          },
          {
            label: "联系方式",
            prop: "name4",
            type: "input",
            span: 24,
          },
          {
            label: "地址",
            prop: "name5",
            type: "input",
            span: 24,
          },
          {
            label: "工作单位",
            prop: "name6",
            type: "input",
            span: 24,
          },
       

          
         
        ],
      },
      dlrdialogVisible:false,
      dlrdialogFormConfig: {
        rulesForm: {
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 姓名",
          },

          name2: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 证件号码",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 性别",
          },
          name4: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 联系方式",
          },
    
        },
        columns: [
          {
            label: "姓名",
            prop: "name1",
            type: "input",
            span: 24,
          },
          {
            label: "证件号码",
            prop: "name2",
            type: "input",
            span: 24,
          },
          {
            label: "性别",
            prop: "name3",
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
            span: 24,
          },
          {
            label: "联系方式",
            prop: "name4",
            type: "input",
            span: 24,
          },
          {
            label: "地址",
            prop: "name5",
            type: "input",
            span: 24,
          },
          {
            label: "工作单位",
            prop: "name6",
            type: "input",
            span: 24,
          },
          {
            label: "上传委托书",
            prop: "name10",
            type: "uploadInput",
            span: 24,
          },

          
         
        ],
      },
      dsrform:{},
      ptfdialogVisible:false,
      partyialogFormConfig: {
        rulesForm: {
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 身份",
          },

          name2: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 证件类型",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 现场来访",
          },
          name4: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 姓名",
          },
          name5: {
            required: true,
            trigger: ["blur", "popover"],
            message: "请输入 性别",
          },
          name6: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 证件号码",
          },
          name7: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 联系方式",
          },
          name8: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 联系地址",
          },
        },
        columns: [
          {
            label: "身份",
            prop: "name1",
            type: "select",
            option: [
              {
                text: "当事人",
                id: 1,
              },
              {
                text: "被当事人",
                id: 2,
              },
            ],
            span: 24,
          },
          {
            label: "证件类型",
            prop: "name2",
            type: "select",
            option: [
              {
                text: "身份证",
                id: 1,
              },
              {
                text: "无证件",
                id: 2,
              },
            ],
            span: 24,
          },
          {
            label: "现场来访",
            prop: "name3",
            type: "radio",
            radioList: [
              {
                text: "是",
                value: "是",
              },
              {
                text: "否",
                value: "否",
              },
            ],
            span: 24,
          },
          {
            label: "姓名",
            prop: "name4",
            type: "input",
            span: 24,
          },
          {
            label: "性别",
            prop: "name5",
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
            span: 24,
          },
          {
            label: "证件号码",
            prop: "name6",
            type: "input",
            span: 24,
          },
          {
            label: "标签名称",
            prop: "name10",
            type: "input",
            span: 24,
          },

          {
            label: "联系方式",
            prop: "name7",
            type: "input",
            span: 24,
          },
          {
            label: "联系地址",
            prop: "name8",
            type: "input",

            span: 24,
          },
          {
            label: "户籍地址",
            prop: "name11",
            type: "input",
            span: 24,
          },
          {
            label: "工作单位",
            prop: "name13",
            type: "input",
            span: 24,
          },
          {
            text:'添加代理人',       
            type: "btn",
            click:()=>{
              this.dlrdialogVisible=true
            },
            span: 6,
          },
          {
            text:'添加陪同方',       
            type: "btn",
            click:()=>{
              this.ptfdialogVisible=true
              
            },
            span: 6,
          },
          
         
        ],
      },
      dayactiveName: 'daytab1',
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
    watch: {
    dialogVisible(val) {
        
       if(!val){
        this.$emit('close')
       }
    },
  
  },
    methods: {
        dayhandleClick(tab, event) {
      if(tab.index=='0'){
        this.partyialogFormConfig= 
        {
        rulesForm: {
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 身份",
          },

          name2: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 证件类型",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 现场来访",
          },
          name4: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 姓名",
          },
          name5: {
            required: true,
            trigger: ["blur", "popover"],
            message: "请输入 性别",
          },
          name6: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 证件号码",
          },
          name7: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 联系方式",
          },
          name8: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 联系地址",
          },
        },
        columns: [
          {
            label: "身份",
            prop: "name1",
            type: "select",
            option: [
              {
                text: "当事人",
                id: 1,
              },
              {
                text: "被当事人",
                id: 2,
              },
            ],
            span: 24,
          },
          {
            label: "证件类型",
            prop: "name2",
            type: "select",
            option: [
              {
                text: "身份证",
                id: 1,
              },
              {
                text: "无证件",
                id: 2,
              },
            ],
            span: 24,
          },
          {
            label: "现场来访",
            prop: "name3",
            type: "radio",
            radioList: [
              {
                text: "是",
                value: "是",
              },
              {
                text: "否",
                value: "否",
              },
            ],
            span: 24,
          },
          {
            label: "姓名",
            prop: "name4",
            type: "input",
            span: 24,
          },
          {
            label: "性别",
            prop: "name5",
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
            span: 24,
          },
          {
            label: "证件号码",
            prop: "name6",
            type: "input",
            span: 24,
          },
          {
            label: "标签名称",
            prop: "name10",
            type: "input",
            span: 24,
          },

          {
            label: "联系方式",
            prop: "name7",
            type: "input",
            span: 24,
          },
          {
            label: "联系地址",
            prop: "name8",
            type: "input",

            span: 24,
          },
          {
            label: "户籍地址",
            prop: "name11",
            type: "input",
            span: 24,
          },
          {
            label: "工作单位",
            prop: "name13",
            type: "input",
            span: 24,
          },
          {
            text:'添加代理人',       
            type: "btn",
            click:()=>{
              this.dlrdialogVisible=true
            },
            span: 6,
          },
          {
            text:'添加陪同方',       
            type: "btn",
            click:()=>{
              this.ptfdialogVisible=true
              
            },
            span: 6,
          },
          
         
        ],
      }
      }else if(tab.index=='1'){
        this.partyialogFormConfig= 
        {
        rulesForm: {
          name21: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 身份",
          },

          name22: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 现场来访",
          },
          name23: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 组织名称",
          },
          name24: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 信用代码",
          },
          name25: {
            required: true,
            trigger: ["blur", "popover"],
            message: "请输入 法人代表",
          },
          name26: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 法人联系方式",
          },
          name27: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 负责人",
          },
          name28: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 负责人联系方式",
          },
          name29: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 地址",
          },
        },
        columns: [
          {
            label: "身份",
            prop: "name21",
            type: "select",
            option: [
              {
                text: "当事人",
                id: 1,
              },
              {
                text: "被当事人",
                id: 2,
              },
            ],
            span: 24,
          },
       
          {
            label: "现场来访",
            prop: "name22",
            type: "radio",
            radioList: [
              {
                text: "是",
                value: "是",
              },
              {
                text: "否",
                value: "否",
              },
            ],
            span: 24,
          },
          {
            label: "组织名称",
            prop: "name23",
            type: "input",
            span: 24,
          },
        
          {
            label: "信用代码",
            prop: "name24",
            type: "input",
            span: 24,
          },
          {
            label: "标签名称",
            prop: "name10",
            type: "input",
            span: 24,
          },
          {
            label: "法人代表",
            prop: "name25",
            type: "input",
            span: 24,
          },
          {
            label: "法人联系方式",
            prop: "name26",
            type: "input",
            span: 24,
          },

          {
            label: "负责人",
            prop: "name27",
            type: "input",
            span: 24,
          },
          {
            label: "负责人联系方式",
            prop: "name28",
            type: "input",

            span: 24,
          },
          {
            label: "地址",
            prop: "name11",
            type: "input",
            span: 24,
          },
     
          {
            text:'添加代理人',       
            type: "btn",
            click:()=>{
              this.dlrdialogVisible=true
            },
            span: 6,
          },
          {
            text:'添加陪同方',       
            type: "btn",
            click:()=>{
              this.ptfdialogVisible=true
              
            },
            span: 6,
          },
          
         
        ],
      }
      }else if(tab.index=='2'){
        this.partyialogFormConfig= 
        {
        rulesForm: {
          name1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 身份",
          },

          name2: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 现场来访",
          },
          name3: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 组织名称",
          },
          name4: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 信用代码",
          }, 
          name7: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 负责人",
          },
          name8: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 负责人联系方式",
          },
          name9: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 地址",
          },
        },
        columns: [
          {
            label: "身份",
            prop: "name1",
            type: "select",
            option: [
              {
                text: "当事人",
                id: 1,
              },
              {
                text: "被当事人",
                id: 2,
              },
            ],
            span: 24,
          },
       
          {
            label: "现场来访",
            prop: "name2",
            type: "radio",
            radioList: [
              {
                text: "是",
                value: "是",
              },
              {
                text: "否",
                value: "否",
              },
            ],
            span: 24,
          },
          {
            label: "组织名称",
            prop: "name3",
            type: "input",
            span: 24,
          },
        
          {
            label: "信用代码",
            prop: "name4",
            type: "input",
            span: 24,
          },
          {
            label: "标签名称",
            prop: "name10",
            type: "input",
            span: 24,
          },
     
   

          {
            label: "负责人",
            prop: "name7",
            type: "input",
            span: 24,
          },
          {
            label: "负责人联系方式",
            prop: "name8",
            type: "input",

            span: 24,
          },
          {
            label: "地址",
            prop: "name11",
            type: "input",
            span: 24,
          },
     
          {
            text:'添加代理人',       
            type: "btn",
            click:()=>{
              this.dlrdialogVisible=true
            },
            span: 6,
          },
          {
            text:'添加陪同方',       
            type: "btn",
            click:()=>{
              this.ptfdialogVisible=true
              
            },
            span: 6,
          },
          
         
        ],
      }
      }
      console.log(tab, 'tab');
    },
        handleClose() {
      this.$emit('close')
    }
    }
  }
  </script>
  <style lang="scss" scoped>
.contabs {

box-sizing: border-box;

}

::v-deep .contabs .el-tabs--card>.el-tabs__header {
border-bottom: 1px solid #fff !important;
}

::v-deep .contabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
border: none !important;
}

::v-deep .contabs .el-tabs--card>.el-tabs__header .el-tabs__item {
// border-bottom: 2px solid #fff !important;
border-left: none !important;
color: #000;
font-size: 14px;
}

::v-deep .contabs .el-tabs__item.is-active {
// color: red !important; //选中
color: #5f7cef;
border-bottom: 4px solid #5f7cef !important;
// opacity: 1;
}

::v-deep .contabs .el-tabs__item {
padding: 0;
margin: 0 20px;
}

::v-deep .contabs .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
padding: 0 !important;
}

::v-deep .contabs .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
padding: 0 !important;
}
.dialogContent{
    padding: 0;
}
</style>