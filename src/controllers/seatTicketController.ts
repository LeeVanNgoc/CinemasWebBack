import { Request, Response } from "express";
import { createSeatTicket, getAllSeatTickets, getSeatTicketById, deleteSeatTicket, updateSeatTicket } from "../services/seatTicketService";

const handleCreateSeatTicket = async (req: Request, res: Response) => {
	const data = req.query;
    try {
        const result = await createSeatTicket(data);
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
        console.error(error);
        res.status(500).json({ error: `Error create seat-ticket ${error}` });
    }
}

const handleGetAllSeatTickets = async (req: Request, res: Response) => {
	try {
        const result = await getAllSeatTickets();
		if (result.errCode === 0) {
			res.status(201).json({
			errCode: result.errCode,
			message: result.message,
            seatTickets: result.seatTickets });
		}else{
			res.status(400).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong in getting all seatticket ${error}` });
    }
}

const handleGetSeatTicketById = async (req: Request, res: Response) => {
	const seatTicketId = Number(req.query.seatTicketId);
    if (isNaN(seatTicketId)) {
    	return res.status(400).json({ message: 'Invalid seatTicket ID' }); // Xử lý khi ID không hợp lệ
  	}
    try {
        const result = await getSeatTicketById(seatTicketId);
        if (result.errCode === 0) {
            res.status(201).json({
                errCode: result.errCode,
                message: result.message,
                seatTicket: result.seatTicket });
        }else{
            res.status(400).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong in getting seatticket by id: ${error}` });
    }
}

const handleDeleteSeatTicket = async (req: Request, res: Response) => {
	const seatTicketId = Number(req.query.seatTicketId);
    if (isNaN(seatTicketId)) {
        return res.status(400).json({ message: 'Invalid seat ticket ID' });
    }
    try {
        const result = await deleteSeatTicket(seatTicketId);
        if (result.errCode === 0) {
            res.status(204).json({
                errCode: result.errCode,
                message: result.message });
        }else{
            res.status(400).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong in deleting seatticket by id: ${error}` });
    }
}

const handleUpdateSeatTicket = async (req: Request, res: Response) => {
	const data = req.query;
	const seatTicketId = Number(req.query.seatTicketId);
    if (isNaN(seatTicketId)) {
        return res.status(400).json({ message: 'Invalid seat ticket ID' });
    }
    try {
        const result = await updateSeatTicket(data);
        if (result.errCode === 0) {
            res.status(201).json({
                seatticket: result.seatTicket,
                errCode: result.errCode,
                message: result.message });
        }else{
            res.status(400).json({
                errCode: result.errCode,
                message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong in updating seatticket by id: ${error}` });
    }
}

export default {
	handleCreateSeatTicket,
    handleGetAllSeatTickets,
    handleDeleteSeatTicket,
    handleGetSeatTicketById,
    handleUpdateSeatTicket,
}