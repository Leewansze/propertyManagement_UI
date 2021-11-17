<template>
  <div class="payFees">
    <div>
      <modelLabel icon="el-icon-wallet" title="费用查询" />
    </div>

    <div class="payFees-table">
      <div class="container">
        <div>
          <el-row type="flex" justify="end" style="margin-bottom: 0px;">
            <el-col :span="4">
              <el-cascader :options="houseOptions"
                placeholder="请选择楼栋或房屋"
                :props="{ checkStrictly: true, expandTrigger: 'hover' }"
                clearable
                filterable
                :disabled="selectDisable"
                v-model="selectedHouseValue">
              </el-cascader>
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="selectedUserId"
                filterable
                clearable
                remote
                reserve-keyword
                :disabled="selectDisable"
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
            </el-col>
            <el-col :span="4">              
              <div class="block">
                <el-date-picker
                  v-model="time"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                  :default-time="['00:00:00', '23:59:59']"
                  unlink-panels>
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="medium" @click="search">
                查找
              </el-button>
            </el-col>
          </el-row>
        </div>
        <!--列表-->
        <div class="payFees-judge">
          <el-table
            :data="tableData"
            highlight-current-row
            max-height="700"
            v-loading="listLoading"
            style="width: 100%;"
          >
            <el-table-column prop="paymentDate" label="缴纳日期" sortable width="130px;"></el-table-column>

            <el-table-column prop="paymentInfo" label="详细信息" width="450px;"></el-table-column>

            <el-table-column prop="outTradeNo" label="订单编号" width="300px;"></el-table-column>

            <el-table-column prop="paymentState" label="缴费状态">
              <template slot-scope="scope">
                <el-tag
                  :type="paymentStateTagType(scope.row.paymentState)"
                  disable-transitions
                >{{scope.row.paymentState}}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="fee" label="金额"></el-table-column>

            <el-table-column prop="ownerName" label="业主名字"></el-table-column>

            <el-table-column prop="payType" label="支付方式"></el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :page-size="pageSize"
              :current-page="pageNo"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modelLabel from "@/components/public/modelLabel";
import queryFeesService from "@/service/feesManagement/queryFeesService";
import houseService from "@/service/house/houseService";
import roleManagementService from "@/service/roleManagement/roleManagementService";
import util from "@/service/util";
import { Loading } from "element-ui";

export default {
  name: "payFees",
  components: {
    modelLabel
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      prePageNo: 1,
      prePageSize: 10,
      listLoading: false,
      loadingInstance: "",
      time: [],
      loading: false,
      selectedHouseValue: [],
      houseOptions: [],
      selectedUserId: '',
      userOptions: [],
      selectDisable: false
    };
  },
  created() {
    let res
    let that = this
    houseService.getAllHouses()
    .then(response => {
      let res = response
      let buildingMap = new Map()
      let propertyMap = new Map()
      for(let i = 0; i < res.data.length; i++) {
        let house = res.data[i]
        let building = res.data[i].building
        let buildingId = building.id
        let property = building.property
        let propertyId = property.id
        let tmp
        if (propertyMap.has(propertyId)) {
          tmp = propertyMap.get(propertyId)
        } else {
          tmp = {
            propertyId: propertyId,
            label: building.property.name,
            value: building.property.id,
            children: [],
          }
        }
        let bd, map, index
        if (buildingMap.has(buildingId)) {
          map = buildingMap.get(buildingId)
          index = map.index
          bd = map.val
        } else {
          index = tmp.children.length
          bd = {
            buildingId: buildingId,
            label: building.name,
            value: building.id,
            children: [],
          }
        }
        bd.children.push({ houseId: house.id, label: house.number, value: house.id })
        buildingMap.set(buildingId, { index: index, val: bd })

        tmp.children[index] = bd
        
        propertyMap.set(propertyId, tmp)
      }
      propertyMap.forEach(function (value, key, map) {
        that.houseOptions.push(value)
      })
      if (this.$store.getters['user/getRolename'] === '业主') {
        this.selectDisable = true
        let userId = this.$store.getters['user/getId']
        this.userOptions.push({userId: userId, username: this.$store.getters['user/getUsername'], phone: '1862087'})
        this.selectedUserId = userId
      }
      let houseId = sessionStorage.getItem('houseId')
      let buildingId = sessionStorage.getItem('buildingId')
      let propertyId = sessionStorage.getItem('propertyId')
      if(houseId !== undefined && houseId !== null) {
        this.selectedHouseValue.push(parseInt(propertyId))
        this.selectedHouseValue.push(parseInt(buildingId))
        this.selectedHouseValue.push(parseInt(houseId))
        this.search()
      }
    })
  },
  methods: {
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getList(pageNo, this.pageSize);
    },
    //改变分页大小事件
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getList(this.pageNo, pageSize);
    },
    search() {
      if (this.selectedHouseValue.length <= 1 && !this.selectedUserId) {
        this.$message.error("请选择楼栋或房屋")
      } else if (this.selectedHouseValue.length !== 3 && !this.selectedUserId) {
        this.$message.error("请选择房屋或选择业主")
      } else {
        this.pageNo = 1
        this.pageSize = 10
        this.getList(this.pageNo, this.pageSize);
      }
    },
    getList(pageNo, pageSize) {
      this.setPrePage(pageNo, pageSize);
      this.openTableLoading();
      // this.openBigLoading()
      let res
      let fromYear,toYear,fromMonth,toMonth
      if(this.time.length) {
        let from = this.time[0]
        fromYear = from.getFullYear()
        fromMonth = from.getMonth() + 1
        let to = this.time[1]
        toYear = to.getFullYear()
        toMonth = to.getMonth() + 1
      } else {
        let today = new Date()
        fromYear = 1970
        toYear = today.getFullYear()
        fromMonth = 1
        toMonth = 12
      }
      if(this.selectedHouseValue.length == 2 && this.selectedUserId) {
        let buildingId = this.selectedHouseValue[1]
        let userId = this.selectedUserId
        res = queryFeesService.searchUserBuildingFeesList(pageNo - 1, pageSize, userId, 
          buildingId, fromYear, fromMonth, toYear, toMonth)
      } else if (this.selectedHouseValue.length === 3) {
        let houseId = this.selectedHouseValue[2]
        res = queryFeesService.searchHouseFeesList(pageNo - 1, pageSize, houseId,
         fromYear, fromMonth, toYear, toMonth)
      } else if (this.selectedUserId) {
        let userId = this.selectedUserId
        res = queryFeesService.searchUserFeesList(pageNo - 1, pageSize, userId, fromYear, fromMonth, toYear, toMonth)
      }
      res
        .then(response => {
          setTimeout(() => {
            // this.closeBigLoading()
            this.closeTableLoading();
            this.tableData = response.data.list;
            this.total = response.data.totalElements;
          }, 500);
        })
        .catch(error => {
          this.$message.error("系统出错，请稍后再试!");
          this.closeBigLoading()
          this.closeTableLoading();
        });
    },
    setPrePage(pageNo, size) {
      this.prePageNo = pageNo;
      this.prePageSize = size;
    },
    openTableLoading() {
      this.listLoading = true;
    },
    closeTableLoading() {
      this.listLoading = false;
    },
    paymentStateTagType(mes) {
      if (mes === "未支付") {
        return "danger";
      } else if (mes === "已支付") {
        return "success";
      }
    },
    errorMes() {
      this.$message.error("系统繁忙请稍后再试!");
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
  },
  watch: {
    selectedUserId: {
      handler(val) {
        if (val === '' || val === undefined) {
          this.userOptions = []
        }
      }
    }
  }
};
</script>


<style>

</style>
