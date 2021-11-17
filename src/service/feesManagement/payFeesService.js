/*
 * @Author: Harry 
 * @Date: 2019-10-25 16:07:02 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-17 20:43:22
 */
import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

 export default {
    async getOwnerUnPayFeesList(pageNum,size){
        let userId = that.$store.getters['user/getId'];

        let res;

        await that.$get(api.feesManagement.url.getOwnerUnPayFeesList,{
            userId:userId,
            pageNum:pageNum,
            pageSize:size
        })
        .then(response => {
            response = addShowData(response);
            res = response;

        })

        return res;
    },
    async searchOwnerTimeRangeFeesList(pageNum, pageSize, fromYear, fromMonth, toYear, toMonth) {
        let userId = that.$store.getters['user/getId']
        let res
        await that.$get(api.feesManagement.url.searchOwnerTimeRangeFeesList, {
                userId: userId,
                pageNum: pageNum,
                pageSize: pageSize,
                fromYear: fromYear,
                fromMonth: fromMonth,
                toYear: toYear,
                toMonth: toMonth
            })
            .then(response => {
                response = addShowData(response);
                res = response;
            })
        return res
    },
    async searchHouseFeesList(pageNum, pageSize, houseId, fromYear, fromMonth, toYear, toMonth) {
        let res
        await that.$get(api.feesManagement.url.searchHouseFeesList, {
                pageNum: pageNum,
                pageSize: pageSize,
                houseId: houseId,
                fromYear: fromYear,
                fromMonth: fromMonth,
                toYear: toYear,
                toMonth: toMonth
            })
            .then(response => {
                response = addShowData(response);
                res = response;
            })
        return res
    },
    async alipayQRCode(outTradeNo) {
        let res;

        await that.$get(api.feesManagement.url.alipayQRCode, {
                outTradeNo: outTradeNo,
            })
            .then(response => {
                res = response;

            })

        return res;
    },
    async alipayPcpay(outTradeNo) {
        let res;
        await that.$get(api.feesManagement.url.alipayPcpay, {
            outTradeNo:outTradeNo,
        })
        .then(response => {
            res = response;

        })

        return res;
    }
 }

 function addShowData(response){
     let list = [];

     for(let i = 0;i < response.data.numberOfElements;i++){
         let item = response.data.content[i];
         list.push(model(
             item.year + "-" + item.month,
            item.paymentName,
            // item.house.building.property.location + item.house.building.address + item.house.number + "物业费",
            item.isPaid,
            item.outTradeNo,
            item.fee
         ))
     }

     response.data.list = list;

     return response;
 }


function model(paymentDate,paymentInfo,isPaid,outTradeNo,fee){

    return{

     /**
     * 缴费日期
     */
    paymentDate:paymentDate,

    /**
     * 缴费信息
     */
    paymentInfo:paymentInfo, 

    /**
     * 缴费状态
     */
    isPaid: (isPaid ? true : false),
    paymentState: (isPaid ? "已支付" : "未支付"),

    /**
     * 缴费编号
     */
    outTradeNo:outTradeNo,

    /**
     * 缴费金额
     */
     fee: ('￥' + fee)
    }
 }