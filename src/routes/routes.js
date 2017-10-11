// src/routes/routes.js
import routeController from '../controllers/routeController';

function routeRouter(router) {
  // This will handle the url calls for /routes/:route_id
  router
    .route('/:id')
    .get((req, res) => {
      routeController.show(req, res);
    })
    .put((req, res) => {
      routeController.update(req, res);
    })
    .patch((req, res) => {
      // Patch
    })
    .delete((req, res) => {
      routeController.remove(req, res);
    });

  router
    .route('/')
    .get((req, res) => {
      routeController.list(req, res);
    })
    .post((req, res) => {
      routeController.create(req, res);
    });
}

export default routeRouter;
