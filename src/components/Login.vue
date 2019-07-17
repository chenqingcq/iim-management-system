<template >
  <Layout class="login-container">
    <Dropdown class="language">
      <span style="color:#fff;font-size:16px">
        {{lang}}
        <Icon type="ios-arrow-down"></Icon>
      </span>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="handleLangChange('zh')">中文</DropdownItem>
        <DropdownItem divided @click.native="handleLangChange('en')">English</DropdownItem>
        <DropdownItem divided @click.native="handleLangChange('ru')">русский</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div class="login-panel">
      <div class="login-content">
        <div class="left_panel">
          <div class="panel">
            <img :src="logo" alt class="logo" />
            <p class="title">{{$t('Login.system')}}</p>
          </div>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <!-- <FormItem>
            <img :src="logo" alt class="logo">
          </FormItem>-->
          <FormItem>
            <p class="title">{{$t('Common.welcome')}}</p>
          </FormItem>
          <FormItem prop="account">
            <Input
              class="username"
              clearable
              size="large"
              type="text"
              v-model.trim="formInline.account"
              :autofocus="true"
              :placeholder="this.$t('Login.hint.account')"
              style="height:32px"
            >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              class="psw"
              clearable
              size="large"
              type="password"
              v-model.trim="formInline.password"
              :placeholder="this.$t('Login.hint.psw')"
              style="height:32px"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formInline')"
              :loading="loading"
            >{{loginText}}</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <img :src="login_Bg" alt />
  </Layout>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import types from "@/store/action-types";
import { login } from "@/api/userInfo";
import { setToken, TokenKey, removeToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    return {
      lang: "",
      logo: require("@/assets/images/iim-logo.png"),
      loginBg: require("@/assets/images/login-bg.png"),
      login_Bg: require("@/assets/images/login_bg.jpeg"),
      loading: false,
      formInline: {
        account: "",
        password: ""
      },
      ruleInline: {}
    };
  },
  computed: {
    ...mapGetters(["getLanguage"]),
    loginText() {
      if (this.loading) {
        return this.$t("Login.Logining");
      } else {
        return this.$t("Login.login");
      }
    }
  },
  methods: {
    ...mapMutations([types.setUserInfo, types.setLanguage]),
    init() {
      return new Promise(resolve => {
        this.ruleInline = {
          account: [
            {
              required: true,
              message: this.$t("Login.hint.account"),
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: this.$t("Login.hint.psw"),
              trigger: "blur"
            },
            {
              type: "string" | "number",
              min: 4,
              message: this.$t("Login.hint.limit"),
              trigger: "blur"
            }
          ]
        };
        resolve();
      });
    },
    handleLangChange(lang) {
      this.$i18n.locale = lang;
      this[types.setLanguage](lang);
      this.toggleLang(lang);
      this.init();
    },
    toggleLang(lang) {
      switch (lang) {
        case "zh": {
          this.lang = "中文";
          break;
        }
        case "en": {
          this.lang = "English";
          break;
        }
        case "ru": {
          this.lang = "русский";
          break;
        }
        default: {
          this.lang = "中文";
        }
      }
    },
    handleSubmit(name) {
      this.init().then(() => {
        this.$refs[name].validate(valid => {
          if (valid) {
            !this.loading && this.login();
          } else {
            this.$Message.error(this.$t("Login.hint.repeat"));
            this.loading = false;
          }
        });
      });
    },
    login() {
      this.loading = true;
      login({
        adminUid: this.formInline.account,
        adminPwd: this.$md5(this.formInline.password)
      })
        .then(res => {
          console.log(res, "?");
          // if (res.err_code == 3000) {
          //   setToken(res.response_data.token);
          //   this.$router.push({
          //     path: "/main"
          //   });
          // } else {
          //   this.$Message.error(this.$t("Login.hint.error"));
          // }
        })
        .catch(err => {
          this.$Message.error(err);
          removeToken();
        })
        .finally(() => {
          setToken("eeee");
          this.$router.push({
            path: "/main"
          });
          this.loading = false;
        });
    }
  },
  created() {
    switch (this.getLanguage) {
      case "zh": {
        this.lang = "中文";
        this.$i18n.locale = "zh";
        break;
      }
      case "en": {
        this.lang = "English";
        this.$i18n.locale = "en";
        break;
      }
      case "ru": {
        this.lang = "русский";
        this.$i18n.locale = "ru";
        break;
      }
      default: {
        this.lang = "中文";
        this.$i18n.locale = "zh";
      }
    }
  },
  mounted() {
    window.addEventListener("keyup", e => {
      if (
        e.keyCode == 13 &&
        location.hash &&
        location.hash.includes("#/login")
      ) {
        this.handleSubmit("formInline");
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("keyup");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.username,
.pwd {
  height: 100%;
  input {
    height: 100%;
  }
}
.login-container,
.ivu-layout {
  user-select: none;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .language {
    position: absolute;
    top: 50px; /*no*/
    right: 100px; /*no*/
    z-index: 9;
  }
  .login-panel {
    position: absolute;
    z-index: 2;
    width: 300px;
    min-width: 680px !important;
    height: 400px;
    background: #fff;
    // padding: 10px;
    .left_panel {
      width: 540px;
      height: 100%;
      background: #4e8aec;
      display: flex;
      justify-content: center;
      align-items: center;
      .panel {
        width: 100%;
        height: 100%;
        text-align: center;
        img {
          width: 60%;
          margin-top: 20px;
        }
        p {
          font-size: 30px;
          color: #fff;
          margin-top: 80px;
        }
      }
    }
    .login-content {
      width: 100%;
      height: 100%;
      // border: 2px solid rgb(83, 132, 180);
      display: flex;
      form {
        width: 100%;
        height: 100%;
        padding: 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .ivu-input-group .ivu-input {
          // height: 40px !important;
        }
        .ivu-form-item-content {
          height: auto;
        }
        p {
          &.title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-top: 15px;
          }
        }
        img {
          height: 60px;
          display: inline-block;
          object-fit: contain;
          margin: 0 auto;
        }
        > div {
          width: 80%;
          margin: 0;
          button {
            width: 100%;
            height: 40px;
            font-size: 25px;
            padding: 0;
          }
        }
      }
    }
  }
  > img {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: inline-block;
  }
}
</style>
