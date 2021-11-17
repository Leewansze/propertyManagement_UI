/*
 * @Author: Harry 
 * @Date: 2019-10-02 14:47:29 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-04 12:46:26
 */

import util from '@/service/util'


export default {
  namespaced:true,
  state: {
      isAsideMenuOpen:false,
      screenHeight:util.getWinHeight() - 61,
      tagsList:[]
  },
  getters:{
    getIsAsideMenuOpen(state){
      return state.isAsideMenuOpen;
    },
    getScreenHeight(state){
      return state.screenHeight;
    },
    getTagsList(state){
      return state.tagsList;
    }
  },
  mutations: {
      changeIsAsideMenuOpen(state){
        state.isAsideMenuOpen = !state.isAsideMenuOpen
      },
      setScreenHeight(state){
        state.screenHeight = util.getWinHeight() - 61
      },
      setTagsList(state,val){
        state.tagsList = val
      }
  },
  actions: {

  }
}