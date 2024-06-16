<template>
  <!-- 管理员管理 -->
  <div class="home">
    <div class="titlebox">
      <span style="color: rgba(0, 0, 0, 0.45)">首页 &nbsp;/&nbsp;</span>
      <span style="color: rgba(0, 0, 0, 0.45)">{{ name1 }} &nbsp;/&nbsp;</span>
      <span>{{ name2 }}</span>
    </div>
    <div class="con">
    
      <content-layout>

        <template slot="search">
          <search
          class="search"
            :SearchConfig="SearchConfig"
            :formInline="formInline"
            pageTitle=" "
          ></search>
        </template>
        <template slot="content">
          <div class="table">
            <Table
              class="table"
              :tableStyle="`border-radius: 2px;`"
              :TableConfig="tableConfig"
              :SearchbtnList="SearchbtnList"
              :tableData="tableData"
              tableHeight="100%"
              getRowKey="id"
              :pageSize="formInline.pageSize"
              :pageNum="formInline.pageNum"
              :handleSelectionChange="handleSelectionChange"
            />
            <Pagination
              :pageSize="formInline.pageSize"
              :pageNum="formInline.pageNum"
              :total="formInline.total"
              :handleCurrentChange="
                (val) => handleCurrentChange(val, 'formInline', initData)
              "
            />
          </div>
        </template>
      </content-layout>
    </div>
    <DisputDialog :dialogVisible="disputVisible" @close="closeDialog"/>
    <Types ref="typeDialog" @close="closeDialog1" :dialogVisible="dialogVisible2" width="40%" :title="dialogTitle" :form="dialogForm" :config="config"/>
  </div>
</template>
    
