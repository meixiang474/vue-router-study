function addRouteRecord(route, pathList, pathMap, parentRecord) {
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path
  let record = {
    path,
    component: route.component,
    parent: parentRecord
  }
  if(route.children) {
    route.children.forEach(child => {
      addRouteRecord(child, pathList, pathMap, record)
    })
  }
}
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || []
  let pathMap = oldPathMap || {}
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })
  return {
    pathList,
    pathMap
  }
}