import { Request, Response } from "express";
import {createTheater, getAllTheaters, getTheaterById, deleteTheater, updateTheater, getTheatersByCity} from '../services/theaterService';

const handleCreateTheater = async (req: Request, res: Response) => {
	const data = req.query;
    try {
        const newTheater = await createTheater(data);
        if (newTheater.errCode === 0) {
            res.status(201).json({ 
				errCode: newTheater.errCode,
				message: newTheater.message });
        } else {
            res.status(400).json({ 
				errCode: newTheater.errCode,
				message: newTheater.message });
        }
    } catch (error) {
        res.status(500).json({ error: `Something went wrong in creating theater ${error}` });
    }
}

const handleGetAllTheaters = async (req: Request, res: Response) => {
	try {
        const theaters = await getAllTheaters();
		if (theaters.errCode === 0) {
			res.status(200).json({ 
				errCode: theaters.errCode,
				message: theaters.message,
				theaters: theaters.theaters });
		 } else {
        res.status(400).json({ 
            errCode: theaters.errCode,
            message: theaters.message });
		}
		
    } catch (error) {
        res.status(500).json({ error: `Something went wrong in getting all theaters ${error}` });
    }
}

const handleDeleteTheater = async(req: Request, res: Response) => {
	const theaterId = Number(req.query.theaterId);
	try {
		const result = await deleteTheater(theaterId);
		if (result.errCode === 0) {
			res.status(200).json({ 
				errCode : result.errCode,
				message: result.message });
		} else {
			res.status(400).json({
				errCode: result.errCode,
                message: result.message });
		}
	} catch (error) {
		res.status(500).json({error : `Something went wrong in delete theater ${error}`});
	}
}

const handleGetTheaterById = async (req: Request, res: Response) => {
	const theaterId = Number(req.query.theaterId);
	try {
		const result = await getTheaterById(theaterId);
		if (result.errCode === 0) {
			res.status(200).json({
				errCode: result.errCode,
                message: result.message,
                theater: result.theater });
		} else {
			res.status(400).json({
                errCode: result.errCode,
                message: result.message });
		}
		
	} catch (error) {
		res.status(500).json({error : `Something went wrong in getting theater by id ${error}`});
	}
}

const handleGetTheaterByCity = async(req: Request, res: Response) => {
	const city = String(req.query.city);
	try {
		const result = await getTheatersByCity(city);
		if (result.errCode === 0) {
			res.status(200).json({
                errCode: result.errCode,
                message: result.message,
                theaters: result.theaters });
		} else {
			res.status(400).json({
                errCode: result.errCode,
                message: result.message });
		}
	} catch (error) {
		res.status(500).json({error : `Something went wrong in getting theater by city ${error}`});
	}
}

const handleUpdateTheater =  async(req: Request, res: Response) => {
	const data = req.query;
	try {
		const result = await updateTheater(data);
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
		res.status(500).json({error : `Something went wrong in update theater ${error}`});
	}
}

export default {
    handleCreateTheater,
	handleGetAllTheaters,
    handleDeleteTheater,
    handleGetTheaterById,
    handleUpdateTheater,
	handleGetTheaterByCity,
};