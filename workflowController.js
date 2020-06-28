/**启动流程
 * @param {} config js对象，属性：
 * wfId:单据的流程id
 * boId:单据的id
 */
function startWorkFlow(config){
	if(!wfParam.initFlag){
		alert("页面加载中，请稍后！");
		return;
	}
	config=config||"";
	if(!config){
		config = {
			wfId:$("#wfId").val(),
			boId:$("#boId").val(),
			taskIds: ""
		};
	}
	config.validateMessage = "";
	if(config.wfIds != null && config.wfIds !=""){
		$.ajax({
			type : "POST",
			url : basePath + "/workflowAction.do?method=getBatchTasks&wfIds="+config.wfIds,
			data : {
			},
			dataType : "json",
			async : false,
			success : function(date) {
				//处理本节点任务的以存处理意见
				config.validateMessage = date.message;
				config.taskIds = date.taskIds;
			}
		});
	}
	if(config.validateMessage && config.validateMessage != ""){
		alert(config.validateMessage);
		return;
	}
	if(config.taskIds != null && config.taskIds !=""){
		$.ajax({
			type : "POST",
			url : basePath + "/workflowAction.do?method=batchValidate&taskids="+config.taskIds,
			data : {
			},
			dataType : "json",
			async : false,
			success : function(date) {
				//处理本节点任务的以存处理意见
				config.validateMessage = date.message;
			}
		});
	}
	if(config.validateMessage && config.validateMessage != ""){
		alert(config.validateMessage);
		return;
	}
	
	Ext.apply(config,{
		submitUserIds:this.submitUserIds||"",
		submitUserNames:this.submitUserNames||"",
		signUserIds:this.signUserIds||"",
		signUserNames:this.signUserNames||""
	});
	wfParam.config=config;
	if(!checkRecordChange(config)){
	}
	gotoWorkFlow(config);
}

function gotoWorkFlow(config){
	var item = new Ext.boco.WorkFlowFrame(config || "" ? config : wfParam);
	var win = new Ext.Window({
			modal:true,
			height : 400,
			width : 550,
			title : '流程处理',
			layout : 'fit',
			items : item
		});
		win.show();
		wfParam.frame=item;
}

function initWorkFlow(param, c) {
	wfParam.initFlag = false;
	if(!(param||"")){
		$.extend(wfParam, {
			wfId:$("#wfId").val(),
			boId:$("#boId").val(),
			businessType:$("#businessType").val(),
			className:$("#className")[0]?$("#className").val():$("#businessType").val(),
			atUnitId:$("#atUnitId").val(),
			attSpecId:$("#attSpecId")[0]?$("#attSpecId").val():""
		});
	}else{
		$.extend(wfParam, param);
	}
	$.extend(callbackTemplate, c);
	var p = prepareWFParam(wfParam);
	if($("#atUnitId").val()&&$("#atUnitId").val()!=""){
		wfParam.atUnitId=$("#atUnitId").val();
	}

	initPagePrivilege(p);
	initialize(document.forms[0]);
	//初始化风险管控
	initHonestRiskWarning(p);
	wfParam.initFlag = true;
}

//初始化校验风险管控内容是否展示
var initHonestRiskWarning = function (param){
	if(typeof(wfParam) == "undefined"){ 
		return ;
	}
	var nodeName = wfParam.nodeName;
	var wfId = wfParam.workflowActivityId;
	var workflowId = wfParam.workflowId;
	if(wfId==""||typeof(wfId) == "undefined"){ 
		return ;
	}
	$.ajax({
		type : "post",
		url : basePath + "/honestCheckAction.do?method=initHonestRiskWarning",
		ifModified : true,
		dataType : 'json',
		async : false,
		data : {wfId: wfId,nodeName : nodeName,workflowId : workflowId},
		success : function(data) {
			try{
				if(data.success == "true"){
					if(data.initWarnInfo.hasHonestContent=='true'){
						var boarddiv = '<div id="warn"  onclick="openDialog('+data.initWarnInfo.honestFlowTypeId+')"><div class="warnbox"><img src="'+basePath+'/theme/images/honestRiskWarning/icon-yj.gif" /><span>'+data.initWarnInfo.num+'</span></div><div class="warntext">风险预警</div></div>';
						$(document.body).append(boarddiv);
						if(data.initWarnInfo.needOpen=='true'){
							openDialog(data.initWarnInfo.honestFlowTypeId);
						}
					}
				}else{
					alert('错误', data.msg);
				}
			}catch(e){}
		},
		error : function() {
			
		}
	});
};

