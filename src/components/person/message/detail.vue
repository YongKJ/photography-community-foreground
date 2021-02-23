<template>
  <div class="w_poco_sms_detail">
    <div class="cc_detail">
      <div class="w_pui_sms_detail" style="height: 500px">
        <div class="cc_header">
          <a href="javascript:void(0)" class="cc_back">
            <i class="el-icon-arrow-left" @click="letterPart()"></i>
            <bdo>私信列表</bdo>
          </a>
          <h2></h2>
        </div>
        <div
          class="infinite-list-wrapper"
          style="overflow-y: scroll; height: 410px"
        >
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <li v-for="(index, sub) in count" :key="sub" class="list-item">
              <div class="cc_part cc_part_left">
                <span class="cc_part_time">{{ dateTime(info[sub].date_time) }}</span>
                <div class="cc_part_msg_box">
                  <a href="javascript:void(0)" class="ccc_icon">
                    <img :src="url + info[sub].image" />
                  </a>
                  <div class="cc_part_msg">
                    <i class="cc_arrow_label"></i>
                    <a class="cc_part_content cc_part_content_image"
                    @click="insurance(info[sub].artid)"
                      ><span class="cc_image"
                        ><img :src="url + info[sub].photo"
                      /></span>
                      <h5 class="cc_title">{{ info[sub].username }}</h5>
                      <span class="cc_text">{{ info[sub].content }}</span></a
                    >
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <p v-if="loading" class="cc_part_time">
            加载中<i class="el-icon-loading"></i>
          </p>
          <p v-if="noMore" class="cc_part_time">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flag"],
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      count: 0,
      loading: false,
      info: [
        {
          artid: 0,
          content: "",
          date_time: "",
          image: "",
          photo: "",
          userid: 0,
          username: "",
        },
      ],
    };
  },
  mounted() {
    if (this.flag) {
      this.getInfo("/message/worksment");
    } else {
      this.getInfo("/message/artment");
    }
  },
  computed: {
    noMore() {
      return this.count >= this.$store.state.detail;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
    insurance(id) {
      if(!this.flag) {
        let routerJump = this.$router.resolve({
        path: "/article_detail",
        query: { article: id },
      });window.open(routerJump.href, "_blank");
      }else{
        let routerJump = this.$router.resolve({
        path: "/worksdetail",
        query: { detail: id },
      });window.open(routerJump.href, "_blank");
      }
    },
    // 计算时间差
    getInfo(url) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + url,
      }).then(
        (res) => {
          this.info = res.data;
          this.$store.state.detail = res.data.length;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        if (this.$store.state.detail - this.count >= 3) {
          this.count += 3;
        } else if (0 < this.$store.state.detail - this.count < 3) {
          this.count += this.$store.state.detail - this.count;
        }
        this.loading = false;
      }, 1000);
    },
    letterPart() {
      this.$parent.changeMessageView("vwlist", this.flag);
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/message.css";
.cc_part_content_image {
  display: block;
  min-width: 400px;
}
.cc_part_content_image > .cc_image {
  display: block;
  padding: 10px 10px 0;
}
.cc_part_content_image > .cc_image img {
  max-width: 100%;
}
.cc_part_content_image > .cc_title {
  display: block;
  padding: 17px 20px 0;
  font-size: 18px;
  color: #444;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cc_part_content_image > .cc_text {
  display: block;
  padding: 15px 20px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.infinite-list-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #e2e2e2;
}
.infinite-list-wrapper::-webkit-scrollbar-thumb {
  border-radius: 0px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
</style>