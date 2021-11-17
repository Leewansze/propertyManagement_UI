/*
 * @Author: Harry 
 * @Date: 2019-10-25 13:01:15 
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-16 18:21:41
 */

<template>
  <div class="payFees">
    <!-- payFees -->
    <div>
      <modelLabel icon="el-icon-wallet" title="费用缴纳" />
    </div>

    <div class="payFees-table">
      <div class="container">
        <div>
          <el-row type="flex" justify="end" style="margin-bottom: 0px;">
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

            <el-table-column label="支付方式" width="300">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  :disabled=scope.row.isPaid
                  @click="handleAliPay(scope.$index, scope.row)"
                  icon="iconfont icon-zhifubao"
                >
                  <span class="btn-text">支付宝</span>
                </el-button>

<!--                <el-button-->
<!--                  type="success"-->
<!--                  size="small"-->
<!--                  :disabled=scope.row.isPaid-->
<!--                  @click="handleWxPay(scope.$index, scope.row)"-->
<!--                  icon="iconfont icon-weixin"-->
<!--                >-->
<!--                  <span class="btn-text">微 信</span>-->
<!--                </el-button>-->
              </template>
            </el-table-column>
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

    <alipayDialog />
  </div>
</template>

<script scoped>
import modelLabel from "@/components/public/modelLabel";
import payFeesService from "@/service/feesManagement/payFeesService";
import alipayDialog from "@/components/feesManagement/alipayDialog";
import util from "@/service/util";
import { Loading } from "element-ui";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  name: "payFees",
  components: {
    modelLabel,
    alipayDialog
  },
  data() {
    return {
      dialogOpen: false,
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      prePageNo: 1,
      prePageSize: 10,
      listLoading: false,
      loadingInstance: "",
      time: ''
    };
  },
  methods: {
    handleAliPay(index, row) {
    //   console.log(index);
    //   console.log(row);
     
      // this.openBigLoading();
      // let res = payFeesService.alipayQRCode(row.outTradeNo);
      // res.then(response => {
      //   //   console.log(response);
      //     if (response.flag) {
      //       let imageUrl = util.base64ToImageUrl(response.data);
            
      //       this.$store.commit("feesManagement/changeShowAliPayDialog");
      //       this.$store.commit("feesManagement/setAliPayImageUrl", imageUrl);
      //       this.openAlipaySocket();
      //     } else {
      //       this.errorMes();
      //     }

      //     this.closeBigLoading();
      //   })
      //   .catch(error => {
      //     this.errorMes();
      //     this.closeBigLoading();
      //   });
      
      this.openBigLoading();
      let res = payFeesService.alipayPcpay(row.outTradeNo);
      res.then(response => {
        if(!response) {
          this.errorMes();
          this.closeBigLoading();
        } else {
          setTimeout(() => {
            let div = document.createElement('divform');
            div.innerHTML = response;
            document.body.appendChild(div);
            document.forms[0].acceptCharset='utf-8';
            document.forms[0].submit();
          }, 500);
        }
      });
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getList(pageNo, this.pageSize);
    },
    //改变分页大小事件
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getList(this.pageNo, pageSize);
    },
    getList(pageNo, pageSize) {
      this.setPrePage(pageNo, pageSize);
      this.openTableLoading();
      let res
      if(this.time) {
        let from = this.time[0]
        let fromYear = from.getFullYear()
        let fromMonth = from.getMonth() + 1
        let to = this.time[1]
        let toYear = to.getFullYear()
        let toMonth = to.getMonth() + 1
        res = payFeesService.searchOwnerTimeRangeFeesList(pageNo - 1, pageSize, fromYear, fromMonth, toYear, toMonth)
      } else {
        res = payFeesService.getOwnerUnPayFeesList(pageNo - 1, pageSize);
      }

      res
        .then(response => {
        //   console.log(response);

          this.tableData = response.data.list;
          this.total = response.data.totalElements;
          this.closeTableLoading();
        })
        .catch(error => {
          this.$message.error("系统出错，请稍后再试!");
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
      if (mes == "未支付") {
        return "danger";
      } else if (mes == "已支付") {
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
    openAlipaySocket() {
      var socket = new SockJS("http://127.0.0.1:8519/endpointHarry");
      this.stompClient = Stomp.over(socket);

      let a = this.stompClient;
      let that = this;
      this.stompClient.connect({}, function(frame) {
        a.subscribe("/topic/alipayCallback", function(response) {
          if (response.body === "success") {
            that.$store.commit("feesManagement/changeShowAliPayDialog");
            that.getList(that.pageNo, that.pageSize);
          }
        });
      });
    },
    closeAlipaySocket() {
      this.stompClient.disconnect();
    },
    search() {
      this.pageNo = 1
      this.pageSize = 10
      this.getList(this.pageNo, this.pageSize);
    }
  },
  created() {
    this.getList(this.pageNo, this.pageSize);
  },
  destroyed() {
    if (this.$store.getters['feesManagement/getShowAliPayDialog']) {
      this.closeAlipaySocket();
    }
  },
  watch: {
    time: {
      handler(val) {
        if(!val){
          this.pageNo = 1
          this.pageSize = 10
          this.getList(this.pageNo, this.pageSize);
        }
      }
    }
  }
};
</script>


<style scoped>
.payFees {
  height: 100%;
}

.payFees-table {
  height: 100%;
}

.payFees-judge {
  height: 100%;
}

.btn-text {
  margin-left: 10px;
  font-size: 15px;
}
</style>
