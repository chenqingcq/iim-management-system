<template>
  <div class="layout">
    <Layout>
      <Header class="layout-hearder">
        <Menu mode="horizontal" active-name="1">
          <div class="layout-logo" @click="reload">
            <img :src="logo" alt />
          </div>
          <div class="layout-nav">
            <div class="avator">
              <img :src="avator" alt />
            </div>
            <div class="logout">
              <div class="arrow" :title="this.$t('Logout.logout')">
                <img @click.self="showLogout" ref="arrow" :src="arrow" alt />
              </div>
              <div class="content" v-show="logoutShow">
                <span ref="logout" @click="logout">{{this.$t('Logout.logout')}}</span>
              </div>
            </div>
          </div>
        </Menu>
      </Header>
      <Layout class="layout-content">
        <Sider
          show-trigger
          collapsible
          width="260px"
          class="left-menu"
          :style="{background: '#fff'}"
          :collapsed-width="40"
          v-model="isCollapsed"
        >
          <Menu
            v-show="!isCollapsed"
            :class="menuitemClasses"
            :active-name="activeName"
            :open-names="openName"
            theme="dark"
            width="260px"
            :accordion="true"
            mode="vertical"
            on-select="select"
          >
            <Submenu
              v-for="(item,index) in menus "
              :key="index"
              :name="name(index)"
              :class="[`menu-sider-${index}`]"
            >
              <template slot="title">
                <span
                  :title="$t(item.i18n)"
                  style="width:100%;height:100%;display:inline-block"
                >{{$t(item.i18n)}}</span>
              </template>
              <MenuItem
                v-for="($item, $index) in item.children"
                :title="$t($item.i18n)"
                :key="$item.label"
                :name="subname(index, $index)"
                @click.native.self="select(item, $item , index +1 , $index+1)"
              >{{$t($item.i18n)}}</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="layoutStyle" class="layout-panel">
          <!-- 菜单栏 -->
          <Tab
            :menu="getMenu"
            :activeKey="activeKey"
            @on-select="handleLinkChange"
            @on-before-remove="handleBeforeRemove"
            @on-remove="handleTabRemove"
            style="margin-bottom:10px"
          ></Tab>
          <!-- 切换切面 -->
          <Content :style="{ minHeight: '280px', background: '#fff'}" class="main-page-content">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import Tab from "@/components/Tab/Tab";
