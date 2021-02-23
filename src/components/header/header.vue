<template>
  <div>
    <header>
      <div class="brand"></div>
      <div class="menu">
        <router-link to="/gallery" class="tuku" target="_blank"
          >创意图库</router-link
        >
        <router-link to="/skill" target="_blank" class="community"
          >摄影社区</router-link
        >
        <router-link to="/gallery" class="contribute" target="_blank"
          >图片素材</router-link
        >
        <a @click="insurances" class="contribute">个人中心</a>
        <router-link to="/about" target="_blank" class="contribute"
          >关于我们</router-link
        >
      </div>
      <div :style="{ display: isFalse }">
        <el-dropdown class="cc_message">
          <a href="javascript:void(0)" class="cc_icon el-dropdown-link">
            <i class="el-icon-bell iconfont"></i>
          </a>
          <el-dropdown-menu slot="dropdown" class="el-menu">
            <a @click="redictHref('0px', 'isColor1') || insurances()"
              ><el-dropdown-item><span>作品评论</span></el-dropdown-item></a
            >
            <a @click="redictHref('60px', 'isColor2') || insurances()"
              ><el-dropdown-item><span>博文评论</span></el-dropdown-item></a
            >
            <a @click="redictHref('120px', 'isColor3') || insurances()"
              ><el-dropdown-item><span>收藏&收录</span></el-dropdown-item></a
            >
            <a @click="redictHref('180px', 'isColor4') || insurances()"
              ><el-dropdown-item><span>新粉丝</span></el-dropdown-item></a
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          class="default_avatar user_avatar"
          data-widget_cache_key="1603702798842"
        >
          <img
            class="avatar_wrapper size_100 el-dropdown-link"
            :src="url + perinfo['image']"
          />
          <el-dropdown-menu slot="dropdown" class="el-menu-photo">
            <a @click="insurance(perinfo['id'])"
              ><el-dropdown-item><span>个人中心</span></el-dropdown-item></a
            >
            <a @click="redicView('personProfile') || insurance(perinfo['id'])"
              ><el-dropdown-item><span>设置</span></el-dropdown-item></a
            >
            <a @click="logout()"
              ><el-dropdown-item><span>退出登录</span></el-dropdown-item></a
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="photo-publish">
          <a href="#" class="size-50 el-dropdown-link">发布</a>
          <el-dropdown-menu slot="dropdown" class="el-menu-publish">
            <a href="#/create"><el-dropdown-item>作品</el-dropdown-item></a>
            <a href="#/create_guide"
              ><el-dropdown-item>博文</el-dropdown-item></a
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <login-vue
        :style="{ display: isTrue }"
        @changediv1="handleHeader"
      ></login-vue>
    </header>
  </div>
</template>

<script>
import loginVue from "./loginandlogout";
export default {
  mounted() {
    if (localStorage.getItem("Access-Token") != null) {
      this.handleHeader();
      this.getPerson();
    }
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      isTrue: "block",
      isFalse: "none",
      flag: true,
      perinfo: {},
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("userId");
      let routerJump = this.$router.resolve({
        path: "/",
      });
      window.open(routerJump.href, "_self");
    },
    insurances() {
      if (localStorage.getItem("userId") != null) {
        let routerJump = this.$router.resolve({
          path: "/person",
          query: { id: localStorage.getItem("userId") },
        });
        window.open(routerJump.href, "_blank");
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
        localStorage.removeItem("userId");
        localStorage.removeItem("Access-Token");
      }
    },
    insurance(id) {
      let routerJump = this.$router.resolve({
        path: "/person",
        query: { id: id },
      });
      window.open(routerJump.href, "_blank");
    },
    getPerson() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + "/user/person",
      }).then(
        (res) => {
          if (typeof res.data == "object") {
            this.perinfo = res.data;
          } else {
            this.$message({
              message: "登录超时",
              type: "warning",
            });
            localStorage.removeItem("userId");
            localStorage.removeItem("Access-Token");
            this.isTrue = "block";
            this.isFalse = "none";
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handleHeader() {
      this.isTrue = "none";
      this.isFalse = "block";
    },
    redictHref(top, css) {
      this.$store.state.currentView = "message";
      this.$store.state.viewTop = top;
      this.$store.state.viewColor = css;
      this.$store.state.viewRef = "";
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    },
    redicView(view) {
      this.$store.state.currentView = view;
      this.$store.state.viewRef = "thisclass_four";
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    },
  },
  components: {
    loginVue,
  },
};
</script>

<style scoped>
@import "../../assets/css/index.css";
@import "../../assets/css/person.css";
</style>