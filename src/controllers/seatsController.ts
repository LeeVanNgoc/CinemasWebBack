import { Request, Response } from "express";
import { createSeat, getAllSeats, getSeatById, updateSeat, deleteSeat} from "../services/seatsService";

const handleCreateSeat = async (req: Request, res: Response) => {
	const data = req.query;
    try {
        const newSeat = await createSeat(data);
        if (newSeat.errCode === 0) {
            res.status(201).json({ 
				erroCode: newSeat.errCode,
				message: newSeat.message });
        } else {
            res.status(400).json({ 
				errCode: newSeat.errCode,
				message: newSeat.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong in creating new seat ${error}` });
    }
}

const handleGetAllSeats = async (req: Request, res: Response) => {
	try {
        const seats = await getAllSeats();
        if (seats.errCode === 0) {
            res.status(200).json({ 
				error: seats.errCode, 
				message: seats.message, 
				seats: seats.seats });
        } else {
            res.status(404).json({ 
				error: seats.errCode, 
				message: seats.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong in getting all seats ${error}` });
    }
}

const handleGetSeatById = async (req: Request, res: Response) => {
	const seatId = Number(req.query.seatId);
    try {
        const seat = await getSeatById(seatId);
        if (seat.errCode === 0) {
            res.status(200).json({ 
                error: seat.errCode,
                message: seat.message,
                seat: seat.seat });
        } else {
            res.status(404).json({ 
                error: seat.errCode,
                message: seat.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong in getting seat by id ${error}` });
    }
}

const handleUpdateSeat = async (req: Request, res: Response) => {
    const data = req.query;
    try {
        const updatedSeat = await updateSeat(data);
        if (updatedSeat.errCode === 0) {
            res.status(200).json({
                error: updatedSeat.errCode,
                message: updatedSeat.message,
                seat: updatedSeat.seat });
        } else {
            res.status(404).json({
                error: updatedSeat.errCode,
                message: updatedSeat.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong in updating seat by id ${error}` });
    }
}

const handleDeleteSeat = async (req: Request, res: Response) => {
	const seatId = Number(req.query.seatId);
    try {
        const deletedSeat = await deleteSeat(seatId);
        if (deletedSeat.errCode === 0) {
            res.status(200).json({
                error: deletedSeat.errCode,
                message: deletedSeat.message });
        } else {
            res.status(404).json({
                error: deletedSeat.errCode,
                message: deletedSeat.message });
        }
    } catch (error) {
        res.status(500).json({ message: `Something went wrong in deleting seat by id ${error}` });
    }
}

export default {
	handleCreateSeat,
    handleGetAllSeats,
    handleGetSeatById,
    handleUpdateSeat,
    handleDeleteSeat,
}