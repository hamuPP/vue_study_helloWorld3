/**
 * Created by tangyue on 20/4/28
 */

(function () {
  // encodeURIComponent的方式处理post的传参，就是以前旧的处理方式
  var postEncodeParamsFunction = (data) => {
    var ret = '';
    for (var it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    /**/
    return ret
  };

  window.uiTheme = undefined;// 主题配色 atlas-蓝色 dark-黑色 无-白色
  window.isLocalStorage = true;
  window.STENCIL_PATH = window.STENCIL_PATH || "stencils";
  window.IMAGE_PATH = window.IMAGE_PATH || "images";
  window.STYLE_PATH = window.STYLE_PATH || "styles";
  window.CSS_PATH = window.CSS_PATH || "styles";
  window.OPEN_FORM = window.OPEN_FORM || "open.html";
  window.mxBasePath = window.mxBasePath || "../../../src";
  window.urlParams = window.urlParams || {};
  window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE || 10485760;
  window.MAX_AREA = window.MAX_AREA || 225E6;
  window.EXPORT_URL = window.EXPORT_URL || "/export";
  window.SAVE_URL = window.SAVE_URL || "/save";
  window.OPEN_URL = window.OPEN_URL || "/open";
  window.RESOURCES_PATH = window.RESOURCES_PATH || "resources";
  window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + "/dia";

  var mxResourceExtension = '.txt';
  // "undefined" == typeof mxResourceExtension && (mxResourceExtension = ".txt");// todo  语法报错，注释掉，改成上面的写法，看下是否有报错
  var mxClient = {
    VERSION: "4.1.2",
    language: 'zh',
    IS_IE: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf("MSIE"),
    IS_IE6: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf("MSIE 6"),
    IS_IE11: null != navigator.userAgent && !!navigator.userAgent.match(/Trident\/7\./),
    IS_EDGE: null != navigator.userAgent && !!navigator.userAgent.match(/Edge\//),
    IS_QUIRKS: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf("MSIE") && (null == document.documentMode || 5 == document.documentMode),
    IS_EM: "spellcheck" in document.createElement("textarea") && 8 == document.documentMode,
    VML_PREFIX: "v",
    OFFICE_PREFIX: "o",
    IS_NS: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf("Mozilla/") && 0 > navigator.userAgent.indexOf("MSIE") && 0 > navigator.userAgent.indexOf("Edge/"),
    IS_OP: null != navigator.userAgent && (0 <= navigator.userAgent.indexOf("Opera/") || 0 <= navigator.userAgent.indexOf("OPR/")),
    IS_OT: null != navigator.userAgent && 0 <= navigator.userAgent.indexOf("Presto/") && 0 > navigator.userAgent.indexOf("Presto/2.4.") && 0 > navigator.userAgent.indexOf("Presto/2.3.") && 0 > navigator.userAgent.indexOf("Presto/2.2.") &&
    0 > navigator.userAgent.indexOf("Presto/2.1.") && 0 > navigator.userAgent.indexOf("Presto/2.0.") && 0 > navigator.userAgent.indexOf("Presto/1."),
    IS_SF: /Apple Computer, Inc/.test(navigator.vendor),
    IS_ANDROID: false,
    IS_IOS: false,
    IOS_VERSION: function () {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        if (null != a && 0 < a.length) return parseInt(a[1])
      }
      return 0
    }(),
    IS_GC: /Google Inc/.test(navigator.vendor),
    IS_CHROMEAPP: false,// 这个参数没用的
    IS_FF: "undefined" !== typeof InstallTrigger,
    IS_MT: 0 <= navigator.userAgent.indexOf("Firefox/") && 0 > navigator.userAgent.indexOf("Firefox/1.") && 0 > navigator.userAgent.indexOf("Firefox/2.") || 0 <= navigator.userAgent.indexOf("Iceweasel/") && 0 > navigator.userAgent.indexOf("Iceweasel/1.") && 0 > navigator.userAgent.indexOf("Iceweasel/2.") || 0 <= navigator.userAgent.indexOf("SeaMonkey/") && 0 > navigator.userAgent.indexOf("SeaMonkey/1.") || 0 <= navigator.userAgent.indexOf("Iceape/") &&
    0 > navigator.userAgent.indexOf("Iceape/1."),
    IS_VML: "MICROSOFT INTERNET EXPLORER" == navigator.appName.toUpperCase(),
    IS_SVG: "MICROSOFT INTERNET EXPLORER" != navigator.appName.toUpperCase(),
    NO_FO: !document.createElementNS || "[object SVGForeignObjectElement]" != document.createElementNS("http://www.w3.org/2000/svg", "foreignObject") || 0 <= navigator.userAgent.indexOf("Opera/"),
    IS_WIN: 0 < navigator.appVersion.indexOf("Win"),
    IS_MAC: 0 < navigator.appVersion.indexOf("Mac"),
    IS_CHROMEOS: /\bCrOS\b/.test(navigator.appVersion),
    IS_TOUCH: "ontouchstart" in document.documentElement,
    IS_POINTER: null != window.PointerEvent && !(0 < navigator.appVersion.indexOf("Mac")),
    IS_LOCAL: 0 > document.location.href.indexOf("http://") && 0 > document.location.href.indexOf("https://"),
    defaultBundles: [],
    isBrowserSupported: function () {
      return mxClient.IS_VML || mxClient.IS_SVG
    },
    link: function (a, b, c, d) {
      c = c || document;
      if (mxClient.IS_IE6) c.write('<link rel="' + a + '" href="' + b + '" charset="UTF-8" type="text/css"/>'); else {
        var e = c.createElement("link");
        e.setAttribute("rel",
          a);
        e.setAttribute("href", b);
        e.setAttribute("charset", "UTF-8");
        e.setAttribute("type", "text/css");
        d && e.setAttribute("id", d);
        c.getElementsByTagName("head")[0].appendChild(e)
      }
    },
    loadResources: function (a, b) {
      function c() {
        0 == --d && a()
      }

      for (var d = mxClient.defaultBundles.length, e = 0; e < mxClient.defaultBundles.length; e++) {
        mxResources.add(mxClient.defaultBundles[e], b, c)
      }
    },
    include: function (a) {
      document.write('<script src="' + a + '">\x3c/script>')
    }
  };

  var mxResources = {
    resources: {},
    extension: mxResourceExtension,
    resourcesEncoded: !1,
    loadDefaultBundle: !0,
    loadSpecialBundle: !0,
    isLanguageSupported: function (a) {
      return null != mxClient.languages ? 0 <= mxUtils.indexOf(mxClient.languages, a) : !0
    },
    getDefaultBundle: function (a) {
      return mxResources.loadDefaultBundle || !mxResources.isLanguageSupported('zh') ? a + mxResources.extension : null
    },
    getSpecialBundle: function (a) {
      return "resources/dia_zh.txt";
    },
    add: function (a, b, c) {
      b = null != b ? b : null != mxClient.language ? mxClient.language.toLowerCase() : mxConstants.NONE;
      if (b != mxConstants.NONE) {
        var d = mxResources.getDefaultBundle(a, b), e = mxResources.getSpecialBundle(a, b), f = function () {
          if (null != e) if (c) mxUtils.get(e, function (a) {
            mxResources.parse(a.getText());
            c()
          }, function () {
            c()
          }); else try {
            var a = mxUtils.load(e);
            a.isReady() && mxResources.parse(a.getText())
          } catch (l) {
          } else null !=
          c && c()
        };
        if (null != d) if (c) mxUtils.get(d, function (a) {
          mxResources.parse(a.getText());
          f()
        }, function () {
          f()
        }); else try {
          var g = mxUtils.load(d);
          g.isReady() && mxResources.parse(g.getText());
          f()
        } catch (k) {
        } else f()
      }
    },
    parse: function (a) {
      if (null != a) {
        a = a.split("\n");
        for (var b = 0; b < a.length; b++) if ("#" != a[b].charAt(0)) {
          var c = a[b].indexOf("=");
          if (0 < c) {
            var d = a[b].substring(0, c), e = a[b].length;
            13 == a[b].charCodeAt(e - 1) && e--;
            c = a[b].substring(c + 1, e);
            this.resourcesEncoded ? (c = c.replace(/\\(?=u[a-fA-F\d]{4})/g, "%"), mxResources.resources[d] =
              unescape(c)) : mxResources.resources[d] = c
          }
        }
      }
    },
    get: function (a, b, c) {
      a = mxResources.resources[a];
      null == a && (a = c);
      null != a && null != b && (a = mxResources.replacePlaceholders(a, b));
      return a
    },
    replacePlaceholders: function (a, b) {
      for (var c = [], d = null, e = 0; e < a.length; e++) {
        var f = a.charAt(e);
        "{" == f ? d = "" : null != d && "}" == f ? (d = parseInt(d) - 1, 0 <= d && d < b.length && c.push(b[d]), d = null) : null != d ? d += f : c.push(f)
      }
      return c.join("")
    },
    loadResources: function (a) {
      mxResources.add(mxClient.basePath + "/resources/editor", null, function () {
        mxResources.add(mxClient.basePath +
          "/resources/graph", null, a)
      })
    }
  };

  var mxEvent = {
    addListener: function () {
      return window.addEventListener ? function (a, b, c) {
        a.addEventListener(b, c, !1);
        null == a.mxListenerList && (a.mxListenerList = []);
        a.mxListenerList.push({name: b, f: c})
      } : function (a, b, c) {
        a.attachEvent("on" + b, c);
        null == a.mxListenerList && (a.mxListenerList = []);
        a.mxListenerList.push({name: b, f: c})
      }
    }(),
    removeListener: function () {
      var a = function (a, c, d) {
        if (null != a.mxListenerList) {
          c = a.mxListenerList.length;
          for (var b = 0; b < c; b++) if (a.mxListenerList[b].f == d) {
            a.mxListenerList.splice(b, 1);
            break
          }
          0 == a.mxListenerList.length && (a.mxListenerList = null)
        }
      };
      return window.removeEventListener ? function (b, c, d) {
        b.removeEventListener(c, d, !1);
        a(b, c, d)
      } : function (b, c, d) {
        b.detachEvent("on" + c, d);
        a(b, c, d)
      }
    }(),
    removeAllListeners: function (a) {
      var b = a.mxListenerList;
      if (null != b) for (; 0 < b.length;) {
        var c = b[0];
        mxEvent.removeListener(a, c.name, c.f)
      }
    },
    addGestureListeners: function (a, b, c, d) {
      null != b && mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", b);
      null != c && mxEvent.addListener(a, mxClient.IS_POINTER ? "pointermove" :
        "mousemove", c);
      null != d && mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerup" : "mouseup", d);
      !mxClient.IS_POINTER && mxClient.IS_TOUCH && (null != b && mxEvent.addListener(a, "touchstart", b), null != c && mxEvent.addListener(a, "touchmove", c), null != d && mxEvent.addListener(a, "touchend", d))
    },
    removeGestureListeners: function (a, b, c, d) {
      null != b && mxEvent.removeListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", b);
      null != c && mxEvent.removeListener(a, mxClient.IS_POINTER ? "pointermove" : "mousemove", c);
      null != d && mxEvent.removeListener(a,
        mxClient.IS_POINTER ? "pointerup" : "mouseup", d);
      !mxClient.IS_POINTER && mxClient.IS_TOUCH && (null != b && mxEvent.removeListener(a, "touchstart", b), null != c && mxEvent.removeListener(a, "touchmove", c), null != d && mxEvent.removeListener(a, "touchend", d))
    },
    redirectMouseEvents: function (a, b, c, d, e, f, g) {
      var k = function (a) {
        return "function" == typeof c ? c(a) : c
      };
      mxEvent.addGestureListeners(a, function (a) {
        null != d ? d(a) : mxEvent.isConsumed(a) || b.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(a, k(a)))
      }, function (a) {
        null != e ? e(a) : mxEvent.isConsumed(a) ||
          b.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(a, k(a)))
      }, function (a) {
        null != f ? f(a) : mxEvent.isConsumed(a) || b.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(a, k(a)))
      });
      mxEvent.addListener(a, "dblclick", function (a) {
        if (null != g) g(a); else if (!mxEvent.isConsumed(a)) {
          var c = k(a);
          b.dblClick(a, null != c ? c.cell : null)
        }
      })
    },
    release: function (a) {
      try {
        if (null != a) {
          mxEvent.removeAllListeners(a);
          var b = a.childNodes;
          if (null != b) {
            var c = b.length;
            for (a = 0; a < c; a += 1) mxEvent.release(b[a])
          }
        }
      } catch (d) {
      }
    },
    addMouseWheelListener: function (a,
                                     b) {
      if (null != a) {
        b = null != b ? b : window;
        if (mxClient.IS_SF && !mxClient.IS_TOUCH) {
          var c = 1;
          mxEvent.addListener(b, "gesturestart", function (a) {
            mxEvent.consume(a);
            c = 1
          });
          mxEvent.addListener(b, "gesturechange", function (b) {
            mxEvent.consume(b);
            var d = c - b.scale;
            .2 < Math.abs(d) && (a(b, 0 > d, !0), c = b.scale)
          });
          mxEvent.addListener(b, "gestureend", function (a) {
            mxEvent.consume(a)
          })
        }
        mxEvent.addListener(b, "wheel", function (b) {
          null == b && (b = window.event);
          b.ctrlKey && b.preventDefault();
          (.5 < Math.abs(b.deltaX) || .5 < Math.abs(b.deltaY)) && a(b, 0 ==
          b.deltaY ? 0 < -b.deltaX : 0 < -b.deltaY)
        })
      }
    },
    disableContextMenu: function (a) {
      mxEvent.addListener(a, "contextmenu", function (a) {
        a.preventDefault && a.preventDefault();
        return !1
      })
    },
    getSource: function (a) {
      return null != a.srcElement ? a.srcElement : a.target
    },
    isConsumed: function (a) {
      return null != a.isConsumed && a.isConsumed
    },
    isTouchEvent: function (a) {
      return null != a.pointerType ? "touch" == a.pointerType || a.pointerType === a.MSPOINTER_TYPE_TOUCH : null != a.mozInputSource ? 5 == a.mozInputSource : 0 == a.type.indexOf("touch")
    },
    isPenEvent: function (a) {
      return null !=
      a.pointerType ? "pen" == a.pointerType || a.pointerType === a.MSPOINTER_TYPE_PEN : null != a.mozInputSource ? 2 == a.mozInputSource : 0 == a.type.indexOf("pen")
    },
    isMultiTouchEvent: function (a) {
      return null != a.type && 0 == a.type.indexOf("touch") && null != a.touches && 1 < a.touches.length
    },
    isMouseEvent: function (a) {
      return null != a.pointerType ? "mouse" == a.pointerType || a.pointerType === a.MSPOINTER_TYPE_MOUSE : null != a.mozInputSource ? 1 == a.mozInputSource : 0 == a.type.indexOf("mouse")
    },
    isLeftMouseButton: function (a) {
      return "buttons" in a && ("mousedown" ==
        a.type || "mousemove" == a.type) ? 1 == a.buttons : "which" in a ? 1 === a.which : 1 === a.button
    },
    isMiddleMouseButton: function (a) {
      return "which" in a ? 2 === a.which : 4 === a.button
    },
    isRightMouseButton: function (a) {
      return "which" in a ? 3 === a.which : 2 === a.button
    },
    isPopupTrigger: function (a) {
      return mxEvent.isRightMouseButton(a) || mxClient.IS_MAC && mxEvent.isControlDown(a) && !mxEvent.isShiftDown(a) && !mxEvent.isMetaDown(a) && !mxEvent.isAltDown(a)
    },
    isShiftDown: function (a) {
      return null != a ? a.shiftKey : !1
    },
    isAltDown: function (a) {
      return null != a ?
        a.altKey : !1
    },
    isControlDown: function (a) {
      return null != a ? a.ctrlKey : !1
    },
    isMetaDown: function (a) {
      return null != a ? a.metaKey : !1
    },
    getMainEvent: function (a) {
      "touchstart" != a.type && "touchmove" != a.type || null == a.touches || null == a.touches[0] ? "touchend" == a.type && null != a.changedTouches && null != a.changedTouches[0] && (a = a.changedTouches[0]) : a = a.touches[0];
      return a
    },
    getClientX: function (a) {
      return mxEvent.getMainEvent(a).clientX
    },
    getClientY: function (a) {
      return mxEvent.getMainEvent(a).clientY
    },
    consume: function (a, b, c) {
      c = null !=
      c ? c : !0;
      if (null != b ? b : 1) a.preventDefault ? (c && a.stopPropagation(), a.preventDefault()) : c && (a.cancelBubble = !0);
      a.isConsumed = !0;
      a.preventDefault || (a.returnValue = !1)
    },
    LABEL_HANDLE: -1,
    ROTATION_HANDLE: -2,
    CUSTOM_HANDLE: -100,
    VIRTUAL_HANDLE: -1E5,
    MOUSE_DOWN: "mouseDown",
    MOUSE_MOVE: "mouseMove",
    MOUSE_UP: "mouseUp",
    ACTIVATE: "activate",
    RESIZE_START: "resizeStart",
    RESIZE: "resize",
    RESIZE_END: "resizeEnd",
    MOVE_START: "moveStart",
    MOVE: "move",
    MOVE_END: "moveEnd",
    PAN_START: "panStart",
    PAN: "pan",
    PAN_END: "panEnd",
    MINIMIZE: "minimize",
    NORMALIZE: "normalize",
    MAXIMIZE: "maximize",
    HIDE: "hide",
    SHOW: "show",
    CLOSE: "close",
    DESTROY: "destroy",
    REFRESH: "refresh",
    SIZE: "size",
    SELECT: "select",
    FIRED: "fired",
    FIRE_MOUSE_EVENT: "fireMouseEvent",
    GESTURE: "gesture",
    TAP_AND_HOLD: "tapAndHold",
    GET: "get",
    RECEIVE: "receive",
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    SUSPEND: "suspend",
    RESUME: "resume",
    MARK: "mark",
    ROOT: "root",
    POST: "post",
    OPEN: "open",
    SAVE: "save",
    BEFORE_ADD_VERTEX: "beforeAddVertex",
    ADD_VERTEX: "addVertex",
    AFTER_ADD_VERTEX: "afterAddVertex",
    DONE: "done",
    EXECUTE: "execute",
    EXECUTED: "executed",
    BEGIN_UPDATE: "beginUpdate",
    START_EDIT: "startEdit",
    END_UPDATE: "endUpdate",
    END_EDIT: "endEdit",
    BEFORE_UNDO: "beforeUndo",
    UNDO: "undo",
    REDO: "redo",
    CHANGE: "change",
    NOTIFY: "notify",
    LAYOUT_CELLS: "layoutCells",
    CLICK: "click",
    SCALE: "scale",
    TRANSLATE: "translate",
    SCALE_AND_TRANSLATE: "scaleAndTranslate",
    UP: "up",
    DOWN: "down",
    ADD: "add",
    REMOVE: "remove",
    CLEAR: "clear",
    ADD_CELLS: "addCells",
    CELLS_ADDED: "cellsAdded",
    MOVE_CELLS: "moveCells",
    CELLS_MOVED: "cellsMoved",
    RESIZE_CELLS: "resizeCells",
    CELLS_RESIZED: "cellsResized",
    TOGGLE_CELLS: "toggleCells",
    CELLS_TOGGLED: "cellsToggled",
    ORDER_CELLS: "orderCells",
    CELLS_ORDERED: "cellsOrdered",
    REMOVE_CELLS: "removeCells",
    CELLS_REMOVED: "cellsRemoved",
    GROUP_CELLS: "groupCells",
    UNGROUP_CELLS: "ungroupCells",
    REMOVE_CELLS_FROM_PARENT: "removeCellsFromParent",
    FOLD_CELLS: "foldCells",
    CELLS_FOLDED: "cellsFolded",
    ALIGN_CELLS: "alignCells",
    LABEL_CHANGED: "labelChanged",
    CONNECT_CELL: "connectCell",
    CELL_CONNECTED: "cellConnected",
    SPLIT_EDGE: "splitEdge",
    FLIP_EDGE: "flipEdge",
    START_EDITING: "startEditing",
    EDITING_STARTED: "editingStarted",
    EDITING_STOPPED: "editingStopped",
    ADD_OVERLAY: "addOverlay",
    REMOVE_OVERLAY: "removeOverlay",
    UPDATE_CELL_SIZE: "updateCellSize",
    ESCAPE: "escape",
    DOUBLE_CLICK: "doubleClick",
    START: "start",
    RESET: "reset"
  };
  var mxXmlRequest = function (url, headers, params, method, d, e, f) {
    this.url = url;
    this.headers = headers;
    this.params = params;
    this.method = method || "POST";
    this.async = null != d ? d : true;
    this.username = e;
    this.password = f;
  };

  mxXmlRequest.prototype.url = null;
  mxXmlRequest.prototype.headers = null;
  mxXmlRequest.prototype.params = null;
  mxXmlRequest.prototype.method = null;
  mxXmlRequest.prototype.async = null;
  mxXmlRequest.prototype.binary = !1;
  mxXmlRequest.prototype.withCredentials = !1;
  mxXmlRequest.prototype.username = null;
  mxXmlRequest.prototype.password = null;
  mxXmlRequest.prototype.request = null;
  mxXmlRequest.prototype.decodeSimulateValues = !1;
  mxXmlRequest.prototype.isBinary = function () {
    return this.binary
  };
  mxXmlRequest.prototype.setBinary = function (a) {
    this.binary = a
  };
  mxXmlRequest.prototype.getText = function () {
    return this.request.responseText
  };
  mxXmlRequest.prototype.isReady = function () {
    return 4 == this.request.readyState
  };
  mxXmlRequest.prototype.getDocumentElement = function () {
    var a = this.getXml();
    return null != a ? a.documentElement : null
  };
  mxXmlRequest.prototype.getXml = function () {
    var a = this.request.responseXML;
    if (9 <= document.documentMode || null == a || null == a.documentElement) a = mxUtils.parseXml(this.request.responseText);
    return a
  };
  mxXmlRequest.prototype.getText = function () {
    return this.request.responseText
  };
  mxXmlRequest.prototype.getStatus = function () {
    return null != this.request ? this.request.status : null
  };
  mxXmlRequest.prototype.create = function () {
    if (window.XMLHttpRequest) return function () {
      var a = new XMLHttpRequest;
      this.isBinary() && a.overrideMimeType && a.overrideMimeType("text/plain; charset=x-user-defined");
      return a
    };
    if ("undefined" != typeof ActiveXObject) return function () {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
  }();
  mxXmlRequest.prototype.send = function (a, b, c, d) {
    this.request = this.create();
    if (this.request) {
      null != a && (this.request.onreadystatechange = mxUtils.bind(this, function () {
        this.isReady() && (a(this), this.request.onreadystatechange = null)
      }));
      this.request.open(this.method, this.url, this.async, this.username, this.password);
      var allHeaders = Object.assign({}, this.headers, {
        Authorization: 'Bearer '+ (sessionStorage.getItem('access_token') || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAxNTkwNDYsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianRpIjoiNmZlOGU0NDMtMWRhOC00Y2U2LTk1NjctMTc4YjgzYjJjMWE1IiwiY2xpZW50X2lkIjoic3lzdGVtIiwic2NvcGUiOlsiYXBwIl19.dFxXZ-AWMjBZO0Dmprp_mTXwI_XfzgCoqeXQCMMqGJfM9eleR2sYRRFPFyKSxWYqYJxOxQx4bkyCk-NVBhb7Otnj7e4rz88eo6iqsuvr-s_6YOdt5C_4ATuigZaA8t6ri24OPtz7wAZe-GzNI6T5G5rDp9HN1g5rDgyIQ5P6R600TS6z-ttXeXwApzBmglPFWZmNy5d69s990QAbVNmzdKeCeYkfHNaccDzyjOM5z9sRZku5AL4SqwdHL2m9oDQvu_F0zpyvEmMmlkhKFJdcK51mss3DnP9S0pjTO1z_5uDAYX27XVLT0CBzn5hRaDrQA-li6UqylCXDzneWTYMEYw')
      });
      this.setRequestHeaders(this.request, allHeaders);
      window.XMLHttpRequest && this.withCredentials && (this.request.withCredentials = "true");
      if (!mxClient.IS_QUIRKS && (null == document.documentMode || 9 < document.documentMode) &&
        window.XMLHttpRequest && null != c && null != d) {
        this.request.timeout = c;
        this.request.ontimeout = d
      }
      this.request.send(this.params)
    }
  };
  mxXmlRequest.prototype.setRequestHeaders = function (a, headersObj) {
    // 固定的头参数：contentType
    a.setRequestHeader('Content-Type', headersObj['Content-type'] || 'application/x-www-form-urlencoded;charset=UTF-8');
    // 自定义的的头参数：headersObj
    for(var i in headersObj){
      a.setRequestHeader(i, headersObj[i]);
    }
  };
  mxXmlRequest.prototype.simulate = function (a, b) {
    a = a || document;
    var c = null;
    a == document && (c = window.onbeforeunload, window.onbeforeunload = null);
    var d = a.createElement("form");
    d.setAttribute("method", this.method);
    d.setAttribute("action", this.url);
    null != b && d.setAttribute("target", b);
    d.style.display = "none";
    d.style.visibility = "hidden";
    for (var e = 0 < this.params.indexOf("&") ? this.params.split("&") : this.params.split(), f = 0; f < e.length; f++) {
      var g = e[f].indexOf("=");
      if (0 < g) {
        var k = e[f].substring(0, g), g = e[f].substring(g +
          1);
        this.decodeSimulateValues && (g = decodeURIComponent(g));
        var l = a.createElement("textarea");
        l.setAttribute("wrap", "off");
        l.setAttribute("name", k);
        mxUtils.write(l, g);
        d.appendChild(l)
      }
    }
    a.body.appendChild(d);
    d.submit();
    null != d.parentNode && d.parentNode.removeChild(d);
    null != c && (window.onbeforeunload = c)
  };
  var mxUtils = {
    errorResource: "none" != mxClient.language ? "error" : "",
    closeResource: "none" != mxClient.language ? "close" : "",
    errorImage: mxClient.imageBasePath + "/error.gif",
    removeCursors: function (a) {
      null != a.style && (a.style.cursor = "");
      a = a.childNodes;
      if (null != a) for (var b = a.length, c = 0; c < b; c += 1) mxUtils.removeCursors(a[c])
    },
    getCurrentStyle: function () {
      return mxClient.IS_IE && (null == document.documentMode || 9 > document.documentMode) ? function (a) {
        return null != a ? a.currentStyle : null
      } : function (a) {
        return null != a ? window.getComputedStyle(a,
          "") : null
      }
    }(),
    parseCssNumber: function (a) {
      "thin" == a ? a = "2" : "medium" == a ? a = "4" : "thick" == a && (a = "6");
      a = parseFloat(a);
      isNaN(a) && (a = 0);
      return a
    },
    setPrefixedStyle: function () {
      var a = null;
      mxClient.IS_OT ? a = "O" : mxClient.IS_SF || mxClient.IS_GC ? a = "Webkit" : mxClient.IS_MT ? a = "Moz" : mxClient.IS_IE && 9 <= document.documentMode && 10 > document.documentMode && (a = "ms");
      return function (b, c, d) {
        b[c] = d;
        null != a && 0 < c.length && (c = a + c.substring(0, 1).toUpperCase() + c.substring(1), b[c] = d)
      }
    }(),
    hasScrollbars: function (a) {
      a = mxUtils.getCurrentStyle(a);
      return null != a && ("scroll" == a.overflow || "auto" == a.overflow)
    },
    bind: function (a, b) {
      return function () {
        return b.apply(a, arguments)
      }
    },
    eval: function (a) {
      var b = null;
      if (0 <= a.indexOf("function")) try {
        eval("var _mxJavaScriptExpression=" + a), b = _mxJavaScriptExpression, _mxJavaScriptExpression = null
      } catch (c) {
        mxLog.warn(c.message + " while evaluating " + a)
      } else try {
        b = eval(a)
      } catch (c) {
        mxLog.warn(c.message + " while evaluating " + a)
      }
      return b
    },
    findNode: function (a, b, c) {
      if (a.nodeType == mxConstants.NODETYPE_ELEMENT) {
        var d = a.getAttribute(b);
        if (null != d && d == c) return a
      }
      for (a = a.firstChild; null != a;) {
        d = mxUtils.findNode(a, b, c);
        if (null != d) return d;
        a = a.nextSibling
      }
      return null
    },
    getFunctionName: function (a) {
      var b = null;
      null != a && (null != a.name ? b = a.name : (b = mxUtils.trim(a.toString()), /^function\s/.test(b) && (b = mxUtils.ltrim(b.substring(9)), a = b.indexOf("("), 0 < a && (b = b.substring(0, a)))));
      return b
    },
    indexOf: function (a, b) {
      if (null != a && null != b) for (var c = 0; c < a.length; c++) if (a[c] == b) return c;
      return -1
    },
    forEach: function (a, b) {
      if (null != a && null != b) for (var c = 0; c < a.length; c++) b(a[c]);
      return a
    },
    remove: function (a, b) {
      var c = null;
      if ("object" == typeof b) for (var d = mxUtils.indexOf(b, a); 0 <= d;) b.splice(d, 1), c = a, d = mxUtils.indexOf(b, a);
      for (var e in b) b[e] == a && (delete b[e], c = a);
      return c
    },
    isNode: function (a, b, c, d) {
      return null == a || isNaN(a.nodeType) || null != b && a.nodeName.toLowerCase() != b.toLowerCase() ? !1 : null == c || a.getAttribute(c) == d
    },
    isAncestorNode: function (a, b) {
      for (var c = b; null != c;) {
        if (c == a) return !0;
        c = c.parentNode
      }
      return !1
    },
    getChildNodes: function (a, b) {
      b = b || mxConstants.NODETYPE_ELEMENT;
      for (var c =
        [], d = a.firstChild; null != d;) d.nodeType == b && c.push(d), d = d.nextSibling;
      return c
    },
    importNode: function (a, b, c) {
      return mxClient.IS_IE && (null == document.documentMode || 10 > document.documentMode) ? mxUtils.importNodeImplementation(a, b, c) : a.importNode(b, c)
    },
    importNodeImplementation: function (a, b, c) {
      switch (b.nodeType) {
        case 1:
          var d = a.createElement(b.nodeName);
          if (b.attributes && 0 < b.attributes.length) for (var e = 0; e < b.attributes.length; e++) d.setAttribute(b.attributes[e].nodeName, b.getAttribute(b.attributes[e].nodeName));
          if (c && b.childNodes && 0 < b.childNodes.length) for (e = 0; e < b.childNodes.length; e++) d.appendChild(mxUtils.importNodeImplementation(a, b.childNodes[e], c));
          return d;
        case 3:
        case 4:
        case 8:
          return a.createTextNode(null != b.nodeValue ? b.nodeValue : b.value)
      }
    },
    createXmlDocument: function () {
      var a = null;
      document.implementation && document.implementation.createDocument ? a = document.implementation.createDocument("", "", null) : "ActiveXObject" in window && (a = mxUtils.createMsXmlDocument());
      return a
    },
    createMsXmlDocument: function () {
      var a =
        new ActiveXObject("Microsoft.XMLDOM");
      a.async = !1;
      a.validateOnParse = !1;
      a.resolveExternals = !1;
      return a
    },
    parseXml: function () {
      return window.DOMParser ? function (a) {
        return (new DOMParser).parseFromString(a, "text/xml")
      } : function (a) {
        var b = mxUtils.createMsXmlDocument();
        b.loadXML(a);
        return b
      }
    }(),
    clearSelection: function () {
      return document.selection ? function () {
        document.selection.empty()
      } : window.getSelection ? function () {
        window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges &&
          window.getSelection().removeAllRanges()
      } : function () {
      }
    }(),
    removeWhitespace: function (a, b) {
      for (var c = b ? a.previousSibling : a.nextSibling; null != c && c.nodeType == mxConstants.NODETYPE_TEXT;) {
        var d = b ? c.previousSibling : c.nextSibling, e = mxUtils.getTextContent(c);
        0 == mxUtils.trim(e).length && c.parentNode.removeChild(c);
        c = d
      }
    },
    htmlEntities: function (a, b) {
      a = String(a || "");
      a = a.replace(/&/g, "&amp;");
      a = a.replace(/"/g, "&quot;");
      a = a.replace(/\'/g, "&#39;");
      a = a.replace(/</g, "&lt;");
      a = a.replace(/>/g, "&gt;");
      if (null == b || b) a = a.replace(/\n/g,
        "&#xa;");
      return a
    },
    isVml: function (a) {
      return null != a && "urn:schemas-microsoft-com:vml" == a.tagUrn
    },
    getXml: function (a, b) {
      var c = "";
      mxClient.IS_IE || mxClient.IS_IE11 ? c = mxUtils.getPrettyXml(a, "", "", "") : null != window.XMLSerializer ? c = (new XMLSerializer).serializeToString(a) : null != a.xml && (c = a.xml.replace(/\r\n\t[\t]*/g, "").replace(/>\r\n/g, ">").replace(/\r\n/g, "\n"));
      return c.replace(/\n/g, b || "&#xa;")
    },
    getPrettyXml: function (a, b, c, d, e) {
      var f = [];
      if (null != a) if (b = null != b ? b : "  ", c = null != c ? c : "", d = null != d ? d : "\n", null !=
        a.namespaceURI && a.namespaceURI != e && (e = a.namespaceURI, null == a.getAttribute("xmlns") && a.setAttribute("xmlns", a.namespaceURI)), a.nodeType == mxConstants.NODETYPE_DOCUMENT) f.push(mxUtils.getPrettyXml(a.documentElement, b, c, d, e)); else if (a.nodeType == mxConstants.NODETYPE_DOCUMENT_FRAGMENT) {
        var g = a.firstChild;
        if (null != g) for (; null != g;) f.push(mxUtils.getPrettyXml(g, b, c, d, e)), g = g.nextSibling
      } else if (a.nodeType == mxConstants.NODETYPE_COMMENT) a = mxUtils.getTextContent(a), 0 < a.length && f.push(c + "\x3c!--" + a + "--\x3e" +
        d); else if (a.nodeType == mxConstants.NODETYPE_TEXT) a = mxUtils.getTextContent(a), 0 < a.length && f.push(c + mxUtils.htmlEntities(mxUtils.trim(a), !1) + d); else {
        f.push(c + "<" + a.nodeName);
        g = a.attributes;
        if (null != g) for (var k = 0; k < g.length; k++) {
          var l = mxUtils.htmlEntities(g[k].value);
          f.push(" " + g[k].nodeName + '="' + l + '"')
        }
        g = a.firstChild;
        if (null != g) {
          for (f.push(">" + d); null != g;) f.push(mxUtils.getPrettyXml(g, b, c + b, d, e)), g = g.nextSibling;
          f.push(c + "</" + a.nodeName + ">" + d)
        } else f.push(" />" + d)
      }
      return f.join("")
    },
    extractTextWithWhitespace: function (a) {
      function b(a) {
        if (1 !=
          a.length || "BR" != a[0].nodeName && "\n" != a[0].innerHTML) for (var e = 0; e < a.length; e++) {
          var g = a[e];
          "BR" == g.nodeName || "\n" == g.innerHTML || (1 == a.length || 0 == e) && "DIV" == g.nodeName && "<br>" == g.innerHTML.toLowerCase() ? d.push("\n") : (3 === g.nodeType || 4 === g.nodeType ? 0 < g.nodeValue.length && d.push(g.nodeValue) : 8 !== g.nodeType && 0 < g.childNodes.length && b(g.childNodes), e < a.length - 1 && 0 <= mxUtils.indexOf(c, a[e + 1].nodeName) && d.push("\n"))
        }
      }

      var c = "BLOCKQUOTE DIV H1 H2 H3 H4 H5 H6 OL P PRE TABLE UL".split(" "), d = [];
      b(a);
      return d.join("")
    },
    replaceTrailingNewlines: function (a, b) {
      for (var c = ""; 0 < a.length && "\n" == a.charAt(a.length - 1);) a = a.substring(0, a.length - 1), c += b;
      return a + c
    },
    getTextContent: function (a) {
      return mxClient.IS_IE && void 0 !== a.innerText ? a.innerText : null != a ? a[void 0 === a.textContent ? "text" : "textContent"] : ""
    },
    setTextContent: function (a, b) {
      void 0 !== a.innerText ? a.innerText = b : a[void 0 === a.textContent ? "text" : "textContent"] = b
    },
    getInnerHtml: function () {
      return mxClient.IS_IE ? function (a) {
        return null != a ? a.innerHTML : ""
      } : function (a) {
        return null !=
        a ? (new XMLSerializer).serializeToString(a) : ""
      }
    }(),
    getOuterHtml: function () {
      return mxClient.IS_IE ? function (a) {
        if (null != a) {
          if (null != a.outerHTML) return a.outerHTML;
          var b = [];
          b.push("<" + a.nodeName);
          var c = a.attributes;
          if (null != c) for (var d = 0; d < c.length; d++) {
            var e = c[d].value;
            null != e && 0 < e.length && (b.push(" "), b.push(c[d].nodeName), b.push('="'), b.push(e), b.push('"'))
          }
          0 == a.innerHTML.length ? b.push("/>") : (b.push(">"), b.push(a.innerHTML), b.push("</" + a.nodeName + ">"));
          return b.join("")
        }
        return ""
      } : function (a) {
        return null !=
        a ? (new XMLSerializer).serializeToString(a) : ""
      }
    }(),
    write: function (a, b) {
      var c = a.ownerDocument.createTextNode(b);
      null != a && a.appendChild(c);
      return c
    },
    writeln: function (a, b) {
      var c = a.ownerDocument.createTextNode(b);
      if(a != null){
        a.appendChild(c);
        a.appendChild(document.createElement("br"));
      }
      return c
    },
    br: function (a, b) {
      b = b || 1;
      for (var c = null, d = 0; d < b; d++) null != a && (c = a.ownerDocument.createElement("br"), a.appendChild(c));
      return c
    },
    button: function (a, b, c) {
      c = null != c ? c : document;
      c = c.createElement("button");
      mxUtils.write(c,
        a);
      mxEvent.addListener(c, "click", function (a) {
        b(a)
      });
      return c
    },
    para: function (a, b) {
      var c = document.createElement("p");
      mxUtils.write(c, b);
      null != a && a.appendChild(c);
      return c
    },
    addTransparentBackgroundFilter: function (a) {
      a.style.filter += "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + mxClient.imageBasePath + "/transparent.gif', sizingMethod='scale')"
    },
    linkAction: function (a, b, c, d, e) {
      return mxUtils.link(a, b, function () {
        c.execute(d)
      }, e)
    },
    linkInvoke: function (a, b, c, d, e, f) {
      return mxUtils.link(a, b, function () {
          c[d](e)
        },
        f)
    },
    link: function (a, b, c, d) {
      var e = document.createElement("span");
      e.style.color = "blue";
      e.style.textDecoration = "underline";
      e.style.cursor = "pointer";
      null != d && (e.style.paddingLeft = d + "px");
      mxEvent.addListener(e, "click", c);
      mxUtils.write(e, b);
      null != a && a.appendChild(e);
      return e
    },
    getDocumentSize: function () {
      var a = document.body, b = document.documentElement;
      try {
        return new mxRectangle(0, 0, a.clientWidth || b.clientWidth, Math.max(a.clientHeight || 0, b.clientHeight))
      } catch (c) {
        return new mxRectangle
      }
    },
    fit: function (a) {
      var b =
          mxUtils.getDocumentSize(), c = parseInt(a.offsetLeft), d = parseInt(a.offsetWidth),
        e = mxUtils.getDocumentScrollOrigin(a.ownerDocument), f = e.x, e = e.y, g = f + b.width;
      c + d > g && (a.style.left = Math.max(f, g - d) + "px");
      c = parseInt(a.offsetTop);
      d = parseInt(a.offsetHeight);
      b = e + b.height;
      c + d > b && (a.style.top = Math.max(e, b - d) + "px")
    },
    load: function (a) {
      a = new mxXmlRequest(a, null, "GET", !1);
      a.send();
      return a
    },
    get: function (url, headers, b, c, d, e, f, g) {
      var mxXmlRequestIns = new mxXmlRequest(url, headers, null, "GET");//url, headers, params, method
      var setRequestHeadersFn = mxXmlRequestIns.setRequestHeaders;
      if(g){
        mxXmlRequestIns.setRequestHeaders = function (a, b) {// 这里的a 是否为url或者mxXmlRequestIns？
          setRequestHeadersFn.apply(this, arguments);
          for (var c in g) a.setRequestHeader(c, g[c])
        };
      }

      d && mxXmlRequestIns.setBinary(d);
      mxXmlRequestIns.send(b, c, e, f);
      return mxXmlRequestIns;
    },
    getAll: function (a, b, c) {
      for (var d = a.length, e = [], f = 0, g = function () {
        0 == f && null != c && c();
        f++
      }, k = 0; k < a.length; k++) (function (a, c) {
        mxUtils.get(a, {}, function (a) {
          var f = a.getStatus();
          200 > f || 299 < f ? g() : (e[c] = a, d--, 0 == d && b(e))
        }, g)
      })(a[k], k);
      0 == d && b(e)
    },
    post: function (url, headers, params, c, d) {
      var formatedParams = postEncodeParamsFunction(params);
      return (new mxXmlRequest(url, headers, formatedParams)).send(c, d)
    },
    submit: function (a, b, c, d) {
      return (new mxXmlRequest(a, b)).simulate(c, d)
    },
    loadInto: function (a, b, c) {
      mxClient.IS_IE ?
        b.onreadystatechange = function () {
          4 == b.readyState && c()
        } : b.addEventListener("load", c, !1);
      b.load(a)
    },
    getValue: function (a, b, c) {
      a = null != a ? a[b] : null;
      null == a && (a = c);
      return a
    },
    getNumber: function (a, b, c) {
      a = null != a ? a[b] : null;
      null == a && (a = c || 0);
      return Number(a)
    },
    getColor: function (a, b, c) {
      a = null != a ? a[b] : null;
      null == a ? a = c : a == mxConstants.NONE && (a = null);
      return a
    },
    clone: function (a, b, c) {
      c = null != c ? c : !1;
      var d = null;
      if (null != a && "function" == typeof a.constructor) {
        var d = new a.constructor, e;
        for (e in a) e != mxObjectIdentity.FIELD_NAME &&
        (null == b || 0 > mxUtils.indexOf(b, e)) && (d[e] = c || "object" != typeof a[e] ? a[e] : mxUtils.clone(a[e]))
      }
      return d
    },
    equalPoints: function (a, b) {
      if (null == a && null != b || null != a && null == b || null != a && null != b && a.length != b.length) return !1;
      if (null != a && null != b) for (var c = 0; c < a.length; c++) if (null != a[c] && null == b[c] || null == a[c] && null != b[c] || null != a[c] && null != b[c] && (a[c].x != b[c].x || a[c].y != b[c].y)) return !1;
      return !0
    },
    equalEntries: function (a, b) {
      var c = 0;
      if (null == a && null != b || null != a && null == b || null != a && null != b && a.length != b.length) return !1;
      if (null != a && null != b) {
        for (var d in b) c++;
        for (d in a) if (c--, !(mxUtils.isNaN(a[d]) && mxUtils.isNaN(b[d]) || a[d] == b[d])) return !1
      }
      return 0 == c
    },
    removeDuplicates: function (a) {
      for (var b = new mxDictionary, c = [], d = 0; d < a.length; d++) b.get(a[d]) || (c.push(a[d]), b.put(a[d], !0));
      return c
    },
    isNaN: function (a) {
      return "number" == typeof a && isNaN(a)
    },
    extend: function (a, b) {
      var c = function () {
      };
      c.prototype = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a
    },
    toString: function (a) {
      var b = "", c;
      for (c in a) try {
        if (null == a[c]) b += c + " = [null]\n";
        else if ("function" == typeof a[c]) b += c + " => [Function]\n"; else if ("object" == typeof a[c]) var d = mxUtils.getFunctionName(a[c].constructor),
          b = b + (c + " => [" + d + "]\n"); else b += c + " = " + a[c] + "\n"
      } catch (e) {
        b += c + "=" + e.message
      }
      return b
    },
    toRadians: function (a) {
      return Math.PI * a / 180
    },
    toDegree: function (a) {
      return 180 * a / Math.PI
    },
    arcToCurves: function (a, b, c, d, e, f, g, k, l) {
      k -= a;
      l -= b;
      if (0 === c || 0 === d) return q;
      c = Math.abs(c);
      d = Math.abs(d);
      var m = -k / 2, n = -l / 2, p = Math.cos(e * Math.PI / 180), q = Math.sin(e * Math.PI / 180);
      e = p * m + q * n;
      var m = -1 *
        q * m + p * n, n = e * e, r = m * m, t = c * c, u = d * d, x = n / t + r / u;
      1 < x ? (c *= Math.sqrt(x), d *= Math.sqrt(x), f = 0) : (x = 1, f === g && (x = -1), f = x * Math.sqrt((t * u - t * r - u * n) / (t * r + u * n)));
      n = f * c * m / d;
      r = -1 * f * d * e / c;
      k = p * n - q * r + k / 2;
      l = q * n + p * r + l / 2;
      t = Math.atan2((m - r) / d, (e - n) / c) - Math.atan2(0, 1);
      f = 0 <= t ? t : 2 * Math.PI + t;
      t = Math.atan2((-m - r) / d, (-e - n) / c) - Math.atan2((m - r) / d, (e - n) / c);
      e = 0 <= t ? t : 2 * Math.PI + t;
      0 == g && 0 < e ? e -= 2 * Math.PI : 0 != g && 0 > e && (e += 2 * Math.PI);
      g = 2 * e / Math.PI;
      g = Math.ceil(0 > g ? -1 * g : g);
      e /= g;
      m = 8 / 3 * Math.sin(e / 4) * Math.sin(e / 4) / Math.sin(e / 2);
      n = p * c;
      p *= d;
      c *= q;
      d *=
        q;
      for (var y = Math.cos(f), B = Math.sin(f), r = -m * (n * B + d * y), t = -m * (c * B - p * y), q = [], A = 0; A < g; ++A) {
        f += e;
        var y = Math.cos(f), B = Math.sin(f), u = n * y - d * B + k, x = c * y + p * B + l, z = -m * (n * B + d * y),
          y = -m * (c * B - p * y), B = 6 * A;
        q[B] = Number(r + a);
        q[B + 1] = Number(t + b);
        q[B + 2] = Number(u - z + a);
        q[B + 3] = Number(x - y + b);
        q[B + 4] = Number(u + a);
        q[B + 5] = Number(x + b);
        r = u + z;
        t = x + y
      }
      return q
    },
    getBoundingBox: function (a, b, c) {
      var d = null;
      if (null != a && null != b && 0 != b) {
        b = mxUtils.toRadians(b);
        var d = Math.cos(b), e = Math.sin(b);
        c = null != c ? c : new mxPoint(a.x + a.width / 2, a.y + a.height / 2);
        var f = new mxPoint(a.x, a.y);
        b = new mxPoint(a.x + a.width, a.y);
        var g = new mxPoint(b.x, a.y + a.height);
        a = new mxPoint(a.x, g.y);
        f = mxUtils.getRotatedPoint(f, d, e, c);
        b = mxUtils.getRotatedPoint(b, d, e, c);
        g = mxUtils.getRotatedPoint(g, d, e, c);
        a = mxUtils.getRotatedPoint(a, d, e, c);
        d = new mxRectangle(f.x, f.y, 0, 0);
        d.add(new mxRectangle(b.x, b.y, 0, 0));
        d.add(new mxRectangle(g.x, g.y, 0, 0));
        d.add(new mxRectangle(a.x, a.y, 0, 0))
      }
      return d
    },
    getRotatedPoint: function (a, b, c, d) {
      d = null != d ? d : new mxPoint;
      var e = a.x - d.x;
      a = a.y - d.y;
      return new mxPoint(e *
        b - a * c + d.x, a * b + e * c + d.y)
    },
    getPortConstraints: function (a, b, c, d) {
      b = mxUtils.getValue(a.style, mxConstants.STYLE_PORT_CONSTRAINT, mxUtils.getValue(b.style, c ? mxConstants.STYLE_SOURCE_PORT_CONSTRAINT : mxConstants.STYLE_TARGET_PORT_CONSTRAINT, null));
      if (null == b) return d;
      d = b.toString();
      b = mxConstants.DIRECTION_MASK_NONE;
      c = 0;
      1 == mxUtils.getValue(a.style, mxConstants.STYLE_PORT_CONSTRAINT_ROTATION, 0) && (c = mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0));
      a = 0;
      45 < c ? (a = 1, 135 <= c && (a = 2)) : -45 > c && (a = 3, -135 >= c && (a = 2));
      if (0 <= d.indexOf(mxConstants.DIRECTION_NORTH)) switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_NORTH;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_EAST;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_SOUTH;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_WEST
      }
      if (0 <= d.indexOf(mxConstants.DIRECTION_WEST)) switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_WEST;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_NORTH;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_EAST;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_SOUTH
      }
      if (0 <= d.indexOf(mxConstants.DIRECTION_SOUTH)) switch (a) {
        case 0:
          b |=
            mxConstants.DIRECTION_MASK_SOUTH;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_WEST;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_NORTH;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_EAST
      }
      if (0 <= d.indexOf(mxConstants.DIRECTION_EAST)) switch (a) {
        case 0:
          b |= mxConstants.DIRECTION_MASK_EAST;
          break;
        case 1:
          b |= mxConstants.DIRECTION_MASK_SOUTH;
          break;
        case 2:
          b |= mxConstants.DIRECTION_MASK_WEST;
          break;
        case 3:
          b |= mxConstants.DIRECTION_MASK_NORTH
      }
      return b
    },
    reversePortConstraints: function (a) {
      var b;
      b = (a & mxConstants.DIRECTION_MASK_WEST) <<
        3;
      b |= (a & mxConstants.DIRECTION_MASK_NORTH) << 1;
      b |= (a & mxConstants.DIRECTION_MASK_SOUTH) >> 1;
      return b | (a & mxConstants.DIRECTION_MASK_EAST) >> 3
    },
    findNearestSegment: function (a, b, c) {
      var d = -1;
      if (0 < a.absolutePoints.length) for (var e = a.absolutePoints[0], f = null, g = 1; g < a.absolutePoints.length; g++) {
        var k = a.absolutePoints[g], e = mxUtils.ptSegDistSq(e.x, e.y, k.x, k.y, b, c);
        if (null == f || e < f) f = e, d = g - 1;
        e = k
      }
      return d
    },
    getDirectedBounds: function (a, b, c, d, e) {
      var f = mxUtils.getValue(c, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST);
      d = null != d ? d : mxUtils.getValue(c, mxConstants.STYLE_FLIPH, !1);
      e = null != e ? e : mxUtils.getValue(c, mxConstants.STYLE_FLIPV, !1);
      b.x = Math.round(Math.max(0, Math.min(a.width, b.x)));
      b.y = Math.round(Math.max(0, Math.min(a.height, b.y)));
      b.width = Math.round(Math.max(0, Math.min(a.width, b.width)));
      b.height = Math.round(Math.max(0, Math.min(a.height, b.height)));
      if (e && (f == mxConstants.DIRECTION_SOUTH || f == mxConstants.DIRECTION_NORTH) || d && (f == mxConstants.DIRECTION_EAST || f == mxConstants.DIRECTION_WEST)) c = b.x, b.x = b.width, b.width =
        c;
      if (d && (f == mxConstants.DIRECTION_SOUTH || f == mxConstants.DIRECTION_NORTH) || e && (f == mxConstants.DIRECTION_EAST || f == mxConstants.DIRECTION_WEST)) c = b.y, b.y = b.height, b.height = c;
      d = mxRectangle.fromRectangle(b);
      f == mxConstants.DIRECTION_SOUTH ? (d.y = b.x, d.x = b.height, d.width = b.y, d.height = b.width) : f == mxConstants.DIRECTION_WEST ? (d.y = b.height, d.x = b.width, d.width = b.x, d.height = b.y) : f == mxConstants.DIRECTION_NORTH && (d.y = b.width, d.x = b.y, d.width = b.height, d.height = b.x);
      return new mxRectangle(a.x + d.x, a.y + d.y, a.width - d.width -
        d.x, a.height - d.height - d.y)
    },
    getPerimeterPoint: function (a, b, c) {
      for (var d = null, e = 0; e < a.length - 1; e++) {
        var f = mxUtils.intersection(a[e].x, a[e].y, a[e + 1].x, a[e + 1].y, b.x, b.y, c.x, c.y);
        if (null != f) {
          var g = c.x - f.x, k = c.y - f.y, f = {p: f, distSq: k * k + g * g};
          null != f && (null == d || d.distSq > f.distSq) && (d = f)
        }
      }
      return null != d ? d.p : null
    },
    rectangleIntersectsSegment: function (a, b, c) {
      var d = a.y, e = a.x, f = d + a.height, g = e + a.width;
      a = b.x;
      var k = c.x;
      b.x > c.x && (a = c.x, k = b.x);
      k > g && (k = g);
      a < e && (a = e);
      if (a > k) return !1;
      var e = b.y, g = c.y, l = c.x - b.x;
      1E-7 < Math.abs(l) &&
      (c = (c.y - b.y) / l, b = b.y - c * b.x, e = c * a + b, g = c * k + b);
      e > g && (b = g, g = e, e = b);
      g > f && (g = f);
      e < d && (e = d);
      return e > g ? !1 : !0
    },
    contains: function (a, b, c) {
      return a.x <= b && a.x + a.width >= b && a.y <= c && a.y + a.height >= c
    },
    intersects: function (a, b) {
      var c = a.width, d = a.height, e = b.width, f = b.height;
      if (0 >= e || 0 >= f || 0 >= c || 0 >= d) return !1;
      var g = a.x, k = a.y, l = b.x, m = b.y, e = e + l, f = f + m, c = c + g, d = d + k;
      return (e < l || e > g) && (f < m || f > k) && (c < g || c > l) && (d < k || d > m)
    },
    intersectsHotspot: function (a, b, c, d, e, f) {
      d = null != d ? d : 1;
      e = null != e ? e : 0;
      f = null != f ? f : 0;
      if (0 < d) {
        var g = a.getCenterX(),
          k = a.getCenterY(), l = a.width, m = a.height,
          n = mxUtils.getValue(a.style, mxConstants.STYLE_STARTSIZE) * a.view.scale;
        0 < n && (mxUtils.getValue(a.style, mxConstants.STYLE_HORIZONTAL, !0) ? (k = a.y + n / 2, m = n) : (g = a.x + n / 2, l = n));
        l = Math.max(e, l * d);
        m = Math.max(e, m * d);
        0 < f && (l = Math.min(l, f), m = Math.min(m, f));
        d = new mxRectangle(g - l / 2, k - m / 2, l, m);
        g = mxUtils.toRadians(mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION) || 0);
        0 != g && (e = Math.cos(-g), f = Math.sin(-g), g = new mxPoint(a.getCenterX(), a.getCenterY()), a = mxUtils.getRotatedPoint(new mxPoint(b,
          c), e, f, g), b = a.x, c = a.y);
        return mxUtils.contains(d, b, c)
      }
      return !0
    },
    getOffset: function (a, b) {
      for (var c = 0, d = 0, e = !1, f = a, g = document.body, k = document.documentElement; null != f && f != g && f != k && !e;) {
        var l = mxUtils.getCurrentStyle(f);
        null != l && (e = e || "fixed" == l.position);
        f = f.parentNode
      }
      b || e || (e = mxUtils.getDocumentScrollOrigin(a.ownerDocument), c += e.x, d += e.y);
      e = a.getBoundingClientRect();
      null != e && (c += e.left, d += e.top);
      return new mxPoint(c, d)
    },
    getDocumentScrollOrigin: function (a) {
      if (mxClient.IS_QUIRKS) return new mxPoint(a.body.scrollLeft,
        a.body.scrollTop);
      a = a.defaultView || a.parentWindow;
      return new mxPoint(null != a && void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft, null != a && void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop)
    },
    getScrollOrigin: function (a, b, c) {
      b = null != b ? b : !1;
      c = null != c ? c : !0;
      for (var d = null != a ? a.ownerDocument : document, e = d.body, f = d.documentElement, g = new mxPoint, k = !1; null != a &&
      a != e && a != f;) {
        isNaN(a.scrollLeft) || isNaN(a.scrollTop) || (g.x += a.scrollLeft, g.y += a.scrollTop);
        var l = mxUtils.getCurrentStyle(a);
        null != l && (k = k || "fixed" == l.position);
        a = b ? a.parentNode : null
      }
      !k && c && (a = mxUtils.getDocumentScrollOrigin(d), g.x += a.x, g.y += a.y);
      return g
    },
    convertPoint: function (a, b, c) {
      var d = mxUtils.getScrollOrigin(a, !1);
      a = mxUtils.getOffset(a);
      a.x -= d.x;
      a.y -= d.y;
      return new mxPoint(b - a.x, c - a.y)
    },
    ltrim: function (a, b) {
      return null != a ? a.replace(new RegExp("^[" + (b || "\\s") + "]+", "g"), "") : null
    },
    rtrim: function (a,
                     b) {
      return null != a ? a.replace(new RegExp("[" + (b || "\\s") + "]+$", "g"), "") : null
    },
    trim: function (a, b) {
      return mxUtils.ltrim(mxUtils.rtrim(a, b), b)
    },
    isNumeric: function (a) {
      return !isNaN(parseFloat(a)) && isFinite(a) && ("string" != typeof a || 0 > a.toLowerCase().indexOf("0x"))
    },
    isInteger: function (a) {
      return String(parseInt(a)) === String(a)
    },
    mod: function (a, b) {
      return (a % b + b) % b
    },
    intersection: function (a, b, c, d, e, f, g, k) {
      var l = (k - f) * (c - a) - (g - e) * (d - b);
      g = ((g - e) * (b - f) - (k - f) * (a - e)) / l;
      e = ((c - a) * (b - f) - (d - b) * (a - e)) / l;
      return 0 <= g && 1 >= g &&
      0 <= e && 1 >= e ? new mxPoint(a + g * (c - a), b + g * (d - b)) : null
    },
    ptSegDistSq: function (a, b, c, d, e, f) {
      c -= a;
      d -= b;
      e -= a;
      f -= b;
      0 >= e * c + f * d ? c = 0 : (e = c - e, f = d - f, a = e * c + f * d, c = 0 >= a ? 0 : a * a / (c * c + d * d));
      e = e * e + f * f - c;
      0 > e && (e = 0);
      return e
    },
    ptLineDist: function (a, b, c, d, e, f) {
      return Math.abs((d - b) * e - (c - a) * f + c * b - d * a) / Math.sqrt((d - b) * (d - b) + (c - a) * (c - a))
    },
    relativeCcw: function (a, b, c, d, e, f) {
      c -= a;
      d -= b;
      e -= a;
      f -= b;
      a = e * d - f * c;
      0 == a && (a = e * c + f * d, 0 < a && (a = (e - c) * c + (f - d) * d, 0 > a && (a = 0)));
      return 0 > a ? -1 : 0 < a ? 1 : 0
    },
    animateChanges: function (a, b) {
      mxEffects.animateChanges.apply(this,
        arguments)
    },
    cascadeOpacity: function (a, b, c) {
      mxEffects.cascadeOpacity.apply(this, arguments)
    },
    fadeOut: function (a, b, c, d, e, f) {
      mxEffects.fadeOut.apply(this, arguments)
    },
    setOpacity: function (a, b) {
      mxUtils.isVml(a) ? a.style.filter = 100 <= b ? "" : "alpha(opacity=" + b / 5 + ")" : mxClient.IS_IE && ("undefined" === typeof document.documentMode || 9 > document.documentMode) ? a.style.filter = 100 <= b ? "" : "alpha(opacity=" + b + ")" : a.style.opacity = b / 100
    },
    createImage: function (a) {
      var b;
      mxClient.IS_IE6 && "CSS1Compat" != document.compatMode ? (b = document.createElement(mxClient.VML_PREFIX +
        ":image"), b.setAttribute("src", a), b.style.borderStyle = "none") : (b = document.createElement("img"), b.setAttribute("src", a), b.setAttribute("border", "0"));
      return b
    },
    sortCells: function (a, b) {
      b = null != b ? b : !0;
      var c = new mxDictionary;
      a.sort(function (a, e) {
        var d = c.get(a);
        null == d && (d = mxCellPath.create(a).split(mxCellPath.PATH_SEPARATOR), c.put(a, d));
        var g = c.get(e);
        null == g && (g = mxCellPath.create(e).split(mxCellPath.PATH_SEPARATOR), c.put(e, g));
        d = mxCellPath.compare(d, g);
        return 0 == d ? 0 : 0 < d == b ? 1 : -1
      });
      return a
    },
    getStylename: function (a) {
      return null !=
      a && (a = a.split(";")[0], 0 > a.indexOf("=")) ? a : ""
    },
    getStylenames: function (a) {
      var b = [];
      if (null != a) {
        a = a.split(";");
        for (var c = 0; c < a.length; c++) 0 > a[c].indexOf("=") && b.push(a[c])
      }
      return b
    },
    indexOfStylename: function (a, b) {
      if (null != a && null != b) for (var c = a.split(";"), d = 0, e = 0; e < c.length; e++) {
        if (c[e] == b) return d;
        d += c[e].length + 1
      }
      return -1
    },
    addStylename: function (a, b) {
      0 > mxUtils.indexOfStylename(a, b) && (null == a ? a = "" : 0 < a.length && ";" != a.charAt(a.length - 1) && (a += ";"), a += b);
      return a
    },
    removeStylename: function (a, b) {
      var c = [];
      if (null != a) for (var d = a.split(";"), e = 0; e < d.length; e++) d[e] != b && c.push(d[e]);
      return c.join(";")
    },
    removeAllStylenames: function (a) {
      var b = [];
      if (null != a) {
        a = a.split(";");
        for (var c = 0; c < a.length; c++) 0 <= a[c].indexOf("=") && b.push(a[c])
      }
      return b.join(";")
    },
    setCellStyles: function (a, b, c, d) {
      if (null != b && 0 < b.length) {
        a.beginUpdate();
        try {
          for (var e = 0; e < b.length; e++) if (null != b[e]) {
            var f = mxUtils.setStyle(a.getStyle(b[e]), c, d);
            a.setStyle(b[e], f)
          }
        } finally {
          a.endUpdate()
        }
      }
    },
    setStyle: function (a, b, c) {
      var d = null != c && ("undefined" ==
        typeof c.length || 0 < c.length);
      if (null == a || 0 == a.length) d && (a = b + "=" + c + ";"); else if (a.substring(0, b.length + 1) == b + "=") {
        var e = a.indexOf(";");
        a = d ? b + "=" + c + (0 > e ? ";" : a.substring(e)) : 0 > e || e == a.length - 1 ? "" : a.substring(e + 1)
      } else {
        var f = a.indexOf(";" + b + "=");
        0 > f ? d && (d = ";" == a.charAt(a.length - 1) ? "" : ";", a = a + d + b + "=" + c + ";") : (e = a.indexOf(";", f + 1), a = d ? a.substring(0, f + 1) + b + "=" + c + (0 > e ? ";" : a.substring(e)) : a.substring(0, f) + (0 > e ? ";" : a.substring(e)))
      }
      return a
    },
    setCellStyleFlags: function (a, b, c, d, e) {
      if (null != b && 0 < b.length) {
        a.beginUpdate();
        try {
          for (var f = 0; f < b.length; f++) if (null != b[f]) {
            var g = mxUtils.setStyleFlag(a.getStyle(b[f]), c, d, e);
            a.setStyle(b[f], g)
          }
        } finally {
          a.endUpdate()
        }
      }
    },
    setStyleFlag: function (a, b, c, d) {
      if (null == a || 0 == a.length) a = d || null == d ? b + "=" + c : b + "=0"; else {
        var e = a.indexOf(b + "=");
        if (0 > e) e = ";" == a.charAt(a.length - 1) ? "" : ";", a = d || null == d ? a + e + b + "=" + c : a + e + b + "=0"; else {
          var f = a.indexOf(";", e), g;
          g = 0 > f ? a.substring(e + b.length + 1) : a.substring(e + b.length + 1, f);
          g = null == d ? parseInt(g) ^ c : d ? parseInt(g) | c : parseInt(g) & ~c;
          a = a.substring(0, e) + b + "=" +
            g + (0 <= f ? a.substring(f) : "")
        }
      }
      return a
    },
    getAlignmentAsPoint: function (a, b) {
      var c = -.5, d = -.5;
      a == mxConstants.ALIGN_LEFT ? c = 0 : a == mxConstants.ALIGN_RIGHT && (c = -1);
      b == mxConstants.ALIGN_TOP ? d = 0 : b == mxConstants.ALIGN_BOTTOM && (d = -1);
      return new mxPoint(c, d)
    },
    getSizeForString: function (a, b, c, d, e) {
      b = null != b ? b : mxConstants.DEFAULT_FONTSIZE;
      c = null != c ? c : mxConstants.DEFAULT_FONTFAMILY;
      var f = document.createElement("div");
      f.style.fontFamily = c;
      f.style.fontSize = Math.round(b) + "px";
      f.style.lineHeight = Math.round(b * mxConstants.LINE_HEIGHT) +
        "px";
      null != e && ((e & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD && (f.style.fontWeight = "bold"), (e & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC && (f.style.fontStyle = "italic"), b = [], (e & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && b.push("underline"), (e & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && b.push("line-through"), 0 < b.length && (f.style.textDecoration = b.join(" ")));
      f.style.position = "absolute";
      f.style.visibility = "hidden";
      f.style.display = mxClient.IS_QUIRKS ? "inline" :
        "inline-block";
      f.style.zoom = "1";
      null != d ? (f.style.width = d + "px", f.style.whiteSpace = "normal") : f.style.whiteSpace = "nowrap";
      f.innerHTML = a;
      document.body.appendChild(f);
      a = new mxRectangle(0, 0, f.offsetWidth, f.offsetHeight);
      document.body.removeChild(f);
      return a
    },
    getViewXml: function (a, b, c, d, e) {
      d = null != d ? d : 0;
      e = null != e ? e : 0;
      b = null != b ? b : 1;
      null == c && (c = [a.getModel().getRoot()]);
      var f = a.getView(), g = null, k = f.isEventsEnabled();
      f.setEventsEnabled(!1);
      var l = f.drawPane, m = f.overlayPane;
      a.dialect == mxConstants.DIALECT_SVG ?
        (f.drawPane = document.createElementNS(mxConstants.NS_SVG, "g"), f.canvas.appendChild(f.drawPane), f.overlayPane = document.createElementNS(mxConstants.NS_SVG, "g")) : (f.drawPane = f.drawPane.cloneNode(!1), f.canvas.appendChild(f.drawPane), f.overlayPane = f.overlayPane.cloneNode(!1));
      f.canvas.appendChild(f.overlayPane);
      var n = f.getTranslate();
      f.translate = new mxPoint(d, e);
      b = new mxTemporaryCellStates(a.getView(), b, c);
      try {
        g = (new mxCodec).encode(a.getView())
      } finally {
        b.destroy(), f.translate = n, f.canvas.removeChild(f.drawPane),
          f.canvas.removeChild(f.overlayPane), f.drawPane = l, f.overlayPane = m, f.setEventsEnabled(k)
      }
      return g
    },
    getScaleForPageCount: function (a, b, c, d) {
      if (1 > a) return 1;
      c = null != c ? c : mxConstants.PAGE_FORMAT_A4_PORTRAIT;
      d = null != d ? d : 0;
      var e = c.width - 2 * d;
      c = c.height - 2 * d;
      d = b.getGraphBounds().clone();
      b = b.getView().getScale();
      d.width /= b;
      d.height /= b;
      b = d.width;
      var f = Math.sqrt(a);
      d = Math.sqrt(b / d.height / (e / c));
      c = f * d;
      d = f / d;
      if (1 > c && d > a) {
        var g = d / a;
        d = a;
        c /= g
      }
      1 > d && c > a && (g = c / a, c = a, d /= g);
      g = Math.ceil(c) * Math.ceil(d);
      for (f = 0; g > a;) {
        var g =
          Math.floor(c) / c, k = Math.floor(d) / d;
        1 == g && (g = Math.floor(c - 1) / c);
        1 == k && (k = Math.floor(d - 1) / d);
        g = g > k ? g : k;
        c *= g;
        d *= g;
        g = Math.ceil(c) * Math.ceil(d);
        f++;
        if (10 < f) break
      }
      return e * c / b * .99999
    },
    show: function (a, b, c, d, e, f) {
      c = null != c ? c : 0;
      d = null != d ? d : 0;
      null == b ? b = window.open().document : b.open();
      9 == document.documentMode && b.writeln('\x3c!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=9"><![endif]--\x3e');
      var g = a.getGraphBounds(), k = Math.ceil(c - g.x), l = Math.ceil(d - g.y);
      null == e && (e = Math.ceil(g.width + c) + Math.ceil(Math.ceil(g.x) -
        g.x));
      null == f && (f = Math.ceil(g.height + d) + Math.ceil(Math.ceil(g.y) - g.y));
      if (mxClient.IS_IE || 11 == document.documentMode) {
        d = "<html><head>";
        g = document.getElementsByTagName("base");
        for (c = 0; c < g.length; c++) d += g[c].outerHTML;
        d += "<style>";
        for (c = 0; c < document.styleSheets.length; c++) try {
          d += document.styleSheets[c].cssText
        } catch (m) {
        }
        d = d + '</style></head><body style="margin:0px;">' + ('<div style="position:absolute;overflow:hidden;width:' + e + "px;height:" + f + 'px;"><div style="position:relative;left:' + k + "px;top:" + l + 'px;">') +
          a.container.innerHTML;
        b.writeln(d + "</div></div></body><html>");
        b.close()
      } else {
        b.writeln("<html><head>");
        g = document.getElementsByTagName("base");
        for (c = 0; c < g.length; c++) b.writeln(mxUtils.getOuterHtml(g[c]));
        d = document.getElementsByTagName("link");
        for (c = 0; c < d.length; c++) b.writeln(mxUtils.getOuterHtml(d[c]));
        d = document.getElementsByTagName("style");
        for (c = 0; c < d.length; c++) b.writeln(mxUtils.getOuterHtml(d[c]));
        b.writeln('</head><body style="margin:0px;"></body></html>');
        b.close();
        c = b.createElement("div");
        c.position = "absolute";
        c.overflow = "hidden";
        c.style.width = e + "px";
        c.style.height = f + "px";
        e = b.createElement("div");
        e.style.position = "absolute";
        e.style.left = k + "px";
        e.style.top = l + "px";
        f = a.container.firstChild;
        for (d = null; null != f;) g = f.cloneNode(!0), f == a.view.drawPane.ownerSVGElement ? (c.appendChild(g), d = g) : e.appendChild(g), f = f.nextSibling;
        b.body.appendChild(c);
        null != e.firstChild && b.body.appendChild(e);
        null != d && (d.style.minWidth = "", d.style.minHeight = "", d.firstChild.setAttribute("transform", "translate(" + k + "," +
          l + ")"))
      }
      mxUtils.removeCursors(b.body);
      return b
    },
    printScreen: function (a) {
      var b = window.open();
      a.getGraphBounds();
      mxUtils.show(a, b.document);
      a = function () {
        b.focus();
        b.print();
        b.close()
      };
      mxClient.IS_GC ? b.setTimeout(a, 500) : a()
    },
    popup: function (a, b) {
      debugger;
      if (b) {
        var c = document.createElement("div");
        c.style.overflow = "scroll";
        c.style.width = "636px";
        c.style.height = "460px";
        var d = document.createElement("pre");
        d.innerHTML = mxUtils.htmlEntities(a, !1).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
        c.appendChild(d);
        c = new mxWindow("Popup Window",
          c, document.body.clientWidth / 2 - 320, Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight) / 2 - 240, 640, 480, !1, !0);
        c.setClosable(!0);
        c.setVisible(!0)
      } else mxClient.IS_NS ? (c = window.open(), c.document.writeln("<pre>" + mxUtils.htmlEntities(a) + "</pre"), c.document.close()) : (c = window.open(), d = c.document.createElement("pre"), d.innerHTML = mxUtils.htmlEntities(a, !1).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;"), c.document.body.appendChild(d))
    },
    alert: function (a) {
      alert(a)
    },
    prompt: function (a, b) {
      return prompt(a,
        null != b ? b : "")
    },
    confirm: function (a) {
      return confirm(a)
    },
    error: function (a, b, c, d) {
      var e = document.createElement("div");
      e.style.padding = "20px";
      var f = document.createElement("img");
      f.setAttribute("src", d || mxUtils.errorImage);
      f.setAttribute("valign", "bottom");
      f.style.verticalAlign = "middle";
      e.appendChild(f);
      e.appendChild(document.createTextNode(" "));
      e.appendChild(document.createTextNode(" "));
      e.appendChild(document.createTextNode(" "));
      mxUtils.write(e, a);
      a = document.body.clientWidth;
      d = document.body.clientHeight ||
        document.documentElement.clientHeight;
      var g = new mxWindow(mxResources.get(mxUtils.errorResource) || mxUtils.errorResource, e, (a - b) / 2, d / 4, b, null, !1, !0);
      c && (mxUtils.br(e), b = document.createElement("p"), c = document.createElement("button"), mxClient.IS_IE ? c.style.cssText = "float:right" : c.setAttribute("style", "float:right"), mxEvent.addListener(c, "click", function (a) {
        g.destroy()
      }), mxUtils.write(c, mxResources.get(mxUtils.closeResource) || mxUtils.closeResource), b.appendChild(c), e.appendChild(b), mxUtils.br(e), g.setClosable(!0));
      g.setVisible(!0);
      return g
    },
    makeDraggable: function (a, b, c, d, e, f, g, k, l, m) {
      a = new mxDragSource(a, c);
      a.dragOffset = new mxPoint(null != e ? e : 0, null != f ? f : mxConstants.TOOLTIP_VERTICAL_OFFSET);
      a.autoscroll = g;
      a.setGuidesEnabled(!1);
      null != l && (a.highlightDropTargets = l);
      null != m && (a.getDropTarget = m);
      a.getGraphForEvent = function (a) {
        return "function" == typeof b ? b(a) : b
      };
      null != d && (a.createDragElement = function () {
        return d.cloneNode(!0)
      }, k && (a.createPreviewElement = function (a) {
        var b = d.cloneNode(!0), c = parseInt(b.style.width), e =
          parseInt(b.style.height);
        b.style.width = Math.round(c * a.view.scale) + "px";
        b.style.height = Math.round(e * a.view.scale) + "px";
        return b
      }));
      return a
    },

    //判断对象是否为空
    isObjEmpty: function(obj){
      if(obj.constructor === Object){
        for(let i in obj){
          return false;
        }
        return true;

      }else{
        throw '非object对象';
      }
    }
  };
  var mxDragSource = function (a, b) {
    this.element = a;
    this.dropHandler = b;
    mxEvent.addGestureListeners(a, mxUtils.bind(this, function (a) {
      this.mouseDown(a)
    }));
    mxEvent.addListener(a, "dragstart", function (a) {
      mxEvent.consume(a)
    });
    this.eventConsumer = function (a, b) {
      var c = b.getProperty("eventName"), d = b.getProperty("event");
      c != mxEvent.MOUSE_DOWN && d.consume()
    }
  };

  mxDragSource.prototype.element = null;
  mxDragSource.prototype.dropHandler = null;
  mxDragSource.prototype.dragOffset = null;
  mxDragSource.prototype.dragElement = null;
  mxDragSource.prototype.previewElement = null;
  mxDragSource.prototype.enabled = !0;
  mxDragSource.prototype.currentGraph = null;
  mxDragSource.prototype.currentDropTarget = null;
  mxDragSource.prototype.currentPoint = null;
  mxDragSource.prototype.currentGuide = null;
  mxDragSource.prototype.currentHighlight = null;
  mxDragSource.prototype.autoscroll = !0;
  mxDragSource.prototype.guidesEnabled = !0;
  mxDragSource.prototype.gridEnabled = !0;
  mxDragSource.prototype.highlightDropTargets = !0;
  mxDragSource.prototype.dragElementZIndex = 100;
  mxDragSource.prototype.dragElementOpacity = 70;
  mxDragSource.prototype.checkEventSource = !0;
  mxDragSource.prototype.isEnabled = function () {
    return this.enabled
  };
  mxDragSource.prototype.setEnabled = function (a) {
    this.enabled = a
  };
  mxDragSource.prototype.isGuidesEnabled = function () {
    return this.guidesEnabled
  };
  mxDragSource.prototype.setGuidesEnabled = function (a) {
    this.guidesEnabled = a
  };
  mxDragSource.prototype.isGridEnabled = function () {
    return this.gridEnabled
  };
  mxDragSource.prototype.setGridEnabled = function (a) {
    this.gridEnabled = a
  };
  mxDragSource.prototype.getGraphForEvent = function (a) {
    return null
  };
  mxDragSource.prototype.getDropTarget = function (a, b, c, d) {
    return a.getCellAt(b, c)
  };
  mxDragSource.prototype.createDragElement = function (a) {
    return this.element.cloneNode(!0)
  };
  mxDragSource.prototype.createPreviewElement = function (a) {
    return null
  };
  mxDragSource.prototype.isActive = function () {
    return null != this.mouseMoveHandler
  };
  mxDragSource.prototype.reset = function () {
    null != this.currentGraph && (this.dragExit(this.currentGraph), this.currentGraph = null);
    this.removeDragElement();
    this.removeListeners();
    this.stopDrag()
  };
  mxDragSource.prototype.mouseDown = function (a) {
    this.enabled && !mxEvent.isConsumed(a) && null == this.mouseMoveHandler && (this.startDrag(a), this.mouseMoveHandler = mxUtils.bind(this, this.mouseMove), this.mouseUpHandler = mxUtils.bind(this, this.mouseUp), mxEvent.addGestureListeners(document, null, this.mouseMoveHandler, this.mouseUpHandler), mxClient.IS_TOUCH && !mxEvent.isMouseEvent(a) && (this.eventSource = mxEvent.getSource(a), mxEvent.addGestureListeners(this.eventSource, null, this.mouseMoveHandler, this.mouseUpHandler)))
  };
  mxDragSource.prototype.startDrag = function (a) {
    this.dragElement = this.createDragElement(a);
    this.dragElement.style.position = "absolute";
    this.dragElement.style.zIndex = this.dragElementZIndex;
    mxUtils.setOpacity(this.dragElement, this.dragElementOpacity);
    this.checkEventSource && mxClient.IS_SVG && (this.dragElement.style.pointerEvents = "none")
  };
  mxDragSource.prototype.stopDrag = function () {
    this.removeDragElement()
  };
  mxDragSource.prototype.removeDragElement = function () {
    null != this.dragElement && (null != this.dragElement.parentNode && this.dragElement.parentNode.removeChild(this.dragElement), this.dragElement = null)
  };
  mxDragSource.prototype.getElementForEvent = function (a) {
    return mxEvent.isTouchEvent(a) || mxEvent.isPenEvent(a) ? document.elementFromPoint(mxEvent.getClientX(a), mxEvent.getClientY(a)) : mxEvent.getSource(a)
  };
  mxDragSource.prototype.graphContainsEvent = function (a, b) {
    var c = mxEvent.getClientX(b), d = mxEvent.getClientY(b), e = mxUtils.getOffset(a.container),
      f = mxUtils.getScrollOrigin(), g = this.getElementForEvent(b);
    if (this.checkEventSource) for (; null != g && g != a.container;) g = g.parentNode;
    return null != g && c >= e.x - f.x && d >= e.y - f.y && c <= e.x - f.x + a.container.offsetWidth && d <= e.y - f.y + a.container.offsetHeight
  };
  mxDragSource.prototype.mouseMove = function (a) {
    var b = this.getGraphForEvent(a);
    null == b || this.graphContainsEvent(b, a) || (b = null);
    b != this.currentGraph && (null != this.currentGraph && this.dragExit(this.currentGraph, a), this.currentGraph = b, null != this.currentGraph && this.dragEnter(this.currentGraph, a));
    null != this.currentGraph && this.dragOver(this.currentGraph, a);
    if (null == this.dragElement || null != this.previewElement && "visible" == this.previewElement.style.visibility) null != this.dragElement && (this.dragElement.style.visibility =
      "hidden"); else {
      var b = mxEvent.getClientX(a), c = mxEvent.getClientY(a);
      null == this.dragElement.parentNode && document.body.appendChild(this.dragElement);
      this.dragElement.style.visibility = "visible";
      null != this.dragOffset && (b += this.dragOffset.x, c += this.dragOffset.y);
      var d = mxUtils.getDocumentScrollOrigin(document);
      this.dragElement.style.left = b + d.x + "px";
      this.dragElement.style.top = c + d.y + "px"
    }
    mxEvent.consume(a)
  };
  mxDragSource.prototype.mouseUp = function (a) {
    if (null != this.currentGraph) {
      if (null != this.currentPoint && (null == this.previewElement || "hidden" != this.previewElement.style.visibility)) {
        var b = this.currentGraph.view.scale, c = this.currentGraph.view.translate;
        this.drop(this.currentGraph, a, this.currentDropTarget, this.currentPoint.x / b - c.x, this.currentPoint.y / b - c.y)
      }
      this.dragExit(this.currentGraph);
      this.currentGraph = null
    }
    this.stopDrag();
    this.removeListeners();
    mxEvent.consume(a)
  };
  mxDragSource.prototype.removeListeners = function () {
    null != this.eventSource && (mxEvent.removeGestureListeners(this.eventSource, null, this.mouseMoveHandler, this.mouseUpHandler), this.eventSource = null);
    mxEvent.removeGestureListeners(document, null, this.mouseMoveHandler, this.mouseUpHandler);
    this.mouseUpHandler = this.mouseMoveHandler = null
  };
  mxDragSource.prototype.dragEnter = function (a, b) {
    a.isMouseDown = !0;
    a.isMouseTrigger = mxEvent.isMouseEvent(b);
    this.previewElement = this.createPreviewElement(a);
    null != this.previewElement && this.checkEventSource && mxClient.IS_SVG && (this.previewElement.style.pointerEvents = "none");
    this.isGuidesEnabled() && null != this.previewElement && (this.currentGuide = new mxGuide(a, a.graphHandler.getGuideStates()));
    this.highlightDropTargets && (this.currentHighlight = new mxCellHighlight(a, mxConstants.DROP_TARGET_COLOR));
    a.addListener(mxEvent.FIRE_MOUSE_EVENT,
      this.eventConsumer)
  };
  mxDragSource.prototype.dragExit = function (a, b) {
    this.currentPoint = this.currentDropTarget = null;
    a.isMouseDown = !1;
    a.removeListener(this.eventConsumer);
    null != this.previewElement && (null != this.previewElement.parentNode && this.previewElement.parentNode.removeChild(this.previewElement), this.previewElement = null);
    null != this.currentGuide && (this.currentGuide.destroy(), this.currentGuide = null);
    null != this.currentHighlight && (this.currentHighlight.destroy(), this.currentHighlight = null)
  };
  mxDragSource.prototype.dragOver = function (a, b) {
    var c = mxUtils.getOffset(a.container), d = mxUtils.getScrollOrigin(a.container),
      e = mxEvent.getClientX(b) - c.x + d.x - a.panDx, c = mxEvent.getClientY(b) - c.y + d.y - a.panDy;
    a.autoScroll && (null == this.autoscroll || this.autoscroll) && a.scrollPointToVisible(e, c, a.autoExtend);
    null != this.currentHighlight && a.isDropEnabled() && (this.currentDropTarget = this.getDropTarget(a, e, c, b), d = a.getView().getState(this.currentDropTarget), this.currentHighlight.highlight(d));
    if (null != this.previewElement) {
      null ==
      this.previewElement.parentNode && (a.container.appendChild(this.previewElement), this.previewElement.style.zIndex = "3", this.previewElement.style.position = "absolute");
      var d = this.isGridEnabled() && a.isGridEnabledEvent(b), f = !0;
      if (null != this.currentGuide && this.currentGuide.isEnabledForEvent(b)) var f = parseInt(this.previewElement.style.width),
        g = parseInt(this.previewElement.style.height), f = new mxRectangle(0, 0, f, g), c = new mxPoint(e, c),
        c = this.currentGuide.move(f, c, d, !0), f = !1, e = c.x, c = c.y; else if (d) var d = a.view.scale,
        g = a.view.translate, k = a.gridSize / 2, e = (a.snap(e / d - g.x - k) + g.x) * d,
        c = (a.snap(c / d - g.y - k) + g.y) * d;
      null != this.currentGuide && f && this.currentGuide.hide();
      null != this.previewOffset && (e += this.previewOffset.x, c += this.previewOffset.y);
      this.previewElement.style.left = Math.round(e) + "px";
      this.previewElement.style.top = Math.round(c) + "px";
      this.previewElement.style.visibility = "visible"
    }
    this.currentPoint = new mxPoint(e, c)
  };
  mxDragSource.prototype.drop = function (a, b, c, d, e) {
    this.dropHandler.apply(this, arguments);
    "hidden" != a.container.style.visibility && a.container.focus()
  };

  var mxLog = {
    consoleName: "Console", TRACE: !1, DEBUG: !0, WARN: !0, buffer: "", init: function () {
      if (null == mxLog.window && null != document.body) {
        var a = mxLog.consoleName + " - mxGraph " + mxClient.VERSION, b = document.createElement("table");
        b.setAttribute("width", "100%");
        b.setAttribute("height", "100%");
        var c = document.createElement("tbody"), d = document.createElement("tr"), e = document.createElement("td");
        e.style.verticalAlign = "top";
        mxLog.textarea = document.createElement("textarea");
        mxLog.textarea.setAttribute("wrap", "off");
        mxLog.textarea.setAttribute("readOnly", "true");
        mxLog.textarea.style.height = "100%";
        mxLog.textarea.style.resize = "none";
        mxLog.textarea.value = mxLog.buffer;
        mxLog.textarea.style.width = mxClient.IS_NS && "BackCompat" != document.compatMode ? "99%" : "100%";
        e.appendChild(mxLog.textarea);
        d.appendChild(e);
        c.appendChild(d);
        d = document.createElement("tr");
        mxLog.td = document.createElement("td");
        mxLog.td.style.verticalAlign = "top";
        mxLog.td.setAttribute("height", "30px");
        d.appendChild(mxLog.td);
        c.appendChild(d);
        b.appendChild(c);
        mxLog.addButton("Info", function (a) {
          mxLog.info()
        });
        mxLog.addButton("DOM", function (a) {
          a = mxUtils.getInnerHtml(document.body);
          mxLog.debug(a)
        });
        mxLog.addButton("Trace", function (a) {
          mxLog.TRACE = !mxLog.TRACE;
          mxLog.TRACE ? mxLog.debug("Tracing enabled") : mxLog.debug("Tracing disabled")
        });
        mxLog.addButton("Copy", function (a) {
          try {
            mxUtils.copy(mxLog.textarea.value)
          } catch (k) {
            mxUtils.alert(k)
          }
        });
        mxLog.addButton("Show", function (a) {
          try {
            mxUtils.popup(mxLog.textarea.value)
          } catch (k) {
            mxUtils.alert(k)
          }
        });
        mxLog.addButton("Clear",
          function (a) {
            mxLog.textarea.value = ""
          });
        d = c = 0;
        "number" === typeof window.innerWidth ? (c = window.innerHeight, d = window.innerWidth) : (c = document.documentElement.clientHeight || document.body.clientHeight, d = document.body.clientWidth);
        mxLog.window = new mxWindow(a, b, Math.max(0, d - 320), Math.max(0, c - 210), 300, 160);
        mxLog.window.setMaximizable(!0);
        mxLog.window.setScrollable(!1);
        mxLog.window.setResizable(!0);
        mxLog.window.setClosable(!0);
        mxLog.window.destroyOnClose = !1;
        if ((mxClient.IS_NS || mxClient.IS_IE) && !mxClient.IS_GC &&
          !mxClient.IS_SF && "BackCompat" != document.compatMode || 11 == document.documentMode) {
          var f = mxLog.window.getElement(), a = function (a, b) {
            mxLog.textarea.style.height = Math.max(0, f.offsetHeight - 70) + "px"
          };
          mxLog.window.addListener(mxEvent.RESIZE_END, a);
          mxLog.window.addListener(mxEvent.MAXIMIZE, a);
          mxLog.window.addListener(mxEvent.NORMALIZE, a);
          mxLog.textarea.style.height = "92px"
        }
      }
    }, info: function () {
      mxLog.writeln(mxUtils.toString(navigator))
    }, addButton: function (a, b) {
      var c = document.createElement("button");
      mxUtils.write(c,
        a);
      mxEvent.addListener(c, "click", b);
      mxLog.td.appendChild(c)
    }, isVisible: function () {
      return null != mxLog.window ? mxLog.window.isVisible() : !1
    }, show: function () {
      mxLog.setVisible(!0)
    }, setVisible: function (a) {
      null == mxLog.window && mxLog.init();
      null != mxLog.window && mxLog.window.setVisible(a)
    }, enter: function (a) {
      if (mxLog.TRACE) return mxLog.writeln("Entering " + a), (new Date).getTime()
    }, leave: function (a, b) {
      if (mxLog.TRACE) {
        var c = 0 != b ? " (" + ((new Date).getTime() - b) + " ms)" : "";
        mxLog.writeln("Leaving " + a + c)
      }
    }, debug: function () {
      mxLog.DEBUG &&
      mxLog.writeln.apply(this, arguments)
    }, warn: function () {
      mxLog.WARN && mxLog.writeln.apply(this, arguments)
    }, write: function () {
      for (var a = "", b = 0; b < arguments.length; b++) a += arguments[b], b < arguments.length - 1 && (a += " ");
      null != mxLog.textarea ? (mxLog.textarea.value += a, null != navigator.userAgent && 0 <= navigator.userAgent.indexOf("Presto/2.5") && (mxLog.textarea.style.visibility = "hidden", mxLog.textarea.style.visibility = "visible"), mxLog.textarea.scrollTop = mxLog.textarea.scrollHeight) : mxLog.buffer += a
    }, writeln: function () {
      for (var a =
        "", b = 0; b < arguments.length; b++) a += arguments[b], b < arguments.length - 1 && (a += " ");
      mxLog.write(a + "\n")
    }
  };

  var defaultStyle2 = '<mxStylesheet><add as="defaultVertex"><add as="shape" value="label"/><add as="perimeter" value="rectanglePerimeter"/><add as="fontSize" value="12"/><add as="fontFamily" value="Helvetica"/><add as="align" value="center"/><add as="verticalAlign" value="middle"/><add as="fillColor" value="#ffffff"/><add as="strokeColor" value="#000000"/><add as="fontColor" value="#000000"/></add><add as="defaultEdge"><add as="shape" value="connector"/><add as="labelBackgroundColor" value="#ffffff"/><add as="endArrow" value="classic"/><add as="fontSize" value="11"/><add as="fontFamily" value="Helvetica"/><add as="align" value="center"/><add as="verticalAlign" value="middle"/><add as="rounded" value="1"/><add as="strokeColor" value="#000000"/><add as="fontColor" value="#000000"/></add><add as="text"><add as="fillColor" value="none"/><add as="gradientColor" value="none"/><add as="strokeColor" value="none"/><add as="align" value="left"/><add as="verticalAlign" value="top"/></add><add as="edgeLabel" extend="text"><add as="labelBackgroundColor" value="#ffffff"/><add as="fontSize" value="11"/></add><add as="label"><add as="fontStyle" value="1"/><add as="align" value="left"/><add as="verticalAlign" value="middle"/><add as="spacing" value="2"/><add as="spacingLeft" value="52"/><add as="imageWidth" value="42"/><add as="imageHeight" value="42"/><add as="rounded" value="1"/></add><add as="icon" extend="label"><add as="align" value="center"/><add as="imageAlign" value="center"/><add as="verticalLabelPosition" value="bottom"/><add as="verticalAlign" value="top"/><add as="spacingTop" value="4"/><add as="labelBackgroundColor" value="#ffffff"/><add as="spacing" value="0"/><add as="spacingLeft" value="0"/><add as="spacingTop" value="6"/><add as="fontStyle" value="0"/><add as="imageWidth" value="48"/><add as="imageHeight" value="48"/></add><add as="swimlane"><add as="shape" value="swimlane"/><add as="fontSize" value="12"/><add as="fontStyle" value="1"/><add as="startSize" value="23"/></add><add as="group"><add as="verticalAlign" value="top"/><add as="fillColor" value="none"/><add as="strokeColor" value="none"/><add as="gradientColor" value="none"/><add as="pointerEvents" value="0"/></add><add as="ellipse"><add as="shape" value="ellipse"/><add as="perimeter" value="ellipsePerimeter"/></add><add as="rhombus"><add as="shape" value="rhombus"/><add as="perimeter" value="rhombusPerimeter"/></add><add as="triangle"><add as="shape" value="triangle"/><add as="perimeter" value="trianglePerimeter"/></add><add as="line"><add as="shape" value="line"/><add as="strokeWidth" value="4"/><add as="labelBackgroundColor" value="#ffffff"/><add as="verticalAlign" value="top"/><add as="spacingTop" value="8"/></add><add as="image"><add as="shape" value="image"/><add as="labelBackgroundColor" value="white"/><add as="verticalAlign" value="top"/><add as="verticalLabelPosition" value="bottom"/></add><add as="roundImage" extend="image"><add as="perimeter" value="ellipsePerimeter"/></add><add as="rhombusImage" extend="image"><add as="perimeter" value="rhombusPerimeter"/></add><add as="arrow"><add as="shape" value="arrow"/><add as="edgeStyle" value="none"/><add as="fillColor" value="#ffffff"/></add><add as="fancy"><add as="shadow" value="1"/><add as="glass" value="1"/></add><add as="gray" extend="fancy"><add as="gradientColor" value="#B3B3B3"/><add as="fillColor" value="#F5F5F5"/><add as="strokeColor" value="#666666"/></add><add as="blue" extend="fancy"><add as="gradientColor" value="#7EA6E0"/><add as="fillColor" value="#DAE8FC"/><add as="strokeColor" value="#6C8EBF"/></add><add as="green" extend="fancy"><add as="gradientColor" value="#97D077"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#82B366"/></add><add as="turquoise" extend="fancy"><add as="gradientColor" value="#67AB9F"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#6A9153"/></add><add as="yellow" extend="fancy"><add as="gradientColor" value="#FFD966"/><add as="fillColor" value="#FFF2CC"/><add as="strokeColor" value="#D6B656"/></add><add as="orange" extend="fancy"><add as="gradientColor" value="#FFA500"/><add as="fillColor" value="#FFCD28"/><add as="strokeColor" value="#D79B00"/></add><add as="red" extend="fancy"><add as="gradientColor" value="#EA6B66"/><add as="fillColor" value="#F8CECC"/><add as="strokeColor" value="#B85450"/></add><add as="pink" extend="fancy"><add as="gradientColor" value="#B5739D"/><add as="fillColor" value="#E6D0DE"/><add as="strokeColor" value="#996185"/></add><add as="purple" extend="fancy"><add as="gradientColor" value="#8C6C9C"/><add as="fillColor" value="#E1D5E7"/><add as="strokeColor" value="#9673A6"/></add><add as="plain-gray"><add as="gradientColor" value="#B3B3B3"/><add as="fillColor" value="#F5F5F5"/><add as="strokeColor" value="#666666"/></add><add as="plain-blue"><add as="gradientColor" value="#7EA6E0"/><add as="fillColor" value="#DAE8FC"/><add as="strokeColor" value="#6C8EBF"/></add><add as="plain-green"><add as="gradientColor" value="#97D077"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#82B366"/></add><add as="plain-turquoise"><add as="gradientColor" value="#67AB9F"/><add as="fillColor" value="#D5E8D4"/><add as="strokeColor" value="#6A9153"/></add><add as="plain-yellow"><add as="gradientColor" value="#FFD966"/><add as="fillColor" value="#FFF2CC"/><add as="strokeColor" value="#D6B656"/></add><add as="plain-orange"><add as="gradientColor" value="#FFA500"/><add as="fillColor" value="#FFCD28"/><add as="strokeColor" value="#D79B00"/></add><add as="plain-red"><add as="gradientColor" value="#EA6B66"/><add as="fillColor" value="#F8CECC"/><add as="strokeColor" value="#B85450"/></add><add as="plain-pink"><add as="gradientColor" value="#B5739D"/><add as="fillColor" value="#E6D0DE"/><add as="strokeColor" value="#996185"/></add><add as="plain-purple"><add as="gradientColor" value="#8C6C9C"/><add as="fillColor" value="#E1D5E7"/><add as="strokeColor" value="#9673A6"/></add></mxStylesheet>';
  var darkTheme = '<mxStylesheet><add as="defaultVertex"><add as="shape" value="label"/><add as="perimeter" value="rectanglePerimeter"/><add as="fontSize" value="12"/><add as="fontFamily" value="Helvetica"/><add as="align" value="center"/><add as="verticalAlign" value="middle"/><add as="fillColor" value="#2a2a2a"/><add as="strokeColor" value="#f0f0f0"/><add as="fontColor" value="#f0f0f0"/></add><add as="defaultEdge"><add as="shape" value="connector"/><add as="labelBackgroundColor" value="#2a2a2a"/><add as="endArrow" value="classic"/><add as="fontSize" value="11"/><add as="fontFamily" value="Helvetica"/><add as="align" value="center"/><add as="verticalAlign" value="middle"/><add as="rounded" value="1"/><add as="strokeColor" value="#f0f0f0"/><add as="fontColor" value="#f0f0f0"/></add><add as="text"><add as="fillColor" value="none"/><add as="gradientColor" value="none"/><add as="strokeColor" value="none"/><add as="align" value="left"/><add as="verticalAlign" value="top"/></add><add as="edgeLabel" extend="text"><add as="labelBackgroundColor" value="#2a2a2a"/><add as="fontSize" value="11"/></add><add as="label"><add as="fontStyle" value="1"/><add as="align" value="left"/><add as="verticalAlign" value="middle"/><add as="spacing" value="2"/><add as="spacingLeft" value="52"/><add as="imageWidth" value="42"/><add as="imageHeight" value="42"/><add as="rounded" value="1"/></add><add as="icon" extend="label"><add as="align" value="center"/><add as="imageAlign" value="center"/><add as="verticalLabelPosition" value="bottom"/><add as="verticalAlign" value="top"/><add as="spacingTop" value="4"/><add as="labelBackgroundColor" value="#2a2a2a"/><add as="spacing" value="0"/><add as="spacingLeft" value="0"/><add as="spacingTop" value="6"/><add as="fontStyle" value="0"/><add as="imageWidth" value="48"/><add as="imageHeight" value="48"/></add><add as="swimlane"><add as="shape" value="swimlane"/><add as="fontSize" value="12"/><add as="fontStyle" value="1"/><add as="startSize" value="23"/></add><add as="group"><add as="verticalAlign" value="top"/><add as="fillColor" value="none"/><add as="strokeColor" value="none"/><add as="gradientColor" value="none"/><add as="pointerEvents" value="0"/></add><add as="ellipse"><add as="shape" value="ellipse"/><add as="perimeter" value="ellipsePerimeter"/></add><add as="rhombus"><add as="shape" value="rhombus"/><add as="perimeter" value="rhombusPerimeter"/></add><add as="triangle"><add as="shape" value="triangle"/><add as="perimeter" value="trianglePerimeter"/></add><add as="line"><add as="shape" value="line"/><add as="strokeWidth" value="4"/><add as="labelBackgroundColor" value="#2a2a2a"/><add as="verticalAlign" value="top"/><add as="spacingTop" value="8"/></add><add as="image"><add as="shape" value="image"/><add as="labelBackgroundColor" value="#2a2a2a"/><add as="verticalAlign" value="top"/><add as="verticalLabelPosition" value="bottom"/></add><add as="roundImage" extend="image"><add as="perimeter" value="ellipsePerimeter"/></add><add as="rhombusImage" extend="image"><add as="perimeter" value="rhombusPerimeter"/></add><add as="arrow"><add as="shape" value="arrow"/><add as="edgeStyle" value="none"/><add as="fillColor" value="#2a2a2a"/></add></mxStylesheet>';

  // 找到并区分页面上的全部节点。
  // 排除掉空节点，分别返回全部节点、并发节点
  var _findAllCells = function(scope){
    debugger;
    var all = scope.editor.graph.getModel().cells;// 全部的节点：包括2个初始默认节点。这2个节点是我不需要的，所以排除掉
    var result = {
      allNodes: [],// 除开空节点以外的全部节点
      bingfakaishi: [],
      bingfajieshu: []
    };
    for(var k in all){
      var oneMxCell = all[k];// 一个节点
      if(k != 0 && k != 1){
        result.allNodes.push({
          text: oneMxCell.value,
          value: k
        });
      }
      if(oneMxCell.value == '并发'){
        result.bingfakaishi.push({
          text: oneMxCell.value,
          value: k
        })
      }
      if (oneMxCell.value == '汇合') {
        result.bingfajieshu.push({
          text: oneMxCell.value,
          value: k
        })
      }
    }
    return result;
  };

  // 把这些变量放进window里，其他JS里要用
  window.mxClient = mxClient;
  window.mxResources = mxResources;
  window.mxEvent = mxEvent;
  window.mxUtils = mxUtils;
  window.mxLog = mxLog;
  window.mxDragSource = mxDragSource;
  window.mxXmlRequest = mxXmlRequest;
  window.defaultStyle2 = defaultStyle2;
  window.darkTheme = darkTheme;
  window._findAllCells = _findAllCells;
})();

