// src/routes/users.js
import userController from '../controllers/userController';

function userRouter(router) {
  // This will handle the url calls for /users/:user_id
  router
    .route('/:id')
    .get((req, res) => {
      userController.show(req, res);
    })
    .put((req, res) => {
      userController.update(req, res);
    })
    .patch((req, res) => {
      // Patch
    })
    .delete((req, res) => {
      // Delete record
    });

  router
    .route('/')
    .get((req, res) => {
      userController.list(req, res);
    })
    .post((req, res) => {
      userController.create(req, res);
    });
}

export default userRouter;
