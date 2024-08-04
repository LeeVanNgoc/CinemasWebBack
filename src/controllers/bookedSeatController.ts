import { Request, Response } from "express";
import { createNewBookedSeat, getRowAndColOfBookedSeat } from "../services/bookedSeatService";

const handleBookSeat = async (req: Request, res: Response) => {
	const data = req.query;
    try {
        const newBookedSeat = await createNewBookedSeat(data);
        if (newBookedSeat.errCode === 0) {
            res.status(201).json({ 
				newBookedSeat: newBookedSeat.newBookedSeat,
                errCode: newBookedSeat.errCode,
                message: newBookedSeat.message });
        } else {
            res.status(400).json({ 
				errCode: newBookedSeat.errCode, 
				error: newBookedSeat.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Book seat reduce by error ${error}`})
	}
}

const handleGetRowAndColOfBookedSeat = async (req: Request, res: Response) => {
	const planSCreenMovieId = Number(req.query.planSCreenMovieId);
    try {
        const rowAndCol = await getRowAndColOfBookedSeat(planSCreenMovieId);
        if (rowAndCol.errCode === 0) {
            res.status(200).json({
                rowAndCol: rowAndCol.rowAndCol,
                errCode: rowAndCol.errCode,
                message: rowAndCol.message });
        } else {
            res.status(400).json({
                errCode: rowAndCol.errCode,
                error: rowAndCol.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Get row and col of booked seat error ${error}` });
    }
}

export default {
    handleBookSeat,
    handleGetRowAndColOfBookedSeat,
}