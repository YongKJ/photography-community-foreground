<template>
  <div class="works">
    <div class="vw-tool clearfix">
      <div class="vw-filter-works-module">
        <ul>
          <li data-id="0"><a href="javascript:;" :class="{active:isTrue}" @click="changBox('collworks')">作品</a></li>
          <li data-id="0"><a href="javascript:;" :class="{active:!isTrue}" @click="changBox('collarticle')">博文</a></li>
        </ul>
      </div>
      <!-- <div class="vw-search-works-module">
        <div id="search" class="vw_search">
          <div class="btn">
            <i
              class="el-icon-search"
              style="
                font-size: 16px;
                margin-top: 2px;
                color: #7c7f84;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
              "
            ></i>
          </div>
          <input
            type="text"
            autocomplete="off"
            placeholder="搜索作品"
            class="input-text"
          />
        </div>
      </div> -->
    </div>
    <component v-bind:is="collview"></component>    
  </div>
</template>

<script>
import collworks from './collworks'
import collarticle from './collarticle'
export default {
  data() {
    return {
      collview:'collworks',
      isTrue: true
    };
  },
  methods: {
    changBox(view) {
      if (view == 'collworks') {
        this.isTrue = true;
      }else {
        this.isTrue = false;
      }
      this.collview = view;
    }
  },
  components:{
    collworks,
    collarticle
  }
};
</script>

<style scoped>
@import "../../../assets/css/works.css";
</style>