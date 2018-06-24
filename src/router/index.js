import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'


export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',

    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'table', noCache: true }
    }]
  },
  {
    path: '/xxgl',
    component: Layout,
    redirect: '/table/index',
    meta: { title: '信息管理', icon: 'table', noCache: true },
    children: [{
      path: 'yhgl',
      component: () => import('@/views/xxgl/yhgl'),
      name: '用户管理',
      meta: { title: '用户管理', icon: 'table', noCache: true }
    },{
      path: 'jhgl',
      component: () => import('@/views/xxgl/jhgl'),
      name: '计划管理',
      meta: { title: '计划管理', icon: 'table', noCache: true }
    },{
      path: 'jsdgl',
      component: () => import('@/views/404'),
      name: '结算单管理',
      meta: { title: '结算单管理', icon: 'table', noCache: true }
    },{
      path: 'index',
      component: () => import('@/views/404'),
      name: '会员标准设置',
      meta: { title: '会员标准设置', icon: 'table', noCache: true }
    },
    {
      path: 'hfysgl',
      component: () => import('@/views/404'),
      name: '花费预算管理',
      meta: { title: '花费预算管理', icon: 'table', noCache: true }
     
    },{
      path: 'xxhdgl',
      component: () => import('@/views/404'),
      name: '线下活动管理',
      meta: { title: '线下活动管理', icon: 'table', noCache: true }
    },{
      path: 'abfgl',
      component: () => import('@/views/404'),
      name: 'AB分管理',
      meta: { title: 'AB分管理', icon: 'table', noCache: true }
    },{
      path: 'jfgl',
      component: () => import('@/views/xxgl/jfgl'),
      name: '积分管理',
      meta: { title: '积分管理', icon: 'table', noCache: true }
    }
  ]
  },

  {
    path: '/xtpzgl',
    component: Layout,
    meta: { title: '系统配置管理', icon: 'form', noCache: true },
  
    children: [{
      path: 'jkpz',
      component: () => import('@/views/xtsz/jksz'),
      name: '接口配置',
      meta: { title: '接口配置', icon: 'form', noCache: true }
    },{
      path: 'dlrz',
      component: () => import('@/views/Log/login'),
      name: '登录日志',
      meta: { title: '登录日志', icon: 'form', noCache: true }
    },{
      path: 'czrz',
      component: () => import('@/views/Log/mg'),
      name: '操作日志',
      meta: { title: '操作日志', icon: 'guide', noCache: true }
    },
    {
      path: 'glygl',
      component: () => import('@/views/xtsz/yhgl'),
      name: '管理员管理',
      meta: { title: '管理员管理', icon: 'guide', noCache: true }
    },
    {
      path: 'qxgl',
      component: () => import('@/views/xtsz/qxgl'),
      name: '权限管理',
      meta: { title: '权限管理', icon: 'guide', noCache: true }
    },
    {
      path: 'sjbf',
      component: () => import('@/views/404'),
      name: '数据备份管理',
      meta: { title: '数据备份管理', icon: 'guide', noCache: true }
    }
  ]
  }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})



