export default [
  {
    path: '/user',
    layout: false,
    routes: [
              { name: '登录', path: '/user/login', component: './User/Login' },
              { name: '登录', path: '/user/register', component: './User/Register' },
            ],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: '智能分析', icon: 'AreaChartOutlined', component: './AddChart' },
  { path: '/add_chart_async', name: '智能分析（异步1）', icon: 'barChart', component: './AddChartAsync' },
  { path: '/add_chart_async_mq', name: '智能分析（异步2）', icon: 'ApartmentOutlined', component: './AddChartAsyncMq' },
  { path: '/my_chart', name: '图表管理', icon: 'FolderOpenOutlined', component: './MyChart' },
  
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
