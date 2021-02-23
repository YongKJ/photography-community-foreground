<template>
  <div id="base_list">
    <div class="vw_message_list" style="height: 240px">
      <div
        class="vw_message_part"
        v-for="(index, sub) in info.length"
        :key="sub"
      >
        <div class="w_poco_message_briefing">
          <!---->
          <!---->
          <div class="cc_type_a">
            <div class="cc_icon">
              <div class="w_default_avatar">
                <a
                  class="avatar-wrapper size-64"
                  @click="insurance(info[sub].user_id, true, -1)"
                >
                  <img
                    :src="url + info[sub].photo"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                      border-radius: 50%;
                    "
                  />
                </a>
                <!---->
              </div>
            </div>
            <div class="cc_msg">
              <span class="cc_msg_main"
                ><a
                  @click="insurance(info[sub].user_id, true, -1)"
                  style="cursor:pointer;"
                  >{{ info[sub].username }}</a
                >
                <bdo class="cc_margin_10">收藏了你的作品</bdo
                ><a @click="insurance(info[sub].id, false, info[sub].flag)"
                  style="cursor:pointer;">
                  #{{ info[sub].works_title }}</a
                ></span
              >
              <span class="cc_time">{{ dateTime(info[sub].date_time) }}</span>
            </div>
          </div>
          <!---->
          <!---->
        </div>
      </div>
    </div>
    <div class="vw_message_pagination">
      <ul class="pagination">
        <li><a @click="pageTonext(false)">❮</a></li>
        <li><a @click="pageTonext(true)">❯</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("Access-Token") != null) {
      this.getAttention();
      this.fansCount();
    } else {
      this.$message({
        message: "登录超时",
        type: "warning",
      });
    }
  },
  data() {
    return {
      count: 1,
      url: this.$store.state.localhostUrl + "/",
      sum: 0,
      info: [],
      information: [
        {
          id: -1,
          user_id: 0,
          date_time: "",
          username: "",
          photo: "",
          works_title: "",
        },
      ],
      i: 0,
    };
  },
  methods: {
    pageTonext(flag) {
      if (flag) {
        this.i++;
        if (this.i < this.sum && 2 * this.i - 1 < this.sum) {
          this.info = [];
          this.info.push(this.information[2 * this.i - 2]);
          this.info.push(this.information[2 * this.i - 1]);
        } else if (2 * this.i - 2 == this.sum - 1 && this.sum % 2 != 0) {
          this.info = [];
          this.info.push(this.information[this.i]);
        } else {
          this.i--;
        }
      } else {
        this.i--;
        if (this.i > 0) {
          this.info = [];
          this.info.push(this.information[2 * this.i - 2]);
          this.info.push(this.information[2 * this.i - 1]);
        } else {
          this.i++;
        }
      }
    },
    fansCount() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + "/message/count",
      }).then(
        (res) => {
          this.sum = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    insurance(id, bool, flag) {
      sessionStorage.removeItem("store", JSON.stringify(this.$store.state));
      if (bool) {
        let routerJump = this.$router.resolve({
          path: "/person",
          query: { id: id },
        });
        window.open(routerJump.href, "_blank");
      } else {
        if (flag == 1) {
          let routerJump = this.$router.resolve({
            path: "/worksdetail",
            query: { detail: id },
          });
          window.open(routerJump.href, "_blank");
        }else {
           let routerJump = this.$router.resolve({
            path: "/article_detail",
            query: { article: id },
          });
          window.open(routerJump.href, "_blank");
        }
      }
    },
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
    getAttention() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + "/message/collect",
      }).then(
        (res) => {
          this.information = res.data;
          if (res.data.length == 1) {
            this.info.push(this.information[0]);
            this.i = 0;
          } else {
            this.info.push(this.information[0]);
            this.info.push(this.information[1]);
            this.i = 1;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/newfans.css";
</style>