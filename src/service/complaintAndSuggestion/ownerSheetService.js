/*
 * @Author: Harry 
 * @Date: 2019-10-15 13:24:40 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-19 17:04:55
 */

import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

 export default {
    async query(pageNum,size){
        let res;

        let userId = that.$store.getters['user/getId'];
        // console.log(userId);
        // console.log(pageNum);
        // console.log(size);

        await that.$get(api.complaintAndSuggestion.url.queryOwner,{
            userId:userId,
            pageNum:pageNum,
            size:size
        })
        .then(response => {
            // console.log(response)
            res = changTime(response);

        })

        return res;
    },
    async del(data){
        let res;

        await that.$delBody(api.complaintAndSuggestion.url.delOWner,data)
        .then(response => {
            // console.log(response)
            res = response;

        })

        return res;
    }
 }

/**
 * 改变时间格式
 * @param {*} response 
 */
 function changTime(response){
     /**
      * 循环设置在前端显示的时间 并添加属性xxxShow 用来显示时间
      * 原时间用于后台交互
      */
    for(let i = 0;i < response.data.list.length;i++){
        response.data.list[i].submitTimeShow = subTime(response.data.list[i].submitTime);
        response.data.list[i].processingTimeShow = subTime(response.data.list[i].processingTime);
        for(let j = 0;j < response.data.list[i].timelineList.length;j++){
            response.data.list[i].timelineList[j].processingTimeShow = subTime(response.data.list[i].timelineList[j].processingTime);
            response.data.list[i].id = response.data.list[i].timelineList[j].sheetId;
        }
    }

    return response;
 }

 /**
  * 时间格式截取
  * @param {*} str 
  */
 function subTime(str){
     let tIdx = str.indexOf("T");
     let dianIndx = str.indexOf(".",tIdx);

     let res = str.substring(0,tIdx) + " " + str.substring(tIdx + 1,dianIndx);
     return res;
 }