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
              <div
                class="w_default_avatar"
              >
                <a
                  @click="insurance(info[sub].top)"
                  class="avatar-wrapper size-64"
                  ><img
                    :src="url + info[sub].image"
                    style="
                      object-fit: cover;
                      width: 100%;
                      height: 100%;
                      display: inline-block;
                      border-radius: 50%;
                    "
                /></a>
                <!---->
              </div>
            </div>
            <div class="cc_msg">
              <span class="cc_msg_main"
                ><a @click="insurance(info[sub].top)" style="cursor: pointer">{{
                  info[sub].username
                }}</a>
                <bdo class="cc_margin_10">关注了你</bdo></span
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
      this.getAttention(1);
      this.fansCount()
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
      info: [
        {
          top: 0,
          date_time: "",
          username: "",
          image: "",
        },
      ],
    };
  },
  methods: {
    pageTonext(flag) {
      var index = this.sum%2==0?~~(this.sum/2):~~(this.sum/2)+1
      if (flag && this.count < index) {
        this.count += 1;
        this.getAttention(this.count)
      } else if (!flag && this.count > 1) {
        this.count -= 1;
        this.getAttention(this.count)
      }else {
        this.$message({
        message: "已到尽头",
        type: "warning",
      });
      }
    },
    fansCount() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + "/attention/count",
      }).then(
        (res) => {
          this.sum = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    insurance(id) {
      sessionStorage.removeItem("store", JSON.stringify(this.$store.state));
      let routerJump = this.$router.resolve({
        path: "/person",
        query: { id: id },
      });
      window.open(routerJump.href, "_blank");
    },
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
    getAttention(page) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/attention/attention_list",
        data:{
          page: page
        }
      }).then(
        (res) => {
          this.info = res.data.list;
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