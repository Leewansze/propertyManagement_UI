/*
 * @Author: Hovees 
 * @Date: 2019-10-25 14:30:09 
 * @Last Modified by:   Hovees-hwx 
 * @Last Modified time: 2019-10-25 14:30:09 
 */
 
<template>
  <div class="add-house-dialog">
    <el-dialog width="500px" :visible="show" center @close="clickClose" title="新增房屋">
      <el-form :model="addHouseModel"
               ref="addHouseModel"
               status-icon
               :rules="rules"
               label-width="30%"
               label-position="top"
               v-loading="loading">
        <el-form-item label="门牌号:" prop="number" label-width="20%">
          <el-input v-model.number="addHouseModel.number" />
        </el-form-item>
        <el-form-item label="房屋面积:" prop="area" label-width="20%">
          <el-input v-model="addHouseModel.area" />
        </el-form-item>
        <el-form-item label="房屋楼层:" prop="floor" label-width="20%">
          <el-input v-model.number="addHouseModel.floor" />
        </el-form-item>
        <el-form-item label="房屋朝向:" prop="direction" label-width="20%">
          <el-select v-model="addHouseModel.direction" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
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
  import houseService from "../../service/house/houseService";
  export default {
    name: "addHouseDialog",
    data() {
      let checkNumber = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('门牌号不能为空'))
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          setTimeout(() => {
            let res = houseService.checkBuildingHouseNumber(value)
            res.then(response => {
              if (response.flag) {
                callback()
              } else {
                callback(new Error(response.message))
              }
            })
          }, 500)
        }
      }
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
        addHouseModel: {
          number: '',
          area: '',
          direction: '',
          floor: '',
          ownerName: ''
        },
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
          number: [{ required: true, validator: checkNumber, trigger: "blur" }],
          area: [{ required: true, validator: checkArea, trigger: "blur" }],
          floor: [{required: true, validator: checkFloor, trigger: "blur" }]
        }
      }
    },
    computed: {
      show() {
        this.addHouseModel = {
          number: '',
          area: '',
          direction: '',
          floor: '',
          ownerName: '',
        }
        if (this.$refs['addHouseModel']) {
          this.$refs['addHouseModel'].clearValidate()
        }
        return this.$store.state.house.addHouseDialog
      },
      loading() {
        return this.$store.state.house.loading
      }
    },
    methods: {
      clickClose() {
        this.$store.commit('house/ADD_HOUSE_DIALOG', false)
      },
      clickSave() {
        this.$refs['addHouseModel'].validate(valid => {
          if (valid) {
            this.$store.commit('house/LOADING', true)
            houseService.insert(this.addHouseModel)
            .then(response => {
              this.$store.commit('house/LOADING', false)
              if (response.flag) {
                this.$message.success(response.message)
              } else {
                this.$message.error(response.message)
              }
              houseService.getHouse()
              this.$store.commit('house/ADD_HOUSE_DIALOG', false)
            })
            .catch(error => {
              console.log(error)
              this.$store.commit('house/LOADING', false)
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