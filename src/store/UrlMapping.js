/*********************************************************************
 * 所有的接口路径存放                                                *
 *********************************************************************/
class UrlMapping {
  constructor() {
    // 基础后端地址
    this.BASE_URL = window.g.baseUrls;

    this.GET_WORK_FLOW = `${this.BASE_URL}/getWorkflows`
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
  }

}

export default UrlMapping;