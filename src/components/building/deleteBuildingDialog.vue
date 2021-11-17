/*
 * @Author: Hovees 
 * @Date: 2019-10-18 15:20:14 
 * @Last Modified by: Hovees-hwx
 * @Last Modified time: 2019-10-18 16:33:31
 */

<template>
  <div class="delete-building-dialog">
    <el-dialog width="500px" :visible="show"
      center
      @close="clickClose"
      title="提示">
      <el-form v-loading="loading" label-width="20%" style="border">
        <el-form-item label-width="5%">
          <h3>确认删除该楼栋吗？</h3>
        </el-form-item>
        <el-form-item label="所属楼盘:">
          <b>{{propertyName}}</b>
        </el-form-item>
        <el-form-item label="楼栋名称:">
          <b>{{recordBuilding.name}}</b>
        </el-form-item>
        <el-form-item label="楼栋地址:">
          <b>{{recordBuilding.address}}</b>
        </el-form-item>
        <el-form-item label="楼栋层数:">
          <b>{{recordBuilding.layer}}</b>
        </el-form-item>
        <el-form-item label="楼栋户数:">
          <b>{{recordBuilding.houseHold}}</b>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickClose">取消</el-button>
        <el-button type="danger" @click="clickDel">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import buildingService from '../../service/building/buildingService'
  import {mapState} from "vuex"
  export default {
    name: 'deleteBuildingDialog',
    computed: mapState({
      show: state => state.building.deleteBuildingDialog,
      loading: state => state.building.loading,
      propertyName: state => state.property.propertyName,
      recordBuilding: state => state.building.recordBuilding,
      rowCount: state => state.building.rowCount
    }),
    methods: {
      clickClose() {
        this.$store.commit('building/DELETE_BUILDING_DIALOG', false)
      },
      clickDel() {
        buildingService.delete(this.recordBuilding)
        .then(response => {
          this.$store.commit('building/LOADING', false)
          if (response.flag) {
            this.$message.success(response.message)
          } else {
            this.$message.error(response.message)
          }
          this.$store.commit('building/SET_ROW_COUNT', this.rowCount - 1)
          buildingService.getBuilding()
          this.$store.commit('building/DELETE_BUILDING_DIALOG', false)
        })
        .catch(error => {
          console.log(error)
          this.$store.commit('building/LOADING', false)
          this.$message.error('删除失败,请先清空房屋')
        })
      }
    }
  }
</script>

<style>

</style>