const packageRoutes = require.context('../../../../packages', true, /index.js$/)
const routes = []
export const registerRouter = () => {
  const keys = packageRoutes.keys().filter((a) => {
    return a.endsWith('/src/router/index.js')
  })
  keys.forEach((fileName) => {
    console.log('packageRoutes', fileName)
    const config = packageRoutes(fileName)
    routes.push(...config.default)
  })
  return routes
}
