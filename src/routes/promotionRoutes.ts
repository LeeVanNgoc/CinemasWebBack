import express from 'express';
import promotionController from '../controllers/promotionController';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const promotionRoutes = (app: Application) => {
  router.post('/create-new-promotion', promotionController.handleCreatePromotion);
  router.delete('/delete-promotion/:promoId', promotionController.handleDeletePromotion);
  router.put('/edit-promotion/:promoId', promotionController.handleEditPromotion);
  router.get('/get-all-promotions', promotionController.handleGetAllPromotions);
  router.get('/get-promotion-by-id/:promoId', promotionController.handleGetPromotionById);

  return app.use('/api/promotions', router);
};

export default promotionRoutes;
