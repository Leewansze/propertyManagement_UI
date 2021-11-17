/*
 * @Author: Harry 
 * @Date: 2019-10-01 02:52:38 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-21 16:54:25
 */


import Vue from 'vue'
import Router from 'vue-router'
import routerApi from '@/service/api/routerApi'
import store from '@/store/store'
import rolePermissions from "@/service/router/rolePermissions"

Vue.use(Router)

/**
 * 解决跳转相同路由地址报错
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'//从定向到login
    },
    {
      path: routerApi.getLogin(),
      name: 'login',
      component: () => import("./views/Login.vue")
    },
    {
      path: routerApi.getPage403(),
      name: "page403",
      component: () => import("./views/Page403.vue")
    },
    {
      path: routerApi.getHome(),
      name: 'home',
      meta: { title: routerApi.getHomeName() },
      component: () => import("./views/Home.vue"),
      children: [
        {
          path: routerApi.getPage1(),
          name:"page1",
          meta: { title: routerApi.getPage1Name() },
          component: () => import("./views/home/page1.vue"),
        },
        {
          path: routerApi.getPage2(),
          // name:"page2",
          meta: { title: routerApi.getPage2Name() },
          component: () => import("./views/home/page2.vue"),
          children: [
            {
              path: '/',
              name:"page2-1",
              meta: { title: routerApi.getPage2_1Name() },
              component: () => import("./views/home/page2-1.vue"),
            }
          ]
        },
        {
          path: routerApi.roleManagement.getRoleManagement(),
          // name:routerApi.roleManagement.getRoleManagementName(),
          meta: { title: routerApi.roleManagement.getRoleManagementName() },
          component: () => import("./views/role/roleManagementIndex.vue"),
          children:[
            {
              path:"/",
              name:routerApi.roleManagement.getRoleManagementName(),
              meta: { title: routerApi.roleManagement.getRoleManagementName() },
              component: () => import("./views/role/roleManagement.vue")
            }
          ]
        },
        {
          path: routerApi.property.getPropertyUrl(),
          component: () => import('./views/property/propertyView'),
          children: [
            {
              path: '/',
              name: 'property',
              meta: { title: routerApi.property.getPropertyName() },
              component: () => import('./views/property/propertyIndex'),
            },
            {
              path: routerApi.property.building.getBuildingUrl(),
              component: () => import('./views/building/buildingView'),
              children: [
                {
                  path: '/',
                  name: 'building',
                  meta: { title: routerApi.property.building.getBuildingName() },
                  component: () => import('./views/building/buildingIndex')
                },
                {
                  path: routerApi.property.building.house.getHouseUrl(),
                  component: () => import('./views/house/houseView'),
                  children: [
                    {
                      path: '/',
                      name: 'house',
                      meta: { title: routerApi.property.building.house.getHouseName() },
                      component: () => import('./views/house/houseIndex')
                    },
                    {
                      path: routerApi.property.building.house.detail.getHouseDetailUrl(),
                      component: () => import('./views/houseDetail/houseDetailView'),
                      children: [{
                        path: '/',
                        name: 'houseDetail',
                        meta: { title: routerApi.property.building.house.detail.getHouseDetailName() },
                        component: () => import('./views/houseDetail/houseDetailIndex'),
                      }]
                    }
                  ]
                }
              ]
            },
            {
              path: routerApi.property.test.getTestUrl(),
              name: 'property/test',
              meta: { title: routerApi.property.test.getTestName() },
              component: () => import('./views/property/test')
            }
          ]
        },
        {
          path: routerApi.logManagement.getLogManagement(),
          // name:routerApi.roleManagement.getRoleManagementName(),
          meta: { title: routerApi.logManagement.getLogManagementName() },
          component: () => import("./views/log/logManagementIndex.vue"),
          children:[
            {
              path:"/",
              name:routerApi.logManagement.getLogManagement(),
              meta: { title: routerApi.logManagement.getLogWebsocketName() },
              component: () => import("./views/log/logManagement.vue")
            },{
              path:routerApi.logManagement.logFileManagement.getLogFileManagement(),
              name:routerApi.logManagement.logFileManagement.getLogFileManagement(),
              meta:{title:routerApi.logManagement.logFileManagement.getLogFileManagementName()},
              component: () => import("./views/log/logFileManagement.vue")
            }
          ]
        },
        {
          path:routerApi.complaintAndSuggestion.getComplaintAndSuggestion(),
          meta:{title:routerApi.complaintAndSuggestion.getComplaintAndSuggestionName()},
          component: () => import("./views/complaintAndSuggestion/complaintAndSuggestionIndex.vue"),
          children:[
            {
              path:routerApi.complaintAndSuggestion.getCreateSheet(),
              name:routerApi.complaintAndSuggestion.getCreateSheet(),
              meta: { title: routerApi.complaintAndSuggestion.getCreateSheetName() },
              component: () => import("./views/complaintAndSuggestion/creatSheet.vue")
            },
            {
              path:routerApi.complaintAndSuggestion.getOwnerSheet(),
              name:routerApi.complaintAndSuggestion.getOwnerSheet(),
              meta: { title: routerApi.complaintAndSuggestion.getOwnerSheetName() },
              component: () => import("./views/complaintAndSuggestion/ownerSheet.vue")
            }
          ]
        },
        {
          path:routerApi.feesManagement.getFeesManagement(),
          meta:{title:routerApi.feesManagement.getFeesManagementName()},
          component: () => import("./views/feesManagement/feesManagementIndex.vue"),
          children:[
            {
              path:routerApi.feesManagement.payFees.getPayFees(),
              name:routerApi.feesManagement.payFees.getPayFees(),
              meta: { title: routerApi.feesManagement.payFees.getPayFeesName() },
              component: () => import("./views/feesManagement/payFees.vue")
            },
            {
              path:routerApi.feesManagement.queryFees.getQueryFees(),
              name:routerApi.feesManagement.queryFees.getQueryFees(),
              meta: { title: routerApi.feesManagement.queryFees.getQueryFeesName() },
              component: () => import("./views/feesManagement/queryFees.vue")
            },
            {
              path: routerApi.feesManagement.feeCollection.getFeeCollectionUrl(),
              name: routerApi.feesManagement.feeCollection.getFeeCollectionUrl(),
              meta: { title: routerApi.feesManagement.feeCollection.getFeeCollectionName() },
              component: () => import("./views/feesManagement/feeCollection.vue")
            }
          ]
        }, {
          path: routerApi.houseList.getHouseListUrl(),
          meta: { title: routerApi.houseList.getHouseListName() },
          component: () => import("./views/houseList/houseListView"),
          children: [{
            path: '/',
            name: 'houseList',
            meta: { title: routerApi.houseList.getHouseListName() },
            component: () => import('./views/houseList/houseListIndex'),
          }]
        }, {
          path: routerApi.userInformation.getUrl(),
          meta: { title: routerApi.userInformation.getName() },
          component: () => import("./views/userInformation/userInformation"),
        }, {
          path: routerApi.equipmentPurchase.getUrl(),
          component: () => import("./views/equipmentPurchase/equipmentPurchaseView"),
          children: [{
            path: routerApi.equipmentPurchase.myApply.getUrl(),
            name: 'myApply',
            meta: { title: routerApi.equipmentPurchase.myApply.getName() },
            component: () => import('./views/equipmentPurchase/equipmentPurchaseList'),
          }, {
            path: routerApi.equipmentPurchase.list.getUrl(),
            name: 'equipmentPurchaseList',
            meta: { title: routerApi.equipmentPurchase.list.getName() },
            component: () => import('./views/equipmentPurchase/equipmentPurchaseList'),
          }, {
            path: routerApi.equipmentPurchase.detail.getUrl(),
            name: 'equipmentPurchaseDetail',
            meta: { title: routerApi.equipmentPurchase.detail.getName()},
            component: () => import('./views/equipmentPurchase/equipmentPurchaseDetail'),
          }]
        }
      ]
    }
  ]
})


// console.log(routerApi.getPage2_1())

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)

  // console.log(store.getters['user/getRolename'])
  let isAllow = rolePermissions.judgeAllowUrl(store.getters['user/getRolename'],to.path);

  // console.log(isAllow);
  if(!isAllow){
    next({path:routerApi.getPage403()})
  }
  else if(!store.getters['user/getIsLogin'] && (to.path != routerApi.getLogin())){
    next({path:routerApi.getLogin()})
  }
  else{
    next();
  }
  
});



export default router;
