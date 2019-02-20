import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Voice from '@/components/Voice.vue'
import Column from '@/components/Column.vue'
import Article from '@/components/Article.vue'
import UserInfo from '@/components/UserInfo.vue'
import UserReg from '@/components/UserReg.vue'
import UserLogin from '@/components/UserLogin.vue'
import Talk from '@/components/Talk.vue'
import Image from '@/components/Image.vue'

Vue.use(Router)

//路由设置
const router = new Router({
  mode:'history',//路由模式，html5模式
  routes:
  [
    {
      path:'/',
      name: 'home',
      component:Home
    },
    {
      path:'/home',
      name: 'Home',
      component:Home,
      meta: {
        keepAlive: true // 需要被缓存
    }
    },
    {
      path:'/voice',
      name: 'voice',
      component:Voice
    },
    {
      path:'/column',
      name: 'column',
      component:Column
    },
    {
      path:'/article/:id',
      name: 'article',
      component:Article
    },
    {
      path:'/userinfo',
      name:'userInfo',
      component:UserInfo
    },
    {
      path:'/userreg',
      name:'userReg',
      component:UserReg
    },
    {
      path:'/userlogin',
      name:'userlogin',
      component:UserLogin
    },
    {
      path:'/talk',
      name:"talk",
      component:Talk
    },
    {
      path:'/image',
      name:"image",
      component:Image
    }
  ]
});
// 全局导航钩子
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/userinfo'||to.path === '/userlogin'||to.path === '/userreg') {//拦截路由，未登录状态下，只能进入注册或登录页面
    next();
  } else {    
    let token = localStorage.getItem("token"); // 通过vuex state获取当前的token是否存在
    if (!token) {
      next('/userinfo');
      console.log("未登录，不给看")
    } else {
      next();//验证token存在，即可进行接下来的浏览
    }
  }
});
export default router;
