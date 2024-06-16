<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <Table
        class="table"
        :tableStyle="`border-radius: 2px;`"
        :TableConfig="tableConfig"
        :tableData="tableData"
        tableHeight="100%"
        getRowKey="id"
        :pageSize="formInline.pageSize"
        :pageNum="formInline.pageNum"
      />
    </el-dialog>
    <Detail @close="closeDetail" :dialogVisible="dialogVisible1" :info="info"/>
  </div>
</template>
<script>
  import Detail from './detail.vue';
  export default {
  components: {Detail},
  name: "houseDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  data() {
    return {
      tableConfig: {
        columns: Object.freeze([
          {
            label: "一案一码",
            prop: "id",
          },
          {
            label: "当前状态",
            prop: "status",
          },
          {
            label: "定级",
            prop: "leve"
          },
          {
            label: "纠纷类型",
            prop: "type"
          },
          {
            label: "录入部门",
            prop: "department"
          },
          {
            label: "当前责任部门",
            prop: "responsible"
          },
          {
            label: "申请人姓名",
            prop: "name"
          },
          {
            label: "创建时间",
            prop: "time"
          },
          {
            label: "操作",
            fixed: "right",
            width: 180,
            actions: [
            {
                id: "info",
                text: "查看",
                click: (row) => {
                  console.log(row, 'row');
                  this.info = row;
                  this.dialogVisible1 = true;
                },
              },
                
                
            ],
          },
        ])
      },
      tableData: [
        {
          id: "2024052316154304001",
          status: "调解中",
          leve: "蓝",
          type: "邻里纠纷特殊人群纠纷",
          department: "成都市郫都区司法厅",
          responsible:
            "/中国/四川省/泸州市/纳溪区/安富街道",
          name: "测试1",
          time: "2024-05-23 16:15:44"
        },
        {
          id: "2024051711155303001",
          status: "待送审",
          leve: "黄",
          type: "	婚恋家庭纠纷",
          department: "地区1",
          responsible: "/中国",
          name: "测试2",
          time: "2024-05-20 16:15:44"
        },
      ],
      formInline: {
        pageSize: 20,
        pageNum: 1,
        total: 10,
        data: [],
      },
      dialogVisible1: false,
      info: {}
    }
  },
  watch: {
    // dialogVisible: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     console.log(val, 111);
    //   }
    // }
  },
  methods: {
    handleClose() {
      console.log('关闭弹窗');
      this.$emit("close");
    },
    closeDetail() {
      this.dialogVisible1 = false;
    }
  }
}
</script>

<style scoped>
.table {
  min-height: 400px;
}
</style>