<script>
import DisputDialog from "@/components/dialog/disput/index.vue";
import Types from '@/components/dialog/reoslve/types.vue';
import publicMethods from "@/mixins/publicMethods";
var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    let reg = /^[0-9A-Za-z]{8,20}$/;
    if(!reg.test(value)) {
      callback(new Error('密码由8-20位数字、字母组成'));
    } else {
      callback();
    }
  }
};
var validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else {
    let reg = /^1\d{10}$/;
    if(!reg.test(value)) {
      callback(new Error('请输入11位数字的手机号'));
    } else {
      callback();
    }
  }
};
export default {
  mixins: [publicMethods],
  name: "dispute",
  components: {DisputDialog, Types},
  props: {
    name1: {
      type: String,
      name1: "",
    },
    name2: {
      type: String,
      name2: "",
    },
  },
  created() {},
  beforeDestroy() {},
  data() {
     
    return {
      select: [],
      SearchbtnList: [
        {
          id: 7,
          text: "新增管理员",
          types: "primary",
          plain: true,

          click: (val) => {      
            this.getDetail1();
          },
          type: "button",
        },
        {
          id: 8,
          text: "删除管理员",
     
          plain: true,

          click: () => {
           
            this.initData();
          },
          type: "button",
        },
       
      ],
      tableConfig: {
        isCheckAll: true,
        isIndex: true,
        columns: Object.freeze([
          {
            label: "管理员姓名",
            prop: "lineName",
          },
          {
            label: "账号/手机号",
            prop: "getTime",
           
          },
          {
            label: "角色",
            prop: "towerSection",
          },
          {
            label: "创建时间",
            prop: "up",
          },

       

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
            {
                id: "info1",
                text: "修改",
              
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.$router.push(`/achievement/analysisAi/photoProcess`);
                },
              },         
              {
                id: "info1",
                text: "删除",
                type: 'delete',
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.$router.push(`/achievement/analysisAi/photoProcess`);
                },
              },
            ],
          },
        ]),
      },
      tableData: [
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: ["1级(简单)(0)", "2级"],
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: ["1级(简单)(0)", "未预警"],
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: ["1级(简单)(0)", "未预警"],
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
        {
          time: "",
          lineName: "B009824050898010174PUFW9BZ",
          getTime: "1级(简单)(0)",
          towerSection: "纠纷类别1",
          up: "司法当事人1司法当事人2",
          latLon: "地区1",
          dangerTypeName: "调解人员1",
        },
      ],
      formInline: {
        pageSize: 20,
        pageNum: 1,
        total: 10,
        data: [],
      },

      SearchConfig: [
      {
          id: 1,
          label: "用户账号",
          prop: "dronePilotNames",
          type: "input2",
          placeholder:"请输入管理员账号",
        },

        {
          id: 2,
          label: "姓名",
          prop: "dronePilotName",
          placeholder:"请输入管理员姓名",
          type: "input2",
        
        },
  
        {
          id: 7,
          text: "查询",
          icon: "el-icon-search",
          plain: true,

          click: () => {
            this.formInline.pageNum = 1;
            this.initData();
          },
          type: "button",
        },
       
     
      ],
      disputVisible: false,
      dialogVisible2: false,
      dialogForm: {
        userType: "",
        userName: "",
        phone: "",
        password: "Jyzy2024",
        role: [],
        unit: '',
      },
      dialogTitle: ''
    };
  },
  computed: {
    config() {
      console.log(validatePhone);
      const configs = {
        rulesForm: {
          userType: {
            required: true,
            trigger: "change",
            message: "请选择",
          },
          unit: {
            required: true,
            trigger: "change",
            message: "请选择",
          },
          username: [
            {
              required: true,
              trigger: ["blur", "input"],
              message: "请输入",
            },
            { max: 6, min: 2, message: '输入2-6个字符', trigger: 'blur' }
          ],
          phone: {
            required: true,
            validator: validatePhone,
            trigger: ["blur", "input"],
          },
          password: {
            required: true,
            validator: validatePass,
            trigger:  ["blur", "input"],
          },
          role: {
            required: true,
            trigger: "change",
            message: "请选择",
          },
        },
        columns: [
          {
            label: "用户分类",
            prop: "userType",
            type: "select",
            span: 24,
            width: "width: 100%",
            option: [
              {
                text: '平台管理员',
                id: 1
              },
              {
                text: '出版社管理员',
                id: 2
              },
            ],
            onChange: (val) => {
              // this.$refs.typeDialog.reset();
            }
          },
          {
            label: "出版单位",
            prop: "unit",
            type: "select",
            span: 24,
            width: "width: 100%",
            // hide: this.dialogForm.userType == 2 ? false : true,
            option: [
              {
                text: '出版社1',
                id: 1
              },
              {
                text: '出版社2',
                id: 2
              },
            ]
          },
          {
            label: "姓名",
            prop: "username",
            type: "input",
            span: 24,
          },
          {
            label: "手机号码",
            prop: "phone",
            type: "input",
            span: 24,
          },
          {
            label: "密码",
            prop: "password",
            type: "input",
            span: 24,
          },
          {
            label: "角色",
            prop: "role",
            type: "select",
            span: 24,
            width: "width: 100%",
            multiple: true,
            option: [
              {
                text: '资源管理员',
                id: 1
              },
              {
                text: '资源审核员',
                id: 2
              },
            ]
          },
        ]
      }
      return configs;
    }
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      this.select = val;
      console.log(val, 'val');
    },
    initData() {},
    getDetail(val) {
      this.disputVisible = true;
      console.log('detail', val);
    },
    closeDialog() {
      this.disputVisible = false;
    },
    getColor(val) {
      console.log(val);
      const obj = {
        '未预警': 'warning',
        'I 级(简单)(0)': 'success',
        "2级": "danger"
      }
      return obj[val] || 'success';
    },
    getDetail1() {
      this.dialogTitle = '新增管理员';
      this.dialogVisible2 = true;
    },
    closeDialog1() {
      this.dialogVisible2 = false;
    },
  },
  watch: {},
};
</script>
    <style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}
.home {
  width: 100%;
  height: calc(100vh - 100px);
  background: #f4f5f9;
}
.titlebox {
  width: 100%;
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  padding: 15px 40px;

  span {
    font-size: 14px;
  }
}
.con {
  width: 100%;
  height: calc(100vh - 160px);
  box-sizing: border-box;
  margin: 10px;
  padding: 20px;
  background: #fff;
}
.contop {
  width: 100%;
  height: 65px;
  border: 1px solid #59adfc;
  display: flex;
  padding: 10px 80px;
  align-items: center;
  .titelebox {
    font-size: 20px;
  }
  .titeletotal {
    font-size: 20px;
    color: #565feb;
    margin-left: 20px;
  }
}

.titlecon {
  width: 70%;
  height: 100%;
  margin-left: 50px;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
  }
  ul li {
    border: 1px solid #188ffe;
    width: 160px;
    height: 44px;
    background: #fff;
    border-radius: 7px;
    margin-left: 8px;
    // margin-top: 8px;
    padding: 6px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    font-size: 16px;
    .titletop {
      width: 200px;
      height: 100%;
      align-items: center;

      display: flex;
    }
    .titledw {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
::v-deep .layout .search{

  margin-top: 0 !important;
}
</style>