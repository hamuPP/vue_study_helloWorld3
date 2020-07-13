/**
 * 流程编辑工具的后端接口
 * Created by tangyue on 19/5/29
 */

// import axios from 'axios'
import axios from '../../../axios/axios-exp'
import UrlMapping from '../../UrlMapping'

let um = new UrlMapping();

const state = {
  getWorkFlowList: {},
  getWorkFlowResult: {},
  saveWorkFlowResult: {},
};

const getters = {
  getWorkFlowList: state => state.getWorkFlowList,
  getWorkFlowResult: state => state.getWorkFlowResult,
  saveWorkFlowResult: state => state.saveWorkFlowResult,
};

const actions = {
  getWorkFlowList({commit}, {reqData}) {
    axios({
      method: 'post',
      url: um.getUrl('GET_WORK_FLOW_LIST'),
      // 如果需要以form data的格式传递json数据，则加上以下2个参数
      myContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      myParamsHandleType: 'encodeURIComponent',
      data: reqData
    })
      .then((response) => {
        commit('getWorkFlowList', {data: response.data});

      })
      .catch(e => {
        debugger;
      });
  },
  getWorkFlow({commit}, {reqData}) {
    axios({
      method: 'post',
      url: um.getUrl('GET_WORK_FLOW'),
      myContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      myParamsHandleType: 'encodeURIComponent',
      data: reqData
    })
      .then((response) => {
        debugger;
        commit('getWorkFlow', {data: response.data});

      })
      .catch(e => {
        debugger;
      });
  },
  saveWorkFlow({commit}, {reqData}) {
    axios({
      method: 'post',
      url: um.getUrl('SAVE_WORK_FLOW'),
      myContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      myParamsHandleType: 'encodeURIComponent',
      data: reqData
    })
      .then((response) => {
        debugger;
        commit('saveWorkFlow', {data: response.data});

      })
      .catch(e => {
        debugger;
      });
  },

};

const mutations = {
  getWorkFlowList(state, {data}) {
    state.getWorkFlowList = data;
  },
  getWorkFlow(state, {data}) {
    state.getWorkFlowResult = data;
  },
  saveWorkFlow(state, {data}) {
    state.saveWorkFlowResult = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}