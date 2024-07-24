import express from "express";
import trailerController from "../controllers/trailerController";
import { Application } from "express";

const router = express.Router();

const trailerRoutes = (app: Application) => {
	router.post('/create-trailer', trailerController.handleCreateTrailer);

	return app.use('/api/trailer', router);
}

export default trailerRoutes;

