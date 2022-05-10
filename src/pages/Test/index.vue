<template>
  <div class="register-container">
    <div class="register-wrapper">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div id="register">
        <!-- <p class="title">注册</p> -->
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="tel">
            <el-input
              v-model="ruleForm2.tel"
              auto-complete="off"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="smscode" class="code">
            <el-input
              v-model="ruleForm2.smscode"
              placeholder="验证码"
            ></el-input>
            <el-button
              type="primary"
              :disabled="isDisabled"
              @click="sendCode"
              >{{ buttonText }}</el-button
            >
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm2.pass"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              @click="submitForm('ruleForm2')"
              style="width: 100%"
              >注册</el-button
            >
            <!-- <p class="login" @click="gotoLogin">已有账号？立即登录</p> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  //   data() {
  //     return {
  //       // 注册信息
  //       phone: "",
  //       code: "",
  //       password: "",
  //       rePassword: "",
  //       // 是否统一协议
  //       isAgree: false,
  //     };
  //   },
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!this.checkMobile(value)) {
        callback(new Error("手机号码不合法"));
      } else {
        callback();
      }
    };
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机验证码"));
      } else {
        callback();
      }
    };
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        tel: "",
        smscode: "",
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        tel: [{ validator: checkTel, trigger: "change" }],
        smscode: [{ validator: checkSmscode, trigger: "change" }],
      },
      buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
    };
  },
  methods: {
          // <!--发送验证码-->
    sendCode () {
      let tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
        console.log(tel)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            alert('注册成功')
          }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    async getCode() {
      // 获取验证码
      try {
        await this.$store.dispatch("getCode", { phone: this.phone });
        // 验证码自动填写
        this.code = this.$store.state.user.code;
      } catch (error) {
        console.log(error.message);
      }
    },
    async submitRegister() {
      // 完成注册
      try {
        // 校验
        const { password, phone, rePassword, code } = this;
        (await (phone && password == rePassword && code)) &&
          this.$store.dispatch("userRegister", { phone, password, code });
        // 注册成功，跳转登录
        this.$router.push({ path: "/login" });
      } catch (error) {
        this.$router.push({ path: "/register" });
      }
    },
  },
};
</script>

 
<style scoped>
#register {
  max-width: 340px;
  margin: 0px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}

.el-form-item {
  text-align: center;
}

.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code button {
  margin-top: 10px;
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>


<style lang="less" scoped>
.register-container {
  .register-wrapper {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }
    div:nth-of-type(1) {
      margin-top: 10px;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>