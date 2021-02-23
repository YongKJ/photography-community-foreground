<template>
  <div id="app">
    <!-- <img src="static/image/logo.png"> -->
    <router-view v-if="RouterState"></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getToken();
  },
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      RouterState: true,
    };
  },
  methods: {
    reload() {
      this.RouterState = false;
      setTimeout(() => {
        this.$nextTick(() => {
          this.RouterState = true;
        });
      }, 100);
    },
    getToken() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + "/user/token",
      }).then(
        (res) => {
          if (typeof res.data == "string") {
            localStorage.removeItem("Access-Token");
            localStorage.removeItem("userId");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style>
@import "./assets/css/style.css";
</style>
