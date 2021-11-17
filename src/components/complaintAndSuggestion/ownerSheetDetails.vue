/*
 * @Author: Harry 
 * @Date: 2019-10-15 16:45:08 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-20 14:29:39
 */

<template>
  <div class="ownerSheetDetails">
    <div class="btn-group">
      <el-button class="back-btn" icon="el-icon-back" @click="goBack()" circle></el-button>
      <el-button
        class="timeLine-btn"
        @click="showTimeLine = !showTimeLine"
        icon="el-icon-time"
      >{{this.timeLineMesage}}</el-button>
    </div>

    <el-collapse-transition>
      <div v-show="showTimeLine" class="ownerSheetDetails-block">
        <el-timeline>
          <el-timeline-item
            v-for="(item,index) in this.timelineList"
            :key="index"
            :timestamp="item.processingTimeShow"
            placement="top"
          >
            <el-card>
              <h4 class="card-height">{{item.message}}</h4>
              <p class="card-height">提交者: {{item.processingUserNickName}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-collapse-transition>

    <div class="sheet-details">
      <span>主题: {{this.title}}</span>
      <el-divider></el-divider>
      <span>申请单类型: {{this.sheetType}}</span>
      <el-divider></el-divider>
      <span>状态: {{this.state}}</span>
      <el-divider></el-divider>
      <span>
        内容:
        <div class="ql-container ql-snow">
          <div class="ql-editor" data-gramm="false" contenteditable="false">
            <span v-html="this.content">{{this.content}}</span>
          </div>
        </div>
      </span>
      <el-divider></el-divider>
      <div class="img-group">
        <!-- <img v-for="(item,index) in this.imageList" :key="index" :src="item.path"/> -->

        <!-- 因为谷歌浏览器不能用绝对路径访问本地浏览器，所以暂用这个代替-->
        <img
          v-for="(item,index) in this.imageList"
          :key="index"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571168248685&di=db57156a9e4e9f74aa95823f99434535&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180706%2Fda7d85175922451f942f795596e96bec.jpeg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "ownerSheetDetails",
  data() {
    return {
      timelineList: [],
      imageList: [],
      showTimeLine: false,
      title: "",
      content: "",
      sheetType: "",
      state: "",
      timeLineMesage: "打开时间线"
    };
  },
  methods: {
    goBack() {
      this.$store.commit("complaintAndSuggestion/changeIsOwnerSheetDetails");
    }
  },
  computed: mapState({
    ownerSheetData: state => state.complaintAndSuggestion.ownerSheetData,
    isOwnerSheetDetails: state =>
      state.complaintAndSuggestion.isOwnerSheetDetails
  }),
  created() {
    this.timelineList = this.ownerSheetData.timelineList;
    // console.log(this.timelineList);
    // console.log(this.ownerSheetData);
    this.title = this.ownerSheetData.title;
    this.content = this.ownerSheetData.message;
    this.sheetType = this.ownerSheetData.sheetType;
    this.state = this.ownerSheetData.state;
    this.imageList = this.ownerSheetData.imageList;
  },
  watch: {
    showTimeLine: function() {
      if (this.timeLineMesage == "打开时间线") {
        this.timeLineMesage = "关闭时间线";
      } else {
        this.timeLineMesage = "打开时间线";
      }
    }
  }
};
</script>


<style scoped>
.el-timeline {
  /* width: 500px; */
}

.card-height {
  height: 20px;
}

.el-timeline-item {
  text-align: left;
  /* width: 400px; */
}

.el-timeline {
  margin-top: 14px;
  margin-bottom: 14px;
}

.back-btn {
  float: left;
}

.timeLine-btn {
  float: right;
}

.btn-group {
  height: 40px;
}

.sheet-details {
  line-height: 30px;
  text-align: left;
  margin-top: 40px;
  margin-left: 10px;
}

.img-group img {
  width: 250px;
  height: 250px;
  /* margin-left: 60px; */
  /* display: block; */
  margin: 5%;
}

.ql-container.ql-snow{
  border-radius: 5px;
}
</style>
