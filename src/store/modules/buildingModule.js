/*
 * @Author: Hovees 
 * @Date: 2019-10-15 10:21:57 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-14 19:32:57
 */

const state = {
  buildings: [],
  allBuildings: [],
  buildingName: '',
  buildingId: '',
  rowCount: 0,
  pageNum: 1,
  pageSize: 10,
  loading: false,
  addBuildingDialog: false,
  deleteBuildingDialog: false,
  editBuildingDialog: false,
  recordBuilding: '',
  changeSelect: {
    buildings: []
  }
}

const mutations = {
  ['GET_BUILDING'](state, payload) {
    if (payload.content) {
      state.buildings = payload.content.map((buildingModule) => {
        return Object.assign({}, buildingModule, {
          id: buildingModule.id
        })
      })
    }
    state.rowCount = payload.totalElements
  },
  ['INIT_BUILDING'](state) {
    state.buildings = []
    state.rowCount = 0
  },
  ['SET_BUILDING_NAME'](state, payload) {
    sessionStorage.setItem('buildingName', payload)
    state.buildingName = payload
  },
  ['SET_BUILDING_ID'](state, payload) {
    sessionStorage.setItem('buildingId', payload)
    state.buildingId = payload
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
  ['ADD_BUILDING_DIALOG'](state, payload) {
    state.addBuildingDialog = payload
  },
  ['DELETE_BUILDING_DIALOG'](state, payload) {
    state.deleteBuildingDialog = payload
  },
  ['EDIT_BUILDING_DIALOG'](state, payload) {
    state.editBuildingDialog = payload
  },
  ['RECORD_BUILDING'](state, payload) {
    state.recordBuilding = payload
  },
  ['SET_CHANGE_SELECT_BUILDINGS'](state, payload) {
    if (payload) {
      state.changeSelect.buildings = payload.map((buildingModule) => {
        return Object.assign({}, buildingModule, {
          id: buildingModule.id
        })
      })
    }
  },
  ['ALL_BUILDINGS'](state, payload) {
    if (payload) {
      state.allBuildings = payload.map((buildingModule) => {
        return Object.assign({}, buildingModule, {
          id: buildingModule.id
        })
      })
    }
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