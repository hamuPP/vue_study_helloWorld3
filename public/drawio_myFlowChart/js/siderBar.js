/**
 * Created by tangyue on 20/4/29
 */

var mxClient = window.mxClient;
var STENCIL_PATH = window.STENCIL_PATH;

function Sidebar(a, c) {
  var mxClient = window.mxClient;
  var mxEvent = window.mxEvent;
  var mxUtils = window.mxUtils;

  this.editorUi = a;
  this.container = c;
  this.palettes = {};
  this.taglist = {};
  this.showTooltips = !0;
  this.graph = a.createTemporaryGraph(this.editorUi.editor.graph.getStylesheet());
  this.graph.cellRenderer.minSvgStrokeWidth = this.minThumbStrokeWidth;
  this.graph.cellRenderer.antiAlias = this.thumbAntiAlias;
  this.graph.container.style.visibility = "hidden";
  this.graph.foldingEnabled = !1;
  document.body.appendChild(this.graph.container);
  this.pointerUpHandler = mxUtils.bind(this, function () {
    this.showTooltips =
      !0
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? "pointerup" : "mouseup", this.pointerUpHandler);
  this.pointerDownHandler = mxUtils.bind(this, function () {
    this.showTooltips = !1;
    this.hideTooltip()
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? "pointerdown" : "mousedown", this.pointerDownHandler);
  this.pointerMoveHandler = mxUtils.bind(this, function (a) {
    for (a = mxEvent.getSource(a); null != a;) {
      if (a == this.currentElt) return;
      a = a.parentNode
    }
    this.hideTooltip()
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? "pointermove" :
    "mousemove", this.pointerMoveHandler);
  this.pointerOutHandler = mxUtils.bind(this, function (a) {
    null == a.toElement && null == a.relatedTarget && this.hideTooltip()
  });
  mxEvent.addListener(document, mxClient.IS_POINTER ? "pointerout" : "mouseout", this.pointerOutHandler);
  mxEvent.addListener(c, "scroll", mxUtils.bind(this, function () {
    this.showTooltips = !0;
    this.hideTooltip()
  }));

  this.init()
}

Sidebar.prototype.init = function () {
  var a = STENCIL_PATH;
  this.addSearchPalette(true);
  this.addGeneralPalette(true);
  // this.addMiscPalette(false);
  // this.addAdvancedPalette(false);
  // this.addBasicPalette(a);
  // this.addStencilPalette("arrows", mxResources.get("arrows"), a + "/arrows.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2");
  // this.addUmlPalette(!1);
  // // this.addBpmnPalette(a, !1);
  // this.addStencilPalette("flowchart", "Flowchart", a + "/flowchart.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2");
  // this.addImagePalette("clipart", mxResources.get("clipart"), a + "/clipart/", "_128x128.png", "Earth_globe Empty_Folder Full_Folder Gear Lock Software Virus Email Database Router_Icon iPad iMac Laptop MacBook Monitor_Tower Printer Server_Tower Workstation Firewall_02 Wireless_Router_N Credit_Card Piggy_Bank Graph Safe Shopping_Cart Suit1 Suit2 Suit3 Pilot1 Worker1 Soldier1 Doctor1 Tech1 Security1 Telesales1".split(" "), null, {
  //   Wireless_Router_N: "wireless router switch wap wifi access point wlan",
  //   Router_Icon: "router switch"
  // })
};

Sidebar.prototype.collapsedImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7" :
  IMAGE_PATH + "/collapsed.gif";


Sidebar.prototype.expandedImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7" : IMAGE_PATH +
  "/expanded.gif";
Sidebar.prototype.searchImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII=" : IMAGE_PATH +
  "/search.png";

Sidebar.prototype.dragPreviewBorder = "1px dashed black";
Sidebar.prototype.enableTooltips = !0;
Sidebar.prototype.tooltipBorder = 16;
Sidebar.prototype.tooltipDelay = 300;
Sidebar.prototype.dropTargetDelay = 200;
Sidebar.prototype.gearImage = STENCIL_PATH + "/clipart/Gear_128x128.png";
Sidebar.prototype.thumbWidth = 42;
Sidebar.prototype.thumbHeight = 42;
Sidebar.prototype.minThumbStrokeWidth = 1;
Sidebar.prototype.thumbAntiAlias = !1;
Sidebar.prototype.thumbPadding = 5 <= document.documentMode ? 2 : 3;
Sidebar.prototype.thumbBorder = 2;
// urlParams是挂在window的变量
"large" != urlParams["sidebar-entries"] && (Sidebar.prototype.thumbPadding = 5 <= document.documentMode ? 0 : 1, Sidebar.prototype.thumbBorder = 1, Sidebar.prototype.thumbWidth = 32, Sidebar.prototype.thumbHeight = 30, Sidebar.prototype.minThumbStrokeWidth = 1.3, Sidebar.prototype.thumbAntiAlias = !0);
Sidebar.prototype.sidebarTitleSize = 9;
Sidebar.prototype.sidebarTitles = !1;
Sidebar.prototype.tooltipTitles = !0;
Sidebar.prototype.maxTooltipWidth = 400;
Sidebar.prototype.maxTooltipHeight = 400;
Sidebar.prototype.addStencilsToIndex = !0;
Sidebar.prototype.defaultImageWidth = 80;
Sidebar.prototype.defaultImageHeight = 80;
Sidebar.prototype.getTooltipOffset = function () {
  return new mxPoint(0, 0)
};
Sidebar.prototype.showTooltip = function (a, c, d, b, f, e) {
  if (this.enableTooltips && this.showTooltips && this.currentElt != a) {
    null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
    var h = mxUtils.bind(this, function () {
      null == this.tooltip && (this.tooltip = document.createElement("div"), this.tooltip.className = "geSidebarTooltip", this.tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1, document.body.appendChild(this.tooltip), this.graph2 = new Graph(this.tooltip, null, null, this.editorUi.editor.graph.getStylesheet()),
        this.graph2.resetViewOnRootChange = !1, this.graph2.foldingEnabled = !1, this.graph2.gridEnabled = !1, this.graph2.autoScroll = !1, this.graph2.setTooltips(!1), this.graph2.setConnectable(!1), this.graph2.setEnabled(!1), mxClient.IS_SVG || (this.graph2.view.canvas.style.position = "relative"));
      this.graph2.model.clear();
      this.graph2.view.setTranslate(this.tooltipBorder, this.tooltipBorder);
      this.graph2.view.scale = d > this.maxTooltipWidth || b > this.maxTooltipHeight ? Math.round(100 * Math.min(this.maxTooltipWidth / d, this.maxTooltipHeight /
        b)) / 100 : 1;
      this.tooltip.style.display = "block";
      this.graph2.labelsVisible = null == e || e;
      var g = mxClient.NO_FO;
      mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
      this.graph2.addCells(c);
      mxClient.NO_FO = g;
      var h = this.graph2.getGraphBounds(), l = h.width + 2 * this.tooltipBorder + 4,
        g = h.height + 2 * this.tooltipBorder;
      mxClient.IS_QUIRKS ? (g += 4, this.tooltip.style.overflow = "hidden") : this.tooltip.style.overflow = "visible";
      this.tooltip.style.width = l + "px";
      var m = l;
      if (this.tooltipTitles && null != f && 0 < f.length) {
        null == this.tooltipTitle ?
          (this.tooltipTitle = document.createElement("div"), this.tooltipTitle.style.borderTop = "1px solid gray", this.tooltipTitle.style.textAlign = "center", this.tooltipTitle.style.width = "100%", this.tooltipTitle.style.overflow = "hidden", this.tooltipTitle.style.position = "absolute", this.tooltipTitle.style.paddingTop = "6px", this.tooltipTitle.style.bottom = "6px", this.tooltip.appendChild(this.tooltipTitle)) : this.tooltipTitle.innerHTML = "";
        this.tooltipTitle.style.display = "";
        mxUtils.write(this.tooltipTitle, f);
        var m = Math.min(this.maxTooltipWidth,
          Math.max(l, this.tooltipTitle.scrollWidth + 4)), n = this.tooltipTitle.offsetHeight + 10, g = g + n;
        mxClient.IS_SVG ? this.tooltipTitle.style.marginTop = 2 - n + "px" : (g -= 6, this.tooltipTitle.style.top = g - n + "px")
      } else null != this.tooltipTitle && null != this.tooltipTitle.parentNode && (this.tooltipTitle.style.display = "none");
      m > l && (this.tooltip.style.width = m + "px");
      this.tooltip.style.height = g + "px";
      var l = -Math.round(h.x - this.tooltipBorder) + (m > l ? (m - l) / 2 : 0),
        h = -Math.round(h.y - this.tooltipBorder), n = document.body, p = document.documentElement,
        q = this.getTooltipOffset(),
        m = this.container.clientWidth + this.editorUi.splitSize + 3 + this.editorUi.container.offsetLeft + q.x,
        g = Math.min(Math.max(n.clientHeight || 0, p.clientHeight) - g - 20, Math.max(0, this.editorUi.container.offsetTop + this.container.offsetTop + a.offsetTop - this.container.scrollTop - g / 2 + 16)) + q.y;
      mxClient.IS_SVG ? 0 != l || 0 != h ? this.graph2.view.canvas.setAttribute("transform", "translate(" + l + "," + h + ")") : this.graph2.view.canvas.removeAttribute("transform") : (this.graph2.view.drawPane.style.left = l + "px", this.graph2.view.drawPane.style.top =
        h + "px");
      this.tooltip.style.position = "absolute";
      this.tooltip.style.left = m + "px";
      this.tooltip.style.top = g + "px"
    });
    null != this.tooltip && "none" != this.tooltip.style.display ? h() : this.thread = window.setTimeout(h, this.tooltipDelay);
    this.currentElt = a
  }
};
Sidebar.prototype.hideTooltip = function () {
  null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
  null != this.tooltip && (this.tooltip.style.display = "none", this.currentElt = null)
};
Sidebar.prototype.addDataEntry = function (a, c, d, b, f) {
  return this.addEntry(a, mxUtils.bind(this, function () {
    return this.createVertexTemplateFromData(f, c, d, b)
  }))
};
Sidebar.prototype.addEntries = function (a) {
  for (var c = 0; c < a.length; c++) mxUtils.bind(this, function (a) {
    var b = a.data, c = null != a.title ? a.title : "";
    null != a.tags && (c += " " + a.tags);
    null != b && 0 < c.length ? this.addEntry(c, mxUtils.bind(this, function () {
      b = this.editorUi.convertDataUri(b);
      var c = "shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;";
      "fixed" == a.aspect && (c += "aspect=fixed;");
      return this.createVertexTemplate(c + "image=" + b, a.w, a.h, "", a.title || "", !1, !1, !0)
    })) : null != a.xml && 0 < c.length && this.addEntry(c,
      mxUtils.bind(this, function () {
        var b = this.editorUi.stringToCells(Graph.decompress(a.xml));
        return this.createVertexTemplateFromCells(b, a.w, a.h, a.title || "", !0, !1, !0)
      }))
  })(a[c])
};
Sidebar.prototype.addEntry = function (a, c) {
  console.log(a)
  if (null != this.taglist && null != a && 0 < a.length) for (var d = a.toLowerCase().replace(/[\/\,\(\)]/g, " ").split(" "), b = mxUtils.bind(this, function (a) {
    if (null != a && 1 < a.length) {
      var b = this.taglist[a];
      "object" !== typeof b && (b = {entries: [], dict: new mxDictionary}, this.taglist[a] = b);
      null == b.dict.get(c) && (b.dict.put(c, c), b.entries.push(c))
    }
  }), f = 0; f < d.length; f++) {
    b(d[f]);
    var e = d[f].replace(/\.*\d*$/, "");
    e != d[f] && b(e)
  }
  return c
};
Sidebar.prototype.searchEntries = function (a, c, d, b, f) {
  if (null != this.taglist && null != a) {
    var e = a.toLowerCase().split(" ");
    f = new mxDictionary;
    var h = (d + 1) * c;
    a = [];
    for (var g = 0, k = 0; k < e.length; k++) if (0 < e[k].length) {
      var l = this.taglist[e[k]], m = new mxDictionary;
      if (null != l) {
        var n = l.entries;
        a = [];
        for (var p = 0; p < n.length; p++) if (l = n[p], 0 == g == (null == f.get(l)) && (m.put(l, l), a.push(l), k == e.length - 1 && a.length == h)) {
          b(a.slice(d * c, h), h, !0, e);
          return
        }
      } else a = [];
      f = m;
      g++
    }
    f = a.length;
    b(a.slice(d * c, (d + 1) * c), f, !1, e)
  } else b([], null,
    null, e)
};
Sidebar.prototype.filterTags = function (a) {
  if (null != a) {
    a = a.split(" ");
    for (var c = [], d = {}, b = 0; b < a.length; b++) null == d[a[b]] && (d[a[b]] = "1", c.push(a[b]));
    return c.join(" ")
  }
  return null
};
Sidebar.prototype.cloneCell = function (a, c) {
  var d = a.clone();
  null != c && (d.value = c);
  return d
};
Sidebar.prototype.addSearchPalette = function (a) {
  var c = document.createElement("div");
  c.style.visibility = "hidden";
  this.container.appendChild(c);
  var d = document.createElement("div");
  d.className = "geSidebar sidebar-searchbox";
  a || (d.style.display = "none");
  var b = document.createElement("div");
  b.className = 'sidebar-inputbox';
  var f = document.createElement("input");
  f.className = 'inputbox-inner-input';
  f.setAttribute("placeholder", mxResources.get("searchShapes"));
  f.setAttribute("type", "text");
  b.appendChild(f);
  var e = document.createElement("img");
  e.setAttribute("src", Sidebar.prototype.searchImage);
  e.setAttribute("title", mxResources.get("search"));
  e.style.position = "relative";
  e.style.left = "-18px";
  mxClient.IS_QUIRKS ? (f.style.height = "28px", e.style.top = "-4px") : e.style.top = "1px";
  e.style.background = "url('" + this.editorUi.editor.transparentImage + "')";
  var h;
  b.appendChild(e);
  d.appendChild(b);
  var g = document.createElement("center"),
    k = mxUtils.button(mxResources.get("moreResults"), function () {
      h()
    });
  k.style.display = "none";
  k.style.lineHeight = "normal";
  k.style.marginTop = "4px";
  k.style.marginBottom = "8px";
  g.style.paddingTop = "4px";
  g.style.paddingBottom =
    "4px";
  g.appendChild(k);
  d.appendChild(g);
  var l = "", m = !1, n = !1, p = 0, q = {}, v = 12, u = mxUtils.bind(this, function () {
    m = !1;
    this.currentSearch = null;
    for (var a = d.firstChild; null != a;) {
      var c = a.nextSibling;
      a != b && a != g && a.parentNode.removeChild(a);
      a = c
    }
  });
  mxEvent.addListener(e, "click", function () {
    e.getAttribute("src") == Dialog.prototype.closeImage && (e.setAttribute("src", Sidebar.prototype.searchImage), e.setAttribute("title", mxResources.get("search")), k.style.display = "none", l = f.value = "", u());
    f.focus()
  });
  h = mxUtils.bind(this,
    function () {
      v = 4 * Math.max(1, Math.floor(this.container.clientWidth / (this.thumbWidth + 10)));
      this.hideTooltip();
      if (f.value) {
        if (null != g.parentNode && (l != f.value && (u(), l = f.value, q = {}, n = !1, p = 0), !m && !n)) {
          k.setAttribute("disabled", "true");
          k.style.display = "";
          k.style.cursor = "wait";
          k.innerHTML = mxResources.get("loading") + "...";
          m = !0;
          var a = {};
          this.currentSearch = a;
          this.searchEntries(l, v, p, mxUtils.bind(this, function (b, c, e, f) {
            if (this.currentSearch == a) {
              b = null != b ? b : [];
              m = !1;
              p++;
              this.insertSearchHint(d, l, v, p, b, c, e, f);
              0 == b.length && 1 == p && (l = "");
              null != g.parentNode && g.parentNode.removeChild(g);
              for (c = 0; c < b.length; c++) try {
                var h = b[c]();
                null == q[h.innerHTML] && (q[h.innerHTML] = "1", d.appendChild(h))
              } catch (B) {
              }
              e ? (k.removeAttribute("disabled"), k.innerHTML = mxResources.get("moreResults")) : (k.innerHTML = mxResources.get("reset"), k.style.display = "none", n = !0);
              k.style.cursor = "";
              d.appendChild(g)
            }
          }), mxUtils.bind(this, function () {
            k.style.cursor = ""
          }))
        }
      } else u(), l = f.value = "", q = {}, k.style.display = "none", n = !1, f.focus()
    });
  mxEvent.addListener(f,
    "keydown", mxUtils.bind(this, function (a) {
      if (13 == a.keyCode) {
        h(), mxEvent.consume(a)
      }
    }));
  mxEvent.addListener(f, "keyup", mxUtils.bind(this, function (a) {
    "" == f.value ? (e.setAttribute("src", Sidebar.prototype.searchImage), e.setAttribute("title", mxResources.get("search"))) : (e.setAttribute("src", Dialog.prototype.closeImage), e.setAttribute("title", mxResources.get("reset")));
    "" == f.value ? (n = !0, k.style.display = "none") : f.value != l ? (k.style.display = "none", n = !1) : m || (k.style.display = n ? "none" : "")
  }));
  mxEvent.addListener(f,
    "mousedown", function (a) {
      a.stopPropagation && a.stopPropagation();
      a.cancelBubble = !0
    });
  mxEvent.addListener(f, "selectstart", function (a) {
    a.stopPropagation && a.stopPropagation();
    a.cancelBubble = !0
  });
  a = document.createElement("div");
  a.appendChild(d);
  this.container.appendChild(a);
  this.palettes.search = [c, a]
};
Sidebar.prototype.insertSearchHint = function (a, c, d, b, f, e, h, g) {
  0 == f.length && 1 == b && (d = document.createElement("div"), d.className = "geTitle", d.style.cssText = "background-color:transparent;border-color:transparent;color:gray;padding:6px 0px 0px 0px !important;margin:4px 8px 4px 8px;text-align:center;cursor:default !important", mxUtils.write(d, mxResources.get("noResultsFor", [c])), a.appendChild(d))
};
// 左侧栏的general
Sidebar.prototype.addGeneralPalette = function (a) {
  var testImgArr = [
    {name: '开始', src: 'images/iconImg/ic_lc1.png'},
    {name: '并发', src: 'images/iconImg/ic_lc2.png'},
    {name: '汇合', src: 'images/iconImg/ic_lc3.png'},
    {name: '任务', src: 'images/iconImg/ic_lc4.png'},
    {name: '汇发', src: 'images/iconImg/ic_lc5.png'},
    {name: '结束', src: 'images/iconImg/ic_lc6.png'}
  ];
  var c = [
    this.createShapeToolItem("whiteSpace=wrap;html=1;aspect=fixed;", 40, 40, "", "Square", null, null),
    this.createShapeToolItem("ellipse;whiteSpace=wrap;html=1;aspect=fixed;", 40, 40, "", "Circle", null, null),
    this.createShapeToolItem("rhombus;whiteSpace=wrap;html=1;", 40, 40, "", "Diamond", null, null),
    this.createShapeToolItem("rhombus;whiteSpace=wrap;html=1;", 40, 40, "", "Diamond", null, null)
  ];
  for (var i = 0, len = testImgArr.length; i < len; i++) {
    var _childImg = testImgArr[i];
    c.push(this.createShapeToolItem("image;html=1;labelBackgroundColor=#ffffff;image=" + _childImg.src, 40, 40, '' , _childImg.name, true, null, _childImg.name)
    )
  }
  this.addPaletteFunctions("general", mxResources.get("general"), null != a ? a : !0, c)
};
Sidebar.prototype.addBasicPalette = function (a) {
  this.addStencilPalette("basic", mxResources.get("basic"), a + "/basic.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2", null, null, null, null, [this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;", 120, 60,
    "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;", 120, 60, "", "Partial Rectangle")])
};
Sidebar.prototype.addMiscPalette = function (a) {
  var c = this,
    d = [this.createVertexTemplateEntry("text;strokeColor=none;fillColor=none;html=1;fontSize=24;fontStyle=1;verticalAlign=middle;align=center;", 100, 40, "Title", "Title", null, null, "text heading title"), this.createVertexTemplateEntry("text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;", 100, 80, "<ul><li>Value 1</li><li>Value 2</li><li>Value 3</li></ul>", "Unordered List"), this.createVertexTemplateEntry("text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;",
      100, 80, "<ol><li>Value 1</li><li>Value 2</li><li>Value 3</li></ol>", "Ordered List"), this.createVertexTemplateEntry("text;html=1;strokeColor=#c0c0c0;fillColor=#ffffff;overflow=fill;rounded=0;", 280, 160, '<table border="1" width="100%" height="100%" cellpadding="4" style="width:100%;height:100%;border-collapse:collapse;"><tr style="background-color:#A7C942;color:#ffffff;border:1px solid #98bf21;"><th align="left">Title 1</th><th align="left">Title 2</th><th align="left">Title 3</th></tr><tr style="border:1px solid #98bf21;"><td>Value 1</td><td>Value 2</td><td>Value 3</td></tr><tr style="background-color:#EAF2D3;border:1px solid #98bf21;"><td>Value 4</td><td>Value 5</td><td>Value 6</td></tr><tr style="border:1px solid #98bf21;"><td>Value 7</td><td>Value 8</td><td>Value 9</td></tr><tr style="background-color:#EAF2D3;border:1px solid #98bf21;"><td>Value 10</td><td>Value 11</td><td>Value 12</td></tr></table>',
      "Table 1"), this.createVertexTemplateEntry("text;html=1;strokeColor=#c0c0c0;fillColor=none;overflow=fill;", 180, 140, '<table border="0" width="100%" height="100%" style="width:100%;height:100%;border-collapse:collapse;"><tr><td align="center">Value 1</td><td align="center">Value 2</td><td align="center">Value 3</td></tr><tr><td align="center">Value 4</td><td align="center">Value 5</td><td align="center">Value 6</td></tr><tr><td align="center">Value 7</td><td align="center">Value 8</td><td align="center">Value 9</td></tr></table>',
      "Table 2"), this.createVertexTemplateEntry("text;html=1;strokeColor=none;fillColor=none;overflow=fill;", 180, 140, '<table border="1" width="100%" height="100%" style="width:100%;height:100%;border-collapse:collapse;"><tr><td align="center">Value 1</td><td align="center">Value 2</td><td align="center">Value 3</td></tr><tr><td align="center">Value 4</td><td align="center">Value 5</td><td align="center">Value 6</td></tr><tr><td align="center">Value 7</td><td align="center">Value 8</td><td align="center">Value 9</td></tr></table>',
      "Table 3"), this.createVertexTemplateEntry("text;html=1;strokeColor=none;fillColor=none;overflow=fill;", 160, 140, '<table border="1" width="100%" height="100%" cellpadding="4" style="width:100%;height:100%;border-collapse:collapse;"><tr><th align="center"><b>Title</b></th></tr><tr><td align="center">Section 1.1\nSection 1.2\nSection 1.3</td></tr><tr><td align="center">Section 2.1\nSection 2.2\nSection 2.3</td></tr></table>', "Table 4"), this.addEntry("link hyperlink", mxUtils.bind(this, function () {
      var a =
        new mxCell("Link", new mxGeometry(0, 0, 60, 40), "text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0000EE;fontStyle=4;");
      a.vertex = !0;
      this.graph.setLinkForCell(a, "https://www.draw.io");
      return this.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Link")
    })), this.addEntry("timestamp date time text label", mxUtils.bind(this, function () {
      var a = new mxCell("%date{ddd mmm dd yyyy HH:MM:ss}%", new mxGeometry(0, 0, 160, 20), "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;");
      a.vertex = !0;
      this.graph.setAttributeForCell(a, "placeholders", "1");
      return this.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Timestamp")
    })), this.addEntry("variable placeholder metadata hello world text label", mxUtils.bind(this, function () {
      var a = new mxCell("%name% Text", new mxGeometry(0, 0, 80, 20), "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;");
      a.vertex = !0;
      this.graph.setAttributeForCell(a, "placeholders", "1");
      this.graph.setAttributeForCell(a,
        "name", "Variable");
      return this.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Variable")
    })), this.createVertexTemplateEntry("shape=ext;double=1;rounded=0;whiteSpace=wrap;html=1;", 120, 80, "", "Double Rectangle", null, null, "rect rectangle box double"), this.createVertexTemplateEntry("shape=ext;double=1;rounded=1;whiteSpace=wrap;html=1;", 120, 80, "", "Double Rounded Rectangle", null, null, "rounded rect rectangle box double"), this.createVertexTemplateEntry("ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;",
      100, 60, "", "Double Ellipse", null, null, "oval ellipse start end state double"), this.createVertexTemplateEntry("shape=ext;double=1;whiteSpace=wrap;html=1;aspect=fixed;", 80, 80, "", "Double Square", null, null, "double square"), this.createVertexTemplateEntry("ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;aspect=fixed;", 80, 80, "", "Double Circle", null, null, "double circle"), this.createEdgeTemplateEntry("rounded=0;comic=1;strokeWidth=2;endArrow=blockThin;html=1;fontFamily=Comic Sans MS;fontStyle=1;", 50, 50, "",
      "Comic Arrow"), this.createVertexTemplateEntry("html=1;whiteSpace=wrap;comic=1;strokeWidth=2;fontFamily=Comic Sans MS;fontStyle=1;", 120, 60, "RECTANGLE", "Comic Rectangle", !0, null, "comic rectangle rect box text retro"), this.createVertexTemplateEntry("rhombus;html=1;align=center;whiteSpace=wrap;comic=1;strokeWidth=2;fontFamily=Comic Sans MS;fontStyle=1;", 100, 100, "DIAMOND", "Comic Diamond", !0, null, "comic diamond rhombus if condition decision conditional question test retro"), this.createVertexTemplateEntry("html=1;whiteSpace=wrap;aspect=fixed;shape=isoRectangle;",
      150, 90, "", "Isometric Square", !0, null, "rectangle rect box iso isometric"), this.createVertexTemplateEntry("html=1;whiteSpace=wrap;aspect=fixed;shape=isoCube;backgroundOutline=1;", 90, 100, "", "Isometric Cube", !0, null, "cube box iso isometric"), this.createEdgeTemplateEntry("edgeStyle=isometricEdgeStyle;endArrow=none;html=1;", 50, 100, "", "Isometric Edge 1"), this.createEdgeTemplateEntry("edgeStyle=isometricEdgeStyle;endArrow=none;html=1;elbow=vertical;", 50, 100, "", "Isometric Edge 2"), this.createVertexTemplateEntry("shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;",
      20, 120, "", "Curly Bracket"), this.createVertexTemplateEntry("line;strokeWidth=2;html=1;", 160, 10, "", "Horizontal Line"), this.createVertexTemplateEntry("line;strokeWidth=2;direction=south;html=1;", 10, 160, "", "Vertical Line"), this.createVertexTemplateEntry("line;strokeWidth=4;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;", 160, 10, "", "Horizontal Backbone", !1, null, "backbone bus network"), this.createVertexTemplateEntry("line;strokeWidth=4;direction=south;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;",
      10, 160, "", "Vertical Backbone", !1, null, "backbone bus network"), this.createVertexTemplateEntry("shape=crossbar;whiteSpace=wrap;html=1;rounded=1;", 120, 20, "", "Crossbar", !1, null, "crossbar distance measure dimension unit"), this.createVertexTemplateEntry("shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;imageAspect=1;aspect=fixed;image=" + this.gearImage, 52, 61, "", "Image (Fixed Aspect)", !1, null, "fixed image icon symbol"), this.createVertexTemplateEntry("shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;imageAspect=0;image=" +
      this.gearImage, 50, 60, "", "Image (Variable Aspect)", !1, null, "strechted image icon symbol"), this.createVertexTemplateEntry("icon;html=1;image=" + this.gearImage, 60, 60, "Icon", "Icon", !1, null, "icon image symbol"), this.createVertexTemplateEntry("label;whiteSpace=wrap;html=1;image=" + this.gearImage, 140, 60, "Label", "Label 1", null, null, "label image icon symbol"), this.createVertexTemplateEntry("label;whiteSpace=wrap;html=1;align=center;verticalAlign=bottom;spacingLeft=0;spacingBottom=4;imageAlign=center;imageVerticalAlign=top;image=" +
      this.gearImage, 120, 80, "Label", "Label 2", null, null, "label image icon symbol"), this.addEntry("shape group container", function () {
      var a = new mxCell("Label", new mxGeometry(0, 0, 160, 70), "html=1;whiteSpace=wrap;container=1;recursiveResize=0;collapsible=0;");
      a.vertex = !0;
      var d = new mxCell("", new mxGeometry(20, 20, 20, 30), "triangle;html=1;whiteSpace=wrap;");
      d.vertex = !0;
      a.insert(d);
      return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Shape Group")
    }), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=none;",
      120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=1;right=1;left=1;top=0;fillColor=none;routingCenterX=-0.5;", 120, 60, "", "Partial Rectangle"), this.createEdgeTemplateEntry("edgeStyle=segmentEdgeStyle;endArrow=classic;html=1;", 50, 50, "", "Manual Line", null, "line lines connector connectors connection connections arrow arrows manual"), this.createEdgeTemplateEntry("shape=filledEdge;rounded=0;fixDash=1;endArrow=none;strokeWidth=10;fillColor=#ffffff;edgeStyle=orthogonalEdgeStyle;",
      60, 40, "", "Filled Edge"), this.createEdgeTemplateEntry("edgeStyle=elbowEdgeStyle;elbow=horizontal;endArrow=classic;html=1;", 50, 50, "", "Horizontal Elbow", null, "line lines connector connectors connection connections arrow arrows elbow horizontal"), this.createEdgeTemplateEntry("edgeStyle=elbowEdgeStyle;elbow=vertical;endArrow=classic;html=1;", 50, 50, "", "Vertical Elbow", null, "line lines connector connectors connection connections arrow arrows elbow vertical")];

  this.addPaletteFunctions("misc", mxResources.get("misc"),
    null != a ? a : !0, d)
};
Sidebar.prototype.addAdvancedPalette = function (a) {
  this.addPaletteFunctions("advanced", mxResources.get("advanced"), null != a ? a : !1, this.createAdvancedShapes())
};
Sidebar.prototype.createAdvancedShapes = function () {
  var a = this,
    c = new mxCell("List Item", new mxGeometry(0, 0, 60, 26), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;");
  c.vertex = !0;
  return [this.createVertexTemplateEntry("shape=tapeData;whiteSpace=wrap;html=1;perimeter=ellipsePerimeter;", 80, 80, "", "Tape Data"),
    this.createVertexTemplateEntry("shape=manualInput;whiteSpace=wrap;html=1;", 80, 80, "", "Manual Input"),
    this.createVertexTemplateEntry("shape=loopLimit;whiteSpace=wrap;html=1;", 100, 80, "", "Loop Limit"),
    this.createVertexTemplateEntry("shape=offPageConnector;whiteSpace=wrap;html=1;", 80, 80, "", "Off Page Connector"),
    this.createVertexTemplateEntry("shape=delay;whiteSpace=wrap;html=1;", 80, 40, "", "Delay"),
    this.createVertexTemplateEntry("shape=display;whiteSpace=wrap;html=1;", 80, 40, "", "Display"),
    this.createVertexTemplateEntry("shape=singleArrow;direction=west;whiteSpace=wrap;html=1;", 100, 60, "", "Arrow Left"),
    this.createVertexTemplateEntry("shape=singleArrow;whiteSpace=wrap;html=1;", 100, 60, "", "Arrow Right"),
    this.createVertexTemplateEntry("shape=singleArrow;direction=north;whiteSpace=wrap;html=1;", 60, 100, "", "Arrow Up"),
    this.createVertexTemplateEntry("shape=singleArrow;direction=south;whiteSpace=wrap;html=1;", 60, 100, "", "Arrow Down"),
    this.createVertexTemplateEntry("shape=doubleArrow;whiteSpace=wrap;html=1;", 100, 60, "", "Double Arrow"),
    this.createVertexTemplateEntry("shape=doubleArrow;direction=south;whiteSpace=wrap;html=1;", 60, 100, "", "Double Arrow Vertical", null, null, "double arrow"),
    this.createVertexTemplateEntry("shape=actor;whiteSpace=wrap;html=1;", 40, 60, "", "User", null, null, "user person human"),
    this.createVertexTemplateEntry("shape=cross;whiteSpace=wrap;html=1;", 80, 80, "", "Cross"),
    this.createVertexTemplateEntry("shape=corner;whiteSpace=wrap;html=1;", 80, 80, "", "Corner"),
    this.createVertexTemplateEntry("shape=tee;whiteSpace=wrap;html=1;", 80, 80, "", "Tee"),
    this.createVertexTemplateEntry("shape=datastore;whiteSpace=wrap;html=1;", 60, 60, "", "Data Store", null, null, "data store cylinder database"),
    this.createVertexTemplateEntry("shape=orEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Or", null, null, "or circle oval ellipse"),
    this.createVertexTemplateEntry("shape=sumEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Sum", null, null, "sum circle oval ellipse"),
    this.createVertexTemplateEntry("shape=lineEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Ellipse with horizontal divider", null, null, "circle oval ellipse"),
    this.createVertexTemplateEntry("shape=lineEllipse;line=vertical;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Ellipse with vertical divider", null, null, "circle oval ellipse"),
    this.createVertexTemplateEntry("shape=sortShape;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;", 80, 80, "", "Sort", null, null, "sort"),
    this.createVertexTemplateEntry("shape=collate;whiteSpace=wrap;html=1;", 80, 80, "", "Collate", null, null, "collate"),
    this.createVertexTemplateEntry("shape=switch;whiteSpace=wrap;html=1;", 60, 60, "", "Switch", null, null, "switch router"),
    this.addEntry("process bar", function () {
      return a.createVertexTemplateFromData("zZXRaoMwFIafJpcDjbNrb2233rRQ8AkyPdPQaCRJV+3T7yTG2rUVBoOtgpDzn/xJzncCIdGyateKNeVW5iBI9EqipZLS9KOqXYIQhAY8J9GKUBrgT+jbRDZ02aBhCmrzEwPtDZ9MHKBXdkpmoDWKCVN9VptO+Kw+8kqwGqMkK7nIN6yTB7uTNizbD1FSSsVPsjYMC1qFKHxwIZZSSIVxLZ1/nJNar5+oQPMT7IYCrqUta1ENzuqGaeOFTArBGs3f3Vmtoo2Se7ja1h00kSoHK4bBIKUNy3hdoPYU0mF91i9mT8EEL2ocZ3gKa00ayWujLZY4IfHKFonVDLsRGgXuQ90zBmWgneyTk3yT1iArMKrDKUeem9L3ajHrbSXwohxsQd/ggOleKM7ese048J2/fwuim1uQGmhQCW8vQMkacP3GCQgBFMftHEsr7cYYe95CnmKTPMFbYD8CQ++DGQy+/M5X4ku5wHYmdIktfvk9tecpavThqS3m/0YtnqIWPTy1cD77K2wYjo+Ay317I74A",
        296, 100, "Process Bar")
    }), this.createVertexTemplateEntry("swimlane;", 200, 200, "Container", "Container", null, null, "container swimlane lane pool group"),
    this.addEntry("list group erd table", function () {
      var d = new mxCell("List", new mxGeometry(0, 0, 140, 110), "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
      d.vertex = !0;
      d.insert(a.cloneCell(c, "Item 1"));
      d.insert(a.cloneCell(c, "Item 2"));
      d.insert(a.cloneCell(c, "Item 3"));
      return a.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, "List")
    }), this.addEntry("list item entry value group erd table", function () {
      return a.createVertexTemplateFromCells([a.cloneCell(c, "List Item")], c.geometry.width, c.geometry.height, "List Item")
    })]
};
Sidebar.prototype.addUmlPalette = function (a) {
  var c = this,
    d = new mxCell("+ field: type", new mxGeometry(0, 0, 100, 26), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;");
  d.vertex = !0;
  var b = new mxCell("", new mxGeometry(0, 0, 40, 8), "line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;");
  b.vertex = !0;
  var f = [this.createVertexTemplateEntry("html=1;", 110, 50, "Object", "Object", null, null, "uml static class object instance"), this.createVertexTemplateEntry("html=1;", 110, 50, "&laquo;interface&raquo;<br><b>Name</b>", "Interface", null, null, "uml static class interface object instance annotated annotation"), this.addEntry("uml static class object instance", function () {
    var a = new mxCell("Classname", new mxGeometry(0, 0, 160, 90), "swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
    a.vertex = !0;
    a.insert(d.clone());
    a.insert(b.clone());
    a.insert(c.cloneCell(d, "+ method(type): type"));
    return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Class")
  }), this.addEntry("uml static class section subsection", function () {
    var a = new mxCell("Classname", new mxGeometry(0, 0, 140, 110), "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
    a.vertex =
      !0;
    a.insert(d.clone());
    a.insert(d.clone());
    a.insert(d.clone());
    return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Class 2")
  }), this.addEntry("uml static class item member method function variable field attribute label", function () {
    return c.createVertexTemplateFromCells([c.cloneCell(d, "+ item: attribute")], d.geometry.width, d.geometry.height, "Item 1")
  }), this.addEntry("uml static class item member method function variable field attribute label", function () {
    var a = new mxCell("item: attribute",
      new mxGeometry(0, 0, 120, d.geometry.height), "label;fontStyle=0;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=hidden;spacingLeft=28;spacingRight=4;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;imageWidth=16;imageHeight=16;image=" + c.gearImage);
    a.vertex = !0;
    return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Item 2")
  }), this.addEntry("uml static class divider hline line separator", function () {
    return c.createVertexTemplateFromCells([b.clone()],
      b.geometry.width, b.geometry.height, "Divider")
  }), this.addEntry("uml static class spacer space gap separator", function () {
    var a = new mxCell("", new mxGeometry(0, 0, 20, 14), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=4;spacingRight=4;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;");
    a.vertex = !0;
    return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Spacer")
  }), this.createVertexTemplateEntry("text;align=center;fontStyle=1;verticalAlign=middle;spacingLeft=3;spacingRight=3;strokeColor=none;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;",
    80, 26, "Title", "Title", null, null, "uml static class title label"), this.addEntry("uml static class component", function () {
    var a = new mxCell("&laquo;Annotation&raquo;<br/><b>Component</b>", new mxGeometry(0, 0, 180, 90), "html=1;dropTarget=0;");
    a.vertex = !0;
    var b = new mxCell("", new mxGeometry(1, 0, 20, 20), "shape=component;jettyWidth=8;jettyHeight=4;");
    b.vertex = !0;
    b.geometry.relative = !0;
    b.geometry.offset = new mxPoint(-27, 7);
    a.insert(b);
    return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height,
      "Component")
  }), this.addEntry("uml static class component", function () {
    var a = new mxCell('<p style="margin:0px;margin-top:6px;text-align:center;"><b>Component</b></p><hr/><p style="margin:0px;margin-left:8px;">+ Attribute1: Type<br/>+ Attribute2: Type</p>', new mxGeometry(0, 0, 180, 90), "align=left;overflow=fill;html=1;dropTarget=0;");
    a.vertex = !0;
    var b = new mxCell("", new mxGeometry(1, 0, 20, 20), "shape=component;jettyWidth=8;jettyHeight=4;");
    b.vertex = !0;
    b.geometry.relative = !0;
    b.geometry.offset = new mxPoint(-24,
      4);
    a.insert(b);
    return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Component with Attributes")
  }), this.createVertexTemplateEntry("verticalAlign=top;align=left;spacingTop=8;spacingLeft=2;spacingRight=12;shape=cube;size=10;direction=south;fontStyle=4;html=1;", 180, 120, "Block", "Block", null, null, "uml static class block"), this.createVertexTemplateEntry("shape=module;align=left;spacingLeft=20;align=center;verticalAlign=top;", 100, 50, "Module", "Module", null, null, "uml static class module component"),
    this.createVertexTemplateEntry("shape=folder;fontStyle=1;spacingTop=10;tabWidth=40;tabHeight=14;tabPosition=left;html=1;", 70, 50, "package", "Package", null, null, "uml static class package"), this.createVertexTemplateEntry("verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;", 160, 90, '<p style="margin:0px;margin-top:4px;text-align:center;text-decoration:underline;"><b>Object:Type</b></p><hr/><p style="margin:0px;margin-left:8px;">field1 = value1<br/>field2 = value2<br>field3 = value3</p>',
      "Object", null, null, "uml static class object instance"), this.createVertexTemplateEntry("verticalAlign=top;align=left;overflow=fill;html=1;", 180, 90, '<div style="box-sizing:border-box;width:100%;background:#e4e4e4;padding:2px;">Tablename</div><table style="width:100%;font-size:1em;" cellpadding="2" cellspacing="0"><tr><td>PK</td><td>uniqueId</td></tr><tr><td>FK1</td><td>foreignKey</td></tr><tr><td></td><td>fieldname</td></tr></table>', "Entity", null, null, "er entity table"), this.addEntry("uml static class object instance",
      function () {
        var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><div style="height:2px;"></div>', new mxGeometry(0, 0, 140, 60), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
        a.vertex = !0;
        return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Class 3")
      }), this.addEntry("uml static class object instance", function () {
      var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><div style="height:2px;"></div><hr size="1"/><div style="height:2px;"></div>',
        new mxGeometry(0, 0, 140, 60), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
      a.vertex = !0;
      return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Class 4")
    }), this.addEntry("uml static class object instance", function () {
      var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ field: Type</p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ method(): Type</p>',
        new mxGeometry(0, 0, 160, 90), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
      a.vertex = !0;
      return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Class 5")
    }), this.addEntry("uml static class object instance", function () {
      var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><i>&lt;&lt;Interface&gt;&gt;</i><br/><b>Interface</b></p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ field1: Type<br/>+ field2: Type</p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ method1(Type): Type<br/>+ method2(Type, Type): Type</p>',
        new mxGeometry(0, 0, 190, 140), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
      a.vertex = !0;
      return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Interface 2")
    }), this.createVertexTemplateEntry("shape=providedRequiredInterface;html=1;verticalLabelPosition=bottom;", 20, 20, "", "Provided/Required Interface", null, null, "uml provided required interface lollipop notation"), this.createVertexTemplateEntry("shape=requiredInterface;html=1;verticalLabelPosition=bottom;",
      10, 20, "", "Required Interface", null, null, "uml required interface lollipop notation"), this.addEntry("uml lollipop notation provided required interface", function () {
      return c.createVertexTemplateFromData("zVTBrptADPyavVYEkt4b0uQd3pMq5dD2uAUD27dgZJwE8vX1spsQlETtpVWRIjFjex3PmFVJWvc70m31hjlYlXxWSUqI7N/qPgVrVRyZXCUbFceR/FS8fRJdjNGo1QQN/0lB7AuO2h7AM57oeLCBIDw0Obj8SCVrJK6wxEbbV8RWyIWQP4F52Juzq9AHRqEqrm2IQpN/IsKTwAYb8MzWWBuO9B0hL2E2BGsqIQyxvJ9rzApD7QBrYBokhcBqNsf5UbrzsLzmXUu/oJET42jwGat5QYcHyiDkTDLKy03TiRrFfSx08m+FrrQtUkOZvZdbFKThmwMfVhf4fQ43/W3uZriiPPT+KKhjwnf4anKuQv//wsg+NPJ7/9d9Xf7eVykwbeeMOFWGYd/qzEVO8tHP/Suw4a2ujXV/+gXsEdhkOgSC8os44BQt0tggicZHeG1N2QiXibhAV48epRayEDd8MT7Ct06TUaXVWq027tCuhcx5VZjebeeaoDNn/WMcb/p+j0AM/dNr6InLl4Lgzylsk6OCgRWYsuI592gNZh5OhgmcblPv7+1l+ws=",
        40, 10, "Lollipop Notation")
    }), this.createVertexTemplateEntry("shape=umlBoundary;whiteSpace=wrap;html=1;", 100, 80, "Boundary Object", "Boundary Object", null, null, "uml boundary object"), this.createVertexTemplateEntry("ellipse;shape=umlEntity;whiteSpace=wrap;html=1;", 80, 80, "Entity Object", "Entity Object", null, null, "uml entity object"), this.createVertexTemplateEntry("ellipse;shape=umlControl;whiteSpace=wrap;html=1;", 70, 80, "Control Object", "Control Object", null, null, "uml control object"), this.createVertexTemplateEntry("shape=umlActor;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;html=1;",
      30, 60, "Actor", "Actor", !1, null, "uml actor"), this.createVertexTemplateEntry("ellipse;whiteSpace=wrap;html=1;", 140, 70, "Use Case", "Use Case", null, null, "uml use case usecase"), this.addEntry("uml activity state start", function () {
      var a = new mxCell("", new mxGeometry(0, 0, 30, 30), "ellipse;html=1;shape=startState;fillColor=#000000;strokeColor=#ff0000;");
      a.vertex = !0;
      var b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
      b.geometry.setTerminalPoint(new mxPoint(15, 90), !1);
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b, !0);
      return c.createVertexTemplateFromCells([a, b], 30, 90, "Start")
    }), this.addEntry("uml activity state", function () {
      var a = new mxCell("Activity", new mxGeometry(0, 0, 120, 40), "rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;");
      a.vertex = !0;
      var b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
      b.geometry.setTerminalPoint(new mxPoint(60, 100), !1);
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b, !0);
      return c.createVertexTemplateFromCells([a, b], 120, 100, "Activity")
    }), this.addEntry("uml activity composite state", function () {
      var a = new mxCell("Composite State", new mxGeometry(0, 0, 160, 60), "swimlane;html=1;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=0;resizeLast=1;container=0;fontColor=#000000;collapsible=0;rounded=1;arcSize=30;strokeColor=#ff0000;fillColor=#ffffc0;swimlaneFillColor=#ffffc0;dropTarget=0;");
      a.vertex = !0;
      var b = new mxCell("Subtitle", new mxGeometry(0, 0, 200, 26), "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;fontColor=#000000;");
      b.vertex = !0;
      a.insert(b);
      b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
      b.geometry.setTerminalPoint(new mxPoint(80, 120), !1);
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b,
        !0);
      return c.createVertexTemplateFromCells([a, b], 160, 120, "Composite State")
    }), this.addEntry("uml activity condition", function () {
      var a = new mxCell("Condition", new mxGeometry(0, 0, 80, 40), "rhombus;whiteSpace=wrap;html=1;fillColor=#ffffc0;strokeColor=#ff0000;");
      a.vertex = !0;
      var b = new mxCell("no", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
      b.geometry.setTerminalPoint(new mxPoint(180, 20), !1);
      b.geometry.relative =
        !0;
      b.geometry.x = -1;
      b.edge = !0;
      a.insertEdge(b, !0);
      var d = new mxCell("yes", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=top;endArrow=open;endSize=8;strokeColor=#ff0000;");
      d.geometry.setTerminalPoint(new mxPoint(40, 100), !1);
      d.geometry.relative = !0;
      d.geometry.x = -1;
      d.edge = !0;
      a.insertEdge(d, !0);
      return c.createVertexTemplateFromCells([a, b, d], 180, 100, "Condition")
    }), this.addEntry("uml activity fork join", function () {
      var a = new mxCell("", new mxGeometry(0, 0, 200, 10), "shape=line;html=1;strokeWidth=6;strokeColor=#ff0000;");
      a.vertex = !0;
      var b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
      b.geometry.setTerminalPoint(new mxPoint(100, 80), !1);
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b, !0);
      return c.createVertexTemplateFromCells([a, b], 200, 80, "Fork/Join")
    }), this.createVertexTemplateEntry("ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#ff0000;", 30, 30, "", "End", null, null, "uml activity state end"), this.createVertexTemplateEntry("shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;",
      100, 300, ":Object", "Lifeline", null, null, "uml sequence participant lifeline"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlActor;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;labelBackgroundColor=#ffffff;outlineConnect=0;", 20, 300, "", "Actor Lifeline", null, null, "uml sequence participant lifeline actor"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlBoundary;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;labelBackgroundColor=#ffffff;outlineConnect=0;",
      50, 300, "", "Boundary Lifeline", null, null, "uml sequence participant lifeline boundary"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlEntity;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;labelBackgroundColor=#ffffff;outlineConnect=0;", 40, 300, "", "Entity Lifeline", null, null, "uml sequence participant lifeline entity"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlControl;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;labelBackgroundColor=#ffffff;outlineConnect=0;",
      40, 300, "", "Control Lifeline", null, null, "uml sequence participant lifeline control"), this.createVertexTemplateEntry("shape=umlFrame;whiteSpace=wrap;html=1;", 300, 200, "frame", "Frame", null, null, "uml sequence frame"), this.createVertexTemplateEntry("shape=umlDestroy;whiteSpace=wrap;html=1;strokeWidth=3;", 30, 30, "", "Destruction", null, null, "uml sequence destruction destroy"), this.createVertexTemplateEntry("shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;align=left;spacingTop=-6;", 100, 70, "Note",
      "Note", null, null, "uml note"), this.addEntry("uml sequence invoke invocation call activation", function () {
      var a = new mxCell("", new mxGeometry(0, 0, 10, 80), "html=1;points=[];perimeter=orthogonalPerimeter;");
      a.vertex = !0;
      var b = new mxCell("dispatch", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;");
      b.geometry.setTerminalPoint(new mxPoint(-60, 0), !0);
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b, !1);
      return c.createVertexTemplateFromCells([a, b], 10, 80, "Found Message")
    }),
    this.addEntry("uml sequence invoke call delegation synchronous invocation activation", function () {
      var a = new mxCell("", new mxGeometry(0, 0, 10, 80), "html=1;points=[];perimeter=orthogonalPerimeter;");
      a.vertex = !0;
      var b = new mxCell("dispatch", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;endArrow=block;entryX=0;entryY=0;");
      b.geometry.setTerminalPoint(new mxPoint(-70, 0), !0);
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b, !1);
      var d = new mxCell("return", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;exitX=0;exitY=0.95;");
      d.geometry.setTerminalPoint(new mxPoint(-70, 76), !1);
      d.geometry.relative = !0;
      d.edge = !0;
      a.insertEdge(d, !0);
      return c.createVertexTemplateFromCells([a, b, d], 10, 80, "Synchronous Invocation")
    }), this.addEntry("uml sequence self call recursion delegation activation", function () {
      var a = new mxCell("", new mxGeometry(0, 20, 10, 40), "html=1;points=[];perimeter=orthogonalPerimeter;");
      a.vertex = !0;
      var b = new mxCell("self call", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;align=left;spacingLeft=2;endArrow=block;rounded=0;entryX=1;entryY=0;");
      b.geometry.setTerminalPoint(new mxPoint(5, 0), !0);
      b.geometry.points = [new mxPoint(30, 0)];
      b.geometry.relative = !0;
      b.edge = !0;
      a.insertEdge(b, !1);
      return c.createVertexTemplateFromCells([a, b], 10, 60, "Self Call")
    }), this.addEntry("uml sequence invoke call delegation callback activation", function () {
      return c.createVertexTemplateFromData("xZRNT8MwDIZ/Ta6oaymD47rBTkiTuMAxW6wmIm0q19s6fj1OE3V0Y2iCA4dK8euP2I+riGxedUuUjX52CqzIHkU2R+conKpuDtaKNDFKZAuRpgl/In264J303qSRCDVdk5CGhJ20WwhKEFo62ChoqritxURkReNMTa2X80LkC68AmgoIkEWHpF3pamlXR7WIFwASdBeb7KXY4RIc5+KBQ/ZGkY4RYY5Egyl1zLqLmmyDXQ6Zx4n5EIf+HkB2BmAjrV3LzftPIPw4hgNn1pQ1a2tH5Cp2QK1miG7vNeu4iJe4pdeY2BtvbCQDGlAljMCQxBJotJ8rWCFYSWY3LvUdmZi68rvkkLiU6QnL1m1xAzHoBOdw61WEb88II9AW67/ydQ2wq1Cy1aAGvOrFfPh6997qDA3g+dxzv3nIL6MPU/8T+kMw8+m4QPgdfrEJNo8PSQj/+s58Ag==",
        10, 60, "Callback")
    }), this.createVertexTemplateEntry("html=1;points=[];perimeter=orthogonalPerimeter;", 10, 80, "", "Activation", null, null, "uml sequence activation"), this.createEdgeTemplateEntry("html=1;verticalAlign=bottom;startArrow=oval;startFill=1;endArrow=block;startSize=8;", 60, 0, "dispatch", "Found Message 1", null, "uml sequence message call invoke dispatch"), this.createEdgeTemplateEntry("html=1;verticalAlign=bottom;startArrow=circle;startFill=1;endArrow=open;startSize=6;endSize=8;", 80, 0, "dispatch",
      "Found Message 2", null, "uml sequence message call invoke dispatch"), this.createEdgeTemplateEntry("html=1;verticalAlign=bottom;endArrow=block;", 80, 0, "dispatch", "Message", null, "uml sequence message call invoke dispatch"), this.addEntry("uml sequence return message", function () {
      var a = new mxCell("return", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;");
      a.geometry.setTerminalPoint(new mxPoint(80, 0), !0);
      a.geometry.setTerminalPoint(new mxPoint(0, 0), !1);
      a.geometry.relative =
        !0;
      a.edge = !0;
      return c.createEdgeTemplateFromCells([a], 80, 0, "Return")
    }), this.addEntry("uml relation", function () {
      var a = new mxCell("name", new mxGeometry(0, 0, 0, 0), "endArrow=block;endFill=1;html=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=top;");
      a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      a.geometry.relative = !0;
      a.geometry.x = -1;
      a.edge = !0;
      var b = new mxCell("1", new mxGeometry(-1, 0, 0, 0), "resizable=0;html=1;align=left;verticalAlign=bottom;labelBackgroundColor=#ffffff;fontSize=10;");
      b.geometry.relative = !0;
      b.setConnectable(!1);
      b.vertex = !0;
      a.insert(b);
      return c.createEdgeTemplateFromCells([a], 160, 0, "Relation 1")
    }), this.addEntry("uml association", function () {
      var a = new mxCell("", new mxGeometry(0, 0, 0, 0), "endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;");
      a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      a.geometry.relative = !0;
      a.edge = !0;
      var b = new mxCell("parent", new mxGeometry(-1, 0, 0, 0), "resizable=0;html=1;align=left;verticalAlign=bottom;labelBackgroundColor=#ffffff;fontSize=10;");
      b.geometry.relative = !0;
      b.setConnectable(!1);
      b.vertex = !0;
      a.insert(b);
      b = new mxCell("child", new mxGeometry(1, 0, 0, 0), "resizable=0;html=1;align=right;verticalAlign=bottom;labelBackgroundColor=#ffffff;fontSize=10;");
      b.geometry.relative = !0;
      b.setConnectable(!1);
      b.vertex = !0;
      a.insert(b);
      return c.createEdgeTemplateFromCells([a], 160, 0, "Association 1")
    }), this.addEntry("uml aggregation", function () {
      var a = new mxCell("1", new mxGeometry(0, 0, 0, 0), "endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;");
      a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      a.geometry.relative = !0;
      a.geometry.x = -1;
      a.geometry.y = 3;
      a.edge = !0;
      return c.createEdgeTemplateFromCells([a], 160, 0, "Aggregation 1")
    }), this.addEntry("uml composition", function () {
      var a = new mxCell("1", new mxGeometry(0, 0, 0, 0), "endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;");
      a.geometry.setTerminalPoint(new mxPoint(0,
        0), !0);
      a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      a.geometry.relative = !0;
      a.geometry.x = -1;
      a.geometry.y = 3;
      a.edge = !0;
      return c.createEdgeTemplateFromCells([a], 160, 0, "Composition 1")
    }), this.addEntry("uml relation", function () {
      var a = new mxCell("Relation", new mxGeometry(0, 0, 0, 0), "endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;");
      a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
      a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
      a.geometry.relative =
        !0;
      a.edge = !0;
      var b = new mxCell("0..n", new mxGeometry(-1, 0, 0, 0), "resizable=0;html=1;align=left;verticalAlign=top;labelBackgroundColor=#ffffff;fontSize=10;");
      b.geometry.relative = !0;
      b.setConnectable(!1);
      b.vertex = !0;
      a.insert(b);
      b = new mxCell("1", new mxGeometry(1, 0, 0, 0), "resizable=0;html=1;align=right;verticalAlign=top;labelBackgroundColor=#ffffff;fontSize=10;");
      b.geometry.relative = !0;
      b.setConnectable(!1);
      b.vertex = !0;
      a.insert(b);
      return c.createEdgeTemplateFromCells([a], 160, 0, "Relation 2")
    }), this.createEdgeTemplateEntry("endArrow=open;endSize=12;dashed=1;html=1;",
      160, 0, "Use", "Dependency", null, "uml dependency use"), this.createEdgeTemplateEntry("endArrow=block;endSize=16;endFill=0;html=1;", 160, 0, "Extends", "Generalization", null, "uml generalization extend"), this.createEdgeTemplateEntry("endArrow=block;startArrow=block;endFill=1;startFill=1;html=1;", 160, 0, "", "Association 2", null, "uml association"), this.createEdgeTemplateEntry("endArrow=open;startArrow=circlePlus;endFill=0;startFill=0;endSize=8;html=1;", 160, 0, "", "Inner Class", null, "uml inner class"), this.createEdgeTemplateEntry("endArrow=open;startArrow=cross;endFill=0;startFill=0;endSize=8;startSize=10;html=1;",
      160, 0, "", "Terminate", null, "uml terminate"), this.createEdgeTemplateEntry("endArrow=block;dashed=1;endFill=0;endSize=12;html=1;", 160, 0, "", "Implementation", null, "uml realization implementation"), this.createEdgeTemplateEntry("endArrow=diamondThin;endFill=0;endSize=24;html=1;", 160, 0, "", "Aggregation 2", null, "uml aggregation"), this.createEdgeTemplateEntry("endArrow=diamondThin;endFill=1;endSize=24;html=1;", 160, 0, "", "Composition 2", null, "uml composition"), this.createEdgeTemplateEntry("endArrow=open;endFill=1;endSize=12;html=1;",
      160, 0, "", "Association 3", null, "uml association")];
  this.addPaletteFunctions("uml", mxResources.get("uml"), a || !1, f)
};

Sidebar.prototype.createTitle = function (a) {
  var c = document.createElement("a");
  c.setAttribute("title", mxResources.get("sidebarTooltip"));
  c.className = "geTitle";
  mxUtils.write(c, a);
  return c
};
Sidebar.prototype.createThumb = function (a, c, d, b, f, e, h, g, k) {
  this.graph.labelsVisible = null == e || e;
  e = mxClient.NO_FO;
  mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
  this.graph.view.scaleAndTranslate(1, 0, 0);
  this.graph.addCells(a);
  a = this.graph.getGraphBounds();
  g = Math.floor(100 * Math.min((c - 2 * this.thumbBorder) / a.width, (d - 2 * this.thumbBorder) / a.height)) / 100;
  this.graph.view.scaleAndTranslate(g, Math.floor((c - a.width * g) / 2 / g - a.x), Math.floor((d - a.height * g) / 2 / g - a.y));
  if (this.graph.dialect != mxConstants.DIALECT_SVG ||
    mxClient.NO_FO || null == this.graph.view.getCanvas().ownerSVGElement) {
    if (g = this.graph.container.cloneNode(!1), g.innerHTML = this.graph.container.innerHTML, mxClient.IS_QUIRKS || 8 == document.documentMode) g.firstChild.style.overflow = "visible"
  } else g = this.graph.view.getCanvas().ownerSVGElement.cloneNode(!0);
  this.graph.getModel().clear();
  mxClient.NO_FO = e;
  mxClient.IS_IE6 && (b.style.backgroundImage = "url(" + this.editorUi.editor.transparentImage + ")");
  g.style.position = "relative";
  g.style.overflow = "hidden";
  g.style.left =
    this.thumbBorder + "px";
  g.style.top = this.thumbBorder + "px";
  g.style.width = c + "px";
  g.style.height = d + "px";
  g.style.visibility = "";
  g.style.minWidth = "";
  g.style.minHeight = "";
  b.appendChild(g);
  this.sidebarTitles && null != f && 0 != h && (b.style.height = this.thumbHeight + (mxClient.IS_QUIRKS ? 2 * this.thumbPadding + 2 : 0) + this.sidebarTitleSize + 8 + "px", c = document.createElement("div"), c.style.fontSize = this.sidebarTitleSize + "px", c.style.color = "#303030", c.style.textAlign = "center", c.style.whiteSpace = "nowrap", mxClient.IS_IE && (c.style.height =
    this.sidebarTitleSize + 12 + "px"), c.style.paddingTop = "4px", mxUtils.write(c, f), b.appendChild(c));
  return a
};
Sidebar.prototype.createItem = function (a, c, d, b, f, e, h) {
  var g = document.createElement("a");
  g.className = "geItem";
  g.style.overflow = "hidden";
  var k = mxClient.IS_QUIRKS ? 8 + 2 * this.thumbPadding : 2 * this.thumbBorder;
  g.style.width = this.thumbWidth + k + "px";
  g.style.height = this.thumbHeight + k + "px";
  g.style.padding = this.thumbPadding + "px";
  mxClient.IS_IE6 && (g.style.border = "none");
  mxEvent.addListener(g, "click", function (a) {
    mxEvent.consume(a)
  });
  this.createThumb(a, this.thumbWidth, this.thumbHeight, g, c, d, b, f, e);
  var l = new mxRectangle(0,
    0, f, e);
  1 < a.length || a[0].vertex ? (b = this.createDragSource(g, this.createDropHandler(a, !0, h, l), this.createDragPreview(f, e), a, l), this.addClickHandler(g, b, a), b.isGuidesEnabled = mxUtils.bind(this, function () {
    return this.editorUi.editor.graph.graphHandler.guidesEnabled
  })) : null != a[0] && a[0].edge && (b = this.createDragSource(g, this.createDropHandler(a, !1, h, l), this.createDragPreview(f, e), a, l), this.addClickHandler(g, b, a));
  mxClient.IS_IOS || mxEvent.addGestureListeners(g, null, mxUtils.bind(this, function (b) {
    mxEvent.isMouseEvent(b) &&
    this.showTooltip(g, a, l.width, l.height, c, d)
  }));
  return g
};

Sidebar.prototype.updateShapes = function (a, c) {
  var d = this.editorUi.editor.graph, b = d.getCellStyle(a), f = [];
  d.model.beginUpdate();
  try {
    for (var e = d.getModel().getStyle(a), h = "shadow dashed dashPattern fontFamily fontSize fontColor align startFill startSize endFill endSize strokeColor strokeWidth fillColor gradientColor html part noEdgeStyle edgeStyle elbow childLayout recursiveResize container collapsible connectable".split(" "), g = 0; g < c.length; g++) {
      var k = c[g];
      if (d.getModel().isVertex(k) == d.getModel().isVertex(a) ||
        d.getModel().isEdge(k) == d.getModel().isEdge(a)) {
        var l = d.getCurrentCellStyle(c[g]);
        d.getModel().setStyle(k, e);
        if ("1" == mxUtils.getValue(l, "composite", "0")) for (var m = d.model.getChildCount(k); 0 <= m; m--) d.model.remove(d.model.getChildAt(k, m));
        "umlLifeline" == l[mxConstants.STYLE_SHAPE] && "umlLifeline" != b[mxConstants.STYLE_SHAPE] && (d.setCellStyles(mxConstants.STYLE_SHAPE, "umlLifeline", [k]), d.setCellStyles("participant", b[mxConstants.STYLE_SHAPE], [k]));
        for (m = 0; m < h.length; m++) {
          var n = l[h[m]];
          null != n && d.setCellStyles(h[m],
            n, [k])
        }
        f.push(k)
      }
    }
  } finally {
    d.model.endUpdate()
  }
  return f
};
Sidebar.prototype.createDropHandler = function (a, c, d, b) {
  d = null != d ? d : !0;
  return mxUtils.bind(this, function (f, e, h, g, k, l) {
    for (l = l ? null : mxEvent.isTouchEvent(e) || mxEvent.isPenEvent(e) ? document.elementFromPoint(mxEvent.getClientX(e), mxEvent.getClientY(e)) : mxEvent.getSource(e); null != l && l != this.container;) l = l.parentNode;
    if (null == l && f.isEnabled()) {
      a = f.getImportableCells(a);
      if (0 < a.length) {
        f.stopEditing();
        l = null == h || mxEvent.isAltDown(e) ? !1 : f.isValidDropTarget(h, a, e);
        var m = null;
        null == h || l || (h = null);
        if (!f.isCellLocked(h ||
            f.getDefaultParent())) {
          f.model.beginUpdate();
          try {
            g = Math.round(g);
            k = Math.round(k);
            if (c && f.isSplitTarget(h, a, e)) {
              var n = f.cloneCells(a);
              f.splitEdge(h, n, null, g - b.width / 2, k - b.height / 2);
              m = n
            } else 0 < a.length && (m = f.importCells(a, g, k, h));
            if (null != f.layoutManager) {
              var p = f.layoutManager.getLayout(h);
              if (null != p) {
                var q = f.view.scale, v = f.view.translate, u = (g + v.x) * q, r = (k + v.y) * q;
                for (h = 0; h < m.length; h++) p.moveCell(m[h], u, r)
              }
            }
            !d || null != e && mxEvent.isShiftDown(e) || f.fireEvent(new mxEventObject("cellsInserted", "cells", m))
          } catch (w) {
            this.editorUi.handleError(w)
          } finally {
            f.model.endUpdate()
          }
          null !=
          m && 0 < m.length && (f.scrollCellToVisible(m[0]), f.setSelectionCells(m));
          f.editAfterInsert && null != e && mxEvent.isMouseEvent(e) && null != m && 1 == m.length && window.setTimeout(function () {
            f.startEditing(m[0])
          }, 0)
        }
      }
      mxEvent.consume(e)
    }
  })
};
Sidebar.prototype.createDragPreview = function (a, c) {
  var d = document.createElement("div");
  d.style.border = this.dragPreviewBorder;
  d.style.width = a + "px";
  d.style.height = c + "px";
  return d
};
Sidebar.prototype.dropAndConnect = function (a, c, d, b, f) {
  var e = this.getDropAndConnectGeometry(a, c[b], d, c), h = [];
  if (null != e) {
    var g = this.editorUi.editor.graph, k = null;
    g.model.beginUpdate();
    try {
      var l = g.getCellGeometry(a), m = g.getCellGeometry(c[b]), n = g.model.getParent(a), p = !0;
      if (null != g.layoutManager) {
        var q = g.layoutManager.getLayout(n);
        if (null != q && q.constructor == mxStackLayout && (p = !1, h = g.view.getState(n), null != h)) {
          var v = new mxPoint(h.x / g.view.scale - g.view.translate.x, h.y / g.view.scale - g.view.translate.y);
          e.x +=
            v.x;
          e.y += v.y;
          var u = e.getTerminalPoint(!1);
          null != u && (u.x += v.x, u.y += v.y)
        }
      }
      var r = m.x, w = m.y;
      g.model.isEdge(c[b]) && (w = r = 0);
      var t = g.model.isEdge(a) || null != l && !l.relative && p,
        h = c = g.importCells(c, e.x - (t ? r : 0), e.y - (t ? w : 0), t ? n : null);
      if (g.model.isEdge(a)) g.model.setTerminal(a, c[b], d == mxConstants.DIRECTION_NORTH); else if (g.model.isEdge(c[b])) {
        g.model.setTerminal(c[b], a, !0);
        var y = g.getCellGeometry(c[b]);
        y.points = null;
        if (null != y.getTerminalPoint(!1)) y.setTerminalPoint(e.getTerminalPoint(!1), !1); else if (t && g.model.isVertex(n)) {
          var x =
              g.view.getState(n),
            v = x.cell != g.view.currentRoot ? new mxPoint(x.x / g.view.scale - g.view.translate.x, x.y / g.view.scale - g.view.translate.y) : new mxPoint(0, 0);
          g.cellsMoved(c, v.x, v.y, null, null, !0)
        }
      } else m = g.getCellGeometry(c[b]), r = e.x - Math.round(m.x), w = e.y - Math.round(m.y), e.x = Math.round(m.x), e.y = Math.round(m.y), g.model.setGeometry(c[b], e), g.cellsMoved(c, r, w, null, null, !0), h = c.slice(), k = 1 == h.length ? h[0] : null, c.push(g.insertEdge(null, null, "", a, c[b], g.createCurrentEdgeStyle()));
      null != f && mxEvent.isShiftDown(f) ||
      g.fireEvent(new mxEventObject("cellsInserted", "cells", c))
    } catch (C) {
      this.editorUi.handleError(C)
    } finally {
      g.model.endUpdate()
    }
    g.editAfterInsert && null != f && mxEvent.isMouseEvent(f) && null != k && window.setTimeout(function () {
      g.startEditing(k)
    }, 0)
  }
  return h
};
Sidebar.prototype.getDropAndConnectGeometry = function (a, c, d, b) {
  var f = this.editorUi.editor.graph, e = f.view, h = 1 < b.length, g = f.getCellGeometry(a);
  b = f.getCellGeometry(c);
  null != g && null != b && (b = b.clone(), f.model.isEdge(a) ? (a = f.view.getState(a), g = a.absolutePoints, c = g[0], f = g[g.length - 1], d == mxConstants.DIRECTION_NORTH ? (b.x = c.x / e.scale - e.translate.x - b.width / 2, b.y = c.y / e.scale - e.translate.y - b.height / 2) : (b.x = f.x / e.scale - e.translate.x - b.width / 2, b.y = f.y / e.scale - e.translate.y - b.height / 2)) : (g.relative && (a = f.view.getState(a),
    g = g.clone(), g.x = (a.x - e.translate.x) / e.scale, g.y = (a.y - e.translate.y) / e.scale), e = f.defaultEdgeLength, f.model.isEdge(c) && null != b.getTerminalPoint(!0) && null != b.getTerminalPoint(!1) ? (c = b.getTerminalPoint(!0), f = b.getTerminalPoint(!1), e = f.x - c.x, c = f.y - c.y, e = Math.sqrt(e * e + c * c), b.x = g.getCenterX(), b.y = g.getCenterY(), b.width = 1, b.height = 1, d == mxConstants.DIRECTION_NORTH ? (b.height = e, b.y = g.y - e, b.setTerminalPoint(new mxPoint(b.x, b.y), !1)) : d == mxConstants.DIRECTION_EAST ? (b.width = e, b.x = g.x + g.width, b.setTerminalPoint(new mxPoint(b.x +
    b.width, b.y), !1)) : d == mxConstants.DIRECTION_SOUTH ? (b.height = e, b.y = g.y + g.height, b.setTerminalPoint(new mxPoint(b.x, b.y + b.height), !1)) : d == mxConstants.DIRECTION_WEST && (b.width = e, b.x = g.x - e, b.setTerminalPoint(new mxPoint(b.x, b.y), !1))) : (!h && 45 < b.width && 45 < b.height && 45 < g.width && 45 < g.height && (b.width *= g.height / b.height, b.height = g.height), b.x = g.x + g.width / 2 - b.width / 2, b.y = g.y + g.height / 2 - b.height / 2, d == mxConstants.DIRECTION_NORTH ? b.y = b.y - g.height / 2 - b.height / 2 - e : d == mxConstants.DIRECTION_EAST ? b.x = b.x + g.width / 2 +
    b.width / 2 + e : d == mxConstants.DIRECTION_SOUTH ? b.y = b.y + g.height / 2 + b.height / 2 + e : d == mxConstants.DIRECTION_WEST && (b.x = b.x - g.width / 2 - b.width / 2 - e), f.model.isEdge(c) && null != b.getTerminalPoint(!0) && null != c.getTerminal(!1) && (g = f.getCellGeometry(c.getTerminal(!1)), null != g && (d == mxConstants.DIRECTION_NORTH ? (b.x -= g.getCenterX(), b.y -= g.getCenterY() + g.height / 2) : d == mxConstants.DIRECTION_EAST ? (b.x -= g.getCenterX() - g.width / 2, b.y -= g.getCenterY()) : d == mxConstants.DIRECTION_SOUTH ? (b.x -= g.getCenterX(), b.y -= g.getCenterY() - g.height /
    2) : d == mxConstants.DIRECTION_WEST && (b.x -= g.getCenterX() + g.width / 2, b.y -= g.getCenterY()))))));
  return b
};
Sidebar.prototype.isDropStyleEnabled = function (a, c) {
  var d = !0;
  if (null != c && 1 == a.length) {
    var b = this.graph.getCellStyle(a[c]);
    null != b && (d = mxUtils.getValue(b, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(b, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE)
  }
  return d
};
Sidebar.prototype.isDropStyleTargetIgnored = function (a) {
  return this.graph.isSwimlane(a.cell)
};
Sidebar.prototype.createDragSource = function (a, c, d, b, f) {
  function e(a, b) {
    var c;
    mxClient.IS_IE && !mxClient.IS_SVG ? (mxClient.IS_IE6 && "CSS1Compat" != document.compatMode ? (c = document.createElement(mxClient.VML_PREFIX + ":image"), c.setAttribute("src", a.src), c.style.borderStyle = "none") : (c = document.createElement("div"), c.style.backgroundImage = "url(" + a.src + ")", c.style.backgroundPosition = "center", c.style.backgroundRepeat = "no-repeat"), c.style.width = a.width + 4 + "px", c.style.height = a.height + 4 + "px", c.style.display = mxClient.IS_QUIRKS ?
      "inline" : "inline-block") : (c = mxUtils.createImage(a.src), c.style.width = a.width + "px", c.style.height = a.height + "px");
    null != b && c.setAttribute("title", b);
    mxUtils.setOpacity(c, a == this.refreshTarget ? 30 : 20);
    c.style.position = "absolute";
    c.style.cursor = "crosshair";
    return c
  }

  function h(a, b, c, d) {
    null != d.parentNode && (mxUtils.contains(c, a, b) ? (mxUtils.setOpacity(d, 100), E = d) : mxUtils.setOpacity(d, d == A ? 30 : 20));
    return c
  }

  for (var g = this.editorUi, k = g.editor.graph, l = null, m = null, n = this, p = 0; p < b.length && (null == m && this.editorUi.editor.graph.model.isVertex(b[p]) ?
    m = p : null == l && this.editorUi.editor.graph.model.isEdge(b[p]) && null == this.editorUi.editor.graph.model.getTerminal(b[p], !0) && (l = p), null == m || null == l); p++) ;
  var q = this.isDropStyleEnabled(b, m),
    v = mxUtils.makeDraggable(a, this.editorUi.editor.graph, mxUtils.bind(this, function (a, d, e, g, f) {
      null != this.updateThread && window.clearTimeout(this.updateThread);
      if (null != b && null != t && E == A) {
        var h = a.isCellSelected(t.cell) ? a.getSelectionCells() : [t.cell],
          h = this.updateShapes(a.model.isEdge(t.cell) ? b[0] : b[m], h);
        a.setSelectionCells(h)
      } else null !=
      b && null != E && null != r && E != A ? (h = a.model.isEdge(r.cell) || null == l ? m : l, a.setSelectionCells(this.dropAndConnect(r.cell, b, J, h, d))) : c.apply(this, arguments);
      null != this.editorUi.hoverIcons && this.editorUi.hoverIcons.update(a.view.getState(a.getSelectionCell()))
    }), d, 0, 0, k.autoscroll, !0, !0);
  k.addListener(mxEvent.ESCAPE, function (a, b) {
    v.isActive() && v.reset()
  });
  var u = v.mouseDown;
  v.mouseDown = function (a) {
    mxEvent.isPopupTrigger(a) || mxEvent.isMultiTouchEvent(a) || (k.stopEditing(), u.apply(this, arguments))
  };
  var r = null, w =
      null, t = null, y = !1, x = e(this.triangleUp, mxResources.get("connect")),
    C = e(this.triangleRight, mxResources.get("connect")), B = e(this.triangleDown, mxResources.get("connect")),
    D = e(this.triangleLeft, mxResources.get("connect")), A = e(this.refreshTarget, mxResources.get("replace")),
    F = null, I = e(this.roundDrop), G = e(this.roundDrop), J = mxConstants.DIRECTION_NORTH, E = null,
    O = v.createPreviewElement;
  v.createPreviewElement = function (a) {
    var b = O.apply(this, arguments);
    mxClient.IS_SVG && (b.style.pointerEvents = "none");
    this.previewElementWidth =
      b.style.width;
    this.previewElementHeight = b.style.height;
    return b
  };
  var U = v.dragEnter;
  v.dragEnter = function (a, b) {
    null != g.hoverIcons && g.hoverIcons.setDisplay("none");
    U.apply(this, arguments)
  };
  var R = v.dragExit;
  v.dragExit = function (a, b) {
    null != g.hoverIcons && g.hoverIcons.setDisplay("");
    R.apply(this, arguments)
  };
  v.dragOver = function (a, c) {
    mxDragSource.prototype.dragOver.apply(this, arguments);
    null != this.currentGuide && null != E && this.currentGuide.hide();
    if (null != this.previewElement) {
      var d = a.view;
      if (null != t && E == A) this.previewElement.style.display =
        a.model.isEdge(t.cell) ? "none" : "", this.previewElement.style.left = t.x + "px", this.previewElement.style.top = t.y + "px", this.previewElement.style.width = t.width + "px", this.previewElement.style.height = t.height + "px"; else if (null != r && null != E) {
        var e = a.model.isEdge(r.cell) || null == l ? m : l, g = n.getDropAndConnectGeometry(r.cell, b[e], J, b),
          h = a.model.isEdge(r.cell) ? null : a.getCellGeometry(r.cell), k = a.getCellGeometry(b[e]),
          p = a.model.getParent(r.cell), q = d.translate.x * d.scale, u = d.translate.y * d.scale;
        null != h && !h.relative && a.model.isVertex(p) &&
        p != d.currentRoot && (u = d.getState(p), q = u.x, u = u.y);
        h = k.x;
        k = k.y;
        a.model.isEdge(b[e]) && (k = h = 0);
        this.previewElement.style.left = (g.x - h) * d.scale + q + "px";
        this.previewElement.style.top = (g.y - k) * d.scale + u + "px";
        1 == b.length && (this.previewElement.style.width = g.width * d.scale + "px", this.previewElement.style.height = g.height * d.scale + "px");
        this.previewElement.style.display = ""
      } else null != v.currentHighlight.state && a.model.isEdge(v.currentHighlight.state.cell) ? (this.previewElement.style.left = Math.round(parseInt(this.previewElement.style.left) -
        f.width * d.scale / 2) + "px", this.previewElement.style.top = Math.round(parseInt(this.previewElement.style.top) - f.height * d.scale / 2) + "px") : (this.previewElement.style.width = this.previewElementWidth, this.previewElement.style.height = this.previewElementHeight, this.previewElement.style.display = "")
    }
  };
  var K = (new Date).getTime(), H = 0, L = null, ca = this.editorUi.editor.graph.getCellStyle(b[0]);
  v.getDropTarget = mxUtils.bind(this, function (a, c, d, e) {
    var g = mxEvent.isAltDown(e) || null == b ? null : a.getCellAt(c, d);
    if (null != g && !this.graph.isCellConnectable(g)) {
      var f =
        this.graph.getModel().getParent(g);
      this.graph.getModel().isVertex(f) && this.graph.isCellConnectable(f) && (g = f)
    }
    a.isCellLocked(g) && (g = null);
    var k = a.view.getState(g), f = E = null;
    L != k ? (L = k, K = (new Date).getTime(), H = 0, null != this.updateThread && window.clearTimeout(this.updateThread), null != k && (this.updateThread = window.setTimeout(function () {
      null == E && (L = k, v.getDropTarget(a, c, d, e))
    }, this.dropTargetDelay + 10))) : H = (new Date).getTime() - K;
    if (q && 2500 > H && null != k && !mxEvent.isShiftDown(e) && (mxUtils.getValue(k.style, mxConstants.STYLE_SHAPE) !=
        mxUtils.getValue(ca, mxConstants.STYLE_SHAPE) && (mxUtils.getValue(k.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(k.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(k.style, mxConstants.STYLE_GRADIENTCOLOR, mxConstants.NONE) != mxConstants.NONE) || "image" == mxUtils.getValue(ca, mxConstants.STYLE_SHAPE) || 1500 < H || a.model.isEdge(k.cell)) && H > this.dropTargetDelay && !this.isDropStyleTargetIgnored(k) && (a.model.isVertex(k.cell) && null !=
        m || a.model.isEdge(k.cell) && a.model.isEdge(b[0]))) {
      t = k;
      var l = a.model.isEdge(k.cell) ? a.view.getPoint(k) : new mxPoint(k.getCenterX(), k.getCenterY()),
        l = new mxRectangle(l.x - this.refreshTarget.width / 2, l.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height);
      A.style.left = Math.floor(l.x) + "px";
      A.style.top = Math.floor(l.y) + "px";
      null == F && (a.container.appendChild(A), F = A.parentNode);
      h(c, d, l, A)
    } else null == t || !mxUtils.contains(t, c, d) || 1500 < H && !mxEvent.isShiftDown(e) ? (t = null, null != F && (A.parentNode.removeChild(A),
      F = null)) : null != t && null != F && (l = a.model.isEdge(t.cell) ? a.view.getPoint(t) : new mxPoint(t.getCenterX(), t.getCenterY()), l = new mxRectangle(l.x - this.refreshTarget.width / 2, l.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height), h(c, d, l, A));
    if (y && null != r && !mxEvent.isAltDown(e) && null == E) {
      f = mxRectangle.fromRectangle(r);
      if (a.model.isEdge(r.cell)) {
        var n = r.absolutePoints;
        null != I.parentNode && (l = n[0], f.add(h(c, d, new mxRectangle(l.x - this.roundDrop.width / 2, l.y - this.roundDrop.height / 2, this.roundDrop.width,
          this.roundDrop.height), I)));
        null != G.parentNode && (n = n[n.length - 1], f.add(h(c, d, new mxRectangle(n.x - this.roundDrop.width / 2, n.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), G)))
      } else l = mxRectangle.fromRectangle(r), null != r.shape && null != r.shape.boundingBox && (l = mxRectangle.fromRectangle(r.shape.boundingBox)), l.grow(this.graph.tolerance), l.grow(HoverIcons.prototype.arrowSpacing), n = this.graph.selectionCellsHandler.getHandler(r.cell), null != n && (l.x -= n.horizontalOffset / 2, l.y -= n.verticalOffset /
        2, l.width += n.horizontalOffset, l.height += n.verticalOffset, null != n.rotationShape && null != n.rotationShape.node && "hidden" != n.rotationShape.node.style.visibility && "none" != n.rotationShape.node.style.display && null != n.rotationShape.boundingBox && l.add(n.rotationShape.boundingBox)), f.add(h(c, d, new mxRectangle(r.getCenterX() - this.triangleUp.width / 2, l.y - this.triangleUp.height, this.triangleUp.width, this.triangleUp.height), x)), f.add(h(c, d, new mxRectangle(l.x + l.width, r.getCenterY() - this.triangleRight.height / 2, this.triangleRight.width,
        this.triangleRight.height), C)), f.add(h(c, d, new mxRectangle(r.getCenterX() - this.triangleDown.width / 2, l.y + l.height, this.triangleDown.width, this.triangleDown.height), B)), f.add(h(c, d, new mxRectangle(l.x - this.triangleLeft.width, r.getCenterY() - this.triangleLeft.height / 2, this.triangleLeft.width, this.triangleLeft.height), D));
      null != f && f.grow(10)
    }
    J = mxConstants.DIRECTION_NORTH;
    E == C ? J = mxConstants.DIRECTION_EAST : E == B || E == G ? J = mxConstants.DIRECTION_SOUTH : E == D && (J = mxConstants.DIRECTION_WEST);
    null != t && E == A && (k = t);
    l = (null == m || a.isCellConnectable(b[m])) && (a.model.isEdge(g) && null != m || a.model.isVertex(g) && a.isCellConnectable(g));
    if (null != r && 5E3 <= H || r != k && (null == f || !mxUtils.contains(f, c, d) || 500 < H && null == E && l)) if (y = !1, r = 5E3 > H && H > this.dropTargetDelay || a.model.isEdge(g) ? k : null, null != r && l) {
      f = [I, G, x, C, B, D];
      for (l = 0; l < f.length; l++) null != f[l].parentNode && f[l].parentNode.removeChild(f[l]);
      a.model.isEdge(g) ? (n = k.absolutePoints, null != n && (l = n[0], n = n[n.length - 1], f = a.tolerance, new mxRectangle(c - f, d - f, 2 * f, 2 * f), I.style.left = Math.floor(l.x -
        this.roundDrop.width / 2) + "px", I.style.top = Math.floor(l.y - this.roundDrop.height / 2) + "px", G.style.left = Math.floor(n.x - this.roundDrop.width / 2) + "px", G.style.top = Math.floor(n.y - this.roundDrop.height / 2) + "px", null == a.model.getTerminal(g, !0) && a.container.appendChild(I), null == a.model.getTerminal(g, !1) && a.container.appendChild(G))) : (l = mxRectangle.fromRectangle(k), null != k.shape && null != k.shape.boundingBox && (l = mxRectangle.fromRectangle(k.shape.boundingBox)), l.grow(this.graph.tolerance), l.grow(HoverIcons.prototype.arrowSpacing),
        n = this.graph.selectionCellsHandler.getHandler(k.cell), null != n && (l.x -= n.horizontalOffset / 2, l.y -= n.verticalOffset / 2, l.width += n.horizontalOffset, l.height += n.verticalOffset, null != n.rotationShape && null != n.rotationShape.node && "hidden" != n.rotationShape.node.style.visibility && "none" != n.rotationShape.node.style.display && null != n.rotationShape.boundingBox && l.add(n.rotationShape.boundingBox)), x.style.left = Math.floor(k.getCenterX() - this.triangleUp.width / 2) + "px", x.style.top = Math.floor(l.y - this.triangleUp.height) +
        "px", C.style.left = Math.floor(l.x + l.width) + "px", C.style.top = Math.floor(k.getCenterY() - this.triangleRight.height / 2) + "px", B.style.left = x.style.left, B.style.top = Math.floor(l.y + l.height) + "px", D.style.left = Math.floor(l.x - this.triangleLeft.width) + "px", D.style.top = C.style.top, "eastwest" != k.style.portConstraint && (a.container.appendChild(x), a.container.appendChild(B)), a.container.appendChild(C), a.container.appendChild(D));
      null != k && (w = a.selectionCellsHandler.getHandler(k.cell), null != w && null != w.setHandlesVisible &&
      w.setHandlesVisible(!1));
      y = !0
    } else for (f = [I, G, x, C, B, D], l = 0; l < f.length; l++) null != f[l].parentNode && f[l].parentNode.removeChild(f[l]);
    y || null == w || w.setHandlesVisible(!0);
    g = mxEvent.isAltDown(e) && !mxEvent.isShiftDown(e) || null != t && E == A ? null : mxDragSource.prototype.getDropTarget.apply(this, arguments);
    f = a.getModel();
    if (null != g && (null != E || !a.isSplitTarget(g, b, e))) {
      for (; null != g && !a.isValidDropTarget(g, b, e) && f.isVertex(f.getParent(g));) g = f.getParent(g);
      null != g && (a.view.currentRoot == g || !a.isValidRoot(g) && 0 == a.getModel().getChildCount(g) ||
        a.isCellLocked(g) || f.isEdge(g) || !a.isValidDropTarget(g, b, e)) && (g = null)
    }
    return g
  });
  v.stopDrag = function () {
    mxDragSource.prototype.stopDrag.apply(this, arguments);
    for (var a = [I, G, A, x, C, B, D], b = 0; b < a.length; b++) null != a[b].parentNode && a[b].parentNode.removeChild(a[b]);
    null != r && null != w && w.reset();
    E = F = t = r = w = null
  };
  return v
};
Sidebar.prototype.itemClicked = function (a, c, d, b) {
  b = this.editorUi.editor.graph;
  b.container.focus();
  if (mxEvent.isAltDown(d) && 1 == b.getSelectionCount() && b.model.isVertex(b.getSelectionCell())) {
    c = null;
    for (var f = 0; f < a.length && null == c; f++) b.model.isVertex(a[f]) && (c = f);
    null != c && (b.setSelectionCells(this.dropAndConnect(b.getSelectionCell(), a, mxEvent.isMetaDown(d) || mxEvent.isControlDown(d) ? mxEvent.isShiftDown(d) ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH : mxEvent.isShiftDown(d) ? mxConstants.DIRECTION_EAST :
      mxConstants.DIRECTION_SOUTH, c, d)), b.scrollCellToVisible(b.getSelectionCell()))
  } else mxEvent.isShiftDown(d) && !b.isSelectionEmpty() ? (this.updateShapes(a[0], b.getSelectionCells()), b.scrollCellToVisible(b.getSelectionCell())) : (a = mxEvent.isAltDown(d) ? b.getFreeInsertPoint() : b.getCenterInsertPoint(b.getBoundingBoxFromGeometry(a, !0)), c.drop(b, d, null, a.x, a.y, !0))
};
Sidebar.prototype.addClickHandler = function (a, c, d) {
  var b = c.mouseDown, f = c.mouseMove, e = c.mouseUp, h = this.editorUi.editor.graph.tolerance, g = null, k = this;
  c.mouseDown = function (c) {
    b.apply(this, arguments);
    g = new mxPoint(mxEvent.getClientX(c), mxEvent.getClientY(c));
    null != this.dragElement && (this.dragElement.style.display = "none", mxUtils.setOpacity(a, 50))
  };
  c.mouseMove = function (b) {
    null != this.dragElement && "none" == this.dragElement.style.display && null != g && (Math.abs(g.x - mxEvent.getClientX(b)) > h || Math.abs(g.y - mxEvent.getClientY(b)) >
      h) && (this.dragElement.style.display = "", mxUtils.setOpacity(a, 100));
    f.apply(this, arguments)
  };
  c.mouseUp = function (b) {
    try {
      mxEvent.isPopupTrigger(b) || null != this.currentGraph || null == this.dragElement || "none" != this.dragElement.style.display || k.itemClicked(d, c, b, a), e.apply(c, arguments), mxUtils.setOpacity(a, 100), g = null, k.currentElt = a
    } catch (m) {
      c.reset(), k.editorUi.handleError(m)
    }
  }
};
Sidebar.prototype.createVertexTemplateEntry = function (a, c, d, b, f, e, h, g) {
  var _g = '';
  if (g) {
    _g = g;
  } else {
    if (f) {
      _g = f.toLowerCase();
    }
  }
  return this.addEntry(_g, mxUtils.bind(this, function () {
    return this.createVertexTemplate(a, c, d, b, f, e, h)
  }))
};
// 生成侧边栏里的拖拽元素们 c-width d-height
Sidebar.prototype.createShapeToolItem = function (a, width, height, b, f, e, h) {
  return mxUtils.bind(this, function () {
    return this.createVertexTemplate(a, width, height, b, f, e, h)
  });
};

Sidebar.prototype.createVertexTemplate = function (a, c, d, b, f, e, h, g) {
  a = [new mxCell(null != b ? b : "", new mxGeometry(0, 0, c, d), a)];
  a[0].vertex = !0;
  return this.createVertexTemplateFromCells(a, c, d, f, e, h, g)
};
Sidebar.prototype.createVertexTemplateFromData = function (a, c, d, b, f, e, h) {
  a = mxUtils.parseXml(Graph.decompress(a));
  var g = new mxCodec(a), k = new mxGraphModel;
  g.decode(a.documentElement, k);
  a = this.graph.cloneCells(k.root.getChildAt(0).children);
  return this.createVertexTemplateFromCells(a, c, d, b, f, e, h)
};
Sidebar.prototype.createVertexTemplateFromCells = function (a, c, d, b, f, e, h) {
  return this.createItem(a, b, f, e, c, d, h)
};
Sidebar.prototype.createEdgeTemplateEntry = function (a, c, d, b, f, e, h, g) {
  h = null != h && 0 < h.length ? h : f.toLowerCase();
  return this.addEntry(h, mxUtils.bind(this, function () {
    return this.createEdgeTemplate(a, c, d, b, f, e, g)
  }))
};
Sidebar.prototype.createEdgeTemplate = function (a, c, d, b, f, e, h) {
  a = new mxCell(null != b ? b : "", new mxGeometry(0, 0, c, d), a);
  a.geometry.setTerminalPoint(new mxPoint(0, d), !0);
  a.geometry.setTerminalPoint(new mxPoint(c, 0), !1);
  a.geometry.relative = !0;
  a.edge = !0;
  return this.createEdgeTemplateFromCells([a], c, d, f, e, h)
};
Sidebar.prototype.createEdgeTemplateFromCells = function (a, c, d, b, f, e) {
  return this.createItem(a, b, f, !0, c, d, e)
};
Sidebar.prototype.addPaletteFunctions = function (a, c, d, b) {
  this.addPalette(a, c, d, mxUtils.bind(this, function (a) {
    for (var c = 0; c < b.length; c++) a.appendChild(b[c](a))
  }))
};
Sidebar.prototype.addPalette = function (a, c, d, b) {
  c = this.createTitle(c);
  this.container.appendChild(c);
  var f = document.createElement("div");
  f.className = "geSidebar";
  mxClient.IS_POINTER && (f.style.touchAction = "none");
  d ? (b(f), b = null) : f.style.display = "none";
  this.addFoldingHandler(c, f, b);
  d = document.createElement("div");
  d.appendChild(f);
  this.container.appendChild(d);
  null != a && (this.palettes[a] = [c, d]);
  return f
};
Sidebar.prototype.addFoldingHandler = function (a, c, d) {
  var b = !1;
  if (!mxClient.IS_IE || 8 <= document.documentMode) a.style.backgroundImage = "none" == c.style.display ? "url('" + this.collapsedImage + "')" : "url('" + this.expandedImage + "')";
  a.style.backgroundRepeat = "no-repeat";
  a.style.backgroundPosition = "0% 50%";
  mxEvent.addListener(a, "click", mxUtils.bind(this, function (f) {
    if ("none" == c.style.display) {
      if (b) c.style.display = "block"; else if (b = !0, null != d) {
        a.style.cursor = "wait";
        var e = a.innerHTML;
        a.innerHTML = mxResources.get("loading") +
          "...";
        window.setTimeout(function () {
          c.style.display = "block";
          a.style.cursor = "";
          a.innerHTML = e;
          var b = mxClient.NO_FO;
          mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
          d(c, a);
          mxClient.NO_FO = b
        }, mxClient.IS_FF ? 20 : 0)
      } else c.style.display = "block";
      a.style.backgroundImage = "url('" + this.expandedImage + "')"
    } else a.style.backgroundImage = "url('" + this.collapsedImage + "')", c.style.display = "none";
    mxEvent.consume(f)
  }));
  mxClient.IS_QUIRKS || mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this,
    function (a) {
      a.preventDefault()
    }))
};
Sidebar.prototype.removePalette = function (a) {
  var c = this.palettes[a];
  if (null != c) {
    this.palettes[a] = null;
    for (a = 0; a < c.length; a++) this.container.removeChild(c[a]);
    return !0
  }
  return !1
};
Sidebar.prototype.addImagePalette = function (a, c, d, b, f, e, h) {
  for (var g = [], k = 0; k < f.length; k++) mxUtils.bind(this, function (a, c, e) {
    if (null == e) {
      e = a.lastIndexOf("/");
      var f = a.lastIndexOf(".");
      e = a.substring(0 <= e ? e + 1 : 0, 0 <= f ? f : a.length).replace(/[-_]/g, " ")
    }
    g.push(this.createVertexTemplateEntry("image;html=1;labelBackgroundColor=#ffffff;image=" + d + a + b, this.defaultImageWidth, this.defaultImageHeight, "", c, null != c, null, this.filterTags(e)))
  })(f[k], null != e ? e[k] : null, null != h ? h[f[k]] : null);
  this.addPaletteFunctions(a, c,
    !1, g)
};
Sidebar.prototype.getTagsForStencil = function (a, c, d) {
  a = a.split(".");
  for (var b = 1; b < a.length; b++) a[b] = a[b].replace(/_/g, " ");
  a.push(c.replace(/_/g, " "));
  null != d && a.push(d);
  return a.slice(1, a.length)
};
Sidebar.prototype.addStencilPalette = function (a, c, d, b, f, e, h, g, k) {
  h = null != h ? h : 1;
  if (this.addStencilsToIndex) {
    var l = [];
    if (null != k) for (var m = 0; m < k.length; m++) l.push(k[m]);
    mxStencilRegistry.loadStencilSet(d, mxUtils.bind(this, function (a, c, d, e, k) {
        if (null == f || 0 > mxUtils.indexOf(f, c)) {
          d = this.getTagsForStencil(a, c);
          var m = null != g ? g[c] : null;
          null != m && d.push(m);
          l.push(this.createVertexTemplateEntry("shape=" + a + c.toLowerCase() + b, Math.round(e * h), Math.round(k * h), "", c.replace(/_/g, " "), null, null, this.filterTags(d.join(" "))))
        }
      }),
      !0, !0);
    this.addPaletteFunctions(a, c, !1, l)
  } else this.addPalette(a, c, !1, mxUtils.bind(this, function (a) {
    null == b && (b = "");
    null != e && e.call(this, a);
    if (null != k) for (var c = 0; c < k.length; c++) k[c](a);
    mxStencilRegistry.loadStencilSet(d, mxUtils.bind(this, function (c, d, e, g, k) {
      (null == f || 0 > mxUtils.indexOf(f, d)) && a.appendChild(this.createVertexTemplate("shape=" + c + d.toLowerCase() + b, Math.round(g * h), Math.round(k * h), "", d.replace(/_/g, " "), !0))
    }), !0)
  }))
};
Sidebar.prototype.destroy = function () {
  null != this.graph && (null != this.graph.container && null != this.graph.container.parentNode && this.graph.container.parentNode.removeChild(this.graph.container), this.graph.destroy(), this.graph = null);
  null != this.pointerUpHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointerup" : "mouseup", this.pointerUpHandler), this.pointerUpHandler = null);
  null != this.pointerDownHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointerdown" : "mousedown", this.pointerDownHandler),
    this.pointerDownHandler = null);
  null != this.pointerMoveHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointermove" : "mousemove", this.pointerMoveHandler), this.pointerMoveHandler = null);
  null != this.pointerOutHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointerout" : "mouseout", this.pointerOutHandler), this.pointerOutHandler = null)
};

window.Sidebar = Sidebar;