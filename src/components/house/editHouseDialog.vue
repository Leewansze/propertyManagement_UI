/*
 * @Author: hovees 
 * @Date: 2020-03-10 18:01:47 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-12 15:02:10
 */
 
<template>
  <div class="edit-house-dialog">
    <el-dialog width="500px" :visible="show" center @close="clickClose" title="修改房屋">
      <el-form :model="recordHouse"
               ref="recordHouse"
               status-icon
               :rules="rules"
               label-width="30%"
               label-position="right"
               v-loading="loading">
        <el-form-item label="门牌号:" prop="number" label-width="20%">
            {{recordHouse.number}}
        </el-form-item>
        <el-form-item label="房屋面积:" prop="area" label-width="20%">
          <el-input v-model="recordHouse.area" />
        </el-form-item>
        <el-form-item label="房屋楼层:" prop="floor" label-width="20%">
          <el-input v-model.number="recordHouse.floor" />
        </el-form-item>
        <el-form-item label="房屋朝向:" prop="direction" label-width="20%">
          <el-select v-model="recordHouse.direction" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickSave">更 新</el-button>
          <el-button @click="clickClose">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import houseService from "../../service/house/houseService";
  import { mapState } from 'vuex';
  export default {
    name: "editHouseDialog",
    computed: mapState({
        show: state => state.house.editHouseDialog,
        loading: state => state.house.loading,
        recordHouse: state => state.house.recordHouse
    }),
    data() {
      let checkArea = (rule, value, callback) => {
        let numRe = new RegExp(/^\d{1,14}(\.\d{1,2})?$/)
        let flag = numRe.test(value)
        if (value === '' || value === undefined) {
          callback(new Error('房屋面积不能为空'))
        } else if (!flag) {
          callback(new Error('请输入正确的数字值'))
        } else {
          callback()
        }
      }
      let checkFloor  = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('房屋楼层不能为空'))
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
      return {
        options: [{
          value: '东北', label: '东北'
        }, {
          value: '朝东', label: '朝东'
        }, {
          value: '东南', label: '东南'
        }, {
          value: '朝南', label: '朝南'
        }, {
          value: '西南', label: '西南'
        }, {
          value: '朝西', label: '朝西'
        }, {
          value: '西北', label: '西北'
        }, {
          value: '朝北', label: '朝北'
        }],
        rules: {
          area: [{ required: true, validator: checkArea, trigger: "blur" }],
          floor: [{required: true, validator: checkFloor, trigger: "blur" }]
        }
      }
    },
    methods: {
      clickClose() {
        this.$store.commit('house/EDIT_HOUSE_DIALOG', false)
      },
      clickSave() {
        this.$refs['recordHouse'].validate(valid => {
          if (valid) {
            this.$store.commit('house/LOADING', true)
            houseService.update(this.recordHouse)
            .then(response => {
              setTimeout(() => {
                this.$store.commit('house/LOADING', false)
              if (response.flag) {
                this.$message.success(response.message)
              } else {
                this.$message.error(response.message)
              }
              houseService.getHouse()
              this.$store.commit('house/EDIT_HOUSE_DIALOG', false)
              }, 600);
            })
            .catch(error => {
              console.log(error)
              this.$store.commit('house/LOADING', false)
              this.$message.error('更新失败')
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>