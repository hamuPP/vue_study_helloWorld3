/**
* Created by tangyue on 20/6/28
*/
<template>
  <div>
    <div id="geInfo">
      <div class="geBlock" style="text-align:center;min-width:50%;">
        ${x}^{(2)}\text{=}\begin{bmatrix} 1416\\\ 3\\\ 2\\\ 40 \end{bmatrix}$


        <h1>Flowchart Maker and Online Diagram Software</h1>

        <h2 id="geStatus">Loading...</h2>
        <p>
          Please ensure JavaScript is enabled.
        </p>
      </div>
    </div>
    <div id="myMainContainer" class="myMainContainer"></div>

    <!-- 参数配置的table-->
    <paramsTable ref="paramsTable"></paramsTable>

      <!-- 连线属性配置的form-->
    <lineAttributesForm ref="lineAttributesForm"></lineAttributesForm>

    <!-- 工作流编辑的form-->
    <wfEditForm
            ref="wfForm"
            @paramApply="paramApplyHandle">
    </wfEditForm>
    <wfParamTable
            ref="wfParams"
            @paramApply="paramApplyHandle">
    </wfParamTable>

    <!-- 节点的人员定义   -->
    <nodePeopleDefine
            ref="nodePeopleDefine">
    </nodePeopleDefine>

    <!-- 节点的子流程  -->
    <nodeChildProcess
            ref="nodeChildProcess">
    </nodeChildProcess>

    <saveWorkFlow ref="saveWorkFlow"></saveWorkFlow>
    <workFlowSelect ref="workFlowSelect"></workFlowSelect>

    <renyuanChuandi ref="renyuanChuandiDialog"></renyuanChuandi>

    <nodeAttributes ref="nodeAttributesForm"></nodeAttributes>
  </div>
</template>

