<template>
  <div class="personnel-management-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "RobotsManagement",
  data() {
    return {
      currentView: ""
    };
  }
};
</script>
<style lang="less" scoped>
.personnel-management-container {
  width: 100%;
  height: 100%;
}
</style>