/*
 * @Author: Harry 
 * @Date: 2019-10-25 18:05:28 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 18:29:26
 */

export default {
    namespaced:true,
    state: {
        showAliPayDialog:false,
        aliPayImageUrl:"",
    },
    getters:{
        getShowAliPayDialog(state){
            return state.showAliPayDialog;
        },
        getAliPayImageUrl(state){
            return state.aliPayImageUrl;
        }
    },
    mutations: {
        changeShowAliPayDialog(state){
            state.showAliPayDialog = !state.showAliPayDialog;
        },
        setAliPayImageUrl(state,val){
            state.aliPayImageUrl = val;
        }
    },
    actions: {
  
    }
 }