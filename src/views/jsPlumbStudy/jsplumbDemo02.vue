/**
* Created by tangyue on 20/4/20
*/
<template>
  <div>
    <h1>基础demo</h1>
    <h2>1.连接两个节点</h2>
    <div id="demo1Container" class="instance-container">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="margin-left:150px;"></div>
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
          overlays: [['Arrow', {
            width: 12,
            length: 10,
            location: 1,
            strokeWidth: 4,
            paintStyle: {
              stroke: '#10af10',
              fill: '#10af10',
            }
          }
          ]]
        },);
      },
      initBasicDemo1() {
        let instance = this.jsPlumb;
        instance.ready(function () {
          debugger;// 此时是否有页面？
          instance.setContainer('demo1Container');
          instance.connect({
            anchor : ['Left', 'Right'],
            source: 'item_left',
            target: 'item_right',
            connector: ['Flowchart'],
            endpoint: 'Dot',// 默认圆点
            paintStyle: {stroke: 'red', strokeWidth: 3},// 设置连接线的样式：比如粗细、颜色
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