import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

export default {
    async searchUserBuildingFeesList(pageNum, pageSize, userId, buildingId, fromYear, fromMonth, toYear, toMonth) {
        let res
        await that.$get(api.feesManagement.url.searchUserBuildingFeesList, {
                pageNum: pageNum,
                pageSize: pageSize,
                userId: userId,
                buildingId: buildingId,
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
    async searchBuildingFeesList(pageNum, pageSize, buildingId, fromYear, fromMonth, toYear, toMonth) {
        let res
        await that.$get(api.feesManagement.url.searchBuildingFeesList, {
                pageNum: pageNum,
                pageSize: pageSize,
                buildingId: buildingId,
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
    async searchUserFeesList(pageNum, pageSize, userId, fromYear, fromMonth, toYear, toMonth) {
        let res
        await that.$get(api.feesManagement.url.searchOwnerTimeRangeFeesList, {
                pageNum: pageNum,
                pageSize: pageSize,
                userId: userId,
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
    async checkHouseFeeClear(houseId) {
        let res
        await that.$get(api.feesManagement.url.checkHouseFeeClear, {
                houseId: houseId
            })
            .then(response => {
                res = response
            })
        return res
    }
}

function addShowData(response) {
    let list = [];
    for (let i = 0; i < response.data.numberOfElements; i++) {
        let item = response.data.content[i];
        list.push(model(
            item.year + "-" + item.month,
            item.paymentName,
            item.isPaid,
            item.outTradeNo,
            item.fee,
            item.house.user.username,
            item.payType
        ))
    }
    response.data.list = list;
    return response;
}


function model(paymentDate, paymentInfo, isPaid, outTradeNo, fee, ownerName, payType) {

    return {
        // 缴费日期
        paymentDate: paymentDate,

        // 详细信息
        paymentInfo: paymentInfo,

        // 缴费状态
        isPaid: (isPaid ? true : false),
        paymentState: (isPaid ? "已支付" : "未支付"),

        // 缴费编号
        outTradeNo: outTradeNo,

        // 缴费金额
        fee: ('￥' + fee),

        // 业主名字
        ownerName: ownerName,

        // 支付方式
        payType: payType
    }
}