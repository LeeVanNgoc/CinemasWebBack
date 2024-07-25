import express from "express";
import trailerController from "../controllers/trailerController";
import { Application } from "express";

const router = express.Router();

const trailerRoutes = (app: Application) => {
	router.post('/create-trailer', trailerController.handleCreateTrailer);
	router.delete('/delete-trailer', trailerController.handleDeleteTrailer);
	router.put('/edit-trailer', trailerController.handleUpdateTrailer);
	router.get('/get-all-trailers', trailerController.handleGetAllTrailers);
	router.get('/get-trailer-by-id', trailerController.handleGetTrailerById);
	router.get('/get-trailer-by-movie-id', trailerController.handleGetTrailerByMovieId);

	return app.use('/api/trailer', router);
}

export default trailerRoutes;

