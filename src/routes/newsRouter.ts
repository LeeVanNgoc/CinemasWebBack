import express from 'express';
import newsController from '../controllers/newsController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const newsRoutes = (app: Application) => {
  router.post('/create-new-news', newsController.handleCreateNews);
  router.get('/get-all-news', newsController.handleGetAllNews);
  router.get('/get-news-by-id/:id', newsController.handleGetNewsById);
  router.delete('/delete-news/:id', newsController.handleDeleteNews);

  return app.use('/api/news', router);
};

export default newsRoutes;
