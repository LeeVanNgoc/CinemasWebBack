import express from 'express';
import userController from '../controllers/userController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const userRoutes = (app: Application) => {
  	router.post('/create-new-user', userController.handleCreateUser);
  	router.delete('/delete-user', userController.handleDeleteUser);
  	router.put('/edit-user', userController.handleEditUser);
	router.get('/get-all-user-by-id', userController.handleGetAllUsersById);
	router.post('/login-user', userController.handleLoginUser);
  return app.use('/api', router);
};

export default userRoutes;
