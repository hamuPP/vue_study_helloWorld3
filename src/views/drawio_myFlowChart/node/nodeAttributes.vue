/**
* 子流程
* Created by tangyue on 20/7/8
*/
<template>
  <el-form ref="form"
           :model="form"
           size="mini"
           v-show="visible"
           class="cus-form">
    <el-form-item label="流程实例iD" prop="flowID" class="form-item">
      <el-input v-model="form.flowID" disabled></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="wfName" class="form-item">
      <el-input v-model="form.wfName"></el-input>
    </el-form-item>
    <el-form-item label="节点编号" prop="seqNo" class="form-item">
      <el-input v-model="form.seqNo"></el-input>
    </el-form-item>
    <el-form-item label="汇合关系" prop="relation" class="form-item">
      <el-select v-model="form.relation" placeholder="请选择">
        <el-option
                v-for="item in relationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="人员传递" prop="peopleChuandi" class="form-item">
      <el-select v-model="form.peopleChuandi" placeholder="请选择">
        <el-option
                v-for="item in peopleChuandiOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="并发起点" prop="bingfaqidian" class="form-item">
      <el-select v-model="form.bingfaqidian" placeholder="请选择">
        <el-option
                v-for="item in bingfaqidianOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <div class="inner-group-title">
      <i class="el-icon-menu"></i>
      任务时限
    </div>
    <el-form-item label="超时" prop="questTimeout" class="form-item time-group">
      <el-input v-model="form.questTimeout" class="time-group_input"></el-input>
      <el-select
              class="time-group_select"
              v-model="form.timeoutType"
      >
        <el-option
                v-for="item in timeoutTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <div class="form-buttons">
      <el-button type="primary" size="mini" @click="handleApply">应用</el-button>
      <el-button size="mini" @click="handleCancle">取消</el-button>
    </div>
  </el-form>
</template>

<script>
  export default {
    name: "nodeAttributes",
    data() {
      return {
        graph: null,
        mxCell: null,
        relationOptions: [
          {
            value: '1',
            label: '是'
          },{
            value: '2',
            label: '否'
          },
        ],
        peopleChuandiOptions: [
          {
            value: '1',
            label: 'AA'
          },{
            value: '2',
            label: 'BB'
          },
        ],
        bingfaqidianOptions: [
          {
            value: '1',
            label: 'AA'
          },{
            value: '2',
            label: 'BB'
          },
        ],
        form: {
          mode: '1',// 默认整个1试试
          timeoutType: 'h'// 默认是小时
        },
        timeoutTypeOptions: [
          {
            value: 'h',
            label: 'h'
          },
          {
            value: 'm',
            label: 'm'
          },
          {
            value: 's',
            label: 's'
          },
        ],
        visible: false
      }
    },
    watch: {
      form(n,o){
        console.log('form watched', n)
      }
    },
    methods: {
      init(opt) {
        console.log('init', new Date().getTime())
        this.graph = opt.graph;
        this.mxCell = opt.mxCell;

        // 每个节点在初次建立时，创建时间戳作为flowID
        this.generateFlowId();
      },
      generateFlowId(){
        // 检查该节点是否已经有时间戳了，若有，则用原本的，没有则新建一个现在的时间戳
        let cellDataInSession = sessionStorage.getItem(this.mxCell.id);
        if(cellDataInSession && JSON.parse(cellDataInSession).nodeAttributes && JSON.parse(cellDataInSession).nodeAttributes.flowID){
          this.form = Object.assign({}, this.form,
            {
              flowID: JSON.parse(cellDataInSession).nodeAttributes.flowID
            });
        }else{
          let newFlowId = new Date().getTime();
          setValueToSessionStorage('nodeAttributes', this.mxCell, {
            flowID: newFlowId
          }, true);
          this.form = Object.assign({}, this.form,
            {
              flowID: newFlowId
            });
        }
      },
      // 应用。将数据保存在Mxcell里面
      handleApply() {
        // 把这些值，放进全局对象里
        // let obj = {
        //   peopleType: this.peopleType,
        //   selectedPeople: this.selectedPeople,
        //   table4Data: this.table4Data,
        //   table6Data: this.table6Data,
        // };
        setValueToSessionStorage('nodeAttributes', this.mxCell, this.form, true)
      },
      // 取消
      handleCancle() {
      },
    }
  }
</script>

<style scoped>

</style>