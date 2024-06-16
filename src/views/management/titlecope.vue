<template>
  <!-- 头部导航 -->
  <div class="home" id="screen">
    <div class="conbox">
      <div class="contop">
        <div class="LoginTitle">湖北新华教育服务平台•资源管理后台</div>
        <div class="titleright">
          <div @click="gethome" class="title01bg"></div>
          <i @click="searchlist" class="el-icon-search"></i>
          <i @click="fullScreenFun" class="el-icon-full-screen"></i>

          <el-popover placement="buttom" width="300" trigger="click">
            <div class="text item">
              <div class="itemtop">
                <div class="top_left">消息</div>
                <div class="top_right">清空</div>
              </div>
              <div class="top_nr">
                <ul>
                  <li v-for="(item, index) in xzdatalist" :key="index" @click="newsdata">
                    <div class="xzbg"></div>
                    <div class="xz_nr">
                      <div class="xz_name">
                        {{ item.name }}
                      </div>
                      <div class="xz_time">
                        {{ item.time }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <el-badge slot="reference" :value="12" class="item">
              <i class="el-icon-bell"></i>
            </el-badge>
          </el-popover>

          <el-popover placement="buttom" width="150" trigger="hover">
            <div class="text item">
              <div class="itemli" @click="qhapplications">
                <div class="bgicon01"></div>
                <div class="bgname">切换应用</div>
              </div>
              <div class="itemli" @click="Settings">
                <div class="bgicon02"></div>
                <div class="bgname">账号设置</div>
              </div>
              <div class="itemli" @click="meetshow">
                <div class="bgicon03"></div>
                <div class="bgname">发起会议</div>
              </div>
              <div class="itemli" @click="quit">
                <div class="bgicon04"></div>
                <div class="bgname">退出登录</div>
              </div>
            </div>

            <div class="userbg" slot="reference">
              <img class="rwbg" src="../../assets/img/rw.jpg" alt="" />
              <div class="username">admin</div>
            </div>
          </el-popover>
        </div>
      </div>
      <!-- <div class="contab">
        <el-tabs v-model="value" type="card" @tab-click="handleClick">
          <el-tab-pane label="工作台" name="tab1">
            <span slot="label"
              ><span class="el-icon-house"></span> 工作台
            </span>
          </el-tab-pane>
          <el-tab-pane label="纠纷数据汇总中心" name="tab2">
            <span slot="label"
              ><span class="el-icon-office-building"></span> 纠纷数据汇总中心
            </span>
          </el-tab-pane>
          <el-tab-pane label=" 纠纷-站式化解" name="tab3">
            <span slot="label"
              ><span class="el-icon-school"></span> 纠纷-站式化解
            </span>
          </el-tab-pane>
          <el-tab-pane label="纠纷智能预警中心" name="tab4">
            <span slot="label"
              ><span class="el-icon-bell"></span> 纠纷智能预警中心
            </span>
          </el-tab-pane>

          <el-tab-pane label="调解资源" name="tab5">
            <span slot="label"
              ><span class="el-icon-bell"></span> 调解资源
            </span>
          </el-tab-pane>
          <el-tab-pane label="研判分析" name="tab6">
            <span slot="label"
              ><span class="el-icon-pie-chart"></span> 研判分析
            </span>
          </el-tab-pane>
          <el-tab-pane label="视频中心" name="tab7">
            <span slot="label"
              ><span class="el-icon-video-camera"></span> 视频中心
            </span>
          </el-tab-pane>
          <el-tab-pane label="风险防控" name="tab8">
            <span slot="label"
              ><span class="el-icon-s-order"></span> 风险防控
            </span>
          </el-tab-pane>
          <el-tab-pane label="报告中心" name="tab9">
            <span slot="label"
              ><span class="el-icon-s-finance"></span> 报告中心
            </span>
          </el-tab-pane>
          <el-tab-pane label="后台管理" name="tab10">
            <span slot="label"
              ><span class="el-icon-s-grid"></span> 后台管理
            </span>
          </el-tab-pane>
          <el-tab-pane label="微服务" name="tab11">
            <span slot="label"
              ><span class="el-icon-printer"></span> 微服务
            </span>
          </el-tab-pane>
        </el-tabs>
      </div> -->
    </div>
    <!--切换应用-->
    <Dialog
      title="切换应用"
      :width="`520px`"
      :dialogVisible="dialogVisible"
      @updateStatus="(val) => (this.dialogVisible = val)"
      @closed="form = {}"
    >
      <div class="dialogContent">
        <div class="diaog_title">选择应用：</div>
        <div class="diaog_con">
          <ul>
            <li
              :class="{ active: index == nowIndex }"
              v-for="(item, index) in datalist"
              :key="index"
              @click="toggleTabs(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </Dialog>
    <!--创建会议-->
    <Dialog
      title="创建会议"
      :width="`1200px`"
      :dialogVisible="meetdialogVisible"
      @updateStatus="(val) => (this.meetdialogVisible = val)"
      @closed="form = {}"
    >
      <div class="dialogContent">
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
            </div>

            <div style="margin-top: 20px; margin-bottom: 10px">已选择人员</div>
            <div class="table">
              <Table
                class="table"
                :tableStyle="`border-radius: 2px;`"
                :TableConfig="seltableConfig"
                :tableData="seltableData"
                tableHeight="100%"
                getRowKey="id"
              />
            </div>
            <div class="dialogFooter">
              <el-button
                style="width: 80px; height: 30px"
                size="small"
                @click="meetdialogVisible = false"
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
          </template>
        </content-layout>
      </div>
    </Dialog>

        <!--消息详情-->
        <Dialog
         title="消息详情"
      :width="`900px`"
      :dialogVisible="checkdialogVisible"
      @updateStatus="(val) => (this.checkdialogVisible = val)"
      @closed="form = {}"
    >
      <div class="dialogContents">
          <div class="dialogtitleone">
            纠纷数据提醒  
          </div>
          <div class="dialogtitletwo">
            （发布人：）发布时间：2024-05-23 16:15:44
          </div>
          <div class="dialogtitlethree">
            （一案一码：2024052316154304001）/中国 王玉周（13730807930）对数据进行了操作，点击查询详情
          </div>
      </div>
    </Dialog>
          <!--菜单搜索-->
          <Dialog
          title="菜单搜索"
      :width="`500px`"
      :dialogVisible="serchdialogVisible"
      @updateStatus="(val) => (this.serchdialogVisible = val)"
      @closed="form = {}"
    >
      <div class="serchContent">
        <el-input v-model="serchinput" placeholder="菜单搜索"></el-input>
      </div>
    </Dialog>
  </div>
</template>

  <script>
import screenfull from "screenfull";
export default {
  components: {},
  name: "titlecope",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  created() {},
  beforeDestroy() {},
  data() {
    return {
      serchinput:"",
      serchdialogVisible:false,
      checkdialogVisible:false,
      xzdatalist: [
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
        { name: "纠纷数据提醒", time: "2024-05-17 09：03:16" },
      ],
      SearchbtnList: [],

      seltableConfig: {
        isCheckAll: false,
        isIndex: false,
        columns: Object.freeze([
          {
            label: "在线状态",
            prop: "lineName",
            width: "100",
          },
          {
            label: "姓名",
            prop: "getTime",
          },
          {
            label: "手机",
            prop: "towerSection",
          },
          {
            label: "所属单位",
            prop: "towerSection",
          },

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
              {
                id: "info",
                text: "删除",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {},
              },
            ],
          },
        ]),
      },
      seltableData: [],

      tableConfig: {
        isCheckAll: false,
        isIndex: false,
        columns: Object.freeze([
          {
            label: "在线状态",
            prop: "lineName",
            width: "100",
          },
          {
            label: "姓名",
            prop: "getTime",
          },
          {
            label: "手机",
            prop: "towerSection",
          },
          {
            label: "所属单位",
            prop: "towerSection",
          },

          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
              {
                id: "info",
                text: "添加",
                // permission: "FinePatro:findJxhTask",
                click: (row) => {},
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
          label: "姓名",
          prop: "dronePilotName",
          type: "input2",
        },
        {
          id: 3,
          label: "电话",
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

      nowIndex: 0,
      datalist: [
        { name: "工作台" },
        { name: "纠纷数据汇总中心" },
        { name: "纠纷-站式化解" },
        { name: "纠纷智能预警中心" },
        { name: "调解资源" },
        { name: "研判分析" },
        { name: "视频中心" },
        { name: "风险防控" },
        { name: "报告中心" },
        { name: "后台管理" },
        { name: "微服务" },
      ],

      meetdialogVisible: false,
      dialogVisible: false,
      isFullscreen: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
    },
  },

  computed: {},
  mounted() {},
  methods: {
    //菜单搜索
    searchlist(){
  this.serchdialogVisible=true
    },
    //消息
    newsdata(){
      this.checkdialogVisible=true
    },
    // 退出登录
    quit() {
      let information = `<div class="information"><img src="${require("@/assets/icon/warning@2x.png")}"><span>确定要注销登录吗？</span></div>`;
      this.$confirm(information, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
      }).then(async () => {
        this.$router.push("/");
      });
    },
    // 发起会议
    meetshow() {
      this.meetdialogVisible = true;
    },
    // 账号设置
    Settings() {
      this.$router.push("/settings");
    },
    //切换应用页面跳转
    toggleTabs(index) {
      this.nowIndex = index;
      this.dialogVisible = false;
      if (index == "0") {
        this.$router.push("/management");
      } else if (index == "1") {
        this.$router.push("/dispute");
      }
    },
    //切换应用弹框
    qhapplications() {
      this.dialogVisible = true;
    },
    //全屏 退出全屏
    fullScreenFun() {
      //执行切换事件
      screenfull.toggle();
    },

    //返回首页
    gethome() {
      this.$router.push(`/home`);
    },
    handleClick(tab, event) {
      if (tab._props.name == "tab1") {
        this.$router.push("/management");
      } else if (tab._props.name == "tab2") {
        this.$router.push("/dispute");
      } 
    },
  },
  watch: {},
  mounted() {},
};
</script>
  <style lang="scss" scoped>
.conbox {
  width: 100%;
  height: 100px;
  background: #2f54eb;
}

.contab {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
}

.contop {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 40px;
}

.LoginTitle {
  font-size: 28px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: 700;
  color: #fff;
  line-height: 44px;
  letter-spacing: 10px;
  text-align: center;
}

.titleright {
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}

.title01bg {
  width: 30px;
  height: 30px;
  background: url("~@/assets/img/title01bg.png");
  cursor: pointer;
}

::v-deep .el-tabs--card > .el-tabs__header {
  border-bottom: none !important;
}

::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
}

::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  // border-bottom: 2px solid #fff !important;
  border-left: none !important;
  color: #fff;
  font-size: 20px;
}

