/**
* Created by tangyue on 20/6/28
*/
<template>
  <div>
    <div id="geInfo">
      <div class="geBlock" style="text-align:center;min-width:50%;">
        <h1>Flowchart Maker and Online Diagram Software</h1>
        <p>
          diagrams.net (formerly draw.io) is free online diagram software. You can use it as a flowchart maker, network
          diagram software, to create UML online, as an ER diagram tool,
          to design database schema, to build BPMN online, as a circuit diagram maker, and more. draw.io can import .vsdx,
          Gliffy&trade; and Lucidchart&trade; files .
        </p>
        <h2 id="geStatus">Loading...</h2>
        <p>
          Please ensure JavaScript is enabled.
        </p>
      </div>
    </div>
    <div id="myMainContainer" class="myMainContainer"></div>
  </div>
</template>

<script>
  /**
   * Synchronously adds scripts to the page.
   */
  function mxscriptHead(src, onLoad, id, dataAppKey, noWrite) {
    if (onLoad != null || noWrite) {
      var s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', src);
      var r = false;

      if (id != null) {
        s.setAttribute('id', id);
      }

      if (dataAppKey != null) {
        s.setAttribute('data-app-key', dataAppKey);
      }

      if (onLoad != null) {
        s.onload = s.onreadystatechange = function () {
          if (!r && (!this.readyState || this.readyState == 'complete')) {
            r = true;
            onLoad();
          }
        };
      }

      var t = document.getElementsByTagName('script')[0];

      if (t != null) {
        t.parentNode.insertBefore(s, t);
      }
    }
    else {
      console.log(src)
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      document.head.appendChild(s);
    }
  }

  function mxscript(src, onLoad, id, dataAppKey, noWrite) {
    if (onLoad != null || noWrite) {
      var s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', src);
      var r = false;

      if (id != null) {
        s.setAttribute('id', id);
      }

      if (dataAppKey != null) {
        s.setAttribute('data-app-key', dataAppKey);
      }

      if (onLoad != null) {
        s.onload = s.onreadystatechange = function () {
          if (!r && (!this.readyState || this.readyState == 'complete')) {
            r = true;
            onLoad();
          }
        };
      }

      var t = document.getElementsByTagName('script')[0];

      if (t != null) {
        t.parentNode.insertBefore(s, t);
      }
    }
    else {
      console.log(src)
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      document.body.appendChild(s);
    }
  }

  var mxDevUrl = 'drawio_myFlowC2/';

  var geBasePath = mxDevUrl + 'js/mxgraph/';
  var drawDevUrl = mxDevUrl;
  mxscriptHead(drawDevUrl + 'js/PreConfig.js');
  mxscriptHead(drawDevUrl + 'js/diagramly/Init.js');
  mxscriptHead(geBasePath + '/Init.js');
  // mxscriptHead(mxDevUrl + '/js/mxgraph/mxClient.js');

  import '../../../public/drawio_myFlowC2/js/mxgraph/mxClient.js'

  mxscript(drawDevUrl + 'js/PostConfig.js');

  export default {
    name: "can-iframe-use",
    created(){
      window.urlParams = (function () {
        var result = new Object();
        var params = window.location.search.slice(1).split('&');

        for (var i = 0; i < params.length; i++) {
          var idx = params[i].indexOf('=');
          if (idx > 0) {
            result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
          }
        }

        return result;
      })();
      debugger;


    },
    mounted(){
      debugger;
      this.$nextTick(()=>{
        debugger;
      })

      mxscript(drawDevUrl + 'js/cryptojs/aes.min.js');
      mxscript(drawDevUrl + 'js/spin/spin.min.js');
      mxscript(drawDevUrl + 'js/deflate/pako.min.js');
      mxscript(drawDevUrl + 'js/deflate/base64.js');
      mxscript(drawDevUrl + 'js/jscolor/jscolor.js');
      mxscript(drawDevUrl + 'js/sanitizer/sanitizer.min.js');
      mxscript(drawDevUrl + 'js/croppie/croppie.min.js');

      // Uses grapheditor from devhost
      mxscript(geBasePath +'/Editor.js');
      mxscript(geBasePath +'/EditorUi.js');
      mxscript(geBasePath +'/Sidebar.js');
      mxscript(geBasePath +'/Graph.js');
      mxscript(geBasePath +'/Format.js');
      mxscript(geBasePath +'/Shapes.js');
      mxscript(geBasePath +'/Actions.js');
      mxscript(geBasePath +'/Menus.js');
      mxscript(geBasePath +'/Toolbar.js');
      mxscript(geBasePath +'/Dialogs.js');

      // Loads main classes
      mxscript(drawDevUrl + 'js/diagramly/sidebar/Sidebar.js');

      mxscript(drawDevUrl + 'js/diagramly/util/mxJsCanvas.js');
      mxscript(drawDevUrl + 'js/diagramly/util/mxAsyncCanvas.js');

      mxscript(drawDevUrl + 'js/diagramly/DrawioFile.js');
      mxscript(drawDevUrl + 'js/diagramly/LocalFile.js');
      mxscript(drawDevUrl + 'js/diagramly/LocalLibrary.js');
      mxscript(drawDevUrl + 'js/diagramly/StorageFile.js');
      mxscript(drawDevUrl + 'js/diagramly/StorageLibrary.js');
      mxscript(drawDevUrl + 'js/diagramly/RemoteFile.js');
      mxscript(drawDevUrl + 'js/diagramly/RemoteLibrary.js');
      mxscript(drawDevUrl + 'js/diagramly/Dialogs.js');
      mxscript(drawDevUrl + 'js/diagramly/Editor.js');
      mxscript(drawDevUrl + 'js/diagramly/EditorUi.js');
      mxscript(drawDevUrl + 'js/diagramly/DiffSync.js');
      mxscript(drawDevUrl + 'js/diagramly/Settings.js');
      mxscript(drawDevUrl + 'js/diagramly/DrawioFileSync.js');

//Comments
      mxscript(drawDevUrl + 'js/diagramly/DrawioComment.js');
      mxscript(drawDevUrl + 'js/diagramly/DriveComment.js');

// Excluded in base.min.js
      mxscript(drawDevUrl + 'js/diagramly/DrawioClient.js');
      mxscript(drawDevUrl + 'js/diagramly/DrawioUser.js');
      mxscript(drawDevUrl + 'js/diagramly/UrlLibrary.js');
      mxscript(drawDevUrl + 'js/diagramly/DriveFile.js');
      mxscript(drawDevUrl + 'js/diagramly/DriveLibrary.js');

      mxscript(drawDevUrl + 'js/diagramly/App.js');
      mxscript(drawDevUrl + 'js/diagramly/Menus.js');
      mxscript(drawDevUrl + 'js/diagramly/Pages.js');
      mxscript(drawDevUrl + 'js/diagramly/Trees.js');
      mxscript(drawDevUrl + 'js/diagramly/Minimal.js');
      mxscript(drawDevUrl + 'js/diagramly/DistanceGuides.js');
      mxscript(drawDevUrl + 'js/diagramly/mxRuler.js');
      mxscript(drawDevUrl + 'js/diagramly/mxFreehand.js');
      mxscript(drawDevUrl + 'js/diagramly/DevTools.js');

// Vsdx/vssx support
      mxscript(drawDevUrl + 'js/diagramly/vsdx/VsdxExport.js');
      mxscript(drawDevUrl + 'js/diagramly/vsdx/mxVsdxCanvas2D.js');
      mxscript(drawDevUrl + 'js/diagramly/vsdx/bmpDecoder.js');
      mxscript(drawDevUrl + 'js/diagramly/vsdx/importer.js');
      mxscript(drawDevUrl + 'js/jszip/jszip.min.js');

// GraphMl Import
      mxscript(drawDevUrl + 'js/diagramly/graphml/mxGraphMlCodec.js');

      // App.main();

      // this.$nextTick(()=>{
      // })
    }
  }
</script>
