<template>
  <div class="person_profile">
    <div class="page-wrapper">
      <div class="page-container clearfix">
        <div
          class="left-container js-nav-container"
          id="fixedBa"
          :class="{ fixedBa: isFixed }"
        >
          <a
            @click="changeAnchor('#current')"
            class="nav-item nav-active js-nav-item"
            :style="{ borderLeft: isPro }"
            >个人资料</a
          >
          <a
            @click="changeAnchor('#content-pwd')"
            class="nav-item js-nav-item"
            :style="{ borderLeft: isPwd }"
            >账号与密码</a
          >
        </div>
        <div class="right-container">
          <div class="content-item js-nav-content">
            <div class="content-title">个人资料</div>
            <div class="w_default_input profile-input">
              <span class="input-info">昵称</span>
              <div class="input-wrapper js-input-wrapper">
                <input
                  type="text"
                  name="nickname"
                  autocomplete="off"
                  class="simple-input"
                  v-model="username"
                />
              </div>
            </div>
            <div class="w_default_input profile-input" value="">
              <span class="input-info">个性签名</span>
              <div class="input-wrapper js-input-wrapper">
                <input
                  type="text"
                  name="sign"
                  autocomplete="off"
                  class="simple-input"
                  v-model="signature"
                />
              </div>
            </div>
            <div class="w_default_input profile-input">
              <span class="input-info">出生日期</span>
              <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions0"
              >
              </el-date-picker>
            </div>
            <div class="profile-input">
              <div class="input-info">性别</div>
              <div class="w_pui_radio">
                <span>
                  <input
                    type="radio"
                    id="pui_radio_id_1_0"
                    class="cc_input"
                    value="1"
                    @click="Gender(1)"
                  />
                  <span class="cc_radio"
                    ><i :style="{ display: isBoy }"></i
                  ></span>
                  <label for="pui_radio_id_1_0">男</label>
                </span>
                <span>
                  <input
                    type="radio"
                    id="pui_radio_id_1_1"
                    class="cc_input"
                    value="2"
                    @click="Gender(0)"
                  />
                  <span class="cc_radio"
                    ><i :style="{ display: isGirl }"></i
                  ></span>
                  <label for="pui_radio_id_1_1">女</label>
                </span>
              </div>
            </div>
            <div class="profile-input">
              <div class="input-info">联系邮箱</div>
              <div class="vw_domain">
                <div class="w_default_input">
                  <div ref="profile_email"></div>
                  <div class="input-wrapper js-input-wrapper">
                    <input
                      type="text"
                      name="domain"
                      maxlength="30"
                      autocomplete="off"
                      class="simple-input"
                      v-model="profileEmail"
                      @input="handleEmail"
                    />
                  </div>
                </div>
                <span class="vw_domain_hide"></span>
              </div>
            </div>
            <div class="profile-input">
              <div class="input-info">联系电话</div>
              <div class="vw_domain">
                <div class="w_default_input">
                  <div ref="profile_phone"></div>
                  <div class="input-wrapper js-input-wrapper">
                    <input
                      type="text"
                      name="domain"
                      maxlength="30"
                      autocomplete="off"
                      class="simple-input"
                      v-model="profilePhone"
                      @input="handlePhone"
                    />
                  </div>
                </div>
                <span class="vw_domain_hide"></span>
              </div>
            </div>
            <div class="profile-input">
              <div class="input-info">QQ</div>
              <div class="vw_domain">
                <div class="w_default_input">
                  <div ref="profile_qq"></div>
                  <div class="input-wrapper js-input-wrapper">
                    <input
                      type="text"
                      name="domain"
                      maxlength="30"
                      autocomplete="off"
                      class="simple-input"
                      v-model="profileQQ"
                      @input="handleQQ"
                    />
                  </div>
                </div>
                <span class="vw_domain_hide"></span>
              </div>
            </div>
            <div class="profile-input">
              <div class="textarea-title">个人说明</div>
              <span class="textarea-info">限 400 个字</span>
              <textarea
                max-length="400"
                name=""
                class="profile-textarea"
                v-model="description"
              ></textarea>
            </div>
            <a
              href="javascript:void(0)"
              class="gp_button gp_button_h40 gp_button_topic_mainn vw_btn_edit"
              @click="updateProfile"
              >保存更改</a
            >
            <div class="profile-avatar">
              <el-upload
                action="#"
                ref="upload"
                class="avatar-uploader"
                :on-change="handleAvatarChange"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div
                class="w_poco_upload_icon avatar-button"
                @click="uploadFile"
                title="点击头像区域选择文件"
              >
                <bdo>上传头像</bdo>
                <div class="w_ajax_upload_button"></div>
              </div>
            </div>
          </div>
          <div class="content-pwd" id="content-pwd">
            <div class="content-title">账号与密码</div>
            <div class="w_default_input profile-input" value="">
              <div class="w_default_button">
                <span class="default-buttonn normal-button">{{ email }}</span>
              </div>
            </div>
            <div class="w_default_input profile-input" value="">
              <span class="input-info">验证码</span>
              <div class="input-wrapper js-input-wrapper">
                <input
                  type="text"
                  autocomplete="off"
                  class="simple-input"
                  style="width: 300px"
                  v-model="code"
                />
                <a class="captcha__sms" v-show="show" @click="getCode"
                  >获取验证码</a
                >
                <a class="captcha__sms" v-show="!show"
                  >{{ count }}s后重新发送</a
                >
              </div>
            </div>
            <div class="w_default_input profile-input" value="">
              <span class="input-info">确认新密码</span>
              <div class="input-wrapper js-input-wrapper">
                <input
                  type="password"
                  autocomplete="off"
                  class="simple-input"
                  v-model="pwd"
                />
              </div>
            </div>
            <div class="error">
              <span class="error_text" ref="error"></span>
            </div>
            <a
              href="javascript:void(0)"
              class="gp_button gp_button_h40 gp_button_topic_mainn vw_btn_edit"
              @click="submitInfo()"
              style="margin-top: 15px"
              >确定</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getUserinfo();
    this.offsetTop = document.querySelector("#fixedBa").offsetTop;
    window.addEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      isBoy: "",
      isGirl: "",
      imageUrl: "static/image/u=590965914,302108607&fm=11&gp=0.jpg",
      isFixed: false,
      offsetTop: 0,
      isPro: "4px solid #96a8d0",
      isPwd: "4px solid rgba(0, 0, 0, 0)",
      show: true,
      count: "",
      timer: null,
      code: "",
      pwd: "",
      pwds: false,
      email: "1159494066@qq.com",
      username: "",
      signature: "",
      birthday: "",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      sex: "男",
      description: "",
      profileEmail: "",
      isprofileEmail: true,
      profilePhone: "",
      isprofilePhone: true,
      profileQQ: "",
      isprofileQQ: true,
    };
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); // 离开页面 关闭监听 不然会报错
  },
  inject: ["reload"],
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
          (this.imageUrl = this.url + res.data["user"]["image"]),
            (this.email = res.data["user"]["email"]),
            (this.username = res.data["user"]["username"]),
            (this.signature = res.data["user"]["persignature"]),
            (this.birthday = res.data["user"]["birthday"]),
            (this.sex = res.data["user"]["sex"]),
            (this.description = res.data["user"]["perdescription"]),
            (this.profileEmail = res.data["user"]["email"]),
            (this.profilePhone = res.data["user"]["telephone"]),
            (this.profileQQ = res.data["user"]["qq"]);
          if (this.sex == "男") {
            this.isBoy = "block";
            this.isGirl = "none";
          } else {
            this.isBoy = "none";
            this.isGirl = "block";
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handleEmail() {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.profileEmail)) {
        this.$refs.profile_email.innerHTML = `<span class="error-tip">邮箱地址无效</span>`;
        this.isprofileEmail = false;
      } else {
        this.$refs.profile_email.innerHTML = ``;
        this.isprofileEmail = true;
      }
    },
    handlePhone() {
      var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!reg.test(this.profilePhone)) {
        this.$refs.profile_phone.innerHTML = `<span class="error-tip">手机号码有误</span>`;
        this.isprofilePhone = false;
      } else {
        this.$refs.profile_phone.innerHTML = ``;
        this.isprofilePhone = true;
      }
    },
    handleQQ() {
      var reg = /^[0-9]\d{4,10}$/;
      if (!reg.test(this.profileQQ)) {
        this.$refs.profile_qq.innerHTML = `<span class="error-tip">QQ号有误</span>`;
        this.isprofileQQ = false;
      } else {
        this.$refs.profile_qq.innerHTML = ``;
        this.isprofileQQ = true;
      }
    },
    updateProfile() {
      if (
        this.profileEmail != "" &&
        this.isprofileEmail &&
        this.isprofilePhone &&
        this.isprofileQQ
      ) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
          method: "post",
          url: this.$store.state.localhostUrl + "/user/updating",
          data: {
            username: this.username,
            birthday: this.birthday,
            sex: this.sex,
            telephone: this.profilePhone,
            email: this.profileEmail,
            qq: this.profileQQ,
            personal_signature: this.signature,
            personal_description: this.description,
          },
        }).then(
          (res) => {
            if (typeof res.data == "object") {
              if (res.data["subject"]) {
                this.$message({
                  message: res.data["message"],
                  type: "success",
                });
                var data = {
                  image: res.data["image"],
                  username: res.data["username"],
                };
                this.$emit("changeImage", data);
              } else {
                this.$message({
                  message: res.data["message"],
                  type: "error",
                });
              }
            } else {
              this.$message({
                message: "您还没有登录",
                type: "warning",
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },

    changeAnchor(id) {
      this.$parent.setpaddingTop("88px");
      if (id == "#current") {
        this.isPro = "4px solid #96a8d0";
        this.isPwd = "4px solid rgba(0, 0, 0, 0)";
        document.querySelector(id).scrollIntoView(true);
      } else {
        this.isPro = "4px solid rgba(0, 0, 0, 0)";
        this.isPwd = "4px solid #96a8d0";
        document.querySelector(id).scrollIntoView(true);
      }
    },
    Gender(gender) {
      if (gender == 1) {
        this.isBoy = "block";
        this.isGirl = "none";
        this.sex = "男";
      } else {
        this.isBoy = "none";
        this.isGirl = "block";
        this.sex = "女";
      }
    },
    uploadFile() {
      this.$refs.upload.submit();
    },
    uploadSectionFile(param) {
      var form = new FormData();
      form.append("file", param.file);
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/user/upload",
        data: form,
      }).then(
        (res) => {
          if (res.data["head"]) {
            this.$message({
              message: "上传头像成功",
              type: "success",
            });
            var data = {
              image: res.data["message"],
              username: res.data["username"],
            };
            this.$emit("changeImage", data);
          } else {
            this.$message.error(res.data["message"]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.head) {
        this.$message({
          message: "上传头像成功",
          type: "success",
        });
        this.imageUrl = res.message;
      } else {
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarChange(file, filelist) {
      this.imageUrl = URL.createObjectURL(file.raw);
      for (let index = 0; index <= filelist.length; index++) {
        filelist.pop();
      }
      filelist.push(file);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= this.offsetTop + 467) {
        this.isFixed = true;
        this.marginTop = document.querySelector("#fixedBa").offsetHeight + "px";
      } else {
        this.isFixed = false;
        this.marginTop = 0;
        this.$parent.isPadding = "58px";
        this.offsetTop = 0;
      }
      if (scrollTop >= 1400) {
        this.isPro = "4px solid rgba(0, 0, 0, 0)";
        this.isPwd = "4px solid #96a8d0";
      } else {
        this.isPro = "4px solid #96a8d0";
        this.isPwd = "4px solid rgba(0, 0, 0, 0)";
      }
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.$axios({
          method: "post",
          url: this.$store.state.localhostUrl + "/user/sendmail",
          data: {
            email: this.email,
          },
        }).then(
          (res) => {
            if (res.data["head"]) {
              this.$message({
                message: res.data["message"],
                type: "success",
              });
            } else {
              this.$message.error(res.data["message"]);
            }
          },
          (err) => {
            console.log(err);
          }
        );
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    submitInfo() {
      if (this.code == "") {
        this.$refs.error.innerHTML = "";
        setTimeout(() => {
          this.$refs.error.innerHTML = "请输入验证码";
        }, 50);
      } else if (this.pwd == "") {
        this.$refs.error.innerHTML = "";
        setTimeout(() => {
          this.$refs.error.innerHTML = "密码为空";
        }, 50);
      } else if (this.code != "" && this.pwd != "") {
        this.checkPassword();
      }
      if (this.code != "" && this.pwds) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
          method: "post",
          url: this.$store.state.localhostUrl + "/user/change",
          data: {
            email: this.email,
            password: this.pwd,
            code: this.code,
          },
        }).then(
          (res) => {
            switch (res.data["subject"]) {
              case 0:
                this.$message({
                  message: res.data["message"],
                  type: "warning",
                });
                break;
              case 1:
                this.$message({
                  message: res.data["message"],
                  type: "success",
                });
                localStorage.removeItem("Access-Token");
                this.reload();
                break;
              case false:
                this.$message({
                  message: res.data["message"],
                  type: "error",
                });
                break;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    checkPassword() {
      var reg1 = /[!@#$%^&*()_?<>{}]{1}/;
      var reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,18}/;
      var reg3 = /[a-zA-Z]+/;
      var reg4 = /[0-9]+/;
      if (
        reg1.test(this.pwd) &&
        reg2.test(this.pwd) &&
        reg3.test(this.pwd) &&
        reg4.test(this.pwd)
      ) {
        this.pwds = true;
        this.$refs.error.innerHTML = "";
      } else if (!reg1.test(this.pwd)) {
        this.$refs.error.innerHTML = "";
        setTimeout(() => {
          this.$refs.error.innerHTML = "密码需包含一个特殊字符";
        }, 50);
        this.pwds = false;
      } else if (!reg2.test(this.pwd)) {
        this.$refs.error.innerHTML = "";
        setTimeout(() => {
          this.$refs.error.innerHTML = "密码长度在8-18位";
        }, 50);
        this.pwds = false;
      } else if (!reg3.test(this.pwd)) {
        this.$refs.error.innerHTML = "";
        setTimeout(() => {
          this.$refs.error.innerHTML = "密码需含有字母";
        }, 50);
        this.pwds = false;
      } else if (!reg4.test(this.pwd)) {
        this.$refs.error.innerHTML = "";
        setTimeout(() => {
          this.$refs.error.innerHTML = "密码需含有数字";
        }, 50);
        this.pwds = false;
      }
    },
  },
};
</script>

<style>
@import "../../../assets/css/personprofile.css";
</style>