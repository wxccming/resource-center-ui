<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    >
      <div>
        <el-collapse  v-model="activeNames" class="list">
          <el-collapse-item v-for="(item, index) in collapseList" :key="item" :title="item.title" :name="index">
            <div class="collapseList" v-for="itm in item.list" :key="itm">
              <div class="collapseConten" v-for="(it, i) in itm" :key="it" :class="{'twoContent' : itm.length === 2 && i ==0 }">
                <div class="lable">{{ it.name }}</div>
                <div class="value">{{ it.content }}</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <span v-if="!nofoot" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">协同申请</el-button>
        <el-button type="primary" @click="handleClose">立即预警</el-button>
      </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DisputDialog',
  data() {
    return {
      collapseList: [
        {
          title: '司法数据信息',
          list: [
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
              {
                name: '案件来源',
                content: '案件来源1'
              },
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
              {
                name: '调解时间',
                content: '2024/4/16'
              },
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
              {
                name: '	地区',
                content: '地区13'
              },
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
              {
                name: '调解人员',
                content: '调解人员X'
              },
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
        },
        {
          title: '详情信息',
          list: [
            [
              {
                name: '事项编号',
                content: '16355585618963988513'
              }
            ],
            [
              {
                name: '事件唯一编码',
                content: 'B0200000000C2DEA0BCA'
              }
            ],
            [
              {
                name: '发生时间',
                content: '2023-07-13'
              },
              {
                name: '事项类型',
                content: '房屋宅基地纠纷'
              },
              {
                name: '涉及人数',
                content: '13'
              },
            ],
            [
              {
                name: '发生地点',
                content: '3'
              },
              {
                name: '主办理方',
                content: '成都市郫都区司法厅'
              },
              {
                name: '标签信息',
                content: '13'
              },
            ],
            [
              {
                name: '事件来源方',
                content: '四川省-司法'
              },
              {
                name: '事件办理状态',
                content: '12'
              },
              {
                name: '身份证号',
                content: '51012419870601204X'
              },
            ],
            [
              {
                name: '纠纷内容',
                content: '反映村委会集体土地的权属和土地征收款的去向有关事项。'
              }
            ]
          ]
        },
      ],
      activeNames: 0
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
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
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
        width: 150px;
        background: #597ef7;
        color: #fff;
        padding: 10px 20px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }
      .value {
        margin-left: 20px;
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
</style>