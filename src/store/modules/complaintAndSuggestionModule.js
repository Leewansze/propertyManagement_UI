/*
 * @Author: Harry 
 * @Date: 2019-10-15 16:50:16 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-15 17:04:25
 */

export default {
    namespaced:true,
    state: {
        isOwnerSheetDetails:false,
        ownerSheetData:{}
    },
    getters:{
        getIsOwnerSheetDetails(state){
            return state.isOwnerSheetDetails;
        },
        getOwnerSheetData(state){
            return state.ownerSheetData;
        }
    },
    mutations: {
        changeIsOwnerSheetDetails(state){
            state.isOwnerSheetDetails = !state.isOwnerSheetDetails;
        },
        setOwnerSheetData(state,val){
            state.ownerSheetData = val;
        }
    },
    actions: {
  
    }
 }