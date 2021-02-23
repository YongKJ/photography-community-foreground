<template>
  <div class="tab-content-container works-tab-container">
    <div class="tab-content js-tab-content">
      <div class="works-content works-detail">
        <div
          infinite-scroll-scrolling-after="function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}"
          class="vw_works_list"
        >
          <div
            class="w_user_works_preview works-preview"
            data-widget_cache_key="1604472929451"
            v-for="(index, sub) in userinfo.length"
            :key="sub"
            :id="userinfo[sub].id"
          >
            <div
              class="works-item"
              @mouseenter="changeDisplay(true, 'option-' + sub)"
              @mouseleave="changeDisplay(false, 'option-' + sub)"
            >
              <a
                target="_blank"
                @click="insurance(userinfo[sub].id)"
                class="works-image"
              >
                <div class="cc_shadow"></div>
                <img
                  :src="url + userinfo[sub].imageList[0].image"
                  class="works-image__img"
                  style="height: 100%"
                />
              </a>
              <div class="works-info">
                <div class="works-time">
                  {{ dateTime(userinfo[sub].date_time) }}
                </div>
                <div class="works-title">{{ userinfo[sub].works_title }}</div>
                <div class="tag-list">
                  <span
                    class="tag-item"
                    v-for="i in splitTag(userinfo[sub].tag)"
                    :key="i"
                    >{{ i }}</span
                  >
                </div>
                <div class="works-count-info">
                  <div class="cc_info_left">
                    <div class="cc_left_tag">
                      <span class="el-icon-view"></span>
                      <span>{{ userinfo[sub].glance }}</span>
                      <span class="el-icon-chat-dot-square"></span>
                      <span style="margin-left: -3px">{{
                        userinfo[sub].praise
                      }}</span>
                    </div>
                    <div class="works-option-wrapper" v-show="isShow">
                      <div class="works-option" :ref="'option-' + sub">
                        <el-button type="text" @click="open(userinfo[sub].id)"
                          >取消收藏</el-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      this.getCollection();
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
      userinfo: [
        {
          id: 0,
          works_title: "",
          classify: "",
          works_describe: "",
          tag: "",
          date_time: "",
          glance: 0,
          praise: 0,
          user_id: 15,
          imageList: [{ id: 0, image: "" }],
        },
      ],
    };
  },
  methods: {
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
    getCollection() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/works/collection",
        data: {
          user_id: this.$route.query.id,
        },
      }).then(
        (res) => {
          this.userinfo = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    splitTag(tag) {
      let spilt = tag.split(",");
      if (spilt[0] == "") {
        return 0;
      } else {
        return spilt;
      }
    },
    insurance(id) {
      let routerJump = this.$router.resolve({
        path: "/worksdetail",
        query: { detail: id },
      });
      window.open(routerJump.href, "_blank");
    },
    changeDisplay(event, name) {
      if (event) {
        this.$refs[name][0].setAttribute("class", "works-option_1");
      } else {
        this.$refs[name][0].setAttribute("class", "works-option");
      }
    },
    open(id) {
      this.$confirm("是否取消收藏?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
      })
        .then(() => {
          document.getElementById(id).style.display = "none";
          this.$axios({
            headers: {
              "Access-Token": localStorage.getItem("Access-Token"),
            },
            method: "post",
            url: this.$store.state.localhostUrl + "/works/cancel",
            data: {
              user_id: this.$route.query.id,
              work_id: id,
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
@import "../../../assets/css/works.css";
</style>