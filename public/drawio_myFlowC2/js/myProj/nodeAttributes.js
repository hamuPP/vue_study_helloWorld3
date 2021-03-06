/**
 * Created by tangyue on 20/6/23
 */

window.myProj = {
  nodeBasicAttributes: [
    {
      "name": "流程实例Id",
      "type": "flowId",
      "des": "这个在创建的时候用当时的时间"
    },
    {
      "name": "名称",
      "type": "input",
      value: '发发发'
    },
    {
      "name": "测试text",
      "type": "textarea"
    },
    {
      "name": "节点编号",
      "type": "input"
    },
    {
      "name": "汇合关系",
      "type": "select",
      "optionList": [
        {
          "text": '或',
          "value": 1
        },
        {
          "text": '与',
          "value": 2
        },
      ]
    },
    {
      "name": "任务超时",
      "type": "input"
    },
    {
      "name": "人员传递",
      "type": "userSelectDialog"
    },
    {
      "name": "并发起点",
      "type": "bingfaQidianSelectDialog"
    }
  ],
  urlDefine: [
    {
      "name": "基础URL",
      "type": "input",
      "des": "这是URL定义里面的基础URL字段"
    }
  ]
};

// 例子：如果创建一个button
function createDemoButton() {
  var component = Vue.extend({
    render(createElement) {
      var params = {
        on: {},
        nativeOn: {},
        attrs: {},
        props: {
          value: this.custom,
          text: 'fff'
        },

        ref: 'mybtn',
      };
      return createElement('el-button', params, 'etbbb')
    },
    data() {
      return {
        dialogVisible: true,
        custom: '商店'
      }
    },
    methods: {}
  });
  var dom = new component().$mount().$el;
  document.body.appendChild(dom)
}

function saveIdToWindow(label, value) {
  if(!window.nodeAttributes){
    window.nodeAttributes = {};
  }
  window.nodeAttributes[label] = value;
}

function userTree(h, loadNode) {
  var result = h('el-tree', {
    ref: 'userTree',
    props: {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      load: loadNode,
      lazy: true,
      'show-checkbox': true,
    },
  });

  return result;
}


function showUserSelectDialog(parentElment, mxCellObj, labelText) {
  // 如果已经有之前创建的dialog，则显示其即可，不要再创建新的了,同时，更新数据
  if (window.$refs && window.$refs.userDialog) {
    window.$refs.userDialog.dialogVisible = true;
    window.$refs.userDialog.mxCellObj_ = mxCellObj;
    window.$refs.userDialog.parentElment_ = parentElment;
    return false;
  }
  var myMount;
  var component1 = Vue.extend({
    render(createElement) {
      var params = {
        class: 'my-dialog',
        on: {
          close: function () {
            debugger;
          }
        },
        nativeOn: {},
        attrs: {},
        props: {
          title: "提示",
          visible: this.dialogVisible,
          width: "30%",
        },
        ref: 'myUserDialog',
      };
      var childNodes2 = [
        // 正文放一个树
        userTree(createElement, this.loadNode),
        createElement('div', {
          class: 'my-button',
          slot: 'footer',
          on: {
            click: function () {
              // 树中选中的节点是：
              debugger;
              var checkedTreeNodes = myMount.$refs.userTree.getCheckedNodes();
              var names = [];
              var ids = [];
              for(var i = 0,len = checkedTreeNodes.length;i<len;i++){
                names.push(checkedTreeNodes[i].name)
                ids.push(checkedTreeNodes[i].name)// 假数据没有id，只有name,所以现在都是name
              }
              debugger;
              // 改变mxcell的obj的值
              myMount.mxCellObj_.setAttribute(labelText, names.join());
              // 把id值放在window里
              window.basicNodeAttributes = {};
              saveIdToWindow(labelText, ids.join());
              // 改变element组件的值
              myMount.parentElment_.custom = names.join();
              myMount.dialogVisible = false;
            }
          },
        }, '确定'),
        createElement('el-button', {
          class: 'my-button',
          slot: 'footer',
          on: {
            click: function () {
              myMount.dialogVisible = false;
              debugger;
            }
          },
        }, '取消'),
      ];
      return createElement('el-dialog', params, childNodes2)
    },
    data() {
      return {
        dialogVisible: false,
        mxCellObj_: mxCellObj,
        parentElment_: parentElment
      }
    },
    watch: {
      mxCellObj_(n, o){
        debugger;
      },
      mxCellObj(n, o){
        debugger;
      },
    },
    created() {

    },
    mounted() {
      if (!window.$refs) {
        window.$refs = {};
      }
      if (!window.$refs.userDialog) {
        window.$refs.userDialog = this;
      } else {
        debugger;
      }
      this.dialogVisible = true;
    },
    destroyed() {
      window.$refs.userDialog = null;
    },
    methods: {
      sureHandle() {
        debugger;
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{name: 'region'}]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      }
    }
  });

  myMount = new component1().$mount();
  var dom1 = myMount.$el;
  document.body.appendChild(dom1)
}


