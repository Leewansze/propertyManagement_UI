/*
 * @Author: Harry 
 * @Date: 2019-10-10 16:35:37 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-10 17:20:35
 */

<template>
  <div class="userAddDialog">
    <el-dialog title="新增用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select class="select" v-model="form.role" placeholder="请选择用户角色">
            <el-option label="业主" value="0"></el-option>
            <el-option label="物业管理员" value="1"></el-option>
            <el-option label="系统管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="this.changeVisible">取 消</el-button>
        <el-button class="okBtn" type="primary" @click="this.saveUserInfo">新 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import roleManagementService from "@/service/roleManagement/roleManagementService";
import registeredService from "@/service/registeredService";

export default {
  name: "userAddDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        nickname: "",
        role: "",
        password: "",
        id: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    changeVisible() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    saveUserInfo() {
    //   console.log(this.form);

      if (!this.judgeInfo()) {
        this.$message({
          message: "用户信息请填写齐全",
          type: "error"
        });
        return;
      }

      let res;
      let flag;
      res = registeredService.checkUserName(this.form.username);
      res.then(response => {
        // console.log(response);
        flag = response.flag;
        if (response.flag) {
        //   console.log("@@@@@");
          let res1;
          res1 = registeredService.registeredUser(this.form, this.form.role);

          res1.then(response => {
            if (response.flag) {
              this.$message({
                showClose: true,
                message: "恭喜你，用户"+ this.form.username + "添加成功!",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "用户添加失败!",
                type: "error"
              });
            }
          });
          
        } else {
          this.$message({
            message: response.message,
            type: "error"
          });
        //   return;
        }
      });

      if (!flag) {
        return;
      }

      this.changeVisible();
    },
    judgeInfo() {
      if (
        this.form.username == "" ||
        this.nickname == "" ||
        this.role == "" ||
        this.password == ""
      ) {
        return false;
      }

      return true;
    }
  },
  computed: mapState({
    showAddUserDialog: state => state.roleManagement.showAddUserDialog
  }),
  watch: {
    showAddUserDialog: function() {
      this.changeVisible();
    }
  }
};
</script>


<style scoped>
.userAddDialog {
  line-height: 0px;
}

.el-input {
  width: 70%;
}

.select {
  width: 70%;
}

.dialog-footer {
  text-align: center;
}

.okBtn {
  margin-left: 15%;
}
</style>
