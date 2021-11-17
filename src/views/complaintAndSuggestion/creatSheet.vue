/*
 * @Author: Harry 
 * @Date: 2019-10-13 16:00:35 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-20 17:25:17
 */

<template>
  <div class="creatSheet">
    <div>
      <modelLabel icon="el-icon-edit-outline" title="投诉检验单申请" />
    </div>
    <div class="creatSheet-container">
      <div v-loading="sheetLoading" class="container">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="form-item-text" label="主题:">
            <el-input v-model="form.title"></el-input>
          </el-form-item>

          <el-form-item class="form-item-text" label="类型:">
            <el-select v-model="form._type" placeholder="请选择类型">
              <el-option label="投诉" value="投诉"></el-option>
              <el-option label="建议" value="建议"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-item-text form-content">
            <!-- <el-input class="sheet-textarea" :rows="10" type="textarea" v-model="form.mes"></el-input> -->
            <div class="sheet-textarea edit_container">
              <quill-editor
                v-model="form.mes"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              ></quill-editor>
            </div>
          </el-form-item>

          <el-form-item class="upload-form-item">
            <el-upload
              class="upload-demo"
              action="/api/fileUpload/uploadComplaintAndSuggestionImage"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              drag
              name="files"
              ref="upload"
              :auto-upload="false"
              :multiple="true"
              :http-request="uploadFile"
              :before-upload="beforeUploadImage"
              :limit="3"
              :on-exceed="exceedLimit"
              :on-change="onProgress"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">最多只能上传3张图片，只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>

          <el-form-item class="form-bottom">
            <!-- <div class="btn-group">
              <el-button size="large" type="primary" @click="subPicForm">提 交</el-button>
              <el-button size="large" class="btn-group-right">取 消</el-button>
            </div>-->
          </el-form-item>
          <div class="btn-group">
            <el-button size="large" type="primary" @click="subPicForm">提 交</el-button>
            <el-button size="large" class="btn-group-right" @click="reSet">重 置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import modelLabel from "@/components/public/modelLabel";
import service from "@/service/complaintAndSuggestion/creatSheetService";
import axios from "axios";
import util from "@/service/util";

import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "creatSheet",
  components: {
    modelLabel,
    quillEditor
  },
  data() {
    return {
      form: {
        title: "",
        _type: "",
        mes: ""
      },
      fileList: [],
      formDate: "",
      sheetLoading: false,
      isUpload: false,

      editorOption: {}
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件

    reSet() {
      this.initParm();
    },
    onProgress(file, fileList) {
      // console.log(event)
      // console.log(file)
      let flag = this.beforeUploadImage(file);
      // console.log(flag);
      if (flag) {
        this.fileList.push(file);
      } else {
        fileList.pop();
        this.$message.error("上传的图片 " + file.name + " 不符合要求！");
      }
    },
    exceedLimit(files, fileList) {
      // console.log(files)
      // console.log(fileList)
      this.$message.warning("最多只能上传三张图片!");
    },
    beforeUploadImage(file) {
      // console.log(file)
      // console.log(this.getFileSuffix(file.name))
      let isJPEG = this.getFileSuffix(file.name) === "jpeg";
      let isJPG = this.getFileSuffix(file.name) === "jpg";
      let isPNG = this.getFileSuffix(file.name) === "png";
      let isLt2M = file.size / 1024 / 1024 < 2;

      let flag = true;
      // console.log(flag)
      if (!isJPEG && !isJPG && !isPNG) {
        console.log("type no");
        flag = false;
      } else if (!isLt2M) {
        console.log("2M");
        flag = false;
      }

      // console.log(flag);
      this.isUpload = flag;
      return flag;
    },
    getFileSuffix(fileName) {
      let idx = fileName.indexOf(".");
      if (idx == -1) {
        return undefined;
      }

      return fileName.substring(idx + 1);
    },
    uploadFile(file) {
      // console.log(file);
      // this.fileList.push(file)
      this.formDate.append("files", file.file);
    },
    subPicForm() {
      if (this.judge()) {
        return;
      }
      // console.log(this.fileList)

      let that = this;
      that.sheetLoading = true;

      let res = service.create(this.form.title, this.form._type, this.form.mes);

      res.then(response => {
        //   console.log(response)
        //   console.log(this.fileList)
        let res2 = service.uploadImage(this, response.data.sheetId);

        res2.then(response2 => {
          // console.log(response2)
          that.sheetLoading = false;
          that.initParm();
          util.message(that, "提交成功!", "success");
        });
      });
    },
    initParm() {
      this.form.title = "";
      this.form._type = "";
      this.form.mes = "";
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      // console.log(file);
      // console.log(fileList)
      // console.log(this.fileList)
      for(let i = 0;i < this.fileList.length;i++){
        if(file.name === this.fileList[i].name){
          this.fileList.splice(i,1);
          break;
        }
      }
      // console.log(this.fileList)
    },
    handlePreview(file) {
      console.log(file);
    },
    judge() {
      // console.log(this.form.title)
      // console.log(this.form._type)
      // console.log(this.form.mes)
      if (
        this.form.title == "" ||
        this.form._type == "" ||
        this.form.mes == ""
      ) {
        this.$message({
          message: "所有内容不能为空!",
          type: "error"
        });
        return true;
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>


<style scoped>
.creatSheet-container {
  padding-left: 200px;
  padding-right: 200px;
}

.container {
  /* height: 1000px; */
  margin-top: 50px;
}

.form-item-text {
  margin-bottom: 70px;
  text-align-last: justify;
}

.el-form-item__content {
  margin-left: 100px !important;
}

.el-select {
  width: 100%;
}

.btn-group {
  text-align: center;
  /* margin: 0 auto; */
  /* margin-left: 30%; */
}

.btn-group-right {
  margin-left: 150px;
}

.form-bottom {
  margin-top: 70px;
  text-align: center;
  text-align-last: center;
}

.el-upload__tip {
  margin-top: 30px;
  margin-bottom: 30px;
}

.el-upload-list {
  margin-top: 30px !important;
}

.sheet-textarea {
  /* text-align-last: auto;  */
}

.form-content {
  /* margin-bottom: 270px; */
  height: 280px;
  text-align-last: initial;
}

.edit_container {
  text-align: left;
  line-height: 0;
}

.quill-editor {
  height: 250px;
}

</style>
