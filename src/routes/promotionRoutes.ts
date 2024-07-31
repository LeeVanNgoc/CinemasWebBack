import express from 'express';
import promotionController from '../controllers/promotionController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const promotionRoutes = (app: Application) => {
  router.post('/create-new-promotion', promotionController.handleCreatePromotion);
  router.delete('/delete-promotion', promotionController.handleDeletePromotion);
  router.put('/edit-promotion', promotionController.handleEditPromotion);
  router.get('/get-all-promotions', promotionController.handleGetAllPromotions);
  router.get('/get-promotion-by-id', promotionController.handleGetPromotionById);

  return app.use('/api/promotions', router);
};

export default promotionRoutes;
