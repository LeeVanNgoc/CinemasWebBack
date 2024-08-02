import express, { Application } from "express";
import seatsController from "../controllers/seatsController";

const router = express.Router();

const seatRouter = (app : Application) => {
	router.post('/create-seat', seatsController.handleCreateSeat);
    router.delete('/delete-seat', seatsController.handleDeleteSeat);
    router.put('/edit-seat', seatsController.handleUpdateSeat);
    router.get('/get-seats', seatsController.handleGetAllSeats);
    router.get('/get-seat-by-id', seatsController.handleGetSeatById);
    router.post('/auto-create-seats', seatsController.handleAutoCreateSeats);

    app.use('/api/seats', router);
}

export default seatRouter;