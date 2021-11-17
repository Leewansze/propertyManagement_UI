/*
 * @Author: Harry 
 * @Date: 2019-10-01 02:48:10 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-21 11:50:11
 */

<template>
  <div class="home-view" :style="{'height': (this.$store.getters['home/getScreenHeight']) + 'px'}">
    <el-container>
      <el-header>
        <headNav />
      </el-header>

      <el-container :style="{'height': (this.$store.getters['home/getScreenHeight']) + 'px'}">
        <!-- <el-aside :style="{'height': (this.clen) + 'px'}"> -->
        <asideMenu />
        <!-- </el-aside> -->

        <el-main>
          <vTags />
          <div class="content" :style="{'height': (this.$store.getters['home/getScreenHeight'] - 30) + 'px'}">
            <transition name="move" mode="out-in">
              <keep-alive :include="this.$store.getters['home/getTagsList']">
              <transition name="el-fade-in-linear">
                <router-view></router-view>
              </transition>
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from "@/components/home/menu";
import headNav from "@/components/home/head";
import vTags from "@/components/home/tags";
import util from "@/service/util";
import routerApi from "@/service/api/routerApi";
import userInformationService from "@/service/userInformation/userInformationService";

export default {
  name: "home",
  components: {
    asideMenu,
    headNav,
    vTags
  },
  data() {
    return{
      
    }
  },
  created () {
    let res
    let userId = this.$store.getters['user/getId']
    let roleName = this.$store.getters['user/getRolename']
    if(roleName === '业主') {
      userInformationService.selectUserById(userId)
      .then(response => {
        res = response
        let emailAddress = res.data.emailAddress
        if (emailAddress === null || emailAddress === undefined || emailAddress.length === 0) {
          this.$alert('亲爱的业主，由于您未绑定邮箱，请先前往绑定邮箱。', '提示', {
            confirmButtonText: '立即绑定',
            showClose: false,
            callback: action => {
              this.$router.push(routerApi.userInformation.getUrl());
            }
          });
        }
      })
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        this.$store.commit("home/setScreenHeight");
      })();
    };
  }
};
</script>


<style>
.el-header,
.el-footer {
  background-color: #444444;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  /* text-align: center; */
  /* height:1000px; */
  line-height: 200px;
  overflow-x: hidden !important;
}

.el-main {
  /* #e9eef3 */
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-tabs__new-tab {
  display: none;
}

.tag-view {
  background-color: white;
  line-height: 20px;
}

.content{
  padding:40px;
}

.el-slider__runway{
  margin: 3px;
}
</style>
