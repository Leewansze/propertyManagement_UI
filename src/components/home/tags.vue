/*
 * @Author: Harry 
 * @Date: 2019-10-04 15:40:14 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-13 16:04:36
 */

<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <!-- <div class="tags-close-box">
            <el-dropdown class="tags-el-dropdown" @command="handleTags">
                <span></span>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
    </div> -->
  </div>
</template>

<script>
import routerApi from "@/service/api/routerApi";

export default {
  name: "tag-view",
  data() {
    return {
      tagsList: []
    };
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push(routerApi.getHome());
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      // console.log(isExist);
      !isExist &&
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[0].components.default.name
        });
      this.$store.commit("home/setTagsList", this.tagsList);
      // console.log(this.$store.getters["home/getTagsList"]);
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    // console.log(this.$route);
    this.setTags(this.$route);
  }
};
</script>


<style>
.tags {
  /* position: relative; */
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
}

.tags ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 5px;
  border-radius: 3px;
  font-size: 14px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li a {
  text-decoration: none !important;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: black;
  background-color: #409eff;
}

.tags-li-title {
  float: left;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 60px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;

  margin: 0;
  padding: 0;
}

.tags-el-dropdown{
    height: 30px;
}

</style>
