/*
 * @Author: Harry 
 * @Date: 2019-10-15 01:29:07 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-15 02:21:25
 */
import menuList from "@/service/home/menuList";
import routerApi from '@/service/api/routerApi'

 export default {
    judgeAllowUrl(role,path){
        if(role == undefined || role == "系统管理员"){
            return true;
        }
        if(path == routerApi.getPage403() || path == "/login" ){
            return true;
        }

        // console.log(role);
        // console.log(path);
        let list = getAllowUrl(role);

        for(let i = 0;i < list.length;i++){
            if(list[i] == path){
                return true;
            }
        }

        return false;
    }
 }

 function getAllowUrl(role){
    let list = menuList.getList(role);
    list = getUrlList(list);
    return list;
}

 function getUrlList(list){
    let res = []

    for(let i = 0;i < list.length;i++){
        if(list[i].url != ""){
            res.push(list[i].url);
        }
        for(let j = 0;j < list[i].sub.length;j++){
            if(list[i].sub[j].url != ""){
                res.push(list[i].sub[j].url);
            }
        }
    }

    return res;
 }