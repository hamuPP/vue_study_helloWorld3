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
    <el-form-item label="子流程" prop="childProcess" class="form-item">
      <el-input v-model="form.childProcess"></el-input>
    </el-form-item>
    <el-form-item label="操作名称" prop="name" class="form-item">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="启动" prop="mode" class="form-item">
      <el-radio-group v-model="form.mode">
        <el-radio label="1">同步</el-radio>
        <el-radio label="2">异步</el-radio>
      </el-radio-group>
    </el-form-item>
    <div>
      <el-button type="primary" @click="handleApply">应用</el-button>
      <el-button @click="handleCancle">取消</el-button>
    </div>
  </el-form>
</template>

<script>
  export default {
    name: "childProcess",
    data(){
      return{
        graph: null,
        mxCell: null,
        form: {
          mode: '1',// 默认整个1试试
        },
        visible: false
      }
    },
    methods: {
      init(opt) {
        this.graph = opt.graph;
        this.mxCell = opt.mxCell
      },
      // 应用。将数据保存在Mxcell里面
      handleApply(){
        // 把这些值，放进全局对象里， todo 保存还没丛
        // let obj = {
        //   peopleType: this.peopleType,
        //   selectedPeople: this.selectedPeople,
        //   table4Data: this.table4Data,
        //   table6Data: this.table6Data,
        // };
        setValueToSessionStorage('childProcess', this.mxCell, this.form)
      },
      // 取消
      handleCancle(){},
    }
  }
</script>

<style scoped>

</style>