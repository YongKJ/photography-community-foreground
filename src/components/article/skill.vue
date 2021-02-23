<template>
  <div
    class="infinite-list-wrapper fullscreen"
    style="overflow: auto"
    ref="fullscreen"
  >
    <el-backtop target=".fullscreen"
      ><i class="el-icon-top" style="color: aliceblue"></i
    ></el-backtop>
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
      <div class="infinite-list-wrapper">
        <div class="base_body">
          <div class="base_page" id="base_list">
            <div>
              <header-vue></header-vue>
              <div class="skill-list-page w1200 clearfix list-page">
                <div class="main fl">
                  <div class>
                    <div class="banner" id="banner">
                      <div class="swiper-container swiper-container-horizontal">
                        <div class="block">
                          <el-carousel
                            height="260px"
                            arrow="never"
                            trigger="click"
                          >
                            <el-carousel-item>
                              <a
                                @click=" insurance(25)"
                                style="cursor:pointer;"
                                target="_blank"
                              >
                                <img
                                  src="static/image/current/15621181425686828_200478990.jpg"
                                  class="swiper-slide"
                                />
                              </a>
                            </el-carousel-item>
                            <el-carousel-item>
                              <a
                                @click=" insurance(26)"
                                style="cursor:pointer;"
                                target="_blank"
                              >
                                <img
                                  src="static/image/current/15610246845339763_200967826.jpg"
                                  class="swiper-slide"
                                />
                              </a>
                            </el-carousel-item>
                          </el-carousel>
                        </div>
                      </div>
                    </div>
                    <div class="w_pui_nav_select_list">
                      <div class="nav">
                        <ul class="list clearfix">
                          <li class="cur"><bdo class="cc_text">全部</bdo></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="item-wrap">
                    <li
                      v-for="(index, sub) in count"
                      class="list-item"
                      :key="sub"
                    >
                      <div class="pui_list_img_txt">
                        <div class="item clearfix">
                          <div class="lbox">
                            <a
                              @click="
                                insurance(articles[sub]['id']) ||
                                  addGlance(articles[sub]['id'])
                              "
                              style="
                                width: 238px;
                                height: 160px;
                                background: rgba(0, 0, 0, 0);
                              "
                            >
                              <div class="fade-box"></div>
                              <img
                                :src="url + articles[sub]['image']"
                                width="238px"
                                height="160px"
                              />
                            </a>
                          </div>
                          <div class="rbox" style="width: 544px">
                            <a
                              @click="
                                insurance(articles[sub]['id']) ||
                                  addGlance(articles[sub]['id'])
                              "
                              style="cursor: pointer"
                              target="_blank"
                            >
                              <h3>
                                {{ articles[sub]["title"] }}
                              </h3>
                            </a>
                            <div class="des">
                              <span>
                                {{ replaceContent(articles[sub]["content"]) }}
                              </span>
                            </div>
                            <ul class="list clearfix">
                              <li>
                                <i class="iconfont el-icon-view"></i
                                >{{ articles[sub]["glance"] }}
                              </li>
                              <li>
                                <i class="iconfont el-icon-star-on"></i
                                >{{ articles[sub]["coll"] }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
                <div class="col">
                  <div id="search" class="col_search">
                    <div class="btn" @click="getSearch">
                      <i class="iconfont el-icon-search"></i>
                    </div>
                    <input
                      type="text"
                      name=" "
                      id=" "
                      placeholder="搜索技巧"
                      class="input-text"
                      v-model="search"
                    />
                  </div>
                  <div
                    id="move_right"
                    class="hoving"
                    :class="{ fixedBar: isFixed }"
                  >
                    <div class="hot">
                      <h3 class="title">一周热文</h3>
                      <ul class="list clearfix">
                        <li v-for="(index, sub) in hots" :key="sub">
                          <a
                            @click="insurance(hots[sub].id)"
                            target="_blank"
                            style="cursor: pointer"
                            >{{ hots[sub].title }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ul>
    <div style="width: 1200px; margin: 0 auto">
      <p v-if="loading" class="iconPoint"><i class="el-icon-loading"></i></p>
    </div>
  </div>
</template>

<script>
import headerVue from "../header/header";
export default {
  mounted() {
    this.getArticleinfo();
    this.getHot();
    this.offsetTop = document.querySelector("#move_right").offsetTop;
    this.$refs.fullscreen.addEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      search: "",
      isFixed: false,
      count: 0,
      loading: false,
      articles: [
        { id: 0, image: "", title: "", content: "", glance: 0, coll: 0 },
      ],
      hots: [{ id: 0, title: "" }],
    };
  },
  computed: {
    noMore() {
      return this.count >= this.$store.state.length;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    getHot() {
      this.$axios({
        method: "get",
        url: this.$store.state.localhostUrl + "/article/garrot",
      }).then(
        (res) => {
          this.hots = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getSearch() {
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/article/search",
        data: {
          search: this.search,
        },
      }).then(
        (res) => {
          this.count = 0;
          this.articles = res.data;
          this.$store.state.length = this.articles.length;
          this.load();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getArticleinfo() {
      this.$axios({
        method: "get",
        url: this.$store.state.localhostUrl + "/article/gentiles",
      }).then(
        (res) => {
          this.articles = res.data;
          this.$store.state.length = this.articles.length;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addGlance(id) {
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/article/glance",
        data: {
          articleId: id,
        },
      }).then(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    },
    replaceContent(strValue) {
      var reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
      var tempValue = strValue.match(reg); //匹配结果，可能为空，还需要进行判断
      var resultStr = "";
      if (tempValue != null) {
        resultStr = tempValue.join("");
      }
      return resultStr; //返回匹配的字符串
    },
    insurance(article) {
      let routerJump = this.$router.resolve({
        path: "/article_detail",
        query: { article: article },
      });
      window.open(routerJump.href, "_blank");
    },
    destroyed() {
      this.$refs.fullscreen.removeEventListener("scroll", this.handleScroll); // 离开页面 关闭监听 不然会报错
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        if (this.$store.state.length - this.count >= 5) {
          this.count += 5;
        } else if (0 < this.$store.state.length - this.count < 5) {
          this.count += this.$store.state.length - this.count;
        }
        this.loading = false;
      }, 1000);
    },
    handleScroll() {
      var scrollTop =
        this.$refs.fullscreen.pageYOffset || this.$refs.fullscreen.scrollTop;
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
  },
  components: { headerVue },
};
</script>

<style scoped>
@import "../../assets/css/skill.css";
</style>