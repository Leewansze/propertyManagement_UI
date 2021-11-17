/*
 * @Author: Harry 
 * @Date: 2019-10-13 17:45:21 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-20 14:44:27
 */


import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

export default {
    async create(title,_type,mes) {
        let userId = that.$store.getters['user/getId'];
        let userNickName = that.$store.getters['user/getNickname'];

        let res;
        await that.$post(api.complaintAndSuggestion.url.create,{
            sheetType:_type,
            message:changMes(mes),
            title:title,
            proprietorId:userId,
            userNickName:userNickName
        })
        .then(response => {
            // console.log(response)
            res = response;
        })

        return res;
    },
    async uploadImage(_that,sheetId){
        _that.formDate = new FormData()
        _that.$refs.upload.submit();
        _that.formDate.append('sheetId', sheetId);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        
        let res;
        await _that.$post(api.complaintAndSuggestion.url.uploadImage,
        _that.formDate,config)
        .then( response => {
            // console.log(response)
            res = response;
        }).catch( error => {
            console.log(error)
        })

        return res;
    }
}

function changMes(mes){
    mes = changALabel(mes);
    return mes;
}

function changALabel(mes){
    return mes;
}