export default {
  methods: {
    // 获取接口列表数据封装
    async QueryList(Interface, identification, object, FormData) {
      let result;
      if (FormData) result = await Interface(object);
      else result = await Interface({ param: object });
      if (result.code !== "000000")
        return this.$message.error({ message: result.msg });
      if (identification.prefix)
        this[identification.data] = result.data[identification.prefix];
      else this[identification.data] = result.data;
      this[identification.total].total = result.total;
    },
    submit(formRef) {
      formRef = typeof formRef == "string" && formRef ? formRef : "ruleForm";
      console.log('formRef',formRef)
      this.$refs[formRef].$refs.ruleForm.validate((valid) => {
        if (!valid) return false;
        this.updateData();
   
      });
    },
    currencySearch({ is, form, newForm, updateData }) {
      this[newForm] = JSON.parse(JSON.stringify(is ? this[form].data : {}));

      this[form].pageNum = 1;
      console.log("this[updateData]", this[updateData]);
      this[updateData]();
    },
    search(parameter) {
      let is = true;

      parameter ? (is = parameter.is) : null;
      this.newFormInline = JSON.parse(
        JSON.stringify(is ? this.formInline.data : {})
      );
      // this.newFormInline = JSON.parse(JSON.stringify(this.formInline.data));
      console.log("this.formInline.data --- ", this.newFormInline);

      this.formInline.pageNum = 1;

      this.listData();
    },
    openDialog({ is, row, dialogVisible = "dialogVisible" }) {
      console.log("is--", is);
      this.is = is;
      if (!is) this.form = JSON.parse(JSON.stringify(row));
      this[dialogVisible] = true;
    },
    deleteMessage({
      text = "当前",
      Interface,
      parameter,
      updateListData,
      source = false,
      multipleLabel,
    }) {
      let information = `<div class="information"><img src="${require("@/assets/icon/warning@2x.png")}"><span>确定要${
        parameter.text ?? "删除"
      }${text}数据吗？</span></div>`;
      return new Promise((resolev) => {
        this.$confirm(information, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
        })
          .then(async () => {
            let result = await Interface(parameter);
            if (result.code !== "000000" && result.msg && result.code == "901") return
              // return this.$message.error({ message: result.msg });
            if (source)
              if (
                this[source.tableData].length === 1 &&
                this[source.formInline].pageNum > 1
              )
                this[source.formInline].pageNum -= 1;

            this[multipleLabel] = [];
            updateListData();
            this.$message.success({
              message: `${parameter.text ?? "删除"}成功！`,
            });
          })
          .catch(() => {}).finally(() => {
            resolev()
          })
      });
    },
    handleCurrentChange(pageNum, form, update) {
      this[form].pageNum = pageNum;
      update();
    },
    // 电话校验
    checkDronePilotPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入 联系电话"));
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        callback(new Error("请输入正确的联系电话"));
      } else {
        callback();
      }
    },
  },
};
