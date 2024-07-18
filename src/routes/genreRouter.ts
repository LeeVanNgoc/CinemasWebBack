import express from 'express';
import genreController from '../controllers/genreController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const genreRoutes = (app: Application) => {
  router.post('/create-new-genre', genreController.handleCreateGenre);
  router.get('/get-all-genres', genreController.handleGetAllGenres);
  router.get('/get-genre-by-id/:id', genreController.handleGetGenreById);
  router.delete('/delete-genre/:id', genreController.handleDeleteGenre);

  return app.use('/api/genres', router);
};

export default genreRoutes;
