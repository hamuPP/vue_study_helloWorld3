/**
* 工作流的参数配置
* Created by tangyue on 20/7/2
*/
<template>
  <div class="node-params-table" v-show="visible">
    <div class="table-blue2-toolbar">
      <el-button class="header-btn" @click="handleDel" size="small">删除</el-button>
      <el-button class="header-btn" type="primary" @click="handleAdd" size="small">新增A</el-button>
      <el-button class="header-btn" type="primary" @click="handApply" size="small">应用</el-button>
    </div>
    <el-table
            ref="paramTable"
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
              label="名称"
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
              prop="type"
              label="类型"
              width="100">
        <template slot-scope="scope">
          <el-select
                  v-if="scope.row.typeEditable"
                  v-model="scope.row.type"
                  placeholder="请选择"
                  @change="typeSelectChange(scope.row)">
            <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="value"
              label="值"
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
              prop="type"
              label="类型ID"
              width="55">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    name: "workflow-params-table",
    data() {
      return {
        graph: null,
        mxCell: null,
        visible: false,
        tableData: [

        ],
        typeOptions: [
          {
            value: '0',
            label: 'string'
          },
          {
            value: '1',
            label: 'int'
          },
        ],
      }
    },
    watch: {
        tableData(n,o){
          debugger;
          // 检查类型的值，修改cateID,
          n.forEach(it=>{
            let typeId = it.type;

          })
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
        let selectedRows = this.$refs.paramTable.selection;
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
          des: '',
          id: new Date().getTime()// todo 暂时生成一个时间戳作为id
        })
      },
      // 点击了应用按钮，将这些属性数据保存进节点里
      handApply() {
        // todo 表单的参数是否需要处理成其他节点那种的Object?
        // var doc = mxUtils.createXmlDocument();
        // var obj = doc.createElement('object');
        // for(var i in this.form){
        //   var child = this.form[i];
        //   if(child){
        //     obj.setAttribute(i, child);
        //   }
        // }
        // 把这些值，放进全局对象里，
        setValueToSessionStorage('wfParamsData', this.mxCell, this.tableData, true)
        // this.graph.getModel().setValue(this.mxCell, this.tableData);// todo 是否需要这一步？

      },
      // 单元格双击,变成编辑模式
      tableCellDblClick(row, column, cell, event) {
        console.log(column.label);
        switch (column.label) {
          case '名称':
            row.nameEditable = true;
            this.tableData = [].concat(this.tableData);
            debugger;
            break;
            case '类型':
            row.typeEditable = true;
            this.tableData = [].concat(this.tableData);
            debugger;
            break;
          case '值':
            row.valueEditable = true;
            this.tableData = [].concat(this.tableData);
            debugger;
            break;
          default:
            break;

        }
      },
      typeSelectChange(row){
        debugger;
        row.typeName = row.type == 0? 'string': row.type == 1? 'string': '';
      }
    }
  }
</script>
