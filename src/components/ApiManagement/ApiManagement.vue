<template>
  <div class="personnel-management-container">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "ApiManagement",
  data() {
    return {
      currentView: ""
    };
  },
  methods: {

  }
};
</script>