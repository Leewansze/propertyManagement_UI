/*
 * @Author: Harry 
 * @Date: 2019-10-10 00:49:20 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-10 16:39:50
 */

 export default {
    namespaced:true,
    state: {
        showUserEditDialog:false,
        userInfo:{},
        isRefresh:false,
        showAddUserDialog:false,
    },
    getters:{
      getShowUserEditDialog(state){
        return state.showUserEditDialog;
      },
      getUserInfo(state){
          return state.userInfo;
      },
      getIsRefresh(state){
          return state.isRefresh;
      },
      getShowAddUserDialog(state){
        return state.showAddUserDialog; 
      }
    },
    mutations: {
        changeShowUserEditDialog(state){
          state.showUserEditDialog = !state.showUserEditDialog
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        },
        changeIsRefresh(state){
          state.isRefresh = !state.isRefresh;
        },
        changeShowAddUserDialog(state){
          state.showAddUserDialog = !state.showAddUserDialog
        }
    },
    actions: {
  
    }
 }