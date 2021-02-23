<template>
  <div class="base_body">
    <div class="base_page" id="base_createe">
      <div vue_module="poco_header"></div>
      <div class="vww_main">
        <header-vue></header-vue>
        <div class="create-works-wrapper js-create-works-wrapper">
          <div class="works-wrapper js-works-wrapper scrollbar-outer">
            <div class="works-content js-works-content">
              <div
                class="scroll-wrapper works-edit-container js-works-eidt-container scrollbar-inner"
                style="position: absolute"
              >
                <div
                  class="works-edit-container js-works-eidt-container scrollbar-inner scroll-content"
                  style="
                    height: 623px;
                    margin-bottom: 0px;
                    margin-right: 0px;
                    max-height: none;
                  "
                >
                  <div class="vw_edit_image ui-sortable" id="ui-sortable">
                    <el-upload
                      ref="upload"
                      :action="url"
                      :headers="header"
                      drag
                      trigger
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :on-change="handleChange"
                      :on-success="handleSuccess"
                      :auto-upload="false"
                      :limit="12"
                    >
                      <i class="el-icon-plus"></i>
                      <div class="button-tip">
                        <div class="add-image">添加更多图片</div>
                        <div class="add-image-tip" style="margin-top: 15px">
                          大小：小于10MB
                        </div>
                        <div class="add-image-tip">格式：JPEG/PNG/GIF</div>
                        <div class="add-image-tip">可拖拽上传</div>
                      </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                  </div>
                </div>
              </div>
            </div>
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
                    max-height: 480px;
                  "
                >
                  <form class="works-form js-works-form">
                    <div class="create-button-wrapper clearfix">
                      <div class="w_default_button" style="margin-top: 20px">
                        <button
                          type="button"
                          class="default-button normal-button"
                          @click="submitUpload()"
                        >
                          发布作品
                        </button>
                      </div>
                      <div class="works-count">
                        已添加 <span class="js-works-count">{{ count }}</span> /
                        12
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
                        <span class="block-title"
                          >作品分类<span class="required-icon">*</span></span
                        >
                        <div class="w_pui_drop_menu cc_topic_default">
                          <el-select
                            v-model="value"
                            placeholder="请选择"
                            @input="changeDefault"
                          >
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label"
                            >
                            </el-option>
                          </el-select>
                          <div ref="default_infoerror"></div>
                        </div>
                      </div>
                      <div class="info-block">
                        <span class="block-title">描述</span>
                        <div class="input-wrapper js-input-wrapper">
                          <div class="w_pui_text_textarea">
                            <div class="cc_text_wrap">
                              <textarea
                                placeholder="请输入作品描述"
                                v-model="describe"
                                maxlength="999999"
                                class="cc_textarea"
                                style="
                                  height: 200px;
                                  resize: vertical;
                                  min-height: 200px;
                                "
                              ></textarea>
                            </div>
                          </div>
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
      header: { "Access-Token": localStorage.getItem("Access-Token") },
      url: this.$store.state.localhostUrl + "/works/afterimage",
      isReload: false,
      dialogImageUrl: "",
      dialogVisible: false,
      worksTitle: "",
      value: "",
      describe: "",
      tag: "",
      tagList: ["The Label"],
      idCount: 0,
      count: 0,
      options: [
        {
          value: "选项1",
          label: "人像",
        },
        {
          value: "选项2",
          label: "风景",
        },
        {
          value: "选项3",
          label: "纪实",
        },
        {
          value: "选项4",
          label: "生态",
        },
        {
          value: "选项5",
          label: "运动",
        },
        {
          value: "选项6",
          label: "夜景",
        },
        {
          value: "选项7",
          label: "生活",
        },
        {
          value: "选项8",
          label: "手机摄影",
        },
        {
          value: "选项9",
          label: "美食",
        },
        {
          value: "选项10",
          label: "旅游",
        },
        {
          value: "选项11",
          label: "商业",
        },
        {
          value: "选项12",
          label: "LOMO",
        },
        {
          value: "选项13",
          label: "达物",
        },
        {
          value: "选项14",
          label: "宠物",
        },
        {
          value: "选项15",
          label: "儿童",
        },
        {
          value: "选项16",
          label: "汽车",
        },
        {
          value: "选项17",
          label: "观念",
        },
        {
          value: "选项18",
          label: "航拍",
        },
        {
          value: "选项19",
          label: "其他",
        },
      ],
    };
  },
  mounted() {
    window.deleteTag = this.deleteTag;
  },
  inject: ["reload"],
  methods: {
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
            `"><span>` +
            tagg +
            `</span> <div class="el-icon-close" onclick="deleteTag('` +
            id +
            `','` +
            tagg +
            `')"></div></div>`;
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
      console.log(this.tagList);
    },
    submitUpload() {
      this.inputError();
      if (
        this.worksTitle != "" &&
        this.value != "" &&
        this.count > 0 &&
        !this.isReload
      ) {
        this.$axios({
          headers: {
            "Access-Token": localStorage.getItem("Access-Token"),
          },
          method: "post",
          url: this.$store.state.localhostUrl + "/works/artworks",
          data: {
            title: this.worksTitle,
            classify: this.value,
            describe: this.describe,
            tag: this.tagList,
          },
        }).then(
          (res) => {
            if (res.data["subject"]) {
              this.$refs.upload.submit();
              setTimeout(() => {
                this.$message({
                  message: res.data["message"],
                  type: "success",
                });
              }, 1000);
            } else {
              this.$message({
                message: res.data["message"],
                type: "success",
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
      if (this.isReload) {
        this.reload();
      }
    },
    handleRemove(file, fileList) {
      this.count = this.count - 1;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      var index = 0;
      this.count = this.count + 1;
      for (let i = 0; i < fileList.length; i++) {
        if (file.name == fileList[i].name) {
          index += 1;
        }
      }
      if (index >= 2) {
        fileList.pop();
        this.count -= 1;
      } else if (!isLt2M) {
        fileList.pop();
        this.count -= 1;
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      // if (this.count >= 12) {
      //   this.$message({
      //     message: "已达上传张数",
      //     type: "warning",
      //   });
      // }
    },
    handleSuccess(response, file, fileList) {
      var y = document.getElementsByClassName("el-upload-list__item-delete");
      var i;
      for (i = 0; i < y.length; i++) {
        y[i].style.display = "none";
      }
      this.isReload = true;
      this.count -= 1;
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
    inputError() {
      if (this.count == 0) {
        this.$message({
          message: "请添加照片",
          type: "warning",
        });
      } else if (this.worksTitle == "") {
        this.$refs.input_wrapper.style = "border: 1px solid  rgb(245 108 108)";
        this.$refs.input_infoerror.innerHTML =
          '<span class="error-tip">请您输入内容</span>';
      } else if (this.value == "") {
        this.$refs.default_infoerror.innerHTML =
          '<span class="error-tip">请您选择作品分类</span>';
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
    changeDefault() {
      if (this.value != "") {
        this.$refs.default_infoerror.innerHTML = "";
      } else {
        this.$refs.default_infoerror.innerHTML =
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
</style>