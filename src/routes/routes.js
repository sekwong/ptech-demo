// src/routes/routes.js
import routeController from '../controllers/routeController';

function routeRouter(router) {
  router.route('/path/:fromNodeId/:toNodeId').get((req, res) => {
    routeController.getPath(req, res);
  });
  router
    .route('/:id')
    .get((req, res) => {
      routeController.show(req, res);
    })
    .put((req, res) => {
      routeController.update(req, res);
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
