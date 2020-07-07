/**
* Created by tangyue on 20/7/3
*/
<template>
  <el-dialog
          class="cus-dialog line-params-dialog"
          title="提示"
          :visible.sync="dialogVisible"
          width="650"
          append-to-body
  >

      <!-- 上面的穿梭框 -->
      <el-transfer
              v-model="transferValue"
              :data="transferData"
              class="line-params-transfer"
              :titles="['Source', 'Target']">
      </el-transfer>
      <div class="err-msg" v-if="transferValidErr">{{transferValidErr}}</div>
    <!-- 下面的编辑框 -->
    <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            class="line-params-text"
            resize="none"
            :disabled="textDisabled"
            v-model="textarea">
    </el-input>
    <div class="err-msg" v-if="textValidErr">{{textValidErr}}</div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="sureHand">确定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "line-param-edit-dialog",
    data() {
      return {
        graph: null,
        expressType: '',// 表达式的类型: 参数表达式、必走表达式。
        dialogVisible: false,
        transferData: [],
        transferValue: [],
        textarea: '',
        textValidErr: '',
        transferValidErr: ''
      }
    },
    computed: {
      textDisabled: function () {
        return (this.transferData.length + this.transferValue.length) < 1// 加入没有参数，则不可编辑
      }

    },
    methods: {
      show(graph, expressType) {
        this.graph = graph;
        this.expressType = expressType || 'paramExpress';
        this.dialogVisible = true;
        // 根据工作流的参数，生成这里的参数
        this.transferData = this.getTransferData();
      },
      hide() {
        this.dialogVisible = false;
      },
      // 获取工作流的参数
      getTransferData() {
        const rootCell = this.graph.getModel().getRoot();
        let data = [];
        const cellAllData = sessionStorage.getItem(rootCell.id);
        if (cellAllData) {
          let parsedCellData = JSON.parse(cellAllData);
          let wfParamsData = parsedCellData.wfParamsData;
          wfParamsData.forEach(it => {
            data.push({
              key: it.id,
              label: it.name
            })
          })
        }

        return data;
      },
      // 点击确定，把表达式选择在下层的输入框内
      sureHand() {
        debugger;
        let transferValue = this.transferValue;
        let textValue = this.textarea;
        let isNoneParam = this.transferData.length + this.transferValue.length < 1;// 是否这个本来就没有参数
        let valideCount = 0;

        if (!isNoneParam) {
          if (!textValue) {
            this.textValidErr = '请填写表达式';
          } else {
            this.textValidErr = '';
            valideCount++;
          }
          if (!transferValue.length) {
            this.transferValidErr = '请选择参数';
          } else {
            this.transferValidErr = '';
            valideCount++;
          }

        }

        if (valideCount == 2) {
          this.$emit('paramApply', {
            type: this.expressType,
            value: textValue
          });
          this.dialogVisible = false;
        }

        // 没有参数的情况下，不用写表达式
        // if((transferValue.length && !textValue){}

      },
    }
  }
</script>

<style scoped>

</style>