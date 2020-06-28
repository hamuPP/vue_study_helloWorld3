/**
* 全部的例子
* 不同于.01.02这些有后缀的，这些是单个的例子
* Created by tangyue on 20/4/20
*/
<template>
  <div>
    <p>
      npm i jsplumb
    </p>
    <h1>基础demos</h1>
    <h2>1.连接两个节点</h2>
    <div id="demo1Container" class="instance-container">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="margin-left:50px;"></div>
    </div>
    <h2>1.1 连线的不同样式</h2>
    <div class="connector-demo-group">
      <p>Bezier</p>
      <div id="diagramContainer2" class="instance-container">
        <div id="item_left2" class="item"></div>
        <div id="item_right2" class="item" style="margin-left:50px;"></div>
      </div>
    </div>
    <div class="connector-demo-group">
      <p>Flowchart</p>
      <div id="diagramContainer3" class="instance-container">
        <div id="item_left3" class="item"></div>
        <div id="item_right3" class="item" style="margin-left:50px;"></div>
      </div>
    </div>
    <div class="connector-demo-group">
      <p>StateMachine</p>
      <div id="diagramContainer4" class="instance-container">
        <div id="item_left4" class="item"></div>
        <div id="item_right4" class="item" style="margin-left:50px;"></div>
      </div>
    </div>
    <div class="connector-demo-group">
      <p>Straight</p>
      <div id="diagramContainer5" class="instance-container">
        <div id="item_left5" class="item"></div>
        <div id="item_right5" class="item" style="margin-left:50px;"></div>
      </div>
    </div>

    <!--<div id="container">-->
      <!--<div class="col1">-->
        <!--<div id="processDefineDiv_node_2" name="cell">派单</div>-->
      <!--</div>-->
      <!--<div class="col2">-->
        <!--<div v-for="item in list2" :key="item.nodeId" :id="item.nodeId" name="cell">{{ item.name }}</div>-->
      <!--</div>-->
      <!--<div class="col3">-->
        <!--<div id="processDefineDiv_node_6" name="cell">完成</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import jsplum from 'jsplumb'

  export default {
    name: "jsplumb-demo",
    // components: { jsPlumb }
    data() {
      return {
        jsPlumb: null, // 缓存实例化的jsplumb对象，如果一个页面有多个实例，则需要分别初始化实例，不可以实例1个多次使用
        list2: [{name: '省公司虚拟专家组', nodeId: 'processDefineDiv_node_3'}, {
          name: '分公司咨询组',
          nodeId: 'processDefineDiv_node_5'
        }, {name: '县咨询组', nodeId: 'processDefineDiv_node_4'}], // 节点参数
        connlist: [
          {sourceNodeId: 'processDefineDiv_node_2', targetNodeId: 'processDefineDiv_node_3'},
          {sourceNodeId: 'processDefineDiv_node_2', targetNodeId: 'processDefineDiv_node_5'},
          // { sourceNodeId: 'processDefineDiv_node_2', targetNodeId: 'processDefineDiv_node_4' },
          {sourceNodeId: 'processDefineDiv_node_3', targetNodeId: 'processDefineDiv_node_5'},
          {sourceNodeId: 'processDefineDiv_node_5', targetNodeId: 'processDefineDiv_node_3'},
          {sourceNodeId: 'processDefineDiv_node_3', targetNodeId: 'processDefineDiv_node_6'},
          {sourceNodeId: 'processDefineDiv_node_5', targetNodeId: 'processDefineDiv_node_4'},
          {sourceNodeId: 'processDefineDiv_node_4', targetNodeId: 'processDefineDiv_node_5'},
          {sourceNodeId: 'processDefineDiv_node_5', targetNodeId: 'processDefineDiv_node_6'},
          {sourceNodeId: 'processDefineDiv_node_4', targetNodeId: 'processDefineDiv_node_6'}
        ], // 指定需要连接的两节点
      }
    },
    created() {

    },
    mounted() {
      // 初始化基础例子1
      this.initBasicDemo1();
      this.initBasicDemo1_connectors();
    },
    methods: {
      initBasicDemo1() {
        let instance = jsplum.jsPlumb.getInstance();
        instance.ready(function () {
          instance.setContainer('demo1Container');
          instance.connect({
            source: 'item_left',
            target: 'item_right',
            endpoint: 'Dot'
          })
        })
      },
      // 不同样式的连线
      initBasicDemo1_connectors() {
        let instance = jsplum.jsPlumb.getInstance();
        instance.ready(function () {
          instance.setContainer('diagramContainer2');
          instance.connect({
            source: 'item_left2',
            target: 'item_right2',
            endpoint: 'Dot',
            connector: ['Bezier'],
            anchor: ['Left', 'Right']
          })
        });
        let instance3 = jsplum.jsPlumb.getInstance();
        instance3.ready(function () {
          instance3.setContainer('diagramContainer3');
          instance3.connect({
            source: 'item_left3',
            target: 'item_right3',
            endpoint: 'Dot',
            connector: ['Flowchart'],
            anchor: "Continuous"
          })
        });
        let instance4 = jsplum.jsPlumb.getInstance();
        instance4.ready(function () {
          instance4.setContainer('diagramContainer4');
          instance4.connect({
            source: 'item_left4',
            target: 'item_right4',
            endpoint: 'Dot',
            connector: ['StateMachine'],

          })
        });
        let instance5 = jsplum.jsPlumb.getInstance();
        instance5.ready(function () {
          instance5.setContainer('diagramContainer5');
          instance5.connect({
            source: 'item_left5',
            target: 'item_right5',
            endpoint: 'Dot',
            connector: ['Straight'],
          })
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .instance-container {
    padding: 20px;
    width: 80%;
    height: 200px;
    border: 1px solid gray;
  }

  .connector-demo-group {
    width: 25%;
    float: left;
  }

  .item {
    height: 80px;
    width: 80px;
    border: 1px solid blue;
    float: left;
  }
</style>