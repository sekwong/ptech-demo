const _ = require('underscore');

class PathFinder {
  constructor(routes) {
    this.routes = routes;
    this.rawPaths = [];
  }

  // search for related route to select fromNodeId
  getNextRoutes(fromNodeId, currentPath) {
    return _.filter(this.routes, (route) => {
      const sameOrigin = route.fromNodeId === fromNodeId;
      // next node must not has toNodeId as same as routes in currentPath
      const toNodeIdNotInPath = !_.findWhere(currentPath, {
        fromNodeId: route.toNodeId,
      });
      return sameOrigin && toNodeIdNotInPath;
    });
  }

  findAll(fromNodeId, toNodeId, currentPath) {
    if (!currentPath) {
      this.rawPaths = [];
      currentPath = [];
    }

    const nextRoutes = this.getNextRoutes(fromNodeId, currentPath);
    if (nextRoutes.length === 0) return;

    nextRoutes.forEach((route) => {
      const tempPath = currentPath.slice();
      tempPath.push(route);
      if (route.toNodeId === toNodeId) {
        this.rawPaths.push(tempPath);
      } else {
        this.findAll(route.toNodeId, toNodeId, tempPath);
      }
    });

    return this.rawPaths;
  }
}

export default PathFinder;
