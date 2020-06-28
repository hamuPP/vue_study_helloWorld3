/**
* Created by tangyue on 20/4/9
*/
<template>
  <div class="test">
    <h1 class="d1">This is an Demo1 page</h1>
    <button @click="generate">generate</button>
  </div>
</template>

<script>
  export default {
    name: "demo1",
    data(){
      return {
        listObj: {}

      }
    },
    methods: {
      generate(){
        console.time()
        let i = 1;
        while (i <= 1000){
          this.listObj[i] = {
            i: true
          };
          i++;
        }
        debugger;
        console.log('test',this.listObj);
        console.timeEnd()

      }
    }
  }
</script>

<style lang="scss">
.d1{
  color: red;
}
</style>