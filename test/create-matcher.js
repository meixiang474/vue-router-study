import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

export default function createMatcher(routes) {
  let { pathList, pathMap } = createRouteMap(routes);
  function match(location) {
    let record = pathMap[location];
    return createRoute(record, {
      path: location,
    });
  }
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }
  return {
    match,
    addRoutes,
  };
}
