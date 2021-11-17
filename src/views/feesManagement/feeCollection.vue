<template>
  <div class="payFees">
		<div>
      <modelLabel icon="el-icon-wallet" title="费用收取" />
    </div>
		<div class="payFees-table">
      <div class="container">
        <div>
          <el-row type="flex" justify="end" style="margin-bottom: 0px;">
            <el-col :span="4">
              <el-button type="primary" size="medium" @click="addRecord">
                发布物业费用
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="payFees-judge">
          <el-table
            :data="tableData"
            highlight-current-row
            max-height="700"
            v-loading="listLoading"
            style="width: 100%;"
          >
						<el-table-column label="序号" min-width="4%" align="center">
							<template slot-scope="scope">
								{{(pageNo - 1) * pageSize + scope.$index + 1}}
							</template>
						</el-table-column>

						<el-table-column prop="publishTime" label="发布时间" min-width="15%"></el-table-column>

            <el-table-column prop="paymentName" label="费用名称" min-width="15%"></el-table-column>

            <el-table-column prop="price" label="费用价格(元/m²)" min-width="15%"></el-table-column>

            <el-table-column prop="publisherName" label="发布人" min-width="15%"></el-table-column>

            <el-table-column prop="statusCode" label="发布状态" min-width="15%">
              <template slot-scope="scope">
                <el-tag
                  :type="(scope.row.status ? 'success' : 'warning')"
                  disable-transitions
                >{{scope.row.statusCode}}</el-tag>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
						<el-pagination
							background
							layout="total, sizes, prev, pager, next, jumper"
							:total="this.rowCount"
							:page-size="this.pageSize"
							:current-page="1"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
						></el-pagination>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modelLabel from "@/components/public/modelLabel";
import feeCollectionService from '../../service/feesManagement/feeCollectionService'
export default {
	name: 'feeCollection',
	components: {
    modelLabel
  },
	data () {
		return {
			pageNo: 1,
			pageSize: 10,
			rowCount: 0,
			tableData: [],
			listLoading: false,
		}
	},
	created () {
		this.getList(this.pageNo, this.pageSize)
	},
	methods: {
		handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getList(pageNo, this.pageSize);
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getList(this.pageNo, pageSize);
		},
		getList(pageNo, pageSize) {
			this.listLoading = true
			let res = feeCollectionService.findAll(pageNo, pageSize)
			res.then(response => {
				setTimeout(() => {
					res = response
					this.tableData = res.data.list
					this.rowCount = res.data.totalElements
					this.listLoading = false
				}, 500);
			})
		},
		addRecord() {
			this.$prompt('请输入费用价格(元/m²)', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPlaceholder: '元/m²',
				inputPattern: /^(\+)?\d+(\.\d+)?$/,
				inputErrorMessage: '请输入正确的价格'
			}).then(({ value }) => {
				this.confirm(value)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});  
			});
		},
		confirm(value) {
			this.$confirm('确认发布收取物业费用' + value + '元/m²吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '修改',
				type: 'warning'
			}).then(() => {
				this.publish(value)
			}).catch(() => {
				this.addRecord()          
			});
		},
		publish(price) {
			let userId = this.$store.getters['user/getId']
			let res
			feeCollectionService.publish(price, userId)
			.then(response => {
				res = response
				if(res.flag) {
					setTimeout(() => {
						this.$message({
							type: 'success',
							message: '提交发布申请成功'
						});
						setTimeout(() => {
							this.getList(1, 10)
						}, 500);
					}, 1000);
				}
			})
			.catch(error => {
				console.log(error)
				this.$message({
					type: 'warning',
					message: '发布失败'
				});
			})
		}
	}
}
</script>

<style>

</style>