/**
* Created by tangyue on 20/7/10
*/
<template>
  <el-select
          class="workflow-list-select"
          v-model="value"
          v-if="visible"
          size="mini"
          placeholder="请选择">
    <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "workFlowSelect",
    computed: mapGetters({
      listData: 'getWorkFlowList',
    }),
    data(){
      return {
        graph: null,
        visible: false,
        options: [],
        value: ''
      }
    },
    watch: {
      listData(n,o){
        debugger;
        var optionsList = [];
        if (n && n.dataList && n.dataList[0]) {
          var datas = n.dataList[0].page.data;

          for (var r = 0, rlen = datas.length; r < rlen; r++) {
            optionsList.push({
              value: datas[r].id,
              label: datas[r].workFlowName
            })
          }
        }
        this.options = optionsList
      }
    },
    created(){},
    methods: {
      init(opt){
        this.graph = opt.graph;

        this.getList();
      },
      getList(){
        let req = {
          businessType: 'ProjectApply',
          pageNum: 0,
          pageSize: 10000,
          name: ''
        };
        this.$store.dispatch('getWorkFlowList', {reqData: req});
      }
    }
  }
</script>

<style scoped>

</style>