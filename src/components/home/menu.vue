/*
 * @Author: Harry 
 * @Date: 2019-10-01 16:24:28 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 13:08:13
 */

<template>
  <div class="menu">
    <el-row class="tac" type="flex">
      <el-col class="tac2" :span="24">
        <el-menu
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :style="{'height': (this.$store.getters['home/getScreenHeight']) + 'px'}"
          :collapse="this.$store.getters['home/getIsAsideMenuOpen']"
        >
          <template v-for="(item,index) in this.list">
            <template v-if="item.isSub == true">

              <el-submenu :index="'' + index" :key="index">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item v-for="(subItem,i) in item.sub" :key="i" :index="subItem.url" @click="menuClick(subItem.url)">
                    {{subItem.name}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </template>

            <template v-else-if="item.isShow">
              <el-menu-item :index="item.url" :key="index" @click="menuClick(item.url)" v-if="item.isShow">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            </template>
          </template>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import util from "@/service/util";
import routerApi from "@/service/api/routerApi";
import menuList from "@/service/home/menuList";

export default {
  name: "aside-menu",
  data() {
    return {
      list: []
    };
  },
  methods: {
    menuClick(url) {
      this.$router.push(url);
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  created() {
    this.list = menuList.getList(this);
  }
};
</script>


<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}

.tac{
  margin-bottom: 0px;
}
</style>
