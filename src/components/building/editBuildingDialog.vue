/*
 * @Author: Hovees 
 * @Date: 2019-10-18 15:20:14 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-12 15:02:07
 */

<template>
  <div class="edit-building-dialog">
    <el-dialog width="500px" :visible="show" center @close="clickClose" title="修改楼栋信息">
      <el-form :model="recordBuilding"
        ref="recordBuilding"
        status-icon
        :rules="rules"
        label-width="30%"
        label-position="top"
        v-loading="loading">
        <el-form-item label="楼栋名称:" prop="name" label-width="20%">
          <el-input v-model="recordBuilding.name" />
        </el-form-item>
        <el-form-item label="楼栋地址:" prop="address" label-width="20%">
          <el-input v-model="recordBuilding.address" />
        </el-form-item>
        <el-form-item label="楼栋层数:" prop="layer" label-width="20%">
          <el-input v-model.number="recordBuilding.layer" />
        </el-form-item>
        <el-form-item label="楼栋户数:" prop="houseHold" label-width="20%">
          <el-input v-model.number="recordBuilding.houseHold" />
        </el-form-item>
        <el-form-item label="备注:" prop="remark" label-width="20%">
          <el-input type="textarea" :rows="3" v-model="recordBuilding.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickSave">保 存</el-button>
          <el-button @click="clickClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import buildingService from '../../service/building/buildingService'
  import {mapState} from "vuex"
  export default {
    name: 'editBuildingDialog',
    computed: mapState({
      show: state => state.building.editBuildingDialog,
      loading: state => state.building.loading,
      recordBuilding: state => state.building.recordBuilding
    }),
    data() {
      let checkName = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('楼栋名字不能为空'))
        } else if (this.recordName !== value) {
          setTimeout(() => {
            let res = buildingService.checkPropertyBuildingName(value)
            res.then(response => {
              if (response.flag) {
                callback()
              } else {
                callback(new Error(response.message))
              }
            })
          }, 500);
        } else {
          callback()
        }
      }
      let checkAddress = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('楼栋地址不能为空'))
        } else {
          callback()
        }
      }
      let checkLayer = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
      return {
        recordName: '',
        rules: {
          name: [{ required: true, validator: checkName, trigger: "blur" }],
          address: [{ required: true, validator: checkAddress, trigger: "blur" }],
          layer: [{required: true, validator: checkLayer, trigger: "blur" }]
        }
      }
    },
    methods: {
      clickClose() {
        this.$store.commit('building/EDIT_BUILDING_DIALOG', false)
      },
      clickSave() {
        this.$refs['recordBuilding'].validate(valid => {
          if (valid) {
            this.recordBuilding.name = this.recordBuilding.name.trim()
            this.recordBuilding.address = this.recordBuilding.address.trim()
            this.$store.commit('building/LOADING', true)
            buildingService.update(this.recordBuilding)
            .then(response => {
              setTimeout(() => {
                this.$store.commit('building/LOADING', false)
                if (response.flag) {
                  this.$message.success(response.message)
                } else {
                  this.$message.error(response.message)
                }
                buildingService.getBuilding()
                this.$store.commit('building/EDIT_BUILDING_DIALOG', false)
              }, 600);
            })
            .catch(error => {
              console.log(error)
              this.$store.commit('building/LOADING', false)
              this.$message.error('更新失败')
            })
          }
        })
      }
    },
    watch: {
      show: {
        handler(val) {
          if (val === true){
            this.recordName = this.recordBuilding.name
          }
        },
      }
    }
  }
</script>

<style>

</style>