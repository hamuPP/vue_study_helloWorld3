/**
* Created by tangyue on 20/6/28
*/
<template>
  <div>
    <div id="geInfo">
      <div class="geBlock" style="text-align:center;min-width:50%;">
        <h1>Flowchart Maker and Online Diagram Software</h1>
        <!--<p>-->
          <!--diagrams.net (formerly draw.io) is free online diagram software. You can use it as a flowchart maker, network-->
          <!--diagram software, to create UML online, as an ER diagram tool,-->
          <!--to design database schema, to build BPMN online, as a circuit diagram maker, and more. draw.io can import-->
          <!--.vsdx,-->
          <!--Gliffy&trade; and Lucidchart&trade; files .-->
        <!--</p>-->
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

  </div>
</template>

<script>

  // import Vue from 'vue'

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
  import {showDialog_ME} from '../../../public/drawio_myFlowC2/js/myProj/ME'

  import paramsTable from '../drawio_myFlowChart/paramsTable'
  import lineAttributesForm from '../drawio_myFlowChart/line/lineAttributesForm'
  import wfEditForm from '../drawio_myFlowChart/wfForm/wfForm'
  import wfParamTable from '../drawio_myFlowChart/wfForm/wfParamEditTable.vue'
  export default {
    name: "can-iframe-use",
    inject: ['rootAppVue'],
    components: {paramsTable, lineAttributesForm, wfEditForm, wfParamTable},
    created() {
      window.showDialog_ME = showDialog_ME;
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
            drawDevUrl + 'js/diagramly/StorageFile.js',
            drawDevUrl + 'js/diagramly/StorageLibrary.js',
            drawDevUrl + 'js/diagramly/Dialogs.js',
            drawDevUrl + 'js/diagramly/Editor.js',
            drawDevUrl + 'js/diagramly/EditorUi.js',
            drawDevUrl + 'js/diagramly/DiffSync.js',
            drawDevUrl + 'js/diagramly/Settings.js',
            drawDevUrl + 'js/diagramly/DrawioFileSync.js',

            drawDevUrl + 'js/diagramly/DrawioComment.js',
            drawDevUrl + 'js/diagramly/DriveComment.js',

            drawDevUrl + 'js/diagramly/DrawioClient.js',
            drawDevUrl + 'js/diagramly/DrawioUser.js',

            drawDevUrl + 'js/diagramly/App.js',
            drawDevUrl + 'js/diagramly/Menus.js',

            drawDevUrl + 'js/diagramly/Pages.js',
            drawDevUrl + 'js/diagramly/Trees.js',
            drawDevUrl + 'js/diagramly/DistanceGuides.js',
            drawDevUrl + 'js/diagramly/mxRuler.js',
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
    },
    methods: {
      paramApplyHandle(val){
        debugger;
        // this.form.paramExpress = val;
      }
    }
  }
</script>

<style>
  @import "../../../public/drawio_myFlowC2/css/proj.css";
  @import "../../../public/drawio_myFlowC2/css/my-proj.css";
</style>
