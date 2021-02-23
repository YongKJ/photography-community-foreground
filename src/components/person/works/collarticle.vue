<template>
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
            v-for="(index, sub) in collection.length"
            :key="sub"
            :id="collection[sub].id"
          >
            <a
              v-show="isShow"
              href="javascript:void(0)"
              class="vw_cancel_collect"
              :ref="'vw_cancel-' + sub"
              @click="open(collection[sub].id)"
              >取消收藏</a
            >
            <a @click="insurance(collection[sub].id)" style="cursor: pointer">
              <div class="w_pui_search_article_module">
                <div class="cc-lbox-con" style="background: rgb(231, 234, 238)">
                  <img
                    class="cc-lbox"
                    :src="url + collection[sub].image"
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
                    {{ collection[sub].title }}
                  </p>
                  <p class="cc-des">
                    {{ replaceContent(collection[sub].content) }}
                  </p>
                  <div class="cc-tag-wrap-total">
                    <div class="cc-tag-wrap">
                      <i class="cc-icon el-icon-view"></i>
                      <span class="cc-icon-tips">{{
                        collection[sub].glance
                      }}</span>
                    </div>
                    <div class="cc-tag-wrap">
                      <i class="cc-icon el-icon-star-on"></i>
                      <span class="cc-icon-tips">{{
                        collection[sub].coll
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <p style="clear: both"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("Access-Token") != null) {
      this.getCollect();
    }
    if (localStorage.getItem("userId") != this.$route.query.id) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  data() {
    return {
      isShow: true,
      url: this.$store.state.localhostUrl + "/",
      collection: [
        { id: 0, image: "", title: "", content: "", glance: 0, coll: 0 },
      ],
    };
  },
  methods: {
    getCollect() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/article/collection",
        data: {
          userId: this.$route.query.id,
        },
      }).then(
        (res) => {
          this.collection = res.data;
        },
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
      this.$confirm("是否取消收藏?", {
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
            url: this.$store.state.localhostUrl + "/article/cancel",
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
                  message: "已取消收藏!",
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
  },
};
</script>

<style scoped>
@import "../../../assets/css/articles.css";
</style>