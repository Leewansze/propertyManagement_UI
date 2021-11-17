/*
 * @Author: Harry 
 * @Date: 2019-10-01 03:12:03 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-22 21:53:36
 */


<template>
  <div class="registered-model">
    注册<el-link class="isregistered" type="primary" @click="isregistered">已注册</el-link>
    <div class="form-group">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="form-item-label" prop="username">
          <el-row :gutter="3">
            <el-col :span="3">
              <i class="el-icon-user icon"></i>
              </el-col>
              <el-col :span="18">
                <el-input placeholder="请输入用户名" class="form-item-input" v-model="ruleForm.username"></el-input>
              </el-col>
          </el-row>
        </el-form-item>


        <el-form-item class="form-item-label" prop="nickname">
          <el-row :gutter="3">
            <el-col :span="3">
              <i class="el-icon-user icon"></i>
              </el-col>
              <el-col :span="18">
                <el-input placeholder="请输入昵称" class="form-item-input" v-model="ruleForm.nickname"></el-input>
              </el-col>
          </el-row>
        </el-form-item>


        <el-form-item class="form-item-label" prop="pass">
          <el-row :gutter="3">
            <el-col :span="3">
              <i class="el-icon-lock icon"></i>
            </el-col>

            <el-col :span="18">
              <el-input placeholder="请输入密码" class="form-item-input" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="form-item-label" prop="checkPass">
          <el-row :gutter="3">
            <el-col :span="3">
              <i class="el-icon-lock icon"></i>
            </el-col>

            <el-col :span="18">
              <el-input placeholder="请再次输入密码" class="form-item-input" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="registered-btn-group">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button class="registered-btn-group-reset" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import registeredService from "@/service/registeredService";
import routerApi from "@/service/api/routerApi";
import util from "@/service/util";

export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("账号不能为空"));
      }
      else if(value.length >= 20){
        return callback(new Error("账号长度不能超过20"));
      }
      else{
        let res = registeredService.checkUserName(value);

        res.then(response =>{
          if(response.flag){
            return callback();
          }
          else{
            return callback(new Error(response.message));
          }
        })
      }
    };

   var checkNickname = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("昵称不能为空"));
      }
      else if(value.length >= 15){
        return callback(new Error("昵称长度不能超过15"));
      }
      else{
        return callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        nickname:""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
        nickname: [{ validator: checkNickname, trigger: "blur" }]
      }
    };
  },
  methods: {
    isregistered(){
      this.login();
    },
    login(){
      this.$emit('changeView',"login");
    },
    submitForm(formName) {
      let that = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          let res = registeredService.registeredUser(this.ruleForm);

          res.then(response =>{
            if(response.flag){
              this.$message({
                showClose: true,
                message: '恭喜你，注册成功!',
                type: 'success'
              });

            util.sleep(500).then(() => {
              that.login();
              that.resetForm('ruleForm')
            });
              
            }
            else{
              this.$message({
                showClose: true,
                message: '注册失败!',
                type: 'error'
              });
            }

          })

        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style>

.form-group {
  margin-top: 15%;
}

.form-group form{
  width:350px;
  
}

.form-item-label label{
  width: 70px !important; 
  text-align: left;
}

.el-form-item__content{
  margin-left: 0px !important;
  height: 60px;
}

.el-form-item__error{
  padding-top: 0px;
  top :90%;
}

.registered-btn-group{
  margin-left: 40px !important;
}

.registered-btn-group-reset{
  margin-left: 80px !important;
}

.isregistered{
  flex: right;
}
</style>
