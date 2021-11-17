/*
 * @Author: Harry 
 * @Date: 2019-10-09 19:33:10 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-19 18:29:20
 */


<template>
  <div class="roleManagement">
    <div class="table">

      <modelLabel icon="el-icon-s-custom" title="用户管理"/>

      <div class="container">

        <div class="handle-box">
          <el-input v-model="content" placeholder class="handle-input mr10"></el-input>
          <el-select class="search-select" v-model="content_type" placeholder="请选择查询类型">
            <el-option label="全部" value="0"></el-option>
            <el-option label="用户账号" value="1"></el-option>
            <el-option label="昵称" value="2"></el-option>
            <el-option label="角色" value="3"></el-option>
          </el-select>
          <el-button class="search-btn" type="primary" icon="search" @click="search">搜 索</el-button>
          <el-button class="search-btn" type="success"  @click="addUser">新增用户</el-button>
        </div>

        <!--列表-->
        <el-table
          :data="tableData"
          highlight-current-row
          max-height="700"
          v-loading="listLoading"
          @selection-change="selsChange"
          style="width: 100%;"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="username" label="用户账号"></el-table-column>
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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

    <userEditDialog />
    <userAddDialog/>
  </div>
</template>

<script>
import roleManagementService from "@/service/roleManagement/roleManagementService";
import userEditDialog from "@/components/role/userEditDialog";
import userAddDialog from "@/components/role/userAddDialog";
import { mapState } from "vuex";
import modelLabel from "@/components/public/modelLabel"

export default {
  name: "roleManagement",
  components: {
    userEditDialog,
    userAddDialog,
    modelLabel
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      sels: [], //列表选中列
      content: "",
      content_type:"全部",
      pageType:0,
      preContent:""
    };
  },
  created() {
    this.getLogList(this.pageNo, this.pageSize);
  },
  methods: {
    search() {
      // console.log(this.content_type)

      this.initPage();
      if(this.content_type == 0 || this.content_type == "全部"){
        this.getLogList(this.pageNo,this.pageSize,this.content_type);
      }
      else{
        // console.log(this.content)
        this.getLogList(this.pageNo,this.pageSize,this.content_type,this.content);
      }
    },

    //重置page属性
    initPage(){
      this.pageNo = 1;
      this.pageSize = 10;
    },
    //获取用户列表
    getLogList(pageNo, pageSize,ttype,content) {
      let _this = this;
      this.listLoading = true;

      if(ttype >= 1){
        this.pageType = ttype;
        this.preContent = content;
      }

      let res = roleManagementService.getUserList(pageNo, pageSize,ttype,content);

      res.then(response => {
        // console.log(response)

        if (response.flag) {
          _this.tableData = response.data.list;
          _this.total = response.data.total;

          roleManagementService.showRole(_this);
        }
        _this.listLoading = false;
      });
    },
    getLogListByType(pageNo,pageSize){
      if(this.pageType < 1){
        this.getLogList(pageNo, pageSize);
      }
      else{
        this.getLogList(pageNo, pageSize,this.pageType,this.preContent);
      }
    },
    //点击页码事件
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getLogListByType(pageNo,this.pageSize);
    },
    //改变分页大小事件
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getLogListByType(this.pageNo, pageSize);
    },
    //删除
    handleDel(index, row) {
      // console.log(index);
      // console.log(row);

      var _this = this;
      _this
        .$confirm("确认删除该用户吗?", "提示", {
          type: "warning"
        })
        .then(function() {
          let res = roleManagementService.delUser(row.id);

          res.then(response => {
            // console.log(response)
            _this.getLogListByType(_this.pageNo, _this.pageSize);
          });

          _this.$message({
            message: "账号" + row.username + "删除成功",
            type: "success"
          });
        })
        .catch(function() {
          // _this.$message({
          //   message: row.id + "删除失败",
          //   type: "error"
          // });
        });
    },
    selsChange(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove() {
      var _this = this;
      _this
        .$confirm("确认批量删除用户吗?", "提示", {
          type: "warning"
        })
        .then(function() {
          //请用请求进行删除
          _this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function() {
          _this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    //编辑
    handleEdit(index, row) {
      // console.log(index);
      // console.log(row);

      this.$store.commit("roleManagement/changeShowUserEditDialog");
      this.$store.commit("roleManagement/setUserInfo", row);
    },
    addUser(){
      this.$store.commit("roleManagement/changeShowAddUserDialog");
    }
  },
  computed: mapState({
    isRefresh: state => state.roleManagement.isRefresh,
  }),
  watch:{
    isRefresh:function(){
      this.getLogList(this.pageNo, this.pageSize);
    }
  }
};
</script>


<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.search-btn {
  margin-left: 50px;
}

.search-select{
  margin-left: 40px;
  width: 110px;
}

.el-table{
  max-height:100% !important;
}

</style>
