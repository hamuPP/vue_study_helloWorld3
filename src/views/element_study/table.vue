/**
* Created by tangyue on 20/6/16
*/
<template>
  <div class="table-study-wrapper">
    <h1>table</h1>
    <h3>关于固定表头的写法</h3>
    <div class="demos-box">
      <div class="table-wrapper">
        <el-table
                :data="tableData"
                class="my-table"
                size="small"
                border
        >
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </div>

      <div class="table-wrapper">
        <el-table
                :data="tableData"
                height="100%"
                style="width: 100%"
                size="small"
                border>
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <p>结论：</p>
    <p>关于固定表头。只能按照api写的、在el-table上加height属性，height的值可以写100%</p>

    <h3>关于表格的宽度撑满父元素（100%）的写法</h3>
    <div class="demos-box">
      <div class="table-wrapper2">
        <el-table
                :data="tableData"
                class="my-table2_1"
                size="small"
                border
        >
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </div>

      <div class="table-wrapper2">
        <el-table
                :data="tableData"
                class="my-table2_2"
                size="small"
                border
        >
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "table_study",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>
<style lang="scss">
  // 将table的头的颜色改成粉红，这仅仅为了方便观察。
  .table-study-wrapper{
    .el-table__header{
      th{
        background: pink;
      }
    }
  }

</style>
<style scoped lang="scss">
  body {
    padding: 0;
  }
  .demos-box{
    overflow: hidden;
  }
  .table-wrapper {
    border: 1px solid red;
    width: 500px;
    height: 200px;
    float: left;
    margin: 10px;
  }

  .table-wrapper2 {
    border: 1px solid purple;
    width: 800px;
    height: 200px;
    /*float: left;*/
    margin: 10px;
  }

  .my-table {
    width: 100%;
    height: 100%;
  }
  .my-table2_1{
    width: 100%;
  }
  .my-table2_2{
    width: 100%;
    height: 100%;
  }
</style>