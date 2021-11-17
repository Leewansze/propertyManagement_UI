/*
 * @Author: Hovees 
 * @Date: 2019-10-18 10:20:23 
 * @Last Modified by: Hovees-hwx
 * @Last Modified time: 2019-10-18 14:45:42
 */

<template>
  <div class="add-building-dialog">
    <el-dialog width="500px" :visible="show" center @close="clickClose" title="新增楼栋">
      <el-form :model="addBuildingModel"
        ref="addBuildingModel"
        status-icon
        :rules="rules"
        label-width="30%"
        label-position="top"
        v-loading="loading">
        <el-form-item label="楼栋名称:" prop="name" label-width="20%">
          <el-input v-model="addBuildingModel.name" />
        </el-form-item>
        <el-form-item label="楼栋地址:" prop="address" label-width="20%">
          <el-input v-model="addBuildingModel.address" />
        </el-form-item>
        <el-form-item label="楼栋层数:" prop="layer" label-width="20%">
          <el-input v-model.number="addBuildingModel.layer" />
        </el-form-item>
        <el-form-item label="楼栋户数:" prop="houseHold" label-width="20%">
          <el-input v-model.number="addBuildingModel.houseHold" />
        </el-form-item>
        <el-form-item label="备注:" prop="remark" label-width="20%">
          <el-input type="textarea" :rows="3" v-model="addBuildingModel.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickSave">添 加</el-button>
          <el-button @click="clickClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import buildingService from '../../service/building/buildingService'
  export default {
    name: 'addBuildingDialog',
    data() {
      let checkName = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('楼栋名字不能为空'))
        } else {
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
        addBuildingModel: {
          name: '',
          address: '',
          layer: '',
          houseHold: '',
          remark: ''
        },
        rules: {
          name: [{ required: true, validator: checkName, trigger: "blur" }],
          address: [{ required: true, validator: checkAddress, trigger: "blur" }],
          layer: [{required: true, validator: checkLayer, trigger: "blur" }]
        }
      }
    },
    computed: {
      show() {
        this.addBuildingModel = {
          name: '',
          address: '',
          layer: '',
          houseHold: '',
          remark: '',
        }
        if (this.$refs['addBuildingModel']) {
          this.$refs['addBuildingModel'].clearValidate()
        }        
        return this.$store.state.building.addBuildingDialog
      },
      loading() {
        return this.$store.state.building.loading
      }
    },
    methods: {
      clickClose() {
        this.$store.commit('building/ADD_BUILDING_DIALOG', false)
      },
      clickSave() {
        this.$refs['addBuildingModel'].validate(valid => {
          if (valid) {
            this.addBuildingModel.name = this.addBuildingModel.name.trim()
            this.addBuildingModel.address = this.addBuildingModel.address.trim()
            this.$store.commit('building/LOADING', true)
            buildingService.insert(this.addBuildingModel)
            .then(response => {
              this.$store.commit('building/LOADING', false)
              if (response.flag) {
                this.$message.success(response.message)
              } else {
                this.$message.error(response.message)
              }
              buildingService.getBuilding()
              this.$store.commit('building/ADD_BUILDING_DIALOG', false)
            })
            .catch(error => {
              console.log(error)
              this.$store.commit('building/LOADING', false)
              this.$message.error('插入失败')
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>