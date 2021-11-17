/*
 * @Author: Harry 
 * @Date: 2019-10-25 16:07:02 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-20 19:58:09
 */
import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

export default {
	async findAll(pageNum, pageSize) {
		let res
		await that.$get(api.feesManagement.url.findAll, {
				pageNum: pageNum,
				pageSize: pageSize
			})
			.then(response => {
				response = addShowData(response)
				res = response
			})
		return res
	},
	async publish(price, publisherId) {
		let res
		await that.$post(api.feesManagement.url.publish, {
				price: price,
				publisherId: publisherId
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
		let item = response.data.content[i]
		list.push(model(
			item.publishTime,
			item.paymentName,
			item.price,
			item.user.nickname,
			item.status
		))
	}
	response.data.list = list;
	return response;
}

function model(publishTime, paymentName, price, publisherName, status) {

	return {
		// 发布日期
		publishTime: format(publishTime),

		// 费用名称
		paymentName: paymentName,

		// 价格(元/m²)
		price: price,

		// 发布人名字
		publisherName: publisherName,

		// 发布状态
		status: (status ? true : false),
		statusCode: (status ? "发布完成" : "发布中"),

	}
}

function format(publishTime) {
	let date = new Date(publishTime)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDay()
	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()
	let str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
	return str
}