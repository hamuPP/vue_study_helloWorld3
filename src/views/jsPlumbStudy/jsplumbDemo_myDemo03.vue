/**
* 我的例子：连接多个点
* Created by tangyue on 20/4/20
* 功能list: 连线样式可配置 o
*           节点的位置可配置 x
*           节点样式可配置：自定义颜色和图片图标 o
*           节点悬浮显示 o
*/
<template>
  <div>
    <h1>我的例子：连接多个节点
      <span class="iconfont icon-jurassic_start"></span>
    </h1>

    <div class="flow-chart-wrapper">
      <div id="container" class="container">
        <div v-for="(it, index) in dataList"
             :key="index"
             :id="it.nodeId"
             class="item"
             data-type="flowNode"
             :class="getNodeCls(it)"
             :style="getNodeStyle(it)"
             @mouseover="showInfo(it)"
             @mouseout="hideInfo(it)">
          <span class="flow-icon iconfont" :class="getNodeIcon(it)"></span>
          <span class="flow-text"  :style="getNodeTextStyle(it.nodeName)">{{it.nodeName}}</span>

        </div>

        <div class="node-info-block" v-show="nodeInfoVisible" :style="nodeInfoStyleObj">
          <div class="node-info-arrow"></div>
          <div class="node-info-container">
            {{currentHoveredNode.tipInfo}}
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import json from './mock.json'
  import jsplum from 'jsplumb'

  export default {
    name: "jsplumbDemo_myDemo02",
    data() {
      return {
        jsPlumb: null, // 缓存实例化的jsplumb对象
        dataList: [],// 节点数据
        connectionList: [],// 以开始-结束点为一组的连线的信息
        nodeInfoVisible: false,//
        nodeInfoStyleObj: {},
        currentHoveredNode: {},// 当前鼠标悬浮的节点的信息
        //流程图距离（0,0）点的默认位置
        chartInitX: 30,
        chartInitY: 60,
        offSetPoint: {},
        // 流程图配置项
        textIn: true//文字放在里面，或者false放在外面，目前我
      }
    },
    created() {
      // 获取节点数据，这个是从后端查询到的节点数据，现在没有后端，所以整个假数据
      this.getDataList();
    },
    mounted() {
      // 初始化jsPlumb实例
      this.initJsPlumbInstance();
    },
    watch: {
      dataList() {
        // 整理出连线的关系，现在是随便搞的，后面当确定业务逻辑后需要重写
        // 初始化我的流程图
        this.$nextTick(() => {
          // 放在nextTick之后，保证在页面渲染完之后再渲染流程图
          this.initMyJsplumb();
        });
      }
    },
    methods: {
      // 初始化jsPlumb实例
      initJsPlumbInstance() {
        this.jsPlumb = jsplum.jsPlumb.getInstance({
          Container: 'container', // 选择器id
          Connector: ['Straight'], // 要使用的默认连接器的类型：直线，折线，曲线等
          // connector: ['Flowchart', { gap: 10, cornerRadius: 5, alwaysRespectStubs: true}],  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          // connector: ['Bezier'],  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          // connector: this.todo(),  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          // DrapOptions: {cursor: 'crosshair', zIndex: 2000},
          EndpointStyle: {radius: 0.11, fill: '#fff'},// 使端点不可见
        },);
      },

      initMyJsplumb() {
        const that = this;
        let instance = this.jsPlumb;
        let connectionList = this.connectionList;
        instance.ready(function () {
          connectionList.forEach(it => {
            instance.connect({
              source: it.source,
              target: it.target,
              anchor: "Continuous",
              overlays: [['Arrow', {
                width: 12,
                length: 10,
                location: 1,
                strokeWidth: 4,
                paintStyle: {
                  stroke: 'lightgray',// 箭头的颜色，根据节点的状态来改
                  fill: 'lightgray',
                }
              }
              ]],// 设置箭头
              paintStyle: {stroke: that.getLineColor(it, it), strokeWidth: 3},// 设置连接线的样式：比如粗细、颜色
            });
          })
        });
      },
      getNodeIcon(data) {
        let cls = 'icon-jurassic_start';// 默认样式
        let nodeType = data.nodeType;
        if (nodeType == 4) {
          //开始
          cls = "icon-jurassic_start";
        } else if (nodeType == 5) {
          //结束
          cls = 'icon-jurassic_over';
        } else if (nodeType == 1) {
          if (data.nodeState == 'yes') {
            //已经审批
            cls = "icon-jurassic_ing";// todo 这几个找几个不同的图标
          } else if (data.nodeState == 'no') {
            //当前审批
            cls = "icon-jurassic_ing";
          } else {
            //未审批
            cls = "icon-jurassic_ing";
          }
        }
        return cls;
      },
      // 设置节点的样式
      getNodeCls(it) {
        let clsList = [];
        if (it.nodeState) {
          clsList.push('hoverable')
        }
        return clsList.join(' ')
      },
      // 设置节点的行内样式，这个主要是配置left top right bottom这些偏移量的
      getNodeStyle(node, index){
        debugger;

        let offSetPoint = this.offSetPoint;
        var adjustNodeX = node.xPoint - offSetPoint.offSetX;
        var adjustNodey = node.yPoint - offSetPoint.offSetY;
        return {
          left: adjustNodeX + 'px',
          top: adjustNodey + 'px'
        }
      },
      // 设置连接线的颜色，现在没有node，后面整理一下数据格式
      getLineColor(data, node) {
        let color = 'lightgray';// 默认色
        let linkType = data.linkType;
        if (linkType == 1) {// 回退
          color = '#00FF00'
        } else if (linkType == 0) {
          //如果是开始节点上的连线；判断是否流程已经启动
          if (node.isBegin == "1") {
            //开始节点(流程已经启动)
            if (node.nodeType == 4) {
              color = "#529d2f";
            } else if (node.nodeState == 'yes') {
              //几点审批完成
              color = "#529d2f";
            } else {
              color = "#CACACA";
            }
          } else {
            //开始节点(流程未启动)
            if (node.nodeType == 4) {
              color = "#529d2f";
            } else {
              color = "#CACACA";
            }
          }
        }
        return color
      },
      getNodeTextStyle(nodeName){
        let sum = 0;
        let fontSize = 12;// 这里的字体宽度是16，如果后面改了宽度，这里也要改
        console.log(nodeName, nodeName.length * fontSize/2)
        return {
          left: '-' + nodeName.length * fontSize / 3 + 'px'
        }
      },
      // 从后端接口查询到的流程节点数据
      getDataList() {
        this.dataList = json;
        //获取流程图的偏移量
        this.offSetPoint = this.getOffSetXANDY4Chart(json);
      },
      // 获取悬浮节点的div元素。
      getclickedDivElement(ele) {
        let divElement = ele;
        if (divElement.dataset.type !== 'flowNode') {
          divElement = divElement.parentNode;
        }
        return divElement;
      },
      // 悬浮节点时，有state状态的，显示节点信息，没有的不用管
      showInfo(data) {
        if (data.nodeState) {
          // 获取到当前点击的节点div元素？
          this.currentHoveredNode = data;
          let clickedDivElement = this.getclickedDivElement(event.target);
          console.log(clickedDivElement)
          this.nodeInfoStyleObj = {
            left: clickedDivElement.offsetLeft - clickedDivElement.offsetWidth / 2 + 'px',
            top: clickedDivElement.offsetTop + clickedDivElement.offsetHeight + 5 + 'px'// 悬浮框放在节点的下面
          };
          this.nodeInfoVisible = true;
        }
      },
      // 离开悬浮节点时，有state状态的，隐藏节点信息
      hideInfo() {
        this.nodeInfoVisible = false;
      },
      asc(a, b) {
        return a - b;
      },
      generateConnectionList(linkCounts, node){
        let list = [];
        for (let l = 0; l < linkCounts; l++) {
          let link = node["link" + l];
          list.push({
            source: link.startNode,
            target: link.aimNode,
            linkType: link.linkType,
          })
        }
        return list;
      },
      // 整理节点的坐标，以及整理出连线的关系
      getOffSetXANDY4Chart(source) {
        let newConnectionList = [];
        //存储流程图中所有的x坐标
        debugger;
        let xArray = [];
        //存储流程图中所有的y坐标
        let yArray = [];
        if (source) {
          let index = 0;
          for (let i in source) {
            let node = source[i];
            //获取到所有节点的坐标
            xArray[index] = node.xPoint;
            yArray[index] = node.yPoint;
            ++index;
            let linkCounts = node.linkCounts;
            if (linkCounts && linkCounts > 0) {
              newConnectionList = newConnectionList.concat(this.generateConnectionList(linkCounts, node));
              //获取到节点下所有连线的坐标
              for (let l = 0; l < linkCounts; l++) {
                let link = node["link" + l];
                let pointCounts = 0;
                if (link) {
                  pointCounts = link.pointCounts;
                }
                if (pointCounts > 0) {
                  for (let p = 0; p < pointCounts; p++) {
                    let point = link["point" + p];
                    if (point) {
                      xArray[index] = point.x;
                      yArray[index] = point.y;
                      ++index;
                    }
                  }
                }
              }
            }
          }
          debugger;
          this.connectionList = newConnectionList;
        }

        xArray.sort(this.asc);
        yArray.sort(this.asc);
        let chartInitX = this.chartInitX;
        let chartInitY = this.chartInitY;
        if (xArray[0] && xArray[0] > chartInitX) {
          //流程图x的偏移距离
          chartInitX = xArray[0] - chartInitX;
        } else {
          //如果流程图的x<=默认位置，那么不对流程图的位置坐任何调整
          chartInitX = 0;
        }
        if (yArray[0] && yArray[0] > chartInitY) {
          //流程图y的偏移距离
          chartInitY = yArray[0] - chartInitY;
        } else {
          //如果流程图的y<=默认位置，那么不对流程图的位置坐任何调整
          chartInitY = 0;
        }
        return {
          offSetX: chartInitX,
          offSetY: chartInitY,
          // canvasWidth: xArray[xArray.length - 1] * 1 + initWidth - chartInitX, todo 这两个是否没用
          // canvasHeight: yArray[yArray.length - 1] * 1 + intiHeight - chartInitY
        };
      }
    }
  }
