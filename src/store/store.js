/*
 * @Author: Harry 
 * @Date: 2019-10-01 18:21:22 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 18:25:31
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

import home from './modules/homeModule'
import login from './modules/loginModule'
import user from './modules/userModule'
import roleManagement from './modules/roleManagementModule'
import property from './modules/propertyModule'
import building from './modules/buildingModule'
import house from './modules/houseModule'
import complaintAndSuggestion from './modules/complaintAndSuggestionModule'
import logManagement from './modules/logManagementModule'
import feesManagement from './modules/feesManagementModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules:{
    home,
    login,
    user,
    roleManagement,
    property,
    building,
    house,
    complaintAndSuggestion,
    logManagement,
    feesManagement
  }
})
