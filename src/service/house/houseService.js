import _this from '@/main'
import api from '../../service/api/serviceApi'
import property from '../../store/modules/propertyModule'
import building from '../../store/modules/buildingModule'
import house from '../../store/modules/houseModule'

const that = _this._this

export default {
  async getHouse() {
    let res
    let pageNum = house.state.pageNum
    let pageSize = house.state.pageSize
    let buildingId = building.state.buildingId
    let rowCount = house.state.rowCount
    if ((pageNum - 1) * pageSize >= rowCount && rowCount !== 0) {
      that.$store.commit('house/SET_PAGE_NUM', pageNum - 1)
      pageNum = house.state.pageNum
    }
    await that.$get(api.house.url.findAllByBuildingId, {
      pageNum: pageNum,
      pageSize: pageSize,
      buildingId: buildingId
    })
    .then(response => {
      res = response
      if(res.message === '查询成功') {
        that.$store.commit('house/GET_HOUSE', res.data)
      }
    })
    return res
  },
  async getById(id) {
    let res
    await that.$get(api.house.url.getById, {
        id: id
      })
      .then(response => {
        res = response
        if (res.message === '查询成功') {
          that.$store.commit('house/HOUSE_DETAIL', res.data)
        }
      })
    return res
  },
  async checkBuildingHouseNumber(number) {
    let res
    let buildingId = building.state.buildingId
    await that.$get(api.house.url.checkBuildingHouseNumber, {
      buildingId: buildingId,
      number: number
    })
    .then(response => {
      res = response
    })
    return res
  },
  async insert(house) {
    let res
    let buildingId = building.state.buildingId
    house.buildingId = buildingId
    await that.$post(api.house.url.insert, house)
    .then(response => {
      res = response
    })
    return res
  },
  async update(recordHouse) {
    let res
    await that.$patch(api.house.url.update, recordHouse)
      .then(response => {
        res = response
      })
    return res
  },
  async getAllHouses() {
    let res
    await that.$get(api.house.url.getAllHouses)
      .then(response => {
        res = response
      })
    return res
  },
  async getUserAllHouses(pageNum, pageSize, userId) {
    let res
    await that.$get(api.house.url.getUserAllHouses, {
        pageNum: pageNum,
        pageSize: pageSize,
        userId: userId
      })
      .then(response => {
        res = response
      })
    return res
  },
  async updateOwner(houseId, userId) {
    let res
    await that.$patch(api.house.url.updateOwner, {
        id: houseId,
        userId: userId
      })
      .then(response => {
        res = response
      })
    return res
  }
}