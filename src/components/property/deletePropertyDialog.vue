/*
 * @Author: Hovees 
 * @Date: 2019-10-10 13:58:08 
 * @Last Modified by: Hovees-hwx
 * @Last Modified time: 2019-10-18 15:42:40
 */
 
<template>
  <div class="delete-property-dialog">
    <el-dialog width="500px" :visible="show"
      center
      @close="clickClose"
      title="提示">
      <el-form v-loading="loading" label-width="20%">
        <el-form-item label-width="5%">
          <h3>确认删除该楼盘吗？</h3>
        </el-form-item>
        <el-form-item label="楼盘名称:">
          <b>{{recordProperty.name}}</b>
        </el-form-item>
        <el-form-item label="楼盘地址:">
          <b>{{recordProperty.location}}</b>
        </el-form-item>
        <el-form-item label="楼盘编码:">
          <b>{{recordProperty.uid}}</b>
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
import propertyService from '../../service/property/propertyService'
import {mapState} from "vuex";
export default {
  name: 'deletePropertyDialog',
  computed: mapState({
    show: state => state.property.deletePropertyDialog,
    loading: state => state.property.loading,
    recordProperty: state => state.property.recordProperty,
    rowCount: state => state.property.rowCount
  }),
  methods: {
    clickClose() {
      this.$store.commit('property/DELETE_PROPERTY_DIALOG', false)
    },
    clickDel() {
      propertyService.delete(this.recordProperty)
      .then(response => {
        this.$store.commit('property/LOADING', false)
        if (response.flag) {
          this.$message.success(response.message)
        } else {
          this.$message.error(response.message)
        }
        this.$store.commit('property/SET_ROW_COUNT', this.rowCount - 1)
        propertyService.getProperty()
        this.$store.commit('property/DELETE_PROPERTY_DIALOG', false)
      })
      .catch(error => {
        console.log(error)
        this.$store.commit('property/LOADING', false)
        this.$message.error('删除失败,请先清空楼栋')
      })
    }
  }
}
</script>

<style>

</style>