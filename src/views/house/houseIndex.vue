/*
 * @Author: Hovees 
 * @Date: 2019-10-25 09:28:40 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-10 18:22:50
 */

<template>
  <div class="house-index">
    <!-- 房屋数据控制模块 -->
    <house-control-model/>

    <!-- 添加房屋模态框 -->
    <add-house-dialog/>

    <!-- 修改房屋模态框 -->
    <edit-house-dialog/>

  </div>  
</template>

<script>
  import houseControlModel from "../../components/house/houseControlModel";
  import addHouseDialog from "../../components/house/addHouseDialog";
  import editHouseDialog from "../../components/house/editHouseDialog";
  export default {
    name: "houseIndex",
    components: {
      houseControlModel,
      addHouseDialog,
      editHouseDialog
    }
  }
</script>

<style scoped>

</style>