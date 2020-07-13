/**
* Created by tangyue on 20/7/9
*/
<template>
  <el-button
          v-show="visible"
          class="cus-button my-save-button"
          type="text"
          size="mini"
          @click="saveWF">保存</el-button>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "saveWorkFlow",
    computed: mapGetters({
      saveWorkFlowResult: 'saveWorkFlowResult',
    }),
    data(){
      return{
        graph: null,
        visible: false
      }
    },
    watch: {
      saveWorkFlowResult(n, o){
        debugger;
        let type = 'error';
        let msg = '';
        if(n.code === 0 ){// 保存成功
          type = 'success';
          this.scope.wfid = n.codeMsg;// 成功时，codeMsg中是id
          msg = '保存成功'
        }else{
          msg = n.codeMsg;// 成功时，codeMsg是报错信息
        }

        // 不论成功失败，都提示
        this.$message({
          duration: 1000,
          message: msg,
          type: type
        });
      },

    },
    methods: {
      init(opt){
        this.scope = opt.scope;// 上是否有getBaseFilename方法？;
        this.graph = opt.scope.editor.graph;
      },

      /**
       * 将Nodes整理成保存的后端接口的格式：
       * 如果节点上有设置的数据，其在value.attributes里面，不要第一个，第一个现在是默认的字段
       */
      formateNodesForBackend(nodes) {
        var resultNodes = [];
        for (var i in nodes) {
          var formatedObj = {};
          // 从本地存储中拿到节点的数据
          let nodeData = sessionStorage.getItem(i);
          if(nodeData){
            // 节点的数据转为json格式
            let nodeDataObj = JSON.parse(nodeData);
            for(let i in nodeDataObj){
              let innerObj = nodeDataObj[i];
              formatedObj = Object.assign(formatedObj, innerObj);
              // flowID ==> hashId，flowID是前端字段，对应接口的hashId
              if(formatedObj.flowID){
                formatedObj.hashId = formatedObj.flowID;
                formatedObj.id = formatedObj.flowID;
              }
              // todo 注意把其他字段改为attributesMapping.json中的对应字段
            }
            resultNodes.push(formatedObj)
          }
        }
        return resultNodes;
      },

      formateLinesForBackend(lines) {
        var resultLines = [];
        // 目前先把from to 给整出来
        for (var i in lines) {
          var line = lines[i];
          var lineSourceCell = line.source;// 连线的起点
          var lineTargetCell = line.target;// 连线的终点
          var lineSourceCellNodeAttributes = sessionStorage.getItem(lineSourceCell.id);// 连线的起点的cell在sessionStorage里的值
          var lineTargetCellNodeAttributes = sessionStorage.getItem(lineTargetCell.id);// 连线的终点的cell在sessionStorage里的值
          // 找到起点的hashId
          var lineSourceCellHashId = JSON.parse(lineSourceCellNodeAttributes).nodeAttributes.flowID;
          // 找到终点的hashId
          var lineTargetCellHashId = JSON.parse(lineTargetCellNodeAttributes).nodeAttributes.flowID;// todo 如果连线没有连上节点，则这里会报错
          var lineData = JSON.parse(sessionStorage.getItem(line.id)).lineAttributes;// todo, 连线的数据，注意把里面的字段改为attributesMapping.json中的对应字段
          resultLines.push({
            id: '',
            name: '',
            from: lineSourceCellHashId,
            to: lineTargetCellHashId
          });
        }

        return resultLines;
      },

      /**
       * 保存流程图到后端
       */
      saveWF(){
        // 获取当前画布上的所有cell(包括节点、线、文字，还有默认的两个空节点)
        let currentAllCells = this.graph.getModel().cells;
        var allNodes = {};//全部的节点（除开线、空节点、文本节点）
        var allNodeSum = 0;

        var allLines = {};
        var allLineSum = 0;// 连线的条数

        var allTextNodes = {};
        var allTextNodeSum = 0;

        for (var i in currentAllCells) {
          if (i != 0 && i != 1) {// 0 和 1是默认的两个空节点，不要
            var obj = currentAllCells[i];
            if (obj.edge) {// 线条
              allLines[i] = obj;
              allLineSum++;
            } else if (obj.style.indexOf('text;html') == 0) {// 文本节点
              allTextNodes[i] = obj;
              allTextNodeSum++;
            } else {
              allNodes[i] = obj;
              allNodeSum++;
            }
          }
        }

        var nodesForBackend = this.formateNodesForBackend(allNodes);
        var linesForBackend = this.formateLinesForBackend(allLines);

        // 文件名.如果文件名有后缀，一律去掉
        var fileName = this.scope.getBaseFilename(false).split(/.xml|.svg|.html|.png/)[0];
        // 生成xml文件
        var fileContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + this.scope.getFileData(true, null, null, null, true, true, null, null, null, true);
        var reqData = {
          verify: false,
          jsondata: JSON.stringify({
            id: this.scope.wfid || '',// 回显有id
            name: fileName,

            // todo start
            parameters: [],
            filteroute: false,
            "editor": "",
            "editDate": "",
            "httpserverport": "",
            "createUrl": "",
            "timelimit": 0,
            "timelimitunit": "HOUR",
            // todo end
            xmldata: fileContent,
            nodes: nodesForBackend,
            links: linesForBackend
          })
        };
        console.log(JSON.parse(reqData.jsondata))
        console.log(reqData.jsondata.constructor)
        // 提交到后端
        this.$store.dispatch('saveWorkFlow', {reqData: reqData});

      }
    }
  }
</script>

<style lang="scss">
  .my-save-button{
    font-size: 14px;
    padding: 7.5px 15px;
    vertical-align: top;
    color: #DEEBFF;
    &:hover{
      background: rgba(9, 30, 66, 0.48);
    }
  }
</style>