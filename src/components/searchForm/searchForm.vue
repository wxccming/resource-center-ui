<template>
  <div class="searchForm">
    <TabCard :title="'筛选'">
      <template #content>
        <el-form
          :model="Form"
          :rules="searchForm.rulesForm"
          ref="searchForm"
          label-width="0px"
          class="demo-ruleForm"
          size="small"
        >
          <div class="rightContent">
            <el-row :gutter="20">
              <el-col
                :span="24"
                v-for="col in searchFormColumns"
                :key="col.prop"
              >
                <div class="contentItem" v-if="col.type === 'input'">
                  <div class="title">{{ col.label }}</div>
                  <el-form-item :prop="col.prop">
                    <el-input
                      v-model="Form[col.prop]"
                      :placeholder="`请输入${col.label}`"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="contentItem" v-if="col.type === 'options'">
                  <div class="title">{{ col.label }}</div>
                  <div class="content">
                    <div
                      :class="
                        Form[col.prop]?.includes(option.code)
                          ? 'item'
                          : 'active'
                      "
                      v-for="option in col.option"
                      :key="option.code"
                      @click="handerClick(option, col)"
                      :title="option.name"
                    >
                      {{ option.name }}
                    </div>
                    <div class="emp"></div>
                  </div>
                </div>
                <div class="contentItem" v-if="col.type === 'cascader'">
                  <div class="title">{{ col.label }}</div>
                  <el-cascader
                    :options="col.options"
                    :props="col.props"
                    clearable
                    v-model="Form[col.prop]"
                    @change="(val) => col.onChange && col.onChange(val)"
                  ></el-cascader>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="btns">
            <el-form-item>
              <el-button @click="resetForm" v-preventReClick>取消</el-button>
              <el-button type="primary" @click="submitForm">确定</el-button>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </TabCard>
  </div>
</template>

<script>
import TabCard from "@/components/tabList/tabCard.vue";
export default {
  components: { TabCard },
  props: ["searchForm", "Form"],
  computed: {
    searchFormColumns() {
      return this.searchForm.columns.filter((item) => item);
    },
  },
  data() {
    return {
      flag: {},
    };
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$emit("screeningData", this.Form);
    },
    resetForm() {
      this.$emit("resetForm", this.Form);
    },
    handerClick(option, item) {
      if (this.Form[item.prop].includes(option.code)) {
        // 支持多选
        // this.Form[item.prop] = this.Form[item.prop].filter(
        //   (ele) => ele != option.code
        // );
        // 支持单选
        this.Form[item.prop] = [];
      } else {
        this.Form[item.prop] = [option.code];
        // this.Form[item.prop].push(option.code);
      }
      item.onClick && item.onClick(option);
    },
    parameter() {
      return {
        pageNum: 1,
        pageSize: 50,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.searchForm {
  width: 100%;
  height: 100%;
  .el-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 96%;
    align-items: flex-end;
  }
  .rightContent {
    height: 100%;
    width: 100%;
    overflow: auto;
    .contentItem {
      width: 100%;
      .el-cascader {
        width: 100%;
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        margin: 10px 0;
      }
      .content {
        max-height: 16rem;
        min-height: 5rem;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #49b1f5;
        justify-content: space-around;
        padding: 10px 0px 0 20px;
        border-radius: 4px;
        &:hover {
          border: 1px solid #ccc;
        }
        &::-webkit-scrollbar {
          /* 对应纵向滚动条的宽度 */
          // width: 10px !important;
          // /* 对应横向滚动条的宽度 */
          // height: 10px !important;
          display: block !important;
          // border-radius: 4px !important;
          background: #e2e6f0;
        }
        .active {
          width: 13rem;
          height: 3rem;
          line-height: 3rem;
          background: #eceffd;
          border-radius: 4px;
          margin-right: 9px;
          text-align: center;
          margin-bottom: 10px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #4B5582;
          &:hover {
            background-color: #0e6bed;
            opacity: 0.84;
            color: #fff;
          }
        }
        .item {
          background-color: #0e6bed;
          color: #fff;
          width: 13rem;
          height: 3rem;
          border-radius: 4px;
          line-height: 3rem;
          margin-right: 9px;
          text-align: center;
          margin-bottom: 10px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .emp{
          width: 13rem;
          margin-right: 9px;
        }
      }
    }
  }
  .btns {
    margin-top: 40px;
  }
}
</style>
