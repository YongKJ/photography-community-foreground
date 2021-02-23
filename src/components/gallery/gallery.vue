<template>
  <div class="infinite-list-wrapper fullscreens" style="overflow: auto">
    <el-backtop target=".fullscreens"
      ><i class="el-icon-top" style="color: aliceblue"></i
    ></el-backtop>
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
      <div id="gallery">
        <header id="header" class="icui-header header-creative">
          <div class="header__nav">
            <a href="/" class="header__logo"
              ><img src="static/img/home.5df99ca.png"
            /></a>
            <div class="header__center">
              <div>
                <section class="header stage0 stage1 stage2">
                  <div class="header__links header__black">
                    <a
                      target="_self"
                      href="#/gallery"
                      class="header__link active"
                    >
                      创意图片</a
                    >
                    <div class="header__etc">
                      <el-dropdown :placement="100 - 100">
                        <span class="el-dropdown-link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="4"
                            viewBox="0 0 20 4"
                            class="header__etc-svg"
                          >
                            <path
                              fill="#908633"
                              fill-rule="evenodd"
                              d="M2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                            ></path>
                          </svg>
                        </span>
                        <el-dropdown-menu
                          slot="dropdown"
                          style="padding: 0 20px !important"
                        >
                          <router-link to="/skill" target="_blank"
                            ><el-dropdown-item
                              >摄影社区</el-dropdown-item
                            ></router-link
                          >
                          <router-link to="/agr" target="_blank"
                            ><el-dropdown-item
                              >用户协议</el-dropdown-item
                            ></router-link
                          >
                          <router-link to="/about" target="_blank"
                            ><el-dropdown-item
                              >关于我们</el-dropdown-item
                            ></router-link
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="header__search" style="width: 450px; top: 8px">
                    <div class="search-form">
                      <div class="search-wapper">
                        <div class="search-sel">
                          <div>图片</div>
                        </div>
                        <div class="search-input">
                          <input
                            placeholder="开启您的创意之旅"
                            type="text"
                            class="input"
                            v-model="input"
                            @input="handleInput"
                          />
                        </div>
                      </div>
                      <div class="button-section">
                        <i class="clear-icon" :style="{ display: isNone }">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            class="cross"
                            @click="handleSvg"
                          >
                            <g fill="none" fill-rule="evenodd">
                              <g fill="#000" fill-rule="nonzero">
                                <path
                                  d="M893.765 36.235c.282.282.31.721.085 1.035l-.085.099-4.63 4.631 4.63 4.631c.313.313.313.82 0 1.134-.282.282-.721.31-1.035.085l-.099-.085-4.631-4.63-4.631 4.63c-.313.313-.82.313-1.134 0-.282-.282-.31-.721-.085-1.035l.085-.099 4.63-4.631-4.63-4.631c-.313-.313-.313-.82 0-1.134.282-.282.721-.31 1.035-.085l.099.085 4.631 4.63 4.631-4.63c.313-.313.82-.313 1.134 0z"
                                  transform="translate(-882 -36)"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </i>
                        <i class="search-icon" @click="getInput"></i>
                      </div>
                    </div>
                  </div>
                  <div class="header__right">
                    <div :style="{ display: isFalse }" style="margin-top: 8px">
                      <el-dropdown class="cc_message">
                        <a
                          href="javascript:void(0)"
                          class="cc_icon el-dropdown-link"
                        >
                          <i class="el-icon-bell iconfont"></i>
                        </a>
                        <el-dropdown-menu slot="dropdown" class="el-menu">
                          <a
                            @click="
                              redictHref('0px', 'isColor1') || insurance()
                            "
                            ><el-dropdown-item
                              ><span>作品评论</span></el-dropdown-item
                            ></a
                          >
                          <a
                            @click="
                              redictHref('60px', 'isColor2') || insurance()
                            "
                            ><el-dropdown-item
                              ><span>博文评论</span></el-dropdown-item
                            ></a
                          >
                          <a
                            @click="
                              redictHref('120px', 'isColor3') || insurance()
                            "
                            ><el-dropdown-item
                              ><span>收藏&收录</span></el-dropdown-item
                            ></a
                          >
                          <a
                            @click="
                              redictHref('180px', 'isColor4') || insurance()
                            "
                            ><el-dropdown-item
                              ><span>新粉丝</span>
                            </el-dropdown-item></a
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
                          <a @click="insurance() || redicView('profile')"
                            ><el-dropdown-item
                              ><span>个人中心</span></el-dropdown-item
                            ></a
                          >
                          <a @click="redicView('profile') || insurance()"
                            ><el-dropdown-item
                              ><span>设置</span></el-dropdown-item
                            ></a
                          >
                          <a @click="logout()"
                            ><el-dropdown-item
                              ><span>退出登录</span></el-dropdown-item
                            ></a
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                      <el-dropdown class="photo-publish">
                        <a href="#" class="size-50 el-dropdown-link">发布</a>
                        <el-dropdown-menu
                          slot="dropdown"
                          class="el-menu-publish"
                        >
                          <a href="#/create"
                            ><el-dropdown-item>作品</el-dropdown-item></a
                          >
                          <a href="#/create_guide"
                            ><el-dropdown-item>博文</el-dropdown-item></a
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                    <login-vue
                      style="margin-top: 8px"
                      :style="{ display: isTrue }"
                      @changegallery="handleHeader"
                    ></login-vue>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </header>
        <main id="main" style="box-sizing: border-box; min-height: 351px">
          <article class="main-view home-page">
            <div class="banner">
              <div class="block">
                <el-carousel height="480px" style="overflow-y: hidden">
                  <el-carousel-item v-for="item in images" :key="item">
                    <img
                      :src="item"
                      alt=""
                      style="width: 100%; height: 100%; object-fit: cover"
                    />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="popular-searches common-content-width">
              <div class="content">
                <a
                  target="_blank"
                  class="option"
                  @click="getGallery(item.label)"
                  v-for="item in options"
                  :key="item.value"
                  >{{ item.label }}</a
                >
              </div>
            </div>
            <div class="new-pictures common-content-width">
              <div class="head">
                <ul class="home-tab">
                  <li class="home-tab-item active">{{ value }}</li>
                  <li class="home-tab-icon"></li>
                </ul>
              </div>
              <div class="content" style="height: auto; width: 1200px" id="abc">
                <a
                  class="content-img"
                  style="height: 266px; width: 390px"
                  v-for="(index, sub) in count"
                  :key="sub"
                >
                  <div class="img-tag">
                    <div class="img_tag_avatar">
                      <img
                        :src="url + workinfo[sub].photo"
                        @click="insurancess(workinfo[sub].user_id)"
                      />
                      <span class="user_name">{{
                        workinfo[sub].username
                      }}</span>
                      <span class="cc_mod_btn view_btn"
                        ><em>{{ workinfo[sub].glance }}</em
                        >浏览</span
                      >
                    </div>
                  </div>
                  <img
                    class="image"
                    :src="url + workinfo[sub].imageList[0].image"
                    @click="
                      insurances(workinfo[sub].id) ||
                        addGlance(workinfo[sub].user_id, workinfo[sub].id)
                    "
                  />
                </a>
              </div>
            </div>
          </article>
        </main>
      </div>
    </ul>
    <div style="width: 1200px; margin: 0 auto">
      <p v-if="loading" class="iconPoint"><i class="el-icon-loading"></i></p>
    </div>
  </div>
