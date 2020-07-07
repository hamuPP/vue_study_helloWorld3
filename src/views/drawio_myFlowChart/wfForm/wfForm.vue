/**
* 工作流编辑的表单
* Created by tangyue on 20/7/6
*/
<template>
  <el-form ref="form"
           :model="form"
           size="mini"
           v-show="visible"
           class="cus-form cus-form_long">
    <el-form-item label="名称" class="form-item">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="所属模块" class="form-item">
      <el-input v-model="form.belong"></el-input>
    </el-form-item>
    <el-form-item label="编辑" class="form-item">
      <el-input v-model="form.edit"></el-input>
    </el-form-item>
    <el-form-item label="编辑日期" class="form-item">
      <el-input v-model="form.date"></el-input>
    </el-form-item>
    <el-form-item label="新建URL" class="form-item">
      <el-input v-model="form.newURL"></el-input>
    </el-form-item>
    <el-form-item label="是否按参数过滤默认审批人节点" class="form-item form-item-long">
      <el-checkbox v-model="form.ifOr"></el-checkbox>
    </el-form-item>
    <el-form-item label="Web应用服务器" class="form-item">
      <el-input v-model="form.webServer"></el-input>
    </el-form-item>
    <el-form-item label="端口" class="form-item">
      <el-input v-model="form.webPort"></el-input>
    </el-form-item>
    <el-form-item label="超时" class="form-item time-group">
      <el-input v-model="form.timeout" class="time-group_input"></el-input>
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
    <el-form-item class="form-item">
      <el-button type="primary" @click="handleApply">应用</el-button>
      <el-button @click="handleCancle">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        graph: null,
        mxCell: null,
        form: {
          timeoutType: 'h'// 默认是小时
        },
        visible: false,
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
      }
    },
    methods: {
      init(opt) {
        this.graph = opt.graph;
        this.mxCell = opt.mxCell;
      },
      handleApply() {
        // var doc = mxUtils.createXmlDocument();
        // var obj = doc.createElement('object');
        // for (var i in this.form) {
        //   var child = this.form[i];
        //   if (child) {
        //     obj.setAttribute(i, child);
        //   }
        // }
        // // 把这些值，放进全局对象里，
        setValueToSessionStorage('wfData', this.mxCell, this.form, true)
        // this.graph.getModel().setValue(this.mxCell, obj);// todo 是否需要这一步？

      },
      handleCancle() {
        debugger;

      },
    }
  }
</script>

<style scoped>

</style>