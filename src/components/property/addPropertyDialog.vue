/*
 * @Author: Hovees
 * @Date: 2019-10-08 14:50:53
 * @Last Modified by: Hovees-hwx
 * @Last Modified time: 2019-10-10 15:31:06
 */

<template>
  <div class="add-property-dialog">
    <el-dialog width="500px" :visible="show" center @close="clickClose" title="新增楼盘">
      <el-form :model="addPropertyModel"
        ref="addPropertyModel"
        status-icon
        :rules="rules"
        label-width="30%"
        label-position="top"
        v-loading="loading">
        <el-form-item label="楼盘名称:" prop="name" label-width="20%">
          <el-input v-model="addPropertyModel.name" />
        </el-form-item>
        <el-form-item label="楼盘地址:" prop="location" label-width="20%">
          <el-input v-model="addPropertyModel.location" />
        </el-form-item>
        <el-form-item label="楼盘编码:" prop="uid" label-width="20%">
          <el-input v-model="addPropertyModel.uid" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickSave">添加</el-button>
          <el-button @click="clickClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import propertyService from '../../service/property/propertyService'
  export default {
    name: 'addPropertyDialog',
    data() {
      let checkName = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('楼盘名字不能为空'))
        } else {          
          let res = propertyService.checkPropertyName(value)
          res.then(response => {
            if (response.flag) {
              callback()
            } else {
              callback(new Error(response.message))
            }
          })
        }
      }
      let checkLocation = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('楼盘地址不能为空'))
        } else {
          callback()
        }
      }
      return {
        addPropertyModel: {
          name: '',
          location: '',
          uid:''
        },
        rules: {
          name: [{ required: true, validator: checkName, trigger: "blur" }],
          location: [{ required: true, validator: checkLocation, trigger: "blur" }]
        }
      }
    },
    computed: {
      show() {
        this.addPropertyModel = {
          name: '',
          location: '',
          uid:''
        }
        if (this.$refs['addPropertyModel']) {
          this.$refs['addPropertyModel'].clearValidate()
        }        
        return this.$store.state.property.addPropertyDialog
      },
      loading() {
        return this.$store.state.property.loading
      }
    },
    methods: {
      clickAdd() {        
        this.$store.commit('property/ADD_PROPERTY_DIALOG', true)
      },
      clickClose() {
        this.$store.commit('property/ADD_PROPERTY_DIALOG', false)
      },
      clickSave() {
        this.$refs['addPropertyModel'].validate(valid => {
          if (valid) {
            this.addPropertyModel.name = this.addPropertyModel.name.trim()
            this.$store.commit('property/LOADING', true)
            propertyService.insert(this.addPropertyModel)
            .then(response => {
              this.$store.commit('property/LOADING', false)
              if (response.flag) {
                this.$message.success(response.message)
              } else {
                this.$message.error(response.message)
              }
              propertyService.getProperty()
              this.$store.commit('property/ADD_PROPERTY_DIALOG', false)
            })
            .catch(error => {
              console.log(error)
              this.$store.commit('property/LOADING', false)
              this.$message.error('插入失败')
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>