</template>

<script>
import loginVue from "../header/loginandlogout";
export default {
  mounted() {
    if (this.$route.query.search == null || this.$route.query.search == "") {
      let routerJump = this.$router.resolve({
        path: "/gallery",
      });
      window.open(routerJump.href, "_self");
      this.getGallery("");
    } else {
      this.getGallery(this.$route.query.search);
    }
    if (localStorage.getItem("Access-Token") != null) {
      this.handleHeader();
      this.getPerson();
    }
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      perinfo: {},
      input: "",
      isNone: "none",
      value: "全部",
      count: 13,
      loading: false,
      isTrue: "block",
      isFalse: "none",
      images: [
        "static/image/current/1.jpg",
        "static/image/current/2.jpg",
        "static/image/current/3.jpg",
        "static/image/current/4.jpg",
        "static/image/current/5.jpg",
      ],
      options: [
        {
          value: "选项1",
          label: "人像",
        },
        {
          value: "选项2",
          label: "风景",
        },
        {
          value: "选项3",
          label: "纪实",
        },
        {
          value: "选项4",
          label: "生态",
        },
        {
          value: "选项5",
          label: "运动",
        },
        {
          value: "选项6",
          label: "夜景",
        },
        {
          value: "选项7",
          label: "生活",
        },
        {
          value: "选项8",
          label: "手机摄影",
        },
        {
          value: "选项9",
          label: "美食",
        },
        {
          value: "选项10",
          label: "旅游",
        },
        {
          value: "选项11",
          label: "商业",
        },
        {
          value: "选项12",
          label: "LOMO",
        },
        {
          value: "选项13",
          label: "达物",
        },
        {
          value: "选项14",
          label: "宠物",
        },
        {
          value: "选项15",
          label: "儿童",
        },
        {
          value: "选项16",
          label: "汽车",
        },
        {
          value: "选项17",
          label: "观念",
        },
        {
          value: "选项18",
          label: "航拍",
        },
      ],
      workinfo: [
        {
          id: 0,
          glance: 0,
          username: "",
          photo: "",
          user_id: 0,
          imageList: [{ id: 0, image: "" }],
        },
      ],
    };
  },
  computed: {
    noMore() {
      return this.count >= this.$store.state.gallery;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("userId");
      this.isTrue = "block";
      this.isFalse = "none";
    },
    addGlance(userid, id) {
      if (userid != localStorage.getItem("userId")) {
        this.$axios({
          method: "post",
          url: this.$store.state.localhostUrl + "/works/glance",
          data: {
            workId: id,
          },
        }).then(
          (res) => {},
          (err) => {
            console.log(err);
          }
        );
      }
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
          if (typeof res.data != "string") {
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
    getGallery(info) {
      if (info != "") {
        this.value = info;
      }
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/works/gallery",
        data: {
          info: info,
        },
      }).then(
        (res) => {
          this.workinfo = res.data;
          this.$store.state.gallery = this.workinfo.length;
          setTimeout(() => {
            document.getElementById("abc").scrollIntoView();
          }, 1200);
          this.count = 0;
          this.load();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getInput() {
      this.value = "全部";
      this.getGallery(this.input);
    },
    insurances(detail) {
      let routerJump = this.$router.resolve({
        path: "/worksdetail",
        query: { detail: detail },
      });
      window.open(routerJump.href, "_blank");
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        if (this.$store.state.gallery - this.count >= 6) {
          this.count += 6;
        } else if (0 < this.$store.state.gallery - this.count < 6) {
          this.count += this.$store.state.gallery - this.count;
        }
        this.loading = false;
      }, 1000);
    },
    handleInput() {
      if (this.input != "") {
        this.isNone = "inline-block";
      } else {
        this.isNone = "none";
      }
    },
    handleSvg() {
      this.input = "";
      this.isNone = "none";
    },
    handleHeader() {
      this.isTrue = "none";
      this.isFalse = "block";
      this.getPerson();
    },
    insurance() {
      let routerJump = this.$router.resolve({
        path: "/person",
        query: { id: localStorage.getItem("userId") },
      });
      window.open(routerJump.href, "_blank");
    },
    insurancess(id) {
      if (localStorage.getItem("Access-Token") != null) {
        let routerJump = this.$router.resolve({
          path: "/person",
          query: { id: id },
        });
        window.open(routerJump.href, "_blank");
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
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
@import "../../assets/css/gallery.css";
@import "../../assets/css/index.css";
@import "../../assets/css/person.css";
</style>