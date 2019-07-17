<template>
  <div class="menu-container" v-if="menu.length">
    <!-- <span class="left center">
      <img :src="left" alt />
    </span>
    <span class="right center">
      <img :src="right" alt />
    </span>-->
    <ul>
      <li
        @mouseenter="handleShow(index)"
        @mouseleave="handleHide"
        v-for="(item,index) in menu"
        :class="{
        active:activeKey == item.path
      }"
        :key="index"
        @click="handleSelect(index,item)"
      >
        <span :style="computedContentStyle(index)">{{$t(item.label)}}</span>
        <img  :src="close" alt="x" :style="computedStyle(index)" @click.stop="handleRemove(index, item)" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {
      close: require("@/assets/svg/close.svg"),
      left: require("@/assets/svg/arrow-left.svg"),
      right: require("@/assets/svg/arrow-right.svg"),
      activeIndex: -1,
      currentIndex: -1
    };
  },
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      }
    },
    activeKey: {
      type: String,
      default: null
    }
  },
  methods: {
    computedContentStyle(index) {
      if (this.currentIndex == index) {
        return {
          paddingRight: "0px"
        };
      } else {
        return {
          paddingRight: "10px"
        };
      }
    },
    computedStyle(index) {
      if (this.currentIndex == index || this.activeIndex == index) {
        return {
          display: "block"
        };
      } else {
        return {
          display: "none"
        };
      }
    },
    handleShow(index) {
      this.currentIndex = index;
    },
    handleHide() {
      this.currentIndex = -1;
    },
    handleSelect(index, item) {
      this.$emit("on-select", {
        index,
        path: item.path
      });
    },
    handleBeforeRemove(index, item) {
      return new Promise(resove => {
        if (this.$listeners["on-before-remove"]) {
          this.$listeners["on-before-remove"]({
            index,
            path: item.path
          });
        }
        resove();
      });
    },
    handleRemove(index, item) {
      this.handleBeforeRemove(index, item).then(() => {
        this.$emit("on-remove", {
          index,
          path: item.path
        });
      });
    }
  }
};
</script>

<style scoped lang='less'>
.menu-container {
  width: 100%;
  height: 40px; /*no*/
  position: relative;
  > span {
    width: 15px; /*no*/
    height: 100%; /*no*/
    position: absolute;
    img {
      display: inline-block;
      width: 100%;
    }
    &:hover {
      cursor: pointer;
      background: #dcdee2;
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
  ul {
    position: absolute;
    left: 15px; /*no*/
    width: calc(100% - 30px); /*no*/
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 1px solid #dcdee2; /*no*/
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    &::-webkit-scrollbar {
      margin-top: 5px;
      width: 2px;
      height: 10px;
      background-color: #fff;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      background: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background-color: lightgray;
      &:hover {
        cursor: pointer;
      }
    }

    li {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      background: #f8f8f9;
      border: 1px solid #dcdee2; /*no*/
      border-bottom: none;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      &:hover {
        cursor: pointer;
        color: #2d8cf0;
        border: 1px solid #2d8cf0; /*no*/
        border-bottom: 1px solid #fff; /*no*/
      }
      &.active {
        border: 1px solid #2d8cf0; /*no*/
        color: #2d8cf0;
        border-bottom: 1px solid #fff; /*no*/
        box-sizing: border-box;
        background: #fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      span {
        padding: 10px;
        padding-right: 0px;
        height: 100%;
        display: flex;
        align-items: center;
        word-break: keep-all;
        white-space: nowrap;
        user-select: none;
      }
      img {
        padding: 10px;
        display: inline-block;
        padding-left: 0px;
        margin-left: 10px; /*no*/
        user-select: none;
        &:hover {
          transform: translateY(-3px); /*no*/
        }
      }
    }
  }
}
</style>