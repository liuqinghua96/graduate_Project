import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Register from '@/components/register/Register'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import MyOwn from '@/components/user/MyOwn'
import UserList from '@/components/user/UserList'
import ArticleList from '@/components/article/ArticleList'
import ArticleDetail from '@/components/article/ArticleDetail'
import ArticleEdit from '@/components/article/ArticleEdit'
import ArticleAdd from '@/components/article/ArticleAdd'
import CommentList from '@/components/comment/CommentList'
import AnnounceList from '@/components/announce/AnnounceList'
import ShowHome from '@/components/showHome/ShowHome'
import ShowWelcome from '@/components/showHome/ShowWelcome'
import ShowList from '@/components/showList/ShowList'
import ShowDetail from '@/components/showDetail/ShowDetail'
import ShowAnnounce from '@/components/showAnnounce/ShowAnnounce'
import ShowOwn from '@/components/showOwn/ShowOwn'
// 引入nprogress
// 进度条
import NProgress from 'nprogress'
// 这个样式必须引入
import 'nprogress/nprogress.css'

Vue.use(Router)

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/welcome', name: 'welcome', component: Welcome },
        { path: '/myown', name: 'myown', component: MyOwn },
        { path: '/userList', name: 'userList', component: UserList },
        { path: '/articleList', name: 'articleList', component: ArticleList },
        { path: '/articleList/detail', name: 'articleDetail', component: ArticleDetail },
        { path: '/articleList/edit', name: 'articleEdit', component: ArticleEdit },
        { path: '/articleList/add', name: 'articleAdd', component: ArticleAdd },
        { path: '/commentList', name: 'commentList', component: CommentList },
        { path: '/announceList', name: 'AnnounceList', component: AnnounceList }
      ]
    },
    {
      path: '/showHome',
      name: 'shoeHome',
      component: ShowHome,
      children: [
        { path: '/showWelcome', name: 'showWelcome', component: ShowWelcome },
        { path: '/showDetail', name: 'showDetail', component: ShowDetail },
        { path: '/showList', name: 'showList', component: ShowList },
        { path: '/showAnnounce', name: 'showAnnounce', component: ShowAnnounce },
        { path: '/showOwn', name: 'showOwn', component: ShowOwn }
      ]
    }
  ]
})

// 导航守卫：用来判断登录状态
router.beforeEach((to, from, next) => {
  // 如果是'/login'、'/register'允许直接跳转
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  // 对于其他URL地址需要检测浏览器中的sessionStorage中是否已经存储了值
  if (!sessionStorage.getItem('token')) return next('/login')
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
