import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true
        },
        component: _import('demo/page1')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      {
        path: '/alert',
        name: 'alert_detail',
        component: () => import('@/pages/alert'),
        meta: {
          title: '告警详情',
          auth: true
        }
      },
      // 费用配置区
      {
        path: '/cost/bill',
        name: 'bill',
        component: () => import('@/pages/cost/bill'),
        meta: {
          title: '费用首页',
          auth: true
        }
      },
      {
        path: '/cost/home',
        name: 'home',
        component: () => import('@/pages/cost/home'),
        meta: {
          title: '费用新首页',
          auth: true
        }
      },
      {
        path: '/cost/renew',
        name: 'renew',
        component: () => import('@/pages/cost/renew'),
        meta: {
          title: '云产品续费',
          auth: true
        }
      },
      {
        path: '/cost/resource/package',
        name: 'resource_package',
        component: () => import('@/pages/cost/resource/package'),
        meta: {
          title: '资源包详情',
          auth: true
        }
      },
      {
        path: '/cost/bill/overview',
        name: 'bill',
        component: () => import('@/pages/cost/bill/overview'),
        meta: {
          title: '费用账单',
          auth: true
        }
      },
      // 任务调度配置区
      {
        path: '/task',
        name: 'task',
        component: () => import('@/pages/task'),
        meta: {
          title: '任务调度详情',
          auth: true
        }
      },
      {
        path: '/task/job_config',
        name: 'job_config',
        component: () => import('@/pages/task/job_config'),
        meta: {
          title: '调度任务配置中心',
          auth: true
        }
      },
      // 巡检配置区
      {
        path: '/gps/ssl',
        name: 'ssl_expire_data',
        component: () => import('@/pages/gps/ssl'),
        meta: {
          title: '域名证书有效期',
          auth: true
        }
      },
      {
        path: '/gps/rule_config',
        name: 'rule config',
        component: () => import('@/pages/gps/rule/config'),
        meta: {
          title: '巡检规则配置',
          auth: true
        }
      },
      // 专线配置区
      {
        path: '/pn/distribute',
        name: 'distribute',
        component: () => import('@/pages/pn/distribute'),
        meta: {
          title: '专线延迟分布',
          auth: true
        }
      },
      {
        path: '/pn/problem',
        name: 'pn_problem',
        component: () => import('@/pages/pn/problem'),
        meta: {
          title: '专线可用性',
          auth: true
        }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
