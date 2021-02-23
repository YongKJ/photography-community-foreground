<template>
  <div class="author">
    <div class="tab-content-container vw_no_bg">
      <div class="tab-content js-tab-content">
        <div class style>
          <div class="vw_list_title">
            <bdo>{{ username }}</bdo> 有 <bdo>{{ authors.length }}</bdo> 个粉丝
          </div>
          <div style="background-color: #fff; padding-bottom: 60px">
            <div
              class="w_follower_preview foller-item follower-preview"
              v-for="(index, i) in authors.length"
              :key="i"
            >
              <div class="cc-user-img-con">
                <div class="w_default_avatar follower-avatar">
                  <a
                    @click="insurance(authors[i].top)"
                    class="avatar-wrapper size-140"
                  >
                    <img
                      :src="url + authors[i].image"
                      style="
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        border-radius: 50%;
                      "
                    />
                  </a>
                </div>
              </div>
              <a href="#" target="_blank">
                <p class="user-name">
                  <span class="cc-normal-text">{{ authors[i].username }}</span>
                </p>
              </a>
              <div
                class="w_pui_follow_button follow-other-button cc_topic_green"
                data-widget_cache_key="1604300633136"
              >
                <div class="cc_follow_btn" :ref="'cc_follow_btn_' + i">
                  <span
                    class="cc_attension"
                    style="width: 70px"
                    @click="
                      changeSpaned('cc_follow_btn_' + i, i, authors[i].top)
                    "
                  >
                    <i class="icon el-icon-plus"></i>
                    <span>关注</span>
                  </span>
                </div>
              </div>
            </div>
            <nobody-vue v-show="isTrue" :body="name"></nobody-vue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nobodyVue from "./nobody";
export default {
  mounted() {
    window.changeSpaned = this.changeSpaned;
    window.changeSpan = this.changeSpan;
    window.changeAttension = this.changeAttension;
    this.getAuthors();
  },
  data() {
    return {
      isTrue: false,
      name: "暂无摄影师关注",
      username: localStorage.getItem("username"),
      url: this.$store.state.localhostUrl + "/",
      isTrue: true,
      authors: [
        {
          top: 0,
          next: 0,
          username: "",
          image: "",
        },
      ],
    };
  },
  methods: {
    getAuthors() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/attention/fans",
        data: {
          user_id: this.$route.query.id,
        },
      }).then(
        (res) => {
          this.authors = res.data;
          if (res.data.length == 0) {
            this.isTrue = true;
          } else {
            this.isTrue = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addAuthor(id, flag) {
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
    changeSpaned(name, i, id) {
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
            this.isTrue = true;
          } else {
            this.isTrue = false;
          }
          if (localStorage.getItem("userId") == id) {
            this.$message({
              message: "用户不能关注自己哦",
              type: "warning",
            });
          } else if (!this.isTrue) {
            this.addAuthor(id, true);
            this.$refs[name][0].innerHTML =
              `<span
                    class="cc_attension"
                    style="width: 70px;height:30px;"
                    onclick="changeSpan('` +
              name +
              `',` +
              i +
              `,` +
              id +
              `)"
                    id="cc_attension_` +
              i +
              `"
                    onmouseover="changeAttension(true,'cc_attension_` +
              i +
              `')"
                    onmouseout="changeAttension(false,'cc_attension_` +
              i +
              `')"
                  >
                    <i class="icon iconfont el-icon-check"></i>
                    <span>已关注</span>
                  </span>`;
          } else {
            this.$message({
              message: "您已关注此用户",
              type: "warning",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeSpan(name, i, id) {
      this.addAuthor(id, false);
      this.$refs[name][0].innerHTML =
        `<span
                    class="cc_attension"
                    style="width: 70px;height:30px""
                    onclick="changeSpaned('` +
        name +
        `',` +
        i +
        `,` +
        id +
        `)"
                  >
                    <i class="icon el-icon-plus"></i>
                    <span>关注</span>
                  </span>`;
    },
    changeAttension(event, name) {
      if (event) {
        document.getElementById(name).innerHTML = `取消关注`;
      } else {
        document.getElementById(
          name
        ).innerHTML = `<i class="icon el-icon-check"></i>
                                                     <span>已关注</span>`;
      }
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
  components: {
    nobodyVue,
  },
};
</script>

<style scoped>
@import "../../../assets/css/author.css";
</style>