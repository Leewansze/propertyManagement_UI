<template>
  <div class="house-list-index">
    <!-- 房屋列表数据控制模块 -->
    <house-list-control-model/>

  </div>  
</template>

<script>
  import houseListControlModel from "../../components/houseList/houseListControlModel";
  export default {
    name: "houseListIndex",
    components: {
      houseListControlModel,
    }
  }
</script>

<style scoped>

</style>