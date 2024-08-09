import express from "express";
import ticketsController from "../controllers/ticketsController";
import { Application } from "express";

const router = express.Router();

const ticketRoutes = (app: Application) => {
	router.post('/create-ticket', ticketsController.handleCreateTicket);
	router.delete('/delete-ticket', ticketsController.handleDeleteTicket);
	router.put('/edit-ticket', ticketsController.handleEditTicket);
	router.get('/get-tickets', ticketsController.handleGetTicketById);
	router.get('/get-list-tickets', ticketsController.handleGetListTicket);
	router.get('/get-ticket-by-user-id', ticketsController.handleGetTicketByUserId);
	router.get('/get-ticket-details', ticketsController.handleGetTicketDetailsById);

	return app.use('/api/ticket', router);
}

export default ticketRoutes;

