import e, { Request, Response } from "express";
import { createTrailer } from "../services/trailerService";

const handleCreateTrailer = async (req: Request, res: Response) => {
	const data = req.query;
	try {
		const result = await createTrailer(data);
		if (result.errCode === 0) {
			res.status(201).json({
				errCode: result.errCode,
				message: result.message, 
				newTrailer : result.newTrailer 
			});
		} else {
			res.status(400).json({ 
				errCode: result.errCode,
				message: result.message 
			});
		}
	} catch (error) {
		res.status(500).json('Something was wrong when creating trailer');
	}
}

export default {
	handleCreateTrailer,
}