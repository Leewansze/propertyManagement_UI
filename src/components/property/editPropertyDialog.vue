/*
 * @Author: Hovees 
 * @Date: 2019-10-10 14:47:17 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-12 15:01:44
 */
 
<template>
  <div class="edit-property-dialog">
    <el-dialog width="500px" :visible="show" center @close="clickClose" title="修改楼盘信息">
      <el-form :model="recordProperty"
        ref="recordProperty"
        label-width="30%"
        :rules="rules"
        v-loading="loading">
        <el-form-item label="楼盘名称:" prop="name" label-width="20%">
          <el-input v-model="recordProperty.name" />
        </el-form-item>
        <el-form-item label="楼盘地址:" prop="location" label-width="20%">
          <el-input v-model="recordProperty.location" />
        </el-form-item>
        <el-form-item label="楼盘编码:" prop="uid" label-width="20%">
          <el-input v-model="recordProperty.uid" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickSave">保存</el-button>
        <el-button @click="clickClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import propertyService from '../../service/property/propertyService'
import {mapState} from "vuex";
export default {
  name: 'editPropertyDialog',
  computed: mapState({
    show: state => state.property.editPropertyDialog,
    loading: state => state.property.loading,
    recordProperty: state => state.property.recordProperty
  }),
  data() {
    let checkName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('楼盘名字不能为空'))
      } else if (this.recordName !== value) {
        let res = propertyService.checkPropertyName(value)
        res.then(response => {
          if (response.flag) {
            callback()
          } else {
            callback(new Error(response.message))
          }
        })
      } else {
        callback()
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
      recordName: '',
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        location: [{ required: true, validator: checkLocation, trigger: "blur" }]
      }
    }
  },
  methods: {
    clickClose() {
      this.$store.commit('property/EDIT_PROPERTY_DIALOG', false)
    },
    clickSave() {
      this.$refs['recordProperty'].validate(valid => {
        if (valid) {
          this.recordProperty.name = this.recordProperty.name.trim()
          this.$store.commit('property/LOADING', true)
          propertyService.update(this.recordProperty)
          .then(response => {
            setTimeout(() => {
              this.$store.commit('property/LOADING', false)
              if (response.flag) {
                this.$message.success(response.message)
              } else {
                this.$message.error(response.message)
              }
              propertyService.getProperty()
              this.$store.commit('property/EDIT_PROPERTY_DIALOG', false)
            }, 600);
          })
          .catch(error => {
            console.log(error)
            this.$store.commit('property/LOADING', false)
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
          this.recordName = this.recordProperty.name
        }
      },
    }
  }
}
</script>

<style>

</style>