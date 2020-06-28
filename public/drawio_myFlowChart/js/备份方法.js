App.prototype.checkDrafts = function () {
  try {
    var a = Editor.guid();
    localStorage.setItem(".draft-alive-check", a);
    window.setTimeout(mxUtils.bind(this, function () {
      localStorage.removeItem(".draft-alive-check");
      this.getDatabaseItems(mxUtils.bind(this, function (e) {
        for (var c = [], b = 0; b < e.length; b++) try {
          var k = e[b].key;
          if (null != k && ".draft_" == k.substring(0, 7)) {
            var f = JSON.parse(e[b].data);
            null != f && "draft" == f.type && f.aliveCheck != a && (f.key = k, c.push(f))
          }
        } catch (l) {
        }
        1 == c.length ? this.loadDraft(c[0].data, mxUtils.bind(this, function () {
            this.removeDatabaseItem(c[0].key)
          })) :
          1 < c.length ? (e = new Date(c[0].modified), e = new DraftDialog(this, 1 < c.length ? mxResources.get("selectDraft") : mxResources.get("draftFound", [e.toLocaleDateString() + " " + e.toLocaleTimeString()]), 1 < c.length ? null : c[0].data, mxUtils.bind(this, function (a) {
            this.hideDialog();
            a = "" != a ? a : 0;
            this.loadDraft(c[a].data, mxUtils.bind(this, function () {
              this.removeDatabaseItem(c[a].key)
            }))
          }), mxUtils.bind(this, function (a, b) {
            a = "" != a ? a : 0;
            this.confirm(mxResources.get("areYouSure"), null, mxUtils.bind(this, function () {
              this.removeDatabaseItem(c[a].key);
              null != b && b()
            }), mxResources.get("no"), mxResources.get("yes"))
          }), null, null, null, 1 < c.length ? c : null), this.showDialog(e.container, 640, 480, !0, !1, mxUtils.bind(this, function (a) {
            "0" == urlParams.splash ? this.createFile(this.defaultFilename, this.getFileData(), null, null, null, null, null, !0) : this.loadFile()
          })), e.init()) : "0" != urlParams.splash ? this.loadFile() : this.createFile(this.defaultFilename, this.getFileData(), null, null, null, null, null, !0)
      }), mxUtils.bind(this, function () {
        "0" != urlParams.splash ? this.loadFile() : this.createFile(this.defaultFilename,
          this.getFileData(), null, null, null, null, null, !0)
      }))
    }), 0)
  } catch (e) {
  }
};