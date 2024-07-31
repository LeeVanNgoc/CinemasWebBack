import express from 'express';
import movieController from '../controllers/movieController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const movieRoutes = (app: Application) => {
  router.post('/create-new-movie', movieController.handleCreateMovie);
  router.delete('/delete-movie', movieController.handleDeleteMovie);
  router.put('/edit-movie/:movieid', movieController.handleEditMovie);
  router.get('/get-all-movies', movieController.handleGetAllMovies);
  router.get('/get-movie-by-id/:movieid', movieController.handleGetMovieById);

  return app.use('/api/movies', router);
};

export default movieRoutes;