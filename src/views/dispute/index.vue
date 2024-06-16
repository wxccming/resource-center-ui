<template>
  <div class="home">
    <titlecope :value="value"/>
    <!-- <div class="titlebox">
        <span style="color: rgba(0, 0, 0, .45);">首页 &nbsp;/&nbsp;</span> <span style="color: rgba(0, 0, 0, .45);">首页
          &nbsp;/&nbsp;</span> <span>工作台</span>
      </div> -->
    <div class="conbox">
      <div class="conboxleft">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="activename"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#fff"
              text-color="#000"
              active-text-color="#2f54eb"
              unique-opened
            >
              <el-submenu index="1" :collapse="isCollapse1">
                <template slot="title">
                  <i class="el-icon-s-marketing"></i>
                  <span>资源管理</span>
                </template>

                <template v-for="(item, index) in MenuS">
                  <el-menu-item
                    :key="index"
                    :index="item.id"
                    @click="beforeCurrentMenu(item)"
                  >
                    {{ item.name }}
                  </el-menu-item>
                </template>
              </el-submenu>

              <el-submenu index="2" :collapse="isCollapse2">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span slot="title">资源元数据管理</span>
                </template>

                <template v-for="(item, index) in Menutwo">
                  <el-menu-item
                    :key="index"
                    :index="item.id"
                    @click="getselct(item)"
                  >
                    {{ item.name }}
                  </el-menu-item>
                </template>

              </el-submenu>

              <el-submenu index="3" :collapse="isCollapse3">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span slot="title">用户管理</span>
                </template>
                <template v-for="(item, index) in Menuthree">
                  <el-menu-item
                    :key="index"
                    :index="item.id"
                    @click="getpople(item)"
                  >
                    {{ item.name }}
                  </el-menu-item>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="conboxright">
        <general v-if="this.name2 == '汇聚资源管理'" :name1="name1" :name2="name2" />
        <Judicial
          v-if="this.name2 == '资源审核管理'"
          :name1="name1"
          :name2="name2"
        />
        <sheng
          v-if="this.name2 == '二维码管理'"
          :name1="name1"
          :name2="name2"
        />
        <public v-if="this.name2 == '图书管理'" :name1="name1" :name2="name2" />
        <procuratorate
          v-if="this.name2 == '管理员管理'"
          :name1="name1"
          :name2="name2"
        />
        <petition
          v-if="this.name2 == '角色管理'"
          :name1="name1"
          :name2="name2"
        />
        <ecai v-if="this.name2 == '学位管理'" :name1="name1" :name2="name2" />
        <people v-if="this.name2 == '民政数据'" :name1="name1" :name2="name2" />
        <women v-if="this.name2 == '妇联数据'" :name1="name1" :name2="name2" />
        <citizen v-if="this.name2 == '12345数据'" :name1="name1" :name2="name2" />
        <grid v-if="this.name2 == '网格化数据'" :name1="name1" :name2="name2" />
        <court v-if="this.name2 == '法院数据'" :name1="name1" :name2="name2" />
        <soldier v-if="this.name2 == '退役军人数据'" :name1="name1" :name2="name2" />
        <comprehensive v-if="this.name2 == '综合查询'" :name1="name1" :name2="name2" />
        <basic v-if="this.name2 == '基础人员库'" :name1="name1" :name2="name2" />
      </div>
    </div>
  </div>
</template>
  
