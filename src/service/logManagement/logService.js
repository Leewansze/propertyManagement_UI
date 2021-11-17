/*
 * @Author: Harry 
 * @Date: 2019-10-13 14:10:57 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-13 18:41:45
 */

 export default {
    dealLogInfo(val){
        // console.log(val)
        let list;
        list = val.split("\n");
        // console.log(list)
        let res = []
        for(let i = 0;i < list.length - 1;i++){
            res.push(module(list[i]));
        }

        // console.log(res);
        return res;
    }
 }

 /**
  *  后台日志处理
  * @param {*} val 
  */
function module(val){
    let str = val.split(" ");
    let time = str[0] + " " + str[1];
    let thread = " " + str[2];
    let infoType = " " + str[3];
    let infoTypeColor = getInfoTypeColor(str[3]);
    let logClass = " " + str[4] + str[5];
    let mess = "";
    for(let i = 6;i < str.length;i++){
        mess += " " + str[i];
    }

    return{
        time:time,
        thread:thread,
        infoType:infoType,
        infoTypeColor:infoTypeColor,
        logClass:logClass,
        mess:mess
    }
}

/**
 * 判断日志级别 选择颜色
 * @param {string} val 
 */
function getInfoTypeColor(val){
    if(val == "INFO"){
        return "#CCFF00";
    }
    else if(val == "DEBUG"){
        return "#CCFF00"
    }
    else if(val == "ERROR"){
        return "red";
    }
    else if(val == "WARN"){
        return "#E6E61A"
    }
}