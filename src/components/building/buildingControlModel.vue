/*
 * @Author: Hovees 
 * @Date: 2019-10-15 15:02:06 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-21 20:05:07
 */

<template>
  <div class="building-control-model" style="position:relative">
    <el-page-header @back="goBack" content="详情页面"/>
    <h2>{{this.propertyName}}</h2>
    <el-button type="text" @click="changePropertyShow = true" >
      切换楼盘
    </el-button>
    <el-button type="primary" style="position:absolute;right:0" size="medium" @click="clickAdd">
      添加楼栋
    </el-button>
    <el-button type="text" @click="refresh">
      刷新
    </el-button>
    <el-dialog :visible="changePropertyShow" width="400px" 
      center @closed="clickClose" title="切换楼盘">
      <div style="text-align: center;">
        <el-select v-model="recordPropertyId" placeholder="请选择" @change="selectChange" filterable>
          <el-option
            v-for="item in this.properties"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickClose">取 消</el-button>
        <el-button type="primary" @click="changeProperty">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="buildings" border style="width: 100%" fit v-loading="tableLoading">
      <el-table-column label="序号" min-width="3%" align="center">
        <template slot-scope="scope">
          {{(pageNum - 1) * pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop = "name" label="楼栋名字" min-width="10%">
        <template slot-scope="scope">
          <el-link :underline=false @click="handleView(scope.row)">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="15%"/>
      <el-table-column prop="layer" label="楼栋层数" min-width="8%"/>
      <el-table-column prop="houseHold" label="楼栋户数" min-width="8%"/>
      <el-table-column prop="remark" label="备注" min-width="15%"/>
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
import propertyService from '../../service/property/propertyService'
import buildingService from '../../service/building/buildingService'
import routerApi from '@/service/api/routerApi'
import {mapState} from "vuex"
export default {
  name: 'buildingControlModel',
  computed: mapState({
    properties: state => state.property.changeSelect.properties,
    propertyId: state => state.property.propertyId,
    propertyName: state => state.property.propertyName,
    buildings: state => state.building.buildings,
    rowCount: state => state.building.rowCount,
    pageNum: state => state.building.pageNum,
    pageSize: state => state.building.pageSize
  }),
  data() {
    return {
      tableLoading: false,
      changePropertyShow: false,
      recordPropertyId: '',
      recordPropertyName: ''
    }
  },
  created: function() {
    let id = sessionStorage.getItem('propertyId')
    if (this.propertyName === '' || this.propertyName === undefined) {      
      this.getPropertyById(id)
    }
    util.sleep(100).then(() => {
      if (this.properties.length === 0) {
        propertyService.getAllProperty()
        .catch(error => {
          console.log(error)
        })
      }
      this.recordPropertyId = this.propertyId
    })
  },
  mounted: function() {
    this.$store.commit('building/INIT_BUILDING')
    this.recordPropertyId = this.propertyId
    this.recordPropertyName = this.propertyName
    this.tableLoading = true
    util.sleep(500).then(() => {
      this.getBuilding()
      this.tableLoading = false
    })
  },
  methods: {
    goBack() {
      this.$router.push('/property')
    },
    getPropertyById(id) {
      propertyService.getById(id)
      .catch(error => {
        console.log(error)
      })
    },
    getFirstProperty() {
      propertyService.getFirst()
      .catch(error => {
        console.log(error)
      })
    },
    getBuilding() {
      buildingService.getBuilding()
      .catch(error => {
        console.log(error)
        this.$message.error('获取楼栋失败')
      })
    },
    refresh() {
      // this.openBigLoading();
      this.tableLoading = true
      setTimeout(() => {
        this.getBuilding();
        // this.closeBigLoading();
        this.tableLoading = false
      }, 700);
    },
    clickAdd() {
      this.$store.commit('building/ADD_BUILDING_DIALOG', true)
    },
    clickClose() {
      this.changePropertyShow = false
      this.recordPropertyId = this.propertyId
      this.recordPropertyName = this.propertyName
    },
    changeProperty() {
      if (this.recordPropertyId !== '') {
        this.$store.commit('property/SET_PROPERTY_ID', this.recordPropertyId)
        this.$store.commit('property/SET_PROPERTY_NAME', this.recordPropertyName)
        this.getBuilding()
      }
      this.clickClose()
    },
    selectChange(id) {
      let obj = this.properties.find(item => {
        return item.id === id;
      });
      this.recordPropertyName = obj.name
    },
    pageChange(pageNum) {
      this.$store.commit('building/SET_PAGE_NUM', pageNum)
      this.getBuilding()
    },
    pageSizeChange(pageSize) {
      this.$store.commit('building/SET_PAGE_SIZE', pageSize)
      this.getBuilding()
    },
    handleView(building) {
      this.$store.commit('building/SET_BUILDING_ID', building.id)
      this.$store.commit('building/SET_BUILDING_NAME', building.name)
      this.$store.commit('house/SET_PAGE_NUM', 1)
      this.$store.commit('house/SET_PAGE_SIZE', 10)
      this.$router.push(routerApi.property.building.house.getHouseCompleteUrl())
    },
    handleEdit(building) {
      this.$store.commit('building/RECORD_BUILDING', Object.assign({}, building))
      this.$store.commit('building/EDIT_BUILDING_DIALOG', true)
    },
    handleDelete(building) {
      this.$store.commit('building/RECORD_BUILDING', Object.assign({}, building))
      this.$store.commit('building/DELETE_BUILDING_DIALOG', true)
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