<template>
    <div ref="container">
      <el-popover
        :width="this.width || this.containerWidth"
        placement="bottom-start"
        title=""
        trigger="click"
      >
        <el-input
          :readonly="true"
          placeholder="请输入内容"
          slot="reference"
          suffix-icon="el-icon-arrow-down"
          v-model="value"
        >
        </el-input>
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-popover>
    </div>
  </template>
  <script>
  export default {
    name: "treeSelect",
    data () {
      return {
        value: "",
  
        valueArr: [],
        containerWidth: 100
      }
    },
    mounted () {
      console.log(this.$refs.container.offsetWidth)
      this.containerWidth = this.$refs.container.offsetWidth
    },
    model: {
      prop: "defaultValue",
      event: 'change'
    },
    props: {
      // defaultProps: {
      //   children: 'children1',
      //   label: 'label1'
      // },
      defaultProps: {
        type: Object,
        required: true
      },
      width: {
        type: Number
      },
      // data: [{
      //   label1: '一级 1',
      //   children1: [{
      //     label1: '二级 1-1',
      //     children1: [{
      //       label1: '三级 1-1-1'
      //     }]
      //   }]
      // }],
      // tree 选项
      data: {
        type: Array,
        required: true
      },
      defaultValue: {
        type: String
      },
      // 是否显示所有层级
      showAllLevels: {
        type: Boolean,
        default: true
      },
      // 分隔符
      separator: {
        type: String,
        default: "/"
      }
    },
    watch: {
      defaultValue: {
        immediate: true,
        handler (val) {
          this.value = val
        }
      }
    },
    methods: {
      // 清空form表单校验（自定义组件）
      // this.$refs['formItem'].$emit('el.form.blur', v)
      handleNodeClick (data, node) {
        console.log(data, node)
        this.valueArr = []
        this.handleGetNodeName(node)
        this.valueArr.push(data[this.defaultProps.label])
        if (this.showAllLevels) {
          this.value = this.valueArr.join(this.separator)
        } else {
          this.value = this.valueArr[this.valueArr.length - 1]
        }
        this.$emit('change', this.value)
        this.$emit('handleGetValue', {
          data, node
        })
      },
      // 获取节点名称递归
      handleGetNodeName (node) {
        if (node.parent.label) {
          this.valueArr.unshift(node.parent.label)
          this.handleGetNodeName(node.parent)
        }
      }
    },
    computed: {
  
    }
  }
  </script>
  
  