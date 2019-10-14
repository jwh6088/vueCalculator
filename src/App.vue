<template>
  <div id="app">
    <div class="header">
        <div class="iw">
           <span class="top">智能股权分配计算器</span>
        </div>
    </div>
    <div class="iw">
        <div class="main">
            <div class="title">{{$store.state.title}}</div>
            <div class="content">
            <transition name="el-fade-in" mode="out-in">
                <router-view/>
            </transition>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
    margin:0;
    padding:0;
    font-size:14px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.iw {
    width: 100%;
    max-width: 640px;
    min-width: 320px;
    margin: 0 auto;
    overflow: hidden;
}
body{
    background:#f8f9f9;
}
.top{
    padding-left:10px;
}
.header{
    background: #f0f2f5;
    box-shadow: 0 0 5px #888888;
    width:100%;
    height:45px;
    line-height:45px;
    position:fixed;
    top:0;
    left:0;
    z-index:100;
}
.main{
    background:#fff;
    margin:45px 0 40px 0;
}
.title{
    height:40px;
    background: #ebecef;
    line-height:40px;
    padding-left:10px;
    font-size:14px;
}
.content{
    padding:10px;
}
.el-message-box{
    width:80% !important;
}
</style>
