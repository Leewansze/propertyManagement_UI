/*
 * @Author: Harry 
 * @Date: 2019-10-09 23:46:37 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-19 16:47:44
 */

import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

 export default {
    async getUserList(pageNum,size,ttype,content){
        let res;

        if(ttype == undefined || ttype == 0 || ttype == "全部"){
            // console.log("@")
            await that.$get(api.roleManagement.getUserList.url,{
                pageNum:pageNum,
                size:size
            })
            .then(response =>{
                res = response;
            })
        }
        else{
            await that.$get(api.roleManagement.selectUserByType.url,{
                pageNum:pageNum,
                size:size,
                ttype:ttype,
                content:content
            })
            .then(response =>{
                res = response;
            })
        }


        return res;
    },
    async delUser(id){
        let res;

        await that.$get(api.roleManagement.delUser.url,{
            id:id
        })
        .then(response =>{
            res = response;
        })

        return res;
    },
    showRole(_that){
        for(let i = 0;i < _that.tableData.length;i++){
            _that.tableData[i].role = changRole(_that.tableData[i].role);
        }
    },
    async updateUser(form){
        let res;

        await that.$post(api.roleManagement.updatedUser.url,{
            username:form.username,
            nickname:form.nickname,
            id:form.id,
            role:changRole2(form.role)
        })
        .then(response =>{
            res = response;
        })

        return res;
    },
    async selectUserByPhone(phone) {
        let res;
        await that.$get(api.roleManagement.selectUserByPhone.url, {
                phone: phone
            })
            .then(response => {
                res = response;
            })
        return res
    }
 }


 function changRole(role){
    if(role == 0){
        return "业主";
    }
    else if(role == 1){
        return "物业管理员";
    }
    else if(role == 2){
        return "系统管理员";
    }
 }

 function changRole2(role){

    if(!isNaN(role)){
        return parseInt(role);
    }

    if(role == "业主"){
        return 0;
    }
    else if(role == "物业管理员"){
        return 1;
    }
    else if(role == "系统管理员"){
        return 2;
    }
 }