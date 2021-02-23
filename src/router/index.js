import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import aboutus from '@/components/about/aboutus.vue'
import agreement from '@/components/about/agreement.vue'
import person from '@/components/person/person.vue'
import author from '@/components/person/attension/author.vue'
import fans from '@/components/person/attension/fans.vue'
import works from '@/components/person/works/works.vue'
import profile from '@/components/person/profile/profile.vue'
import collection from '@/components/person/works/collection.vue'
import personprofile from '@/components/person/profile/personprofile'
import message from '@/components/person/message/message'
import detail from '@/components/person/message/detail'
import vwlist from '@/components/person/message/vwlist'
import create from '@/components/fabrication/create'
import worksdetail from '@/components/glance/worksdetail'
import create_guide from '@/components/fabrication/create_guide';
import article from '@/components/person/works/articles'
import skill from '@/components/article/skill'
import article_detail from '@/components/article/article_detail'
import gallery from '@/components/gallery/gallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/about',
      name: 'aboutus',
      component: aboutus
    },
    {
      path: '/agr',
      name: 'agreement',
      component: agreement
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/author',
      name: 'author',
      component: author
    },
    {
      path: '/fans',
      name: 'fans',
      component: fans
    },
    {
      path: '/works',
      name: 'works',
      component: works
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/personprofile',
      name: 'personprofile',
      component: personprofile
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/vwlist',
      name: 'vwlist',
      component: vwlist
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/worksdetail',
      name: 'worksdetail',
      component: worksdetail
    },
    {
      path: '/create_guide',
      name: 'create_guide',
      component: create_guide
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/skill',
      name: 'skill',
      component: skill
    },
    {
      path: '/article_detail',
      name: 'article_detail',
      component: article_detail
    },{
      path: '/gallery',
      name: 'gallery',
      component: gallery
    },
  ]
})
