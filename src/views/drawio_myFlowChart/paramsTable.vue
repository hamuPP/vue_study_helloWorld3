/**
* 节点的参数配置
* Created by tangyue on 20/7/2
*/
<template>
  <div class="node-params-table" v-show="nodeParamVisible">
    <div class="table-blue2-toolbar">
      <el-button class="header-btn" @click="handleDel" size="small">删除</el-button>
      <el-button class="header-btn" type="primary" @click="handleAdd" size="small">新增</el-button>
      <el-button class="header-btn" type="primary" @click="handApply" size="small">应用</el-button>
    </div>

    <!--  注意：每一列必须加width,否则会卡住  -->
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
              prop="name"
              label="参数名"
              width="100">
        <template slot-scope="scope">
          <el-input v-if="scope.row.nameEditable"
                    v-model="scope.row.name"
                    clearable>
          </el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="value"
              label="参数值"
              width="100">
        <template slot-scope="scope">
          <el-input v-if="scope.row.valueEditable"
                    v-model="scope.row.value"
                    clearable>
          </el-input>
          <span v-else>{{scope.row.value}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="des"
              label="备注"
              width="100">
        <template slot-scope="scope">
          <el-input v-if="scope.row.desEditable"
                    v-model="scope.row.des"
                    clearable>
          </el-input>
          <span v-else>{{scope.row.des}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    name: "params-table",
    data() {
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
      init(opt){
        this.graph = opt.graph;
        this.mxCell = opt.mxCell;
      },
      // 删除
      handleDel() {
        // 当前勾选的行
        let selectedRows = this.$refs.nodeParamsTable.selection;
        if (selectedRows.length == 0) {
          this.$message({
            duration: 1000,
            message: '请勾选要操作的行',
            type: 'warning'
          });
        } else if (selectedRows.length > 0) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              let ids = [];
              selectedRows.forEach(r => {
                ids.push(r.boId)
              });
              debugger;
              // 请求后端
            })
            .catch(e => {
              debugger;
            });
        }
      },
      // 新增一行
      handleAdd() {
        this.tableData.push({
          name: '',
          value: '',
          des: ''
        })
      },
      // 点击了应用按钮，将这些属性数据保存进节点里
      handApply() {

      },
      // 单元格双击,变成编辑模式
      tableCellDblClick(row, column, cell, event) {
        switch (column.label) {
          case '参数名':
            row.nameEditable = true;
            this.tableData = [].concat(this.tableData);
            debugger;
            break;
          case '参数值':
            row.valueEditable = true;
            this.tableData = [].concat(this.tableData);
            debugger;
            break;
          case '备注':
            row.desEditable = true;
            this.tableData = [].concat(this.tableData);
            debugger;
            break;
          default:
            break;
        }
      }
    },
    created(){
      debugger;
    },
    mounted(){
      debugger;
    },
  }
</script>
