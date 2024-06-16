<template>
  <!-- 图书管理 -->
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
    <!--新增图书-->
    <Dialog
      :title="type == 1 ? '新增图书' : '编辑图书'"
      :width="`1150px`"
      :dialogVisible="dialogVisible"
      @updateStatus="(val) => (this.dialogVisible = val)"
      @closed="closedlist()"
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
            @click="submit('ruleForm')"
            type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </Dialog>

    <!--章节管理-->
    <Dialog
      title="章节管理"
      :width="`1150px`"
      :dialogVisible="zhangdialogVisible"
      @updateStatus="(val) => (this.zhangdialogVisible = val)"
      @closed="form2 = {}"
    >
      <div class="dialogContents">
        <div class="con_left">
          <img
            src="http://syxt-aliyun-oss-bucket.oss-cn-beijing.aliyuncs.com/bg.png"
            alt=""
          />
          <div class="con_name">{{ rowlist.bookName }}</div>
          <div class="con_nr">
            <span> {{ rowlist.grade }} </span>
            <span> . </span>
            <span> {{ rowlist.edition }} </span>
            <span> . </span>
            <span> {{ rowlist.volume }} </span>
          </div>
        </div>
        <div class="con_right">
          <div class="block">
            <el-tree
              :data="data"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)"
                  >
                    新增子节点
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                  >
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </Dialog>

    <!--新增章节-->
    <Dialog
      :title="type == 3 ? '新增章节' : '新增章节'"
      :width="`600px`"
      :dialogVisible="dialogVisible3"
      @updateStatus="(val) => (this.dialogVisible3 = val)"
      @closed="form3 = {}"
    >
      <div class="dialogContent">
        <div class="dialogForm">
          <DialogForm
            :Form="form3"
            :DialogFormConfig="dialogFormConfig3"
            ref="ruleForm"
          />
        </div>
        <div class="dialogFooter">
          <el-button
            style="width: 80px; height: 30px"
            size="small"
            @click="dialogVisible3 = false"
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
  </div>
</template>
    
    <script>
let id = 1000;

