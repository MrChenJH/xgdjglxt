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
    name: '首页',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]

  },
  {
    path: '/xxgl',
    component: Layout,
    redirect: '/table/index',
    name: '信息管理',
    meta: { title: '信息管理', icon: 'table', noCache: true },
    children: [{
      path: 'yhgl',
      component: () => import('@/views/xxgl/yhgl'),
      name: '用户管理',
      meta: { title: '用户管理', icon: 'table', noCache: true }
    },{
      path: 'index',
      component: () => import('@/views/xxgl/hygl'),
      name: '会员标准设置',
      meta: { title: '会员标准设置', icon: 'table', noCache: true }
    } ,{
      path: 'jfgl',
      component: () => import('@/views/xxgl/jfgl'),
      name: '积分管理',
      meta: { title: '积分管理', icon: 'table', noCache: true }
    }
  ,{
      path: 'jhgl',
      component: () => import('@/views/xxgl/jhgl'),
      name: '系统计划管理',
      meta: { title: '系统计划管理', icon: 'table', noCache: true }
    },{
      path: 'jtjhgl',
      component: () => import('@/views/xxgl/jdjhgl'),
      name: '家庭计划管理',
      meta: { title: '家庭计划管理', icon: 'table', noCache: true }
    },{
      path: 'xgjhlb',
      component: () => import('@/views/xxgl/xgjhlbgl'),
      name: '小鬼计划列表',
      meta: { title: '小鬼计划列表', icon: 'table', noCache: true }
    },{
      path: 'czgl',
      component: () => import('@/views/xxgl/czjlgl'),
      name: '充值记录管理',
      meta: { title: '充值记录管理', icon: 'table', noCache: true }
    },{
      path: 'jsdgl',
      component: () => import('@/views/xxgl/jsdgl'),
      name: '结算单管理',
      meta: { title: '结算单管理', icon: 'table', noCache: true }
    },
    {
      path: 'hfysgl',
      component: () => import('@/views/xxgl/hfysgl'),
      name: '花费预算管理',
      meta: { title: '花费预算管理', icon: 'table', noCache: true }
     
    },{
      path: 'xxhdgl',
      component: () => import('@/views/xxgl/xxhdgl'),
      name: '线下活动管理',
      meta: { title: '线下活动管理', icon: 'table', noCache: true }
    },{
      path: 'jydmx',
      component: () => import('@/views/xxgl/jdz'),
      name: '金银豆明细',
      meta: { title: '金银豆明细', icon: 'table', noCache: true }
    },{
      path: 'jtdmx',
      component: () => import('@/views/xxgl/ydz'),
      name: '家庭豆明细',
      meta: { title: '家庭豆明细', icon: 'table', noCache: true }
    }
  ]
  },

  {
    path: '/xtpzgl',
    component: Layout,
    name: '系统配置管理',

    meta: { title: '系统配置管理', icon: 'form', noCache: true },
  
    children: [
      
      {
        path: 'glygl',
        component: () => import('@/views/xtsz/yhgl'),
        name: '管理员管理',
        meta: { title: '管理员管理', icon: 'guide', noCache: true }
      },
    {
      path: 'casz',
      component: () => import('@/views/xtsz/cssz'),
      name: '参数设置',
      meta: { title: '参数设置', icon: 'form', noCache: true }
    },    {
      path: 'jkpz',
      component: () => import('@/views/xtsz/jksz'),
      name: '接口配置',
      meta: { title: '接口配置', icon: 'form', noCache: true }
    },
    {
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
      path: 'sjbf',
      component: () => import('@/views/404'),
      name: '数据备份管理',
      meta: { title: '数据备份管理', icon: 'guide', noCache: true }
    }
  ]
  }

]

export default new Router({
 mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})



