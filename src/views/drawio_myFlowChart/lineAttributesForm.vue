/**
* 连线属性的form表单
* Created by tangyue on 20/7/2
*/
<template>
  <el-form ref="form"
           :model="form"
           label-width="80px"
           size="mini"
           v-show="visible">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="线属性">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="normal" name="type" value="1"></el-checkbox>
        <el-checkbox label="回退" name="type" value="2"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="是否缺省">
      <el-checkbox-group v-model="form.dtype">
        <el-checkbox label="缺省" name="dtype" value="1"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleApplyLineAttributes">应用</el-button>
      <el-button @click="handleCancleLineAttributes">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "line-attributes-form",
    data() {
      return {
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
      init(cell){
        debugger;
        this.mxCell = cell;
      },
      show(){
        this.visible = true;
      },
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
        graph.getModel().setValue(cell, value);// todo 是否需要这一步？
      },
      handleCancleLineAttributes(){
        debugger;
      }
    }
  }
</script>

<style scoped>

</style>