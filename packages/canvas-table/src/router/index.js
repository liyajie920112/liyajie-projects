const main = () => import(/* webpackChunkName: 'canvasTable' */ '../main')
const routes = [{
  path: '/canvas-table',
  component: main
}]

export default routes
