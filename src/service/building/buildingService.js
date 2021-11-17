/*
 * @Author: Hovees 
 * @Date: 2019-10-15 10:50:35 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-16 16:36:30
 */

import _this from '@/main'
import api from '@/service/api/serviceApi'
import building from '../../store/modules/buildingModule'
import property from '../../store/modules/propertyModule'

const that = _this._this

export default {
  async insert(building) {
    let res
    let propertyId = property.state.propertyId
    building.propertyId = propertyId
    await that.$post(api.building.url.insert, building)
    .then(response => {
      res = response
    })
    return res
  },
  async delete(building) {
    let res
    await that.$delBody(api.building.url.delete, building)
    .then(response => {
      res = response
    })
    return res
  },
  async update(building) {
    let res
    await that.$patch(api.building.url.update, building)
    .then(response => {
      res = response
    })
    return res
  },
  async getById(id) {
    let res
    await that.$get(api.building.url.getById, {
        id: id
      })
      .then(response => {
        res = response
        if (res.message === '查询成功') {
          that.$store.commit('building/SET_BUILDING_NAME', res.data.name)
          that.$store.commit('building/SET_BUILDING_ID', res.data.id)
        }
      })
  },
  async getFirstByPropertyId(propertyId) {
    let res
    await that.$get(api.building.url.getFirstByPropertyId, {
      propertyId: propertyId
    })
    .then(response => {
      res = response
      if(res.message === '查询成功') {
        that.$store.commit('building/SET_BUILDING_NAME', res.data.name)
        that.$store.commit('building/SET_BUILDING_ID', res.data.id)
      }
    })
  },
  async getBuilding() {
    let res
    let pageNum = building.state.pageNum
    let pageSize = building.state.pageSize
    let propertyId = property.state.propertyId
    let rowCount = building.state.rowCount    
    if ((pageNum - 1) * pageSize >= rowCount && rowCount !== 0) {
      that.$store.commit('building/SET_PAGE_NUM', pageNum - 1)
      pageNum = building.state.pageNum
    }
    await that.$get(api.building.url.findAllByPropertyId, {
      pageNum: pageNum,
      pageSize: pageSize,
      propertyId: propertyId
    })
    .then(response => {
      res = response
      if(res.message === '查询成功') {
        that.$store.commit('building/GET_BUILDING', res.data)
      }
    })
    return res
  },
  async getAllBuildings() {
    let res
    await that.$get(api.building.url.getAllBuildings, {})
    .then(response => {
      res = response
      if(res.message === '查询成功') {
        that.$store.commit('building/ALL_BUILDINGS', res.data)
      }
    })
    return res
  },
  async getAllBuildingByPropertyId(propertyId) {
    let res
    await that.$get(api.building.url.getAllBuildingByPropertyId, {
      propertyId: propertyId
    })
    .then(response => {
      res = response
      if(res.message === '查询成功') {
        that.$store.commit('building/SET_CHANGE_SELECT_BUILDINGS', res.data)
      }
    })
  },
  async checkPropertyBuildingName(buildingName) {
    let res
    let propertyId = property.state.propertyId
    await that.$get(api.building.url.checkPropertyBuildingName, {
      propertyId: propertyId,
      buildingName: buildingName
    })
    .then(response => {
      res = response
    })
    return res
  }
}