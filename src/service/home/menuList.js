/*
 * @Author: Harry 
 * @Date: 2019-10-04 15:39:57 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-21 17:02:09
 */

import routerApi from '@/service/api/routerApi'


export default {
    getList(that){
        return get(that);
    },    
}

/**
 * 判断用户权限
 */
function get(that){
    let roleName;
    if(typeof(that) == "string"){
        roleName = that;
    }
    else{
        roleName = that.$store.getters['user/getRolename']
    }
    
    let list = []

    list = list.concat(getPublic());
    if(roleName == "系统管理员"){
        list = list.concat(getSystemAdministrator())
    }
    else if (roleName === '物业管理员') {
        list = list.concat(getPropertyAdministrator())
    }
    else if(roleName === "业主"){
        list = list.concat(getOwner())
    }
    return list;
}

/**
 * list Model
 * @param {string} name 
 * @param {string} url 
 * @param {string} icon 
 * @param {boolean} isSub 
 * @param {arrays} sub 
 */
function model(name,url,icon,isShow,isSub,sub){
    let isSub_tp = false;
    let sub_tp = []
    
    if(isSub != undefined){
        isSub_tp = isSub;
        sub_tp = sub;
    }

    if(isShow == undefined){
        isShow = true;
    }
    
    // console.log(name + ":" + isShow)

    return {
        name:name,
        icon:icon,
        url:url,
        isShow:isShow,
        isSub:isSub_tp,
        sub:sub_tp,
    }
}

/**
 * subs model
 * @param {string} name 
 * @param {string} url 
 * @param {string} icon 
 */
function subs(name,url,isShow){
    return {
        name:name,
        url:url,
        isShow:isShow
    }
}

/**
 * 获取公共模块
 */
function getPublic(){
    return [
        //系统首页
        model(routerApi.getHomeName(),
        routerApi.getHome(),
        'el-icon-setting'),

        //page1例子
        model(routerApi.getPage1Name(),
        routerApi.getPage1CompleteUrl(),
        'el-icon-document'),

        //page2例子
        model(routerApi.getPage2Name(),
        routerApi.getPage2CompleteUrl(),
        'el-icon-document'),

        //子目录例子
        model("子目录",
        "",
        "el-icon-s-order",
        true,
        true,
        [
            subs(routerApi.getPage1Name(),
            routerApi.getPage1CompleteUrl(),
            true),
            
            subs(routerApi.getPage2Name(),
            routerApi.getPage2CompleteUrl(),
            true),
        ])
    ]
}


/**
 * 获取业主模块
 */
function getOwner(){
    return [
        //房屋列表
        model(routerApi.houseList.getHouseListName(),
            routerApi.houseList.getHouseListUrl(),
            'el-icon-s-home'),

        //房屋详情(不显示)
        model(routerApi.property.building.house.detail.getHouseDetailName(),
            routerApi.property.building.house.detail.getHouseDetailCompleteUrl(),
            'el-icon-s-home',
            false),

        //投诉建议申请单
        model(routerApi.complaintAndSuggestion.getComplaintAndSuggestionName(),
        "",
        "el-icon-edit-outline",
        true,
        true,
        [
            subs(routerApi.complaintAndSuggestion.getOwnerSheetName(),
            routerApi.complaintAndSuggestion.getOwnerSheet(),
            true),

            subs(routerApi.complaintAndSuggestion.getCreateSheetName(),
            routerApi.complaintAndSuggestion.getCreateSheet(),
            true)
        ]),

        //物业费缴纳与查询
        model(routerApi.feesManagement.getFeesManagementName(),
        "",
        "el-icon-wallet",
        true,
        true,
        [
            subs(routerApi.feesManagement.payFees.getPayFeesName(),
            routerApi.feesManagement.payFees.getPayFees(),
            true),

            subs(routerApi.feesManagement.queryFees.getQueryFeesName(),
            routerApi.feesManagement.queryFees.getQueryFees(),
            true)
        ]),

        //个人资料(不显示)
        model(routerApi.userInformation.getName(),
            routerApi.userInformation.getUrl(),
            'el-icon-setting',
            false),

    ]
}

/**
 * 获取物业管理员模块
 */
