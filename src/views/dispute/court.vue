<template>
  <!-- 法院数据模块 -->
  <div class="home">
    <div class="titlebox">
      <span style="color: rgba(0, 0, 0, 0.45)">首页 &nbsp;/&nbsp;</span>
      <span style="color: rgba(0, 0, 0, 0.45)">{{ name1 }} &nbsp;/&nbsp;</span>
      <span>{{ name2 }}</span>
    </div>
    <div class="con">
      <div class="contabs">
        <el-tabs
          v-model="dayactiveName"
          type="card"
          @tab-click="dayhandleClick"
        >
          <el-tab-pane label="信访案件" name="daytab1"> </el-tab-pane>
          <el-tab-pane label="审理案件" name="daytab2"> </el-tab-pane>
          <el-tab-pane label="诉前调案件" name="daytab3"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="contop">
        <div class="titelebox">中国</div>
        <div class="titeletotal">1061</div>
        <div class="titlecon">
          <ul>
            <li v-for="(item, index) in titlelistbox" :key="item.name">
              <div class="titletop">
                <div
                  class="titledw"
                  :style="{ background: bgimgs[index] }"
                ></div>
                <div class="titlenum">{{ item.name }}</div>
              </div>
              <div class="titlename">
                <div>{{ item.num }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
  </div>
</template>
         
         <script>
import DisputDialog from "@/components/dialog/disput/index.vue";
import publicMethods from "@/mixins/publicMethods";
export default {
  mixins: [publicMethods],
  name: "people",
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
      select: [],
      dayactiveName: "daytab1",
      SearchbtnList: [
        {
          id: 8,
          text: "批量删除",
          types: "danger",
          plain: true,

          click: () => {
            if(!this.select.length) {
              this.$message.warning('至少选择一条数据进行删除');
              return
            };
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
            label: "一案一码",
            prop: "lineName",
          },
          {
            label: "预警结果",
            prop: "getTime",
            dataType: "tag",
            formatData: (val) => val,
            formatType: this.getColor
          },
          {
            label: "案由",
            prop: "towerSection",
          },
          {
            label: "申请人名称",
            prop: "up",
          },
          {
            label: "身份证号码",
            prop: "latLon",
          },
          {
            label: "联系电话",
            prop: "latLons",
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
          label: "时间",
          prop: "time",
          type: "dateTimeRange",
        },
        {
          id: 2,
          label: "一案一码",
          prop: "dronePilotName",
          type: "input2",
        },
        {
          id: 3,
          label: "人员信息",
          prop: "dronePilotName",
          type: "input2",
        },
        {
          id: 4,
          label: "预警等级",
          prop: "dronePilotName",
          type: "input2",
        },
        {
          id: 5,
          label: "案由",
          prop: "dronePilotName",
          type: "input2",
        },
        {
          id: 6,
          label: "申请人姓名",
          prop: "dronePilotNames",
          type: "input2",
        },
        {
          id: 7,
          label: "申请人身份证号码",
          prop: "dronePilotNamess",
          type: "input2",
        },

        {
          id: 7,
          text: "查询",

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

          plain: true,

          click: () => {
            this.formInline.pageNum = 1;
            this.initData();
          },
          type: "button",
        },
        {
          id: 8,
          text: "导入",

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
    dayhandleClick(tab, event) {
      if (tab._props.name == "daytab1") {
        (this.SearchConfig = [
          {
            id: 1,
            label: "时间",
            prop: "time",
            type: "dateTimeRange",
          },
          {
            id: 2,
            label: "一案一码",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 3,
            label: "人员信息",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 4,
            label: "预警等级",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 5,
            label: "案由",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 6,
            label: "申请人姓名",
            prop: "dronePilotNames",
            type: "input2",
          },
          {
            id: 7,
            label: "申请人身份证号码",
            prop: "dronePilotNamess",
            type: "input2",
          },

          {
            id: 7,
            text: "查询",

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

            plain: true,

            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
          {
            id: 8,
            text: "导入",

            plain: true,

            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
        ]),
          (this.tableConfig = {
            isCheckAll: true,
            isIndex: true,
            columns: Object.freeze([
              {
                label: "一案一码",
                prop: "lineName",
              },
              {
                label: "预警结果",
                prop: "getTime",
              },
              {
                label: "案由",
                prop: "towerSection",
              },
              {
                label: "申请人名称",
                prop: "up",
              },
              {
                label: "身份证号码",
                prop: "latLon",
              },
              {
                label: "联系电话",
                prop: "latLons",
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
                      this.$router.push(`/achievement/analysisAi/photoProcess`);
                    },
                  },
                  {
                    id: "info",
                    text: "删除",
                    // permission: "FinePatro:findJxhTask",
                    click: (row) => {
                      this.$router.push(`/achievement/analysisAi/photoProcess`);
                    },
                  },
                ],
              },
            ]),
          });
      } else if (tab._props.name == "daytab2") {
        this.SearchConfig = [
          {
            id: 1,
            label: "时间",
            prop: "time",
            type: "dateTimeRange",
          },
          {
            id: 2,
            label: "一案一码",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 3,
            label: "人员信息",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 4,
            label: "案由",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 5,
            label: "申请人姓名",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 6,
            label: "申请人身份证号码",
            prop: "dronePilotNames",
            type: "input2",
          },

          {
            id: 7,
            text: "查询",

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

            plain: true,

            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
          {
            id: 8,
            text: "导入",

            plain: true,

            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
        ];
        this.tableConfig = {
          isCheckAll: true,
          isIndex: true,
          columns: Object.freeze([
            {
              label: "一案一码",
              prop: "lineName",
            },
            {
              label: "案由",
              prop: "getTime",
            },
            {
              label: "申请人姓名或名称",
              prop: "towerSection",
            },
            {
              label: "证件号码",
              prop: "up",
            },
            {
              label: "电话电话",
              prop: "latLon",
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
                    this.$router.push(`/achievement/analysisAi/photoProcess`);
                  },
                },
                {
                  id: "info",
                  text: "删除",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    this.$router.push(`/achievement/analysisAi/photoProcess`);
                  },
                },
              ],
            },
          ]),
        };
      } else if (tab._props.name == "daytab3") {
        this.SearchConfig = [
          {
            id: 1,
            label: "时间",
            prop: "time",
            type: "dateTimeRange",
          },
          {
            id: 2,
            label: "一案一码",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 3,
            label: "人员信息",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 4,
            label: "案由",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 5,
            label: "申请人姓名",
            prop: "dronePilotName",
            type: "input2",
          },
          {
            id: 6,
            label: "申请人身份证号码",
            prop: "dronePilotNames",
            type: "input2",
          },
          {
            id: 7,
            text: "查询",

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

            plain: true,

            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
          {
            id: 8,
            text: "导入",

            plain: true,

            click: () => {
              this.formInline.pageNum = 1;
              this.initData();
            },
            type: "button",
          },
        ];
        this.tableConfig = {
          isCheckAll: true,
          isIndex: true,
          columns: Object.freeze([
            {
              label: "一案一码",
              prop: "lineName",
            },
            {
              label: "案由",
              prop: "getTime",
            },
            {
              label: "申请人姓名或名称",
              prop: "towerSection",
            },
            {
              label: "证件号码",
              prop: "up",
            },
            {
              label: "联系电话",
              prop: "latLon",
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
                    this.$router.push(`/achievement/analysisAi/photoProcess`);
                  },
                },
                {
                  id: "info",
                  text: "删除",
                  // permission: "FinePatro:findJxhTask",
                  click: (row) => {
                    this.$router.push(`/achievement/analysisAi/photoProcess`);
                  },
                },
              ],
            },
          ]),
        };
      }
    },
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
    },
    getColor(val) {
      console.log(val);
      const obj = {
        '未预警': 'warning',
        '1级(简单)(0)': 'success'
      }
      return obj[val] || 'success';
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
.contabs {
  margin-left: -20px;
  box-sizing: border-box;
}
::v-deep .contabs .el-tabs--card > .el-tabs__header {
  border-bottom: none !important;
}

::v-deep .contabs .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
}

::v-deep .contabs .el-tabs--card > .el-tabs__header .el-tabs__item {
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

::v-deep
  .contabs
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:nth-child(2) {
  padding: 0 !important;
}

::v-deep
  .contabs
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:last-child {
  padding: 0 !important;
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
  padding: 0 20px 20px 20px;
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