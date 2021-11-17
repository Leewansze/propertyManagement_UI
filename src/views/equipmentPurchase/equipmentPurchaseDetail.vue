<template>
  <div class="equipment-purchase-detail">
    <el-page-header @back="goBack" content="申请详情"/>
		<div style="width:900px;margin-top:10px;margin-left:330px;">
			<div style="text-align:left;">
				<el-steps :active=step>
					<el-step title="提交申请" status="success" v-if="!(record.status === '审核不通过')">
						<template slot="description">
							{{record.createTime}}
						</template>
					</el-step>
					<el-step title="提交申请" status="error" v-if="record.status === '审核不通过'">
						<template slot="description">
							{{record.createTime}}
						</template>
					</el-step>
					<el-step title="审核中" status="success" v-if="!(record.status === '审核不通过')" />
					<el-step title="审核中" status="error" v-if="record.status === '审核不通过'" />
					<el-step title="审核结果" status="wait" v-if="record.status === '审核中'" />
					<el-step title="审核通过" status="success" v-if="record.status === '审核通过' || record.status === '已完成'">
						<template slot="description">
							{{record.reviewTime}}
						</template>
					</el-step>
					<el-step title="完成状态" status="wait" v-if="record.status === '审核通过'" />
					<el-step title="审核不通过" status="error" v-if="record.status === '审核不通过'" >
						<template slot="description">
							{{record.reviewTime}}
						</template>
					</el-step>
					<el-step title="已完成" status="success" v-if="record.status === '已完成'">
						<template slot="description">
							{{record.completeTime}}
						</template>
					</el-step>
				</el-steps>
			</div>
			<div class="sheet-details">
				<span>申请人: {{this.record.applicant.nickname}}</span>
				<el-divider />
				<span>申请时间: {{this.record.createTime}}</span>
				<el-divider />
				<span>设备名称: {{this.record.name}}</span>
				<el-divider />
				<span>数量: {{this.record.amount}}</span>
				<el-divider />
				<span>备注: {{this.record.remark}}</span>
				<el-divider />
			</div>
			<div>
				<el-button type="primary" size="medium" @click="dialogShow = true">
					修改状态
				</el-button>
			</div>
			<el-dialog :visible.sync="dialogShow" width="450px" center title="修改状态" @closed="onClose">
				<div style="text-align: center;" v-loading="loading">
					<el-select v-model="tmpStatus" placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.value"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogShow = false">取 消</el-button>
					<el-button type="primary" @click="commit" v-if="clickable">确 定</el-button>
					<el-button type="primary" @click="commit" disabled v-if="!clickable">确 定</el-button>
				</span>
			</el-dialog>
		</div>
  </div>
</template>

<script>
import routerApi from '@/service/api/routerApi'
import equipmentPurchaseService from '../../service/equipmentPurchase/equipmentPurchaseService'
export default {
	data () {
		return {
			record: '',
			step: 1,
			status: '审核中',
			dialogShow: false,
			options: [],
			tmpStatus: '审核中',
			clickable: false,
			loading: false
		}
	},
	created () {
		this.record = JSON.parse(sessionStorage.getItem('equipmentPurchaseRecord'))
		this.getRecord()
	},
	methods: {
		goBack() {
			this.$router.push(routerApi.equipmentPurchase.myApply.getUrl())
		},
		getRecord() {
			this.options = []
			equipmentPurchaseService.getById(this.record.id)
			.then(response => {
				this.record = response.data
				this.status = this.record.status
				this.tmpStatus = this.status
				if (this.status === '审核中') {
					this.step = 2
					this.options.push({ value: '审核中'})
					this.options.push({ value: '审核通过'})
					this.options.push({ value: '审核不通过'})
				} else if (this.status === '审核通过') {
					this.step = 3
					this.options.push({ value: '已完成'})
				} else if (this.status === '审核不通过') {
					this.step = 3
					this.options.push({ value: '审核不通过'})
				} else if (this.status === '已完成') {
					this.step = 4
					this.options.push({ value: '已完成'})
				}
			})
		},
		commit() {
			this.$confirm('确定修改状态为 ' + this.tmpStatus + ' 吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let res
				let id = this.record.id
				this.loading = true
				if (this.tmpStatus === '审核不通过') {
					res = equipmentPurchaseService.updateStatusNotPass(id)
				} else if (this.tmpStatus === '审核通过') {
					res = equipmentPurchaseService.updateStatusPass(id)
				} else if (this.tmpStatus === '已完成') {
					res = equipmentPurchaseService.updateStatusComplete(id)
				}
				res.then(response => {
					if(response.flag) {
						setTimeout(() => {
							this.loading = false
							this.$message.success('更新状态成功!')
							setTimeout(() => {
								this.dialogShow = false
								this.getRecord()
							}, 1000);
						}, 1000);						
					}
				})
				.catch(error => {
					this.loading = false
					this.dialogShow = false
					this.$message.error('更新失败!')
					console.log(error)
				})
			});
		},
		onClose() {
			this.tmpStatus = this.status
		}
	},
	watch: {
		tmpStatus: {
			handler(val) {
				if(val !== this.status) {
					this.clickable = true
				}
			}
		}
	}
}
</script>

<style scoped>
.sheet-details {
  line-height: 30px;
  text-align: left;
  margin-top: 30px;
}
</style>