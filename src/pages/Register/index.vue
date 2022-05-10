<template>
  <div class="register-container">
    <div class="register-wrapper">
      <h3>
        宏飞商城欢迎您！
        <span class="go"
          >我有账号，去
          <a @click="gotoLogin">登陆</a>
        </span>
      </h3>
      <div id="register">
        <!-- <p class="title">注册</p> -->
        <el-form
          :model="regInfo"
          status-icon
          :rules="rules2"
          ref="regForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="regInfo.userName"
              auto-complete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="regInfo.phone"
              auto-complete="off"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="code">
            <el-input v-model="regInfo.code" placeholder="验证码"></el-input>
            <el-button
              type="primary"
              :disabled="isDisabled"
              @click="sendCode"
              >{{ buttonText }}</el-button
            >
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="regInfo.password"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="regInfo.checkPass"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              @click="submitForm('regForm')"
              style="width: 100%"
              >注册</el-button
            >
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
        <li>手机宏飞汇</li>
        <li>销售联盟</li>
        <li>宏飞汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { reqGetCode } from "@/api";

export default {
  name: "Register",
  data() {
    // 验证用户名是否合法
    let checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!this.checkName(value)) {
        callback(
          new Error("用户名不合法[6到18位（字母，数字，下划线，减号）]")
        );
      } else {
        callback();
      }
    };
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
      } else if (!this.check2Code(value)) {
        callback(new Error("验证码填写错误，请重新填写！"));
      } else {
        callback();
      }
    };
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regInfo.checkPass !== "") {
          this.$refs.regForm.validateField("checkPass");
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 用户注册信息
      regInfo: {
        userName: "",
        password: "",
        checkPass: "",
        phone: "",
        code: "",
      },
      // 校验规则
      rules2: {
        userName: [{ validator: checkUserName, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        phone: [{ validator: checkTel, trigger: "change" }],
        code: [{ validator: checkSmscode, trigger: "change" }],
      },

      buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
      checkCode: null, // 返回的验证码，用户注册时校验
    };
  },
  methods: {
    // <!--发送验证码-->
    sendCode() {
      let tel = this.regInfo.phone;
      if (this.checkMobile(tel)) {
        // console.log(tel);
        let time = 60;
        // 发送验证码
        this.getCode();
        this.buttonText = "已发送";
        this.isDisabled = true;
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + " 秒";
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = "重新获取";
              this.isDisabled = false;
              this.flag = true;
            }
          }, 1000);
        }
      }
    },
    // 获取验证码
    async getCode() {
      // 获取验证码
      try {
        await this.$store.dispatch("getCode", { phone: this.regInfo.phone });
        // 验证码自动填写
        this.checkCode = this.$store.state.user.code;
        this.flag = false;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error",
        });
      }
    },
    // 校验验证码是否填写正确
    check2Code(value) {
      if (this.checkCode === value) {
        return true;
      } else {
        return false;
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 注册
          this.submitRegister();
          // setTimeout(() => {
          //   alert("注册成功");
          // }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证用户名
    checkName(str) {
      // 4到16位（字母，数字，下划线，减号）
      let re = /^[a-zA-Z0-9_-]{6,18}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    // 发送请求进行注册
    async submitRegister() {
      // 完成注册
      try {
        this.$store.dispatch("userRegister", this.regInfo);
        // 注册成功，跳转登录
        this.$router.push({ path: "/login" });
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error",
        });
        // 重新注册
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