import { Request, Response } from "express";
import { createPrice, getAllPrices, getPriceById, updatePrice, deletePrice } from "../services/priceService";

const handleCreatePrice = async (req: Request, res: Response) => {
	const data = req.query;
    try {
        const result = await createPrice(data);
        if (result.errCode === 0) {
            res.status(201).json({ 
				errCode: result.errCode,
				message: result.message });
        } else {
            res.status(400).json({ 
				errCode: result.errCode,
				message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Somthing went wrong in create new price ${error}` });
    }
}

const handleGetAllPrices = async (req: Request, res: Response) => {
	try {
        const result = await getAllPrices();
        if (result.errCode === 0) {
            res.status(200).json({
                errCode: result.errCode,
                prices: result.prices });
        } else {
            res.status(400).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong in get all price record ${error}` });
    }
}

const handleGetPriceById = async (req: Request, res: Response) => {
	const priceId = parseInt(req.params.id);
    try {
        const result = await getPriceById(priceId);
        if (result.errCode === 0) {
            res.status(200).json({
                errCode: result.errCode,
                price: result.price });
        } else {
            res.status(404).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong getting price by id ${error}`});
    }
}

const handleUpdatePrice = async (req: Request, res: Response) => {
	const data = req.query;
    try {
        const result = await updatePrice(data);
        if (result.errCode === 0) {
            res.status(200).json({
                errCode: result.errCode,
                message: result.message });
        } else {
            res.status(400).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong updating price ${error}` });
    }
}

const handleDeletePrice = async (req: Request, res: Response) => {
	const priceId = Number(req.query.id);
    try {
        const result = await deletePrice(priceId);
        if (result.errCode === 0) {
            res.status(200).json({
                errCode: result.errCode,
                message: result.message });
        } else {
            res.status(404).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong deleting price by id ${error}` });
    }
}

export default {
	handleCreatePrice,
    handleGetAllPrices,
    handleGetPriceById,
    handleUpdatePrice,
    handleDeletePrice,
}