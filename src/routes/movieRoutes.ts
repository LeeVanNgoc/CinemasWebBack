import { Application } from 'express';
import * as movieController from '../controllers/movieController';

const movieRoutes = (app: Application) => {
  app.post('/movies', movieController.createMovie);
  app.delete('/movies/:id', movieController.deleteMovie);
  app.put('/movies', movieController.editMovie);
  app.get('/movies', movieController.getAllMovies);
  app.get('/movies/:id', movieController.getMovieById);
};

export default movieRoutes;
