/**
* Created by tangyue on 20/4/27
*/
<template>
  <div class="my-flow-chart-wrapper">
    <div>
      <iframe src="drawio_myFlowChart/editor.html" scrolling="no" style="width: 100%;height: 500px;" frameborder="0"></iframe>

    </div>
    <!--<iframe class="my-flow-chart-frm" src="../../../public/drawio_myFlowChart/editor.html" frameborder="0"></iframe>-->
  </div>
</template>

<script>
  export default {
    name: "index-vue-ver"
  }
</script>

<style lang="scss">
.my-flow-chart-wrapper{
  border:1px solid red;
  width: 1000px;
  height: 800px;
  .my-flow-chart-frm{
    width: 100%;
    height: 100%;
  }
}
</style>