/**
 * 弹出风险管控提醒框
 * 
 * @returns
 */
function openDialog(ids){
	if(ids == "undefined"||ids == ""){ 
		return ;
	}
    layui.use('layer', function () {
        layer.open({
            type: 2
            ,title:false
            ,closeBtn: false
            ,area: [window.screen.width*0.8+'px', '500px']
            ,offset: 'auto'//弹框居中
            ,content: basePath + "/honestCheckAction.do?method=getHonestContentInfo&honestFlowTypeId="+ids
            ,end:function(){
               // location.reload();
            }
        })
    })
}

/**设置提交审批人
 * @param {} ids 多个用逗号隔开
 * @param {} names 多个用逗号隔开
 */
function setSubmitUser(ids,names){
	this.submitUserIds = ids;
	this.submitUserNames = names;
}
/**设置会签人
 * @param {} ids 多个用逗号隔开
 * @param {} names 多个用逗号隔开
 */
function setSignUser(ids,names){
	this.signUserIds = ids;
	this.signUserNames = names;
}

/**
 * 流程执行的验证方法，其中的方法只有返回true才能够继续提交，不满足条件的可以返回提示信息
 */
var wfParam = {};
var callbackTemplate = {
	beforeFrame : function() {
	},
	beforeApprove : function() {
		return true;
	},
	beforeReject : function() {
		return true;
	},
	beforeTerminate : function() {
		return true;
	},
	beforeSubmit : function() {
		// prepare();
		return true;
	},
	//用于选不同节点后的不同校验
	afterNode : function() {
		return true;
	},
	afterWorkFlow : function(){ 
		removeTab();//默认是删除当前tab,如果不想删除tab，可以重写这个方法返回到指定页面
		return true;
	}
};

var prepareWFParam = function(param) {
	if ((param.wfId && param.wfId != "")||(param.businessType && param.businessType != "")) {
		// 调用ajax直接初始化工作流
		// 根据返回参数进行页面初始化
		$.ajax({
			type : "post",
			url : basePath + "/workflowAction.do?method=initWorkflow",
			ifModified : true,
			dataType : 'json',
			async : false,
			data : {
				workflowActivityId : param.wfId,
				boId : param.boId,
				flowType : param.businessType
			},
			success : function(data) {
				try {
					// 准备流程参数
					$.extend(wfParam, data.WfBaseInfo);
					if(wfParam.businessType&&wfParam.businessType!=""&&$("#businessType").val()==""){
						$("#businessType").val(wfParam.businessType);
						wfParam.businessType=$("#businessType").val();
						wfParam.className=$("#className")[0]?$("#className").val():$("#businessType").val();
					}
				} catch (e) {
				}
				try {
					renderToolbarStatus(wfParam);
				} catch (e) {
				}
				if (data && data.WfBaseInfo && data.WfBaseInfo.isChangeUser == "true") {
					quickMsg("请注意，你的岗位自动切换为" + data.WfBaseInfo.changeUserName
							+ "！");
				}
			},
			error : function() {
			}
		});
	} else {
		renderToolbarStatus(wfParam);
	}
	return wfParam;
};

var renderToolbarStatus = function(param) {
	try {
		var bizId = param.boId;
		var submitId = param.submitId;
		if (!(submitId || ""))
			submitId = "approveTaskBtn";
		if (!bizId || bizId == 0) {
			$("#" + submitId).hide();
		} else {
			$("#" + submitId).show();
		}
	} catch (e) {
	}
};

