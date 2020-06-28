/**
 * 把旧流程数据整理成 mxgrapn xml的格式
 * Created by tangyue on 20/5/11
 */
var FJ = function () {

};

FJ.prototype.prefix = 'frontId-cell-';
FJ.prototype.nextId = 0;
FJ.prototype.init = function () {
  this.nextId = 0;// 重置nextId为0;
};
// FJ.prototype.createId = function () {
//   var id = this.nextId;
//   this.nextId++;
//   return this.prefix + id;
// };
FJ.prototype.createId = function () {
  return new Date().getTime()
};

/**
 * 生成style
 * @param type 类型：node-节点：使用图片。link-连线
 * @param data
 */
FJ.prototype.createStyle = function (type, data) {
  var str = '';
  if (type === 'node') {
    str = 'image;html=1;labelBackgroundColor=#ffffff;image=images/iconImg/' + this.getImgSrc(data) + '.png';
  }else if(type === 'link'){// todo 连线的颜色未设置
    str = 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;'
  }

  return str;
};
FJ.prototype.getNodeById = function(nodesObj, id){
 for(var i in nodesObj){
   var node = nodesObj[i];
   if(node.hashId == id){
     return node;
   }
 }
};
// 先按照名字给配几个图片
FJ.prototype.getImgSrc = function (nodeData) {
  var nodeType = nodeData.type;
  if(nodeType.constructor === String){
    nodeType = Number(nodeType)
  }
  var nodeImg = 'ic_lc4';// 默认图片
  switch (nodeType) {
    case 4://开始
      nodeImg = 'ic_lc1';
      break;
    case 1:// 拟稿人
      nodeImg = 'ic_lc4';
      break;
    case 5:
      nodeImg = 'ic_lc6';
      break;
    default:
      break;
  }
  return nodeImg;
};

FJ.prototype.generateCellsListObj = function (nodes) {
  var nodesObj = {};
  var nodesObj2 = {};
  for (var i = 0, len = nodes.length; i < len; i++) {
    var node = nodes[i];
    // 把节点合并
    if (node.hashId && node.id) {// hashId 与id 同时存在的，取hashId作为前端的唯一id
      if (!nodesObj[node.hashId]) {
        nodesObj[node.hashId] = node;
      } else {
        nodesObj[node.hashId] = Object.assign(nodesObj[node.hashId], node)
      }
    } else if (node.id) {// 只有id的，id就是上面那种节点的hashId
      if (!nodesObj[node.id]) {
        nodesObj[node.id] = node;
      } else {
        nodesObj[node.id] = Object.assign(nodesObj[node.id], node)
      }
    }
  }

  for (var j in nodesObj) {
    var _node = nodesObj[j];
    var frontId = j;
    var newNode = {
      frontId: frontId,// 生成前端id
      style: this.createStyle('node', _node),
      name: _node.name,
      hashId: j,
      xpoint: _node.xpoint,
      ypoint: _node.ypoint
    };
    nodesObj2[frontId] = newNode;
  }
  return nodesObj2;
};
// 把我们的json整理成mxgrapn xml的格式
FJ.prototype.testFn = function (nodes, links) {
  // 固定的开头
  var str1 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<mxfile>\n' +
    '  <diagram id="0" name="第 1 页">\n' +
    '<mxGraphModel>\n' +
    '      <root>\n' +
    '        <mxCell id="0" />\n' +
    '        <mxCell id="1" parent="0" />';

  // 固定的结尾
  var strEnding = '</root>\n' +
    '    </mxGraphModel>\n' +
    '  </diagram>\n' +
    '</mxfile>';

  // 做节点
  var nodesStr = '';
  var mxCellsListObj = this.generateCellsListObj(nodes);
  for (var i in mxCellsListObj) {
    var cell = mxCellsListObj[i];
    var cellStr = '<object label="" name="' + cell.name + '" hashId="' + cell.hashId + '" id="' + cell.frontId + '">\n' +
      '          <mxCell style="' + cell.style + '" parent="1" vertex="1">\n' +
      '            <mxGeometry x="' + cell.xpoint + '" y="' + cell.ypoint + '" width="40" height="40" as="geometry" />\n' +
      '          </mxCell>\n' +
      '        </object>';
    nodesStr += cellStr;
  }

  // 做连线
  var linksStr = '';
  for(var j = 0,len = links.length;j<len;j++){
    var link = links[j];
    var frontId = link.id || this.createId();
    var styleStr = this.createStyle('link', link);
    var soureFrontId = this.getNodeById(mxCellsListObj, link.from).frontId;
    var targetFrontId = this.getNodeById(mxCellsListObj, link.to).frontId;
    var linkStr = '<mxCell id="'+ frontId +'" style="' + styleStr + '"\n' +
      'edge="1" parent="1" source="'+ soureFrontId +'" target="'+ targetFrontId +'">\n' +
      '          <mxGeometry relative="1" as="geometry" />\n' +
      '        </mxCell>';
    linksStr += linkStr;
  }
  var finalString = str1 + nodesStr + linksStr + strEnding;
  return finalString;
};
