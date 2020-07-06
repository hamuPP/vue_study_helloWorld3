/**
* 连线属性的form表单
* Created by tangyue on 20/7/2
*/
<template>
  <el-form ref="form"
           :model="form"
           label-width="80px"
           size="mini"
           v-show="visible"
            class="my-node-attributes-form">
    <el-form-item label="名称" class="form-item">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="线属性" class="form-item">
        <el-radio label="1" v-model="form.type">normal</el-radio>
        <el-radio label="2" v-model="form.type" >回退</el-radio>
    </el-form-item>
    <el-form-item label="是否缺省" class="form-item">
      <el-checkbox v-model="form.dtype"></el-checkbox>
    </el-form-item>
    <!-- 点击打开参数编辑弹窗 -->
    <el-form-item label="参数表达式" class="form-item" prop="paramExpress">
      <el-input v-model="form.paramExpress" readonly v-on:click.native="openParamsEditDialog"></el-input>
    </el-form-item>
    <!-- 点击打开参数编辑弹窗 -->
    <el-form-item label="必走表达式" class="form-item">
    </el-form-item>
    <el-form-item class="form-item">
      <el-button type="primary" @click="handleApplyLineAttributes">应用</el-button>
      <el-button @click="handleCancleLineAttributes">取消</el-button>
    </el-form-item>

    <lineParamEditDialog
            ref="paramEditDialog"
            @paramApply="paramApplyHandle">
    </lineParamEditDialog>

  </el-form>
</template>

<script>
  import lineParamEditDialog from './lineParamEditDialog'
  export default {
    name: "line-attributes-form",
    components: {lineParamEditDialog},
    data() {
      return {
        graph: null,
        mxCell: null,
        visible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    beforeDestroy(){
      this.mxCell = null;
    },
    methods: {
      init(graph, cell){
        debugger;
        this.graph = graph;
        this.mxCell = cell;
      },
      show(){
        this.visible = true;
      },
      // 点击'应用'按钮，保存这些属性
      handleApplyLineAttributes() {
        debugger;// 表单数据，保存在mxcell里面
        var doc = mxUtils.createXmlDocument();
        var obj = doc.createElement('object');
        for(var i in this.form){
          var child = this.form[i];
          if(child){
            obj.setAttribute(i, child);
          }
        }
        console.log('submit!');
        // 把这些值，放进全局对象里，
        setValueToSessionStorage('lineAttributes', this.mxCell, obj)
        this.graph.getModel().setValue(this.mxCell, obj);// todo 是否需要这一步？

        // 修改页面上的线的颜色
        var lineColor = this.form.type == 1 ? '#000000': '#8de048';
        this.graph.setCellStyles('strokeColor', lineColor, [this.mxCell]);
      },
      // 点击'取消'按钮
      handleCancleLineAttributes(){
        debugger;
      },
      openParamsEditDialog(){
        debugger;
        this.$refs.paramEditDialog.show();
      },
      paramApplyHandle(val){
        this.form.paramExpress = val;
      }
    }
  }
</script>

<style scoped>

</style>