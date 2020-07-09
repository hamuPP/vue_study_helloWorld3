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
  export default {
    name: "saveWorkFlow",
    data(){
      return{
        graph: null,
        visible: false
      }
    },
    methods: {
      init(opt){
        this.graph = opt.graph;
      },

      /**
       * 将Nodes整理成保存的后端接口的格式：
       * 如果节点上有设置的数据，其在value.attributes里面，不要第一个，第一个现在是默认的字段
       */
      formateNodesForBackend(nodes) {
        debugger;
        var resultNodes = [];
        for (var i in nodes) {
          var node = nodes[i];
          var nodeValue = node.value;
          var attributes = nodeValue ? nodeValue.attributes : null;
          // 找到名称字段:name
          var _name = '';
          var formatedObj = {
            name: _name,
            hashId: i,
            id: i,
            // xmlDescription: todo 是xml，现在没有
          };
          // 找到其余字段：todo 待定，其余字段还没整
          if (attributes) {
            for (var j = 0, len = attributes.length; j < len; j++) {
              if (attributes[j].name !== 'label' && attributes[j].name !== 'xmlns') {// 是默认的那个节点，不要
                var value = JSON.parse(attributes[j].value);
                var children = value.children;
                if (children && children.length) {
                  for (var c = 0, clen = children.length; c < clen; c++) {
                    var _child = children[c];
                    formatedObj[_child.name] = _child.defaultValue;
                  }
                }
              }
            }
          }
          resultNodes.push(formatedObj)
        }
        return resultNodes;
      },

      formateLinesForBackend(lines) {
        debugger;
        var resultLines = [];
        // 目前先把from to 给整出来
        for (var i in lines) {
          var line = lines[i];
          var lineSourceCell = line.source;// 连线的起点
          var lineTargetCell = line.target;// 连线的终点
          // 找到起点的hashId
          var lineSourceCellHashId = lineSourceCell.id;// todo
          // 找到终点的hashId
          var lineTargetCellHashId = lineTargetCell.id;// todo 如果连线没有连上节点，则这里会报错
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
        debugger;
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