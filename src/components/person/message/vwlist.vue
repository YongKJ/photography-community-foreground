<template>
  <div class="vw_system_list">
    <div class="vw_letter_part" @click="letterPart()">
      <div class="w_pui_sms_briefing">
        <div class="cc_wrap">
          <div class="cc_icon">
            <div class="w_default_avatar">
              <span class="avatar-wrapperr sizer-64">
                <img
                  :src="url + info.image"
                  style="
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    border-radius: 50%;
                  "
                />
              </span>
            </div>
            <!-- <i class="cc_unread">5</i> -->
          </div>
          <div class="cc_msg">
            <span class="cc_msg_header">
              <a href="#">{{ info.username }}</a>
              <bdo>{{ dateTime(info.date_time) }}</bdo>
            </span>
            <span class="cc_msg_content">
              <div class="w_pui_faceicon_bypoco">
                <div class="cc_content">{{ info.content }}</div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flag"],
  mounted() {
    if (this.flag) {
      this.getInfo("/message/work");
    } else {
      this.getInfo("/message/article");
    }
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      info: {},
    };
  },
  methods: {
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
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
        },
        (err) => {
          console.log(err);
        }
      );
    },
    letterPart() {
      this.$parent.changeMessageView("detail", this.flag);
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/message.css";
</style>