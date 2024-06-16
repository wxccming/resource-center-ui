<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      >
        <div class="content">
          <div class="left">
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>基本信息</div>
              </div>
              <div class="detail">
                <div>
                  <img class="userImg" src="@/assets/img/dialogImg/user.png" alt="">
                </div>
                <div>
                  <div>
                    <span class="lable">姓名：</span>
                    <span>{{ detail.name }}</span>
                  </div>
                  <div>
                    <span class="lable">性别：</span>
                    <span>{{ detail.sex }}</span>
                  </div>
                  <div>
                    <span class="lable">年龄：</span>
                    <span>{{ detail.age }}</span>
                  </div>
                  <div>
                    <span class="lable">身份证：</span>
                    <span>{{ detail.num }}</span>
                  </div>
                  <div>
                    <span class="lable">联系电话：</span>
                    <span>{{ detail.phone }}</span>
                  </div>
                  <div>
                    <span class="lable">联系地址：</span>
                    <span>{{ detail.address }}</span>
                  </div>
                  <div>
                    <span class="lable">户籍地址：</span>
                    <span>{{ detail.residence }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>人员类别</div>
              </div>
              <div class="typePerson">
                <div class="typeDetail">
                  <div class="tag">
                    <el-button  size="small" type="primary" plain>人员标签</el-button>
                    <el-button size="medium" type="warning" plain>涉纠纷类型</el-button>
                  </div>
                  <div class="imgList">
                    <img src="@/assets/img/dialogImg/type1.png" alt="">
                    <img src="@/assets/img/dialogImg/typeUser.png" alt="">
                    <img src="@/assets/img/dialogImg/type2.png" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>风险预警</div>
              </div>
              <div class="risk">
                <div class="riskContent">
                  <div class="progress">
                    <el-progress el-progress stroke-width="10" define-back-color="#ff9b00" stroke-linecap="butt" :format="format" width="80" color="#fff" type="circle" :percentage="35"></el-progress>
                  </div>
                  <div class="text">
                    <span>预警分值：25</span>
                    <span>人员越界预警（重点...</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>关系图</div>
              </div>
              <div>
                <div class="nodata">
                  <img src="@/assets/img/dialogImg/nodata.svg" alt="">
                  暂无数据
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>纠纷化解事项</div>
                <el-button class="btn" type="info" size="mini"> 涉事0次</el-button>
              </div>
              <div>
                <div class="nodata py30">
                  <img src="@/assets/img/dialogImg/nodata.svg" alt="">
                  暂无数据
                </div>
              </div>
            </div>
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>部门涉事数据</div>
                <el-button class="btn" type="info" size="mini"> 涉事2次</el-button>
              </div>
              <div class="department">
                <div @click="getDetail(item)" v-for="(item, index) in detail.department" :key="item.id" :class="{'borderBtm': index !== detail.department.length - 1}">
                  <div class="items">
                    <span>发生区域：</span>
                    <span>{{ item.address }}</span>
                  </div>
                  <div class="items">
                    <span>来源部分：</span>
                    <el-button size="mini" plain type="primary">{{ item.from }}</el-button>
                  </div>
                  <div class="items">
                    <span>报送时间：</span>
                    <span>{{ item.time }}</span>
                  </div>
                  <div class="items">
                    <span>一案一码：</span>
                    <span>{{ item.id }}<el-button class="tag" size="mini" plain type="warning">{{ item.leve }}</el-button></span>
                  </div>
                  <div class="items">
                    <span>事项简述：</span>
                    <span class="message">{{ item.message }}</span>
                  </div>
                  <div class="items">
                    <span>警情状态：</span>
                    <span>{{ item.status }}</span>
                  </div>
                </div>
                <!-- <div class="nodata py30">
                  <img src="@/assets/img/dialogImg/nodata.svg" alt="">
                  暂无数据
                </div> -->
              </div>
            </div>
            <div class="card">
              <div class="title">
                <div class="blueCode"></div>
                <div>第三方平台数据</div>
                <el-button class="btn" type="info" size="mini"> 涉事0次</el-button>
              </div>
              <div>
                <div class="nodata py30">
                  <img src="@/assets/img/dialogImg/nodata.svg" alt="">
                  暂无数据
                </div>
              </div>
            </div>
          </div>
        </div>
        <span v-if="!nofoot" slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleClose">保存</el-button>
        </span>
    </el-dialog>
    <DisputDialog :dialogVisible="visible" @close="closeDialog"/>
  </div>
</template>
<script>
import DisputDialog from "@/components/dialog/disput/index.vue";

export default {
  name: 'DisputUserDetailDialog',
  components: {DisputDialog},
  data() {
    return {
      detail: {
        name: '唐焕西',
        sex: '男',
        age: '56岁',
        num: '510523196712221274',
        phone: '19136409230',
        address: '',
        residence: '',
        department: [
          {
            address: '/中国',
            from: '公安',
            time: '2024-05-11 11:34:59',
            id: 'B009824051151T1JHINMT9',
            message: '处警人员到达现场时现场无人受伤。处警人员将现场人员移送派出所，交由派出所值班民警处理李绍阳。回复指挥中心撤回。',
            status: '其他',
            leve: '简单（1级）'
          },
          {
            address: '/中国',
            from: '法院',
            time: '2024-05-23 11:34:59',
            id: 'B009824051151NMT91111',
            message: '处警人员到达现场时现场无人受伤。处警人员将现场人员移送派出所，交由派出所值班民警处理李绍阳。回复指挥中心撤回。',
            status: '准予撤销',
            leve: '简单（1级）'
          },
        ]
      },
      visible: false,
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '查看',
    },
    nofoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    format() {
      return '红'
    },
    getDetail(val) {
      this.visible = true;
      console.log('detail', val);
    },
    closeDialog() {
      this.visible = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  .card {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 20px 0;
    margin-bottom: 6px;
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    line-height: 26px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .blueCode {
      width: 6px;
      height: 26px;
      background: blue;
      margin-right: 14px;
    }
    .btn {
      margin-left: 24px;
    }
  }
  
  .left {
    width: 42%;
    .detail {
      display: flex;
      line-height: 28px;
      .userImg {
        width: 120px;
        margin: 0 20px 0 10px;
      }
      .lable {
        width: 70px;
        display: inline-block;
        color: #bbb;
      }
    }
    .typePerson {
      display: flex;
      justify-content: center;
      
      .typeDetail{
        margin-bottom: 30px;
        .tag {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .imgList {
          display: flex;
          align-items: flex-start;
        }
      }
    }
    .risk {
      .riskContent {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 20px;
        .progress {
          position: absolute;
          left: -5px;
        }
      }
      .text {
        background: linear-gradient(90deg,#fff7e8,#fff);
        line-height: 56px;
        span:nth-child(1) {
          font-size: 18px;
          padding: 0 20px;
          padding-left: 80px;
        }
      }
    }
  }
  .right {
    width: 58%;
    margin-left: 20px;
    .department {
      padding: 10px 20px;
      color: #aaa;
      line-height: 24px;
      height: 210px;
      overflow-y: scroll;
      .borderBtm {
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      .tag {
        margin-left: 10px;
      }
      .message {
        width: 80%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .items {
        display: flex;
        align-items: center;
      }
    }
  }
  .nodata {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #aaa;
    img {
      width: 120px;
      margin-bottom: 8px;
    }
  }
}
.py30 {
  padding: 40px 0;
}
</style>