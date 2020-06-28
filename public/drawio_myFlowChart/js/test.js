var StorageDialog = function (a, e, c) {
  function b(d, b, f, k, u, v) {
    function l() {
      mxEvent.addListener(x, "click", null != v ? v : function () {
        f != App.MODE_GOOGLE || a.isDriveDomain() ? f == App.MODE_GOOGLE && a.spinner.spin(document.body, mxResources.get("authorizing")) ? a.drive.checkToken(mxUtils.bind(this, function () {
          a.spinner.stop();
          a.setMode(f, g.checked);
          e()
        })) : f == App.MODE_ONEDRIVE && a.spinner.spin(document.body, mxResources.get("authorizing")) ? a.oneDrive.checkToken(mxUtils.bind(this, function () {
          a.spinner.stop();
          a.setMode(f, g.checked);
          e()
        })) : (a.setMode(f, g.checked), e()) : window.location.hostname = DriveClient.prototype.newAppHostname
      })
    }

    ++m > c && (mxUtils.br(n), m = 0);
    var x = document.createElement("a");
    x.style.overflow = "hidden";
    x.style.display = mxClient.IS_QUIRKS ? "inline" : "inline-block";
    x.className = "geBaseButton";
    x.style.boxSizing = "border-box";
    x.style.fontSize = "11px";
    x.style.position = "relative";
    x.style.margin = "4px";
    x.style.marginTop = "2px";
    x.style.padding = "8px 10px 12px 10px";
    x.style.width = "88px";
    x.style.height = StorageDialog.extended ? "50px" :
      "100px";
    x.style.whiteSpace = "nowrap";
    x.setAttribute("title", b);
    mxClient.IS_QUIRKS && (x.style.cssFloat = "left", x.style.zoom = "1");
    var q = document.createElement("div");
    q.style.textOverflow = "ellipsis";
    q.style.overflow = "hidden";
    if (null != d) {
      var t = document.createElement("img");
      t.setAttribute("src", d);
      t.setAttribute("border", "0");
      t.setAttribute("align", "absmiddle");
      t.style.width = StorageDialog.extended ? "24px" : "60px";
      t.style.height = StorageDialog.extended ? "24px" : "60px";
      t.style.paddingBottom = StorageDialog.extended ?
        "4px" : "6px";
      x.appendChild(t)
    } else q.style.paddingTop = "5px", q.style.whiteSpace = "normal", mxClient.IS_FF && (q.style.paddingTop = "0px", q.style.marginTop = "-2px");
    StorageDialog.extended && (x.style.paddingTop = "4px", x.style.marginBottom = "0px", q.display = "inline-block", 2 == c && (t.style.width = "38px", t.style.height = "38px", x.style.width = "80px", x.style.height = "68px"));
    x.appendChild(q);
    mxUtils.write(q, b);
    if (null != u) for (d = 0; d < u.length; d++) mxUtils.br(q),
      mxUtils.write(q, u[d]);
    if (null != k && null == a[k]) {
      t.style.visibility = "hidden";
      mxUtils.setOpacity(q, 10);
      var B = new Spinner({
        lines: 12,
        length: 12,
        width: 5,
        radius: 10,
        rotate: 0,
        color: "dark" == uiTheme ? "#c0c0c0" : "#000",
        speed: 1.5,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        top: "40%",
        zIndex: 2E9
      });
      B.spin(x);
      var C = window.setTimeout(function () {
        null == a[k] && (B.stop(), x.style.display = "none")
      }, 3E4);
      a.addListener("clientLoaded", mxUtils.bind(this, function (d, b) {
        null != a[k] && b.getProperty("client") == a[k] && (window.clearTimeout(C), mxUtils.setOpacity(q,
          100), t.style.visibility = "", B.stop(), l(), "drive" == k && null != p.parentNode && p.parentNode.removeChild(p))
      }))
    } else l();
    n.appendChild(x)
  }

  c = null != c ? c : 2;
  var k = document.createElement("div");
  k.style.textAlign = "center";
  k.style.whiteSpace = "nowrap";
  k.style.paddingTop = "0px";
  k.style.paddingBottom = "20px";
  var f = a.addLanguageMenu(k, !0);
  null != f && (f.style.bottom = parseInt("28px") - 3 + "px");
  if (!a.isOffline() && 1 < a.getServiceCount()) {
    f = document.createElement("a");
    f.setAttribute("href", "https://about.draw.io/support/");
    f.setAttribute("title",
      mxResources.get("help"));
    f.setAttribute("target", "_blank");
    f.style.position = "absolute";
    f.style.userSelect = "none";
    f.style.textDecoration = "none";
    f.style.cursor = "pointer";
    f.style.fontSize = "12px";
    f.style.bottom = "28px";
    f.style.left = "26px";
    f.style.color = "gray";
    var l = document.createElement("img");
    mxUtils.setOpacity(l, 50);
    l.style.height = "16px";
    l.style.width = "16px";
    l.setAttribute("border", "0");
    l.setAttribute("valign", "bottom");
    l.setAttribute("src", Editor.helpImage);
    l.style.marginRight = "2px";
    f.appendChild(l);
    mxUtils.write(f, mxResources.get("help"));
    k.appendChild(f)
  }
  var d = document.createElement("div");
  d.style.position = "absolute";
  d.style.cursor = "pointer";
  d.style.fontSize = "12px";
  d.style.bottom = "28px";
  d.style.color = "gray";
  d.style.userSelect = "none";
  mxUtils.write(d, mxResources.get("decideLater"));
  mxUtils.setPrefixedStyle(d.style, "transform", "translate(-50%,0)");
  d.style.left = "50%";
  this.init = function () {
    if (mxClient.IS_QUIRKS || 8 == document.documentMode) d.style.marginLeft = -Math.round(d.clientWidth / 2) + "px"
  };
  k.appendChild(d);
  mxEvent.addListener(d, "click", function () {
    a.hideDialog();
    var d = Editor.useLocalStorage;
    a.createFile(a.defaultFilename, null, null, null, null, null, null, !0);
    Editor.useLocalStorage = d
  });
  f = document.createElement("div");
  mxClient.IS_QUIRKS && (f.style.whiteSpace = "nowrap", f.style.cssFloat = "left");
  f.style.border = "1px solid #d3d3d3";
  f.style.borderWidth = "1px 0px 1px 0px";
  f.style.padding = "12px 0px 12px 0px";
  var g_0909 = document.createElement("input");
  g_0909.setAttribute("type", "checkbox");
  g_0909.setAttribute("checked", "checked");
  g_0909.defaultChecked = !0;
  var m = 0, n = document.createElement("div");
  n.style.paddingTop = "2px";
  f.appendChild(n);
  var p = document.createElement("p"), l = document.createElement("p");
  l.style.fontSize = "16pt";
  l.style.padding = "0px";
  l.style.paddingTop = "4px";
  l.style.paddingBottom = "16px";
  l.style.margin = "0px";
  l.style.color = "gray";
  mxUtils.write(l, mxResources.get("saveDiagramsTo") + ":");
  k.appendChild(l);
  var v = function () {
    m = 0;
    b(IMAGE_PATH + "/osa_drive-harddisk.png", mxResources.get("device"), App.MODE_DEVICE);
    !isLocalStorage || "1" != urlParams.browser && "1" != urlParams.offline || b(IMAGE_PATH + "/osa_database.png", mxResources.get("browser"), App.MODE_BROWSER);
  };
  k.appendChild(f);
  v();
  l = document.createElement("p");
  l.style.marginTop = "8px";
  l.style.marginBottom = "6px";

  q = a.getRecent();
  debugger;
  if (null != q && 0 < q.length) {
    var y = document.createElement("select");
    y.style.marginTop = "8px";
    y.style.maxWidth = "170px";
    var z = document.createElement("option");
    z.setAttribute("value", "");
    z.setAttribute("selected", "selected");
    z.style.textAlign = "center";
    mxUtils.write(z, mxResources.get("openRecent") + "...");
    y.appendChild(z);
    for (z = 0; z < q.length; z++) (function (a) {
      var d =
        a.mode;
      d == App.MODE_GOOGLE ? d = "googleDrive" : d == App.MODE_ONEDRIVE && (d = "oneDrive");
      var b = document.createElement("option");
      b.setAttribute("value", a.id);
      mxUtils.write(b, a.title + " (" + mxResources.get(d) + ")");
      y.appendChild(b)
    })(q[z]);
    l.appendChild(y);
    mxEvent.addListener(y, "change", function (d) {
      "" != y.value && a.loadFile(y.value)
    })
  } else{
    l.style.marginTop = "20px", f.style.padding = "30px 0px 26px 0px";
  }
  debugger;
  // Graph.fileSupport && (q = document.createElement("div"), q.style.marginBottom = "10px", q.style.padding = "18px 0px 6px 0px",
  //   z = document.createElement("a"), z.style.cursor = "pointer", z.style.fontSize = "12px", z.style.color = "gray", z.style.userSelect = "none", mxUtils.write(z, mxResources.get("import") + ": " + mxResources.get("gliffy") + ", " + mxResources.get("formatVssx") + ", " + mxResources.get("formatVsdx") + ", " + mxResources.get("lucidchart") + "..."), mxEvent.addListener(z, "click", function () {
  //   if (null == a.storageFileInputElt) {
  //     var d = document.createElement("input");
  //     d.setAttribute("type", "file");
  //     mxEvent.addListener(d, "change", function () {
  //       null != d.files &&
  //       (a.hideDialog(), a.openFiles(d.files, !0), d.type = "", d.type = "file", d.value = "")
  //     });
  //     d.style.display = "none";
  //     document.body.appendChild(d);
  //     a.storageFileInputElt = d
  //   }
  //   a.storageFileInputElt.click()
  // }), q.appendChild(z), l.appendChild(q), f.style.paddingBottom = "4px");
  f.appendChild(l);
  // mxEvent.addListener(u, "click", function (a) {
  //   g.checked = !g.checked;
  //   mxEvent.consume(a)
  // });
  // mxClient.IS_SVG && isLocalStorage && "0" != urlParams.gapi && (null == document.documentMode || 10 <= document.documentMode) && window.setTimeout(function () {
  //   null == a.drive &&
  //   (p.style.padding = "8px", p.style.fontSize = "9pt", p.style.marginTop = "-14px", p.innerHTML = '<a style="background-color:#dcdcdc;padding:5px;color:black;text-decoration:none;" href="https://desk.draw.io/a/solutions/articles/16000074659" target="_blank"><img border="0" src="' + mxGraph.prototype.warningImage.src + '" align="top"> ' + mxResources.get("googleDriveMissingClickHere") + "</a>", k.appendChild(p))
  // }, 5E3);
  this.container = k
};