/**
* Created by tangyue on 20/4/20
*/
<template>
  <div>
    <h1>基础demo</h1>
    <h2>1.连接两个节点</h2>
    <div id="demo1Container" class="instance-container">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="margin-left:50px;"></div>
    </div>
  </div>
</template>

<script>
  import jsplum from 'jsplumb'

  export default {
    name: "jsplumb-demo02",
    data() {
      return {
        jsPlumb: null, // 缓存实例化的jsplumb对象

      }
    },
    mounted() {
      this.initJsPlumbInstance();
      // 初始化基础例子1
      this.initBasicDemo1();
    },
    methods: {
      initJsPlumbInstance() {
        this.jsPlumb = jsplum.jsPlumb.getInstance({
          // // Container: 'container', // 选择器id
          // EndpointStyle: { radius: 0.11, fill: '#fff' }, // 端点样式
          // // PaintStyle: { stroke: '#00ff00', strokeWidth: 2 }, // 绘画样式，默认8px线宽  #456
          // // HoverPaintStyle: { stroke: '#1E90FF' }, // 默认悬停样式  默认为null
          // // EndpointHoverStyle: { fill: '#F00', radius: 6 }, // 端点悬停样式
          // // ConnectionOverlays: [ // 此处可以设置所有箭头的样式，因为我们要改变连接线的样式，故单独配置
          // //   ['Arrow', { // 设置参数可以参考中文文档
          // //     location: 1,
          // //     length: 10,
          // //     paintStyle: {
          // //       stroke: '#496def',
          // //       fill: '#496def'
          // //     }
          // //   }]
          // // ],
          // Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：直线，折线，曲线等
          // DrapOptions: { cursor: 'crosshair', zIndex: 2000 }
        },);
      },
      initBasicDemo1() {
        let instance = this.jsPlumb;
        instance.ready(function () {
          instance.setContainer('demo1Container');
          instance.connect({
            source: 'item_left',
            target: 'item_right',
            endpoint: 'Dot'
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