/**
 * 仿照mxClient.js中的mxForm，做的，把table改成div，方便样式控制
 * URLdefine
 * @param formName 表单的名字,如果没有，则是默认的：nodeAttributesForm 节点信息
 * @param clsName 自定义样式名
 */
function mxFormDiv(formName, clsName){
  var _formName = formName || 'nodeAttributesForm';
  this[_formName] = document.createElement("form");
  this[_formName].className = 'my-node-attributes-form' + (clsName? ' ' + clsName: '');
}

mxFormDiv.prototype.nodeAttributesForm = null;
mxFormDiv.prototype.URLdefine = null;

mxFormDiv.prototype.addText = function (a, b, c, opt) {
  var isDisabled = opt? opt.disabled : '';
  var isReadonly = opt? opt.readonly : '';
  var d = document.createElement("input");
  d.setAttribute("type", c || "text");
  if(isDisabled === 'disabled'){
    d.setAttribute("disabled", 'disabled');
  }
  if(isReadonly === 'readonly'){
    d.setAttribute("readonly", 'readonly');
  }
  d.value = b;
  return this.addField(a, d)
};

mxFormDiv.prototype.addElInput = function (opt, labelText, value, type) {
  var graph = opt.graph;
  var cell = opt.cell;
  var obj = opt.obj;
  var readonly = opt.readonly;
  var onClick = opt.onClick;
  var rawLableText = labelText.split(/:|；/)[0];//防止名称里有：与:,这里需要没有冒号的名称
  var myMount;
  var component = Vue.extend({
    render(createElement) {
      var params = {
        on:{
          input: function(value){
            debugger;// todo 第二次没有obj?
            // 以下两个，同时使用。才能使页面上的element input内的值改变+mxcell中的值改变
            obj.setAttribute(rawLableText, value);// 改变mxCell的obj中的值
            myMount.custom = value;// 改变element组件的值
          },
          click: function(){
            debugger;
          }
        },
        nativeOn: {
          click: function(){
            if(onClick && onClick.constructor === Function){
              debugger;// 第二次Obj没有？
              onClick(myMount, obj, rawLableText);
            }
          }
        },
        attrs: {

        },
        props:{
          value: this.custom,
          size: 'mini',
          type: type,
        },
        ref: 'myRefInput2',
      };
      if(readonly){
        params.attrs.readonly = 'readonly'
      }
      return createElement('el-input', params)
    },
    data() {
      return {
        custom: value,
        obj: obj
      }
    },
    methods: {

    }
  });
  myMount = new component().$mount();
  var dom = myMount.$el;

  return this.addField(labelText, dom)
};
mxFormDiv.prototype.addElSelect = function (labelText, value, optionList) {
  // 把optionList整理成组件所需的格式
  var _generateElOption = function(createEle){
    var list = [];
    for(var i = 0,len = optionList.length;i<len;i++){
      var op = optionList[i];
      list.push(
        createEle('el-option', {
          props: {
            value: op.value,
            label: op.text
          }
        }));
    }
    return list;
  };

  var component = Vue.extend({
    render(createElement) {
      return createElement('el-select',{
          on:{
            input: (value) => {
              this.custom = value;
            },
          },
          props:{
            value: this.custom,
            size: 'mini'
          },
          ref: 'myRefInput2',
        }, _generateElOption(createElement)
      )
    },
    data() {
      return {
        custom: value
      }
    },
    methods: {

    }
  });
  var dom = new component().$mount().$el;

  return this.addField(labelText, dom)
};

mxFormDiv.prototype.addField = function (labelText, b, clsName) {

  var itemDiv = document.createElement("div");
  itemDiv.className = 'form-item';
  var textLable = document.createElement("label");
  textLable.className = 'form-item__label';// 默认样式
  clsName && (itemDiv.className += ' ' + clsName);// 用户自定义添加的样式
  mxUtils.write(textLable, labelText);
  itemDiv.appendChild(textLable);
  var inputDiv = document.createElement("div");
  inputDiv.className = 'form-item__content';
  inputDiv.appendChild(b);
  itemDiv.appendChild(inputDiv);
  this.nodeAttributesForm.appendChild(itemDiv);
  return b
};
