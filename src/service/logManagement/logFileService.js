/*
 * @Author: Harry 
 * @Date: 2019-10-18 12:16:51 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-18 18:58:27
 */

import _this from '@/main'
import api from '@/service/api/serviceApi'
import { get } from 'https';

const that = _this._this

 export default {
    async getLogFileListByFileName(preLevelName){
        let res;

        await that.$get(api.logManagement.url.getLogFileList,{
            preLevelName:preLevelName
        })
        .then(response =>{
            res = response;
        })

        return res;
    },
    downloadLog(list){
        // console.log(list);

        for(let i = 0;i < list.length;i++){
            delete list[i].icon;
        }

        // console.log(list);
        // console.log(typeof(list))
        let config = {
            responseType:"blob"
        }
        
        that.$post(api.logManagement.url.downloadLog,list,config)
        .then(res => {
            // console.log(res);
            let blob = new Blob([res]);
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = "日志.zip"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放blob对象

        })
    }
 }