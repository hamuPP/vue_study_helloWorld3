/**
* Created by tangyue on 20/7/6
*/
<template>
  <div class="node-params-table">
    <div class="table-blue2-toolbar">
      <el-button class="header-btn" @click="handleDel" size="small">删除</el-button>
      <el-button class="header-btn" type="primary" @click="handleAdd" size="small">新增</el-button>
      <el-button class="header-btn" type="primary" @click="handApply" size="small">应用</el-button>
    </div>
    <el-table
            ref="nodeParamsTable"
            class="table-blue2"
            :data="tableData"
            style="width: 100%"
            border
            size="small"
            @cell-dblclick="tableCellDblClick">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column
              prop="date"
              label="日期"
              width="100"
              >
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="100"
              >
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: "my-test-vue",
    data(){
      return {
        graph: null,
        mxCell: null,
        nodeParamVisible: false,
        tableData: [
          {
            name: '2016-05-02',
            value: '王小虎',
            des: '上海市普陀区金沙江路 1518 弄'
          },
        ]
      }
    },
    methods: {
      tableCellDblClick(row, column, cell, event) {},
      handleDel(){},
      handleAdd(){},
      handApply(){},
    }
  }
</script>

<style scoped>

</style>