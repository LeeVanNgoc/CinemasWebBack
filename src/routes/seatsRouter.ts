import express, { Application } from "express";
import seatsController from "../controllers/seatsController";

const router = express.Router();

const seatRouter = (app : Application) => {
	router.post('/create-seat', seatsController.handleCreateSeat);
    router.delete('/delete-seat/:id', seatsController.handleDeleteSeat);
    router.put('/edit-seat/:id', seatsController.handleUpdateSeat);
    router.get('/get-seats', seatsController.handleGetAllSeats);
    router.get('/get-seat-by-id/:id', seatsController.handleGetSeatById);

    app.use('/api/seats', router);
}

export default seatRouter;