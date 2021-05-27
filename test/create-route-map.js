function addRouteRecord(route, pathList, pathMap, parentRecord) {
  let path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;
  let record = {
    path,
    component: route.component,
    parent: parentRecord,
  };
  if (!pathMap[path]) {
    pathMap[path] = record;
    pathList.push(path);
  }
  if (route.children) {
    route.children.forEach((r) => {
      addRouteRecord(r, pathList, pathMap, record);
    });
  }
}

function createRouteMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || {};
  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });
  return {
    pathList,
    pathMap,
  };
}

export default createRouteMap;
