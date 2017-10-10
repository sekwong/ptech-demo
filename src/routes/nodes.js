// src/routes/nodes.js
import nodeController from '../controllers/nodeController';

function nodeRouter(router) {
  // This will handle the url calls for /nodes/:node_id
  router
    .route('/:id')
    .get((req, res) => {
      nodeController.show(req, res);
    })
    .put((req, res) => {
      nodeController.update(req, res);
    })
    .patch((req, res) => {
      // Patch
    })
    .delete((req, res) => {
      nodeController.remove(req, res);
    });

  router
    .route('/')
    .get((req, res) => {
      nodeController.list(req, res);
    })
    .post((req, res) => {
      nodeController.create(req, res);
    });
}

export default nodeRouter;
