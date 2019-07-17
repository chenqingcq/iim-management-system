<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='less'>
@import "./assets/css/normal.less";
@import "./assets/css/common.less";
@import "./assets/css/theme.less";
html,
body {
  font-family: "PingFangSC-Regular Avenir", Helvetica, Arial, sans-serif;
}
#app {
  width: 100%;
  height: 100%;
  min-width: 800px !important;
}

</style>