// 根据返回得页面参数初始化是否只读，必填，隐藏等属性(用于老的frame)
this.initPagePrivilege = function(fieldParam) {
	try {
		$(fieldParam.fieldhash.jsp)
				.each(
						function() {
							$(this.fields)
									.each(
											function() {
												// WRITE 11、ONLY_READ
												// 12、HIDDEN 13、NOT_NULL
												// 14
												try {
													var $contrlEl = $("[name='"
															+ this.fieldName
															+ "']");
													if ($contrlEl.size() > 0) {
														switch (parseInt(this.access)) {
														case 11: // WRITE
															break;
														case 12: // ONLY_READ
															$contrlEl.each(function(z,onlyreadO) {
																if ($(onlyreadO)[0].tagName.toLowerCase() == 'select') {
													                var hiddenInput = "<input type='hidden' name='" + $(onlyreadO).attr("name") + "' value='" + $(onlyreadO).val() + "'>";
													                $(onlyreadO).after(hiddenInput);
													                $(onlyreadO).attr("disabled", true);
																}else{
																	$(onlyreadO).attr('readonly','readonly').css('background-color','#f3f4f6');
																}
																$(onlyreadO).removeAttr("onclick");
															});
															break;
														case 13: // HIDDEN
															$contrlEl.css(
																	'display',
																	'none');
															$contrlEl.attr(
																	"access",
																	"dis");
															try {
																var $div = $("#"+ $contrlEl.attr("id")+ "_hide");
																$div.css('display','none');
															} catch (e) {
															}
															break;
														case 14: // NOT_NULL
															$contrlEl.each(function() {
																	$(this).attr("access","must");
																	try {
																		var $div = $("#"+ $(this).attr("id")+ "_div");
																		var flag = false;
																		if ($div[0]){
																			flag = true;
																		}
																		if (flag) {
																			$div.css("color","red");
																			if ($div.text().indexOf("*") < 0){
																				$div.text("*"+ $div.text());
																			}
																		}
																	} catch (e) {
																	}
																});
															break;
														default:
															break;
														}
													}
												} catch (e) {
												}
											});
						});
	} catch (e) {
	}
};

this.validatePage = function(issubmit) {
	issubmit = issubmit||"false";
	var fieldParam = wfParam;
	var validateFlag = true;
	fieldParam.validateMessage = "";
	if(wfParam.validatePage == "false")return;
	try {
		$(fieldParam.fieldhash.jsp)
				.each(
						function() {
							$(this.fields)
									.each(
											function() {
												// WRITE 11、ONLY_READ
												// 12、HIDDEN 13、NOT_NULL 14
												try {
													var $contrlEl = $("[name='"+ this.fieldName+ "']");
													if ($contrlEl.attr("type") == "button")
														return;
													if ($contrlEl[0]) {
														switch (parseInt(this.access)) {
														case 11: // WRITE
															break;
														case 12: // ONLY_READ
															break;
														case 13: // HIDDEN
															break;
														case 14: // NOT_NULL
															var i =1;
															var mutiFlag = $contrlEl.size()>1;
															$contrlEl.each(function() {
																if ((!$(this).val())
																		&& ((issubmit == "true") || (issubmit != "true" && $(this)
																				.attr("except") != "true"))
																		&& $(this)
																				.attr("access") != "except") {
																	if(validateFlag)$(this).focus();//自动定位到没有填写的必填属性上
																	validateFlag = false;
																	fieldParam.validateMessage +=  ($(this).attr("alt") && $(this).attr("alt") != "" ? $(this).attr("title")
																					+(mutiFlag ? "第"+i+"行":"")
																					+ $(this).attr("alt")
																					: (mutiFlag ? "第"+i+"行":"")+"“"
																							+ $(this).attr("title")
																							+ "”不能为空！")
																			+ "<br>";
																}
																i++;
															});
															break;
														default:
															break;
														}
													}
												} catch (e) {
												}
											});
						});
	} catch (e) {
	}
	return fieldParam.validateMessage == ""? validateFlag :fieldParam.validateMessage;
};

//检查业务单是否修改过
function checkRecordChange(config) {
	try {
//		var message = validatePage(true);
//		if(message!==true&&message){
//			quickMsg(message);
//			return true;
//		}else
		{
			var isChange = isRecordChanges(document.forms[0]);
			if(isChange||(wfParam.isChange&&wfParam.isChange=="true" )){
				wfParam.isSave=true;
				wfParam.config = config
				//autoSave4Workflow(config);
				return true;
			}else{
				wfParam.isSave=false;
				return false;
			}
		}
	} catch (e) {
		alert(e);
	}
	return true;
}

