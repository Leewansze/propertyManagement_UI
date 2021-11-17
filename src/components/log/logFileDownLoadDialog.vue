/*
 * @Author: Harry 
 * @Date: 2019-10-18 14:38:20 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-18 22:58:49
 */

<template>
  <div class="logFileDownLoadDialog">
    <!-- logFileDownLoadDialog -->
    <el-dialog title="选择要下载的日志" :visible.sync="dialogVisible" width="30%">
      <!-- <span>这是一段信息</span> -->

      <el-button size="mini" @click="setCheckedKeys">
          <span v-if="!isAll">
              全选
          </span>
          <span v-else>
              取消
          </span>
        </el-button>
      
      <el-tree :data="downLoadList" show-checkbox ref="tree" node-key="id" @check-change="handleCheckChange">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i :class="data.icon"></i>
            {{ data.label }}
          </span>
        </span>
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downLoadFileBtnClick">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import logFileService from "@/service/logManagement/logFileService";
import { Loading } from "element-ui";
import util from "@/service/util";

export default {
  name: "logFileDownLoadDialog",
  data() {
    return {
      dialogVisible: false,
      downLoadList: [],
      selectedList: [],
      idList:[],
      isAll:false,
    };
  },
  methods: {
      setCheckedKeys() {
        // console.log(this.$refs.tree.setCheckedKeys([3]))
        if(!this.isAll){
            for(let i = 0;i < this.idList.length;i++){
                this.$refs.tree.setCheckedKeys(this.idList)
            }
        }
        else{
            this.$refs.tree.setCheckedKeys([])
        }
        this.isAll = !this.isAll;
      },
    downLoadFileBtnClick() {
    //   console.log("@");
      if (this.selectedList.length > 0) {
        logFileService.downloadLog(this.selectedList);

        let loadingInstance = Loading.service({
          lock: true,
          text: "下载中请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        util.sleep(500).then(() => {
          loadingInstance.close();
          this.dialogVisible = false;
        });
      } else {
        this.dialogVisible = false;
      }
    },
    changeVisible() {
      
      if(this.isAll){
          this.$refs.tree.setCheckedKeys([])
          this.isAll = !this.isAll;
      }

      this.dialogVisible = !this.dialogVisible;
      this.selectedList = [];
      this.setFileList();
      this.setIdList();
    },
    setIdList(){
        let list = [];

        for(let i = 0;i < this.downLoadList.length;i++){
            list.push(this.downLoadList[i].id);
        }

        this.idList = list;
        // console.log(this.idList);
    },
    setFileList() {
      // console.log(this.downLoadFileList)
      let list = [];

      for (let i = 0; i < this.downLoadFileList.length; i++) {
        list.push(this.fileModule(this.downLoadFileList[i]));
      }
      this.downLoadList = list;
    },
    fileModule(file) {
      let id = file.id;
      let fileName = file.fileName;
      let isDir = file.isDir;
      let level = file.level;
      let logFileList = file.logFileList;
      let path = file.path;
      let preLevelName = file.preLevelName;

      let icon;
      if (isDir === 1) {
        icon = "el-icon-folder";
      } else {
        icon = "el-icon-document";
      }

      return {
        label: fileName,
        icon: icon,

        id: id,
        fileName: fileName,
        isDir: isDir,
        level: level,
        logFileList: logFileList,
        path: path,
        preLevelName: preLevelName
      };
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
      if (checked == true) {
        this.selectedList.push(data);
      } else {
        this.selectedList.splice(this.selectedList.indexOf(data), 1);
      }
      // console.log(this.selectedList)
    }
  },
  created() {
    //   console.log(this.downLoadFileList)
  },
  computed: mapState({
    isShowDogFileDownLoadDialog: state =>
      state.logManagement.isShowDogFileDownLoadDialog,
    downLoadFileList: state => state.logManagement.downLoadFileList
  }),
  watch: {
    isShowDogFileDownLoadDialog: function() {
      this.changeVisible();
    }
  }
};
</script>


<style scoped>
.logFileDownLoadDialog {
  line-height: 0px;
}
</style>
