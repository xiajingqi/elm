import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import goods from  '@/components/goods/goods'
import seller from  '@/components/seller/seller'
import rating from  '@/components/rating/rating'
import '../common/stylus/index.styl'
import '../common/fonts/iconfont.css'


Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  linkActiveClass:'active',
  routes: [
      {path:'/',component:goods},
      {path:'/goods',component:goods},
      {path:'/seller',component:seller},
      {path:'/rating',component:rating },
  ]
})
