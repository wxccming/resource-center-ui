<template>
  <!-- 资源审核管理 -->
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
    <Types @close="closeDialog1" :dialogVisible="dialogVisible2" width="40%" title="协同申请" :form="{}" :config="config"/>
  </div>
</template>
    
    <script>
import DisputDialog from "@/components/dialog/disput/index.vue";
import Types from '@/components/dialog/reoslve/types.vue';
import publicMethods from "@/mixins/publicMethods";
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
          text: "审核通过",
          types: "primary",
          plain: true,

          click: (val) => {      
            this.getDetail1();
          },
          type: "button",
        },
        {
          id: 8,
          text: "审核不通过",
          plain: true,

          click: () => {
            if(!this.select.length) {
              this.$message.warning('至少选择一条数据进行下线');
              return
            };
            this.initData();
          },
          type: "button",
        },
        {
          id: 9,
          text: "批量删除",
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
            label: "资源标题",
            prop: "lineName",
          },
          {
            label: "上传时间",
            prop: "getTime",
           
          },
          {
            label: "资源来源",
            prop: "towerSection",
          },
          {
            label: "类型",
            prop: "up",
          },
          {
            label: "审核状态",
            prop: "latLon",
          },
          {
            label: "审核人员",
            prop: "name",
          },
       

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
              {
                id: "info",
                text: "审核",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.getDetail(row);
                },
              },
              {
                id: "info1",
                text: "详情",
              
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
          label: "审核状态",
          prop: "time",
          type: "select",
          option: [
            { text: "待审核", id: 1 },
            { text: "审核不通过", id: 2 },
            { text: "审核通过", id: 3 },
          ],
        },
        {
          id: 2,
          label: "资源来源",
          prop: "dronePilotName",
          type: "select",
          option: [
            { text: "出版社提供", id: 1 },
            { text: "第三方引入", id: 2 },
            { text: "应用提供", id: 2 },
          ],
        },
        {
          id: 3,
          label: "类型",
          prop: "dronePilotName",
          type: "select",
          option: [
            { text: "教案", id: 1 },
            { text: "课件", id: 2 },
            { text: "习题", id: 3 },
          ],
        },
        {
          id: 4,
          label: "标题",
          prop: "dronePilotName",
          placeholder:"请输入资源标题",
          type: "input2",
        
        },
        {
          id: 5,
          label: "资源编目",
          prop: "dronePilotName",
          type: "select",
          placeholder:"请选择学段",
          width:"290px",
          option: [
            { text: "幼儿园", id: 1 },
            { text: "小学", id: 2 },
            { text: "初中", id: 3 },
            { text: "高中", id: 4 },
            { text: "中职", id: 5 },
            { text: "特殊教育", id: 6 },
          ],
        },
        {
          id: 6,
          prop: "dronePilotName",
          placeholder:"请选择年级",
          width:"290px",
          type: "select",
          option: [
            { text: "一年级", id: 1 },
            { text: "二年级", id: 2 },
            { text: "三年级", id: 3 },
            { text: "四年级", id: 4 },
            { text: "五年级", id: 5 },
            { text: "六年级", id: 6 },
          ],
        },
        {
          id: 7,
          prop: "dronePilotName",
          width:"290px",
          placeholder:"请选择学科",
          type: "select",
          option: [
            { text: "语文", id: 1 },
            { text: "数学", id: 2 },
            { text: "英语", id: 3 },
            { text: "品德与生活", id: 4 },
            { text: "品德与社会", id: 5 },
            { text: "道德与法治", id: 6 },
            { text: "科学", id: 7 },
            { text: "美术", id: 8 },
            { text: "音乐", id: 9 },
            { text: "体育", id: 10 },
          ],
        },
        {
          id: 8,
          prop: "dronePilotName",
          width:"290px",
          placeholder:"请选择版本",
          type: "select",
          option: [
            { text: "统编版", id: 1 },
            { text: "部编版", id: 2 },
            { text: "人教课标版", id: 3 },
            { text: "通用版", id: 4 },
            { text: "其他", id: 5 }, 
          ],
        },
        {
          id: 9,
          prop: "dronePilotName",
          width:"290px",
          placeholder:"请选择知识点",
          type: "select",
          option: [
            { text: "测试1", id: 1 },
            { text: "测试2", id: 2 },
          ],
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
            label: "协同部门",
            prop: "action",
            type: "input",
            span: 24,
          },
          {
            label: "申请内容",
            prop: "message",
            type: "textarea",
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
        this.dialogVisible2 = true;
        console.log('detail');
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