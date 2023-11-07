// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/user","layout":false,"id":"1"},"2":{"name":"登录","path":"/user/login","parentId":"1","id":"2"},"3":{"path":"/","redirect":"/add_chart","parentId":"ant-design-pro-layout","id":"3"},"4":{"path":"/add_chart","name":"智能分析","icon":"AreaChartOutlined","parentId":"ant-design-pro-layout","id":"4"},"5":{"path":"/add_chart_async","name":"智能分析（异步1）","icon":"barChart","parentId":"ant-design-pro-layout","id":"5"},"6":{"path":"/add_chart_async_mq","name":"智能分析（异步2）","icon":"ApartmentOutlined","parentId":"ant-design-pro-layout","id":"6"},"7":{"path":"/my_chart","name":"图表管理","icon":"FolderOpenOutlined","parentId":"ant-design-pro-layout","id":"7"},"8":{"path":"/admin","name":"管理页","icon":"crown","access":"canAdmin","parentId":"ant-design-pro-layout","id":"8"},"9":{"path":"/admin","redirect":"/admin/sub-page","parentId":"8","id":"9"},"10":{"path":"/admin/sub-page","name":"二级菜单","parentId":"8","id":"10"},"11":{"path":"*","layout":false,"id":"11"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true},"umi/plugin/openapi":{"path":"/umi/plugin/openapi","id":"umi/plugin/openapi"}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__User__Login__index" */'@/pages/User/Login/index.tsx')),
'3': React.lazy(() => import( './EmptyRoute')),
'4': React.lazy(() => import(/* webpackChunkName: "p__AddChart__index" */'@/pages/AddChart/index.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__AddChartAsync__index" */'@/pages/AddChartAsync/index.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "p__AddChartAsyncMq__index" */'@/pages/AddChartAsyncMq/index.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__MyChart__index" */'@/pages/MyChart/index.tsx')),
'8': React.lazy(() => import( './EmptyRoute')),
'9': React.lazy(() => import( './EmptyRoute')),
'10': React.lazy(() => import(/* webpackChunkName: "p__Admin" */'@/pages/Admin.tsx')),
'11': React.lazy(() => import(/* webpackChunkName: "p__404" */'@/pages/404.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'C:/WorkSpace/VS_WorkSpace/bi-frontend-main/src/.umi/plugin-layout/Layout.tsx')),
'umi/plugin/openapi': React.lazy(() => import(/* webpackChunkName: "umi__plugin-openapi__openapi" */'C:/WorkSpace/VS_WorkSpace/bi-frontend-main/src/.umi/plugin-openapi/openapi.tsx')),
},
  };
}
