<template>
  <div class="test">
    <el-button @click="back">返回</el-button>
    楼盘子页面
  </div>
</template>

<script>
  export default {
    name: "test",
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.test{
  line-height: 0px;
}
</style>