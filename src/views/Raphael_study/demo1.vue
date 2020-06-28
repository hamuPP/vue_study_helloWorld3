/**
* Created by tangyue on 20/4/22
*/
<template>
 <div class="wrapper">
   <button type="button" class="button" @click="drawPath">drawPath</button>
   <div id="paper" class="paper"></div>
 </div>

</template>

<script>
  import Raphael from 'raphael';

  export default {
    name: "demo1",
    data() {
      return {
        raphael: null
      }
    },
    mounted(){
      //创建画布
      this.raphael = Raphael("paper", '100%', '100%');// 画布宽高采用和包裹元素相同的尺寸
    },

    methods:{
      drawPath(){
        debugger;
        this.raphael.path("M0,0L26,0L13,18L0.0")
      }
    }
  }
</script>

<style lang="scss">
 .wrapper{
   border:1px solid mediumpurple;
 }
  .button{
    padding: 5px;
    border:1px solid #0086b3;
  }
  .paper{
    width: 800px;
    height: 600px;
    border: 1px solid #0086b3;
  }
</style>