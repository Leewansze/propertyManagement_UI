/*
 * @Author: Harry 
 * @Date: 2019-10-10 00:46:21 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-10 16:41:08
 */

<template>
  <div class="userEditDialog">
    <!-- userEditDialog -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="form.username"
            :placeholder="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" :placeholder="form.nickname" autocomplete="off"></el-input>
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
        <el-button class="okBtn" type="primary" @click="this.saveUserInfo">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import roleManagementService from "@/service/roleManagement/roleManagementService";

export default {
  name: "userEditDialog",
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
    setForm(userInfo) {
      this.form.username = userInfo.username;
      this.form.nickname = userInfo.nickname;
      this.form.role = userInfo.role;
      this.form.id = userInfo.id;
    },
    saveUserInfo() {
      let res = roleManagementService.updateUser(this.form);
      let _this = this;

      res.then(response => {
        _this.$message({
          message: "账号" + this.form.username + "修改成功",
          type: "success"
        });

        _this.$store.commit("roleManagement/changeIsRefresh");
      });

      this.changeVisible();
    }
  },
  computed: mapState({
    showUserEditDialog: state => state.roleManagement.showUserEditDialog,
    userInfo: state => state.roleManagement.userInfo
  }),
  watch: {
    showUserEditDialog: function() {
      this.changeVisible();
      this.setForm(this.userInfo);
    }
  }
};
</script>


<style scoped>
.userEditDialog {
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
