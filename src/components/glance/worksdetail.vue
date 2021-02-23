<template>
  <div class="widget-theater" style="height: 694px; display: block">
    <div class="theater-main">
      <div class="theater-handler">
        <span class="theater-indicator"
          >{{ imageId }}/{{ works.imageList.length }}</span
        >
        <a
          class="theater-download el-icon-download"
          @click="checkUser(true)"
        ></a>
        <a
          class="theater-close el-icon-star-on"
          title="收藏"
          :style="{ color: color }"
          @click="checkUser(false)"
        >
          <div class="theater-download-tips" v-show="tit_show">
            <p class="tit">这是您的作品</p>
          </div>
        </a>
      </div>
      <div class="theater-swiper" id="theater-swiper">
        <el-carousel
          :interval="3000"
          arrow="always"
          indicator-position="outside"
          trigger
          :autoplay="false"
          style="width: 1020px"
          v-viewer
          @change="carouselChange"
        >
          <el-carousel-item
            v-for="(index, item) in works.imageList"
            :key="item"
          >
            <div
              style="
                color: #000000;
                text-align: center;
                overflow: hidden;
                width: 100%;
                cursor: pointer;
              "
            >
              <img :src="url + works.imageList[item].image" height="520px" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="theater-aside">
      <div class="theater-aside-post">
        <div class="aside-post-head">
          <a class="site-icon popover-action" @click="insurance(works.user_id)">
            <img :src="url + works.photo" />
          </a>
          <a @click="insurance(works.user_id)">{{ works.username }}</a>
          <p>
            <time>{{ dateTime(works.date_time) }}</time>
            <span class="view-count">
              <i class="icon-view"></i>
              {{ works.glance }}
            </span>
          </p>
          <a
            class="aside-site-follow btn btn-yellow"
            ref="aside_site"
            @click="changSpan(isSpan, works.user_id)"
            @mouseenter="changeAttension(true)"
            @mouseleave="changeAttension(false)"
            ><span>关注</span></a
          >
        </div>
        <div class="aside-post-content">
          <h3 class="aside-post-title">{{ works.works_title }}</h3>
          <p class="aside-post-desc">
            <br />
            {{ works.works_describe }}<br />
            <br />
          </p>
        </div>
        <div class="theater-aside-comment">
          <div class="comment-wrapper inline-comment">
            <form class="comment-form">
              <textarea
                name="content"
                required=""
                placeholder="喜欢？摸着我的良心说两句…"
                v-model="content"
              ></textarea>
              <div class="form-action">
                <input
                  type="button"
                  class="comment-btn"
                  style=""
                  value=" 评论"
                  @click="addComment"
                />
              </div>
            </form>
            <ul class="comments-list">
              <li
                class="main-comment"
                v-for="(index, sub) in contents.length"
                :key="sub"
              >
                <div class="comment-content">
                  <a
                    class="site-icon popover-action"
                    @click="insurance(contents[sub].userid)"
                  >
                    <img :src="url + contents[sub].image" />
                  </a>
                  <a
                    class="site-link popover-action"
                    @click="insurance(contents[sub].userid)"
                    >{{ contents[sub].username }}</a
                  >
                  <p class="comment-info">
                    {{ contents[sub].content }}
                  </p>
                  <time>{{ dateTime(contents[sub].date_time) }}</time>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getWorks();
    this.allComments();
    if (localStorage.getItem("Access-Token") != null) {
      this.checkCollect();
    }
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      works: {},
      isSpan: true,
      imageId: 1,
      color: "rgba(255, 255, 255, 0.6)",
      isTrue: false,
      tit_show: false,
      content: "",
      contents: [
        {
          id: 0,
          username: "",
          image: "",
          content: "",
          date_time: "",
          userid: 0,
        },
      ],
    };
  },
  methods: {
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
    carouselChange(key1) {
      this.imageId = key1 + 1;
    },
    checkUser(flag) {
      if (localStorage.getItem("Access-Token") != null) {
        if (flag) {
          this.getImage();
        } else {
          if (this.works.user_id == localStorage.getItem("userId")) {
            this.tit_show = true;
            setTimeout(() => {
              this.tit_show = false;
            }, 1000);
          } else {
            this.changeCollect();
          }
        }
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
    getImage() {
      let link = document.createElement("a");
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        url:
          this.$store.state.localhostUrl +
          "/" +
          this.works.imageList[this.imageId - 1].image,
        responseType: "arraybuffer",
      }).then(
        (res) => {
          // new Blob([data])用来创建URL的file对象或者blob对象
          let url = window.URL.createObjectURL(new Blob([res.data]));
          // 生成一个a标签
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          // 生成时间戳
          let timestamp = new Date().getTime();
          link.download = timestamp + ".jpg";
          document.body.appendChild(link);
          link.click();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeCollect() {
      if (this.isTrue) {
        this.color = "rgba(255, 255, 255, 0.6)";
        this.isCollect();
        this.isTrue = false;
      } else {
        this.color = "#e6c93c";
        this.isCollect();
        this.isTrue = true;
      }
    },
    isCollect() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/works/collect",
        data: {
          flag: !this.isTrue,
          user_id: localStorage.getItem("userId"),
          detail: this.$route.query.detail,
        },
      }).then(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    },
    checkCollect() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/works/check",
        data: {
          user_id: localStorage.getItem("userId"),
          detail: this.$route.query.detail,
        },
      }).then(
        (res) => {
          if (res.data) {
            this.isTrue = true;
            this.color = "#e6c93c";
          } else {
            this.color = "rgba(255, 255, 255, 0.6)";
            this.isTrue = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addComment() {
      if (localStorage.getItem("Access-Token") != null) {
        if (this.content != "") {
          this.$axios({
            headers: {
              "Access-Token": localStorage.getItem("Access-Token"),
            },
            method: "post",
            url: this.$store.state.localhostUrl + "/comment/addcomment",
            data: {
              content: this.content,
              work_id: this.$route.query.detail,
            },
          }).then(
            (res) => {
              this.contents = res.data;
              this.content = "";
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.$message({
            message: "评论不能为空哦",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
    allComments() {
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/comment/work",
        data: {
          work_id: this.$route.query.detail,
        },
      }).then(
        (res) => {
          this.contents = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changSpan(isSpan, id) {
      if (localStorage.getItem("Access-Token") != null) {
        if (localStorage.getItem("userId") != id) {
          if (isSpan) {
            this.isSpan = false;
            this.attention(id, true);
            this.$refs.aside_site.innerHTML = `<i class="icon el-icon-check"></i><span>已关注</span>`;
          } else {
            this.isSpan = true;
            this.attention(id, false);
            this.$refs.aside_site.innerHTML = `<span>关注</span>`;
          }
        } else {
          this.$message({
            message: "用户不能关注自己哦",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
    attention(id, flag) {
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
              this.$refs.aside_site.innerHTML = `<i class="icon el-icon-check"></i><span>已关注</span>`;
            } else {
              this.isSpan = true;
              this.$refs.aside_site.innerHTML = `<span>关注</span>`;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.isSpan = true;
        this.$refs.aside_site.innerHTML = `<span>关注</span>`;
      }
    },
    changeAttension(event) {
      if (!this.isSpan) {
        if (event) {
          this.$refs.aside_site.innerHTML = `<span>取消关注</span>`;
        } else {
          this.$refs.aside_site.innerHTML = `<i class="icon el-icon-check"></i>
                                                            <span>已关注</span>`;
        }
      }
    },
    getWorks() {
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/works/worklet",
        data: {
          detail: this.$route.query.detail,
        },
      }).then(
        (res) => {
          this.works = res.data;
          this.checkAuthor(res.data.user_id);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    insurance(id) {
      if (localStorage.getItem("Access-Token") != null) {
        sessionStorage.removeItem("store", JSON.stringify(this.$store.state));
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
  },
};
</script>

<style scoped>
@import "../../assets/css/worksdetail.css";
</style>