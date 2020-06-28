/**
 * Created by tangyue on 20/4/26
 */
//
const addListener = function () {
  return window.addEventListener ? function (a, b, c) {
    a.addEventListener(b, c, !1);
    null == a.mxListenerList && (a.mxListenerList = []);
    a.mxListenerList.push({name: b, f: c})
  } : function (a, b, c) {
    a.attachEvent("on" + b, c);
    null == a.mxListenerList && (a.mxListenerList = []);
    a.mxListenerList.push({name: b, f: c})
  }
};