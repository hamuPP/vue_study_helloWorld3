import Vue from 'vue'
import Vuex from 'vuex'

// 引入各个业务模块 --start--
import workFlowApi from './modules/workflow/workFlowApi.js'
// 引入各个业务模块 --end--

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    workFlowApi
  }
})

