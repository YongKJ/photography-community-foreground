<template>
  <div class="about">
    <div class="header_about">
      <div class="header_logo fl"></div>
      <login-vue v-show="isTrue"></login-vue>
      <div class="header_text">
        <div class="top topp" ref="top">
          <div class="title title_top" ref="title">
            关于我们已经汇聚了无数摄影师和视觉爱好者
          </div>
          <div class="describe_zh zh_top" ref="describe_zh">
            在这里，发现基于共同兴趣的同好，鼓励原创和分享精神
          </div>
          <div class="describe_en en_top" ref="describe_en">
            除了美好的摄影和技能，我们更在意影像背后价值观的认同
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginVue from '../header/loginandlogout';
export default {
  name: "aboutus",
  data(){
    return{
      show: true,
      count: '',
      timer: null,
      email: '',
      code: '',
      password: '',
      isEmail: false,
      isPwd: false,
      pwd: false,
      isTrue: true
    }
  },
  mounted() {
    if (localStorage.getItem("Access-Token") != null) {
      this.isTrue = false;
    }else {
      this.isTrue = true;
    }
    setTimeout(() => {
      this.$refs.title.setAttribute("class", "title title_top move_up");
      setTimeout(() => {
        this.$refs.describe_zh.setAttribute(
          "class",
          "describe_zh zh_top move_up"
        );
        setTimeout(() => {
          this.$refs.describe_en.setAttribute(
            "class",
            "describe_en en_top move_up"
          );
        }, 300);
      }, 600);
    }, 50);
  },
  components:{
    loginVue
  }
};
</script>

<style scoped>
@import "../../assets/css/about.css";
</style>