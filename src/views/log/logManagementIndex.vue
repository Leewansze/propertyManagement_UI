/*
 * @Author: Harry 
 * @Date: 2019-10-09 19:33:10 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-16 01:42:50
 */


<template>
  <div class="logManagementIndex">
      <!-- logManagementIndex -->
    <router-view/>
  </div>
</template>

<script>
export default {
    name :"logManagementIndex"
}
</script>


<style scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  line-height: 0px;
  margin-top: 30px;
}

.el-slider__runway{
  margin: 6px !important;
}
</style>
