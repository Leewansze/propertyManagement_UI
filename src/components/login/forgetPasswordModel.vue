/*
 * @Author: Harry 
 * @Date: 2019-10-01 03:12:03 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-01 03:33:00
 */


<template>
  <div class="forgetPassword-model">
    忘记密码
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

export default {
  name: "forgetPassword-model",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false
    };
  },
  methods: {
    login() {
      let res = loginService.login(this.username, this.password);

      res.then(response => {
        console.log(response);
        if (response.flag) {
          this.$router.push(routerApi.home);
        } else {
          this.$message({
            message: "用户或者密码错误！",
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
    }

  }
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
</style>
