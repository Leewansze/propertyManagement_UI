<template>
  <div class="house-detail-index">
    <!-- 房屋详情数据控制模块 -->
    <house-detail-control-model/>

  </div>  
</template>

<script>
  import houseDetailControlModel from "../../components/houseDetail/houseDetailControlModel";
  export default {
    name: "houseDetailIndex",
    components: {
      houseDetailControlModel,
    }
  }
</script>

<style scoped>

</style>