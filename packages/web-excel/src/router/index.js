const webExcel = () => import(/* webpackChunkName: 'web-excel' */ '../main')

const routes = [
  {
    path: '/web-excel',
    component: webExcel,
    meta: {
      menuName: '在线Excel'
    }
  },
]

export default routes
