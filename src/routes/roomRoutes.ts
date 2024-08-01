import express from 'express';
import roomController from '../controllers/roomController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const roomRoutes = (app: Application) => {
  router.post('/create-new-room', roomController.handleCreateRoom);
  router.delete('/delete-room', roomController.handleDeleteRoom);
  router.put('/edit-room', roomController.handleEditRoom);
  router.get('/get-all-rooms', roomController.handleGetAllRooms);
  router.get('/get-room-by-id', roomController.handleGetRoomById);

  return app.use('/api/room', router);
};

export default roomRoutes;
