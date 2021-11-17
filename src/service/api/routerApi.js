/*
 * @Author: Harry 
 * @Date: 2019-10-01 02:52:12 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-21 16:52:48
 */

var api = {
    home:{
        url:"/home",
        name:"系统首页"
    },
    login:{
        url:"/login",
        name:"登录页面"
    },
    page1:{
        url:"page1",
        name:"页面一"
    },
    page2:{
        url:"page2",
        name:"页面二"
    },
    page2_1:{
        url:"page2-1",
        name:"页面2-1"
    },
    roleManagement:{
        url:"/roleManagement",
        name:"角色管理"
    },
    property: {
        url: '/property',
        name: '楼盘管理',
        building: {
            url: 'building',
            name: '楼栋管理',
            house: {
                url: 'house',
                name: '房屋管理',
                detail: {
                    url: 'detail',
                    name: '房屋详情',
                }
            }
        },
        test: {
          url: 'test',
          name: '楼盘子页面'
        }
    },
    houseList: {
        url: '/houseList',
        name: '房屋列表'
    },
    logManagement:{
        url:"/logManagement",
        name:"日志管理",
        logWebsocket:{
            url:"/logManagement",
            name:"后台日志推送"
        },
        logFileManagement:{
            url:"/logManagement/logFileManagement",
            name:"日志文件管理"
        }
    },
    complaintAndSuggestion:{
        url:"/complaintAndSuggestion",
        name:"投诉和建议",
        createSheet:{
            url:"/complaintAndSuggestion/createSheet",
            name:"投诉和建议单申请"
        },
        ownerSheet:{
            url:"/complaintAndSuggestion/ownerSheet",
            name:"我的申请"
        }
    },
    feesManagement:{
        url:"/feesManagement",
        name:"物业费用缴纳与查询",
        payFees:{
            url:"/feesManagement/payFees",
            name:"费用缴纳"
        },
        queryFees:{
            url:"/feesManagement/queryFees",
            name:"费用查询"
        },
        feeCollection: {
            url: "/feeManagement/feeCollection",
            name: "费用收取"
        }
    },
    page403:{
        url:"/page403",
        name:"403页面"
    },
    userInformation: {
        url: "/user/information",
        name: "个人资料"
    },
    equipmentPurchase: {
        url: "/equipmentPurchase",
        name: "设备采购",
        myApply: {
            url: "/equipmentPurchase/myApply",
            name: "我的申请"
        },
        list: {
            url: "/equipmentPurchase/list",
            name: "设备采购列表"
        },
        detail: {
            url: "/equipmentPurchase/detail",
            name: "申请详情"
        }
    },
}

