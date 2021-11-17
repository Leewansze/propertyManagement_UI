/*
 * @Author: Harry 
 * @Date: 2019-10-01 14:38:34 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-10 17:16:30
 */

import _this from '@/main'
import api from '@/service/api/serviceApi'
import util from "@/service/util";

var that = _this._this;

export default {
    async checkUserName(username){
        
        let res;
        await that.$get(api.checkUserName.url,{
            username:username
        })
        .then(response => {
            res = response;
        })
        

        return res;
    },

    async registeredUser(user,rrole){

        let role = 0;
        let pass;
        if(rrole != undefined){
            role = parseInt(rrole);
            pass = user.password;
        }
        else{
            pass = user.pass;
        }
        
        let res;
        await that.$post(api.registeredUser.url,{
            username:user.username,
            nickname:user.nickname,
            password:util.SHA1(pass),
            role:role
        })
        .then(response => {
            res = response;
        })
        

        return res;


    }
}