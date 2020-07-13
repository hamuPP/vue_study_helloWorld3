/**
 * Created by tangyue on 20/5/11
 * 我个人的业务相关的代码，需要放在varsSetting.js之后，因为会用到varsSetting中定义的方法和变量
 */
(function () {
  var liuchengOptionsList = [];
  var orgData = [];
  // 从input type=radio的集合中，找到选中的那个radio
  var _getCheckedRaidio = function (radioList) {
    for (var i = 0, len = radioList.length; i < len; i++) {
      var radio = radioList[i];
      if (radio.checked) {
        return radio;
      }
    }
  };
  /**
   * 将Nodes整理成保存的后端接口的格式：
   * 如果节点上有设置的数据，其在value.attributes里面，不要第一个，第一个现在是默认的字段
   */
  var formateNodesForBackend = function (nodes) {
    var resultNodes = [];
    for (var i in nodes) {
      var node = nodes[i];
      var nodeValue = node.value;
      var attributes = nodeValue ? nodeValue.attributes : null;
      // 找到名称字段:name
      var _name = '';
      var formatedObj = {
        name: _name,
        hashId: i,
        id: i,
        // xmlDescription: todo 是xml，现在没有
      };
      // 找到其余字段：todo 待定，其余字段还没整
      if (attributes) {
        for (var j = 0, len = attributes.length; j < len; j++) {
          if (attributes[j].name !== 'label' && attributes[j].name !== 'xmlns') {// 是默认的那个节点，不要
            var value = JSON.parse(attributes[j].value);
            var children = value.children;
            if (children && children.length) {
              for (var c = 0, clen = children.length; c < clen; c++) {
                var _child = children[c];
                formatedObj[_child.name] = _child.defaultValue;
              }
            }
          }
        }
      }
      resultNodes.push(formatedObj)
    }
    return resultNodes;
  };

  var formateLinesForBackend = function (lines) {
    var resultLines = [];
    // 目前先把from to 给整出来
    for (var i in lines) {
      var line = lines[i];
      var lineSourceCell = line.source;// 连线的起点
      var lineTargetCell = line.target;// 连线的终点
      // 找到起点的hashId
      var lineSourceCellHashId = lineSourceCell.id;// todo
      // 找到终点的hashId
      var lineTargetCellHashId = lineTargetCell.id;// todo 如果连线没有连上节点，则这里会报错
      resultLines.push({
        id: '',
        name: '',
        from: lineSourceCellHashId,
        to: lineTargetCellHashId
      });
    }

    return resultLines;
  };

  // 增加一个流程类型的下拉框
  var _addFlowChartSelect = function (scope, wrapperElement) {
    var searchUrl = baseUrl + getWorkFlowUrl;
    var headers = {// 测试加入自定义的headers的例子
      // myHeaderKey: 'test my header value'
    };
    var eleSelect = document.createElement("select");
    eleSelect.addEventListener('change', function (a) {
      var selectedValue = a.target.value;// 当前选中的值
      console.log(selectedValue)
      var FJInstance = new FJ();
      var queryData = {
        // boId: 145556821,
        workflowid: selectedValue,
        businessType: 'ProjectApply'
      };
      mxUtils.post(searchUrl, headers, queryData, function (mxXmlRequest) {
          var resText = mxXmlRequest.getText();
          if (resText) {
            var res = JSON.parse(mxXmlRequest.getText());
            if (res.dataList && res.dataList.length) {
              var id = scope.wfid = res.dataList[0].id || '';
              var resData = res.dataList[0];
              var xmldata = resData.xmldata;
              var fileName = resData.name || '未命名流程';

              //DiagramPage.prototype.setName??是否可以？
              // 文件名
              scope.currentFile.title = fileName;
              scope.fname.innerHTML = fileName;

              // 如果xmldata 不是以<?xml开头的，则是旧的数据，处理成符合xmgraph的格式
              if (xmldata) {
                if (xmldata.indexOf('<?xml') < 0) {
                  var newData = FJInstance.testFn(resData.nodes, resData.links);
                  var file = new File([newData], fileName, {
                    type: "text/html",
                  });
                  EditorUi.prototype.importLocalFile_me(scope, [file])
                } else {// 新保存的流程图
                  debugger;//
                  // var newData2 = FJInstance.testFn(resData.nodes, resData.links);
                  var file2 = new File([xmldata], fileName, {
                    type: "text/html",
                  });
                  EditorUi.prototype.importLocalFile_me(scope, [file2])

                }
              }
            }
          }
        },
      )

    });
    wrapperElement.appendChild(eleSelect);

    var listheaders = {};
    var listsearchUrl = baseUrl + getWorkFlowListUrl;
    var listqueryData = {
      businessType: 'ProjectApply',
      pageNum: 0,
      pageSize: 10000,
      name: ''
    };
    mxUtils.post(listsearchUrl, listheaders, listqueryData, function (mxXmlRequest) {
      var resText = mxXmlRequest.getText();
      try {
        var res = JSON.parse(resText);
        if (res && res.dataList && res.dataList[0]) {
          var datas = res.dataList[0].page.data;
          var optionsList = [];
          for (var r = 0, rlen = datas.length; r < rlen; r++) {
            optionsList.push({
              value: datas[r].id,
              text: datas[r].workFlowName
            })
          }
          liuchengOptionsList = optionsList;
          for (var i = 0, len = optionsList.length; i < len; i++) {
            let childOpt = optionsList[i];
            var eleOption = document.createElement("option");
            eleOption.setAttribute("value", childOpt.value);
            eleOption.innerHTML = childOpt.text;

            eleSelect.appendChild(eleOption)
          }
          // 切换选中值，查询对应的流程的数据

        }
      } catch (e) {
        mxUtils.alert('网络错误：' + mxXmlRequest.getStatus())
      }
    });
  };

  var _addFlowChartSearch = function (scope, wrapperElement) {
    var eleBox = document.createElement('div');
    var eleInput = document.createElement('input');
    var eleBtn = document.createElement('button');
    eleInput.setAttribute('type', 'text')
    eleBtn.setAttribute('type', 'button');
    eleBtn.className = 'search-btn';
    eleBtn.innerHTML = '查询';
    eleBox.appendChild(eleInput);
    eleBox.appendChild(eleBtn);
    eleBox.className = 'head-search-box';
    wrapperElement.appendChild(eleBox);
    eleBtn.addEventListener('click', function () {
      debugger;
    })

  };
  // 提交到后台的按钮
  var _addSubmitBtn = function (scope, wrapperElement) {
    var eleBtn = document.createElement("div");
    eleBtn.className = 'submit-button';
    eleBtn.innerHTML = '保存';
    eleBtn.addEventListener('click', function (a) {
      // 获取当前画布上的所有cell(包括节点、线、文字，还有默认的两个空节点)
      var currentAllCells = scope.editor.graph.getModel().cells;
      var allNodes = {};//全部的节点（除开线、空节点、文本节点）
      var allNodeSum = 0;

      var allLines = {};
      var allLineSum = 0;// 联线的条数

      var allTextNodes = {};
      var allTextNodeSum = 0;
      for (var i in currentAllCells) {
        if (i != 0 && i != 1) {// 0 和 1是默认的两个空节点，不要
          var obj = currentAllCells[i];
          if (obj.edge) {// 线条
            allLines[i] = obj;
            allLineSum++;
          } else if (obj.style.indexOf('text;html') == 0) {// 文本节点
            allTextNodes[i] = obj;
            allTextNodeSum++;
          } else {
            allNodes[i] = obj;
            allNodeSum++;
          }
        }

      }
      var nodesForBackend = formateNodesForBackend(allNodes);
      var linesForBackend = formateLinesForBackend(allLines);
      // 文件名
      var fileName = scope.getBaseFilename(false);
      // 生成xml文件
      var fileContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + scope.getFileData(true, null, null, null, true, true, null, null, null, true);
      var reqData = {
        verify: false,
        jsondata: JSON.stringify({
          id: scope.wfid || '',// 回显有id
          name: fileName,

          // todo start
          parameters: [],
          filteroute: false,
          "editor": "",
          "editDate": "",
          "httpserverport": "",
          "createUrl": "",
          "timelimit": 0,
          "timelimitunit": "HOUR",
          // todo end
          xmldata: fileContent,
          nodes: nodesForBackend,
          links: linesForBackend
        })
      };
      debugger;
      console.log(reqData.jsondata)
      console.log(reqData.jsondata.constructor)
      var headers = {};
      var saveUrl = baseUrl + saveWorkFlowUrl;

      // 是否可以调用spin???this.spinner.spin(document.body,
      // mxResources.get("loading"))
      scope.spinner.spin(document.body, mxResources.get("loading"));

      mxUtils.post(saveUrl, headers, reqData, function (mxXmlRequest) {
        debugger;
        // 适时使用  scope.spinner.stop();取消loading
        scope.spinner.stop();// 取消loading
        var res = JSON.parse(mxXmlRequest.getText());
        if (res && res.codeMsg) {
          mxUtils.alert('success')
        } else {
          mxUtils.alert('error')
        }

      },)

    });
    wrapperElement.appendChild(eleBtn);
  };

  var _openOrgSelect = function(App){
    debugger;

    // 查询orgData
    var orgUrl =  baseUrl + getOrgTreeUrl;
    var queryData = {
      parentId: clicedOrgId || 0
    };
    mxUtils.post(orgUrl, {}, queryData, function (mxXmlRequest) {

    });

      var clickedInput = event.target;
    var treeTemp = document.getElementById('myTree');// 作为模板的tree
    var newTree = treeTemp.cloneNode(true);
    newTree.removeAttribute('id');
    newTree.setAttribute('class', 'org-select-tree');
    newTree.style.display = 'block';
    clickedInput.parentNode.appendChild(newTree);
    newTree.getElementsByClassName('root-node')[0].addEventListener('dblclick', function(){
      console.log('dblclick')
      var clickedEle = (event || window.event).target;
      console.log(clickedEle)
      if(clickedEle.nodeName === 'LI'){
        var dataset = clickedEle.dataset;
        var value = dataset.id;
        clickedInput.value = 999;
        var mxCell = App.editor.graph.getSelectionCell();// 当前操作的cell
      }
    });

    newTree.getElementsByClassName('root-node')[0].addEventListener('click', function(){
      var clickedEle = (event || window.event).target;
      console.log(clickedEle)
      if(clickedEle.nodeName === 'LI'){
        var dataset = clickedEle.dataset;
        var value = dataset.id;
        clickedInput.value = 999;
      }
    });
  };

  // 节点的参数们
  var nodeLinkProperties = [
    {
      zhName: '节点信息',
      children: [
        {
          name: 'name',
          zhName: '名称',
          field: 'name',
          type: 'input',
          defaultValue: ''
        },
        {
          name: 'sequenceNumber',
          field: 'sequenceNumber',
          zhName: '节点编号',
          type: 'input',
          defaultValue: '0'
        },
        // {
        //   name: 'huiheguanxi',
        //   zhName: '汇合关系',
        //   field: 'huiheguanxi',
        //   type: 'select',
        //   optionList: [
        //     {
        //       text: '111',
        //       value: 11
        //     },
        //     {
        //       text: '222',
        //       value: 22
        //     }, {
        //       text: '333',
        //       value: 33
        //     }, {
        //       text: '444',
        //       value: 44
        //     },
        //   ],
        //   defaultValue: '9'
        // },
        {
          name: 'renwuchaoshi',
          zhName: '任务超时',
          field: 'renwuchaoshi',
          type: 'input',
          defaultValue: '9'
        },
        {
          name: 'renwucuiban',
          zhName: '任务催办',
          field: 'renwucuiban',
          type: 'input',
          defaultValue: '9'
        },
        {
          name: 'renwuduban',
          zhName: '任务督办',
          field: 'renwuduban',
          type: 'input',
          defaultValue: '9'
        },
        {
          name: 'renyuanchuandi',
          zhName: '人员传递',
          field: 'renyuanchuandi',
          type: 'select',
          defaultValue: '9',
          optionList: [
            {
              text: '111',
              value: 11
            },
            {
              text: '222',
              value: 22
            }, {
              text: '333',
              value: 33
            }, {
              text: '444',
              value: 44
            },
          ],
        },
        {
          name: 'bingfaqidian',
          zhName: '并发起点',
          field: 'bingfaqidian',
          type: 'select',
          defaultValue: '9',
          optionList: [
            {
              text: '111',
              value: 11
            },
            {
              text: '222',
              value: 22
            }, {
              text: '333',
              value: 33
            }, {
              text: '444',
              value: 44
            },
          ],
        },
        {
          name: 'morenchuliren',
          zhName: '设置默认处理人节点(特殊用途)',
          field: 'morenchuliren',
          type: 'select',
          defaultValue: '11',
          optionList: [
            {
              text: '111',
              value: 11
            },
            {
              text: '222',
              value: 22
            }, {
              text: '333',
              value: 33
            }, {
              text: '444',
              value: 44
            },
          ],
        },
      ]
    },
    {
      zhName: '实体定义',// todo
      children: []
    },
    {
      zhName: '人员定义',
      children: [
        {
          name: 'org',
          zhName: '组织',
          field: 'org',
          type: 'select-tree-async',
          defaultValue: '1',
          custormClick: '_openOrgSelect',
        },
      ]
    },
    // {
    //   zhName: '实体定义2',// 换一种数据处理方式
    //   children: []
    // },
    {
      zhName: 'URL定义',// 换一种数据处理方式
      children: [
        {
          name: 'basicURL',
          zhName: '基础URL',
          field: 'basicURL',
          type: 'input',
          defaultValue: '的顶顶顶顶顶'
        },
        {
          name: 'daibanxianshi',
          zhName: '待办显示',
          field: 'daibanxianshi',
          type: 'radio',
          radioList: [
            {value: 1, text: '显示'},
            {value: 2, text: '不显示'}
          ],
          defaultValue: 2
        },
        {
          name: 'quanxian',
          zhName: '权限',
          field: 'quanxian',
          type: 'radio',
          radioList: [
            {value: 1, text: '可写'},
            {value: 2, text: '只读'}
          ],
          defaultValue: 1
        },
      ]
    },
    {
      zhName: '子流程',// 换一种数据处理方式
      children: [
        {
          name: 'subworkflowid',
          zhName: '子流程',
          field: 'subworkflowid',
          type: 'select',
          defaultValue: '11',
          optionList: [
            {
              text: '111',
              value: 11
            },
            {
              text: '222',
              value: 22
            }, {
              text: '333',
              value: 33
            }, {
              text: '444',
              value: 44
            },
          ],
        },
      ]
    },

  ];

  // 获取人员传递的下拉列表 2020年05月22日09:54:00
  // var _getRenYuanChuanDiOpList = function (allCells) {
  //   if (!allCells || mxUtils.isObjEmpty(allCells)) {
  //     return false
  //   } else {
  //     var resultList = [];
  //
  //     for (var key in allCells) {
  //       resultList.push({
  //         text: allCells[key].value,
  //         value: key
  //       });
  //
  //     }
  //     return resultList;
  //   }
  // };

  // // 2020年05月22日09:54:24
  // var _getBingfaOpList = function (allCells) {
  //   if (!allCells || mxUtils.isObjEmpty(allCells)) {
  //     return false
  //   } else {
  //     var bingfakaishi = [];
  //     var bingfajieshu = [];
  //     for (var key in allCells) {
  //       if (allCells[key].value == '并发') {
  //         bingfakaishi.push({
  //           text: allCells[key].value,
  //           value: key
  //         })
  //       }
  //       if (allCells[key].value == '汇合') {
  //         bingfajieshu.push({
  //           text: allCells[key].value,
  //           value: key
  //         })
  //       }
  //     }
  //     return {
  //       bingfakaishi: bingfakaishi,
  //       bingfajieshu: bingfajieshu
  //     }
  //   }
  // };

  // 节点的编辑数据弹窗中，写入自己的节点配置
  // allCells全部的节点。需要用全部的节点拼接出人员列表的下拉选项
  var _setMyAttr = function (h, nodeName, allCells) {
    var renyuanchuandiList = allCells.allNodes;
    var bingfaKaiShiList = allCells.bingfakaishi;
    var bingfaJieShuList = allCells.bingfajieshu;
    for (var i = 0, len = nodeLinkProperties.length; i < len; i++) {
      var group = nodeLinkProperties[i];
      var children = group.children;
      for (var c = 0, clen = children.length; c < clen; c++) {
        if (children[c].zhName === '名称' && !children[c].defaultValue) {
          children[c].defaultValue = nodeName;
        }

        if (children[c].zhName === '人员传递') {
          children[c].optionList = renyuanchuandiList;
        }
        if (children[c].zhName === '设置默认处理人节点(特殊用途)') {
          children[c].optionList = renyuanchuandiList;
        }
        if (children[c].zhName === '并发起点') {
          children[c].optionList = bingfaKaiShiList || [];
        }
        if (children[c].zhName === '子流程') {
          children[c].optionList = liuchengOptionsList || [];
        }
      }
      h.setAttribute(group.zhName, JSON.stringify({children: group.children}));
    }
  };

  var findData = function (allData, keyName, keyValue) {
    for (var i = 0, len = allData.length; i < len; i++) {
      var child = allData[i];
      if (child[keyName] == keyValue) {
        return child;
      }
    }
  };

  var _applyFn = function (allParam, mxCell, f, e, countD2, textareaListByGroup, attrNamesByGroup) {
    // 这个变量是为了保证顺序。因为实体定义是后面上传文件后生成的，所有其countD2就后了
    var allAttributes = {
      '节点信息': '',
      '实体定义': '',
      '人员定义': '',
      'URL定义': '',
      '子流程': '',
    };
    for (var _groupName in attrNamesByGroup) {
      var _groupValueChildren = JSON.parse(findData(allParam, 'name', _groupName).value).children;// 一组的值信息
      if (_groupValueChildren.children) {// 针对第一次加载实体定义时，数据还在更内一层
        _groupValueChildren = _groupValueChildren.children;
      }
      if (!_groupValueChildren) {
        debugger;
      }
      var _groupTextarea = textareaListByGroup[_groupName];
      for (var b2 = false; countD2 < _groupTextarea.length; countD2++) {
        var _obj = _groupTextarea[countD2];

        if (!_obj || !_obj.parentNode || !_obj.parentNode.parentNode) {
          console.log(_obj);
        }
        var _namennn = '';
        if (_obj && _obj.constructor === Array) {//是array的，可能是单选
          var checkedRadioValue = _getCheckedRaidio(_obj).value;
          _namennn = _obj[0].parentNode.previousSibling.innerHTML.split(':')[0];
          // 把_obj.value更新到_groupValueChildren中
          for (var i0 = 0, len0 = _groupValueChildren.length; i0 < len0; i0++) {
            var _child0 = _groupValueChildren[i0];
            if (_child0.zhName == _namennn) {
              // 判断两个单选中，是谁选中了，选中的就是值
              _child0.defaultValue = checkedRadioValue;
              break;
            }
          }
        } else if (_obj) {
          _namennn = _obj.parentNode.parentNode.previousSibling.innerHTML.split(':')[0];

          // 把_obj.value更新到_groupValueChildren中
          for (var i = 0, len = _groupValueChildren.length; i < len; i++) {
            var _child = _groupValueChildren[i];
            if (_child.zhName == _namennn) {
              _child.defaultValue = _obj.value;
              break;
            }
          }
        }

      }
      if (allAttributes[_groupName] || allAttributes[_groupName] === '') {
        allAttributes[_groupName] = JSON.stringify({children: _groupValueChildren});
      }
      b2 = (b2 || "placeholder" == _groupName && "1" == e.getAttribute("placeholders"));
      // 2020年05月21日17:48:52 把下面两行注释掉，改到542，543的位置
      // debugger;
      // f.getModel().setValue(mxCell, e);//
    }
    debugger;
    for (var groupname in allAttributes) {
      if (allAttributes[groupname]) {
        e.setAttribute(groupname, allAttributes[groupname]);
      }
      if (groupname == '实体定义' && !allAttributes[groupname]) {
        e.setAttribute(groupname, JSON.stringify({children: []}));
      }
    }
    debugger;
    f.getModel().setValue(mxCell, e);//
    return mxCell;
  };

  var _splitString = function (str) {
    var arr = str.split(' ');
    var resultObj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
      var child = arr[i];
      var splitChild = child.split('=');
      var isBegindot = splitChild[1].indexOf('\'') === 0;
      var isBeginDBdot = splitChild[1].indexOf('"') === 0;
      if (isBegindot) {
        var index = splitChild[1].lastIndexOf('\'');
        resultObj[splitChild[0]] = splitChild[1].substring(1, index);
      } else if (isBeginDBdot) {
        var index2 = splitChild[1].lastIndexOf('"');
        resultObj[splitChild[0]] = splitChild[1].substring(1, index2);
      } else {
        resultObj[splitChild[0]] = splitChild[1]
      }
    }

    return resultObj;
  };

  var myFn = function (fileContentStr, fileType, a, b, c, d, fileName, cbFn, File, contentTable, hhh2Fn, countN) {
    console.log(contentTable);
    debugger;// 此时弹窗被隐藏了吗？---没有

    // 找到其中的input
    var inputList = [];
    var reg2 = /<input.+name=.+>/g;// 查找带name=的input
    var reg4 = /(name='.*'|name=".*")/g;// 查找name='dddd'这种字符串
    var inputs = fileContentStr.match(reg2);
    debugger;// 此时弹窗被隐藏了吗？---没有
    if (cbFn && cbFn.constructor === Function) {
      debugger;// 此时弹窗被隐藏了吗？---没有

      cbFn();
      debugger;// 此时弹窗被隐藏了吗？---yes

    }
    if (inputs && inputs.constructor === Array && inputs.length) {
      var data = {
        zhName: fileName,
        children: []
      };
      for (var i = 0, len = inputs.length; i < len; i++) {
        var input = inputs[i];
        var mathedArr = input.match(reg4);
        for (var j = 0, jLen = mathedArr.length; j < jLen; j++) {
          var str = mathedArr[j];
          inputList.push(str);
        }
      }
      // 带有name的input全部找到，渲染到节点的属性里
      for (var k = 0, kLen = inputList.length; k < kLen; k++) {
        var child = inputList[k];
        // 用空格拆开。找到value
        var splitedChild = _splitString(child);
        var newObj = {
          name: splitedChild.name + '校验',
          zhName: splitedChild.name + '校验',
          type: 'select',
          defaultValue: splitedChild.value || '',
          optionList: [
            {
              text: '整形',
              value: 11
            },
            {
              text: '浮点',
              value: 22
            }, {
              text: '333',
              value: 33
            }, {
              text: '444',
              value: 44
            },
          ]
        };
        var newObj2 = {
          name: splitedChild.name + '权限',
          zhName: splitedChild.name + '权限',
          type: 'select',
          defaultValue: splitedChild.value || '',
          optionList: [
            {
              text: '只读',
              value: 11
            },
            {
              text: '可写',
              value: 22
            }, {
              text: '333',
              value: 33
            }, {
              text: '444',
              value: 44
            },
          ],
        };
        data.children.push(newObj);
        data.children.push(newObj2);
      }
      debugger;// 此时弹窗被隐藏了吗？---隐藏了
      _addMyAttr(contentTable, data, hhh2Fn, countN);
    }
  };

  var myFn2 = function (fileContentStr, fileType, a, b, c, d, fileName, cbFn, File, contentTable, hhh2Fn, countN) {
    // 找到其中的input
    var inputList = [];
    var reg2 = /<input.+name=.+>/g;// 查找带name=的input
    var reg4 = /(name='.*'|name=".*")/g;// 查找name='dddd'这种字符串
    var inputs = fileContentStr.match(reg2);
    if (cbFn && cbFn.constructor === Function) {
      cbFn();
    }
    if (inputs && inputs.constructor === Array && inputs.length) {
      var data = {
        zhName: fileName,
        children: []
      };
      for (var i = 0, len = inputs.length; i < len; i++) {
        var input = inputs[i];
        var mathedArr = input.match(reg4);
        for (var j = 0, jLen = mathedArr.length; j < jLen; j++) {
          var str = mathedArr[j];
          inputList.push(str);
        }
      }
      // 带有name的input全部找到，渲染到节点的属性里
      for (var k = 0, kLen = inputList.length; k < kLen; k++) {
        var child = inputList[k];
        // 用空格拆开。找到value
        var splitedChild = _splitString(child);
        var newObj = {
          name: splitedChild.name,
          zhName: splitedChild.name,
          type: 'select',
          defaultValue: splitedChild.value || '',
          attrs: [
            {
              name: '校验',
              zhName: '校验',
              type: 'select',
              defaultValue: splitedChild.validtype || '',
              optionList: [
                {
                  text: '整形',
                  value: 11
                },
                {
                  text: '浮点',
                  value: 22
                }, {
                  text: '333',
                  value: 33
                }, {
                  text: '444',
                  value: 44
                },
              ]
            },
            {
              name: '权限',
              zhName: '权限',
              type: 'select',
              defaultValue: splitedChild.access || '',
              optionList: [
                {
                  text: '只读',
                  value: 11
                },
                {
                  text: '可写',
                  value: 22
                },
                {
                  text: '隐藏',
                  value: 33
                }, {
                  text: '必填',
                  value: 44
                },
              ]
            }
          ],
        };
        data.children.push(newObj);
      }
      _addMyAttr2(contentTable, data, hhh2Fn, countN);
    }
  };

  var _addMyAttr = function (contentTable, data, hhh2Fn, countN) {
    console.log(contentTable)
    debugger;//contentTable是？
    for (var i = 0, len = window.allParam.length; i < len; i++) {
      if (window.allParam[i].name == '实体定义') {
        var currentValue = JSON.parse(window.allParam[i].value).children;
        if (currentValue && currentValue.length) {
          var newChildren = currentValue.concat(data.children);
          window.allParam[i].value = JSON.stringify({children: newChildren});
        } else {
          window.allParam[i].value = JSON.stringify({children: data});// 第一次读取文件，直接给value赋值即可
        }
      }
    }
    // 找到实体定义的所在的div "classname是的group-w"
    var w;
    var allGroupTitles = contentTable.body.getElementsByClassName('group-w-title');
    for (var k = 0, klen = allGroupTitles.length; k < klen; k++) {
      var title = allGroupTitles[k].innerHTML;
      if (title === '实体定义') {
        w = allGroupTitles[k].parentElement;
        break;
      }
    }

    var fileName = data.zhName;// 分组内部的分组，现在没法再分组，先放置
    var children = data.children;
    var groupname = '实体定义';
    for (var c = 0, clen = children.length; c < clen; c++) {
      var child = children[c];
      hhh2Fn(groupname, w, countN, child.zhName, child.defaultValue, child.type || 'textarea', child.optionList);
      countN++;
      window.EditDataDialogCountN = countN;
    }
  };

  var _addMyAttr2 = function (contentTable, data, hhh2Fn, countN) {
    for (var i = 0, len = window.allParam.length; i < len; i++) {
      if (window.allParam[i].name == '实体定义') {
        var currentValue = JSON.parse(window.allParam[i].value).children;
        if (currentValue && currentValue.length) {
          var newChildren = currentValue.concat(data.children);
          window.allParam[i].value = JSON.stringify({children: newChildren});
        } else {
          window.allParam[i].value = JSON.stringify({children: data});// 第一次读取文件，直接给value赋值即可
        }
      }
    }
    // 找到实体定义的所在的div "classname是的group-w"
    var w;
    var allGroupTitles = contentTable.body.getElementsByClassName('group-w-title');
    for (var k = 0, klen = allGroupTitles.length; k < klen; k++) {
      var title = allGroupTitles[k].innerHTML;
      if (title === '实体定义') {
        w = allGroupTitles[k].parentElement;
        break;
      }
    }
    var fileName = data.zhName;// 分组内部的分组.在实体定义这个情况下，就是文件名称
    var children = data.children;
    var groupname = '实体定义';
    for (var c = 0, clen = children.length; c < clen; c++) {
      var child = children[c];
      hhh2Fn(groupname, fileName, w, countN, child.zhName, child.defaultValue, child.type || 'textarea', child.attrs);
      countN++;
      window.EditDataDialogCountN = countN;
    }
  };

  var _addShiTiDingYiTools = function (AppIns, contentTable, w, hhh2) {
    console.log(contentTable);
    var myClickFn = function () {
      // 打开文件导入
      AppIns.importLocalFile(true,
        {
          myFn: myFn,
          contentTable: contentTable,
          hhh2Fn: hhh2,
          resetBtn: true
        }
      )
    };
    var div = document.createElement('div');
    div.className = 'top-tools';
    var addBtn = document.createElement('div');
    addBtn.className = 'toolbtn';
    addBtn.innerHTML = '加载页面';
    addBtn.removeEventListener('click', myClickFn)
    addBtn.addEventListener('click', myClickFn);
    div.appendChild(addBtn);
    w.appendChild(div);
  };

  var _addShiTiDingYiTools2 = function (labelName, AppIns, contentTable, w, hhh2) {
    var div = document.createElement('div');
    div.className = 'top-tools';
    var addBtn = document.createElement('div');
    addBtn.className = 'toolbtn';
    addBtn.innerHTML = '加载页面';
    debugger;
    addBtn.addEventListener('click', function () {
      // 打开文件导入
      AppIns.importLocalFile(true, {myFn: myFn2, contentTable: contentTable, hhh2Fn: hhh2})
    });
    div.appendChild(addBtn);
    w.appendChild(div);
  };

  var clickOrgTree = function(){
    debugger;
  };
  var dblclickOrgTree = function(){
    debugger;

  };

  window._addSelect = _addFlowChartSelect;
  window._addSearch = _addFlowChartSearch;
  window._addSubmitBtn = _addSubmitBtn;
  window._setMyAttr = _setMyAttr;
  window._applyFn = _applyFn;
  window._addShiTiDingYiTools = _addShiTiDingYiTools;
  window._addShiTiDingYiTools2 = _addShiTiDingYiTools2;
  window._openOrgSelect = _openOrgSelect;
})();