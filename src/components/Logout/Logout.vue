<template></template>
<script>
export default {
  name: "Logout",
  methods: {
    async logout() {
      this.$toast.confirm({
        title: "确定",
        content: "确定退出后台管理系统?",
        loading: true,
        height: 500,
        onOk: () => {
          this.$router.push({
            path: "/login"
          });
          this.$Modal.remove();
        }
      });
    }
  },
  mounted() {
    this.$ebus.$on("logout", this.logout);
  }
};
</script>
