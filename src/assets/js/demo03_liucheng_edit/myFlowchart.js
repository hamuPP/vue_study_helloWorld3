/**
 * Created by tangyue on 20/4/26
 */
import {generateRandomFrontId} from './myFlowChartUtils.js'

export default {
  name: "demo03_liucheng_edit",
  data() {
    return {
      currentMovingNodeElement: null,// 当前移动的元素
      dataList: {},// 页面中的节点，（目前节点的形状只有方形）
      bgImg: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4='

    }
  },
  created() {

  },
  watch: {},
  methods: {
    // 从工具栏拖住节点放到画布中
    sourceDragStart(ddd) {
      debugger;
      this.currentMovingNodeElement = event.target;
    },
    // 画布中的节点的拖拽
    targetDragStart() {
      debugger;
      this.currentMovingNodeElement = event.target;
    },
    drawLine(){
      debugger;// 与targetDragStart谁先触发
    },
    // 在画布中落下元素
    targetDrop() {
      let ev = event || window.event;
      ev.preventDefault();

      // 当前鼠标xy位置
      let x = ev.offsetX;
      let y = ev.offsetY;

      // 在画布中画一个一样的元素。如果是已有的元素，则更新其xy坐标
      let frontId = this.currentMovingNodeElement && this.currentMovingNodeElement.getAttribute('fid') ?
        this.currentMovingNodeElement.getAttribute('fid') : generateRandomFrontId();
      this.dataList[frontId] = this.dataList[frontId] ?
        Object.assign(this.dataList[frontId], {
          x: x,
          y: y
        }) : {
          x: x,
          y: y
        };
      this.dataList = Object.assign({}, this.dataList);
      console.log('dataList', this.dataList)
      // event.preventDefault(); event.dataTransfer?
      // 拖动结束，清除currentMovingNodeElement
      this.currentMovingNodeElement = null;
    },
    allowDrop() {
      event.preventDefault();
    },
    // 设置节点的行内样式，这个主要是配置left top right bottom这些偏移量的
    getNodeStyle(it) {
      return {
        left: it.x + 'px',
        top: it.y + 'px'
      }
    },
    // 画布中的节点，悬浮显示连线用的点点
    showLinkPoints(it){
      debugger;
    },
    // 画布中的节点，鼠标离开隐藏连线用的点点

    hideLinkPoints(it){}
  }
}