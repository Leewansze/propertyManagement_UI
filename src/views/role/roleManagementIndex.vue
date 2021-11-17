/*
 * @Author: Harry 
 * @Date: 2019-10-09 19:33:10 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-19 18:29:38
 */


<template>
  <div class="roleManagementIndex">
    <router-view/>
  </div>
</template>

<script>
export default {
    name :"roleManagementIndex"
}
</script>


<style>
.roleManagement .container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  line-height: 0px;
  margin-top: 30px;
}

.roleManagement .el-table__body-wrapper{
  max-height:100% !important;
}
</style>
