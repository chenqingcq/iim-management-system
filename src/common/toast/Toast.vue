<template>
  <transition name="fade">
    <div class="toast-container" v-if="show" @click="handleToggleModal">
      <div class="toast-panel">
        <div class="header">
          <Icon :type="type" :color="color" size="30"/>
          {{title}}
        </div>
        <div class="content">{{content}}</div>
        <div class="footer">
          <div @click="concel" class="concel center">{{onConcelText}}</div>
          <div @click="onConfirm" class="confirm center" :loading="loading">{{onOkText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "toast",
  computed: {
    type() {
      if (this.icon == "confirm") {
        return "md-help-circle";
      }
      if (this.icon == "info") {
        return "ios-information-circle";
      }
      if (this.icon == "warn") {
        return "ios-alert";
      }
      if (this.icon == "error") {
        return "ios-close-circle";
      }
    },
    color() {
      if (this.icon == "confirm") {
        return "#FF9900";
      }
      if (this.icon == "info") {
        return "#57a3f3";
      }
      if (this.icon == "warn") {
        return "#FF9900";
      }
      if (this.icon == "error") {
        return "#ed4014";
      }
    }
  },
  methods: {
    handleToggleModal(e) {
      if (e.target.className.includes("toast-container")) {
        this.show = false;
      }
    },
    concel() {
      this.show = false;
      this.onConcel();
    },
    onConfirm() {
      this.show = false;
      this.onOk();
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.show = false;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("keydown");
  }
};
</script>
<style lang="less" scoped>
.fade-leave-active {
}
.fade-enter-active {
  animation: fade 1.5s ease;
}
@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
.toast-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  .toast-panel {
    background: #fff;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .header {
      height: 60px; /*no*/
      padding: 0 20px;
      font-weight: 600;
      line-height: 60px; /*no*/
      font-size: 16px; /*no*/
    }
    .content {
      flex: 1;
      padding: 20px;
    }
    .footer {
      height: 40px;
      display: flex;
      justify-content: flex-end;
      padding: 0 10px;
      > div {
        width: auto; /*no*/
        padding: 0 10px;
        height: 90%;
        border-radius: 3px; /*no*/
        font-size: 14px; /*no*/
        &:hover {
          cursor: pointer;
        }
        &.concel {
        }
        &.confirm {
          background: #2d8cf0;
          color: #fff;
          margin-left: 20px;
          &:hover {
            background: #57a3f3;
          }
        }
      }
    }
  }
}
</style>