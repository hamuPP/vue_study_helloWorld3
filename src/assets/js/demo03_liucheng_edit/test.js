/**
 * Created by tangyue on 20/4/26
 */
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

function mxDragSource(a, b) {
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
}