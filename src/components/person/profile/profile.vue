<template>
  <div class="profile">
    <div class="tab-content-container">
      <div class="tab-content js-tab-content">
        <div class="profile-content" style>
          <div class="profile-title profile-title-special">
            <span>个人资料</span>
            <a
              style="cursor: pointer"
              class="edit-profile-button"
              @click="toPerson()"
              v-show="isProfile"
              >编辑个人资料
              <i class="el-icon-arrow-right"></i>
            </a>
          </div>
          <div class="profile-item">
            <span class="profile-label">昵称</span>
            <span class="profile-text">{{ userinfo["username"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">性别</span>
            <span class="profile-text">{{ userinfo["sex"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">生日</span>
            <span class="profile-text">{{ userinfo["birthday"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">联系电话</span>
            <span class="profile-text">{{ userinfo["telephone"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">联系邮箱</span>
            <span class="profile-text">{{ userinfo["email"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">QQ</span>
            <span class="profile-text">{{ userinfo["qq"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">个人签名</span>
            <span class="profile-text">{{ userinfo["persignature"] }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">个人说明</span>
            <span class="profile-text">{{ userinfo["perdescription"] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("userId") != this.$route.query.id) {
      this.isProfile = false;
    } else {
      this.isProfile = true;
    }
    this.getUserinfo();
  },
  data() {
    return {
      isProfile: true,
      userinfo: {},
    };
  },
  methods: {
    getUserinfo() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/user/getting",
        data: {
          userId: this.$route.query.id,
        },
      }).then(
        (res) => {
          this.userinfo = res.data["user"];
        },
        (err) => {
          console.log(err);
        }
      );
    },
    toPerson() {
      this.$parent.changeBox("personProfile");
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/profile.css";
</style>
