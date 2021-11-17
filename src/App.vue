/*
 * @Author: Harry 
 * @Date: 2019-10-01 02:52:30 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-20 16:04:17
 */


<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "index",
  data() {
    return {
    };
  },
  computed: mapState({
    isTokenErrorToLogin:state => state.login.isTokenErrorToLogin
  }),
  watch:{
    isTokenErrorToLogin: function(){
      this.$message({
          message: "账号过期请重新登录",
          type: "error"
        });
    }
  }
};
</script>

<style>
/* 修改el-loading字体大小 */
.el-icon-loading,
.el-loading-spinner .el-loading-text {
  font-size: 20px !important
}

/* ::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
} */


/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.aa{
  width: 1500px;
  height: 500px;
  white-space: pre-line;
  text-align: left;
  background-color: black;
  color: aliceblue;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
} */
</style>
