/**
 * Created by tangyue on 20/4/26
 */
// 自动生成UUid  param{len：uuid长度（不传此参数，UUID格式为xx-xx-xx-xx...），radix：基数（从哪些字符里随机生成）}
export const uuid = (len, radix)=> {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

export const generateRandomFrontId = () => {
  return `frontId-${uuid(32)}`;
};