import publicMethods from "@/mixins/publicMethods";
import {
  getbooks,
  putbooks,
  getoss,
  addbooks,
  exticbooks,
  deletebooks,
  getchapter,
  addchapter
} from "@/api";
export default {
  mixins: [publicMethods],
  name: "dispute",

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
      rowlist: {},
      type: 1,
      dialogVisible3: false,
      form3: {},
      dialogFormConfig3: {
        rulesForm: {
          chapterName: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 章节名称",
          },
        },
        columns: [
          {
            label: "父章节名称",
            prop: "chapterPtitle",
            type: "input",
            disabled: "true",
            span: 24,
          },
          {
            label: "章节名称",
            prop: "chapterName",
            type: "input",
            span: 24,
          },
          {
            label: "状态",
            prop: "chapterStatus",
            type: "input",
            disabled: "true",
            span: 24,
          },
        ],
      },
      form2: {},

      data: [
        {
          id: 1,
          label: "长江全能学案英语听力训练六年级上册",
          children: [],
        },
      ],
      zhangdialogVisible: false,
      dialogVisible: false,
      form: {
        fileList: [],
      },
      dialogFormConfig: {
        rulesForm: {
          bookName: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入图书名称",
          },
          volume: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 册次",
          },
          bookCategory: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 图书分类",
          },
          publishUnit: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 出版单位",
          },
          bookStatus: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 图书状态",
          },

    
          period: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 学段",
          },
          grade: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 年级",
          },
          subject: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 学科",
          },
          edition: {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择 版本",
          },
          intro: {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入 图书简介",
          },
          bookPic: {
            required: true,
            trigger: ["blur", "change"],

            message: "请上传 图书封面",
          },
        },
        columns: [
          {
            label: "图书名称",
            prop: "bookName",
            type: "input",
            span: 12,
          },
          {
            label: "册次",
            prop: "volume",
            type: "select",
            option: [
              { text: "上册", id: "00" },
              { text: "下册", id: "01" },
              { text: "全一册", id: "02" },
              { text: "必修 上册", id: "03" },
              { text: "必修 下册", id: "04" },
              { text: "选择性必修 上册", id: "05" },
              { text: "选择性必修 中册", id: "06" },
              { text: "选择性必修 下册", id: "07" },
            ],
            span: 12,
          },
          {
            label: "审定年份",
            prop: "auditedYear",
            type: "input",
            span: 12,
          },
          {
            label: "图书分类",
            prop: "bookCategory",
            type: "select",
            option: [
              { text: "教辅", id: "01" },
              { text: "课外拓展", id: "02" },
              { text: "其他", id: "03" },
            ],
            span: 12,
          },
          {
            label: "出版单位",
            prop: "publishUnit",
            placeholder: "请选择出版单位",
            type: "select",

            option: [
              { text: "湖北教育出版社有限公司", id: "00" },
              { text: "湖北少年儿童出版社有限公司", id: "01" },
              { text: "崇文书局有限公司", id: "02" },
              { text: "湖北九通电子音像出版社", id: "03" },
              { text: "湖北人民出版社", id: "04" },
              { text: "湖北科学技术出版社", id: "05" },
              { text: "长江文艺出版社", id: "06" },
              { text: "湖北美术出版社", id: "07" },
            ],
            span: 12,
          },
          {
            label: "图书状态",
            prop: "bookStatus",
            type: "select",

            option: [
              { text: "正常", id: "0" },
              { text: "失效", id: "1" },
            ],
            span: 12,
          },
          {
            label: "学段",

            prop: "period",
            placeholder: "请选择年级",
            width: "200px",
            type: "select",
            option: [
              { text: "幼儿园", id: "00" },
              { text: "小学", id: "01" },
              { text: "初中", id: "02" },
              { text: "高中", id: "03" },
              { text: "中职", id: "04" },
              { text: "特殊教育", id: "05" },
            ],
            span: 12,
          },
          {
            label: "年级",
            prop: "grade",
            type: "select",
            option: [
              { text: "托班", id: "00" },
              { text: "小班", id: "01" },
              { text: "中班", id: "02" },
              { text: "大班", id: "03" },
              { text: "一年级", id: "04" },
              { text: "二年级", id: "05" },
              { text: "三年级", id: "06" },
              { text: "四年级", id: "07" },
              { text: "五年级", id: "08" },
              { text: "六年级", id: "09" },
              { text: "七年级", id: "10" },
              { text: "八年级", id: "11" },
              { text: "九年级", id: "12" },
              { text: "不区分", id: "99" },
            ],
            span: 12,
          },
          {
            label: "学科",

            prop: "subject",
            type: "select",
            option: [
              { text: "语文", id: "00" },
              { text: "数学", id: "01" },
              { text: "英语", id: "02" },
              { text: "物理", id: "03" },
              { text: "化学", id: "04" },
              { text: "生物", id: "05" },
              { text: "思想品德", id: "06" },
              { text: "思想政治", id: "07" },
              { text: "品德与生活", id: "08" },
              { text: "品德与社会", id: "09" },
              { text: "历史", id: "10" },
              { text: "历史与社会", id: "11" },
              { text: "体育", id: "12" },
              { text: "地理", id: "13" },
              { text: "道德与法治", id: "14" },
              { text: "科学", id: "15" },
              { text: "美术", id: "16" },
              { text: "体育与健康", id: "17" },
              { text: "音乐", id: "18" },
              { text: "信息技术", id: "19" },
              { text: "通用技术", id: "20" },
              { text: "综合实践活动", id: "21" },
              { text: "幼教健康", id: "22" },
              { text: "幼教科学", id: "23" },
              { text: "幼教社会", id: "24" },
              { text: "幼教艺术", id: "25" },
              { text: "幼教语言", id: "26" },
              { text: "科技制作活动", id: "27" },
              { text: "专题活动", id: "28" },
            ],
            span: 12,
          },
          {
            label: "版本",
            prop: "edition",
            type: "select",
            option: [
              { text: "统编版", id: "00" },
              { text: "人教课标版", id: "01" },
              { text: "鄂教版", id: "02" },
              { text: "鄂科版", id: "03" },
              { text: "北师大版", id: "04" },
              { text: "川教版", id: "05" },
              { text: "湘教版", id: "06" },
              { text: "商务星球版", id: "07" },
              { text: "通用版", id: "08" },
            ],
            span: 12,
          },

          {
            label: "图书简介",
            prop: "intro",
            placeholder: "请输入200字以内的图书介绍",
            type: "textarea",
            span: 24,
          },
          {
            label: "图书封面",
            prop: "bookPic",

            beforeUploadOss: (file) => {
              this.beforeUploadOss(file);
            },
            handleUploadOss: (option) => {
              this.handleUploadOss(option);
            },
            handleRemove: (file) => {
              this.handleRemove(file);
            },
            beforeRemove: (option) => {
              this.beforeRemove(option);
            },
            // handleExceed: (file) => {
            //   this.handleExceed(file);
            // },

            type: "uploadfm",
            span: 24,
          },
        ],
      },

      select: [],
      SearchbtnList: [
        {
          id: 7,
          text: "新增图书",
          types: "primary",
          plain: true,

          click: () => {
            console.log(this.form, "from9999");
            this.form.fileList=[];
            this.form={}
            this.type = 1;
            this.dialogVisible = true;
          },
          type: "button",
        },
      ],
      tableConfig: {
        isCheckAll: true,
        isIndex: true,
        columns: Object.freeze([
          {
            label: "图书名称",
            prop: "bookName",
          },
          {
            label: "图书分类",
            prop: "bookCategory",
          },
          {
            label: "出版单位",
            prop: "publishUnit",
          },
          {
            label: "创建时间",
            prop: "createTime",
          },

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
              {
                id: "info1",
                text: "章节管理",

                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  console.log(row,'row999')
                  this.data = [
                    {
                      id: 1,
                      label: row.bookName,
                      children: [],
                    },
                  ],
                    this.rowlist = row;
                  this.zhangdialogVisible = true;
                },
              },
              {
                id: "info2",
                text: "修改",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.getmodify(row);
                },
              },
              {
                id: "info3",
                text: "删除",
                type: "delete",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {
                  this.dellist(row);
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
          label: "图书分类",
          prop: "bookCategory",
          type: "select",
          option: [
            { text: "教辅", id: "01" },
            { text: "课外拓展", id: "02" },
            { text: "其他", id: "03" },
          ],
        },

        {
          id: 2,
          label: "图书名称",
          prop: "bookName",
          type: "input2",
        },

        {
          id: 7,
          text: "查询",
          icon: "el-icon-search",
          plain: true,

          click: () => {
            this.formInline.pageNum = 1;
            this.getboxlist();
          },
          type: "button",
        },
      ],
      ossdata: {},
    };
  },
  computed: {},
  mounted() {
    this.getboxlist();
    this.getossdatalist();
  },
  methods: {
    closedlist() {
      this.form = {};
      console.log(9999);
      console.log(this.form, "this.form999");
      this.dialogVisible = false;
    },
    // 删除图书
    dellist(row) {
      deletebooks({ id: row.id }).then((res) => {
        if (res.code == 0) {
          this.$message.success("删除成功");
          this.getboxlist();
        }
      });
    },
    // 修改
    getmodify(row) {
      exticbooks({ id: row.id }).then((res) => {
        if (res.code == 0) {
       
          console.log(row, "row");
          this.form = res.data;
          let bgname = String(row.bookPic.substring(row.bookPic.lastIndexOf("/")+1));
       
          this.form.fileList=[ {
              name: bgname,
              url: row.bookPic,
            },];
   
     
        }
      });
      this.type = 2;
      this.dialogVisible = true;
    },

    //新增章节确定
    submitzj() {

    },
    //新增图书确定
    updateData() {
      if (this.type == 1) {
        addbooks(JSON.stringify(this.form)).then((res) => {
          if (res.code == 0) {
            this.$message.success("新增图书成功");

            this.getboxlist();
            this.form = {};
            this.dialogVisible = false;
          }
        });
      } else if (this.type == 2) {
        putbooks(this.form).then((res) => {
          if (res.code == 0) {
            this.$message.success("修改图书成功");

            this.getboxlist();
            this.form = {};
            this.dialogVisible = false;
          }
        });
      }else if (this.type == 3) {
        let froms={
          chapterName:"子节点aaa",
          chapterPid:"1322",
          chapterPtitle:"测试999",
          isLeaf:"0",
          chapterStatus:"0",
        }
        addchapter(JSON.stringify(froms)).then((res) => {
          if (res.code == 0) {
            this.$message.success("新增图书章节成功");

            this.getboxlist();
            this.form3 = {};
            this.dialogVisible3 = false;
          }
        });
      }
    },

    //获取oss认证信息
    getossdatalist() {
      localStorage.clear();
      getoss({}).then((res) => {
        this.ossdata = JSON.stringify(res.data);
      });
    },
    handleUploadOss(option) {
      const OSS = require("ali-oss");
      const client = new OSS({
        // 从环境变量中获取访问凭证
        // 当然，以下两个也可以直接写死
        accessKeyId: JSON.parse(this.ossdata).accessKeyId,
        region: JSON.parse(this.ossdata).region,
        accessKeySecret: JSON.parse(this.ossdata).accessKeySecret,
        stsToken: JSON.parse(this.ossdata).securityToken,
        bucket: JSON.parse(this.ossdata).bucket,
        domainName: JSON.parse(this.ossdata).domainName,

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
            this.form.bookPic = res.url;
            this.$message.success("上传成功");
          } else {
            this.$message.error("上传失败");
          }
        })
        .catch((err) => {});
    },

    beforeUploadOss(file) {
      // console.log(file)
      // 限制上传类型
      const fileExtensions =
        this.getFileName(file.name) === ".jpg" ||
        this.getFileName(file.name) === ".png";
      //限制的上限为500Mb
      const maxSize = file.size / 1024 / 1024 < 500;
      if (!fileExtensions) {
        this.$message.error("上传文件类型只能是jpg/png格式!");
      }
      if (!maxSize) {
        this.$message.error("上传文件大小不能超过 500kb!");
      }
      // return fileExtensions && max20M;
      return maxSize;
    },
    getFileName(name) {
      return name.substring(name.lastIndexOf("."));
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
    //       files.length + fileList.length
    //     } 个文件`
    //   );
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    append(data) {
      console.log(data, "data999");
      this.type=3
      this.dialogVisible3 = true;
      this.form3.chapterPtitle = data.label;
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    //获取图书信息
    getboxlist() {
      getbooks(this.getParps()).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list;
        }
      });
    },

    handleSelectionChange(val) {
      this.select = val;
      console.log(val, "val");
    },
    // 查询
    getParps() {
      return {
        ...this.formInline.data,
        pageSize: this.formInline.pageSize,
        pageNum: this.formInline.pageNum,
      };
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
::v-deep .layout .search {
  margin-top: 0 !important;
}
.dialogContents {
  width: 100%;
  display: flex;
}
.con_left {
  width: 400px;
  height: 400px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // background: red;
  img {
    width: 180px;
    height: 250px;
  }
  .con_name {
    width: 100%;
    text-align: left;
  }
  .con_nr {
    width: 100%;
    display: flex;
  }
}
</style>