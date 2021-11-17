/*
 * @Author: Hovees 
 * @Date: 2019-10-15 10:16:15 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-14 19:23:04
 */

const state = {
  houseId: 1,
  houses: [],
  rowCount: 0,
  pageNum: 1,
  pageSize: 10,
  loading: false,
  addHouseDialog: false,
  deleteHouseDialog: false,
  editHouseDialog: false,
  recordHouse: '',
  houseDetail: ''
}

const mutations = {
  ['HOUSE_ID'](state, payload) {
    sessionStorage.setItem('houseId', payload)
    state.houseId = payload
  },
  ['GET_HOUSE'](state, payload) {
    if (payload.content) {
      state.houses = payload.content.map((houseModule) => {
        return Object.assign({}, houseModule, {
          id: houseModule.id
        })
      })
    }
    state.rowCount = payload.totalElements
  },
  ['INIT_HOUSE'](state) {
    state.houses = []
    state.rowCount = 0
  },
  ['SET_PAGE_NUM'](state, payload) {
    state.pageNum = payload
  },
  ['SET_PAGE_SIZE'](state, payload) {
    state.pageSize = payload
  },
  ['LOADING'](state, payload) {
    state.loading = payload
  },
  ['ADD_HOUSE_DIALOG'](state, payload) {
    state.addHouseDialog = payload
  },
  ['DELETE_HOUSE_DIALOG'](state, payload) {
    state.deleteHouseDialog = payload
  },
  ['EDIT_HOUSE_DIALOG'](state, payload) {
    state.editHouseDialog = payload
  },
  ['RECORD_HOUSE'](state, payload) {
    state.recordHouse = payload
  },
  ['HOUSE_DETAIL'](state, payload) {
    state.houseDetail = payload
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}