export default {
    getHome(){
        return api.home.url;
    },
    getHomeName(){
        return api.home.name;
    },
    getLogin(){
        return api.login.url;
    },
    getLoginName(){
        return api.login.name;
    },
    getPage1(){
        return api.page1.url;
    },
    getPage1Name(){
        return api.page1.name;
    },
    getPage1CompleteUrl(){
        return api.home.url + "/" + api.page1.url;
    },
    getPage2(){
        return api.page2.url;
    },
    getPage2Name(){
        return api.page2.name;
    },
    getPage2CompleteUrl(){
        return api.home.url + "/" + api.page2.url;
    },
    getPage2_1(){
        return api.page2_1.url;
    },
    getPage2_1Name(){
        return api.page2_1.name;
    },
    getPage2_1CompleteUrl(){
        return api.home.url + "/" + api.page2.url + "/" + api.page2_1.url;
    },
    roleManagement:{
        getRoleManagementName(){
            return api.roleManagement.name;
        },
        getRoleManagement(){
            return api.roleManagement.url;
        }
    },
    property: {
      getPropertyUrl() {
        return api.property.url
      },
      getPropertyName() {
        return api.property.name
      },
      building: {
        getBuildingUrl() {
          return api.property.building.url
        },
        getBuildingName() {
          return api.property.building.name
        },
        getBuildingCompleteUrl() {
          return ''.concat(api.property.url,'/',api.property.building.url)
        },
        house: {
          getHouseUrl() {
            return api.property.building.house.url
          },
          getHouseName() {
            return api.property.building.house.name
          },
          getHouseCompleteUrl() {
            return ''.concat(api.property.url,'/',api.property.building.url,'/',api.property.building.house.url)
          },
          detail: {
            getHouseDetailUrl() {
              return api.property.building.house.detail.url
            },
            getHouseDetailName() {
              return api.property.building.house.detail.name
            },
            getHouseDetailCompleteUrl() {
              return ''.concat(api.property.url, '/', api.property.building.url, '/', api.property.building.house.url, '/',
                  api.property.building.house.detail.url)
            }
          }
        }
      },
      test: {
        getTestUrl() {
          return api.property.test.url
        },
        getTestName() {
          return api.property.test.name
        },
        getTestCompleteUrl() {
          return ''.concat(api.property.url,'/',api.property.test.url)
        }
      }
    },
    houseList: {
        getHouseListUrl() {
            return api.houseList.url
        },
        getHouseListName() {
            return api.houseList.name
        }
    },
    logManagement:{
        getLogManagement(){
            return api.logManagement.url;
        },
        getLogManagementName(){
            return api.logManagement.name;
        },
        getLogWebsocket(){
            return api.logManagement.logWebsocket.url;
        },
        getLogWebsocketName(){
            return api.logManagement.logWebsocket.name;
        },
        logFileManagement:{
            getLogFileManagement(){
                return api.logManagement.logFileManagement.url;
            },
            getLogFileManagementName(){
                return api.logManagement.logFileManagement.name;
            }
        }
    },
    complaintAndSuggestion:{
        getComplaintAndSuggestion(){
            return api.complaintAndSuggestion.url;
        },
        getComplaintAndSuggestionName(){
            return api.complaintAndSuggestion.name;
        },
        getCreateSheet(){
            return api.complaintAndSuggestion.createSheet.url;
        },
        getCreateSheetName(){
            return api.complaintAndSuggestion.createSheet.name;
        },
        getOwnerSheet(){
            return api.complaintAndSuggestion.ownerSheet.url;
        },
        getOwnerSheetName(){
            return api.complaintAndSuggestion.ownerSheet.name;
        }
    },
    feesManagement:{
        getFeesManagement(){
            return api.feesManagement.url;
        },
        getFeesManagementName(){
            return api.feesManagement.name;
        },
        payFees:{
            getPayFees(){
                return api.feesManagement.payFees.url;
            },
            getPayFeesName(){
                return api.feesManagement.payFees.name;
            }
        },
        queryFees:{
            getQueryFees(){
                return api.feesManagement.queryFees.url;
            },
            getQueryFeesName(){
                return api.feesManagement.queryFees.name;
            }
        },
        feeCollection: {
            getFeeCollectionUrl() {
                return api.feesManagement.feeCollection.url;
            },
            getFeeCollectionName() {
                return api.feesManagement.feeCollection.name;
            },
        }
    },
    userInformation: {
        getUrl() {
            return api.userInformation.url
        },
        getName() {
            return api.userInformation.name
        }
    },
    equipmentPurchase: {
        getUrl() {
            return api.equipmentPurchase.url
        },
        getName() {
            return api.equipmentPurchase.name
        },
        myApply: {
            getUrl() {
                return api.equipmentPurchase.myApply.url
            },
            getName() {
                return api.equipmentPurchase.myApply.name
            }
        },
        list: {
            getUrl() {
                return api.equipmentPurchase.list.url
            },
            getName() {
                return api.equipmentPurchase.list.name
            }
        },
        detail: {
            getUrl() {
                return api.equipmentPurchase.detail.url
            },
            getName() {
                return api.equipmentPurchase.detail.name
            }
        },
    },
    getPage403(){
        return api.page403.url;
    }
}