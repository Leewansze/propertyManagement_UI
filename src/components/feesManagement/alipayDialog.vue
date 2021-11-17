/*
 * @Author: Harry 
 * @Date: 2019-10-25 18:02:59 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-25 19:02:08
 */

<template>
  <div class="alipayDialog">
    <!-- alipayDialog -->
    <el-dialog :visible.sync="dialogFormVisible" width="30%">
        <span class="alipay-header">
            <i style="font-size:50px; color:#409EFF;" class="iconfont icon-zhifubao1"/>
            <!-- <span class="alipay-text">
                支付宝支付
            </span> -->
        </span>
        <el-divider></el-divider>
        <img :src="this.imageUrl"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "alipayDialog",
  data() {
    return {
      dialogFormVisible: false,
      imageUrl:""
    };
  },
  methods: {
    changeVisible() {
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  },
  computed: mapState({
    showAliPayDialog: state => state.feesManagement.showAliPayDialog,
    aliPayImageUrl:state => state.feesManagement.aliPayImageUrl
  }),
  watch: {
    showAliPayDialog: function() {
      this.changeVisible();
      this.imageUrl = this.aliPayImageUrl;
    }
  }
};
</script>


<style scoped>
.alipayDialog {
  line-height: 0px;
}

.alipay-text{
    /* margin-bottom: 20px; */
}


</style>
