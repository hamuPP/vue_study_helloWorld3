/**
* 人员定义
* Created by tangyue on 20/7/7
*/
<template>
  <div class="node-people-define" v-if="peopleDefineVisible">
    <el-row class="people-define-group">
      <el-col :span="8">
        <div class="org-tree-wrap">
          <el-tree
                  :props="props"
                  :load="loadNode"
                  lazy
                  show-checkbox
                  @node-click="handleNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="people-table-wrap">
          <el-table
                  ref="leftTable"
                  :data="tableData"
                  height="100%"
                  border
                  class="table-blue2">
            <el-table-column
                    type="selection"
                    width="40">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button class="people-transfer-btn"
                   type="primary"
                   icon="el-icon-arrow-right"
                   circle
                   @click="selectPeople(1)">
        </el-button>
        <el-button
                class="people-transfer-btn"
                type="primary"
                icon="el-icon-arrow-left"
                circle
                @click="unselectPeople(1)">
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-table
                ref="rightTable"
                :data="selectedPeople"
                height="100%"
                border
                class="table-blue2">
          <el-table-column
                  type="selection"
                  width="40">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="100">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="people-define-group people-type-radio-group">
      <el-radio v-model="peopleType" label="1">随机</el-radio>
      <el-radio v-model="peopleType" label="2">全部</el-radio>
      <el-radio v-model="peopleType" label="3">抢占</el-radio>
    </div>
    <div class="people-define-group-title">待阅角色</div>
    <el-row class="people-define-group">
      <el-col :span="11">
        <el-table
                ref="table3"
                :data="table3Data"
                height="100%"
                border
                class="table-blue2">
          <el-table-column
                  type="selection"
                  width="40">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                 >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <el-button class="people-transfer-btn"
                   type="primary"
                   icon="el-icon-arrow-right"
                   circle
                   @click="selectPeople(2)">
        </el-button>
        <el-button
                class="people-transfer-btn"
                type="primary"
                icon="el-icon-arrow-left"
                circle
                @click="unselectPeople(2)">
        </el-button>
      </el-col>
      <el-col :span="11">
        <el-table
                ref="table4"
                :data="table4Data"
                height="100%"
                border
                class="table-blue2">
          <el-table-column
                  type="selection"
                  width="40">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="100">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="people-define-group-title">待办角色</div>
    <div class="people-define-group">
      <el-col :span="11">
        <el-table
                ref="table5"
                :data="table5Data"
                height="100%"
                border
                class="table-blue2">
          <el-table-column
                  type="selection"
                  width="40">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
          >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <el-button class="people-transfer-btn"
                   type="primary"
                   icon="el-icon-arrow-right"
                   circle
                   @click="selectPeople(3)">
        </el-button>
        <el-button
                class="people-transfer-btn"
                type="primary"
                icon="el-icon-arrow-left"
                circle
                @click="unselectPeople(3)">
        </el-button>
      </el-col>
      <el-col :span="11">
        <el-table
                ref="table6"
                :data="table6Data"
                height="100%"
                border
                class="table-blue2">
          <el-table-column
                  type="selection"
                  width="40">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="100">
          </el-table-column>
        </el-table>
      </el-col>
    </div>
    <div class="cus-operation-buttons">
      <el-button size="mini" type="primary" @click="handleApply">应用</el-button>
      <el-button size="mini" @click="handleCancle">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "peopleDefine",
    data() {
      return {
        graph: null,
        mxCell: null,
        peopleDefineVisible: false,
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        tableData: [],
        selectedPeople: [],// 选中人员
        peopleType: '',
        table3Data: [],
        table4Data: [],
        table5Data: [],
        table6Data: [],
      }
    },
    methods: {
      init(opt) {
        this.graph = opt.graph;
        this.mxCell = opt.mxCell
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{name: 'region'}]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      },
      handleNodeClick(data) {
        debugger;
        console.log(data);
        this.getTableData(data.id);
      },
      // 请求组织下的人员
      getTableData(orgId) {
        debugger;
        let newData = [
          {
            name: 'AAA',
            id: 111,
          }, {
            name: 'bbb',
            id: 222,
          }, {
            name: 'vvv',
            id: 33,
          }, {
            name: 'hjhh',
            id: 787,
          },
        ];
        this.tableData = newData;
      },
      // 选人
      selectPeople(tableNo) {
        let table = {
          1: this.$refs.leftTable,
          2: this.$refs.table3,
          3: this.$refs.table5,
        }[tableNo];
        let selectedPeople = {
          1: 'selectedPeople',
          2: 'table4Data',
          3: 'table6Data',
        }[tableNo];
        let leftTableData = {
          1: 'tableData',
          2: 'table3Data',
          3: 'table5Data',
        }[tableNo];

        let selection = table.selection;
        let newLeftData = [];
        this[selectedPeople] = this[selectedPeople].concat(selection);
        this[leftTableData].forEach(it => {
          if (!mxUtils.isInArray(it.id, selection, 'id')) {
            newLeftData.push(it)
          }
        })

        this[leftTableData] = newLeftData;
      },
      // 取消选人
      unselectPeople(tableNo) {
        debugger;
        let table = {
          1: this.$refs.rightTable,
          2: this.$refs.table4,
          3: this.$refs.table6,
        }[tableNo];
        let leftTableData = {
          1: 'tableData',
          2: 'table3Data',
          3: 'table5Data',
        }[tableNo];
        let rightTableData = {
          1: 'selectedPeople',
          2: 'table4Data',
          3: 'table6Data',
        }[tableNo];
        let selection = table.selection;
        let newRightData = [];
        this[leftTableData] = this[leftTableData].concat(selection);// 把选中的行，添加到左边的table里
        this[rightTableData].forEach(it => {
          if (!mxUtils.isInArray(it.id, selection, 'id')) {
            newRightData.push(it)
          }
        })
        this[rightTableData] = newRightData;
      },
      // 应用。将数据保存在Mxcell里面
      handleApply(){
        // 把这些值，放进全局对象里，
        let obj = {
          peopleType: this.peopleType,
          selectedPeople: this.selectedPeople,
          table4Data: this.table4Data,
          table6Data: this.table6Data,
        };
        setValueToSessionStorage('peopleDefine', this.mxCell, obj, true)
      },
      // 取消
      handleCancle(){},
    }
  }
</script>
