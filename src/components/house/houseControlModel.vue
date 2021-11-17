/*
 * @Author: Hovees 
 * @Date: 2019-10-25 09:27:54 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-21 20:05:09
 */

<template>
  <div class="house-control-model" style="position:relative">
    <el-page-header @back="goBack" content="楼栋详情"/>
    <h2>{{this.propertyName}}——{{this.buildingName}}</h2>
    <el-button type="text" @click="clickChange" >
      切换楼栋
    </el-button>
    <el-button type="text" @click="refresh">
      刷新
    </el-button>
    <el-button type="primary" style="position:absolute;right:0" size="medium" @click="clickAdd">
      添加房屋
    </el-button>
    <el-dialog :visible="changeBuildingShow" width="400px"
               center @closed="clickClose" title="切换楼栋">
      <div style="text-align: center;">
        <el-form :inline="true">
          <el-form-item label="楼盘:">
            <el-select v-model="recordPropertyId" placeholder="请选择" @change="propertySelectChange" filterable>
              <el-option
                  v-for="item in this.properties"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼栋:">
            <el-select v-model="recordBuildingId" placeholder="请选择" @change="buildingSelectChange" filterable>
              <el-option
                  v-for="item in this.buildings"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickClose">取 消</el-button>
        <el-button type="primary" @click="changeBuilding">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="houses" border style="width: 100%" fit v-loading="tableLoading">
      <el-table-column label="序号" min-width="3%" align="center">
        <template slot-scope="scope">
          {{(pageNum - 1) * pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop = "name" label="门牌号" min-width="10%">
        <template slot-scope="scope">
          <el-link :underline=false @click="handleView(scope.row)">
            {{scope.row.number}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="房屋面积" min-width="15%"/>
      <el-table-column prop="direction" label="房屋朝向" min-width="8%"/>
      <el-table-column prop="floor" label="房屋楼层" min-width="8%"/>
      <el-table-column prop="ownerName" label="业主名字" min-width="8%"/>
      <el-table-column label="操作" min-width="8%">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-view" @click="handleView(scope.row)" />
          <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.row)" />
          <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.rowCount"
          :page-size="this.pageSize"
          :current-page="this.pageNum"
          @size-change="pageSizeChange"
          @current-change="pageChange"
      ></el-pagination>
    </div>
  </div> 
</template>

<script>
  import util from "@/service/util"
  import { Loading } from 'element-ui'
  import routerApi from '@/service/api/routerApi'
  import propertyService from '../../service/property/propertyService'
  import buildingService from '../../service/building/buildingService'
  import houseService from '../../service/house/houseService'
  import {mapState} from "vuex"
  export default {
    name: "houseControlModel",
    computed: mapState({
      properties: state => state.property.changeSelect.properties,
      buildings: state => state.building.changeSelect.buildings,
      allBuildings: state => state.building.allBuildings,
      propertyName: state => state.property.propertyName,
      propertyId: state => state.property.propertyId,
      buildingName: state => state.building.buildingName,
      buildingId: state => state.building.buildingId,
      houses: state => state.house.houses,
      rowCount: state => state.house.rowCount,
      pageNum: state => state.house.pageNum,
      pageSize: state => state.house.pageSize
    }),
    data() {
      return {
        tableLoading: false,
        changeBuildingShow: false,
        recordPropertyId: '',
        recordPropertyName: '',
        recordBuildingId: '',
        recordBuildingName: ''
      }
    },
    created: function() {
      let propertyId = sessionStorage.getItem('propertyId')
      if (this.propertyName === '' || this.propertyName === undefined) {
        this.getPropertyById(propertyId)
      }
      util.sleep(100).then(() => {
        if (this.properties.length === 0) {
          propertyService.getAllProperty()
          .catch(error => {
            console.log(error)
          })
        }
        if (this.allBuildings.length === 0) {
          buildingService.getAllBuildings()
          .catch(error => {
            console.log(error)
          })
        }
      })
    },
    mounted: function() {
      this.$store.commit('house/INIT_HOUSE')
      this.tableLoading = true
      util.sleep(500).then(() => {
        this.getHouse()
        this.recordPropertyId = this.propertyId
        this.recordPropertyName = this.propertyName
        this.recordBuildingId = this.buildingId
        this.recordBuildingName = this.buildingName
        this.setBuildings(this.recordPropertyId)
        this.tableLoading = false
      })
    },
    methods: {
      goBack() {
        this.$router.push('/property/building')
      },
      clickChange() {
        this.changeBuildingShow = true
      },
      getFirstProperty() {
        propertyService.getFirst()
        .then(() => {
          this.getFirstBuilding(this.propertyId)
        })
        .catch(error => {
          console.log(error)
        })
      },
      getPropertyById(propertyId) {
        propertyService.getById(propertyId)
        .then(() => {
          let buildingId = sessionStorage.getItem('buildingId')
          this.getBuildingById(buildingId)
        })
        .catch(error => {
          console.log(error)
        })
      },
      getBuildingById(buildingId) {
        buildingService.getById(buildingId)
        .catch(error => {
          console.log(error)
        })
      },
      getFirstBuilding(propertyId) {
        buildingService.getFirstByPropertyId(propertyId)
        .catch(error => {
          console.log(error)
        })
      },
      getHouse() {
        houseService.getHouse()
        .catch(error => {
          console.log(error)
          this.$message.error('获取房屋信息失败')
        })
      },
      refresh() {
        // this.openBigLoading();
        this.tableLoading = true
        setTimeout(() => {
          this.getHouse();
          // this.closeBigLoading();
          this.tableLoading = false
        }, 700);
      },
      clickAdd() {
        this.$store.commit('house/ADD_HOUSE_DIALOG', true)
      },
      clickClose() {
        this.changeBuildingShow = false
        this.recordPropertyId = this.propertyId
        this.recordPropertyName = this.propertyName
        this.recordBuildingId = this.buildingId
        this.recordBuildingName = this.buildingName
        this.setBuildings(this.recordPropertyId)
      },
      propertySelectChange(id) {
        let obj = this.properties.find(item => {
          return item.id === id
        })
        this.recordPropertyName = obj.name
        this.recordBuildingId = ''
        this.setBuildings(id)
      },
      buildingSelectChange(id) {
        let obj = this.buildings.find(item => {
          return item.id === id
        })
        this.recordBuildingName = obj.name
      },
      changeBuilding() {
        if (this.recordPropertyId !== '' && this.recordBuildingId !== '') {
          this.$store.commit('property/SET_PROPERTY_ID', this.recordPropertyId)
          this.$store.commit('property/SET_PROPERTY_NAME', this.recordPropertyName)
          this.$store.commit('building/SET_BUILDING_ID', this.recordBuildingId)
          this.$store.commit('building/SET_BUILDING_NAME', this.recordBuildingName)
          this.getHouse()
        }
        this.clickClose()
      },
      setBuildings(propertyId) {
        let buildings = []
        this.allBuildings.forEach(building => {
          if (propertyId === building.propertyId) {
            buildings.push(building)
          }
        })
        this.$store.commit('building/SET_CHANGE_SELECT_BUILDINGS',buildings)
      },
      pageChange(pageNum) {
        this.$store.commit('house/SET_PAGE_NUM', pageNum)
        this.getHouse()
      },
      pageSizeChange(pageSize) {
        this.$store.commit('house/SET_PAGE_SIZE', pageSize)
        this.getHouse()
      },
      handleView(house) {
        this.$store.commit('house/HOUSE_ID', house.id)
        let res = houseService.getById(house.id)
        .catch(error => {
          console.log(error)
        })
        this.$router.push(routerApi.property.building.house.detail.getHouseDetailCompleteUrl())
      },
      handleEdit(house) {
        //TODO
        this.$store.commit('house/RECORD_HOUSE', Object.assign({}, house))
        this.$store.commit('house/EDIT_HOUSE_DIALOG', true)
      },
      handleDelete(house) {
        //TODO
        this.$store.commit('house/RECORD_HOUSE', Object.assign({}, house))
        this.$store.commit('house/DELETE_HOUSE_DIALOG', true)
      },
      openBigLoading() {
        this.loadingInstance = Loading.service({
          lock: true,
          text: "拼命加载中....",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
      },
      closeBigLoading() {
        this.loadingInstance.close();
      },
    }
  }
</script>

<style scoped>

</style>