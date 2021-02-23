<template>
  <div class="works">
    <div class="vw-tool clearfix">
      <div class="vw-filter-works-module">
        <ul>
          <li data-id="0"><a href="javascript:;" class="active">全部</a></li>
        </ul>
      </div>
      <div class="vw-search-works-module">
        <div id="search" class="vw_search">
          <div class="btn" @click="getUserArticle(search)">
            <i
              class="el-icon-search"
              style="
                font-size: 16px;
                margin-top: 2px;
                color: #7c7f84;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
              "
            ></i>
          </div>
          <input
            type="text"
            autocomplete="off"
            placeholder="搜索作品"
            class="input-text"
            v-model="search"
          />
        </div>
      </div>
    </div>
    <div class="tab-content-container works-tab-container">
      <div class="tab-content js-tab-content">
        <div class="works-content works-detail">
          <div
            infinite-scroll-scrolling-after="function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}"
            class="vw_collection_article"
          >
            <div
              class="vw_collection_article_item"
              @mouseenter="changeDisplay(true, 'vw_cancel-' + sub)"
              @mouseleave="changeDisplay(false, 'vw_cancel-' + sub)"
              v-for="(index, sub) in articleinfo.length"
              :key="sub"
              :id="articleinfo[sub].id"
            >
              <a
                v-show="isShow"
                href="javascript:void(0)"
                class="vw_cancel_collect"
                :ref="'vw_cancel-' + sub"
                @click="open(articleinfo[sub].id)"
                >删除博文</a
              >
              <a
                @click="
                  insurance(articleinfo[sub]['id']) ||
                    addGlance(
                      articleinfo[sub]['users_id'],
                      articleinfo[sub]['id']
                    )
                "
                style="cursor: pointer"
              >
                <div class="w_pui_search_article_module">
                  <div
                    class="cc-lbox-con"
                    style="background: rgb(231, 234, 238)"
                  >
                    <img
                      class="cc-lbox"
                      :src="url + articleinfo[sub]['image']"
                      width=""
                      height=""
                      style="
                        opacity: 1;
                        display: block;
                        margin-left: auto;
                        height: 160px;
                        width: 100%;
                        margin-top: -2.5px;
                        object-fit: cover;
                      "
                    />
                    <div class="cc-img-cover"></div>
                  </div>
                  <div class="cc-rbox">
                    <p class="cc-title">
                      {{ articleinfo[sub]["title"] }}
                    </p>
                    <div class="cc-tag-wrap-total">
                      <div class="cc-tag-wrap">
                        <i class="cc-icon el-icon-view"></i>
                        <span class="cc-icon-tips">{{
                          articleinfo[sub]["glance"]
                        }}</span>
                      </div>
                      <div class="cc-tag-wrap">
                        <i class="cc-icon el-icon-star-on"></i>
                        <span class="cc-icon-tips">{{
                          articleinfo[sub]["coll"]
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <none-vue v-show="isDisplay"></none-vue>
            <p style="clear: both"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noneVue from "../message/vwnone";
export default {
  mounted() {
    this.getUserArticle("");
    if (localStorage.getItem("userId") != this.$route.query.id) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  data() {
    return {
      isShow: true,
      isDisplay: false,
      search: "",
      url: this.$store.state.localhostUrl + "/",
      articleinfo: [
        { id: 0, image: "", title: "", glance: "", coll: "", users_id: 0 },
      ],
    };
  },
  methods: {
    changeDisplay(event, name) {
      if (event) {
        this.$refs[name][0].setAttribute(
          "class",
          "vw_cancel_collect vw_cancel"
        );
      } else {
        this.$refs[name][0].setAttribute("class", "vw_cancel_collect");
      }
    },
    open(id) {
      this.$confirm("是否删除博文?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
      })
        .then(() => {
          this.$axios({
            headers: {
              "Access-Token": localStorage.getItem("Access-Token"),
            },
            method: "post",
            url: this.$store.state.localhostUrl + "/article/deleterious",
            data: {
              user_id: this.$route.query.id,
              art_id: id,
            },
          }).then(
            (res) => {
              if (res.data) {
                document.getElementById(id).style.display = "none";
                this.$message({
                  type: "success",
                  message: "已删除博文!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "操作失败，请稍后再试！",
                });
              }
            },
            (err) => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    getUserArticle(search) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/article/articles",
        data: {
          userId: this.$route.query.id,
          search: search,
        },
      }).then(
        (res) => {
          this.articleinfo = res.data;
          if (this.articleinfo.length == 0) {
            this.isDisplay = true;
          } else {
            this.isDisplay = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addGlance(userid, id) {
      if (userid != localStorage.getItem("userId")) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
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
      }
    },
    insurance(article) {
      let routerJump = this.$router.resolve({
        path: "/article_detail",
        query: { article: article },
      });
      window.open(routerJump.href, "_blank");
    },
  },
  components: {
    noneVue,
  },
};
</script>

<style scoped>
@import "../../../assets/css/works.css";
@import "../../../assets/css/articles.css";
</style>