<template>
  <div class="home">
    <header>
      <div class="brand"></div>
      <div class="menu">
        <router-link to="/gallery" class="tuku">创意图库</router-link>
        <router-link to="/skill" target="_blank" class="community"
          >摄影社区</router-link
        >
        <router-link to="/gallery" class="contribute">图片素材</router-link>
        <a @click="insurance" class="contribute">个人中心</a>
        <router-link to="/agr" target="_blank" class="contribute"
          >用户协议</router-link
        >
        <router-link to="/about" target="_blank" class="contribute"
          >关于我们</router-link
        >
      </div>
    </header>
    <main>
      <section class="tuku">
        <div class="gallery shadow"></div>
        <div class="stock shadow">
          <div class="container">
            <div class="right-title">创意图库</div>
            <ul class="right-list">
              <li class="right-list-item">
                <span class="circle-icon" style="width: 21px">⊙</span
                ><span>超多高清素材</span>
              </li>
              <li class="right-list-item">
                <span class="circle-icon" style="width: 21px">⊙</span
                ><span>极致视觉盛宴</span>
              </li>
              <li class="right-list-item">
                <span class="circle-icon" style="width: 21px">⊙</span
                ><span>创意灵感来源</span>
              </li>
            </ul>
            <a target="_blank" href="#/gallery" class="right-btn">进入</a>
          </div>
        </div>
        <div class="premium shadow">
          <div class="container">
            <div class="right-title">摄影社区</div>
            <ul class="right-list">
              <li class="right-list-item">
                <span class="circle-icon" style="width: 21px">⊙</span
                ><span>集结无数摄影爱好者</span>
              </li>
              <li class="right-list-item">
                <span class="circle-icon" style="width: 21px">⊙</span
                ><span>分享原创摄影作品</span>
              </li>
              <li class="right-list-item">
                <span class="circle-icon" style="width: 21px">⊙</span
                ><span>探讨拍摄经验和技巧</span>
              </li>
            </ul>
            <a target="_blank" href="#/skill" class="right-btn">进入</a>
          </div>
        </div>
        <div class="content">
          <div class="tuku-title">
            <div class="title-main">图库</div>
          </div>
          <div class="tuku-desc">高清素材图库，享受视觉带来的盛宴</div>
          <div class="tuku-search">
            <input
              class="search-input tuchong_stock_search_input"
              type="text"
              placeholder="搜索行摄图库中的图片素材"
              v-model="value"
            />
            <div
              class="search-icon tuchong_stock_search_btn"
              @click="toGallery"
            ></div>
          </div>
        </div>
      </section>
      <section id="community" class="community">
        <div class="content">
          <a class="title" href="#/skill" target="_blank">
            <span class="text">社区</span>
            <div class="contact">
              <span class="enter">进入</span><span class="enter-icon"></span>
            </div>
          </a>
          <a class="intro" href="#" target="_self"
            >汇聚无数摄影师和视角爱好者的拍摄经验和技巧，分享原创摄影作品</a
          >
          <div class="hot-menu">
            <a class="hot-posts">热门作品</a>
          </div>
          <div class="hot-line"></div>
          <div class="postList">
            <li class="post-row">
              <div
                class="post-item"
                style="display: inline-block; margin-left: 0px"
              >
                <a
                  class="image"
                  style="width: 425px; height: 319px; display: inline-block"
                  @click="insurances(false, info[0].id)"
                >
                  <img
                    :src="url + info[0].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                  />
                </a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[0].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[0].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[0].user_id)"
                      class="site-link popover-action"
                      >{{ info[0].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[0].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[0].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 319px; height: 319px; display: inline-block"
                  @click="insurances(false, info[6].id)"
                >
                  <img
                    :src="url + info[6].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[6].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[6].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[6].user_id)"
                      class="site-link popover-action"
                      >{{ info[6].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[6].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[6].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 426px; height: 319px; display: inline-block"
                  @click="insurances(false, info[1].id)"
                >
                  <img
                    :src="url + info[1].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[1].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[1].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[1].user_id)"
                      class="site-link popover-action"
                      >{{ info[1].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[1].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[1].praise }}</span
                    >
                  </div>
                </div>
              </div>
            </li>
            <li class="post-row">
              <div
                class="post-item"
                style="display: inline-block; margin-left: 0px"
              >
                <a
                  class="image"
                  style="width: 349px; height: 285px; display: inline-block"
                  @click="insurances(false, info[5].id)"
                  ><img
                    :src="url + info[5].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[5].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[5].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[5].user_id)"
                      class="site-link popover-action"
                      >{{ info[5].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[5].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[5].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 213px; height: 285px; display: inline-block"
                  @click="insurances(false, info[4].id)"
                >
                  <img
                    :src="url + info[4].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[4].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[4].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[4].user_id)"
                      class="site-link popover-action"
                      >{{ info[4].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[4].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[4].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 213px; height: 285px; display: inline-block"
                  @click="insurances(false, info[3].id)"
                  ><img
                    :src="url + info[3].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[3].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[3].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[3].user_id)"
                      class="site-link popover-action"
                      >{{ info[3].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[3].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[3].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 380px; height: 285px; display: inline-block"
                  @click="insurances(false, info[2].id)"
                  ><img
                    :src="url + info[2].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[2].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[2].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[2].user_id)"
                      class="site-link popover-action"
                      >{{ info[2].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[2].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[2].praise }}</span
                    >
                  </div>
                </div>
              </div>
            </li>
            <li class="post-row">
              <div
                class="post-item"
                style="display: inline-block; margin-left: 0px"
              >
                <a
                  class="image"
                  style="width: 289px; height: 289px; display: inline-block"
                  @click="insurances(false, info[8].id)"
                  ><img
                    :src="url + info[8].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[8].user_id)"
                      class="site-icon popover-action"
                      ><img
                        :src="url + info[8].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[8].user_id)"
                      class="site-link popover-action"
                      >{{ info[8].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[8].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[8].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 289px; height: 289px; display: inline-block"
                  @click="insurances(false, info[10].id)"
                  ><img
                    :src="url + info[10].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[10].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[10].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[10].user_id)"
                      class="site-link popover-action"
                      >{{ info[10].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[10].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i
                      >{{ info[10].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 289px; height: 289px; display: inline-block"
                  @click="insurances(false, info[9].id)"
                  ><img
                    :src="url + info[9].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[9].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[9].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      @click="insurances(true, info[9].user_id)"
                      class="site-link popover-action"
                      >{{ info[9].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[9].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[9].praise }}</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="post-item"
                style="display: inline-block; margin-left: 15px"
              >
                <a
                  class="image"
                  style="width: 288px; height: 289px; display: inline-block"
                  @click="insurances(false, info[7].id)"
                  ><img
                    :src="url + info[7].imageList[0].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                    "
                /></a>
                <div class="foot">
                  <div class="post-foot">
                    <a
                      @click="insurances(true, info[7].user_id)"
                      class="site-icon popover-action"
                      ><i class="vip-yellow vip-right"></i
                      ><img
                        :src="url + info[7].photo"
                        style="object-fit: cover"
                    /></a>
                    <a
                      class="site-link popover-action"
                      @click="insurances(true, info[7].user_id)"
                      >{{ info[7].username }}</a
                    >
                  </div>
                  <div class="post-ops">
                    <span class="icon-like" href="#"
                      ><i class="el-icon-view"></i>{{ info[7].glance }}</span
                    >
                    <span class="icon-comment" href="#"
                      ><i class="el-icon-star-on"></i>{{ info[7].praise }}</span
                    >
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getIndex();
  },
  name: "index",
  data() {
    return {
      value: "",
      value1: "",
      url: this.$store.state.localhostUrl + "/",
      info: [
        {
          id: 0,
          glance: 0,
          praise: 0,
          user_id: 15,
          username: "",
          photo: "",
          imageList: [{ image: "" }],
        },
      ],
    };
  },
  methods: {
    getIndex() {
      this.$axios({
        method: "get",
        url: this.$store.state.localhostUrl + "/works/index",
      }).then(
        (res) => {
          this.info = res.data;
          console.log(this.info);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    insurance() {
      if (localStorage.getItem("userId") != null) {
        let routerJump = this.$router.resolve({
          path: "/person",
          query: { id: localStorage.getItem("userId") },
        });
        window.open(routerJump.href, "_self");
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
        localStorage.removeItem("userId");
        localStorage.removeItem("Access-Token");
      }
    },
    insurances(bool, id) {
      if (bool) {
        if (localStorage.getItem("userId") != null) {
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
          localStorage.removeItem("userId");
          localStorage.removeItem("Access-Token");
        }
      } else {
        let routerJump = this.$router.resolve({
          path: "/worksdetail",
          query: { detail: id },
        });
        window.open(routerJump.href, "_blank");
      }
    },
    toGallery() {
      if (this.value == "") {
        this.value1 = "风景";
      } else {
        this.value1 = this.value;
      }
      let routerJump = this.$router.resolve({
        path: "/gallery",
        query: { search: this.value1 },
      });
      window.open(routerJump.href, "_blank");
      this.value = "";
    },
  },
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>