function isRecordChanges(frm) {
	if (!frm) { // smart check
		return false;
	}
	var cmsDiff = "";
	for ( var eles = frm.elements, i = 0; i < eles.length; i++) {
		try {
			var ele = eles[i];
			if (ele.tagName == "INPUT") {
				if (ele.type == "submit" || ele.type == "reset"
						|| ele.type == "button" || ele.type == "image") {
					continue;
				}
			}
			if(!(ele.name||"")) continue;
			if(ele.type != "hidden" && !(ele.isOld)){
				return true;
			}
			var re = new RegExp(
					"_tc_f\\[(.*?)\\]\\[(.*?)\\]\\[(.*?)\\]\\[(.*?)\\]\\[(.*?)\\]\\[0\\]");
			var m = re.exec(ele.name);
			if (m == null) {
				continue;
			}
			var arrayElement = document.getElementsByName(m[3]);
			if(arrayElement == null||arrayElement.length==0){
				return true;
			}else if (arrayElement.length > 1) {// 如果元素是数组
				var index = m[4].substring(m[4].lastIndexOf('_') + 1, m[4].length);
				if (m[1] == "checkbox" || m[1] == "radio") {
					if (arrayElement[index].checked != ele.checked && arrayElement[index].changeexp !="true") {
						return true;
					}
				} else {
					if (arrayElement[index].value != ele.value && arrayElement[index].changeexp !="true") {
						return true;
					}
				}
			} else {
				if (m[1] == "checkbox" || m[1] == "radio") {
					if (document.getElementById(m[5]).checked != ele.checked && document.getElementById(m[5]).changeexp !="true") {
						return true;
					}
				} else {
					if (document.getElementById(m[5]).value != ele.value && document.getElementById(m[5]).changeexp !="true") {
						return true;
					}
				}
			}
		} catch (e) {
			//return false;
		}
	}

	return false;
}

function autoSave4Workflow(config,obj,callback){
	var form = $($("form").get(0));
	form.unbind("submit");
	var options = {
		beforeSubmit : function(formData, jqForm, options) {
			$("input[type='button']").each( function(index, buttonEle) {
				$(buttonEle).attr("disabled", "true");
			});
		},
		dataType :'html',
		success : function(responseText, statusText) {
			if(responseText.indexOf("如有疑问，请联系管理员，谢谢！")>=0){
				form.unbind("submit");
				quickMsg("调用失败，请联系管理员。");
				$("input[type='button']").each( function(index, buttonEle) {
					$(buttonEle).removeAttr("disabled");
				});
			}else{
				$("input[type='button']").each( function(index, buttonEle) {
					$(buttonEle).removeAttr("disabled");
				});
				form.unbind("submit");
				if(callback){
					if(obj){
						callback.call(obj);
					}else{
						callback();
					}
				}
				//gotoWorkFlow(config);
			}
		},
		error : function() {
			form.unbind("submit");
			quickMsg("调用失败，请联系管理员。");
			$("input[type='button']").each( function(index, buttonEle) {
				$(buttonEle).removeAttr("disabled");
			});
		}
	};
	//绑定事件
	form.submit( function() {
		form.ajaxSubmit(options);
		return false;
	});
	//自动保存之前的数据准备方法
	try{
		if(beforeAutoSave!=undefined&&typeof beforeAutoSave == 'function'){
			beforeAutoSave();
		}
	}catch(e){}
	//提交表单
	form.submit();
}
/**
 * 流程处理前的业务验证，其中的方法由业务逻辑自己实现,参数 attachmentMust 值为except则不校验附件
 */
