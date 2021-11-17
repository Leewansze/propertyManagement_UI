/*
 * @Author: Harry 
 * @Date: 2019-10-25 12:50:18 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 17:53:05
 */

<template>
  <div class="feesManagementIndex">
    <!-- feesManagementIndex -->
    <router-view/>
  </div>
</template>

<script>
export default {
    name :"feesManagementIndex"
}
</script>


<style>
.payFees .container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  line-height: 0px;
  margin-top: 30px;
  /* max-height: 1100px; */
  /* height: 100%; */
}

.payFees .el-table__body-wrapper{
  max-height:100% !important;
}

.payFees .el-table{
  max-height:100% !important;
}
</style>
