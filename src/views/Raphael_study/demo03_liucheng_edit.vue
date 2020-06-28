/**
* 流程图在线编辑工具
* Created by tangyue on 20/4/26
* 画布中的节点：1.可拖拽
*             2.悬浮显示4个点，拉线的点
*/
<template>
  <div class="flowchart-editor-wrapper">
    <div class="sidebar-wrapper">
      <div class="shape" draggable="true" @dragstart="sourceDragStart">1</div>
      <div class="shape" draggable="true" @dragstart="sourceDragStart">2</div>
      <!--<div class="shape">3</div>-->
      <!--<div class="shape">4</div>-->
      <!--<p draggable="true" ondragstart="myFunction(event)">拖动我!</p>-->

    </div>
    <div class="bg-wrapper" >
      <div class="bg-page" @drop="targetDrop" @dragover="allowDrop">
        <div v-for="(it, index) in dataList"
             :fId="index"
             draggable="true"
             :key="index"
             :id="it.nodeId"
             class="item"
             data-type="flowNode"
             :style="getNodeStyle(it)"
             @dragstart="targetDragStart"
             @mouseover="showLinkPoints(it)"
             @mouseout="hideLinkPoints(it)"
        >
          <!--&lt;!&ndash;<span class="flow-icon iconfont" :class="getNodeIcon(it)"></span>&ndash;&gt; todo 暂时不可编辑图标-->

          <div class="line-point-top" @click="drawLine"></div>
          <div class="line-point-right"></div>
          <div class="line-point-bottom"></div>
          <div class="line-point-left"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../../assets/js/demo03_liucheng_edit/myFlowchart.js"></script>

<style scoped lang="scss">
  @import "../../assets/scss/demo03_liucheng_edit/edit-page.scss";
</style>