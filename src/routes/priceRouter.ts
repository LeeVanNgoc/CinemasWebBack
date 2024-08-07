import express from 'express';
import priceController from '../controllers/priceController';
import { Application } from 'express';

const router = express.Router();

const priceRouter = (app : Application) => {
	router.post('/create-price', priceController.handleCreatePrice);
    router.delete('/delete-price', priceController.handleDeletePrice);
    router.put('/edit-price', priceController.handleUpdatePrice);
    router.get('/get-price-by-id', priceController.handleGetPriceById);
    router.get('/get-all-prices', priceController.handleGetAllPrices);
    router.get('/get-cost', priceController.handleGetCost);

    app.use('/api/prices', router);
}

export default priceRouter;