<template>
  <div class="message">
    <div class="vw_body">
      <div class="base_width vw_main">
        <div class="vw_leftt">
          <div class="w_pui_slide_menu">
            <div class="cc_list">
              <a
                href="javascript:void(0)"
                :class="{ thisclass: isColor1 }"
                @click="
                  mobileTop('0px', 'isColor1')
                "
                ><span class="vw_nav_part"><bdo>作品评论</bdo></span></a
              >
              <a
                href="javascript:void(0)"
                :class="{ thisclass: isColor2 }"
                @click="
                  mobileTop('60px', 'isColor2')
                "
                ><span class="vw_nav_part"><bdo>博文评论</bdo></span></a
              >
              <a
                href="javascript:void(0)"
                :class="{ thisclass: isColor3 }"
                @click="mobileTop('120px', 'isColor3')"
                ><span class="vw_nav_part"
                  ><bdo>收藏&收录</bdo>
                  <!-- <transition name="message_scale"
                    ><i class="vw_count" v-if="show"></i></transition
                  > -->
                </span></a
              >
              <a
                href="javascript:void(0)"
                :class="{ thisclass: isColor4 }"
                @click="mobileTop('180px', 'isColor4')"
                ><span class="vw_nav_part"><bdo>新粉丝</bdo></span></a
              >
              <div
                class="cc_split"
                style="height: 60px; top: 0px"
                :style="{ height: isHeight, top: isTop }"
              ></div>
            </div>
          </div>
        </div>
        <div class="vw_right">
          <div class="vw_content" ref="vwContent">
            <div class="vw_right">
              <div class="vw_content" ref="vwContent">
                <component
                  v-bind:is="messageview"
                  ref="currentview"
                  :flag="flag"
                ></component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detail from "./detail";
import vwlist from "./vwlist";
import vwnone from "./messagenone";
import newfans from "./newfans";
import collart from "./collart"
export default {
  data() {
    return {
      isHeight: "60px",
      isTop: "0px",
      isColor1: true,
      isColor2: false,
      isColor3: false,
      isColor4: false,
      show: true,
      messageview: "vwnone",
      flag: true,
    };
  },
  mounted() {
    this.mobileTop(this.$store.state.viewTop, this.$store.state.viewColor);
    switch (this.$store.state.viewTop) {
      case "0px":
        this.checkIsNull("/message/check", true);
        break;
      case "60px":
        this.checkIsNull("/message/check_art", false);
        break;
      case '120px':
        this.fansCount("/message/count", true);
      case '180px':
        this.fansCount("/attention/count", false);
    }
  },
  methods: {
    fansCount(url, bool) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + url,
      }).then(
        (res) => {
          if (bool) {
            if (res.data > 0) {
              this.newFans('collart');
            }else {
              this.messageview = "vwnone";
            }
          }else {
            if (res.data > 0) {
              this.newFans("newfans");
            }else {
              this.messageview = "vwnone";
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    newFans(view) {
      this.messageview = null;
      setTimeout(() => {
        this.messageview = view;
      }, 1);
    },
    checkIsNull(url, bool) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "get",
        url: this.$store.state.localhostUrl + url,
      }).then(
        (res) => {
          if (bool) {
            if (res.data) {
              this.flag = true;
              this.messageview = null;
              setTimeout(() => {
                this.messageview = "vwlist";
              }, 1);
            } else {
              this.messageview = "vwnone";
            }
          } else {
            if (res.data) {
              this.flag = false;
              this.messageview = null;
              setTimeout(() => {
                this.messageview = "vwlist";
              }, 1);
            } else {
              this.messageview = "vwnone";
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeMessageView(A, flag) {
      this.flag = flag;
      this.messageview = A;
    },
    mobileTop(top, id) {
      this.isTop = top;
      this.isHeight = "90px";
      setTimeout(() => {
        this.isHeight = "60px";
        switch (id) {
          case "isColor1":
            this.isColor1 = true;
            this.isColor2 = false;
            this.isColor3 = false;
            this.isColor4 = false;
            this.checkIsNull("/message/check", true);
            break;
          case "isColor2":
            this.isColor1 = false;
            this.isColor2 = true;
            this.isColor3 = false;
            this.isColor4 = false;
            this.checkIsNull("/message/check_art", false);
            break;
          case "isColor3":
            this.isColor1 = false;
            this.isColor2 = false;
            this.isColor3 = true;
            this.isColor4 = false;
            this.show = false;
            this.fansCount("/message/count", true);
            break;
          case "isColor4":
            this.isColor1 = false;
            this.isColor2 = false;
            this.isColor3 = false;
            this.isColor4 = true;
            this.fansCount("/attention/count", false);
            break;
        }
      }, 200);
    },
  },
  created() {
    this.$parent.setpaddingTop("58px");
  },
  components: {
    detail,
    vwlist,
    vwnone,
    newfans,
    collart
  },
};
</script>

<style scoped>
@import "../../../assets/css/message.css";
</style>