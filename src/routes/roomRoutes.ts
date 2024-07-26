import express from 'express';
import roomController from '../controllers/roomController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const roomRoutes = (app: Application) => {
  router.post('/create-new-room', roomController.handleCreateRoom);
  router.delete('/delete-room/:roomId', roomController.handleDeleteRoom);
  router.put('/edit-room/:roomId', roomController.handleEditRoom);
  router.get('/get-all-rooms', roomController.handleGetAllRooms);
  router.get('/get-room-by-id/:roomId', roomController.handleGetRoomById);

  return app.use('/api/rooms', router);
};

export default roomRoutes;
