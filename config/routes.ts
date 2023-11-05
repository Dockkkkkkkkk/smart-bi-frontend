export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: '智能分析', icon: 'AreaChartOutlined', component: './AddChart' },
  { path: '/my_chart', name: '图表管理', icon: 'FolderOpenOutlined', component: './MyChart' },
  { path: '/add_chart_async', name: '智能分析（异步）', icon: 'barChart', component: './AddChartAsync' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name:'二级菜单', component: './Admin' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
