/*
 * @Author: Harry 
 * @Date: 2019-10-18 00:26:35 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-19 01:29:20
 */


<template>
  <div class="logFileManagement">
    <!-- logFileManagement -->
    <div class="log-icon">
      <modelLabel icon="el-icon-s-order" title="日志文件管理" />
      <div class="log-download">
        <el-button type="primary" size="medium" @click="downLoadLogFile">
          日志下载
          <i class="el-icon-download el-icon--right"></i>
        </el-button>
      </div>
    </div>

    <div class="log-header">
      <el-row>
        <el-col :span="2">
          <div class="log-back">
            <el-page-header v-show="this.breadcrumbList.length != 1" @back="goBack"></el-page-header>
          </div>
        </el-col>

        <el-col :span="18">
          <div class="log-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="log-file-main">
      <el-row :gutter="160" class="row-bg" justify="start">
        <el-col v-for="(item,index) in this.fileList" :key="index" :span="2">
          <div
            @click="fileClick(item.fileName,item.isDir)"
            class="grid-content bg-purple log-folder"
          >
            <div class="log-checkbox">
              <!-- @mouseenter="onMouseOver(item.fileName)"
              @mouseleave="onMouseOut(item.fileName)"-->
              <!-- <el-checkbox v-show="showList[item.fileName]"></el-checkbox> -->
            </div>
            <li>
              <i v-if="item.isDir === 1" class="el-icon-folder" />
              <i v-else class="el-icon-document" />
            </li>

            <li v-for="(namePart,i) in item.nameList" :key="i" class="log-li-text">
              <span class="log-file-text">
                {{namePart}}
              </span>
            </li>
          </div>
        </el-col>
      </el-row>
    </div>

    <logFileDownLoadDialog />
  </div>
</template>

<script>
import modelLabel from "@/components/public/modelLabel";
import logFileService from "@/service/logManagement/logFileService";
import { mapState } from "vuex";
import { Loading } from "element-ui";
import util from "@/service/util";
import logFileDownLoadDialog from "@/components/log/logFileDownLoadDialog";

export default {
  name: "logFileManagement",
  components: {
    modelLabel,
    logFileDownLoadDialog
  },
  data() {
    return {
      breadcrumbList: ["全部"],
      fileList: [],
      showList: {},
      preFileName: ""
    };
  },
  methods: {
    getFileList(fileName) {
      let res = logFileService.getLogFileListByFileName(fileName);

      res.then(response => {
        console.log(response);
        this.fileList = response.data;
        this.setFileName();
        // this.setCheckboxShowList();
      });
    },
    setFileName() {
      for (let i = 0; i < this.fileList.length; i++) {
        this.fileList[i].nameList = [];
        let fileName = this.fileList[i].fileName;
        if (fileName.length > 14) {
          this.fileList[i].nameList.push(fileName.substring(0, 14));
          this.fileList[i].nameList.push(fileName.substring(14));
        } else {
          this.fileList[i].nameList.push(fileName);
        }
      }
    },
    setCheckboxShowList() {
      // console.log(this.checkBoxShowList)
      this.$store.commit("logManagement/clearCheckBoxShowList");
      for (let i = 0; i < this.fileList.length; i++) {
        this.$store.commit("logManagement/setCheckBoxShowList", {
          key: this.fileList[i].fileName,
          val: false
        });
      }
      // console.log(this.checkBoxShowList)
    },
    onMouseOver(idx) {
      console.log(idx);
      console.log(this.showList);
      this.$store.commit("logManagement/setCheckBoxShowList", {
        key: idx,
        val: true
      });

      this.showList[idx] = true;
      this.$set(this.showList, idx, true);
      console.log(this.showList);
    },
    onMouseOut(idx) {
      //   console.log(idx)
      this.$store.commit("logManagement/setCheckBoxShowList", {
        key: idx,
        val: false
      });
      this.showList[idx] = false;
      this.$set(this.showList, idx, false);
    },
    fileClick(idx, isDir) {
      //   console.log(idx);
      if (isDir === 1) {
        this.preFileName = this.fileList[0].preLevelName;
        this.fileLoading(idx);
        this.breadcrumbList.push(idx);
      }
      //   console.log(this.checkBoxShowList)
    },
    fileLoading(fileName) {
      let loadingInstance = Loading.service({
        lock: true,
        text: "拼命加载中....",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      util.sleep(500).then(() => {
        this.getFileList(fileName);
        loadingInstance.close();
      });
    },
    goBack() {
      // console.log(this.preFileName)
      this.fileLoading(this.preFileName);
      this.breadcrumbList.pop();
    },
    downLoadLogFile() {
      this.$store.commit("logManagement/setDownLoadFileList", this.fileList);
      this.$store.commit("logManagement/changeIsShowDogFileDownLoadDialog");
    }
  },
  created() {
    this.preFileName = "root";
    this.getFileList("root");
  },
  computed: mapState({
    checkBoxShowList: state => state.logManagement.checkBoxShowList,
    name: state => state.logManagement.name
  })
};
</script>


<style scoped>
.log-header {
  margin-top: 30px;
}

.log-back {
  width: 150px;
}
.el-page-header__title {
  font-size: 16px;
}

.log-breadcrumb {
  /* margin-top: 30px; */
}

.el-breadcrumb {
  margin-top: 4px;
  margin-left: 4px;
  font-size: 16px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
  margin-right: 0px !important;
  margin-left: -80px !important;
}

.log-folder {
  font-size: 50px;
  width: 150px;
  height: 100px;
  line-height: 0px;
  position: relative;
  margin-top: 20px;
}

.log-file-text {
  font-size: 14px;
  display: inline;
  /* height: 130px;
  width: 130px; */
}

.log-li-text {
  height: 17px;
  /* width: 130px; */
}

.log-checkbox {
  margin-left: 130px;
  height: 10px;
}

.log-file-main {
  /* margin-left: 70px; */
  margin-top: 20px;
  margin-right: 0px !important;
}

li {
  list-style: none;
}

.log-icon {
  /* display: inline-block; */
  width: 100%;
  height: 100%;
}

.log-download {
  float: right;
  line-height: 0px;
}
</style>
