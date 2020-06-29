<template>
  <div id="app" class="vue-app">
    <div id="nav" class="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/demo1">demo1</router-link>
      |
      <router-link to="/jsplumbDemo">jsplumbDemo</router-link>
      |
      <router-link to="/jsplumbDemo02">jsplumbDemo02</router-link>
      |
      <router-link to="/jsplumbDemo_myDemo01">jsplumbDemo_myDemo01</router-link>
      |
      <router-link to="/jsplumbDemo_myDemo02">jsplumbDemo_myDemo02</router-link>
      |
      <router-link to="/jsplumbDemo_myDemo03">jsplumbDemo_myDemo03</router-link>
      <p>Raphael study</p>
      <router-link to="/RaphaelDemo01">demo1</router-link>
      |
      <router-link to="/RaphaelDemo02">demo2</router-link>
      |
      <router-link to="/demo03_liucheng_edit">demo03_liucheng_edit.vue</router-link>
      |
      <p>drawio</p>
      <router-link to="/indexVueVer">indexVueVer.vue</router-link>
      |
      <p>ueditor</p>
      <router-link to="/vue-ueditor-demo1">vue-ueditor-demo1</router-link>
      <div v-for="(it, idx) in allRoutes"
           :key="idx"
           class="nav-group">
        <p class="group-title">{{it.name}}</p>
        <div v-if="it.children && it.children.length"
             class="nav-group-children">
          <div v-for="child in it.children"
               :key="child.name"
               class="nav-group-children-item">
            <span class="child-name" @click="to(child)">{{child.name}}</span>
          </div>

        </div>
      </div>
    </div>
    <router-view class="bottom-container"/>
  </div>
</template>
<script>
  export default {
    name: "AppPage",
    data() {
      return {
        allRoutes: [
          {
            name: 'Element',
            children: [
              {
                name: 'canIframeUse',
                route: '/canIframeUse'
              },
              {
                name: 'element_table',
                route: '/element_table'
              },
              {
                name: 'element_dialog',
                route: '/element_dialog'
              },
            ]
          }
        ]//
      }

    },
    methods: {
      to(data){
        this.$router.push({
          path: data.route
        })
      }
    }
  }
</script>

<style lang="scss">
  .vue-app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  .nav {
    height: 100px;
    overflow: auto;
    padding: 10px 6px;
    border: 1px solid purple;
    font-size: 14px;
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }

    .nav-group {
      font-size: 14px;
      .group-title{
        color: #333;
        font-weight: bold;
        text-align: left;
        margin: 0;
        padding: 0;
      }
    }
    .nav-group-children {
      text-align: left;
    }
    .nav-group-children-item {
      display: inline-block;
      border: 1px solid #d1d1d1;
      cursor: pointer;
      margin: 3px;
      padding: 3px;
      &:hover{
        color: red;
      }
    }
    .child-name{

    }
  }
  .bottom-container{
    height: calc(100% - 100px);
  }
</style>
