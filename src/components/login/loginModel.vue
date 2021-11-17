/*
 * @Author: Harry 
 * @Date: 2019-10-01 03:12:03 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 12:48:34
 */


<template>
  <div class="login-model">
    登录
    <div class="input-group">
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="2">
          <i class="el-icon-user icon"></i>
        </el-col>
        <el-col :span="22">
          <el-input placeholder="账号" v-model="username" clearable></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <i class="el-icon-lock icon"></i>
        </el-col>
        <el-col :span="22">
          <el-input placeholder="密码" type="password" v-model="password" clearable></el-input>
        </el-col>
      </el-row>

      <el-row v-if="this.$store.getters['login/getIsLoginFailTimes']" class="validate-code" :gutter="20">
        <el-col :span="2">
          <i class="el-icon-c-scale-to-original icon"></i>
        </el-col>
        <el-col :span="14">
          <el-input placeholder="验证码"  v-model="validateCode" clearable></el-input>
        </el-col>

        <el-col :span="6">
            <img  @click="changeValidateCode" class="validate-code-img" :src="url" />
        </el-col>
      </el-row>
    </div>

    <div class="remember-me">
      <el-row type="flex">
        <el-col :span="4" class="remember-me-select">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-col>

        <el-col :span="8" class="remember-link">
          <el-link type="primary" @click="forgetPassword">忘记密码</el-link>
        </el-col>
        <el-col :span="8">
          <el-link type="primary" @click="registered">立即注册</el-link>
        </el-col>
      </el-row>
    </div>

    <div class="button-group">
      <el-row type="flex">
        <el-col :span="8">
          <el-button class="login-button" type="primary" @click="login">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import loginService from "@/service/loginService";
import routerApi from "@/service/api/routerApi";
import localStorageHelper from "@/service/localStorageHelper"

export default {
  name: "login-model",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      validateCode:"",
      url:" http://127.0.0.1:8519/code/image",
      baseUrl:" http://127.0.0.1:8519/code/image",

    };
  },
  methods: {
    changeValidateCode(){
      let num = Math.ceil(Math.random()*250);//生成一个随机数（防止缓存）
      this.url = this.baseUrl + "?" + num;
    },
    login() {
      if(this.username == "" || this.password == ""){
          this.$message({
            message: "请填写账号和密码!",
            type: "error"
          });
          return;
      }

      let res = loginService.login(this.username, this.password,this.rememberMe,this.validateCode);

      res.then(response => {
        // console.log(response);
        if (response.flag) {
          this.$router.push(routerApi.getHome());
          this.$message({
            message: "登录成功！",
            type: "success"
          });
          this.$store.commit('login/IS_LOGIN_MODEL_SHOW', false)
        } else {
          let mes = "用户或者密码错误！";

          // console.log(response)
          if(response.code === 40005){
            let ls = new localStorageHelper();
            let isShowVcode = ls.get("isShowVcode");
            // console.log(isShowVcode)
            if(isShowVcode === undefined){
              //设置15分钟内该ip需要验证码
              ls.set("isShowVcode",true,1000 * 60 * 15);
            }
            this.$store.commit('login/setIsLoginFailTimes',true);
            // console.log(this.$store.getters['login/getIsLoginFailTimes'])
            this.loginFailTimes();
          }
          else if(response.code === 40007){
            mes = "验证码错误!";
            this.changeValidateCode();
          }


          this.$message({
            message: mes,
            type: "error"
          });
        }
      });
    },
    forgetPassword(){
      this.$emit('changeView',"forgetPassword");
    },
    registered(){
      this.$emit('changeView',"registered");
    },
    loginFailTimes(){
      this.$emit('setLoginFailCardHeight',570);
    }

  },
  created() {
    // console.log(this.$store.getters['login/getIsLoginFailTimes']);
  },
};
</script>


<style>
.input-group {
  margin-top: 20%;
}

.el-row {
  margin-bottom: 15%;
}

.icon {
  font-size: 20px;
  margin-top: 10px;
}
.remember-me {
  margin-left: 2px;
}

.remember-me-select {
  margin-top: 1px;
}

.remember-link {
  margin-left: 60px;
  padding-bottom: 20px;
}

.login-button {
  width: 250px;
  margin-left: 30%;
}

.validate-code .el-input{
  /* margin-bottom: 50px !important; */
  /* width: 50%; */
}

.validate-code-img{
  margin-top: 6px;
  width: 80px;
}
</style>
