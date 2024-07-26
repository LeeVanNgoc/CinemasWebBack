import express from 'express';
import priceController from '../controllers/priceController';
import { Application } from 'express';

const router = express.Router();

const priceRouter = (app : Application) => {
	router.post('/create-price', priceController.handleCreatePrice);
    router.delete('/delete-price/:id', priceController.handleDeletePrice);
    router.put('/edit-price/:id', priceController.handleUpdatePrice);
    router.get('/get-price-by-id/:id', priceController.handleGetPriceById);
    router.get('/get-all-prices', priceController.handleGetAllPrices);
    app.use('/prices', router);
}

export default priceRouter;