function getPropertyAdministrator(){
    return [
        //楼盘
        model(routerApi.property.getPropertyName(),
            routerApi.property.getPropertyUrl(),
            'el-icon-s-home'),

        //楼栋(不显示)
        model(routerApi.property.building.getBuildingName(),
            routerApi.property.building.getBuildingCompleteUrl(),
            'el-icon-s-home',
            false),

        //房屋(不显示)
        model(routerApi.property.building.house.getHouseName(),
            routerApi.property.building.house.getHouseCompleteUrl(),
            'el-icon-s-home',
            false),

        //房屋详情(不显示)
        model(routerApi.property.building.house.detail.getHouseDetailName(),
            routerApi.property.building.house.detail.getHouseDetailCompleteUrl(),
            'el-icon-s-home',
            false),

        //设备采购
        model(routerApi.equipmentPurchase.getName(),
            "",
            "el-icon-cpu",
            true,
            true,
            [
                subs(routerApi.equipmentPurchase.myApply.getName(),
                    routerApi.equipmentPurchase.myApply.getUrl(),
                    true),
                subs(routerApi.equipmentPurchase.list.getName(),
                    routerApi.equipmentPurchase.list.getUrl(),
                    true),
            ]),

        //设备采购详情(不显示)
        model(routerApi.equipmentPurchase.list.getName(),
            routerApi.equipmentPurchase.list.getUrl(),
            'el-icon-s-home',
            false),

        //投诉建议申请单
        model(routerApi.complaintAndSuggestion.getComplaintAndSuggestionName(),
        "",
        "el-icon-edit-outline",
        true,
        true,
        [
            subs(routerApi.complaintAndSuggestion.getOwnerSheetName(),
            routerApi.complaintAndSuggestion.getOwnerSheet(),
            true),

            subs(routerApi.complaintAndSuggestion.getCreateSheetName(),
            routerApi.complaintAndSuggestion.getCreateSheet(),
            true)
        ]),

        //物业费缴纳与查询
        model(routerApi.feesManagement.getFeesManagementName(),
            "",
            "el-icon-wallet",
            true,
            true,
            [
                subs(routerApi.feesManagement.queryFees.getQueryFeesName(),
                    routerApi.feesManagement.queryFees.getQueryFees(),
                    true),
                subs(routerApi.feesManagement.feeCollection.getFeeCollectionName(),
                    routerApi.feesManagement.feeCollection.getFeeCollectionUrl(),
                    true)
            ])
    ]
}

/**
 * 获取系统管理员模块
 */
 function getSystemAdministrator(){
    return[
        //楼盘
        model(routerApi.property.getPropertyName(),
            routerApi.property.getPropertyUrl(),
            'el-icon-s-home'),
            
        //楼栋(不显示)
        model(routerApi.property.building.getBuildingName(),
            routerApi.property.building.getBuildingCompleteUrl(),
            'el-icon-s-home',
            false),

        //房屋(不显示)
        model(routerApi.property.building.house.getHouseName(),
            routerApi.property.building.house.getHouseCompleteUrl(),
            'el-icon-s-home',
            false),

        //设备采购
        model(routerApi.equipmentPurchase.getName(),
            "",
            "el-icon-cpu",
            true,
            true,
            [
                subs(routerApi.equipmentPurchase.myApply.getName(),
                    routerApi.equipmentPurchase.myApply.getUrl(),
                    true),
                subs(routerApi.equipmentPurchase.list.getName(),
                    routerApi.equipmentPurchase.list.getUrl(),
                    true),
            ]),

        //设备采购详情(不显示)
        model(routerApi.equipmentPurchase.list.getName(),
            routerApi.equipmentPurchase.list.getUrl(),
            'el-icon-s-home',
            false),


        //投诉建议申请单
        model(routerApi.complaintAndSuggestion.getComplaintAndSuggestionName(),
        "",
        "el-icon-edit-outline",
        true,
        true,
        [
            subs(routerApi.complaintAndSuggestion.getOwnerSheetName(),
            routerApi.complaintAndSuggestion.getOwnerSheet(),
            true),
            
            subs(routerApi.complaintAndSuggestion.getCreateSheetName(),
            routerApi.complaintAndSuggestion.getCreateSheet(),
            true)
        ]),

        //用户管理
        model(routerApi.roleManagement.getRoleManagementName(),
        routerApi.roleManagement.getRoleManagement(),
        "el-icon-user"),

        //日志管理
        model(routerApi.logManagement.getLogManagementName(),
        "",
        "el-icon-s-order",
        true,
        true,
        [
            subs(routerApi.logManagement.getLogWebsocketName(),
            routerApi.logManagement.getLogWebsocket(),
            true),

            subs(routerApi.logManagement.logFileManagement.getLogFileManagementName(),
            routerApi.logManagement.logFileManagement.getLogFileManagement(),
            true)
        ]),

        //物业费缴纳与查询
        model(routerApi.feesManagement.getFeesManagementName(),
        "",
        "el-icon-wallet",
        true,
        true,
        [
            subs(routerApi.feesManagement.queryFees.getQueryFeesName(),
            routerApi.feesManagement.queryFees.getQueryFees(),
            true),

            subs(routerApi.feesManagement.feeCollection.getFeeCollectionName(),
            routerApi.feesManagement.feeCollection.getFeeCollectionUrl(),
            true)
        ])
    ]
 }