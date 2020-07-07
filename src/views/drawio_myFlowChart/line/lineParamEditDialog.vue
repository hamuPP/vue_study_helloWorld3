/**
* Created by tangyue on 20/7/3
*/
<template>
  <el-dialog
          class="cus-dialog"
          title="提示"
          :visible.sync="dialogVisible"
          width="650"
          append-to-body
  >
    <div class="">
    <!-- 上面的穿梭框 -->
      <el-transfer v-model="transferValue" :data="transferData"></el-transfer>


    </div>
    <!-- 下面的编辑框 -->
    <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
    </el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="sureHand">确定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "line-param-edit-dialog",
    data(){
      return {
        dialogVisible: false,
        transferData: [
          {
            key: '1',
            label: 'AS',
            // disabled: false
          },
          {
            key: '2',
            label: 'SS',
            // disabled: false
          },
        ],
        transferValue: [1, 4],
        textarea: ''
      }
    },
    methods: {
      show(){
        this.dialogVisible = true;
      },
      hide(){
        this.dialogVisible = false;
      },
      // 点击确定，把表达式选择在下层的输入框内
      sureHand(){
        debugger;
        let value = this.textarea;
        this.$emit('paramApply', value)
      }
    }
  }
</script>

<style scoped>

</style>