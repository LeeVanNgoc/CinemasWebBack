import express, { Application } from 'express';
import seatTicketController from '../controllers/seatTicketController';

const router = express.Router();

const seatTicketRouter = (app: Application) => {
	router.post('/book-seat', seatTicketController.handleCreateSeatTicket);
    router.get('/get-all-seat-ticket', seatTicketController.handleGetAllSeatTickets);
    router.get('/get-seats-ticket-by-id', seatTicketController.handleGetSeatTicketById);
    router.delete('/delete-seats-ticket', seatTicketController.handleDeleteSeatTicket);
    router.put('/edit-seat-ticket', seatTicketController.handleUpdateSeatTicket);

    app.use('/api/seattickets', router);
}

export default seatTicketRouter;