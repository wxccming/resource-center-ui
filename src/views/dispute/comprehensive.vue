<template>
    <!-- 综合查询 -->
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
      <DisputDialog :dialogVisible="disputVisible" @close="closeDialog"/>
    </div>
  </template>
           
           <script>
  import DisputDialog from "@/components/dialog/disput/index.vue";
import publicMethods from "@/mixins/publicMethods";
  export default {
    mixins: [publicMethods],
    name: "ecai",
    components: {DisputDialog},
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
        tableConfig: {
          isCheckAll: true,
          isIndex: true,
          columns: Object.freeze([
            {
              label: "事发时间",
              prop: "lineName",
              width: "100",
            },
            {
              label: "事发地址",
              prop: "getTime",
            },
            {
              label: "事件区县名称",
              prop: "towerSection",
            },
            {
              label: "所属社区名称",
              prop: "up",
            },
            {
              label: "事件类型名称",
              prop: "latLon",
            },
            {
              label: "申请人数量",
              prop: "latLonS",
            },
            {
              label: "详细描述",
              prop: "latLonSs",
            },
            {
              label: "采集人姓名",
              prop: "latLonSs",
            },
  
            {
              label: "采集人联系电话",
              prop: "latLonSs",
            },
  
            {
              label: "状态",
              prop: "latLonSs",
            },
  
            {
              label: "操作",
              fixed: "right",
              width: 180,
              actions: [
                {
                  id: "info",
                  text: "查看",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    this.getDetail(row);
                  },
                },
                {
                  id: "info",
                  text: "受理",
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
            id: 2,
            label: "时间",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 3,
            label: "姓名",
            prop: "dronePilotNames",
            type: "input2",
          },
          {
            id: 4,
            label: "联系电话",
            prop: "dronePilotNamess",
            type: "input2",
          },
          {
            id: 4,
            label: "身份证号码",
            prop: "dronePilotNamess",
            type: "input2",
          },
          {
            id: 4,
            label: "矛盾内容",
            prop: "dronePilotNamess",
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
        disputVisible: false,
      };
    },
    computed: {},
    mounted() {},
    methods: {
      handleSelectionChange(val) {
        this.select = val;
      },
      initData() {},
      getDetail(val) {
      this.disputVisible = true;
        console.log('detail', val);
      },
      closeDialog() {
        this.disputVisible = false;
      }
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
    height: calc(100vh - 150px);
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