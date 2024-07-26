import express from 'express';
import planScreenMovieController from '../controllers/planScreenMovieController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const planScreenMovieRoutes = (app: Application) => {
  router.post('/create-new-plan-screen-movie', planScreenMovieController.handleCreatePlanScreenMovie);
  router.delete('/delete-plan-screen-movie/:psmId', planScreenMovieController.handleDeletePlanScreenMovie);
  router.put('/edit-plan-screen-movie/:psmId', planScreenMovieController.handleEditPlanScreenMovie);
  router.get('/get-all-plan-screen-movies', planScreenMovieController.handleGetAllPlanScreenMovies);
  router.get('/get-plan-screen-movie-by-id/:psmId', planScreenMovieController.handleGetPlanScreenMovieById);

  return app.use('/api/plan-screen-movies', router);
};

export default planScreenMovieRoutes;
