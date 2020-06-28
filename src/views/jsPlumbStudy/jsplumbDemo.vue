/**
* Created by tangyue on 20/4/20
*/
<template>
  <div>
    <p>
      npm i jsplumb
    </p>

    <h1>基础demos</h1>
    <h2>连接两个节点</h2>
    <div id="diagramContainer">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="margin-left:50px;"></div>
    </div>
    <hr>

    <div id="container">
      <div class="col1">
        <div id="processDefineDiv_node_2" name="cell">派单</div>
      </div>
      <div class="col2">
        <div v-for="item in list2" :key="item.nodeId" :id="item.nodeId" name="cell">{{ item.name }}</div>
      </div>
      <div class="col3">
        <div id="processDefineDiv_node_6" name="cell">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
  import jsplum from 'jsplumb'

  export default {
    name: "jsplumb-demo",
    // components: { jsPlumb }
    data(){
      return {
        jsPlumb: null, // 缓存实例化的jsplumb对象
        list2: [{ name: '省公司虚拟专家组', nodeId: 'processDefineDiv_node_3' }, { name: '分公司咨询组', nodeId: 'processDefineDiv_node_5' }, { name: '县咨询组', nodeId: 'processDefineDiv_node_4' }], // 节点参数
        connlist: [
          { sourceNodeId: 'processDefineDiv_node_2', targetNodeId: 'processDefineDiv_node_3' },
          { sourceNodeId: 'processDefineDiv_node_2', targetNodeId: 'processDefineDiv_node_5' },
          // { sourceNodeId: 'processDefineDiv_node_2', targetNodeId: 'processDefineDiv_node_4' },
          { sourceNodeId: 'processDefineDiv_node_3', targetNodeId: 'processDefineDiv_node_5' },
          { sourceNodeId: 'processDefineDiv_node_5', targetNodeId: 'processDefineDiv_node_3' },
          { sourceNodeId: 'processDefineDiv_node_3', targetNodeId: 'processDefineDiv_node_6' },
          { sourceNodeId: 'processDefineDiv_node_5', targetNodeId: 'processDefineDiv_node_4' },
          { sourceNodeId: 'processDefineDiv_node_4', targetNodeId: 'processDefineDiv_node_5' },
          { sourceNodeId: 'processDefineDiv_node_5', targetNodeId: 'processDefineDiv_node_6' },
          { sourceNodeId: 'processDefineDiv_node_4', targetNodeId: 'processDefineDiv_node_6' }
        ], // 指定需要连接的两节点
      }
    },
    created(){
      debugger;
      this.jsPlumb = jsplum.jsPlumb.getInstance({
        Container: 'container', // 选择器id
        EndpointStyle: { radius: 0.11, fill: '#fff' }, // 端点样式
        // PaintStyle: { stroke: '#00ff00', strokeWidth: 2 }, // 绘画样式，默认8px线宽  #456
        // HoverPaintStyle: { stroke: '#1E90FF' }, // 默认悬停样式  默认为null
        // EndpointHoverStyle: { fill: '#F00', radius: 6 }, // 端点悬停样式
        // ConnectionOverlays: [ // 此处可以设置所有箭头的样式，因为我们要改变连接线的样式，故单独配置
        //   ['Arrow', { // 设置参数可以参考中文文档
        //     location: 1,
        //     length: 10,
        //     paintStyle: {
        //       stroke: '#496def',
        //       fill: '#496def'
        //     }
        //   }]
        // ],
        Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：直线，折线，曲线等
        DrapOptions: { cursor: 'crosshair', zIndex: 2000 }
      },);
      debugger;
      this.initDemo1()
    },
    methods: {
      initDemo1(){
        jsplum.ready(function () {
          jsplum.connect({
            source: 'item_left',
            target: 'item_right',
            endpoint: 'Dot'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>