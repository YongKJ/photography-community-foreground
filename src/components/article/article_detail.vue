<template>
  <div class="base_body">
    <el-backtop
      ><i class="el-icon-top" style="color: aliceblue"></i
    ></el-backtop>
    <div class="base_page" id="base_detail">
      <div>
        <header-vue></header-vue>
        <div class="detail-page">
          <div class="banner">
            <div class="img">
              <div>
                <img :src="url + articles.image" />
                <div class="fade-box"></div>
              </div>
            </div>
            <div class="pop-txt">
              <p class="p1">{{ dateTime(articles.date_time) }}</p>
              <p class="p2">{{ articles.title }}</p>
              <div class="bottom clearfix">
                <div class="lbox fl">
                  <p class="a a1">
                    作者：
                    <span>
                      <a
                        @click="insurance(articles.users_id)"
                        style="cursor: pointer"
                        target="_blank"
                        >{{ articles.username }}</a
                      >
                    </span>
                  </p>
                  <p class="a a2">
                    来源：
                    <span> 行摄摄影社区 </span>
                  </p>
                </div>
                <div class="rbox fr">{{ articles.glance }} 浏览</div>
              </div>
            </div>
          </div>
          <div class="detail">
            <div id="content" class="content">
              <div class="image-package">
                <markdown-it-vue class="md-body" :content="articles.content" />
              </div>
            </div>
            <ul class="tags clearfix">
              <li v-for="i in splitTag(articles.tag)" :key="i">
                {{ i }}
              </li>
            </ul>
            <div class="op clearfix">
              <div class="lbox fl" v-show="isUser">
                <div class="w_poco_button_collect">
                  <span ref="cc_attension">
                    <div v-show="isTrue" @click="isCollect(true)">
                      <i class="icon el-icon-star-on"></i>
                      <span>收藏</span>
                    </div>
                    <div v-show="!isTrue" @click="isCollect(false)">
                      <i
                        class="icon el-icon-star-on"
                        style="color: #ffa800"
                      ></i>
                      <span>已收藏</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div class="c-com">
              <div class="w_poco_comment">
                <div class="cc_comment_box">
                  <h5>发表你的评论</h5>
                  <div class="w_poco_comment_box">
                    <div
                      class="cc_content"
                      style="background: rgb(255, 255, 255)"
                    >
                      <div class="cc_content_wrap">
                        <textarea
                          style="
                            height: 200px;
                            overflow: hidden;
                            text-indent: 4px;
                          "
                          v-model="content"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="cc_tools">
                    <div class="cc_tools_right">
                      <a
                        href="javascript:void(0)"
                        class="gp_button gp_button_h40 gp_button_topic_main"
                        @click="addContent"
                        >评论</a
                      >
                    </div>
                  </div>
                </div>
                <h4 class="cc_comment_title">
                  <bdo>{{ contents.length }}</bdo
                  >条评论
                </h4>
                <div class="cc_comment_list">
                  <div
                    class="cc_comment_part"
                    v-for="(index, sub) in contents.length"
                    :key="sub"
                  >
                    <div class="w_poco_comment_part">
                      <div class="cc_icon">
                        <div class="w_default_avatar">
                          <a
                            @click="insurance(contents[sub].userid)"
                            class="avatar-wrapper size-40"
                          >
                            <img
                              :src="url + contents[sub].image"
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
                      <div class="cc_main">
                        <div class="cc_comment_msg">
                          <a
                            @click="insurance(contents[sub].userid)"
                            class="cc_nickname"
                            >{{ contents[sub].username }}</a
                          >
                          <span class="cc_origin"></span>
                          <span class="cc_time">{{
                            dateTime(contents[sub].date_time)
                          }}</span>
                        </div>
                        <div class="cc_comment_content">
                          <div
                            class="w_pui_faceicon_bypoco"
                            style="margin-top: 10px"
                          >
                            <div class="cc_content">
                              {{ contents[sub].content }}
                            </div>
                          </div>
                        </div>
                        <div class="cc_comment_btn">
                          <a
                            href="javascript:void(0)"
                            class="cc_btn_reply"
                            @click="showInput(sub)"
                            >回复</a
                          >
                        </div>
                        <transition name="my-trans">
                          <div class="cc_comment_box" v-show="sub == inde">
                            <div class="w_poco_comment_box">
                              <div
                                class="cc_content"
                                style="background: rgb(255, 255, 255)"
                              >
                                <span class="cc_label"
                                  >{{ contents[sub].username }}：</span
                                >
                                <div class="cc_content_wrap">
                                  <textarea
                                    style="
                                      height: 200px;
                                      overflow: hidden;
                                      text-indent: 68px;
                                    "
                                    v-model="response"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="cc_tools">
                                <div class="cc_tools_right">
                                  <a
                                    href="javascript:void(0)"
                                    class="gp_button gp_button_h40 gp_button_none"
                                    @click="UnShowInput()"
                                    >取消</a
                                  >
                                  <a
                                    href="javascript:void(0)"
                                    class="gp_button gp_button_h40 gp_button_topic_main"
                                    @click="
                                      addResponse(
                                        contents[sub].id,
                                        contents[sub].userid,
                                        true
                                      )
                                    "
                                    >评论</a
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </transition>
                      </div>
                      <div
                        class="cc_reply_list"
                        v-for="(index, sub1) in contents[sub].responseList
                          .length"
                        :key="sub1"
                      >
                        <div
                          class="cc_reply_part"
                          v-if="contents[sub].responseList[sub1].id != 0"
                        >
                          <div class="cc_comment_msg">
                            <a
                              @click="
                                insurance(
                                  contents[sub].responseList[sub1].user1_id
                                )
                              "
                              class="cc_nickname"
                              >{{ contents[sub].responseList[sub1].user1 }}</a
                            >
                            <bdo class="cc_reply_str">回复</bdo>
                            <a
                              @click="
                                insurance(
                                  contents[sub].responseList[sub1].user2_id
                                )
                              "
                              class="cc_nickname"
                              >{{ contents[sub].responseList[sub1].user2 }}</a
                            >
                            <span class="cc_origin"></span>
                            <span class="cc_time">{{
                              dateTime(
                                contents[sub].responseList[sub1].res_time
                              )
                            }}</span>
                          </div>
                          <div class="cc_comment_content">
                            <div
                              class="w_pui_faceicon_bypoco"
                              data-widget_cache_key="1611489771747_4"
                            >
                              <div class="cc_content">
                                {{ contents[sub].responseList[sub1].response }}
                              </div>
                            </div>
                          </div>
                          <div class="cc_comment_btn">
                            <a
                              href="javascript:void(0)"
                              class="cc_btn_reply"
                              @click="showRespon(sub1, contents[sub].id)"
                              >回复</a
                            >
                          </div>
                          <transition name="my-trans">
                            <div
                              class="cc_comment_box"
                              v-show="
                                sub1 == inde1 && contents[sub].id == commentid
                              "
                            >
                              <div class="w_poco_comment_box">
                                <div
                                  class="cc_content"
                                  style="background: rgb(255, 255, 255)"
                                >
                                  <span class="cc_label"
                                    >{{
                                      contents[sub].responseList[sub1].user1
                                    }}：</span
                                  >
                                  <div class="cc_content_wrap">
                                    <textarea
                                      style="
                                        height: 200px;
                                        overflow: hidden;
                                        text-indent: 88px;
                                      "
                                      v-model="nextresponse"
                                    ></textarea>
                                  </div>
                                </div>
                                <div class="cc_tools">
                                  <div class="cc_tools_right">
                                    <a
                                      href="javascript:void(0)"
                                      class="gp_button gp_button_h40 gp_button_none"
                                      @click="UnshowRespon"
                                      >取消</a
                                    >
                                    <a
                                      href="javascript:void(0)"
                                      class="gp_button gp_button_h40 gp_button_topic_main"
                                      @click="
                                        addResponse(
                                          contents[sub].id,
                                          contents[sub].responseList[sub1]
                                            .user1_id,
                                          false
                                        )
                                      "
                                      >评论</a
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </transition>
                          <!---->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerVue from "../header/header";
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  mounted() {
    this.getArticleinfo();
    this.allComments();
    if (localStorage.getItem("Access-Token") != null) {
      this.changSpan();
    } else {
      this.isUser = false;
    }
  },
  data() {
    return {
      url: this.$store.state.localhostUrl + "/",
      readHTML: "",
      inde: -1,
      isTrue: true,
      isUser: true,
      articles: {},
      content: "",
      contents: [
        {
          id: 0,
          username: "",
          image: "",
          content: "",
          date_time: "",
          userid: 0,
          responseList: [
            {
              response: "",
              res_time: "",
              user1_id: 0,
              user2_id: 0,
              user1: "",
              user2: "",
              comment_id: 0,
            },
          ],
        },
      ],
      inde1: -1,
      commentid: -1,
      response: "",
      nextresponse: "",
    };
  },
  methods: {
    dateTime(date) {
      return this.$api.handleDate(date, false);
    },
    showInput(index) {
      this.inde = index;
      this.inde1 = -1;
      this.commentid = -1;
    },
    showRespon(sub1, comid) {
      this.inde1 = sub1;
      this.commentid = comid;
      this.inde = -1;
    },
    UnShowInput() {
      this.inde = -1;
    },
    UnshowRespon() {
      this.inde1 = -1;
      this.commentid = -1;
    },
    changSpan() {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/article/atoll",
        data: {
          user_id: localStorage.getItem("userId"),
          art_id: this.$route.query.article,
        },
      }).then(
        (res) => {
          if (res.data.flag) {
            this.isTrue = false;
          } else {
            this.isTrue = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
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
    splitTag(tag) {
      if (tag != "") {
        return tag.split(",");
      } else {
        return 0;
      }
    },
    isCollect(flag) {
      if (localStorage.getItem("Access-Token") != null) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
          method: "post",
          url: this.$store.state.localhostUrl + "/article/collect",
          data: {
            flag: flag,
            user_id: localStorage.getItem("userId"),
            art_id: this.$route.query.article,
          },
        }).then(
          (res) => {
            if (flag) {
              if (res.data.subject) {
                this.isTrue = false;
              } else {
                this.$message({
                  message: "操作失败，请稍后再试！",
                  type: "error",
                });
              }
            } else {
              if (!res.data.subject) {
                this.isTrue = true;
              } else {
                this.$message({
                  message: "操作失败，请稍后再试！",
                  type: "error",
                });
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
    getArticleinfo() {
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/article/gettable",
        data: {
          articleId: this.$route.query.article,
        },
      }).then(
        (res) => {
          this.articles = res.data;
          if (res.data.users_id == localStorage.getItem("userId")) {
            this.isUser = false;
          } else {
            this.isUser = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addContent() {
      if (localStorage.getItem("Access-Token") != null) {
        if (this.content != "") {
          this.$axios({
            headers: {
              "Access-Token": localStorage.getItem("Access-Token"),
            },
            method: "post",
            url: this.$store.state.localhostUrl + "/comment/insert",
            data: {
              content: this.content,
              art_id: this.$route.query.article,
            },
          }).then(
            (res) => {
              this.contents = res.data;
              this.content = "";
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.$message({
            message: "评论内容不能为空",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
    allComments() {
      this.$axios({
        method: "post",
        url: this.$store.state.localhostUrl + "/comment/info",
        data: {
          art_id: this.$route.query.article,
        },
      }).then(
        (res) => {
          this.contents = res.data;
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addResponse(comid, userid, flag) {
      if (flag) {
        var response = this.response;
      } else {
        var response = this.nextresponse;
      }
      if (localStorage.getItem("Access-Token") != null) {
        if (response != "") {
          this.$axios({
            headers: {
              "Access-Token": localStorage.getItem("Access-Token"),
            },
            method: "post",
            url: this.$store.state.localhostUrl + "/comment/response",
            data: {
              comment_id: comid,
              user2_id: userid,
              response: response,
              artid: this.$route.query.article,
            },
          }).then(
            (res) => {
              this.contents = res.data;
              if (flag) {
                this.UnShowInput();
                this.response = "";
              } else {
                this.UnshowRespon();
                this.nextresponse = "";
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.$message({
            message: "回复内容不能为空！",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "您还没有登录",
          type: "warning",
        });
      }
    },
  },
  components: {
    headerVue,
    MarkdownItVue,
  },
};
</script>

<style scoped>
@import "../../assets/css/detail.css";
</style>