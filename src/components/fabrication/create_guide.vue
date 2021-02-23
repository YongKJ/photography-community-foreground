<template>
  <div class="base_body">
    <div class="base_page" id="base_createe">
      <div vue_module="poco_header"></div>
      <div class="vww_main">
        <!-- <header>
                <div class="brand"></div>
                <div class="menu">
                    <a href="#" class="tuku">创意图库</a>
                    <a href="#" class="community">摄影社区</a>
                    <a href="#" class="contribute">图片素材</a>
                    <a href="#/person" class="contribute">个人中心</a>
                    <a href="#/about" target="_blank" class="contribute">关于我们</a>
                </div>
                <el-dropdown class="cc_message">
                    <a href="javascript:void(0)" class="cc_icon el-dropdown-link">
                    <i class="el-icon-bell iconfont"></i>
                    </a>
                    <el-dropdown-menu slot="dropdown" class="el-menu">
                    <a @click="redictHref('0px','isColor1')" href="#/person" target="_blank"
                        ><el-dropdown-item><span>评论</span></el-dropdown-item></a
                    >
                    <a @click="redictHref('60px','isColor2')" href="#/person" target="_blank"
                        ><el-dropdown-item><span>新粉丝</span></el-dropdown-item></a
                    >
                    <a  @click="redictHref('120px','isColor3')" href="#/person" target="_blank"
                        ><el-dropdown-item><span>收藏&收录</span></el-dropdown-item></a
                    >
                    <a  @click="redictHref('180px','isColor4')" href="#/person" target="_blank"
                        ><el-dropdown-item
                        ><span>私信</span
                        ><span class="cc-message_count">5</span></el-dropdown-item
                        ></a
                    >
                    </el-dropdown-menu>
                    <span class="cc_message_count">5</span>
                </el-dropdown>
                <el-dropdown
                    class="default_avatar user_avatar"
                    data-widget_cache_key="1603702798842"
                >
                    <a
                    href="#"
                    target="_self"
                    class="avatar_wrapper size_100 el-dropdown-link"
                    style="
                        background-image: url('static/image/201564334_1603608866_12094.jpg');
                    "
                    ></a>
                    <el-dropdown-menu slot="dropdown" class="el-menu-photo">
                    <a @click="redicView('personProfile')" href="#/person" target="_blank"
                        ><el-dropdown-item><span>个人中心</span></el-dropdown-item></a
                    >
                    <a @click="redicView('personProfile')" href="#/person" target="_blank"
                        ><el-dropdown-item><span>设置</span></el-dropdown-item></a
                    >
                    <a href="#"
                        ><el-dropdown-item><span>退出登录</span></el-dropdown-item></a
                    >
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="photo-publish">
                    <a href="#" class="size-50 el-dropdown-link">发布</a>
                    <el-dropdown-menu slot="dropdown" class="el-menu-publish">
                    <a href="javascript:location.reload();"><el-dropdown-item>作品</el-dropdown-item></a>
                    <a href="#"><el-dropdown-item>博文</el-dropdown-item></a>
                    </el-dropdown-menu>
                </el-dropdown>
            </header> -->
        <header-vue></header-vue>
        <div
          class="create-works-wrapper js-create-works-wrapper"
          style="padding-top: 47px"
        >
          <div class="vw_left">
            <mavon-editor
              style="width: 1005px; height: 694px"
              :codeStyle="codeStyle"
              :toolbars="toolbars"
              v-model="content"
              ref="md"
              @imgAdd="handleEditorImgAdd"
              @imgDel="handleEditorImgDel"
            />
          </div>
          <div class="vw_info">
            <div class="vw_info_wrap">
              <div
                class="scroll-wrapper scrollbar-inner"
                style="position: relative"
              >
                <div
                  class="scrollbar-inner scrollbar-content scroll-scrolly_visible"
                  style="
                    height: auto;
                    margin-bottom: 0px;
                    margin-right: 0px;
                    max-height: 505px;
                  "
                >
                  <form class="works-form js-works-form">
                    <div class="info-container cover_image_upload">
                      <div class="info-block">
                        <span class="block-title"
                          >封面图<span class="required-icon">*</span></span
                        >
                        <el-upload
                          action="#"
                          ref="upload"
                          multiple
                          class="add_image_btn"
                          :on-change="handleAvatarChange"
                          :show-file-list="false"
                          :before-upload="beforeAvatarUpload"
                          :http-request="handleUpload"
                          :auto-upload="false"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                          ></i
                          ><br />
                          <span ref="avatar_icon">添加一张封面图片</span>
                        </el-upload>
                      </div>
                    </div>
                    <div
                      class="create-button-wrapper clearfix"
                      style="margin-bottom: 20px"
                    >
                      <div class="w_default_button" style="margin-top: 20px">
                        <button
                          type="button"
                          class="default-button normal-button"
                          @click="submitUpload()"
                        >
                          发布作品
                        </button>
                      </div>
                    </div>
                    <div class="info-container">
                      <div class="w_default_input info-block">
                        <span class="input-info"
                          >标题<span class="required-icon">*</span></span
                        >
                        <div
                          class="input-wrapper js-input-wrapper"
                          ref="input_wrapper"
                        >
                          <input
                            type="text"
                            data-required="true"
                            autocomplete="off"
                            class="simple-input"
                            v-model="worksTitle"
                            @input="changeWrapper"
                          />
                          <div ref="input_infoerror"></div>
                        </div>
                      </div>
                      <div class="info-block">
                        <span class="block-title">标签</span>
                        <div class="w_default_input tag-input">
                          <div class="input-wrapper js-input-wrapper">
                            <input
                              type="text"
                              autocomplete="off"
                              class="simple-input"
                              v-model="tag"
                            />
                          </div>
                        </div>
                        <div class="w_default_button tag-button">
                          <button
                            type="button"
                            class="default-button normal-button"
                            @click="addTag(tag)"
                          >
                            添加
                          </button>
                        </div>
                        <span class="tag-tip" style="display: none"
                          >常用：</span
                        >
                        <span class="tag-tip tag-activity-tip" style=""
                          >参加活动：
                          <span
                            class="often-tag-item"
                            @click="addTag('秋冬暖调')"
                            >秋冬暖调</span
                          >
                          <span
                            class="often-tag-item"
                            @click="addTag('凛冬将至')"
                            >凛冬将至</span
                          >
                          <span
                            class="often-tag-item"
                            @click="addTag('用美食治愈身心')"
                            >用美食治愈身心</span
                          >
                          <span
                            class="often-tag-item"
                            @click="addTag('街头故事家')"
                            >街头故事家</span
                          >
                          <span
                            class="often-tag-item"
                            @click="addTag('黑白大片')"
                            >黑白大片</span
                          >
                        </span>
                        <div class="tag-list" style="" ref="addtag"></div>
                      </div>
                    </div>
                  </form>
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
export default {
  data() {
    return {
      imageUrl: "",
      content: "",
      codeStyle: "vs2015",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        ol: true, // 有序列表
        imagelink: true, // 图片链接
        code: false, // code
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空 n
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      worksTitle: "",
      idCount: 0,
      tag: "",
      tagList: ["The Label"],
      isUpload: false,
    };
  },
  mounted() {
    window.deleteTag = this.deleteTag;
  },
  inject: ["reload"],
  methods: {
    submitUpload() {
      this.inputError();
      if (this.isUpload) {
        this.$refs.upload.submit();
      }
    },
    handleUpload(param) {
      let fileObj = param.file;
      let formData = new FormData();
      formData.append("file", fileObj);
      formData.append("content", this.content);
      formData.append("worksTitle", this.worksTitle);
      formData.append("tagList", this.tagList);
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/article/upload",
        data: formData,
      }).then(
        (res) => {
          this.isUpload = false;
          if (res.data["subject"]) {
            this.$message({
              message: res.data["message"],
              type: "success",
            });
            this.reload();
          } else {
            this.$message.error(res.data["message"]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handleEditorImgAdd(pos, file) {
      var formdata = new FormData();
      formdata.append("file", file);
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/article/image",
        data: formdata,
      }).then(
        (res) => {
          var url = this.$store.state.localhostUrl + res.data;
          this.$refs.md.$imglst2Url([[pos, url]]);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    handleEditorImgDel(pos) {
      this.$axios({
        headers: {
          "Access-Token": localStorage.getItem("Access-Token"),
        },
        method: "post",
        url: this.$store.state.localhostUrl + "/article/del",
        data: {
          url: pos[0],
        },
      }).then(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
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
    addTag(tagg) {
      if (tagg == "") {
        this.$message.error("标签不能为空");
      } else {
        var flag;
        var id = "tagItem" + this.idCount;
        for (let i = 0; i < this.tagList.length; i++) {
          if (this.tagList[i] == tagg) {
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
        if (flag) {
          this.idCount = this.idCount + 1;
          this.tagList.push(tagg);
          var element =
            `<div class="tag-item js-tag-item" id = "` +
            id +
            `">
                                    <span>` +
            tagg +
            `</span> 
                                    <div class="el-icon-close" onclick="deleteTag('` +
            id +
            `','` +
            tagg +
            `')"></div>
                                </div>`;
          this.$refs.addtag.innerHTML = this.$refs.addtag.innerHTML + element;
          this.tag = "";
        } else {
          this.$message.error("标签不能重复");
        }
      }
    },
    deleteTag(id, tag) {
      document.getElementById(id).style.display = "none";
      this.tagList.pop(tag);
    },
    inputError() {
      if (this.imageUrl == "") {
        this.$refs.avatar_icon.style = "color:rgb(245 108 108)";
      } else if (this.worksTitle == "") {
        this.$refs.input_wrapper.style = "border: 1px solid  rgb(245 108 108)";
        this.$refs.input_infoerror.innerHTML =
          '<span class="error-tip">请您输入内容</span>';
      } else if (this.content == "") {
        this.$message.error("文章内容为空！");
      } else {
        this.isUpload = true;
      }
    },
    changeWrapper() {
      if (this.worksTitle != "") {
        this.$refs.input_wrapper.style = "border: 1px solid  rgb(204 204 204)";
        this.$refs.input_infoerror.innerHTML = "";
      } else {
        this.$refs.input_wrapper.style = "border: 1px solid  rgb(245 108 108)";
        this.$refs.input_infoerror.innerHTML =
          '<span class="error-tip">请您输入内容</span>';
      }
    },
  },
  components: {
    headerVue,
  },
};
</script>

<style>
@import "../../assets/css/index.css";
@import "../../assets/css/person.css";
@import "../../assets/css/create.css";
@import "../../assets/css/create_guide.css";
</style>