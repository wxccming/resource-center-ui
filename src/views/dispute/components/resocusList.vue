<template>
  <!-- 汇聚资源管理 -->
  <div class="home">
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
    <!--上传-->
    <Dialog
      title="上传资源"
      :width="`1150px`"
      :dialogVisible="dialogVisible"
      @updateStatus="(val) => (this.dialogVisible = val)"
      @closed="form = {}"
    >
      <div class="dialogContent">
        <div class="dialogForm">
          <DialogForm
            :Form="form"
            :DialogFormConfig="dialogFormConfig"
            ref="ruleForm"
          />
        </div>
        <div class="dialogFooter">
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            v-preventReClick
            @click="submit"
            type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </Dialog>
    <Detail @close="closeDialog" :dialogVisible="dialogVisible1" />
    <!-- <DisputDialog :dialogVisible="disputVisible" @close="closeDialog"/>
    <Types @close="closeDialog1" :dialogVisible="dialogVisible2" width="40%" title="协同申请" :form="{}" :config="config"/> -->
  </div>
</template>
    
    <script>
import publicMethods from "@/mixins/publicMethods";
import {
  uploadFile,
  findDronePilotList as findlist,
  addDronePilot as insert,
  updateDronePilot as update,
  delDronePilot as del,
} from "@/api/index";
import Detail from '@/components/dialog/house/detail.vue';
import { Gathering, getoss } from "@/api";
export default {
  mixins: [publicMethods],
  name: "dispute",

  components: { Detail },
  created() {},
  beforeDestroy() {},
  data() {
    return {
      dialogVisible1: false,
      ossdata: {},
      load: false,
      dialogVisible: false,
      form: {},
      dialogFormConfig: {
        rulesForm: {
          sourceOrigin: {
            required: true,
            trigger: ["blur", "input"],
            message: "请选择 资源来源",
          },

          sourceForm: {
            required: true,
            trigger: ["blur", "input"],
            message: "请选择 资源类型",
          },
        },
        columns: [
          {
            label: "上传文件",
            prop: "files",
            type: "uploadtz",
            fileList: [],
            // onChange: (file, fileList) => {
            //   fileList.forEach((item) => {
            //     this.$set(this.form, "src", URL.createObjectURL(item.raw));
            //   });
            //   this.fileList.push(file.raw);
            // },
            beforeUploadOss:(file)=>{
              console.log(file,'file999')
              this.beforeUploadOss(file)
            },
            handleUploadOss:(option)=>{
              this.handleUploadOss(option)
            },

            span: 24,
          },
          {
            label: "资源来源",
            prop: "sourceOrigin",
            type: "select",
            option: [
              { text: "出版社提供", id: 1 },
              { text: "第三方引入", id: 2 },
              { text: "应用提供", id: 3 },
            ],
            span: 8,
          },
          {
            label: "资源类型",
            prop: "source_category",
            type: "select",
            option: [
              { text: "教案", id: 1 },
              { text: "课件", id: 2 },
              { text: "习题", id: 3 },
            ],
            span: 8,
          },
          {
            label: "资源形式",
            prop: "sourceForm",
            type: "select",
            option: [
              { text: "实体资源", id: 1 },
              { text: "网路资源", id: 2 },
            ],
            span: 8,
          },
          {
            label: "资源编目",
            prop: "period",
            placeholder: "请选择学段",
            type: "select",
            width: "200px",
            option: [
              { text: "幼儿园", id: 1 },
              { text: "小学", id: 2 },
              { text: "初中", id: 3 },
              { text: "高中", id: 4 },
              { text: "中职", id: 5 },
              { text: "特殊教育", id: 6 },
            ],
            span: 4,
          },
          {
            prop: "grade",
            placeholder: "请选择年级",
            width: "200px",
            type: "select",
            option: [
              { text: "一年级", id: 1 },
              { text: "二年级", id: 2 },
              { text: "三年级", id: 3 },
              { text: "四年级", id: 4 },
              { text: "五年级", id: 5 },
              { text: "六年级", id: 6 },
            ],
            span: 4,
          },
          {
            width: "200px",
            prop: "subject",
            span: 4,
            placeholder: "请选择学科",
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
            width: "200px",
            prop: "edition",
            span: 4,
            placeholder: "请选择版本",
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
            width: "200px",
            prop: "sourceKnnm",
            span: 4,
            placeholder: "请选择知识点",
            type: "select",
            option: [
              { text: "测试1", id: 1 },
              { text: "测试2", id: 2 },
            ],
          },
          {
            label: "标签",
            prop: "dronePilotName2",
            placeholder:
              "建议用标签描述资源的特色, 多个关键词用逗号分隔 如：高中,二年级,数学,试卷",
            type: "input",
            span: 24,
          },
          {
            label: "适用对象",
            prop: "dronePilotName3",
            placeholder: "适用对象描述，如：二年级学生、教师",

            type: "input",
            span: 24,
          },
          {
            label: "适用场景",
            prop: "dronePilotName4",
            type: "radio",
            radioList: [
              {
                text: "学生自主学习",
                value: "学生自主学习",
              },
              {
                text: "教师备课授课",
                value: "教师备课授课",
              },
            ],
            span: 12,
          },
          {
            label: "备注",
            placeholder: "请输入备注文字",

            prop: "dronePilotName5",
            type: "input",
            span: 24,
          },
        ],
      },
      select: [],
      SearchbtnList: [
        // {
        //   id: 7,
        //   text: "上传",
        //   types: "primary",
        //   plain: true,

        //   click: (val) => {
        //     this.dialogVisible = true;
        //   },
        //   type: "button",
        // },
        // {
        //   id: 8,
        //   text: "批量下线",
        //   plain: true,

        //   click: () => {
        //     if (!this.select.length) {
        //       this.$message.warning("至少选择一条数据进行下线");
        //       return;
        //     }
        //     this.initData();
        //   },
        //   type: "button",
        // },
        // {
        //   id: 9,
        //   text: "批量删除",
        //   plain: true,

        //   click: () => {
        //     if (!this.select.length) {
        //       this.$message.warning("至少选择一条数据进行删除");
        //       return;
        //     }
        //     this.initData();
        //   },
        //   type: "button",
        // },
      ],
      tableConfig: {
        isCheckAll: true,
        isIndex: true,
        columns: Object.freeze([
          {
            label: "资源标题",
            prop: "sourceName",
          },
          {
            label: "上传时间",
            prop: "createTime",
          },
          {
            label: "资源来源",
            prop: "sourceOrigin",
          },
          {
            label: "类型",
            prop: "sourceForm",
          },
          {
            label: "状态",
            prop: "sourceStatus",
          },

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
              {
                id: "info",
                text: "预览",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.getDetailsss(row);
                },
              },
              {
                id: "info1",
                text: "详情",

                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                 this.getDetail()
                },
              },
              {
                id: "info2",
                text: "下线",

                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.$router.push(`/achievement/analysisAi/photoProcess`);
                },
              },
              {
                id: "info3",
                text: "删除",
                type: "delete",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.$router.push(`/achievement/analysisAi/photoProcess`);
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
        data: [],
      },

      SearchConfig: [
        {
          id: 1,
          label: "资源状态",
          prop: "sourceStatus",
          type: "select",
          option: [
            { text: "已上线", id: 1 },
            { text: "已下线", id: 2 },
          ],
        },
        {
          id: 2,
          label: "资源来源",
          prop: "sourceOrigin",
          type: "select",
          option: [
            { text: "出版社提供", id: 1 },
            { text: "第三方引入", id: 2 },
            { text: "应用提供", id: 2 },
          ],
        },
        {
          id: 3,
          label: "资源类型",
          prop: "sourceForm",
          type: "select",
          option: [
            { text: "教案", id: 1 },
            { text: "课件", id: 2 },
            { text: "习题", id: 3 },
          ],
        },
        {
          id: 4,
          label: "资源名称",
          prop: "sourceName",
          type: "input2",
        },
        {
          id: 5,
          label: "资源编目",
          prop: "period",
          type: "select",
          width: "width: 100px",
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
          prop: "grade",
          placeholder: "请选择年级",
          width: "width: 100px",
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
          prop: "subject",
          width: "width: 100px",
          placeholder: "请选择学科",
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
          prop: "edition",
          width: "width: 100px",
          placeholder: "请选择版本",
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
          prop: "sourceKnnm",
          width: "width: 100px",
          placeholder: "请选择知识点",
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
    };
  },
  computed: {},
  mounted() {
    this.getossdatalist();
    this.getOrgCodeList();
  },
  methods: {

      closeDialog() {
        this.dialogVisible1 = false;
      },
   //获取oss认证信息
   getossdatalist() {
      localStorage.clear();
      getoss({}).then((res) => {
        this.ossdata = JSON.stringify(res.data);
        console.log(res, "res999");
      });
    },
    beforeUploadOss(file) {
      // console.log(file)
      // 限制上传类型
      const fileExtensions =
        this.getFileName(file.name) === ".doc" ||
        this.getFileName(file.name) === ".xlsx" ||
        this.getFileName(file.name) === ".ppt" ||
        this.getFileName(file.name) === ".pdf" ||
        this.getFileName(file.name) === ".jpg" ||
        this.getFileName(file.name) === ".jpeg" ||
        this.getFileName(file.name) === ".png" ||
        this.getFileName(file.name) === ".mp3" ||
        this.getFileName(file.name) === ".mp4" ||
        this.getFileName(file.name) === ".rar" ||  
        this.getFileName(file.name) === ".zip";
      //限制的上限为500Mb
      const maxSize = file.size / 1024 / 1024 < 500;
      if (!fileExtensions) {
        this.$message.error(
          "上传文件类型只能是 .doc, .docx, .pdf 格式, .xlsx 格式, .zip 格式!"
        );
      }
      if (!maxSize) {
        this.$message.error("上传文件大小不能超过 500MB!");
      }
      // return fileExtensions && max20M;
      return maxSize;
    },
    getFileName(name) {
      return name.substring(name.lastIndexOf("."));
    },
    handleUploadOss(option) {
      console.log(option,'option')
      const OSS = require("ali-oss");
      console.log(JSON.parse(this.ossdata), "this.ossdata");
      const client = new OSS({
        // 从环境变量中获取访问凭证
        // 当然，以下两个也可以直接写死

        accessKeyId: JSON.parse(this.ossdata).accessKeyId,
        region: JSON.parse(this.ossdata).region,
        accessKeySecret: JSON.parse(this.ossdata).accessKeySecret,
        stsToken: JSON.parse(this.ossdata).securityToken,
        bucket: JSON.parse(this.ossdata).bucket,
        expiration: JSON.parse(this.ossdata).expiration,
      });
  
      const put = async (ObjName, fileUrl) => {
        try {
          let result = client.put(`${ObjName}`, fileUrl);
          // ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径，如需放在文件夹下面直接在文件名前面加上文件夹名称
          return result;
        } catch (e) {
          console.log(e);
        }
      };

      let objName = option.file.name;
      // let fileName = moment().format('YYYY/MM/DD')
      // this.uploadLoading = true;

      put(`${objName}`, option.file)
        .then((res) => {
        
          if (res.res.statusCode === 200) {
            this.$set(this.form, "src", res.url);
            console.log(this.form, "this.form999this.form");
            this.$message.success("上传成功");
           
          } else {
            this.$message.error("上传失败");
          }
        })
        .catch((err) => {});
    },

    //上传确定
    submit() {
      // this.form = new FormData()
      console.log(this.form);
      this.form = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
 
    //获取表格信息
    getOrgCodeList() {
      Gathering({ pageNo: 1, pageSize: 10 }).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list;
        }
        console.log(res, "res999");
        // if (res.code != "000000") return;
        // this.searchConfig[0].option = res.data?.map((ele) => {
        //   return { text: ele.orgName, id: ele.code };
        // });
      });
    },
    handleSelectionChange(val) {
      this.select = val;
      console.log(val, "val");
    },
    initData() {},
    getDetail(val) {
      this.dialogVisible1 = true;
      console.log("detail", val);
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
  // background: #f4f5f9;
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
  // width: 100%;
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
::v-deep .layout .search {
  margin-top: 0 !important;
}
::v-deep .el-upload-dragger {
  width: 1030px;
}
</style>