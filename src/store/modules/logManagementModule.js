/*
 * @Author: Harry 
 * @Date: 2019-10-18 12:48:31 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-18 15:10:11
 */

export default {
    namespaced:true,
    state: {
        checkBoxShowList:{},
        isShowDogFileDownLoadDialog:false,
        downLoadFileList:[]
    },
    getters:{
      getCheckBoxShowList(state){
        return state.checkBoxShowList;
      },
      getIsShowDogFileDownLoadDialog(state){
        return state.isShowDogFileDownLoadDialog;
      },
      getDownLoadFileList(state){
        return state.downLoadFileList;
      }
    },
    mutations: {
        setCheckBoxShowList(state,map){
          state.checkBoxShowList[map.key] = map.val;
        },
        clearCheckBoxShowList(state){
            state.checkBoxShowList = {}
        },
        changeIsShowDogFileDownLoadDialog(state){
          state.isShowDogFileDownLoadDialog = !state.isShowDogFileDownLoadDialog
        },
        setDownLoadFileList(state,val){
          state.downLoadFileList = val;
        }
    },
    actions: {
  
    }
 }