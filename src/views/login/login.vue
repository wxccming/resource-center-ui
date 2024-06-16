<template>
  <div class="Login">
    <div class="LoginTitle">湖北新华教育服务平台•资源管理后台</div>
    <div class="LoginContent">
      <div class="content">
        <h2>账号登陆</h2>
        <div class="form">
          <div class="formContent">
            <el-form
                ref="ruleForm"
                :model="form"
                :rules="rules"
                label-width="auto"
                size="mini"
            >
              <el-form-item label="" prop="userCode">
                <el-input
                    placeholder="用户名"
                    v-focus
                    v-model.trim="form.userCode"
                >
                  <img slot="prefix" src="@/assets/icon/用户名.png"></img>
                </el-input>
              </el-form-item>

              <el-form-item label="" prop="password">
                <el-input
                    placeholder="密码"
                    v-model="form.password"
                    @keyup.enter.native="submitForm('ruleForm')"
                    show-password
                >
                  <img slot="prefix" src="@/assets/icon/密码.png"></img>
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="" prop="password">
                <el-input
                    placeholder="验证码"
                    v-model="form.password"
                    @keyup.enter.native="submitForm('ruleForm')"
                    show-password
                >
                  <img slot="prefix" src="@/assets/icon/密码.png"></img>
                </el-input>
              </el-form-item> -->

              <el-form-item label="">
                <div class="control-pwd">
                  <el-checkbox v-model="checked" @change="onRememberChange">记住密码</el-checkbox>
                  <a class="login-form-forgot" @click="$message.info('请找管理员找回密码！')">
                    忘记密码？
                  </a>
                </div>
              </el-form-item>

              <el-form-item>
                <el-button
                    type="primary"
                    style="width: 100%"
                    :loading="loading"
                    v-preventReClick
                    @click="submitForm('ruleForm')"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findButton, login } from "@/api";
import routerList from "@/router/route.json";
export default {
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    return {
      form: {
        userCode: "",
        password: "",
      },
      rules: {
        userCode: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
      checked:false
    };
  },
  mounted() {

},
  methods: {

    submitForm(formName) {
      this.$router.push("/dispute");
        return
      this.$refs[formName].validate(async (valid) => {
     
        if (!valid) return;
        if (this.loading) return;
        this.loading = true;
        let param = this.form;
        console.log("login---param", param);
      
        let result = await login(param);
        // console.log(result);
        this.loading = false;
        if (result.code !== "000000")return

        let loginData = result.data;
        if (!loginData || !loginData.menuList || !loginData.menuList.length)
          return this.$message.warning({
            message: "无系统访问权限",
            onClose: () => (this.loading = false),
          });

        this.$db.save("responsibility", loginData.responsibility); //角色 1 2 3 专责 班长 班员
        // 固定传值，防止系统设置被关闭，无法进入修改
        // this.$db.save("menuList",routerList[1].children)
        this.$db.save("menuList", loginData.menuList); //菜单
        let userMsg = {
          cityCode: loginData.cityCode ? loginData.cityCode : "",
          username: loginData.userName ? loginData.userName : "",
          userId: loginData.userId ? loginData.userId : "",
          mobile: loginData.mobile ? loginData.mobile : "",
          address: loginData.address ? loginData.address : "",
          organization:
            loginData.organization && loginData.organization.name
              ? loginData.organization.name
              : "",
          orgcode:
            loginData.organization && loginData.organization.code
              ? loginData.organization.code
              : "",
          orgName:
            loginData.organization && loginData.organization.groupName
              ? loginData.organization.groupName
              : "",
          groupCode:
            loginData.organization && loginData.organization.groupCode
              ? loginData.organization.groupCode
              : "",
        };
        this.$db.save("userMsg", userMsg); //菜单

        let permissionBtn = await findButton(); // 获取按钮权限
        permissionBtn = permissionBtn.data ? permissionBtn.data : [];
        this.$db.save("userPermission", permissionBtn);
        console.log(loginData);
        if (loginData.menuList.length) {
          this.$notify({
            title: "登录成功",
            message: `用户名: ${loginData?.userName || "未知"}`,
            type: "success",
          });
          this.$router.push(loginData.menuList[0].path);
        }
        if (this.checked === true) {
          // 传入账号名，密码，和保存天数3个参数
          this.setCookie(param.userCode, param.password, 7)
        } else {
          // 清空Cookie
          this.clearCookie()
        }
      });
    },
    onRememberChange (checked) {
      // console.log('是否记住密码',checked);
      this.checked = checked
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    // 设置cookie
    setCookie (cname, cpwd, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
          'userCode' + '=' + cname + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
          'password' + '=' + cpwd + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie: function () {
      console.log(document.cookie);
      if (document.cookie.length > 0) {
        this.checked = true
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userCode') {
            this.form.userCode = arr2[1]
          } else if (arr2[0] === 'password') {
            this.form.password = arr2[1]
          }
        }
      }
    },
  },
  mounted() {
    this.getCookie()
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__error {
  line-height: 22px;
}

::v-deep .el-form-item__label {
  color: #ffffff;
  font-weight: bold;
}

::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 28px;
}

.Login {
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/bg.png") center center fixed no-repeat;
  //background: #FFFFFF;
  background-size: cover;
  display: flex;
  flex-direction: column;

  .LoginTitle{
    margin:130px 0 50px 0;
    font-size: 60px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: 700;
    color: #fff;
    line-height: 44px;
    letter-spacing: 10px;
    text-align: center;
    scale: .8;
  }

  .LoginContent {
    width: 100%;
    display: flex;
    justify-content: center;
    .content{
      width: 501px;
      height: 489px;
      background: #4187d7;
      // background: url("~@/assets/icon/组24.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      border: 2px solid rgba(11,162,147,0.28);
      display: flex;
      flex-direction: column;
      scale: .8;
    }

    h2 {
      margin: 0;
      width: 100%;
      padding:38px 0 50px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 30px;
    }

    .form {
      padding:0 47px;
      .formContent {
        ::v-deep .el-input--mini .el-input__inner{
          height: 56px;
          background: #4a82c9;
          border: none;
          font-size: 18px;
          text-indent: 10px;
          color:rgba(255,255,255,0.8);
          &::placeholder{
            color:rgba(255,255,255,0.4);
            letter-spacing: 5px;
          }
        }
        ::v-deep .el-input__prefix{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left:5px;
        }
        ::v-deep .el-button{
          font-size: 24px;
          letter-spacing: 10px;
          height: 56px;
          background: linear-gradient(180deg, #1c779e 0%, #3b9dd8 100%);
          border-radius: 7px 7px 7px 7px;
          opacity: 1;
        }
        .control-pwd{
          display: flex;
          justify-content: space-between;
          align-items: center;
          a{
            color:#fff;
            cursor: pointer;
          }
        }
        ::v-deep .el-checkbox{
          color:rgba(255,255,255,0.8);
        }
        ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label{
          color: #fff;
        }
      }
    }
  }
}
</style>
