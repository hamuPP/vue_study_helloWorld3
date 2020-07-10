/*********************************************************************
 * 所有的接口路径存放                                                *
 *********************************************************************/
class UrlMapping {
  constructor() {
    // 基础后端地址
    this.BASE_URL = window.g.baseUrls || 'http://192.168.12.118:8080';

    this.BASE_URL_SIMP = '182.151.199.4:50800/iplatform-robopost';
    this.SEC = this.BASE_URL + '/iplatform-security';
    this.TEMP_BASE_URL = this.BASE_URL + '/bmp-project-core';
    this.QUICK_SHORT_CUT_BASE_URL = this.BASE_URL + '/iplatform-security';
    this.NEWS_BASE = this.BASE_URL+ '/bmp-system-maintain';
    // 改一下后端地址，全部改成118地址 2020年06月15日09:13:50 -- end--

    this.GET_LIST = `${this.BASE_URL}/robopost/find`;
    this.SAVE = `${this.BASE_URL}/robopost/save`;
    this.CHECK = `${this.BASE_URL}/robopost/checkRobopost`;
    this.DEL = `${this.BASE_URL}/robopost/del`;

    this.GET_TAG_LIST = `${this.BASE_URL}/robopost/findTags`;
    this.GET_TAG_TAG = 'http://'+ this.BASE_URL_SIMP + '/v2/{image_name}/tags/list';
    this.GET_TAG_VERSION = `${this.BASE_URL}/robopost/findTag`;
    this.WS = 'ws://192.168.12.121:8910/websocket';
    this.CREATE_IMAGE = 'http://182.151.199.4:50800/iplatform-robopost/createImageController/createImage'//192.168.12.38:8910

    // 日志打印
    this.GET_LOG_LIST = 'http://192.168.12.38:8081/iplatform-robopost/esController/find';

    // 项目进度模板
    this.GET_PROJ_PROGRESS_TEMP_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/find';
    this.ADD_OR_UPDATE_PROJ_PROGRESS_TEMP = this.TEMP_BASE_URL + '/scheduleTemplateController/save';
    this.DEL_PROJ_PROGRESS_TEMP = this.TEMP_BASE_URL + '/scheduleTemplateController/delete';
    this.ADD_PROJ_PROGRESS_TEMP_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/saveTypeToTemplate';
    this.DEL_PROJ_PROGRESS_TEMP_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/deleteTemplateInfo';
    this.UPDATE_PROJ_PROGRESS_TEMP_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/saveTemplateInfo';
    this.GET_PROJ_PROGRESS_TEMP_TREE = this.TEMP_BASE_URL + '/scheduleTemplateController/findTree';
    this.GET_PROJ_PROGRESS_SCHEDULE_TYPE_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/findScheduleType';// 据项目模板查询可添加进度条目列表
    this.GET_PROJ_PROGRESS_TEMP_CHILD_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/findChild';// 查询项目进度模板的儿子列表
    this.GET_PROJ_PROGRESS_TEMP_DUTY_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/findDutyDeptCategory';// 获取责任部门码表
    this.GET_PROJ_PROGRESS_TEMP_KEY_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/findIsKeyCategory';// 获取是否关键流程码表
    this.GET_PROJ_PROGRESS_TEMP_ROLE_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/findRoleFlagCategory';// 获取是角色类型码表
    this.GET_PROJ_PROGRESS_TEMP_PRE_OR_NO_ALL = this.TEMP_BASE_URL + '/scheduleTemplateController/findPreOrPreNoScheduleTypeOpts';
    this.GET_PROJ_PROGRESS_TEMP_PRE_OR_NO_VALUE = this.TEMP_BASE_URL + '/scheduleTemplateController/findPreOrPreNoScheduleTypes';
    this.GET_PROJ_PROGRESS_PRE_OR_NO_SAVE = this.TEMP_BASE_URL + '/scheduleTemplateController/savePreOrPreNoScheduleTypes';
    this.GET_PROJ_PROGRESS_NEXT_SCHEDULE_DATA = this.TEMP_BASE_URL + '/scheduleTemplateController/findNextScheduleTypes';//获取项目进度模板中自动待办可选进度条目
    this.GET_PROJ_PROGRESS_NEXT_SCHEDULE_LIST = this.TEMP_BASE_URL + '/scheduleTemplateController/findNextScheduleTypeOpts';//获取项目进度模板中自动待办可选进度条目
    this.SAVE_PROJ_PROGRESS_NEXT_SCHEDULE = this.TEMP_BASE_URL + '/scheduleTemplateController/saveNextScheduleTypes';// 保存
    this.GET_SPEC_TREE = this.SEC + '/api/privilege/detach/org/findSpecTree';// 专业树
    // 快捷操作，快捷菜单相关接口
    this.findShortCutMenuData = this.QUICK_SHORT_CUT_BASE_URL + '/api/privilege/detach/shortcutMenu/find';
    //根据父菜单获取子菜单
    this.getShortCutMenuData = this.QUICK_SHORT_CUT_BASE_URL + '/api/privilege/detach/shortcutMenu/findFirst';
    this.getShortCutMenuLeafData = `${this.QUICK_SHORT_CUT_BASE_URL}/api/privilege/detach/shortcutMenu/findAll`;
    this.addShortCutMenuData = `${this.QUICK_SHORT_CUT_BASE_URL}/api/privilege/detach/shortcutMenu/add`;

    // 日志管理
    this.GET_LOG_MGMT_LIST = `${this.BASE_URL}/iplatform-log/logs`;

    // 系统公告
    this.GET_NEWS = this.NEWS_BASE+ '/bulletinManagerController/queryBulletin4Index';// 查询首页用于轮播的公告们
    this.GET_NEWS_LIST = this.NEWS_BASE + '/bulletinManagerController/findPage';
    this.GET_NEWS_INFO = this.NEWS_BASE + '/bulletinManagerController/getInfo';// 查询单条公告的详情
    this.SAVE_AND_UPDATE_NEWS = this.NEWS_BASE + '/bulletinManagerController/saveAndUpdate';
    this.DELETE_NEWS = this.NEWS_BASE + '/bulletinManagerController/deleteByIds/';

    // 立项申请
    this.GET_ORG_TREE = this.BASE_URL+ '/iplatform-security/api/privilege/detach/org/findTree';
    this.GET_ENTRY = 'http://192.168.12.38:8086' + '/projectApplyController/' + 'findEntrys';
    this.GET_GUANLIFAGNSHI = 'http://192.168.12.38:8086' + '/projectApplyController/' + 'getSelectLists';
    this.GET_XIANGMUJNDUMUBAN = 'http://192.168.12.38:8086' + '/projectApplyController/' + 'findScheduleTemp';
  }

  /**
   * 根据条件来获取对应的路径
   * @param str 路径的参数
   * @param obj 这对象为访问地址里面{}的值,比如:{userId:'test5',clientId:'12313',...}，键的顺序要和路径里面的{}的顺序一致
   * @returns {string} 返回对应的url路径
   */
  getUrl(str, obj) {
    let url = this[str];
    if (obj) {
      //把{}里面的值替换成传的参数值
      url = this[str].replace(/\{.*?\}/g, function (word) {
        return obj[word.substring(1, word.length - 1)]
      });
    }

    return url;
  };

}

export default UrlMapping;