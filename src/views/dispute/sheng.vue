<template>
  <!-- 二维码管理 -->
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
              tableHeight="500px"
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
    <Types @close="closeDialog1"  @submit="submit" :dialogVisible="dialogVisible2" width="40%" title="新增二维码项目" :form="dialogForm" :config="config"/>
    <CodeSetting @close="setCloseDialog" :info="codeInfo" :list="getCodeInfoSort"  @submit="setSubmit" :dialogVisible="setDialogVisible" width="60%" />
  </div>
</template>
    
<script>
import Types from '@/components/dialog/reoslve/types.vue';
import publicMethods from "@/mixins/publicMethods";
import { creatByCode, deleteCodeProject, queryBooklist, queryQtcodeList, updateCodeProject } from '@/api/index1.js'
import CodeSetting from "./components/codeSetting"
export default {
  mixins: [publicMethods],
  name: "dispute",
  components: {Types, CodeSetting},
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
          text: "项目系列管理",
          types: "primary",
          plain: true,

          click: (val) => {      
            this.getDetail1();
          },
          type: "button",
        },
        {
          id: 8,
          text: "新增二维码项目",
          types: "primary",
          plain: true,

          click: () => {
            this.flag = "add";
            this.getDetail1();
            this.initData();
          },
          type: "button",
        },
        {
          id: 9,
          text: "导出二维码",
          plain: true,

          click: () => {
            if(!this.select.length) {
              this.$message.warning('至少选择一条数据进行导出');
              return
            };
            this.initData();
          },
          type: "button",
        },
      ],
      tableConfig: {
        // isCheckAll: true,
        // isIndex: true,
        columns: Object.freeze([
          {
            label: "项目标题",
            prop: "itemName",
          },
          // {
          //   label: "项目系列",
          //   prop: "getTime",
           
          // },
          // {
          //   label: "二维码数量",
          //   prop: "towerSection",
          // },
          {
            label: "项目来源",
            prop: "sourceOrigin",
          },
          {
            label: "状态",
            prop: "dtcodeStatus",
            formatter: (row, column) => {
              let arr = this.dictionary.dtcodeStatus || [];
              let label = '';
              if(arr && arr.length > 0) {
                arr.forEach(item => {
                  if(item.value == row) {
                    label = item.label;
                  }
                })
              }
              return label;
            },
          },
          {
            label: "最近更新",
            prop: "createTime",
            formatter: (row, column) => {
              return new Date(row).toLocaleString();
            },
          },
       

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
              {
                id: "info",
                text: "二维码管理",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.onSetting(row);
                },
              },
              {
                id: "info1",
                text: "编辑",
              
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.flag = "update";
                  this.getDetail1(row);
                },
              },
           
          
              {
                id: "info1",
                text: "删除",
                type: 'delete',
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.deleteList(row);
                },
              },
            ],
          },
        ]),
      },
      tableData: [],
      formInline: {
        pageSize: 20,
        pageNum: 1,
        total: 10,
        data: {
          dtcodeStatus: '',
          itemName: ''
        },
        
      },


      dialogVisible2: false,
      
      dialogForm: {
        itemName: "",
        bookNo: "",
        remarks: "",
        dtcodeStatus: "",
      },
      flag: 'add',
      setDialogVisible: false,
      codeInfo: {
        
      },
      codelist: [
        {
          id: 1,
          "chapterName": "王五",
          "chapterPid": "",
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
        {
          id: 2,
          "chapterName": "王五子节点1",
          "chapterPid": 1,
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
        {
          id: 3,
          "chapterName": "王五子节点2",
          "chapterPid": 1,
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
        {
          id: 4,
          "chapterName": "张六",
          "chapterPid": "",
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
        {
          id: 5,
          "chapterName": "张六子节点1",
          "chapterPid": 4,
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
        {
          id: 6,
          "chapterName": "张六子节点2",
          "chapterPid": 4,
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
        {
          id: 7,
          "chapterName": "张六子节点3",
          "chapterPid": 4,
          "chapterPtitle": "",
          "bookNo": "1111",
          "depth": 0,
        },
      ],
      booklist: [],
      dictionary: sessionStorage.getItem("Dictionary") ? JSON.parse(sessionStorage.getItem("Dictionary")) : {},
      
    };
  },
  computed: {
    getCodeInfoSort() {
      let map = {};
      this.codelist.map(item => {
        if(!item.chapterPid) {
          map[item.id] = Object.assign({children: [], label: item.chapterName}, item);
        }
      });
      this.codelist.map(item => {
        if(item.chapterPid && map[item.chapterPid]) {
          map[item.chapterPid].children.push(Object.assign({label: item.chapterName}, item));
        }
      });
      console.log(Object.values(map), 'obj value');
      return Object.values(map);
    },
    config() {
      let config1 = {
        rulesForm: {
          itemName: [
            {
              required: true,
              trigger: ["blur", "input"],
              message: "请输入",
            },
            { max: 25, message: '输入内容不得超过25个汉字', trigger: 'blur' }
          ],
          bookNo: {
            required: true,
            trigger: 'change',
            message: "请选择",
          },
          dtcodeStatus: {
            required: true,
            trigger: 'change',
            message: "请选择",
          },
        },
        columns: [
          {
            label: "项目名称",
            prop: "itemName",
            type: "input",
            span: 24,
          },
          {
            label: "关联图书",
            prop: "bookNo",
            type: "select",
            width: "width:100%",
            filterable: true,
            span: 24,
            option: this.booklist
          },
          {
            label: "备注",
            prop: "remarks",
            type: "input",
            span: 24,
          },
          {
            label: "状态",
            prop: "dtcodeStatus",
            type: "select",
            span: 24,
            width: "width:100%",
            option: this.dictionary.dtcodeStatus || []
          },
        ]
      };
      console.log(config1, 'config1');
      return config1;
    },
    SearchConfig() {
      let config = [
        {
          id: 1,
          label: "状态",
          prop: "dtcodeStatus",
          type: "select",
          option: this.dictionary.dtcodeStatus || [],
        },
        // {
        //   id: 2,
        //   label: "项目系列",
        //   prop: "dronePilotName",
        //   type: "select",
        //   option: [
        //     { text: "长江作业本", id: 1 },
        //     { text: "长江全能学案", id: 2 },
        //   ],
        // },
        {
          id: 3,
          label: "项目标题",
          prop: "itemName",
          type: "input2",
        },
  
        {
          id: 7,
          text: "查询",
          icon: "el-icon-search",
          plain: true,

          click: () => {
            this.formInline.pageNum = 1;
            this.querylist();
          },
          type: "button",
        },
      ];
      return config;
    }
  },
  mounted() {
    this.queryBook();
    this.querylist();
  },
  methods: {
    handleSelectionChange(val) {
      this.select = val;
      console.log(val, 'val');
    },
    initData() {},
    getColor(val) {
      console.log(val);
      const obj = {
        '未预警': 'warning',
        'I 级(简单)(0)': 'success',
        "2级": "danger"
      }
      return obj[val] || 'success';
    },
    getDetail1(row) {
        this.dialogVisible2 = true;
        console.log('detail');
        this.dialogForm = JSON.parse(JSON.stringify(row));
        console.log(this.dialogForm, 'this.dialogForm');
    },
    closeDialog1() {
        this.dialogVisible2 = false;
    },
    submit() {
      console.log(this.dialogForm, '点击确定按钮');
      if(this.flag === "add") {
        creatByCode(JSON.stringify(this.dialogForm)).then((res) => {
          console.log(res, 'success');
          this.$message.success("二维码项目创建成功");
          this.dialogVisible2 = false;
          this.dialogForm = {};
          this.querylist();
        })
      } else if (this.flag === "update") {
        this.updateCode();
      }
    },
    deleteList(val) {
      deleteCodeProject({id: val.id}).then(res => {
        this.$message.success("删除成功");
        this.querylist();
      })
    },
    updateCode() {
      let params = {
        ...this.dialogForm,
        bookNo: this.dialogForm.bookNo + '',
      };
      updateCodeProject(this.dialogForm).then(res => {
        this.$message.success("编辑成功");
        this.dialogVisible2 = false;
        this.dialogForm = {};
        this.querylist();
      })
    },
    onSetting(val) {
      this.setDialogVisible = true;
    },
    setCloseDialog() {
      this.setDialogVisible = false;
    },
    setSubmit() {
      console.log(this.dialogForm, '点击保存二维码设置按钮');
    },
    queryBook() {
      queryBooklist({pageNo: 0, pageSize: 100}).then(res => {
        console.log(res, 'res');
        if(res.data.list && res.data.list.length) {
          this.booklist = res.data.list.map(item => {
            item.text = item.bookName;
            item.id = item.id + '';
            return item;
          })
        }
        console.log(this.booklist, 'booklist');
      })
    },
    querylist() {
      console.log(this.formInline, 'this.formInline');
      const { data, pageSize, pageNum} = this.formInline;
      let params = {
        itemName: data.itemName,
        dtcodeStatus: data.dtcodeStatus,
        pageSize,
        pageNo: pageNum,
      }
      queryQtcodeList(params).then(res => {
        console.log(res, 'res');
        if(res.data.list) {
          this.tableData = res.data.list;
          this.formInline.total = res.data.total;
        }
      })
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
.table {
  // height: 400px
}
</style>