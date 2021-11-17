/*
 * @Author: Hovees
 * @Date: 2019-10-08 14:50:53
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-14 19:27:59
 */

const state = {
  properties: [],
  propertyName: '',
  propertyId: '',
  rowCount: 0,
  pageNum: 1,
  pageSize: 10,
  loading: false,
  addPropertyDialog: false,
  deletePropertyDialog: false,
  editPropertyDialog: false,
  searchForm: {
    name: '',
    location: '',
    uid: '',
  },
  recordProperty: '',
  changeSelect: {
    properties: []
  }
}

const mutations = {
  ['GET_PROPERTY'](state, payload) {
    if (payload.content) {
      state.properties = payload.content.map((propertyModule) => {
        return Object.assign({}, propertyModule, {
          id: propertyModule.id
        })
      })
    }
    state.rowCount = payload.totalElements
  },
  ['SET_PROPERTY_NAME'](state, payload) {
    sessionStorage.setItem('propertyName', payload)
    state.propertyName = payload
  },
  ['SET_PROPERTY_ID'](state, payload) {
    sessionStorage.setItem('propertyId', payload)
    state.propertyId = payload
  },
  ['SET_PAGE_NUM'](state, payload) {
    state.pageNum = payload
  },
  ['SET_PAGE_SIZE'](state, payload) {
    state.pageSize = payload
  },
  ['SET_ROW_COUNT'](state, payload) {
    state.rowCount = payload
  },
  ['LOADING'](state, payload) {
    state.loading = payload
  },
  ['ADD_PROPERTY_DIALOG'](state, payload) {
    state.addPropertyDialog = payload
  },
  ['DELETE_PROPERTY_DIALOG'](state, payload) {
    state.deletePropertyDialog = payload
  },
  ['EDIT_PROPERTY_DIALOG'](state, payload) {
    state.editPropertyDialog = payload
  },
  ['RECORD_PROPERTY'](state, payload) {
    state.recordProperty = payload
  },
  ['SET_CHANGE_SELECT_PROPERTIES'](state, payload) {
    if (payload) {
      state.changeSelect.properties = payload.map((propertyModule) => {
        return Object.assign({}, propertyModule, {
          id: propertyModule.id
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