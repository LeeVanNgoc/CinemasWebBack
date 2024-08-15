import express from 'express';
import genreController from '../controllers/genreController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const genreRoutes = (app: Application) => {
  router.post('/create-new-genre', genreController.handleCreateGenre);
  router.delete('/delete-genre', genreController.handleDeleteGenre);
  router.put('/edit-genre', genreController.handleEditGenre);
  router.get('/get-all-genres', genreController.handleGetAllGenres);
  router.get('/get-genre-by-code', genreController.handleGetGenreByCode);

  return app.use('/api/genre', router);
};

export default genreRoutes;
