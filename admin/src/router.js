import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login', name: 'login', component: Login, meta: { isPublic: true }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props:true },//两个不同地址使用同一个页面组�?
        { path: '/categories/list', component: CategoryList },

        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props:true },//两个不同地址使用同一个页面组�?
        { path: '/items/list', component: ItemList },

        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props:true },//两个不同地址使用同一个页面组�?
        { path: '/heroes/list', component: HeroList },

        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props:true },//两个不同地址使用同一个页面组�?
        { path: '/articles/list', component: ArticleList },
 
        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit, props:true },//两个不同地址使用同一个页面组�
        { path: '/ads/list', component: AdList },
  
        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props:true },//两个不同地址使用同一个页面组�
        { path: '/admin_users/list', component: AdminUserList },
  
      ]
    },
  ]
})
//每次切换路由执行 客户端访问限�
router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
  //不是公开访问页面且用户token不存在就跳转到登录页
    return next('/login')
  }
  //否则正常进入next
  next()
})
export default router