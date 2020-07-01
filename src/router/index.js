import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

const AboutPage = () => import(/* webpackChunkName: "about" */ '../views/About.vue');
const demo1Page = () => import(/* webpackChunkName: "about" */ '../views/demo1.vue');
const jsplumbDemo = () => import(/* webpackChunkName: "about" */ '../views/jsPlumbStudy/jsplumbDemo.vue');
const jsplumbDemo02 = () => import(/* webpackChunkName: "about" */ '../views/jsPlumbStudy/jsplumbDemo02.vue');
const jsplumbDemo_myDemo01 = () => import(/* webpackChunkName: "about" */ '../views/jsPlumbStudy/jsplumbDemo_myDemo01.vue');
const jsplumbDemo_myDemo02 = () => import(/* webpackChunkName: "about" */ '../views/jsPlumbStudy/jsplumbDemo_myDemo02.vue');
const jsplumbDemo_myDemo03 = () => import(/* webpackChunkName: "about" */ '../views/jsPlumbStudy/jsplumbDemo_myDemo03.vue');
const RaphaelDemo01 = () => import(/* webpackChunkName: "about" */ '../views/Raphael_study/demo1.vue');
const RaphaelDemo02 = () => import(/* webpackChunkName: "about" */ '../views/Raphael_study/demo2.vue');
const demo03_liucheng_edit = () => import(/* webpackChunkName: "about" */ '../views/Raphael_study/demo03_liucheng_edit.vue');
const login = () => import(/* webpackChunkName: "about" */ '../views/login.vue');
const homepage = () => import(/* webpackChunkName: "about" */ '../views/homepage.vue');

// element study
const element_table = () => import(/* webpackChunkName: "about" */ '../views/element_study/table.vue');
const element_dialog = () => import(/* webpackChunkName: "about" */ '../views/element_study/dialog.vue');
const canIframeUse = () => import(/* webpackChunkName: "about" */ '../views/element_study/canIframeUse.vue');
const vue_ueditor_demo1 = () => import(/* webpackChunkName: "about" */ '../views/vue-ueditor/basicDemo.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutPage
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: homepage
  },{
    path: '/demo1',
    name: 'demo1',
    component: demo1Page
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/jsplumbDemo',
    name: 'jsplumbDemo',
    component: jsplumbDemo
  },
  {
    path: '/jsplumbDemo02',
    name: 'jsplumbDemo02',
    component: jsplumbDemo02
  } ,
  {
    path: '/jsplumbDemo_myDemo01',
    name: 'jsplumbDemo_myDemo01',
    component: jsplumbDemo_myDemo01
  },
  {
    path: '/jsplumbDemo_myDemo02',
    name: 'jsplumbDemo_myDemo02',
    component: jsplumbDemo_myDemo02
  },
  {
    path: '/jsplumbDemo_myDemo03',
    name: 'jsplumbDemo_myDemo03',
    component: jsplumbDemo_myDemo03
  } ,
  {
    path: '/RaphaelDemo01',
    name: 'RaphaelDemo01',
    component: RaphaelDemo01
  },
  {
    path: '/RaphaelDemo02',
    name: 'RaphaelDemo02',
    component: RaphaelDemo02
  },
  {
    path: '/demo03_liucheng_edit',
    name: 'demo03_liucheng_edit',
    component: demo03_liucheng_edit
  },
  {
    path: '/element_table',
    name: 'element_table',
    component: element_table
  },
  {
    path: '/element_dialog',
    name: 'element_dialog',
    component: element_dialog
  },
  {
    path: '/canIframeUse',
    name: 'canIframeUse',
    component: canIframeUse
  },
  {
    path: '/vue-ueditor-demo1',
    name: 'vue-ueditor-demo1',
    component: vue_ueditor_demo1
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
