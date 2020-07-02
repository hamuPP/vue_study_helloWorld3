/**
 * Created by tangyue on 20/6/23
 */

window.myUtils = {
  /**
   * 指定对比的键值，从全部的集合中找到与指定的键值相对应的成员
   * @param keyText
   * @param value
   * @param allDatalist
   */
  findChildInArray: function(keyText, value, allDatalist){
    for(var i = 0,len = allDatalist.length;i<len;i++){
      var child = allDatalist[i];
      if(child[keyText] == value){
        return child;
      }
    }
  },
};