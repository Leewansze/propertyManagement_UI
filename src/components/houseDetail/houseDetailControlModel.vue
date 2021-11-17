/*
 * @Author: hovees 
 * @Date: 2020-03-13 12:17:36 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-19 21:28:06
 */

<template>
  <div class="house-detail-control-model">
		<el-page-header @back="goBack" content="房屋详情"/>
		<div style="margin-top:10px;">
			<el-form ref="houseDetail" label-width="80px" style="text-align:left;">
				<el-row>
					<el-col :span="6">
						<el-form-item label="所在楼盘">
							{{this.houseDetail ? this.houseDetail.building.property.name : ''}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所在楼层">
							{{this.houseDetail ? this.houseDetail.floor : ''}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="业主名字">
							{{this.houseDetail.user ? this.houseDetail.user.username : ''}}
							<el-button type="text" 
								@click="selectDialogVisible = true" 
								v-if="this.$store.getters['user/getRolename'] !== '业主'"
								style="margin-left:35px;">
								更换业主
							</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="所在楼栋">
							{{this.houseDetail ? this.houseDetail.building.name : ''}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="占地面积">
							{{this.houseDetail ? this.houseDetail.area : ''}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号">
							{{this.houseDetail.user ? this.houseDetail.user.phone : ''}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="门牌号">
							{{this.houseDetail ? this.houseDetail.number : ''}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="房屋朝向">
							{{this.houseDetail ? this.houseDetail.direction : ''}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="邮箱地址">
							{{this.houseDetail.user ? this.houseDetail.user.emailAddress : ''}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="详细地址">
							{{this.houseDetail ? this.houseDetail.building.property.location : ''}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="费用历史">
							<el-button type="primary" size="medium" @click="feeSearch">查看</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<el-dialog title="更换业主" :visible.sync="selectDialogVisible" width="23%">
			<span>
				请选择新业主：
				<el-select
                v-model="selectedUserId"
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="请输入手机号"
                :remote-method="selectByPhone"
                :loading="loading">
                <el-option
                  v-for="item in userOptions"
                  :key="item.phone"
                  :label="item.username"
                  :value="item.userId">
                  <span style="float: left">{{ item.username }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
                </el-option>
              </el-select>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="selectDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="changeOwner">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="confirmDialogVisible" width="23%">
			<el-form>
				<el-form-item>
					确定更换业主为: <b>{{this.selectedUser.username}}</b>
				</el-form-item>
			</el-form>
			<span>手机号：<b>{{this.selectedUser.phone}}</b> 吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="confirmDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateOwner">确 定</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import houseService from '../../service/house/houseService'
import queryFeesService from '../../service/feesManagement/queryFeesService'
import roleManagementService from '../../service/roleManagement/roleManagementService'
import {mapState} from "vuex"
export default {
	name: 'houseDetailControlModel',
	data () {
		return {
			userOptions: [],
			selectedUserId: '',
			selectedUser: '',
			loading: false,
			selectDialogVisible: false,
			confirmDialogVisible: false
		}
	},
	computed: mapState({
		houseDetail: state => state.house.houseDetail
	}),
	created() {
		if (!this.houseDetail) {
			this.getHouseDetail()
		}
	},
	methods: {
		goBack() {
			this.$router.push('/property/building/house')
		},
		getHouseDetail() {
			let id = sessionStorage.getItem('houseId')
			houseService.getById(id)
			.catch(error => {
				console.log(error)
				this.$message.error('获取房屋详情息失败')
			})
		},
		openBigLoading() {
			this.loadingInstance = Loading.service({
			lock: true,
			text: "拼命加载中....",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)"
			});
		},
		closeBigLoading() {
			this.loadingInstance.close();
		},
		feeSearch() {
			this.$router.push('/feesManagement/queryFees')
		},
		selectByPhone(val) {
			if (val.length >= 5) {
				this.loading = true
				this.userOptions = []
				roleManagementService.selectUserByPhone(val)
				.then(res => {
					for(let i = 0; i < res.data.length; i++) {
						this.userOptions.push({userId: res.data[i].id, username: res.data[i].username, phone: res.data[i].phone})
					}
				})
				this.loading = false
			} else {
				this.userOptions = []
			}
		},
		changeOwner() {
			if (this.selectedUserId === null || (this.houseDetail.user && this.selectedUserId === this.houseDetail.user.id)) {
				this.$alert('请选择一位新的业主', '提示', {
					confirmButtonText: '确定',
				});
			} else {
				this.confirmDialogVisible = true
			}
		},
		updateOwner() {
			this.openBigLoading()
			let houseId = this.houseDetail.id
			let userId = this.selectedUserId
			houseService.updateOwner(houseId, userId)
			.then(response => {
				setTimeout(() => {
					this.closeBigLoading()
					this.confirmDialogVisible = false
					if (response.data === false) {
						this.$alert('更新业主失败，请先将此房屋物业费缴清！', '错误', {
							confirmButtonText: '知道了',
							type: 'error',
							showClose: false
						});
					} else {
						this.$alert('更新业主成功！', '提示', {
							confirmButtonText: '知道了',
							type: 'success',
							showClose: false,
							callback: action => {
								this.selectDialogVisible = false,
								this.getHouseDetail()
							}
						});
					}
				}, 500);
			})
			.catch(error => {
				console.log(error)
				this.$message.error('更新失败')
			})
		}
	},
	watch: {
		selectDialogVisible: {
			handler(val) {
				if(val === false) {
					this.selectedUserId = '',
					this.selectUser = '',
					this.userOptions = []
				}
			}
		},
		selectedUserId: {
			handler(val) {
				if (val !== '') {
					this.selectedUser =  this.userOptions.find(function (option) {
						return option.userId === val;
					})
				}
			}
		}
	}
}
</script>

<style scoped>

</style>