<script>
import { getdictionary } from '@/api/index1.js'
export default {
  components: {
    titlecope: () => import("@/views/management/titlecope.vue"),
    general: () => import("@/views/dispute/general.vue"),
    Judicial: () => import("@/views/dispute/Judicial.vue"),
    sheng: () => import("@/views/dispute/sheng.vue"),
    public: () => import("@/views/dispute/public.vue"),
    procuratorate: () => import("@/views/dispute/procuratorate.vue"),
    petition: () => import("@/views/dispute/petition.vue"),
    ecai: () => import("@/views/dispute/ecai.vue"),
    people: () => import("@/views/dispute/people.vue"),
    women: () => import("@/views/dispute/women.vue"),
    citizen: () => import("@/views/dispute/citizen.vue"),
    grid: () => import("@/views/dispute/grid.vue"),
    court: () => import("@/views/dispute/court.vue"),
    soldier: () => import("@/views/dispute/soldier.vue"),
    comprehensive: () => import("@/views/dispute/comprehensive.vue"),
    basic: () => import("@/views/dispute/basic.vue"),
    
  },

  name: "dispute",
  created() {},
  beforeDestroy() {},
  data() {
    return {
      isCollapse1:false,
      isCollapse2:false,
      isCollapse3:false,
      value:'tab2',
      isshow: false,
      MenuS: [
        { name: "汇聚资源管理", id: "1-1" },
        { name: "资源审核管理", id: "1-2" },
        { name: "二维码管理", id: "1-3" }, 
      ],
      Menutwo: [
      { name: "图书管理", id: "2-7" }
        // { name: "学位管理", id: "2-1" },
        // { name: "年级管理", id: "2-2" },
        // { name: "学科管理", id: "2-3" }, 
        // { name: "版本管理", id: "2-4" },
        // { name: "册别管理", id: "2-5" },
        // { name: "出版单位管理", id: "2-6" }, 
        // { name: "图书管理", id: "2-7" },
        // { name: "章节管理", id: "2-8" },
        // { name: "来源管理", id: "2-9" }, 
      ],
      Menuthree: [
        { name: "管理员管理", id: "3-1" },
        { name: "角色管理", id: "3-2" },
       
      ],
      
      
      activename: "1-1",
      name1: "资源管理",
      name2: "汇聚资源管理",
    };
  },
  computed: {},
  mounted() {
    this.queryDictionary();
  },
  methods: {
     getpople(item) {
      this.name1 = "用户管理";
      this.name2 = item.name;
      
    },
    getselct(item) {
      this.name1 = "资源元数据管理";
      this.name2 = item.name;
   
    },
    beforeCurrentMenu(item) {
      this.name1 = "资源管理";
      this.name2 = item.name;
  
    },
    handleOpen(key, keyPath) {
      if(key==1){
        this.isCollapse1=true;
      this.isCollapse2=false;
      this.isCollapse3=false;
      }else if(key==2){
        this.isCollapse1=false;
      this.isCollapse2=true;
      this.isCollapse3=false;
      }else if(key==3){
        this.isCollapse1=false;
      this.isCollapse2=false;
      this.isCollapse3=true;
      }
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    queryDictionary() {
      getdictionary().then((res) => {
        console.log(res.data, 'Dictionary');
        const list = res.data;
        let keyMap = {};
        for (let i = 0; i < list.length; i++) {
          list[i].text = list[i].label;
          list[i].id = list[i].value;
          if (keyMap[list[i].dictType]) {
            keyMap[list[i].dictType].push(list[i]);
          } else {
            keyMap[list[i].dictType] = [list[i]];
          }
        }
        console.log(keyMap, 'keyMap');
        sessionStorage.setItem("Dictionary", JSON.stringify(keyMap));
      });
    }
  },
  watch: {},
};
</script>
  <style lang="scss" scoped>
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

.conbox {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  .conboxleft {
    width: 250px;
    height: calc(100vh - 100px);
    background: #fff;
  }
  .conboxright {
    width: calc(100% - 250px);
    height: calc(100vh - 100px);
  }
}

::v-deep .el-menu-item-group__title {
  padding: 0;
}
::v-deep .el-submenu .el-menu-item:hover {
  background: none !important;
  color: #2f54eb !important;
}
::v-deep .el-submenu .el-menu-item.is-active {
  background: #f0f5ff !important;
  color: #061af7 !important;
  z-index: 999;
}
::v-deep .el-submenu .el-menu-item {
  color: #7a7777 !important;
}
::v-deep .el-submenu.is-active .el-submenu__title{
  background: #2f54eb !important;
  color: #fff !important;
  font-size: 16px;
}
::v-deep .el-submenu.is-active .el-submenu__title i{
  color: #fff !important;
}
</style>