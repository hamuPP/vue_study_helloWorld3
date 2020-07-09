/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 */
(function () {
  var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
  mxPopupMenu.prototype.showMenu = function () {
    mxPopupMenuShowMenu.apply(this, arguments);

    this.div.style.overflowY = 'auto';
    this.div.style.overflowX = 'hidden';
    var h0 = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    this.div.style.maxHeight = (h0 - 10) + 'px';
  };

  Menus.prototype.createHelpLink = function (href) {
    var link = document.createElement('span');
    link.setAttribute('title', mxResources.get('help'));
    link.style.cssText = 'color:blue;text-decoration:underline;margin-left:8px;cursor:help;';

    var icon = document.createElement('img');
    mxUtils.setOpacity(icon, 50);
    icon.style.height = '16px';
    icon.style.width = '16px';
    icon.setAttribute('border', '0');
    icon.setAttribute('valign', 'bottom');
    icon.setAttribute('src', Editor.helpImage);
    link.appendChild(icon);

    mxEvent.addGestureListeners(link, mxUtils.bind(this, function (evt) {
      if (this.editorUi.menubar != null) {
        this.editorUi.menubar.hideMenu();
      }

      this.editorUi.openLink(href);
      mxEvent.consume(evt);
    }));

    return link;
  };

  Menus.prototype.addLinkToItem = function (item, href) {
    if (item != null) {
      item.firstChild.nextSibling.appendChild(this.createHelpLink(href));
    }
  };

  var menusInit = Menus.prototype.init;
  Menus.prototype.init = function () {
    menusInit.apply(this, arguments);
    var editorUi = this.editorUi;
    var graph = editorUi.editor.graph;
    var isGraphEnabled = mxUtils.bind(graph, graph.isEnabled);

    if (!mxClient.IS_SVG && !editorUi.isOffline()) {
      var img = new Image();
      img.src = IMAGE_PATH + '/help.png';
    }

    // 新增一个方法：直接进入空白的新建模式
    // 2020年06月28日13:53:34
    // by: ty
    editorUi.actions.addAction('myOpenNew...', function () {
      var title = '新建流程';//新建时的默认名称

      if (title && title.length) {
        editorUi.pickFolder('device',
          function(folderId) {
          editorUi.createFile(title, undefined, null, null, function() {

          }, null, folderId, null, null);
        },
          true);
      }

    });

    editorUi.actions.addAction('new...', function () {
      var dlg = new NewDialog(editorUi, false);

      editorUi.showDialog(dlg.container,  620, 440, true, true, function (cancel) {
        if (cancel && editorUi.getCurrentFile() == null) {
          editorUi.showSplash();
        }
      });

      dlg.init();
    });

    editorUi.actions.put('exportSvg', new Action(mxResources.get('formatSvg') + '...', function () {
      editorUi.showExportDialog(mxResources.get('formatSvg'), true, mxResources.get('export'),
        'https://support.draw.io/display/DO/Exporting+Files',
        mxUtils.bind(this, function (scale, transparentBackground, ignoreSelection, addShadow,
                                     editable, embedImages, border, cropImage, currentPage, linkTarget) {
          var val = parseInt(scale);

          if (!isNaN(val) && val > 0) {
            editorUi.exportSvg(val / 100, transparentBackground, ignoreSelection, addShadow,
              editable, embedImages, border, !cropImage, currentPage, linkTarget);
          }
        }), true, null, 'svg');
    }));

    editorUi.actions.put('insertTemplate', new Action(mxResources.get('template') + '...', function () {
      var dlg = new NewDialog(editorUi, null, false, function (xml) {
          editorUi.hideDialog();

          if (xml != null) {
            var insertPoint = editorUi.editor.graph.getFreeInsertPoint();
            graph.setSelectionCells(editorUi.importXml(xml,
              Math.max(insertPoint.x, 20),
              Math.max(insertPoint.y, 20), true));
            graph.scrollCellToVisible(graph.getSelectionCell());
          }
        }, null, null, null, null, null, null, null, null, null, null,
        false, mxResources.get('insert'));

      editorUi.showDialog(dlg.container, 620, 440, true, true);
    })).isEnabled = isGraphEnabled;

    var pointAction = editorUi.actions.addAction('points', function () {
      editorUi.editor.graph.view.setUnit(mxConstants.POINTS);
    });

    pointAction.setToggleAction(true);
    pointAction.setSelectedCallback(function () {
      return editorUi.editor.graph.view.unit == mxConstants.POINTS;
    });

    var inchAction = editorUi.actions.addAction('inches', function () {
      editorUi.editor.graph.view.setUnit(mxConstants.INCHES);
    });

    inchAction.setToggleAction(true);
    inchAction.setSelectedCallback(function () {
      return editorUi.editor.graph.view.unit == mxConstants.INCHES;
    });

    var mmAction = editorUi.actions.addAction('millimeters', function () {
      editorUi.editor.graph.view.setUnit(mxConstants.MILLIMETERS);
    });

    mmAction.setToggleAction(true);
    mmAction.setSelectedCallback(function () {
      return editorUi.editor.graph.view.unit == mxConstants.MILLIMETERS;
    });

    editorUi.actions.put('exportXml', new Action(mxResources.get('formatXml') + '...', function () {
      var div = document.createElement('div');
      div.style.whiteSpace = 'nowrap';
      var noPages = editorUi.pages == null || editorUi.pages.length <= 1;

      var hd = document.createElement('h3');
      mxUtils.write(hd, mxResources.get('formatXml'));
      hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
      div.appendChild(hd);

      var selection = editorUi.addCheckbox(div, mxResources.get('selectionOnly'),
        false, graph.isSelectionEmpty());
      var compressed = editorUi.addCheckbox(div, mxResources.get('compressed'), true);
      var pages = editorUi.addCheckbox(div, mxResources.get('allPages'), !noPages, noPages);
      pages.style.marginBottom = '16px';

      mxEvent.addListener(selection, 'change', function () {
        if (selection.checked) {
          pages.setAttribute('disabled', 'disabled');
        }
        else {
          pages.removeAttribute('disabled');
        }
      });

      var dlg = new CustomDialog(editorUi, div, mxUtils.bind(this, function () {
        editorUi.downloadFile('xml', !compressed.checked, null,
          !selection.checked, noPages || !pages.checked);
      }), null, mxResources.get('export'));

      editorUi.showDialog(dlg.container, 300, 180, true, true);
    }));

    editorUi.actions.put('exportUrl', new Action(mxResources.get('url') + '...', function () {
      editorUi.showPublishLinkDialog(mxResources.get('url'), true, null, null,
        function (linkTarget, linkColor, allPages, lightbox, editLink, layers) {
          var dlg = new EmbedDialog(editorUi, editorUi.createLink(linkTarget,
            linkColor, allPages, lightbox, editLink, layers, null, true));
          editorUi.showDialog(dlg.container, 440, 240, true, true);
          dlg.init();
        });
    }));

    editorUi.actions.put('exportHtml', new Action(mxResources.get('formatHtmlEmbedded') + '...', function () {
      if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
        editorUi.getPublicUrl(editorUi.getCurrentFile(), function (url) {
          editorUi.spinner.stop();

          editorUi.showHtmlDialog(mxResources.get('export'), null, url, function (publicUrl, zoomEnabled,
                                                                                  initialZoom, linkTarget, linkColor, fit, allPages, layers, lightbox, editLink) {
            editorUi.createHtml(publicUrl, zoomEnabled, initialZoom, linkTarget, linkColor,
              fit, allPages, layers, lightbox, editLink, mxUtils.bind(this, function (html, scriptTag) {
                var basename = editorUi.getBaseFilename(allPages);
                var result = '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' +
                  '<!DOCTYPE html>\n<html>\n<head>\n<title>' + mxUtils.htmlEntities(basename) + '</title>\n' +
                  '<meta charset="utf-8"/>\n</head>\n<body>' + html + '\n' + scriptTag + '\n</body>\n</html>';
                editorUi.saveData(basename + '.html', 'html', result, 'text/html');
              }));
          });
        });
      }
    }));

    editorUi.actions.put('exportPdf', new Action(mxResources.get('formatPdf') + '...', function () {
      if (editorUi.isOffline() || editorUi.printPdfExport) {
        // Export PDF action for chrome OS (same as print with different dialog title)
        editorUi.showDialog(new PrintDialog(editorUi, mxResources.get('formatPdf')).container, 360,
          (editorUi.pages != null && editorUi.pages.length > 1) ?
            450 : 370, true, true);
      }
      else {
        var noPages = editorUi.pages == null || editorUi.pages.length <= 1;
        var div = document.createElement('div');
        div.style.whiteSpace = 'nowrap';

        var hd = document.createElement('h3');
        mxUtils.write(hd, mxResources.get('formatPdf'));
        hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
        div.appendChild(hd);

        var cropEnableFn = function () {
          if (allPages != this && this.checked) {
            crop.removeAttribute('disabled');
          }
          else {
            crop.setAttribute('disabled', 'disabled');
            crop.checked = false;
          }
        };

        var dlgH = 180;

        if (editorUi.pdfPageExport && !noPages) {
          var allPages = editorUi.addRadiobox(div, 'pages', mxResources.get('allPages'), true);
          var currentPage = editorUi.addRadiobox(div, 'pages', mxResources.get('currentPage'), false);
          var selection = editorUi.addRadiobox(div, 'pages', mxResources.get('selectionOnly'), false, graph.isSelectionEmpty());
          var crop = editorUi.addCheckbox(div, mxResources.get('crop'), false, true);
          var grid = editorUi.addCheckbox(div, mxResources.get('grid'), false, false);

          mxEvent.addListener(allPages, 'change', cropEnableFn);
          mxEvent.addListener(currentPage, 'change', cropEnableFn);
          mxEvent.addListener(selection, 'change', cropEnableFn);
          dlgH = 240;
        }
        else {
          var selection = editorUi.addCheckbox(div, mxResources.get('selectionOnly'),
            false, graph.isSelectionEmpty());
          var crop = editorUi.addCheckbox(div, mxResources.get('crop'),
            !graph.pageVisible || !editorUi.pdfPageExport,
            !editorUi.pdfPageExport);
          var grid = editorUi.addCheckbox(div, mxResources.get('grid'), false, false);

          // Crop is only enabled if selection only is selected
          if (!editorUi.pdfPageExport) {
            mxEvent.addListener(selection, 'change', cropEnableFn);
          }
        }

        var includeOption = !mxClient.IS_CHROMEAPP && editorUi.getServiceName() == 'draw.io';
        var include = (includeOption) ? editorUi.addCheckbox(div,
          mxResources.get('includeCopyOfMyDiagram'), true) : null;

        if (includeOption) {
          dlgH += 30;
        }

        var dlg = new CustomDialog(editorUi, div, mxUtils.bind(this, function () {
          editorUi.downloadFile('pdf', null, null, !selection.checked,
            noPages ? true : !allPages.checked, !crop.checked, null, null,
            null, grid.checked, include != null && include.checked);
        }), null, mxResources.get('export'));
        editorUi.showDialog(dlg.container, 300, dlgH, true, true);
      }
    }));

    editorUi.actions.addAction('open...', function () {
      debugger;// 检查open是哪里会调用
      editorUi.pickFile();
    });

    editorUi.actions.addAction('close', function () {
      var currentFile = editorUi.getCurrentFile();

      function fn() {
        if (currentFile != null) {
          currentFile.removeDraft();
        }

        editorUi.fileLoaded(null);
      };

      if (currentFile != null && currentFile.isModified()) {
        editorUi.confirm(mxResources.get('allChangesLost'), null, fn,
          mxResources.get('cancel'), mxResources.get('discardChanges'));
      }
      else {
        fn();
      }
    });

    editorUi.actions.addAction('editShape...', mxUtils.bind(this, function () {
      var cells = graph.getSelectionCells();

      if (graph.getSelectionCount() == 1) {
        var cell = graph.getSelectionCell();
        var state = graph.view.getState(cell);

        if (state != null && state.shape != null && state.shape.stencil != null) {
          var dlg = new EditShapeDialog(editorUi, cell, mxResources.get('editShape') + ':', 630, 400);
          editorUi.showDialog(dlg.container, 640, 480, true, false);
          dlg.init();
        }
      }
    }));

    editorUi.actions.addAction('revisionHistory...', function () {
      if (!editorUi.isRevisionHistorySupported()) {
        editorUi.showError(mxResources.get('error'), mxResources.get('notAvailable'), mxResources.get('ok'));
      }
      else if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
        editorUi.getRevisions(mxUtils.bind(this, function (revs, restoreFn) {
          editorUi.spinner.stop();
          var dlg = new RevisionDialog(editorUi, revs, restoreFn);
          editorUi.showDialog(dlg.container, 640, 480, true, true);
          dlg.init();
        }), mxUtils.bind(this, function (err) {
          editorUi.handleError(err);
        }));
      }
    });

    editorUi.actions.addAction('createRevision', function () {
      debugger;
      editorUi.actions.get('save').funct();
    }, null, null, Editor.ctrlKey + '+S');

    var action = editorUi.actions.addAction('synchronize', function () {
      editorUi.synchronizeCurrentFile(DrawioFile.SYNC == 'none');
    }, null, null, 'Alt+Shift+S');

    // Changes the label if synchronization is disabled
    if (DrawioFile.SYNC == 'none') {
      action.label = mxResources.get('refresh');
    }

    editorUi.actions.addAction('upload...', function () {
      var file = editorUi.getCurrentFile();

      if (file != null) {
        // Data is pulled from global variable after tab loads
        // LATER: Change to use message passing to deal with potential cross-domain
        window.drawdata = editorUi.getFileData();
        var filename = (file.getTitle() != null) ? file.getTitle() : editorUi.defaultFilename;
        editorUi.openLink(window.location.protocol + '//' + window.location.host + '/?create=drawdata&' +
          ((editorUi.mode == App.MODE_DROPBOX) ? 'mode=dropbox&' : '') +
          'title=' + encodeURIComponent(filename), null, true);
      }
    });

    if (isLocalStorage || mxClient.IS_CHROMEAPP) {
      var action = editorUi.actions.addAction('showStartScreen', function () {
        mxSettings.setShowStartScreen(!mxSettings.getShowStartScreen());
        mxSettings.save();
      });

      action.setToggleAction(true);
      action.setSelectedCallback(function () {
        return mxSettings.getShowStartScreen();
      });
    }

    var autosaveAction = editorUi.actions.addAction('autosave', function () {
      editorUi.editor.setAutosave(!editorUi.editor.autosave);
    });

    autosaveAction.setToggleAction(true);
    autosaveAction.setSelectedCallback(function () {
      return autosaveAction.isEnabled() && editorUi.editor.autosave;
    });

    var compressedAction = editorUi.actions.addAction('compressed', function () {
      var file = editorUi.getCurrentFile();

      if (file != null) {
        if (file.isCompressed()) {
          file.decompress();
        }
        else {
          file.compress();
        }
      }
    });

    compressedAction.setToggleAction(true);

    compressedAction.setSelectedCallback(function () {
      var file = editorUi.getCurrentFile();

      return file != null && file.isCompressed();
    });

    compressedAction.isEnabled = function () {
      return editorUi.getCurrentFile() != null;
    }

    editorUi.actions.addAction('editGeometry...', function () {
      var cells = graph.getSelectionCells();
      var vertices = [];

      for (var i = 0; i < cells.length; i++) {
        if (graph.getModel().isVertex(cells[i])) {
          vertices.push(cells[i]);
        }
      }

      if (vertices.length > 0) {
        var dlg = new EditGeometryDialog(editorUi, vertices);
        editorUi.showDialog(dlg.container, 200, 250, true, true);
        dlg.init();
      }
    }, null, null, Editor.ctrlKey + '+Shift+M');

    var copiedStyles = ['rounded', 'shadow', 'dashed', 'dashPattern', 'fontFamily', 'fontSize', 'fontColor', 'fontStyle',
      'align', 'verticalAlign', 'strokeColor', 'strokeWidth', 'fillColor', 'gradientColor', 'swimlaneFillColor',
      'textOpacity', 'gradientDirection', 'glass', 'labelBackgroundColor', 'labelBorderColor', 'opacity',
      'spacing', 'spacingTop', 'spacingLeft', 'spacingBottom', 'spacingRight', 'endFill', 'endArrow',
      'endSize', 'targetPerimeterSpacing', 'startFill', 'startArrow', 'startSize', 'sourcePerimeterSpacing',
      'arcSize'];

    editorUi.actions.addAction('copyStyle', function () {
      var state = graph.view.getState(graph.getSelectionCell());

      if (graph.isEnabled() && state != null) {
        editorUi.copiedStyle = mxUtils.clone(state.style);

        // Handles special case for value "none"
        var cellStyle = graph.getModel().getStyle(state.cell);
        var tokens = (cellStyle != null) ? cellStyle.split(';') : [];

        for (var j = 0; j < tokens.length; j++) {
          var tmp = tokens[j];
          var pos = tmp.indexOf('=');

          if (pos >= 0) {
            var key = tmp.substring(0, pos);
            var value = tmp.substring(pos + 1);

            if (editorUi.copiedStyle[key] == null && value == 'none') {
              editorUi.copiedStyle[key] = 'none';
            }
          }
        }
      }
    }, null, null, Editor.ctrlKey + '+Shift+C');

    editorUi.actions.addAction('pasteStyle', function () {
      if (graph.isEnabled() && !graph.isSelectionEmpty() && editorUi.copiedStyle != null) {
        graph.getModel().beginUpdate();

        try {
          var cells = graph.getSelectionCells();

          for (var i = 0; i < cells.length; i++) {
            var state = graph.view.getState(cells[i]);

            for (var j = 0; j < copiedStyles.length; j++) {
              var key = copiedStyles[j];
              var value = editorUi.copiedStyle[key];

              if (state.style[key] != value) {
                graph.setCellStyles(key, value, [cells[i]]);
              }
            }
          }
        }
        finally {
          graph.getModel().endUpdate();
        }
      }
    }, null, null, Editor.ctrlKey + '+Shift+V');

    editorUi.actions.put('pageBackgroundImage', new Action(mxResources.get('backgroundImage') + '...', function () {
      if (!editorUi.isOffline()) {
        var apply = function (image) {
          editorUi.setBackgroundImage(image);
        };

        var dlg = new BackgroundImageDialog(editorUi, apply);
        editorUi.showDialog(dlg.container, 320, 170, true, true);
        dlg.init();
      }
    }));

    editorUi.actions.put('exportPng', new Action(mxResources.get('formatPng') + '...', function () {
      if (editorUi.isExportToCanvas()) {
        editorUi.showExportDialog(mxResources.get('image'), false, mxResources.get('export'),
          'https://support.draw.io/display/DO/Exporting+Files',
          mxUtils.bind(this, function (scale, transparentBackground, ignoreSelection,
                                       addShadow, editable, embedImages, border, cropImage, currentPage, dummy, grid) {
            var val = parseInt(scale);

            if (!isNaN(val) && val > 0) {
              editorUi.exportImage(val / 100, transparentBackground, ignoreSelection,
                addShadow, editable, border, !cropImage, currentPage, null, grid);
            }
          }), true, true, 'png');
      }
      else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone)) {
        editorUi.showRemoteExportDialog(mxResources.get('export'), null, mxUtils.bind(this, function (ignoreSelection, editable, transparent, scale, border) {
          editorUi.downloadFile((editable) ? 'xmlpng' : 'png', null, null, ignoreSelection, null, null, transparent, scale, border);
        }), false, true);
      }
    }));

    editorUi.actions.put('exportJpg', new Action(mxResources.get('formatJpg') + '...', function () {
      if (editorUi.isExportToCanvas()) {
        editorUi.showExportDialog(mxResources.get('image'), false, mxResources.get('export'),
          'https://support.draw.io/display/DO/Exporting+Files',
          mxUtils.bind(this, function (scale, transparentBackground, ignoreSelection,
                                       addShadow, editable, embedImages, border, cropImage, currentPage, dummy, grid) {
            var val = parseInt(scale);

            if (!isNaN(val) && val > 0) {
              editorUi.exportImage(val / 100, false, ignoreSelection,
                addShadow, false, border, !cropImage, false, 'jpeg', grid);
            }
          }), true, false, 'jpeg');
      }
      else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone)) {
        editorUi.showRemoteExportDialog(mxResources.get('export'), null, mxUtils.bind(this, function (ignoreSelection, editable, tranaparent, scale, border) {
          editorUi.downloadFile('jpeg', null, null, ignoreSelection, null, null, null, scale, border);
        }), true, true);
      }
    }));

    var showingAbout = false;

    editorUi.actions.addAction('exportOptionsDisabled...', function () {
      editorUi.handleError({message: mxResources.get('exportOptionsDisabledDetails')},
        mxResources.get('exportOptionsDisabled'));
    });

    action = editorUi.actions.addAction('find...', mxUtils.bind(this, function () {
      if (this.findWindow == null) {
        this.findWindow = new FindWindow(editorUi, document.body.offsetWidth - 300, 110, 240, 155);
        this.findWindow.window.addListener('show', function () {
          editorUi.fireEvent(new mxEventObject('find'));
        });
        this.findWindow.window.addListener('hide', function () {
          editorUi.fireEvent(new mxEventObject('find'));
        });
        this.findWindow.window.setVisible(true);
        editorUi.fireEvent(new mxEventObject('find'));
      }
      else {
        this.findWindow.window.setVisible(!this.findWindow.window.isVisible());
      }
    }));
    action.setToggleAction(true);
    action.setSelectedCallback(mxUtils.bind(this, function () {
      return this.findWindow != null && this.findWindow.window.isVisible();
    }));

    if (isLocalStorage && localStorage != null && urlParams['embed'] != '1') {
      editorUi.actions.addAction('configuration...', function () {
        // Add help, link button
        var value = localStorage.getItem('.configuration');

        var dlg = new TextareaDialog(editorUi, mxResources.get('configuration') + ':',
          (value != null) ? JSON.stringify(JSON.parse(value), null, 2) : '', function (newValue) {
            if (newValue != null) {
              try {
                if (newValue.length > 0) {
                  var obj = JSON.parse(newValue);

                  localStorage.setItem('.configuration', JSON.stringify(obj));
                }
                else {
                  localStorage.removeItem('.configuration');
                }

                editorUi.hideDialog();
                editorUi.alert(mxResources.get('restartForChangeRequired'));
              }
              catch (e) {
                editorUi.handleError(e);
              }
            }
          }, null, null, null, null, null, true, null, null,
          'https://desk.draw.io/support/solutions/articles/16000058316',
          [[mxResources.get('reset'), function (evt, input) {
            editorUi.confirm(mxResources.get('areYouSure'), function () {
              try {
                localStorage.removeItem('.configuration');
                localStorage.removeItem('.drawio-config');
                localStorage.removeItem('.mode');

                editorUi.hideDialog();
                editorUi.alert(mxResources.get('restartForChangeRequired'));
              }
              catch (e) {
                editorUi.handleError(e);
              }
            });
          }], [mxResources.get('link'), function (evt, input) {
            if (input.value.length > 0) {
              try {
                var obj = JSON.parse(input.value);
                var url = window.location.protocol + '//' + window.location.host +
                  '/' + editorUi.getSearch() + '#_CONFIG_' +
                  Graph.compress(JSON.stringify(obj));
                var dlg = new EmbedDialog(editorUi, url);
                editorUi.showDialog(dlg.container, 440, 240, true);
                dlg.init();
              }
              catch (e) {
                editorUi.handleError(e);
              }
            }
            else {
              editorUi.handleError({message: mxResources.get('invalidInput')});
            }
          }]]);

        dlg.textarea.style.width = '600px';
        dlg.textarea.style.height = '380px';
        editorUi.showDialog(dlg.container, 620, 460, true, false);
        dlg.init();
      });
    }

    // Adds language menu to options only if localStorage is available for
    // storing the choice. We do not want to use cookies for older browsers.
    // Note that the URL param lang=XX is available for setting the language
    // in older browsers. URL param has precedence over the saved setting.
    if (mxClient.IS_CHROMEAPP || isLocalStorage) {
      this.put('language', new Menu(mxUtils.bind(this, function (menu, parent) {
        var addLangItem = mxUtils.bind(this, function (id) {
          var lang = (id == '') ? mxResources.get('automatic') : mxLanguageMap[id];
          var item = null;

          if (lang != '') {
            item = menu.addItem(lang, null, mxUtils.bind(this, function () {
              mxSettings.setLanguage(id);
              mxSettings.save();

              // Shows dialog in new language
              mxClient.language = id;
              mxResources.loadDefaultBundle = false;
              mxResources.add(RESOURCE_BASE);

              editorUi.alert(mxResources.get('restartForChangeRequired'));
            }), parent);

            if (id == mxLanguage || (id == '' && mxLanguage == null)) {
              menu.addCheckmark(item, Editor.checkmarkImage);
            }
          }

          return item;
        });

        var item = addLangItem('');
        menu.addSeparator(parent);

        // LATER: Sort menu by language name
        for (var langId in mxLanguageMap) {
          addLangItem(langId);
        }
      })));

      // Extends the menubar with the language menu
      var menusCreateMenuBar = Menus.prototype.createMenubar;
      Menus.prototype.createMenubar = function (container) {
        var menubar = menusCreateMenuBar.apply(this, arguments);

        if (menubar != null) {
          var langMenu = this.get('language');

          if (langMenu != null) {
            var elt = menubar.addMenu('', langMenu.funct);
            elt.setAttribute('title', mxResources.get('language'));
            elt.style.width = '16px';
            elt.style.paddingTop = '2px';
            elt.style.paddingLeft = '4px';
            elt.style.zIndex = '1';
            elt.style.position = 'absolute';
            elt.style.display = 'block';
            elt.style.cursor = 'pointer';
            elt.style.right = '17px';

            if (uiTheme == 'atlas') {
              elt.style.top = '6px';
              elt.style.right = '15px';
            }
            else if (uiTheme == 'min') {
              elt.style.top = '2px';
            }
            else {
              elt.style.top = '0px';
            }

            if (!mxClient.IS_VML) {
              var icon = document.createElement('div');
              icon.style.backgroundImage = 'url(' + Editor.globeImage + ')';
              icon.style.backgroundPosition = 'center center';
              icon.style.backgroundRepeat = 'no-repeat';
              icon.style.backgroundSize = '19px 19px';
              icon.style.position = 'absolute';
              icon.style.height = '19px';
              icon.style.width = '19px';
              icon.style.marginTop = '2px';
              icon.style.zIndex = '1';
              elt.appendChild(icon);
              mxUtils.setOpacity(elt, 40);

              if (uiTheme == 'atlas' || uiTheme == 'dark') {
                elt.style.opacity = '0.85';
                elt.style.filter = 'invert(100%)';
              }
            }
            else {
              elt.innerHTML = '<div class="geIcon geSprite geSprite-globe aa-bb`"/>';
            }

            document.body.appendChild(elt);
          }
        }

        return menubar;
      };
    }

    editorUi.customLayoutConfig = [{
      'layout': 'mxHierarchicalLayout',
      'config':
        {
          'orientation': 'west',
          'intraCellSpacing': 30,
          'interRankCellSpacing': 100,
          'interHierarchySpacing': 60,
          'parallelEdgeSpacing': 10
        }
    }];

    editorUi.actions.put('embedHtml', new Action(mxResources.get('html') + '...', function () {
      if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
        editorUi.getPublicUrl(editorUi.getCurrentFile(), function (url) {
          editorUi.spinner.stop();

          editorUi.showHtmlDialog(mxResources.get('create'), 'https://desk.draw.io/support/solutions/articles/16000042542',
            url, function (publicUrl, zoomEnabled, initialZoom, linkTarget, linkColor, fit, allPages, layers, lightbox, editLink) {
              editorUi.createHtml(publicUrl, zoomEnabled, initialZoom, linkTarget, linkColor,
                fit, allPages, layers, lightbox, editLink, mxUtils.bind(this, function (html, scriptTag) {
                  var dlg = new EmbedDialog(editorUi, html + '\n' + scriptTag, null, null, function () {
                    var wnd = window.open();
                    var doc = wnd.document;

                    if (doc != null) {
                      if (document.compatMode === 'CSS1Compat') {
                        doc.writeln('<!DOCTYPE html>');
                      }

                      doc.writeln('<html>');
                      doc.writeln('<head><title>' + encodeURIComponent(mxResources.get('preview')) +
                        '</title><meta charset="utf-8"></head>');
                      doc.writeln('<body>');
                      doc.writeln(html);

                      var direct = mxClient.IS_IE || mxClient.IS_EDGE || document.documentMode != null;

                      if (direct) {
                        doc.writeln(scriptTag);
                      }

                      doc.writeln('</body>');
                      doc.writeln('</html>');
                      doc.close();

                      // Adds script tag after closing page and delay to fix timing issues
                      if (!direct) {
                        var info = wnd.document.createElement('div');
                        info.marginLeft = '26px';
                        info.marginTop = '26px';
                        mxUtils.write(info, mxResources.get('updatingDocument'));

                        var img = wnd.document.createElement('img');
                        img.setAttribute('src', window.location.protocol + '//' + window.location.hostname +
                          '/' + IMAGE_PATH + '/spin.gif');
                        img.style.marginLeft = '6px';
                        info.appendChild(img);

                        wnd.document.body.insertBefore(info, wnd.document.body.firstChild);

                        window.setTimeout(function () {
                          var script = document.createElement('script');
                          script.type = 'text/javascript';
                          script.src = /<script.*?src="(.*?)"/.exec(scriptTag)[1];
                          doc.body.appendChild(script);

                          info.parentNode.removeChild(info);
                        }, 20);
                      }
                    }
                    else {
                      editorUi.handleError({message: mxResources.get('errorUpdatingPreview')});
                    }
                  });
                  editorUi.showDialog(dlg.container, 440, 240, true, true);
                  dlg.init();
                }));
            });
        });
      }
    }));


    editorUi.actions.put('embedImage', new Action(mxResources.get('image') + '...', function () {
      editorUi.showEmbedImageDialog(function (fit, shadow, retina, lightbox, editLink, layers) {
        if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
          editorUi.createEmbedImage(fit, shadow, retina, lightbox, editLink, layers, function (result) {
            editorUi.spinner.stop();
            var dlg = new EmbedDialog(editorUi, result);
            editorUi.showDialog(dlg.container, 440, 240, true, true);
            dlg.init();
          }, function (err) {
            editorUi.spinner.stop();
            editorUi.handleError(err);
          });
        }
      }, mxResources.get('image'), mxResources.get('retina'), editorUi.isExportToCanvas());
    }));

    editorUi.actions.put('embedSvg', new Action(mxResources.get('formatSvg') + '...', function () {
      editorUi.showEmbedImageDialog(function (fit, shadow, image, lightbox, editLink, layers) {
          if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
            editorUi.createEmbedSvg(fit, shadow, image, lightbox, editLink, layers, function (result) {
              editorUi.spinner.stop();

              var dlg = new EmbedDialog(editorUi, result);
              editorUi.showDialog(dlg.container, 440, 240, true, true);
              dlg.init();
            }, function (err) {
              editorUi.spinner.stop();
              editorUi.handleError(err);
            });
          }
        }, mxResources.get('formatSvg'), mxResources.get('image'),
        true, 'https://desk.draw.io/support/solutions/articles/16000042548');
    }));

    editorUi.actions.put('embedIframe', new Action(mxResources.get('iframe') + '...', function () {
      var bounds = graph.getGraphBounds();

      editorUi.showPublishLinkDialog(mxResources.get('iframe'), null, '100%',
        (Math.ceil((bounds.y + bounds.height - graph.view.translate.y) / graph.view.scale) + 2),
        function (linkTarget, linkColor, allPages, lightbox, editLink, layers, width, height) {
          if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
            editorUi.getPublicUrl(editorUi.getCurrentFile(), function (url) {
              editorUi.spinner.stop();

              var dlg = new EmbedDialog(editorUi, '<iframe frameborder="0" style="width:' + width +
                ';height:' + height + ';" src="' + editorUi.createLink(linkTarget, linkColor,
                  allPages, lightbox, editLink, layers, url) + '"></iframe>');
              editorUi.showDialog(dlg.container, 440, 240, true, true);
              dlg.init();
            });
          }
        }, true);
    }));

    editorUi.actions.put('publishLink', new Action(mxResources.get('link') + '...', function () {
      editorUi.showPublishLinkDialog(null, null, null, null,
        function (linkTarget, linkColor, allPages, lightbox, editLink, layers) {
          if (editorUi.spinner.spin(document.body, mxResources.get('loading'))) {
            editorUi.getPublicUrl(editorUi.getCurrentFile(), function (url) {
              editorUi.spinner.stop();
              var dlg = new EmbedDialog(editorUi, editorUi.createLink(linkTarget,
                linkColor, allPages, lightbox, editLink, layers, url));
              editorUi.showDialog(dlg.container, 440, 240, true, true);
              dlg.init();
            });
          }
        });
    }));


    action.setToggleAction(true);
    action.setSelectedCallback(function () {
      return editorUi.sidebar.isEntryVisible('search');
    });

    if (urlParams['embed'] == '1') {
      editorUi.actions.get('save').funct = function (exit) {
        if (graph.isEditing()) {
          graph.stopEditing();
        }

        var data = (urlParams['pages'] != '0' || (editorUi.pages != null && editorUi.pages.length > 1)) ?
          editorUi.getFileData(true) : mxUtils.getXml(editorUi.editor.getGraphXml());

        if (urlParams['proto'] == 'json') {
          var msg = editorUi.createLoadMessage('save');
          msg.xml = data;

          if (exit) {
            msg.exit = true;
          }

          data = JSON.stringify(msg);
        }

        var parent = window.opener || window.parent;
        parent.postMessage(data, '*');

        if (urlParams['modified'] != '0' && urlParams['keepmodified'] != '1') {
          editorUi.editor.modified = false;
          editorUi.editor.setStatus('');
        }

        //Add support to saving files if embedded mode is running with files
        var file = editorUi.getCurrentFile();

        if (file != null) {
          editorUi.saveFile();
        }
      };

      editorUi.actions.addAction('saveAndExit', function () {
        editorUi.actions.get('save').funct(true);
      });

      editorUi.actions.addAction('exit', function () {
        var fn = function () {
          editorUi.editor.modified = false;
          var msg = (urlParams['proto'] == 'json') ? JSON.stringify({
            event: 'exit',
            modified: editorUi.editor.modified
          }) : '';
          var parent = window.opener || window.parent;
          parent.postMessage(msg, '*');
        }

        if (!editorUi.editor.modified) {
          fn();
        }
        else {
          editorUi.confirm(mxResources.get('allChangesLost'), null, fn,
            mxResources.get('cancel'), mxResources.get('discardChanges'));
        }
      });
    }

    this.put('exportAs', new Menu(mxUtils.bind(this, function (menu, parent) {
      if (editorUi.isExportToCanvas()) {
        this.addMenuItems(menu, ['exportPng'], parent);

        if (editorUi.jpgSupported) {
          this.addMenuItems(menu, ['exportJpg'], parent);
        }
      }

      // Disabled for standalone mode in iOS because new tab cannot be closed
      else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone)) {
        this.addMenuItems(menu, ['exportPng', 'exportJpg'], parent);
      }

      this.addMenuItems(menu, ['exportSvg', '-'], parent);

      // Redirects export to PDF to print in Chrome App
      if (editorUi.isOffline() || editorUi.printPdfExport) {
        this.addMenuItems(menu, ['exportPdf'], parent);
      }
      // Disabled for standalone mode in iOS because new tab cannot be closed
      else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone)) {
        this.addMenuItems(menu, ['exportPdf'], parent);
      }

      this.addMenuItems(menu, ['-', 'exportHtml', 'exportXml', 'exportUrl'], parent);

      if (!editorUi.isOffline()) {
        menu.addSeparator(parent);
        this.addMenuItem(menu, 'export', parent).firstChild.nextSibling.innerHTML = mxResources.get('advanced') + '...';
      }
    })));

    this.put('importFrom', new Menu(mxUtils.bind(this, function (menu, parent) {
      var doImportFile = mxUtils.bind(this, function (data, mime, filename) {
        // Gets insert location
        var view = graph.view;
        var bds = graph.getGraphBounds();
        var x = graph.snap(Math.ceil(Math.max(0, bds.x / view.scale - view.translate.x) + 4 * graph.gridSize));
        var y = graph.snap(Math.ceil(Math.max(0, (bds.y + bds.height) / view.scale - view.translate.y) + 4 * graph.gridSize));

        if (data.substring(0, 11) == 'data:image/') {
          editorUi.loadImage(data, mxUtils.bind(this, function (img) {
            var resizeImages = true;

            var doInsert = mxUtils.bind(this, function () {
              editorUi.resizeImage(img, data, mxUtils.bind(this, function (data2, w2, h2) {
                var s = (resizeImages) ? Math.min(1, Math.min(editorUi.maxImageSize / w2, editorUi.maxImageSize / h2)) : 1;

                editorUi.importFile(data, mime, x, y, Math.round(w2 * s), Math.round(h2 * s), filename, function (cells) {
                  editorUi.spinner.stop();
                  graph.setSelectionCells(cells);
                  graph.scrollCellToVisible(graph.getSelectionCell());
                });
              }), resizeImages);
            });

            if (data.length > editorUi.resampleThreshold) {
              editorUi.confirmImageResize(function (doResize) {
                resizeImages = doResize;
                doInsert();
              });
            }
            else {
              doInsert();
            }
          }), mxUtils.bind(this, function () {
            editorUi.handleError({message: mxResources.get('cannotOpenFile')});
          }));
        }
        else {
          editorUi.importFile(data, mime, x, y, 0, 0, filename, function (cells) {
            editorUi.spinner.stop();
            graph.setSelectionCells(cells);
            graph.scrollCellToVisible(graph.getSelectionCell());
          });
        }
      });

      var getMimeType = mxUtils.bind(this, function (filename) {
        var mime = 'text/xml';

        if (/\.png$/i.test(filename)) {
          mime = 'image/png';
        }
        else if (/\.jpe?g$/i.test(filename)) {
          mime = 'image/jpg';
        }
        else if (/\.gif$/i.test(filename)) {
          mime = 'image/gif';
        }
        else if (/\.pdf$/i.test(filename)) {
          mime = 'application/pdf';
        }

        return mime;
      });
      menu.addItem(mxResources.get('device') + '...', null, function () {
        editorUi.importLocalFile(true);
      }, parent);

    }))).isEnabled = isGraphEnabled;


    var renameAction = this.editorUi.actions.addAction('rename...', mxUtils.bind(this, function () {
      var file = this.editorUi.getCurrentFile();

      if (file != null) {
        var filename = (file.getTitle() != null) ? file.getTitle() : this.editorUi.defaultFilename;

        var dlg = new FilenameDialog(this.editorUi, filename, mxResources.get('rename'), mxUtils.bind(this, function (title) {
          if (title != null && title.length > 0 && file != null && title != file.getTitle() &&
            this.editorUi.spinner.spin(document.body, mxResources.get('renaming'))) {
            // Delete old file, save new file in dropbox if autosize is enabled
            file.rename(title, mxUtils.bind(this, function (resp) {
                this.editorUi.spinner.stop();
              }),
              mxUtils.bind(this, function (resp) {
                this.editorUi.handleError(resp, (resp != null) ? mxResources.get('errorRenamingFile') : null);
              }));
          }
        }), (file.constructor == DriveFile || file.constructor == StorageFile) ?
          mxResources.get('diagramName') : null, function (name) {
          if (name != null && name.length > 0) {
            return true;
          }

          editorUi.showError(mxResources.get('error'), mxResources.get('invalidName'), mxResources.get('ok'));

          return false;
        }, null, null, null, null, editorUi.editor.fileExtensions);
        this.editorUi.showDialog(dlg.container, 340, 90, true, true);
        dlg.init();
      }
    }));

    renameAction.isEnabled = function () {
      return this.enabled && isGraphEnabled.apply(this, arguments);
    }

    renameAction.visible = urlParams['embed'] != '1';


    this.put('publish', new Menu(mxUtils.bind(this, function (menu, parent) {
      this.addMenuItems(menu, ['publishLink'], parent);
    })));

    editorUi.actions.put('useOffline', new Action(mxResources.get('useOffline') + '...', function () {
      editorUi.openLink('https://app.draw.io/')
    }));

    this.editorUi.actions.addAction('share...', mxUtils.bind(this, function () {
      try {
        var file = editorUi.getCurrentFile();

        if (file != null) {
          editorUi.drive.showPermissions(file.getId());
        }
      }
      catch (e) {
        editorUi.handleError(e);
      }
    }));

    this.put('embed', new Menu(mxUtils.bind(this, function (menu, parent) {
      var file = editorUi.getCurrentFile();

      this.addMenuItems(menu, ['embedImage', 'embedSvg', '-', 'embedHtml'], parent);

      if (!navigator.standalone && !editorUi.isOffline()) {
        this.addMenuItems(menu, ['embedIframe'], parent);
      }

      if (urlParams['embed'] != '1' && !editorUi.isOffline()) {
        this.addMenuItems(menu, ['-', 'googleDocs', 'googleSlides', 'googleSheets', '-', 'microsoftOffice'], parent);
      }
    })));

    var addInsertItem = function (menu, parent, title, method) {
      if (method != 'plantUml' || (EditorUi.enablePlantUml && !editorUi.isOffline())) {
        menu.addItem(title, null, mxUtils.bind(this, function () {
          if (method == 'fromText' || method == 'formatSql' ||
            method == 'plantUml' || method == 'mermaid') {
            var dlg = new ParseDialog(editorUi, title, method);
            editorUi.showDialog(dlg.container, 620, 420, true, false);
            editorUi.dialog.container.style.overflow = 'auto';
            dlg.init();
          }
          else {
            var dlg = new CreateGraphDialog(editorUi, title, method);
            editorUi.showDialog(dlg.container, 620, 420, true, false);
            // Executed after dialog is added to dom
            dlg.init();
          }
        }), parent, null, isGraphEnabled());
      }
    };

    var insertVertex = function (value, w, h, style) {
      var pt = (graph.isMouseInsertPoint()) ? graph.getInsertPoint() : graph.getFreeInsertPoint();
      var cell = new mxCell(value, new mxGeometry(pt.x, pt.y, w, h), style);
      cell.vertex = true;

      graph.getModel().beginUpdate();
      try {
        cell = graph.addCell(cell);
        graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      }
      finally {
        graph.getModel().endUpdate();
      }

      graph.scrollCellToVisible(cell);
      graph.setSelectionCell(cell);
      graph.container.focus();

      if (graph.editAfterInsert) {
        graph.startEditing(cell);
      }


      return cell;
    };

    editorUi.actions.put('exportSvg', new Action(mxResources.get('formatSvg') + '...', function () {
      editorUi.showExportDialog(mxResources.get('formatSvg'), true, mxResources.get('export'),
        'https://support.draw.io/display/DO/Exporting+Files',
        mxUtils.bind(this, function (scale, transparentBackground, ignoreSelection, addShadow,
                                     editable, embedImages, border, cropImage, currentPage, linkTarget) {
          var val = parseInt(scale);

          if (!isNaN(val) && val > 0) {
            editorUi.exportSvg(val / 100, transparentBackground, ignoreSelection, addShadow,
              editable, embedImages, border, !cropImage, currentPage, linkTarget);
          }
        }), true, null, 'svg');
    }));

    editorUi.actions.put('insertText', new Action(mxResources.get('text'), function () {
      if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
        graph.startEditingAtCell(insertVertex('Text', 40, 20, 'text;html=1;resizable=0;autosize=1;' +
          'align=center;verticalAlign=middle;points=[];fillColor=none;strokeColor=none;rounded=0;'));
      }
    }), null, null, Editor.ctrlKey + '+Shift+X').isEnabled = isGraphEnabled;



    // Overrides edit menu to add find and editGeometry
    this.put('edit', new Menu(mxUtils.bind(this, function (menu, parent) {
      this.addMenuItems(menu, ['undo', 'redo', '-', 'cut', 'copy']);

      this.addMenuItems(menu, ['paste', 'delete', '-', 'editStyle', '-']);
    })));

    var action = editorUi.actions.addAction('comments', mxUtils.bind(this, function () {
      if (this.commentsWindow == null) {
        this.commentsWindow = new CommentsWindow(editorUi, document.body.offsetWidth - 380, 120, 300, 350);
        //TODO Are these events needed?
        this.commentsWindow.window.addListener('show', function () {
          editorUi.fireEvent(new mxEventObject('comments'));
        });
        this.commentsWindow.window.addListener('hide', function () {
          editorUi.fireEvent(new mxEventObject('comments'));
        });
        this.commentsWindow.window.setVisible(true);
        editorUi.fireEvent(new mxEventObject('comments'));
      }
      else {
        var isVisible = !this.commentsWindow.window.isVisible();
        this.commentsWindow.window.setVisible(isVisible);

        this.commentsWindow.refreshCommentsTime();

        if (isVisible && this.commentsWindow.hasError) {
          this.commentsWindow.refreshComments();
        }
      }
    }));
    action.setToggleAction(true);
    action.setSelectedCallback(mxUtils.bind(this, function () {
      return this.commentsWindow != null && this.commentsWindow.window.isVisible();
    }));

    // Destroys comments window to force update or disable if not supported
    editorUi.editor.addListener('fileLoaded', mxUtils.bind(this, function () {
      if (this.commentsWindow != null) {
        this.commentsWindow.destroy();
        this.commentsWindow = null;
      }
    }));

    // Extends toolbar dropdown to add comments
    var viewPanelsMenu = this.get('viewPanels');
    var viewPanelsFunct = viewPanelsMenu.funct;

    viewPanelsMenu.funct = function (menu, parent) {
      viewPanelsFunct.apply(this, arguments);

      if (editorUi.commentsSupported()) {
        editorUi.menus.addMenuItems(menu, ['comments'], parent);
      }
    };

    this.put('file', new Menu(mxUtils.bind(this, function (menu, parent) {
      if (urlParams['embed'] == '1') {
        this.addSubmenu('importFrom', menu, parent);
        this.addSubmenu('exportAs', menu, parent);
        this.addSubmenu('embed', menu, parent);

        if (editorUi.isRevisionHistorySupported()) {
          this.addMenuItems(menu, ['-', 'revisionHistory'], parent);
        }

        this.addMenuItems(menu, ['-', 'pageSetup', 'print', '-', 'rename', urlParams['noSaveBtn'] == '1' ? 'saveAndExit' : 'save'], parent);

        if (urlParams['saveAndExit'] == '1' && urlParams['noSaveBtn'] != '1') {
          this.addMenuItems(menu, ['saveAndExit'], parent);
        }

        this.addMenuItems(menu, ['exit'], parent);
      }
      else {
        var file = this.editorUi.getCurrentFile();
        this.addMenuItems(menu, ['new'], parent);

        if (!mxClient.IS_CHROMEAPP  &&
          file != null && file.constructor != LocalFile) {
          menu.addSeparator(parent);
          var item = this.addMenuItem(menu, 'synchronize', parent);

          if (!editorUi.isOffline() || mxClient.IS_CHROMEAPP ) {
            this.addLinkToItem(item, 'https://desk.draw.io/support/solutions/articles/16000087947');
          }
        }

        this.addMenuItems(menu, ['-', 'save', 'saveAs'], parent);

        this.addMenuItems(menu, ['-', 'rename'], parent);
        if (editorUi.isOfflineApp()) {
          if (navigator.onLine && urlParams['stealth'] != '1') {
            this.addMenuItems(menu, ['upload'], parent);
          }
        }

        menu.addSeparator(parent);
        this.addSubmenu('importFrom', menu, parent);
        this.addSubmenu('exportAs', menu, parent);

        menu.addSeparator(parent);

        if (file != null && editorUi.fileNode != null) {
          var filename = (file.getTitle() != null) ?
            file.getTitle() : editorUi.defaultFilename;

          if (!/(\.html)$/i.test(filename) &&
            !/(\.svg)$/i.test(filename)) {
            this.addMenuItems(menu, ['-', 'properties']);
          }
        }
        this.addMenuItems(menu, ['-', 'close']);
      }
    })));

    /**
     * External Fonts undoable change
     */
    function ChangeExtFonts(ui, extFonts, customFonts) {
      this.ui = ui;
      this.extFonts = extFonts;
      this.previousExtFonts = extFonts;
      this.customFonts = customFonts;
      this.prevCustomFonts = customFonts;
    };

    /**
     * Implementation of the undoable External Fonts Change.
     */
    ChangeExtFonts.prototype.execute = function () {
      var graph = this.ui.editor.graph;
      this.customFonts = this.prevCustomFonts;
      this.prevCustomFonts = this.ui.menus.customFonts;
      this.ui.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));

      this.extFonts = this.previousExtFonts;
      var tmp = graph.extFonts;

      for (var i = 0; tmp != null && i < tmp.length; i++) {
        var fontElem = document.getElementById('extFont_' + tmp[i].name);

        if (fontElem != null) {
          fontElem.parentNode.removeChild(fontElem);
        }
      }

      graph.extFonts = [];

      for (var i = 0; this.previousExtFonts != null && i < this.previousExtFonts.length; i++) {
        this.ui.editor.graph.addExtFont(this.previousExtFonts[i].name, this.previousExtFonts[i].url);
      }

      this.previousExtFonts = tmp;
    };

    //Replace the default font family menu
    this.put('fontFamily', new Menu(mxUtils.bind(this, function (menu, parent) {
      var addItem = mxUtils.bind(this, function (fontname, fontUrl, deletable) {
        var graph = this.editorUi.editor.graph;

        var tr = this.styleChange(menu, fontname, [mxConstants.STYLE_FONTFAMILY], [fontname], null, parent, function () {
          document.execCommand('fontname', false, fontname);
          //Add the font to the file in case it was a previous font from the settings
          graph.addExtFont(fontname, fontUrl);
        }, function () {
          graph.updateLabelElements(graph.getSelectionCells(), function (elt) {
            elt.removeAttribute('face');
            elt.style.fontFamily = null;

            if (elt.nodeName == 'PRE') {
              graph.replaceElement(elt, 'div');
            }
          });

          //Add the font to the file in case it was a previous font from the settings
          graph.addExtFont(fontname, fontUrl);
        });

        if (deletable) {
          var img = document.createElement('span');
          img.className = 'geSprite geSprite-delete';
          img.style.cursor = 'pointer';
          img.style.display = 'inline-block';
          tr.firstChild.nextSibling.nextSibling.appendChild(img);

          mxEvent.addListener(img, (mxClient.IS_POINTER) ? 'pointerup' : 'mouseup', mxUtils.bind(this, function (evt) {
            var extFonts = mxUtils.clone(this.editorUi.editor.graph.extFonts);

            if (extFonts != null && extFonts.length > 0) {
              for (var i = 0; i < extFonts.length; i++) {
                if (extFonts[i].name == fontname) {
                  extFonts.splice(i, 1);
                  break;
                }
              }
            }

            var customFonts = mxUtils.clone(this.customFonts);

            for (var i = 0; i < customFonts.length; i++) {
              if (customFonts[i].name == fontname) {
                customFonts.splice(i, 1);
                break;
              }
            }

            var change = new ChangeExtFonts(this.editorUi, extFonts, customFonts);
            this.editorUi.editor.graph.model.execute(change);

            this.editorUi.menubar.hideMenu();
            mxEvent.consume(evt);
          }));
        }

        tr.firstChild.nextSibling.style.fontFamily = fontname;
      });

      for (var i = 0; i < this.defaultFonts.length; i++) {
        addItem(this.defaultFonts[i]);
      }

      menu.addSeparator(parent);

      //Load custom fonts already in the Graph
      var extFonts = this.editorUi.editor.graph.extFonts;

      //Merge external fonts with custom fonts
      if (extFonts != null && extFonts.length > 0) {
        var custMap = {}, changed = false;

        for (var i = 0; i < this.customFonts.length; i++) {
          custMap[this.customFonts[i].name] = true;
        }

        for (var i = 0; i < extFonts.length; i++) {
          if (!custMap[extFonts[i].name]) {
            this.customFonts.push(extFonts[i]);
            changed = true;
          }
        }

        if (changed) {
          this.editorUi.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
        }
      }

      if (this.customFonts.length > 0) {
        for (var i = 0; i < this.customFonts.length; i++) {
          var name = this.customFonts[i].name, url = this.customFonts[i].url;
          addItem(name, url, true);

          //Load external fonts without saving them to the file
          this.editorUi.editor.graph.addExtFont(name, url, true);
        }

        menu.addSeparator(parent);

        menu.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function () {
          var change = new ChangeExtFonts(this.editorUi, [], []);
          this.editorUi.editor.graph.model.execute(change);
        }), parent);

        menu.addSeparator(parent);
      }

      menu.addItem(mxResources.get('custom') + '...', null, mxUtils.bind(this, function () {
        var graph = this.editorUi.editor.graph;
        var curFontname = mxConstants.DEFAULT_FONTFAMILY;
        var curType = 's';
        var curUrl = null;
        var state = graph.getView().getState(graph.getSelectionCell());

        if (state != null) {
          curFontname = state.style[mxConstants.STYLE_FONTFAMILY] || curFontname;
          curType = state.style['FType'] || curType;

          if (curType == 'w') {
            var extFonts = this.editorUi.editor.graph.extFonts;
            var webFont = null;

            if (extFonts != null) {
              webFont = extFonts.find(function (ef) {
                return ef.name == curFontname;
              });
            }

            curUrl = webFont != null ? webFont.url : mxResources.get('urlNofFound', null, 'URL not found');

            if (curUrl.indexOf(PROXY_URL) == 0) {
              curUrl = decodeURIComponent(curUrl.substr((PROXY_URL + '?url=').length));
            }
          }
        }

        var dlg = new FontDialog(this.editorUi, curFontname, curUrl, curType, mxUtils.bind(this, function (fontName, fontUrl, type) {
          if (fontName != null && fontName.length > 0) {
            graph.getModel().beginUpdate();

            try {
              graph.stopEditing(false);
              graph.setCellStyles(mxConstants.STYLE_FONTFAMILY, fontName);

              if (type != 's') {
                graph.setCellStyles('FType', type);

                if (fontUrl.indexOf('http://') == 0) {
                  fontUrl = PROXY_URL + '?url=' + encodeURIComponent(fontUrl);
                }

                this.editorUi.editor.graph.addExtFont(fontName, fontUrl);
              }

              var addToCustom = true;

              for (var i = 0; i < this.customFonts.length; i++) {
                if (this.customFonts[i].name == fontName) {
                  addToCustom = false;
                  break;
                }
              }

              if (addToCustom) {
                this.customFonts.push({name: fontName, url: fontUrl});
                this.editorUi.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
              }
            }
            finally {
              graph.getModel().endUpdate();
            }
          }
        }));
        this.editorUi.showDialog(dlg.container, 380, 250, true, true);
        dlg.init();
      }), parent, null, true);
    })));
  };
})();
