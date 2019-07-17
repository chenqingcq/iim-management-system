<template>
  <div class="not-found-container">
    <div class="panel">
      <img src="@/assets/images/404.gif" alt>
      <span>{{$t('Common.NFound')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  beforeRouteEnter(to, from, next) {
    document.title = "404";
    next();
  }
};
</script>
<style scoped lang='less'>
.not-found-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .panel {
    align-self: flex-start;
    img,
    span {
      display: block;
      text-align: center;
      font-size: 28px;
    }
  }
}
</style>
