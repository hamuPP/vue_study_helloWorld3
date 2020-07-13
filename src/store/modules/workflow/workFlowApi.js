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
};

const getters = {
  getWorkFlowList: state => state.getWorkFlowList,
};

const actions = {
  getWorkFlowList({commit}, {reqData}) {
    axios({
      method: 'post',
      url: um.getUrl('GET_WORK_FLOW'),
      params: reqData
    })
      .then((response) => {
        commit('getWorkFlowList', {data: response.data});

      })
      .catch(e => {
        debugger;
      });
  },

};

const mutations = {
  getWorkFlowList(state, {data}) {
    state.getWorkFlowList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}