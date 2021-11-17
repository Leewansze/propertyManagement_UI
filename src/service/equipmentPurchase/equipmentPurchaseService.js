import _this from '@/main'
import api from '@/service/api/serviceApi'

var that = _this._this;

export default {
	async getById(id) {
		let res
		await that.$get(api.equipmentPurchase.url.getById, {
				id: id
			})
			.then(response => {
				response.data = dataFormat(response.data)
				res = response
			})
		return res
	},
	async insert(record) {
		let res
		let userId = that.$store.getters['user/getId']
		record.applicantId = userId
		await that.$post(api.equipmentPurchase.url.insert, record)
			.then(response => {
				res = response
			})
		return res
	},
	async deleteById(id) {
		let res
		await that.$get(api.equipmentPurchase.url.deleteById, {
				id: id
			})
			.then(response => {
				res = response
			})
		return res
	},
	async findAll(pageNum, pageSize) {
		let res
		await that.$get(api.equipmentPurchase.url.findAll, {
				pageNum: pageNum,
				pageSize: pageSize
			})
			.then(response => {
				response = listDataFormat(response)
				res = response
			})
		return res
	},
	async findAllByApplicantId(applicantId, pageNum, pageSize) {
		let res
		await that.$get(api.equipmentPurchase.url.findAllByApplicantId, {
				applicantId: applicantId,
				pageNum: pageNum,
				pageSize: pageSize
			})
			.then(response => {
				response = listDataFormat(response)
				res = response
			})
		return res
	},
	async updateStatusPass(id) {
		let res
		let reviewerId = that.$store.getters['user/getId']
		await that.$get(api.equipmentPurchase.url.updateStatusPass, {
				id: id,
				reviewerId: reviewerId
			})
			.then(response => {
				res = response
			})
		return res
	},
	async updateStatusNotPass(id) {
		let res
		let reviewerId = that.$store.getters['user/getId']
		await that.$get(api.equipmentPurchase.url.updateStatusNotPass, {
				id: id,
				reviewerId: reviewerId
			})
			.then(response => {
				res = response
			})
		return res
	},
	async updateStatusComplete(id) {
		let res
		let reviewerId = that.$store.getters['user/getId']
		await that.$get(api.equipmentPurchase.url.updateStatusComplete, {
				id: id,
				reviewerId: reviewerId
			})
			.then(response => {
				res = response
			})
		return res
	}
}

function listDataFormat(response) {
	let list = []
	for (let i = 0; i < response.data.numberOfElements; i++) {
		let item = response.data.content[i]
		item = dataFormat(item)
		list.push(item)
	}
	response.data.list = list;
	return response;
}

function dataFormat(record) {
	if (record.createTime) {
		record.createTime = timeFormat(record.createTime)
	}
	if (record.reviewTime) {
		record.reviewTime = timeFormat(record.reviewTime)
	}
	if (record.completeTime) {
		record.completeTime = timeFormat(record.completeTime)
	}
	if (record.status === '审核通过' || record.status === '已完成') {
		record.statusType = 'success'
	} else if (record.status === '审核不通过') {
		record.statusType = 'danger'
	}
	return record
}

function timeFormat(time) {
	let date = new Date(time)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()
	let str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
	return str
}