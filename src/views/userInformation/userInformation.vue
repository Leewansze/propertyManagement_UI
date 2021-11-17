<template>
  <div class="user-information">
		<el-page-header @back="home" content="个人资料"/>
		<div style="margin-top:10px;">
			<el-form style="text-align:left;" label-width="80px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="真实姓名">
							{{this.user.username}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号">
							{{this.user.phone}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="昵称">
							{{this.user.nickname}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="邮箱地址">
							{{this.user.emailAddress}}
							<el-button type="text" 
								@click="inputEmail"
								style="margin-left:35px;">
								{{this.user.emailAddress ? '更换邮箱' : '绑定邮箱'}}
							</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<el-dialog>
		</el-dialog>
  </div>
</template>

<script>
import routerApi from '@/service/api/routerApi'
import userInformationService from '../../service/userInformation/userInformationService'
export default {
	name: 'userInformation',
	data () {
		return {
			user: '',
			id: '',
			emailAddress: '',
		}
	},
	created () {
		let userId = this.$store.getters['user/getId']
		this.id = this.$route.query.userId === undefined ? null : this.$route.query.userId
		this.emailAddress = this.$route.query.emailAddress === undefined ? null : this.$route.query.emailAddress
		let token = this.$route.query.token === undefined ? null : this.$route.query.token
		if(this.id === null && this.emailAddress === null && token === null) {
			userInformationService.selectUserById(userId)
			.then(response => {
				let res = response
				this.user = res.data
				if ((this.user.emailAddress === null || this.user.emailAddress.length === 0) && this.emailAddress === null) {
					this.inputEmail()
				}
			})
		} else if(this.id !== null && this.emailAddress !== null && token !== null) {
			let res
			userInformationService.emailConfirm(this.id, this.emailAddress, token)
			.then(response => {
				res = response
				if (res.flag === true) {
					this.$alert('邮箱绑定成功！', '提示', {
						confirmButtonText: '确定',
						type: 'success',
						showClose: false,
						callback: action => {
							window.location.replace("http://localhost:8087/#" + routerApi.userInformation.getUrl())
							location.reload()
						}
					});
				} else {
					this.$alert(res.message, '提示', {
						confirmButtonText: '确定',
						type: 'error',
						showClose: false,
						callback: action => {
							window.location.replace("http://localhost:8087/#" + routerApi.userInformation.getUrl())
							location.reload()
						}
					});
				}
			})
		}
	},
	methods: {
		home() {
			this.$router.push(routerApi.getHome())
		},
		inputEmail() {
			this.$prompt('请输入邮箱', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
					if(!value) {
						return '邮箱不能为空'
					} else if (!value.match(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)) {
						return '邮箱格式不正确';
					} else {
						this.emailTest(value)
						return true
					}
				},
				showClose: (this.user.emailAddress === null || this.user.emailAddress.length === 0) ? false : true,
				showCancelButton: (this.user.emailAddress === null || this.user.emailAddress.length === 0) ? false : true,
				closeOnClickModal: (this.user.emailAddress === null || this.user.emailAddress.length === 0) ? false : true,
			}).then(({ value }) => {
				this.showConfirm(value)
			})
		},
		showConfirm(value) {
			this.$confirm('确定绑定邮箱为' + value + '吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '回去修改',
				type: 'warning',
				showClose: false
			}).then(action => {
				let userId = this.user.id
				this.sendEmailConfirm(userId, value)
			}).catch(() => {
				this.inputEmail()      
			});
		},
		sendEmailConfirm(userId, value) {
			userInformationService.sendEmailConfirm(userId, value)
			.then(response => {
				if (response.flag === true) {
					this.$message({
						type: 'success',
						message: '一封邮件已发到您的邮箱中，请按邮件提示进行验证!',
						duration: 5000,
						showClose: true
					})
				} else {
					this.$message({
						type: 'warning',
						message: '邮件发送失败!',
						duration: 5000,
						showClose: true
					})
				}
			})
		},
		emailTest(email) {
			console.log(email)
			let res = userInformationService.emailTest(email)
			console.log(res)
		}
	}
}
</script>

<style scoped>

</style>