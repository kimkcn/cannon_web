// 菜单 侧边栏
export default [
  // { path: '/index', title: '首页', icon: 'home' },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' }
  //   ]
  // },
  // {
  //   title: '全局配置',
  //   icon: 'cogs',
  //   children: [
  //     { path: '/env', title: '环境配置', icon: 'cog' },
  //     { path: '/tag', title: '标签配置', icon: 'cog' }
  //   ]
  // },
  // {
  //   title: '服务器管理',
  //   icon: 'server',
  //   children: [
  //     { path: '/server', title: '服务器', icon: 'server' },
  //     { path: '/server/attribute', title: '服务器属性', icon: 'tag' },
  //     { path: '/server/group', title: '服务器组', icon: 'window-restore' },
  //     { path: '/server/group/type', title: '服务器组类型', icon: 'align-justify' }
  //   ]
  // },
  // {
  //   title: '云主机管理',
  //   icon: 'cloud',
  //   children: [
  //     { path: '/cloud/server/ecs', title: 'ECS', iconSvg: 'aliyun-ecs' },
  //     { path: '/cloud/server/ec2', title: 'EC2', iconSvg: 'amazonaws' },
  //     { path: '/cloud/server/esxi', title: 'ESXI', iconSvg: 'vmware' },
  //     // tencent
  //     { path: '/cloud/server/vm', title: 'VM', iconSvg: 'vmware' },
  //     { path: '/cloud/server/zabbixhost', title: 'ZabbixHost', iconSvg: 'zabbix' }
  //   ]
  // },
  // {
  //   title: '云数据库',
  //   icon: 'database',
  //   children: [
  //     { path: '/cloud/db/instance', title: '数据库实例', icon: 'cube' },
  //     { path: '/cloud/db/database', title: '数据库', icon: 'cubes' },
  //     { path: '/cloud/db/database/slowlog', title: '慢日志', icon: 'warning' },
  //     { path: '/cloud/db/my/database', title: '我的数据库', icon: 'diamond' }
  //   ]
  // },
  // {
  //   title: '堡垒机',
  //   icon: 'empire',
  //   children: [
  //     { path: '/jump/jumpserver/settings', title: '设置', icon: 'cog' },
  //     { path: '/jump/jumpserver/user', title: '用户管理', icon: 'user' },
  //     { path: '/jump/jumpserver/asset', title: '资产管理', icon: 'server' }
  //   ]
  // },
  // {
  //   title: '用户管理',
  //   icon: 'user-circle',
  //   children: [
  //     { path: '/user', title: '用户', icon: 'user' },
  //     { path: '/user/group', title: '用户组', icon: 'users' },
  //     { path: '/org/department', title: '部门管理', icon: 'connectdevelop' }
  //   ]
  // },
  // {
  //   title: '任务管理',
  //   icon: 'th-list',
  //   children: [
  //     { path: '/task/ansible-mgmt', title: '配置管理', icon: 'file-text-o' },
  //     { path: '/task/command', title: '批量命令', icon: 'terminal' },
  //     { path: '/task/script', title: '批量脚本', icon: 'retweet' },
  //     { path: '/task/ansible', title: 'playbook', icon: 'recycle' }
  //   ]
  // },
  // {
  //   title: 'RBAC配置',
  //   icon: 'address-card',
  //   children: [
  //     { path: '/auth/resource', title: '资源管理', icon: 'modx' },
  //     { path: '/auth/role', title: '角色管理', icon: 'users' },
  //     { path: '/auth/user/role', title: '用户角色配置', icon: 'id-card' }
  //   ]
  // },
  // {
  //   title: '个人详情',
  //   icon: 'user-o',
  //   children: [
  //     { path: '/user/detail', title: '我的详情', icon: 'address-book' }
  //   ]
  // }
  {
    title: '告警平台',
    icon: 'folder-o',
    children: [
      { path: '/alert', title: '告警详情' },
      { path: '/pn/distribute', title: '专线延迟分布' },
      { path: '/page3', title: '语音告警接口' }
    ]
  },
  {
    title: '平台管理',
    icon: 'folder-o',
    children: [
      { path: '/task', title: '任务调度详情' },
      { path: '/task/job_config', title: '任务配置' }
    ]
  },
  {
    title: '巡检系统',
    icon: 'folder-o',
    children: [
      { path: '/gps/ssl', title: '域名证书有效期检查' },
      { path: '/gps/rule_config', title: '巡检规则配置' }
    ]
  },
  {
    title: '费用数据',
    icon: 'folder-o',
    children: [
      { path: '/cost/home', title: '每月总消费' },
      { path: '/cost/bill', title: '费用首页' },
      { path: '/cost/renew', title: '云产品续费' },
      { path: '/cost/bill/overview', title: '费用账单详情' }
    ]
  },
  {
    title: '安全中心',
    icon: 'folder-o',
    children: [
      { path: '/safe/ak', title: 'AK管理' },
      { path: '/page1', title: 'Ram信息展示' }
    ]
  },
  {
    title: '成本管控',
    icon: 'folder-o',
    children: [
      { path: '/cost/resource/package', title: '资源包详情' }
    ]
  }
]