function validator(cmd,obj,callback) {
	var ret;
	if (callbackTemplate) {
		if (callbackTemplate.beforeApprove) {
			var approveResult = callbackTemplate.beforeApprove();
			if (approveResult ===  true) {
				if (cmd == "submit"){
					var pageResult = validatePage("true");
					var beforeResult =  callbackTemplate.beforeSubmit ? callbackTemplate
							.beforeSubmit() : true;
					if(beforeResult===true||beforeResult ===""||(typeof beforeResult)=="undefined"){
						if(wfParam.attachmentController=="true"&&wfParam.atUnitId&&wfParam.attachmentMust!="except"){
							if(wfParam.bizCategoryId ){
								beforeResult = mustUploadCheckByParam(wfParam.className,wfParam.atUnitId,wfParam.attSpecId,'',wfParam.projectId,wfParam.bizCategoryId);
							}else{
								beforeResult = mustUploadCheck(wfParam.className,wfParam.atUnitId,wfParam.attSpecId);
							}
						}
					}
					ret = pageResult === true ? beforeResult:(beforeResult===true ||beforeResult===false? pageResult :( pageResult === false?beforeResult: pageResult + beforeResult));
				}
				else if (cmd == "reject")
					return callbackTemplate.beforeReject ? callbackTemplate
							.beforeReject() : true;
				else if (cmd == "terminate")
					return callbackTemplate.beforeTerminate ? callbackTemplate
							.beforeTerminate() : true;
				else if (cmd == "transfer")
					return callbackTemplate.beforeTransfer ? callbackTemplate
							.beforeTransfer() : true;
							
			} else {
				return approveResult;
			}
		}
		// 没有beforeApprove 的情况
		else {
			if (cmd == "submit"){
				var pageResult = validatePage("true");
				var beforeResult =  callbackTemplate.beforeSubmit ? callbackTemplate
						.beforeSubmit() : true;
				if(beforeResult===true||beforeResult ===""||(typeof beforeResult)=="undefined"){
					if(wfParam.attachmentController=="true"&&wfParam.atUnitId&&wfParam.attachmentMust!="except"){
						if(wfParam.bizCategoryId ){
							beforeResult = mustUploadCheckByParam(wfParam.className,wfParam.atUnitId,wfParam.attSpecId,'',wfParam.projectId,wfParam.bizCategoryId);
						}else{
							beforeResult = mustUploadCheck(wfParam.className,wfParam.atUnitId,wfParam.attSpecId);
						}
					}
				}
				ret =  pageResult === true ? beforeResult:(beforeResult===true ||beforeResult===false? pageResult :( pageResult === false?beforeResult: pageResult + beforeResult));
			}
			else if (cmd == "terminate")
				return callbackTemplate.beforeTerminate ? callbackTemplate
						.beforeTerminate() : true;
			else if (cmd == "callback")
				return callbackTemplate.beforeReject ? callbackTemplate
						.beforeReject() : true;
			else if (cmd == "transfer")
				return callbackTemplate.beforeTransfer ? callbackTemplate
						.beforeTransfer() : true;
		}
		if(wfParam.isSave===true&&(ret===true||ret ===""||(typeof ret)=="undefined")){
			autoSave4Workflow(wfParam.config,obj,callback);
		}else if(callback){
			if(obj){
				callback.call(obj);
			}else{
				callback();
			}
		}
		return ret;
	}
	return true;
}

 function getNodeFeildAccess(wfnodeId,field) {
	var access ="";
	if((typeof wfParam.fieldHashs)=="undefined"){
		wfParam.fieldHashs= new HashMap();
	}
	var fields = wfParam.fieldHashs.get(wfnodeId);
	if(fields){
        for(var i in fields){  
            if(fields[i].fieldName == field){  
            	access = fields[i].access;  
            	break;
            }  
        }  
	}else{
		$.ajax({
			type : "post",
			url : basePath + "/workFlowTaskAction.do?method=getNode&nolog=true",
			ifModified : true,
			dataType : 'json',
			async : false,
			data : {
			  workflowId: wfParam.workflowId,
        wfnodeId : wfnodeId,
        field : field
      },
			success : function(data) {
				try{
					access = data.WfAccessInfo.access; 
					wfParam.fieldHashs.put(wfnodeId,data.WfAccessInfo.fields);
				}catch(e){}
				
			},
			error : function() {
				
			}
		});
	}
	return access;
}
function nodeChange(nodeId,v){
	if (callbackTemplate) {
		if (callbackTemplate.beforeNode) {
			callbackTemplate.beforeNode(nodeId,v);
			if(this.submitUserIds||""){
				v.excuterIds = this.submitUserIds;
				v.excuterNames = this.submitUserNames;
			}
		}
	}
}
/**
 * 流程提交后的处理
 */
function workflowback() {
	if(callbackTemplate.afterWorkFlow){ 
		callbackTemplate.afterWorkFlow();
	}else{ 
		removeTab();// 删除当前tab
	}
}
/**组装流程操作的提示信息
 */
function buildMaskMsg(msg){
	return '<div style="border:0px;padding:5px 0px;width:35px;height:35px; float:left;"><img src="'+basePath+'/theme/images/workflowwarn.png" width="35" height="35" /></div>'+
	'<div style="border:0px;float:left;width:200px;line-height:24px;"><p><b>提示：</b><br>'+msg+'</p></div>';
	}
function batchSubmit(businessType) {
	var wfIds = "", wfId = "";
	var obj = document.getElementsByName("checkboxName");
	if (obj && obj.length > 0) {
		for ( var i = 0; i < obj.length; i++) {
			if(obj[i].checked){
				if (wfIds.length > 0)
					wfIds += ",";
				wfIds += obj[i].value.split(",")[1];
				wfId = obj[i].value.split(",")[1];
			}
		}
	}
	if (wfIds.length > 0) {
		initWorkFlow({
			wfId : wfId,
			boId : "",
			businessType : businessType
		});
		startWorkFlow({
			wfId : wfId,
			wfIds : wfIds,
			boId : ""
		});
	} else {
		alert("请选择处理单据！");
	}
}