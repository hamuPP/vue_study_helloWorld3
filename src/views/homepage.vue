/**
* Created by tangyue on 20/4/24
*/
<template>
  <div class="wrapper">
    <el-scrollbar class="my-scrollbar">
      <div class="item">1</div>
      <div class="item">1</div>
      <div class="item">1</div>
      <div class="item">1</div>
      <div class="item">1</div>
      <div class="item">1</div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "homepage"
  }
</script>

<style lang="scss">
  .wrapper {
    /*width: 150px;*/
    /*height: 150px;*/
  }
  .my-scrollbar {
    height: 150px;
    width: 150px;
    .el-scrollbar__wrap {
      overflow-x: auto;
    }
    .item {
      height: 30px;
      border: 1px solid red;
      margin: 3px 0;
    }
  }
</style>