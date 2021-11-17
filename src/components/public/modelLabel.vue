/*
 * @Author: Harry 
 * @Date: 2019-10-11 00:50:37 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-11 00:52:39
 */

<template>
  <div class="modelLabel">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i :class="icon"></i> {{title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "modelLabel",
  props: {
    icon: String,
    title: String
  }
};
</script>


<style>
</style>
