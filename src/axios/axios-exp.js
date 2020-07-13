import axios from 'axios'
import { Message, Loading } from 'element-ui'


// encodeURIComponent的方式处理post的传参，就是以前旧的处理方式
const postEncodeParamsFunction = (data) => {
  let ret = '';
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
  }
  /**/
  return ret
};

//请求拦截
axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = config.myContentType ? config.myContentType: 'application/json; charset=UTF-8;';
    config.headers['Authorization'] = 'Bearer '+ sessionStorage.getItem('access_token');
    config.withCredentials = true;
    config.responseType = config.responseType || 'json';
    if(config.method === 'post'){
      // 如果有指定myParamsHandleType参数为encodeURIComponent，则采用不同的解析参数的方法
      if(config.myParamsHandleType && config.myParamsHandleType === 'encodeURIComponent'){
        config.transformRequest = [postEncodeParamsFunction];
      }
    }
    return config
  }

);

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (err) {
  let alertMessage = msg => {
    Message({
      showClose: true,
      message: msg,
      type: 'error',
      duration:1000
    });
  };
  if (err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求';
        alertMessage(err.message);
        break;
      case 401:
        // err.message = '未授权，请重新登录';
        // alertMessage(err.message);
        sessionStorage.removeItem('access_token');
        err.message = '未授权，请重新登录';
        alertMessage(err.message);
        setTimeout(function () {
          router.currentRoute.path !== '/' &&
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.path },
          });
        },1000);
        break;
      case 403:
        err.message = '拒绝访问';
        alertMessage(err.message);
        break;
      case 404:
        err.message = '请求错误,未找到该资源';
        alertMessage(err.message);
        break;
      case 405:
        err.message = '请求方法未允许';
        alertMessage(err.message);
        break;
      case 408:
        err.message = '请求超时';
        alertMessage(err.message);
        break;
      case 500:
        err.message = '服务器端出错';
        alertMessage(err.message);
        console.log(err.request.responseURL);
        if(err.request.responseURL.indexOf('examOnLine/queryQuestion') > -1){
          //   let UTILS = new Utils();
          // UTILS.closeFullScreen();
          return {err: err}
        }
        break;
      case 501:
        err.message = '网络未实现';
        alertMessage(err.message);
        break;
      case 502:
        err.message = '网络错误';
        alertMessage(err.message);
        break;
      case 503:
        err.message = '服务不可用';
        alertMessage(err.message);
        break;
      case 504:
        err.message = '网络超时';
        alertMessage(err.message);
        break;
      case 505:
        err.message = 'http版本不支持该请求';
        alertMessage(err.message);
        break;
      default:
        err.message = `连接错误${err.response.status}`;
        alertMessage(err.message);
    }
  } else {
    err.message = "连接到服务器失败";
    alertMessage(err.message);
  }
  // 对响应错误做点什么
  return Promise.reject(err);
});

export default axios;
