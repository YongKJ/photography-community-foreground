import Vue from 'vue'//引入Vue对象
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    currentView: 'works',
    viewRef: 'thisclass_one',
    viewTop: '0px',
    viewColor: 'isColor1',
    view: '',
    messageId: 'comment',
    localhostUrl: 'http://wind.yongkj.cn',
    length: 1,
    gallery: 1,
    detail: 1
  },
  mutations: {
      newHeader(state,msg){
          state.currentView = msg
      }
  },
  actions: {
      new(context, msg){
          context.commit('newHeader',msg)
      }
  }
})

export default store