import types from "@/store/action-types";
import menus from "@/common/route/route";
import { logout } from "@/api/userInfo";
import { removeToken, TokenKey, getToken } from "@/utils/auth";
export default {
  name: "Main",
  data() {
    return {
      openName: [],
      activeName: "",
      activeKey: "",
      show: true,
      logoutShow: false,
      isCollapsed: false,
      logo: require("@/assets/images/iim-logo.png"),
      avator: require("@/assets/images/robot.png"),
      arrow: require("@/assets/images/arrow-down.png"),
      menus: [...menus],
      breams: [],
      removedBars: [],
      routes: {
        title: "",
        subtitle: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getLanguage", "getMenu", "getActiveKey"]),
    layoutStyle() {
      return { padding: "0 24px 0px" };
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  components: {
    Tab
  },
  methods: {
    ...mapMutations([types.setMenu, types.removeMenu, types.setActiveKey]),
    label(item) {
      return this.$t(item.label);
    },
    handleBeforeRemove({ index, path }) {
      /**
       * 切换菜单栏
       * 1.如果删除的是激活页
       *    若后面有页面这显示后面的，否则显示前面的
       *    若无页面显示空
       * 2.否则
       *    继续显示激活页
       */
      if (this.activeKey != path) return;
      if (this.getMenu.length == 1) {
        path = this.activeKey = "/main";
        this[types.setActiveKey]("");
      } else {
        if (index < this.getMenu.length - 1) {
          path = this.activeKey = this.getMenu[index + 1].path;
        }
        if (index == this.getMenu.length - 1) {
          path = this.activeKey = this.getMenu[this.getMenu.length - 2].path;
        }
        this[types.setActiveKey](path);
      }
      this.$router.push({
        path,
        query: {
          ...this.$route.query
        }
      });
    },
    handleTabRemove({ index, path }) {
      this[types.removeMenu](index);
    },
    handleLinkChange({ index, path }) {
      this[types.setActiveKey](path);
      this.activeKey = path;
      this.$nextTick(() => {
        this.$router.push({
          path,
          query: {
            ...this.$route.query
          }
        });
      });
    },
    logout() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 38
              }
            }),
            h("div", this.$t("Logout.logouting"))
          ]);
        }
      });
      logout({
        token: getToken()
      })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            removeToken(TokenKey);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          this.$Message.error(this.$t("Common.networkError"));
        })
        .finally(() => {
          removeToken(TokenKey);
          this.$router.push("/login");
          this.$Spin.hide();
        });
      this.$refs.logout.classList.remove("active");
      this.$refs.arrow.style.transform = "rotate(0deg)";
    },
    showLogout(e) {
      if (this.$refs.logout.classList.contains("active")) {
        this.$refs.logout.classList.remove("active");
        e.target.style.transform = "rotate(0deg)";
        this.logoutShow = false;
      } else {
        this.$refs.logout.classList.add("active");
        e.target.style.transform = "rotate(180deg)";
        this.logoutShow = true;
      }
    },
    reload() {
      window.location.reload();
    },
    name(index) {
      return `${index + 1}`;
    },
    subname(index, $index) {
      return `${index + 1}-${$index + 1}`;
    },
    select(item, $item) {
      this.$nextTick(() => {
        document.title = this.$t($item.i18n);
        let path = `/main/${item.path}/${$item.path}`;
        this.activeKey = path;
        this[types.setActiveKey](path);
        let index = this.getMenu.findIndex(item => {
          return item.name == $item.name;
        });
        if (index == -1) {
          this[types.setMenu]({
            label: $item.i18n,
            name: $item.name,
            path
          });
        }
        this.$router.push({
          path: `/main/${item.path}/${$item.path}`,
          query: {
            ...this.$route.query
          }
        });
      });
    }
  },
  created() {
    this.$i18n.locale = this.getLanguage || "zh";
  },
  mounted() {
    let path = (this.activeKey = this.getActiveKey);
    this.$router.push({
      path,
      query: {
        ...this.$route.query
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.logoutShow = false;
    });
  }
};
</script>
<style lang="less" scoped>
.ivu-menu-item {
  word-break: break-all;
}
@keyframes rotate {
  to {
    transform: rotate(180deg);
  }
}
.active {
  display: block !important;
}
.rotate {
  animation: rotate 0.2s ease;
}
.layout-panel {
  background: #fff;
  // min-width: 1100px; /*no*/
  padding-top: 10px !important;
  overflow: auto !important;
}
.ivu-breadcrumb {
  margin: 12px 0 !important;
  .main {
    color: #2d8cf0;
    &:hover {
      cursor: pointer;
    }
  }
}
.routes {
  margin-top: 10px;
  .title {
    color: #000;
    font-size: 24px;
    margin-right: 12px;
  }
}
.ivu-layout-sider {
  background: #5b6270 !important;
}
.ivu-menu-light {
  // background: rgb(60, 141, 188) !important;
  background: #2d8cf0 !important;
  color: #fff;
  .layout-logo {
    height: 100%;
    position: absolute;
    background: #2c65c3 !important;
    top: 0;
    // background: rgb(54, 127, 169);
    width: 260px; /*no*/
    left: 0;
  }
}
.ivu-layout-header {
  padding: 0;
}
.ivu-layout-sider {
  min-width: 260px; /*no*/
}
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .ivu-layout {
    height: 100%;
  }
  .main-page-content {
    position: relative;
    max-height: calc(100vh - 130px); /*no*/
    box-sizing: border-box;
    padding: 0;
    flex: 1;
  }
}
.layout-logo {
  width: 80px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  img {
    height: 100%;
    display: inline-block;
    object-fit: contain;
  }
}
.layout-hearder {
  height: 80px;
  ul {
    height: 100%;
  }
}
.layout-nav {
  width: 80px;
  height: 100%;
  float: right;
  position: relative;
  margin-right: 100px;
  > .avator {
    height: 100%;
    width: 80px;
    padding: 15px;
    img {
      display: inline-block;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      object-fit: contain;
      border: 1px solid #515a6e; /*no*/
      &:hover {
        cursor: pointer;
      }
    }
  }
  > .logout {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    padding: 15px;
    right: -80px;
    > div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      &.arrow {
        > img {
          z-index: 9;
          display: block;
          width: 20px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      &.content {
        top: 65%;
        left: -10%;
        height: 50px;
        span {
          width: 100%;
          height: 45px;
          background: #515a6e;
          z-index: 9;
          text-align: center;
          border-radius: 10px;
          font-size: 18px;
          line-height: 45px;
          // letter-spacing: 5px;
          &::before {
            // content: " ";
            position: absolute;
            width: 15px;
            height: 15px;
            background: #515a6e;
            top: 7px;
            left: 45%;
            transform: rotate(45deg) translateX(-50%);
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