</script>

<style scoped lang="scss">
  .flow-chart-wrapper {
    /*position: relative;*/
    width: 80%;
    height: 300px;
    border: 1px solid gray;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  }

  .container {
    padding: 20px;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .item {
    width: 30px;
    height: 30px;
    background: pink;
    position: absolute;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    &:first-child {
      margin-left: 0;
    }
    // 有鼠标悬浮事件的样式
    &.hoverable {
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }

  .flow-icon {
    line-height: 30px;
    font-size: 20px;
  }
  .flow-text{
    position: absolute;
    white-space: nowrap;
    /* left: -10px; */
    left: 0;
    top: 27px;
    font-size: 14px;
    color: #333;
  }

  .node-info-block {
    position: absolute;
    padding-top: 8px;
    font-size: 14px;
    color: #333;
    .node-info-arrow {
      left: 50%;
      margin-left: -5px;
      top: 3px;
      border-width: 0 5px 5px;
      border-color: transparent;
      border-bottom-color: hsla(0, 0%, 85%, .5);
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border-style: solid;
      &:after, &::after {
        content: " ";
        top: 1px;
        margin-left: -5px;
        border-width: 5px;
        border-top-width: 0;
        border-color: transparent;
        border-bottom-color: #fff;
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-style: solid;
      }
    }
    .node-info-container {
      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      padding: 7px;
    }
  }

</style>