::v-deep .el-tabs__item.is-active {
  // color: red !important; //选中

  border-bottom: 4px solid #fff !important;
  // opacity: 1;
}

::v-deep .el-tabs__item {
  padding: 0;
  margin: 0 20px;
}
::v-deep
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:nth-child(2) {
  padding: 0 !important;
}
::v-deep
  .el-tabs--top.el-tabs--card
  > .el-tabs__header
  .el-tabs__item:last-child {
  padding: 0 !important;
}
i {
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.rwbg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}
.username {
  color: #fff;
  margin-left: -15px;
  cursor: pointer;
}
.xx {
  display: flex;
  width: 60px;
}
.userbg {
  display: flex;
  width: 60px;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
::v-deep .el-popover {
  position: absolute;
  top: 50px;
  right: 50px;
}
.itemli {
  display: flex;
  cursor: pointer;
  margin-bottom: 10px;
}
.bgicon01 {
  width: 20px;
  height: 20px;
  background-image: url(../../assets/img/dialogImg/bg01.png);
  margin-right: 10px;
  background-position: center center;
  background-size: 100% 100%;
}
.bgicon02 {
  width: 20px;
  height: 20px;
  background-image: url(../../assets/img/dialogImg/bg02.png);
  margin-right: 10px;
  background-position: center center;
  background-size: 100% 100%;
}
.bgicon03 {
  width: 20px;
  height: 20px;
  background-image: url(../../assets/img/dialogImg/bg03.png);
  margin-right: 10px;
  background-position: center center;
  background-size: 100% 100%;
  margin-right: 10px;
}
.bgicon04 {
  width: 20px;
  height: 20px;
  background-image: url(../../assets/img/dialogImg/bg04.png);
  margin-right: 10px;
  background-position: center center;
  background-size: 100% 100%;
}
.dialogContent {
  display: flex;
}
li {
  list-style: none;
}
.diaog_con ul {
  width: 350px;
  border-right: 1px solid #c2c0c0;
  margin-top: -15px;
  margin-left: -30px;
}
.diaog_con ul li {
  text-align: left;
  width: 100%;
  height: 50px;
  display: flex;
  padding: 10px 20px;
  cursor: pointer;
  align-items: center;
}
.active {
  background: #f0f5ff;
  color: #2f54eb;
  border-right: 2px solid #2f54eb;
}
.itemtop {
  width: 100%;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: space-between;

  align-items: center;
  .top_left {
    color: #2f54eb;
    border-bottom: 1px solid #2f54eb;
    width: 50px;
    text-align: center;
    margin-top: 10px;
  }
  .top_right {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background: #06cbf6;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.top_nr ul{
  width: 100%;
  height: 180px;

  overflow-y: scroll;
  padding: 0;
}
.top_nr ul li{
  width: 100%;
  display: flex;
  height: 50px;
  margin-top: 10px;

}

.xzbg{
  width: 32px;
  height: 32px;
  background-image: url(../../assets/img/dialogImg/xz.png);
  margin-right: 10px;
  background-position: center center;
  background-size: 100% 100%;
}
.dialogtitleone{
    width: 100%;
    height: 100px;
    border-top: 1px solid #ccc9c9;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 20px;
  }
  .dialogtitletwo{
    width: 100%;
   text-align: right;
   font-size: 14px;
   padding: 0 20px;
  }
  .dialogtitlethree{
    width: 100%;
    height: 80px;
   text-align: left;
   font-size: 14px;
   border-top: 1px solid #ccc9c9;
    align-items: center;
    display: flex;
    padding: 0 20px;
  }
  .serchContent{
    width: 100%;
    height: 200px;
    padding: 20px;
  }
</style>