/**
* Created by tangyue on 20/4/22
*/
<template>
  <div>
    <!--<div id="paper" class="block"></div>-->
    <!--<div id="paper2" class="block"></div>-->
    <div id="paper3" class="block">
      <div v-for="(it, index) in dataList"
           :key="index"
           :id="it.nodeId"
           class="item"
           data-type="flowNode"
           :class="getNodeCls(it)"
           :style="getNodeStyle(it)"
           @mouseover="showInfo(it)"
           @mouseout="hideInfo(it)"
      >
        <span class="flow-icon iconfont" :class="getNodeIcon(it)"></span>
      </div>
    </div>
  </div>

</template>

<script>
  import json from './mock.json'
  import Raphael from 'raphael';

  export default {
    name: "demo1",
    data() {
      return {
        raphael: null,
        //设置流程图的宽度
        initWidth: 40,
        //设置流程图的高度
        intiHeight: 40,
        //节点x坐标到图形左边框的距离
        toLeft: 0,
        //节点x坐标到图形右边框的距离
        toRight: 0,
        //节点y坐标距离图形上边框的距离
        toTop: 0,
        //节点y坐标距离图形下边框的距离
        toBotom: 0,
        //流程图距离（0,0）点的默认位置
        chartInitX: 60,
        chartInitY: 60,
        offSetPoint: {},
        dataList: {}
      }
    },

    mounted() {
      debugger;
      //检查此时的 toleft等值是
      this.setInitParams();// 设置初始参数：toLeft，toRight这些的
      // this.initDemo1();
      // this.initDemo2();
      this.initDemo3();
    },
    methods: {
      setInitParams() {
        this.toLeft = Math.floor(1 / 3 * this.initWidth);
        //节点x坐标到图形右边框的距离
        this.toRight = Math.floor(2 / 3 * this.initWidth);
        //节点y坐标距离图形上边框的距离
        this.toTop = Math.floor(1 / 3 * this.intiHeight);
        //节点y坐标距离图形下边框的距离
        this.toBotom = Math.floor(2 / 3 * this.intiHeight);
      },
      initDemo1() {
        var R = Raphael("paper", 400, 200);
        var p = R.path('M0 0L100 0L50 80Z');

        p.attr({"fill": "green", 'opacity': 0.8});
      },
      // 实例第二个图像
      initDemo2() {
        var R = Raphael("paper2", 400, 200);
        var p = R.path('M0 0L100 0L50 80Z');
        p.attr({"fill": "pink", 'opacity': 0.8});
      },
      getImageSource() {
        return json;
      },
      //获取流程图相对于（0,0）点的偏移量
      getOffSetXANDY4Chart(source) {
        let chartInitX = this.chartInitX;
        let chartInitY = this.chartInitY;
        //存储流程图中所有的x坐标
        let xArray = [];
        //存储流程图中所有的y坐标
        let yArray = [];
        if (source) {
          var index = 0;
          for (let i in source) {
            let node = source[i];
            //获取到所有节点的坐标
            xArray[index] = node.xPoint;
            yArray[index] = node.yPoint;
            ++index;
            let linkCounts = node.linkCounts;
            if (linkCounts && linkCounts > 0) {
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
        }

        xArray.sort(this.asc);
        yArray.sort(this.asc);

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
          // canvasWidth: xArray[xArray.length - 1] * 1 + initWidth - chartInitX,// todo 这两个值似乎没啥用
          // canvasHeight: yArray[yArray.length - 1] * 1 + intiHeight - chartInitY // todo 这两个值似乎没啥用
        };
      },
      //画节点间的连线
      drawLink(node, raphael) {
        if (node.linkCounts && node.linkCounts > 0) {
          var linkCounts = node.linkCounts * 1;
          for (var i = 0; i < linkCounts; i++) {
            var link = node["link" + i];
            //画箭头和连线
            var instance = this.drawArrow(link);
            //获取连线的填充颜色
            // var linkColor = getLinkFillColor(link, node);
            //为联系填充颜色
            // fillColor4Link(instance, linkColor);
          }
        }
      },
      //画节点，并返回节点的集合
      drawImage(raphael, source) {
        if (source) {
          for (let i in source) {
            let node = source[i];
            //画线
            this.drawLink(node, raphael);
            //画节点
            this.drawNode(i, node, raphael);
            //经过挪动后的node的新的位置
            var adjustNodeX = node.xPoint - this.offSetPoint.offSetX;
            var adjustNodey = node.yPoint - this.offSetPoint.offSetY;
            //画节点的名称
            this.drawNodeText({x: adjustNodeX * 1, y: adjustNodey * 1, text: node.nodeName}, raphael);
          }
        }
      },
      initDemo3() {
        //获取对图的描述信息
        var source = this.dataList = this.getImageSource();
        //获取流程图的偏移量
        this.offSetPoint = this.getOffSetXANDY4Chart(source);
        //创建画布
        var raphael = this.raphael = Raphael("paper3", 1186, 366);// 画布宽高采用和包裹元素相同的尺寸
        //画图
        this.drawImage(raphael, source);
      },
      asc(a, b) {
        return a - b;
      },

      drawArrow(obj) {
        var instance = {};
        var path1 = this.getArrow(obj, 8);
        console.log('drawArrow')
        instance.arrPath = this.raphael.path(path1);
        return instance;
      },
      //组装连线及箭头信息
      getArrow(obj, size) {
        let offSetPoint = this.offSetPoint;
        var pointCounts = obj.pointCounts;
        var lastSecondPoint = obj["point" + (pointCounts - 2)];
        var lastPoint = obj["point" + (pointCounts - 1)];

        var param = {
          lastPoint: lastPoint,
          secondLastPoint: lastSecondPoint
        };
        //调整连线的终点坐标
        var newLastPoint = this.adjustLastPoint(param);
        lastPoint.x = newLastPoint.lastPointX - offSetPoint.offSetX;
        lastPoint.y = newLastPoint.lastPointY - offSetPoint.offSetY;

        var angle = Raphael.angle((lastSecondPoint.x - offSetPoint.offSetX), (lastSecondPoint.y - offSetPoint.offSetY), lastPoint.x, lastPoint.y);//得到两点之间的角度
        var a45 = Raphael.rad(angle - 45);//角度转换成弧度
        var a45m = Raphael.rad(angle + 45);
        var x2a = Math.floor(lastPoint.x * 1 + Math.cos(a45) * size);
        var y2a = Math.floor(lastPoint.y * 1 + Math.sin(a45) * size);
        var x2b = Math.floor(lastPoint.x * 1 + Math.cos(a45m) * size);
        var y2b = Math.floor(lastPoint.y * 1 + Math.sin(a45m) * size);

        //构建路径
        var mapPath = "M,";

        for (var i = 0; i < pointCounts - 1; i++) {
          var point = obj["point" + i];
          mapPath += (point.x - offSetPoint.offSetX) + "," + (point.y - offSetPoint.offSetY) + ",L,"
        }
        mapPath += lastPoint.x + "," + lastPoint.y + "," + x2a + "," + y2a + "," + "M," + lastPoint.x + "," + lastPoint.y + ",L," + x2b + "," + y2b;
        var result = mapPath.split(",");
        console.log(result)
        return result;
      },
      //对连线的终点坐标进行调整
      adjustLastPoint(obj) {
        var x1 = obj.lastPoint.x;
        var y1 = obj.lastPoint.y;
        var x2 = obj.secondLastPoint.x;
        var y2 = obj.secondLastPoint.y;
        var x = 0;
        var y = 0;
        debugger;
        if (x2 < x1 && y1 == y2) {
          //从左到右
          y = y1;
          x = x1 - this.toLeft - 5;
        } else if (x2 > x1 && y1 == y2) {
          //从右边到左边
          y = y1;
          x = x1 * 1 + this.toRight;
        } else if (x1 == x2 && y1 > y2) {
          //垂直向下
          x = x1;
          y = y1 - this.toTop;
        } else if (x1 == x2 && y1 < y2) {
          //垂直向上
          x = x1;
          y = y1 * 1 + this.toBotom;
        }
        else {
          if (Math.abs(x1 - x2) <= Math.abs(y1 - y2)) {
            //x一定
            x = x1;
            if (y1 - y2 > 0) {
              //点在上方
              y = y1 * 1 - this.toTop - 5;
            } else {
              //点在下方
              y = y1 * 1 + this.toBotom;
            }
          } else {
            //y一定
            y = y1;
            if (x1 - x2 > 0) {
              //点在左方
              x = x1 - this.toLeft - 5;
            } else {
              //点在右方
              x = x1 * 1 + this.toRight
            }
          }
        }
        //终点坐标
        console.log(x, y)
        return {
          lastPointX: x,
          lastPointY: y
        };
        // delete x;
        // delete y; // todo 注释掉，似乎没必要啊2020年04月22日10:11:13
      },
      //画节点.节点是div样式，不用svg画图
      drawNode(i, node, raphael) {
        let offSetPoint = this.offSetPoint
        //获取节点类型
        // var imageSrc = "/epms/theme/images/liucheng/" + getNodeImageSrc(node); todo 这个方法不需要了，改成获取icon的方法
        //经过挪动后的node的新的位置
        var adjustNodeX = node.xPoint - offSetPoint.offSetX;
        var adjustNodey = node.yPoint - offSetPoint.offSetY;
        //画节点
        this.dataList[i] = Object.assign(this.dataList[i], {
          x: adjustNodeX * 1,
          y: adjustNodey * 1
        });
        // 不采用svg画图了
        // var imageNode = raphael.image(imageSrc, adjustNodeX * 1, adjustNodey * 1, this.initWidth, this.intiHeight);
        //为节点添加动作

        //    todo 悬浮显示详情的方法， 改成我的版本的
        // if (node.nodeState) {
        //   imageNode.mouseover(function () {
        //     showNodeInfo(imageNode, node);
        //   });
        //   imageNode.mouseout(function () {
        //     closePhotoInfo();
        //   });
        // }
      },
      //画审批角色名称
      drawNodeText(obj, raphael) {
        var obj2 = raphael.text(obj.x + 30, obj.y + 50, obj.text);
        obj2.attr({fill: "#2A00FF"});
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
      getNodeStyle(it) {
        return {
          left: it.x + 'px',
          top: it.y + 'px'
        }
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
    }
  }
</script>

<style lang="scss">
  .block {
    border: 1px solid mediumpurple;
    width: 1186px;
    height: 366px;
    margin-bottom: 10px;
    position: relative;
  }

  .item {
    width: 40px;
    height: 40px;
    background: pink;
    position: absolute;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    // 有鼠标悬浮事件的样式
    &.hoverable {
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
</style>