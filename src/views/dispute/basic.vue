<template>
    <!-- 基础人员库 -->
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
      <DisputUserDialog :dialogVisible="userVisible" title="编辑人员" @close="closeDialog"/>
      <DisputUserDetailDialog :dialogVisible="userDetailVisible" title="人员画像" @close="closeDialog1" :nofoot="true"/>
      <Types @close="closeDialog2" :dialogVisible="dialogVisible2" width="40%" title="协同申请" :form="{}" :config="config"/>
    </div>
  </template>
           
           <script>
  import DisputUserDetailDialog from "@/components/dialog/disput/userDetail.vue";
import DisputUserDialog from "@/components/dialog/disput/userDialog.vue";
import Types from '@/components/dialog/reoslve/types.vue';
import publicMethods from "@/mixins/publicMethods";
  export default {
    mixins: [publicMethods],
    name: "basic",
    components: {DisputUserDialog, DisputUserDetailDialog, Types},
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
        SearchbtnList: [
          {
            id: 7,
            text: "新增",
            types: "primary",
            plain: true,
  
            click: () => {
              this.editUser();
            },
            type: "button",
          },
        
        ],
        tableConfig: {
          isCheckAll: true,
          isIndex: true,
          columns: Object.freeze([
            {
              label: "姓名",
              prop: "lineName",
            },
            {
              label: "身份证",
              prop: "getTime",
            },
            {
              label: "电话",
              prop: "towerSection",
            },
            {
              label: "预警",
              prop: "up",
            },
            {
              label: "人员类型",
              prop: "latLon",
            },
            {
              label: "会商",
              prop: "latLonS",
            },
            {
              label: "部门事件数",
              prop: "latLonS",
            },
            {
              label: "纠纷事件数",
              prop: "latLonS",
            },
            {
              label: "性别",
              prop: "latLonS",
            },
            {
              label: "年龄",
              prop: "age",
            },
            {
              label: "操作",
              fixed: "right",
              width: 180,
              actions: [
                {
                  id: "info1",
                  text: "标记",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    this.getDetail1(row);
                  },
                },
                {
                  id: "info2",
                  text: "跟踪",
                  type: "delete",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    console.log(row)
                  },
                },
                {
                  id: "info3",
                  text: "编辑",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    this.editUser(row);
                  },
                },
                {
                  id: "info",
                  text: "查看",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    this.editUserDetail(row);
                  },
                }
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
            label: "人员信息",
            prop: "time",
            type: "dateTimeRange",
          },
          {
            id: 2,
            label: "预警等级",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 3,
            label: "会商",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 4,
            label: "人员类型",
            prop: "dronePilotName",
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
          {
            id: 7,
            text: "重置",
            icon: "el-icon-search",
            plain: true,
  
            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
        
        ],
        titlelistbox: [
          { num: 0, name: "测试1" },
          { num: 0, name: "测试2" },
          { num: 0, name: "测试3" },
          { num: 0, name: "测试4" },
          { num: 0, name: "测试5" },
          { num: 0, name: "测试6" },
        ],
        bgimgs: [
          "#1122dd",
          "#52c41a",
          "#f0b22d",
          "#85e585",
          "#1890ff",
          "#ff4d4f",
          "#a9d5e8",
          "#ffb400",
          "#02a0ff",
          "#e75943",
        ],
        userVisible: false,
        userDetailVisible: false,
        dialogVisible2: false,
        config: {
          rulesForm: {
            message: {
                required: true,
                trigger: ["blur", "input"],
                message: "请选择",
              },
          },
          columns: [
            {
              label: "人员姓名",
              prop: "action",
              type: "input",
              span: 24,
            },
            {
              label: "人员类型",
              prop: "message",
              type: "select",
              option: [
                {
                  text: '标签A',
                  id: 0
                },
                {
                  text: '标签B',
                  id: 1
                },
              ],
              span: 24,
            },
          ]
        },
      };
    },
    computed: {},
    mounted() {},
    methods: {
      handleSelectionChange(val) {
        this.select = val;
      },
      initData() {},
      editUser(val) {
        console.log(val);
        this.userVisible = true;
      },
      editUserDetail(val) {
        console.log(val);
        this.userDetailVisible = true;
      },
      closeDialog() {
        this.userVisible = false;
      },
      closeDialog1() {
        this.userDetailVisible = false;
      },
      getDetail1() {
        this.dialogVisible2 = true;
        console.log('detail');
      },
      closeDialog2() {
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
    // height: calc(100vh - 100px);
    box-sizing: border-box;
    margin: 10px;
    padding: 0 20px;
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
  </style>