<script>
  var mxDevUrl = 'drawio_myFlowC2/';

  var geBasePath = mxDevUrl + 'js/mxgraph/';
  var drawDevUrl = mxDevUrl;
  window.drawDevUrlInVue = drawDevUrl;
  window.geBasePathInVue = geBasePath;

  window.mathPathInVue = 'drawio_myFlowC2/math';
  window.stylePathInVue = 'drawio_myFlowC2/styles';
  window.resourcesPathInVue = 'drawio_myFlowC2/resources';
  window.imagePathInVue = 'drawio_myFlowC2/images';
  window.mxBasePath = 'drawio_myFlowC2/mxgraph';

  import '../../../public/drawio_myFlowC2/js/myProj/nodeAttributes4vue'

  import paramsTable from '../drawio_myFlowChart/paramsTable'
  import lineAttributesForm from '../drawio_myFlowChart/line/lineAttributesForm'
  import wfEditForm from '../drawio_myFlowChart/wfForm/wfForm'
  import wfParamTable from '../drawio_myFlowChart/wfForm/wfParamEditTable.vue'
  import nodeAttributes from '../drawio_myFlowChart/node/nodeAttributes.vue'
  import nodePeopleDefine from '../drawio_myFlowChart/node/peopleDefine.vue'
  import nodeChildProcess from '../drawio_myFlowChart/node/childProcess.vue'
  import saveWorkFlow from '../drawio_myFlowChart/saveWorkFlow.vue'
  import workFlowSelect from '../drawio_myFlowChart/workFlowSelect.vue'
  import renyuanChuandi from '../drawio_myFlowChart/node/renyuanChuandi.vue'
  export default {
    name: "can-iframe-use",
    inject: ['rootAppVue'],
    components: {
      paramsTable,
      lineAttributesForm, wfEditForm,
      wfParamTable,
      nodeAttributes,// 节点属性
      nodePeopleDefine, nodeChildProcess,
      saveWorkFlow,
      workFlowSelect,
      renyuanChuandi
    },
    created() {
      var LazyLoad = window.LazyLoad;
      // Load multiple JS files and execute a callback when they've all finished.
      LazyLoad.js([
          drawDevUrl + 'js/PreConfig.js',
          drawDevUrl + 'js/diagramly/Init.js',
          geBasePath + '/Init.js',
          mxDevUrl + '/js/mxgraph/mxClient.js'
        ],
        function () {
          LazyLoad.js([
            drawDevUrl + 'js/spin/spin.min.js',
            drawDevUrl + 'js/deflate/base64.js',
            drawDevUrl + 'js/jscolor/jscolor.js',
            drawDevUrl + 'js/sanitizer/sanitizer.min.js',
            drawDevUrl + 'js/croppie/croppie.min.js',

            geBasePath + '/Editor.js',
            geBasePath + '/EditorUi.js',
            geBasePath + '/Sidebar.js',
            geBasePath + '/Graph.js',
            geBasePath + '/Format.js',
            geBasePath + '/Shapes.js',
            geBasePath + '/Actions.js',
            geBasePath + '/Menus.js',
            geBasePath + '/Toolbar.js',
            geBasePath + '/Dialogs.js',

            drawDevUrl + 'js/diagramly/sidebar/Sidebar.js',

            drawDevUrl + 'js/diagramly/util/mxJsCanvas.js',
            drawDevUrl + 'js/diagramly/util/mxAsyncCanvas.js',

            drawDevUrl + 'js/diagramly/DrawioFile.js',
            drawDevUrl + 'js/diagramly/LocalFile.js',
            drawDevUrl + 'js/diagramly/Dialogs.js',
            drawDevUrl + 'js/diagramly/Editor.js',
            drawDevUrl + 'js/diagramly/EditorUi.js',
            drawDevUrl + 'js/diagramly/DiffSync.js',
            drawDevUrl + 'js/diagramly/Settings.js',
            drawDevUrl + 'js/diagramly/DrawioFileSync.js',

            drawDevUrl + 'js/diagramly/DrawioComment.js',
            drawDevUrl + 'js/diagramly/DriveComment.js',

            drawDevUrl + 'js/diagramly/DrawioClient.js',

            drawDevUrl + 'js/diagramly/App.js',
            drawDevUrl + 'js/diagramly/Menus.js',

            drawDevUrl + 'js/diagramly/Pages.js',
            drawDevUrl + 'js/diagramly/Trees.js',
            drawDevUrl + 'js/diagramly/DistanceGuides.js',
            drawDevUrl + 'js/diagramly/DevTools.js',

          ], function () {
            window.App.main();
          });
        });

    },
    mounted() {
      // 在mounted时，把子组件注册到根组件。因为此时子组件才有。
      if(!this.rootAppVue.$childrenRefs){
        this.rootAppVue.$childrenRefs = {};
      }
      this.rootAppVue.$childrenRefs.paramsTable = this.$refs.paramsTable;
      this.rootAppVue.$childrenRefs.lineAttributesForm = this.$refs.lineAttributesForm;
      this.rootAppVue.$childrenRefs.wfForm = this.$refs.wfForm;
      this.rootAppVue.$childrenRefs.wfParams = this.$refs.wfParams;
      this.rootAppVue.$childrenRefs.nodeAttributes = this.$refs.nodeAttributesForm;
      this.rootAppVue.$childrenRefs.nodePeopleDefine = this.$refs.nodePeopleDefine;
      this.rootAppVue.$childrenRefs.nodeChildProcess = this.$refs.nodeChildProcess;
      this.rootAppVue.$childrenRefs.saveWorkFlow = this.$refs.saveWorkFlow;
      this.rootAppVue.$childrenRefs.workFlowSelect = this.$refs.workFlowSelect;
      this.rootAppVue.$childrenRefs.renyuanChuandi = this.$refs.renyuanChuandiDialog;
    },
    methods: {
      paramApplyHandle(val){
        debugger;
        // this.form.paramExpress = val;
      }
    }
  }
</script>

