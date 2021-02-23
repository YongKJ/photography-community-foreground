<template>
  <div class="person" style="background-color: #f4f6f9">
    <header style="position: relative">
      <div class="brand"></div>
      <div class="menu">
        <router-link to="/gallery" class="tuku">创意图库</router-link>
        <router-link to="/skill" target="_blank" class="community"
          >摄影社区</router-link
        >
        <router-link to="gallery" class="contribute">图片素材</router-link>
        <a @click="insurance" class="contribute">个人中心</a>
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
            <a
              @click="
                changeBox('message') || messageMobileTop('0px', 'isColor1')
              "
              ><el-dropdown-item><span>作品评论</span></el-dropdown-item></a
            >
            <a
              @click="
                changeBox('message') || messageMobileTop('60px', 'isColor2')
              "
              ><el-dropdown-item><span>博文评论</span></el-dropdown-item></a
            >
            <a
              @click="
                changeBox('message') || messageMobileTop('120px', 'isColor3')
              "
              ><el-dropdown-item><span>收藏&收录</span></el-dropdown-item></a
            >
            <a
              @click="
                changeBox('message') || messageMobileTop('180px', 'isColor4')
              "
              ><el-dropdown-item><span>新粉丝</span></el-dropdown-item></a
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="default_avatar user_avatar">
          <img
            class="avatar_wrapper size_100 el-dropdown-link"
            :src="url + perinfo['image']"
          />
          <el-dropdown-menu slot="dropdown" class="el-menu-photo">
            <a @click="hisDetail('/person')"
              ><el-dropdown-item><span>个人中心</span></el-dropdown-item></a
            >
            <a
              @click="
                changeBox('personProfile') || changeColor('thisclass_four')
              "
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
            <a href="#/create" target="_blank"
              ><el-dropdown-item>作品</el-dropdown-item></a
            >
            <a href="#/create_guide" target="_blank"
              ><el-dropdown-item>博文</el-dropdown-item></a
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <login-vue
        @changediv="handlePerson"
        :style="{ display: isTrue }"
      ></login-vue>
    </header>
    <main class="user-center-wrapper" style="height: 0">
      <el-backtop :visibility-height="500"
        ><i class="el-icon-top" style="color: aliceblue"></i
      ></el-backtop>
      <div class="banner-wrapper">
        <div class="background-image-wrapper">
          <div class="banner-mast"></div>
          <div
            class="cover-image"
            style="
              background-image: url('static/image/person-background/timg (2).jpg');
            "
          ></div>
        </div>
        <div class="banner-user-info clearfix">
          <div class="w_default_avatar user-avatar">
            <img
              class="avatar-wrapper size-100"
              :src="url + userinfo['image']"
            />
          </div>
          <div class="user-info-content">
            <div class="info-top">
              <span class="info-name">{{ userinfo["username"] }}</span>
              <div
                class="w_pui_follow_button follow-button-wrapper cc_topic_green"
                v-show="isAttention"
              >
                <div class="cc_follow_btn">
                  <span
                    class="cc_no_attension"
                    ref="cc_attension"
                    @click="changSpan(isSpan, userinfo.id)"
                    @mouseenter="changeAttension(true)"
                    @mouseleave="changeAttension(false)"
                  >
                    <i class="icon el-icon-plus" style="font-size: 16px"></i>
                    <span style="font-size: 16px">关注</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="info-middle">
              <div
                data-type="following"
                class="social-connect-button"
                ref="social-connect-button_1"
                @click="
                  changeBox('author') ||
                    setcenterTabColor() ||
                    attentionSum('/attention/author_sum', true)
                "
              >
                关注 <span>{{ authorSum }}</span>
              </div>
              <div
                data-type="follower"
                class="social-connect-button"
                ref="social-connect-button_2"
                @click="
                  changeBox('fans') ||
                    setcenterTabColor() ||
                    attentionSum('/attention/fans_sum', false)
                "
              >
                粉丝 <span>{{ fansSum }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-tab" id="fixedBar" :class="{ fixedBar: isFixed }">
        <div
          class="w_header_nav cc_topic_default"
          data-widget_cache_key="1603959120236"
        >
          <a
            href="javascript:void(0)"
            class="w_header_nav_a"
            ref="thisclass_one"
            @click="changeColor('thisclass_one') || changeBox('works')"
            ><bdo>作品</bdo></a
          >
          <a
            href="javascript:void(0)"
            class="w_header_nav_a"
            ref="thisclass_two"
            @click="changeColor('thisclass_two') || changeBox('articles')"
            ><bdo>博文</bdo></a
          >
          <a
            href="javascript:void(0)"
            class="w_header_nav_a"
            ref="thisclass_three"
            @click="changeColor('thisclass_three') || changeBox('collection')"
            ><bdo>收藏</bdo></a
          >
          <a
            href="javascript:void(0)"
            class="w_header_nav_a"
            ref="thisclass_four"
            @click="changeColor('thisclass_four') || changeBox('profile')"
            ><bdo>资料</bdo></a
          >
        </div>
      </div>
      <div :class="{ divHeight: isFixed }"></div>
      <transition>
        <component
          v-bind:is="currentview"
          ref="currentview"
          id="current"
          style="margin-top: -58px; height: auto"
          :style="{ paddingTop: isPadding }"
          @changeImage="imageUpate"
        ></component>
      </transition>
      <div class="vw_loading">
        <div
          class="w_pui_loading_point_blink"
          data-widget_cache_key="1611122882850"
        >
          <div class="cc_end cc_pb_text"><i class="cc_end_img"></i></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import author from "./attension/author";
import fans from "./attension/fans";
import works from "./works/works";
import profile from "./profile/profile";
import collection from "./works/collection";
import personProfile from "./profile/personprofile";
import message from "./message/message";
import articles from "./works/articles";
import loginVue from "../header/loginandlogout";
export default {
  mounted() {
    if (this.$route.query.id == null || this.$route.query.id == "") {
      let routerJump = this.$router.resolve({
        path: "/",
      });
      window.open(routerJump.href, "_self");
    }
    if (localStorage.getItem("Access-Token") != null) {
      this.handlePerson();
      this.getUserinfo();
      this.getPerson();
      this.attentionSum("/attention/author_sum", true);
      this.attentionSum("/attention/fans_sum", false);
    }
    if (localStorage.getItem("userId") == this.$route.query.id) {
      this.isAttention = false;
    } else {
      this.isAttention = true;
    }
    this.currentview = this.$store.state.currentView;
    this.changeColor(this.$store.state.viewRef);
    this.offsetTop = document.querySelector("#fixedBar").offsetTop;
    window.addEventListener("scroll", this.handleScroll);
  },
  e1: "#demo",
  data() {
    return {
      currentview: "works",
      isFixed: false,
      offsetTop: 0,
      isPadding: "58px",
      isMessage: true,
      isSpan: true,
      isTrue: "block",
      isFalse: "none",
      isAttention: true,
      userinfo: {},
      perinfo: {},
      url: this.$store.state.localhostUrl + "/",
      authorSum: 0,
      fansSum: 0,
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); // 离开页面 关闭监听 不然会报错
  },
  inject: ["reload"],
  methods: {
    insurance() {
      if (localStorage.getItem("userId") != null) {
        let routerJump = this.$router.resolve({
          path: "/person",
          query: { id: localStorage.getItem("userId") },
        });
        window.open(routerJump.href, "_self");
        location.reload();
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
        localStorage.removeItem("userId");
        localStorage.removeItem("Access-Token");
      }
    },
    imageUpate(data) {
      this.userinfo["image"] = data["image"];
      this.userinfo["username"] = data["username"];
      this.perinfo["image"] = data["image"];
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
    getUserinfo() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/user/getting",
        data: {
          userId: this.$route.query.id,
        },
      }).then(
        (res) => {
          this.userinfo = res.data["user"];
          localStorage.setItem("username", this.userinfo.username);
          this.checkAuthor(this.userinfo.id);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handlePerson() {
      this.isTrue = "none";
      this.isFalse = "block";
    },
    hisDetail(row) {
      this.$router.push(row + "?id=" + this.$route.query.id).catch((err) => {});
      this.reload();
    },
    changSpan(isSpan, id) {
      if (isSpan) {
        this.isSpan = false;
        this.attention(id, true);
        this.$refs.cc_attension.innerHTML = ` <i class="icon  el-icon-check" style="font-size:16px;"></i>
                    <span style="font-size:16px;">已关注</span>
                  `;
      } else {
        this.isSpan = true;
        this.attention(id, false);
        this.$refs.cc_attension.innerHTML = ` <i class="icon  el-icon-plus" style="font-size:16px;"></i>
                    <span style="font-size:16px;">关注</span>
                    `;
      }
    },

    attention(id, flag) {
      if (localStorage.getItem("Access-Token") != null) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
          method: "post",
          url: this.$store.state.localhostUrl + "/attention/insert",
          data: {
            author_id: id,
            flag: flag,
          },
        }).then(
          (res) => {},
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
    attentionSum(url, flag) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + url,
        data: {
          user_id: this.$route.query.id,
        },
      }).then(
        (res) => {
          if (flag) {
            this.authorSum = res.data;
          } else {
            this.fansSum = res.data;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    checkAuthor(id) {
      if (localStorage.getItem("Access-Token") != null) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
          method: "post",
          url: this.$store.state.localhostUrl + "/attention/check",
          data: {
            author_id: id,
          },
        }).then(
          (res) => {
            if (res.data) {
              this.isSpan = false;
              this.$refs.cc_attension.innerHTML = ` <i class="icon  el-icon-check" style="font-size:16px;"></i>
                    <span style="font-size:16px;">已关注</span>
                  `;
            } else {
              this.isSpan = true;
              this.$refs.cc_attension.innerHTML = ` <i class="icon  el-icon-plus" style="font-size:16px;"></i>
                    <span style="font-size:16px;">关注</span>
                    `;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.isSpan = true;
        this.$refs.cc_attension.innerHTML = ` <i class="icon  el-icon-plus" style="font-size:16px;"></i>
                    <span style="font-size:16px;">关注</span>
                    `;
      }
    },
    changeAttension(event) {
      if (!this.isSpan) {
        if (event) {
          this.$refs.cc_attension.innerHTML = `<span>取消关注</span>`;
          this.$refs.cc_attension.setAttribute("class", "cc_no_attension");
        } else {
          this.$refs.cc_attension.setAttribute("class", "cc_no_attension");
          this.$refs.cc_attension.innerHTML = `<i class="icon el-icon-check"></i>
                                                     <span>已关注</span>`;
        }
      }
    },
    setpaddingTop(px) {
      this.isPadding = px;
    },
    changeBox(A) {
      this.currentview = A;
      this.$store.state.currentView = A;
      if (this.isMessage && A == "message") {
        this.isPadding = "88px";
        this.isMessage = false;
      } else if (!this.isMessage && A == "message") {
        this.isPadding = "58px";
      } else {
        this.isPadding = "88px";
      }
      document.querySelector("#current").scrollIntoView(true);
    },
    messageMobileTop(top, id) {
      this.$store.state.viewRef = "";
      document.querySelector("#current").scrollIntoView(true);
      this.setcenterTabColor();
      setTimeout(() => {
        this.$refs.currentview.mobileTop(top, id);
      }, 10);
    },
    setcenterTabColor() {
      this.$store.state.viewRef = "";
      let arr = [
        "thisclass_one",
        "thisclass_two",
        "thisclass_three",
        "thisclass_four",
      ];
      arr.forEach((element) => {
        this.$refs[element].setAttribute("class", "w_header_nav_a");
      });
    },
    changeColor(name) {
      let arr = [
        "thisclass_one",
        "thisclass_two",
        "thisclass_three",
        "thisclass_four",
      ];
      arr.forEach((element) => {
        if (name == element) {
          this.$refs[name].setAttribute("class", "thisclass");
          this.$store.state.viewRef = name;
        } else {
          this.$refs[element].setAttribute("class", "w_header_nav_a");
        }
      });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true;
        // this.marginTop = document.querySelector('#fixedBar').offsetHeight + 'px';
      } else {
        this.isFixed = false;
        this.marginTop = 0;
        this.isPadding = "58px";
      }
    },
    logout() {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("userId");
      let routerJump = this.$router.resolve({
        path: "/",
      });
      window.open(routerJump.href, "_self");
    },
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  components: {
    works,
    author,
    fans,
    profile,
    collection,
    personProfile,
    message,
    articles,
    loginVue,
  },
};
</script>

<style scoped>
@import "../../assets/css/index.css";
@import "../../assets/css/person.css";
</style>>
    
