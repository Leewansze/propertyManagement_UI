/*
 * @Author: Hovees
 * @Date: 2019-10-02 21:06:22
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-22 16:30:50
 */

const state = {
  isLoginModelShow: false,
  isForgetPasswordModelShow: false,
  isRegisteredModelShow: false,
  isTokenErrorToLogin:false,
  isLoginFailTimes:false
}

const mutations = {
  ['IS_LOGIN_MODEL_SHOW'](state, payload) {
    state.isLoginModelShow = payload
  },
  ['IS_FORGET_PASSWORD_MODEL_SHOW'](state, payload) {
    state.isForgetPasswordModelShow = payload
  },
  ['IS_REGISTERED_MODEL_SHOW'](state, payload) {
    state.isRegisteredModelShow = payload
  },
  changeIsTokenErrorToLogin(state){
    state.isTokenErrorToLogin = !state.isTokenErrorToLogin;
  },
  setIsLoginFailTimes(state,val){
    state.isLoginFailTimes = val;
  }
}

const getters = {
  getIsTokenErrorToLogin(state){
    return state.isTokenErrorToLogin;
  },
  getIsLoginFailTimes(state){
    return state.isLoginFailTimes;
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}