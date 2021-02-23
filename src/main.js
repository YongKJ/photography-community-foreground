// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import axios from 'axios'
// import vueAxios from 'vue-axios'
import api from './vuex/date'
import store from './vuex/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import md5 from 'js-md5'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'


// import VueCookie from 'vue-cookie'
// Vue.use(VueCookie)

Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})
// import mese from './assets/js/mese'
// Vue.prototype.mese = mese

Vue.use(ElementUI)

// Vue.use(Vuex);
Vue.prototype.$api = api
Vue.prototype.$axios = axios

axios.defaults.withCredentials = true;
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
