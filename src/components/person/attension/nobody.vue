<template>
  <div>
    <div class="vw_none">
      <div
        class="w_pui_none_value"
        data-widget_cache_key="1612427595722"
        style="
          padding-top: 30px;
          padding-bottom: 100px;
          color: rgb(204, 204, 204);
        "
      >
        <div class="cc_box">
          <i class="aiconfont el-icon-document"></i>
          <div class="cc_box_content">
            <bdo class="cc_box_title">{{ body }}</bdo>
          </div>
        </div>
        <!---->
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    body: String,
    required: true,
  },
};
</script>

<style scoped>
.vw_none {
  padding-top: 70px;
}
.cc_box .aiconfont {
  display: block;
  margin: 0 auto 15px;
  font-size: 36px;
  text-align: center;
}
.cc_box .cc_box_content {
  text-align: center;
}
.w_pui_none_value .cc_box_title {
  display: block;
  text-align: center;
  font-size: 18px;
  color: #ccc;
}
</style>
