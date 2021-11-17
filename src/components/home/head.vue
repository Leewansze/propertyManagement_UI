/*
 * @Author: Harry 
 * @Date: 2019-10-01 16:26:22 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-19 16:24:36
 */

<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#444444"
          text-color="#fff"
          active-text-color="#ffd04b"
          type="flex"
        >
          <el-menu-item @click="changeMenu" class="item-left" index="0">
            <i v-if="this.$store.getters['home/getIsAsideMenuOpen']" class="el-icon-s-unfold"></i>
            <i v-else class="el-icon-s-fold"></i>
          </el-menu-item>

          <div class="user-tag-model">
            <el-dropdown class="item-right">
              <span class="el-dropdown-link user-tag">{{this.$store.getters['user/getNickname']}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="this.$store.getters['user/getRolename'] === '业主'">
                  <span @click="infomation">个人资料</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="logout">登出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- <el-menu-item class="item-right" index="2">1</el-menu-item>
          <el-menu-item class="item-right" index="3" disabled>2</el-menu-item>
          <el-menu-item class="item-right" index="4">
            <a href="https://www.ele.me" target="_blank">3</a>
          </el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import logoutService from "@/service/logoutService";
import routerApi from "@/service/api/routerApi";

export default {
  name: "head-nav",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    changeMenu() {
      this.$store.commit("home/changeIsAsideMenuOpen");
    },
    infomation() {
      this.$router.push(routerApi.userInformation.getUrl());
    },
    logout() {
      let res = logoutService.logout();

      res.then(response => {
        // console.log(response);
        if (response.flag) {
          this.$message({
            message: "登出成功！",
            type: "success"
          });

          this.$router.push(routerApi.getLogin());
        }
      });

    }
  }
};
</script>


<style>
.item-right {
  float: right !important;
}

.item-left {
  float: left !important;
}

.user-tag {
  color: white !important;
}
</style>
