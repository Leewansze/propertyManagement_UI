/*
 * @Author: Hovees 
 * @Date: 2019-10-15 11:25:20 
 * @Last Modified by: Hovees-hwx
 * @Last Modified time: 2019-10-18 15:59:57
 */

<template>
  <div class="building-index">
    <!-- 楼栋数据控制模块 -->
    <building-control-model/>

    <!-- 添加楼栋模态框 -->
    <add-building-dialog/>

    <!-- 删除楼栋模态框 -->
    <delete-building-dialog/>

    <!-- 修改楼栋模态框 -->
    <edit-building-dialog/>
  
  </div>
</template>

<script>
  import buildingControlModel from '../../components/building/buildingControlModel'
  import addBuildingDialog from '../../components/building/addBuildingDialog'
  import deleteBuildingDialog from '../../components/building/deleteBuildingDialog'
  import editBuildingDialog from '../../components/building/editBuildingDialog'
  export default {
    name: 'buildingIndex',
    components: {
      buildingControlModel,
      addBuildingDialog,
      deleteBuildingDialog,
      editBuildingDialog,
    }
  }
</script>

<style scoped>
  
</style>