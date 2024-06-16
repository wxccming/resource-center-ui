<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <div class="content">
        <div class="left">
          <div class="title">基础信息</div>
          <div class="collapseList" v-for="itm in contentList" :key="itm">
            <div class="collapseConten" v-for="(it, i) in itm" :key="it" :class="{'twoContent' : itm.length === 2 && i ==0 }">
              <div class="lable">{{ it.name }}</div>
              <div class="value">{{ it.content }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div v-for="item in list" :key="item">
            <div class="dateTime">{{item.time}}</div>
            <div class="contentHead">{{ item.title }}</div>
            <div class="contentMsg">
              <div class="msgTitle">操作内容</div>
              <div class="msgContent">{{ item.content }}</div>
            </div>
            <div class="contentDetail">
              <div>操作人： {{ item.nameCn }}</div>
              <div class="address">所属区域：{{ item.address }}</div>
            </div>
          </div>
        </div>
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'TypesDialog',
  data() {
    return {
      list: [
        {
          id: 1,
          time: '2024-04-18 15:52:54',
          title: '送审',
          content: '发起送审申请',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 2,
          time: '2024-04-16 15:52:54',
          title: '送审',
          content: '发起送审申请',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
        {
          id: 3,
          time: '2024-04-13 15:52:54',
          title: '送审撤销',
          content: '送审撤销',
          nameCn: '用户2（15222222223）',
          address: '/中国/四川省/泸州市/纳溪区/安富街道'
        },
      ],
      contentList: [
        [
          {
            name: '数据导入部门',
            content: '/中国/测试省/测试市/测试县'
          }
        ],
        [
          {
            name: '编号',
            content: 'sf050801'
          },
          {
            name: '纠纷类别',
            content: '纠纷类别1'
          },
          // {
          //   name: '案件来源',
          //   content: '案件来源1'
          // },
        ],
        [
          {
            name: '申请人',
            content: '司法当事人1,司法当事人2'
          },
          {
            name: '收案日期',
            content: '2024/4/15'
          },
          // {
          //   name: '调解时间',
          //   content: '2024/4/16'
          // },
        ],
        [
          {
            name: '调解结果',
            content: '调解结果1,报警'
          },
          {
            name: '涉案金额',
            content: '1.1'
          },
          // {
          //   name: '	地区',
          //   content: '地区13'
          // },
        ],
        [
          {
            name: '司法局',
            content: '四川省-司法'
          },
          {
            name: '调解机构',
            content: '调解机构12'
          },
          // {
          //   name: '调解人员',
          //   content: '调解人员X'
          // },
        ],
        [
          {
            name: '协办人',
            content: '协办人1'
          },
          {
            name: '纠纷内容',
            content: '反映村委会集体土地的权属和土地征收款的去向有关事项。'
          },
        ]
      ]
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
    width: {
      type: String,
      default: '70%',
    },
    nofoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    flex: 1;
    .title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .collapseList {
      display: flex;
      border: 1px solid #eee;
      border-bottom: unset;
      &:nth-last-child(1) {
        border-bottom: 1px solid #eee;
      }
      .collapseConten {
        display: flex;
        flex: 1;
        .lable {
          width: 100px;
          background: #597ef7;
          color: #fff;
          padding: 10px 20px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .value {
          margin: 0 20px;
          display: flex;
          align-items: center;
        }
      }
      .twoContent {
        flex: unset;
        width: 33.33%;
      }
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    .dateTime {
      color: #1c6ff9;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .contentHead {
      background: #90b8fa;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
    .contentMsg {
      display: flex;
      color: #000;
      font-size: 14px;
      .msgTitle {
        width: 100px;
        font-size: 16px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border: 1px solid #eee;
      }
      .msgContent {
        padding: 10px 20px;
        flex: 1;
        border: 1px solid #eee;
      }
    }
    .contentDetail {
      color: #000;
      font-size: 14px;
      border: 1px solid #eee;
      border-top: unset;
      line-height: 24px;
      padding: 10px 20px 20px;
      margin-bottom: 20px;
    }
  }
}
</style>