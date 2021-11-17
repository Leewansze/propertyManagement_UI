<template>
  <div class="equipment-purchase-list" style="position:relative">
		<h2>申请列表</h2>
		<el-button type="text" @click="refresh">
      刷新
    </el-button>
		<el-button type="primary" size="medium" v-if="type === 'myApply'"
			@click="dialogVisible = true" style="position:absolute;right:0">
			添加申请
		</el-button>
		<div>
			<el-table
				:data="tableData"
				highlight-current-row
				max-height="700"
				v-loading="tableLoading"
				style="width: 100%;"
			>
				<el-table-column label="序号" min-width="4%" align="center">
					<template slot-scope="scope">
						{{(pageNo - 1) * pageSize + scope.$index + 1}}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="设备名称" min-width="5%"/>
				<el-table-column prop="amount" label="数量" min-width="5"/>
				<el-table-column prop="applicant.nickname" label="申请人" min-width="8%"/>
				<el-table-column prop="createTime" label="申请时间" min-width="10%"/>
				<el-table-column prop="status" label="状态" min-width="10%">
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.statusType"
							disable-transitions
						>{{scope.row.status}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="8%">
					<template slot-scope="scope">
						<el-button size="small" icon="el-icon-view" @click="handleView(scope.row)" />
						<el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, sizes, prev, pager, next, jumper"
					:total="this.rowCount"
					:page-size="this.pageSize"
					:current-page="this.pageNo"
					@size-change="pageSizeChange"
					@current-change="pageChange"
				></el-pagination>
			</div>
		</div>
		<div class="addRecordDialog">
			<el-dialog :visible.sync="dialogVisible" width="550px" center title="设备采购申请表">
				<el-form :model="addRecordModel"
					ref="addRecordModel"
					status-icon
					:rules="rules"
					label-width="30%"
					label-position="top"
					v-loading="modelLoading">
					<el-form-item label="设备名称:" prop="name" label-width="20%">
						<el-input v-model="addRecordModel.name" />
					</el-form-item>
					<el-form-item label="申请购买数量:" prop="amount" label-width="20%">
						<el-input-number v-model="addRecordModel.amount" :min="1" :max="100" />
					</el-form-item>
					<el-form-item label="备注:" prop="remark" label-width="20%">
						<el-input type="textarea" :autosize="{ minRows: 4 }" v-model="addRecordModel.remark" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit">提交</el-button>
						<el-button @click="cancel">取 消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
  </div>  
</template>

<script>
import routerApi from '@/service/api/routerApi'
import equipmentPurchaseService from '../../service/equipmentPurchase/equipmentPurchaseService'
export default {
	name: "equipmentPurchaseList",
	data () {
		return {
			type: 'myApply',
			pageNo: 1,
			pageSize: 10,
			rowCount: 0,
			tableLoading: false,
			tableData: [],
			dialogVisible: false,
			addRecordModel: {
				name: '',
				amount: 0,
				remark: '',
			},
			modelLoading: false,
			rules: {
				name: [{ required: true, message: '请输入申请购买的设备名称', trigger: "blur" }],
			}
		}
	},
	created () {
		let url = this.$route.path
		this.type = (url === '/equipmentPurchase/myApply') ? 'myApply' : 'list'
		this.getList(this.pageNo, this.pageSize)
	},
	methods: {
		refresh() {
			this.getList(this.pageNo, this.pageSize)
		},
		submit() {
			this.$refs['addRecordModel'].validate((valid) => {
				if (valid) {
					this.modelLoading = true
					let res
					equipmentPurchaseService.insert(this.addRecordModel)
					.then(response => {
						res = response
						setTimeout(() => {
							this.modelLoading = false
							this.dialogVisible = false
							if (res.message === '插入成功') {
								this.$message.success('提交申请成功')
							}
							this.getList(1, 10);
						}, 500);
					})
					.catch(error => {
						this.$message.warning('提交失败')
						console.log(error)
					})
				}
			});
		},
		cancel() {
			this.dialogVisible = false
			this.addRecordModel = {
				name: '',
				amount: 0,
				remark: ''
			}
		},
		getList(pageNo, pageSize) {
			this.tableLoading = true
			let userId = this.$store.getters['user/getId']
			let res
			if (this.type === 'myApply') {
				equipmentPurchaseService.findAllByApplicantId(userId, pageNo, pageSize)
				.then(response => {
					res = response
					setTimeout(() => {
						this.tableData = res.data.content
						this.rowCount = res.data.totalElements
						this.tableLoading = false
					}, 500);
				})
			} else if(this.type === 'list') {
				equipmentPurchaseService.findAll(pageNo, pageSize)
				.then(response => {
					res = response
					setTimeout(() => {
						this.tableData = res.data.content
						this.rowCount = res.data.totalElements
						this.tableLoading = false
					}, 500);
				})
			}
		},
		pageChange(pageNo) {
			this.pageNo = pageNo
			this.getList(this.pageNo, this.pageSize)
		},
		pageSizeChange(pageSize) {
			this.pageSize = pageSize
			this.getList(this.pageNo, this.pageSize)
		},
		handleView(record) {
			sessionStorage.setItem('equipmentPurchaseRecord', JSON.stringify(record))
			this.$router.push(routerApi.equipmentPurchase.detail.getUrl())
		},
		handleDelete(record) {
			this.$confirm('确认删除该条申请记录吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				equipmentPurchaseService.deleteById(record.id)
				.then(response => {
					if (response.message === '删除成功') {
						this.$message.success('删除成功!');
						setTimeout(() => {
							this.getList(this.pageNo, this.pageSize)
						}, 500);
					}
				})
				.catch(error => {
					this.$message.error('删除失败!');
					console.log(error)
				})
			})
		}
	}
}
</script>

<style scoped>

</style>