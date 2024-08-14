import { Request, Response } from "express";
import {
  createTickets,
  deleteTicket,
  editTicket,
  getTicketByCode,
  getListTicket,
  getTicketByUserCode,
  getTicketDetailsById,
} from "../services/ticketsService";

const handleCreateTicket = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const newTicket = await createTickets(data);
    if (newTicket.errCode === 0) {
      res.status(201).json({
        newTickets: newTicket.newTicket,
        errCode: newTicket.errCode,
        message: newTicket.message,
      });
    } else {
      res.status(400).json({
        errCode: newTicket.errCode,
        message: newTicket.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in creating ticket: ${error}` });
  }
};

const handleDeleteTicket = async (req: Request, res: Response) => {
  const ticketId = Number(req.query.ticketId);

  if (isNaN(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" }); // Xử lý khi ID không hợp lệ
  }
  try {
    const result = await deleteTicket(ticketId);
    if (result.errCode === 0) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in creating ticket: ${error}` });
  }
};

const handleEditTicket = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result = await editTicket(data);
    if (result.errCode === 0) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wroong in edit ticket: ${error}` });
  }
};
const handleGetListTicket = async (req: Request, res: Response) => {
  try {
    const results: any = await getListTicket();
    if (results.errCode === 0) {
      res.status(200).json({
        errCode: results.errCode,
        message: results.message,
        tickets: results.tickets,
      });
    } else {
      res.status(404).json({
        errCode: results.errCode,
        message: results.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in getting all ticket: ${error}` });
  }
};
const handleGetTicketByCode = async (req: Request, res: Response) => {
  const ticketCode = req.query.ticketCode as string;
  try {
    const result = await getTicketByCode(ticketCode);
    if (result.errCode === 0) {
      res
        .status(200)
        .json({
          error: result.errCode,
          message: result.message,
          ticket: result.ticket,
        });
    } else {
      res.status(404).json({ error: result.errCode, message: result.message });
    }
    console.log(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in getting ticket: ${error}` });
  }
};

const handleGetTicketByUserCode = async (req: Request, res: Response) => {
  const userCode = req.query.userCode as string;

  try {
    const ticketId = await getTicketByUserCode(userCode);
    if (ticketId.errCode === 0) {
      res.status(200).json({
        errCode: ticketId.errCode,
        message: ticketId.message,
        ticketId: ticketId.ticketIds,
      });
    } else {
      res.status(400).json({
        errCode: ticketId.errCode,
        message: ticketId.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in handle get ticketId by userId ${error}` });
  }
};

const handleGetTicketDetailsById = async (req: Request, res: Response) => {
  const ticketCode = req.query.ticketCode as string;

  if (!ticketCode) {
    return res.status(400).json({ message: "Invalid ticket Code" });
  }

  try {
    const result = await getTicketDetailsById(ticketCode);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        ticket: result.ticket,
      });
    } else {
      res.status(404).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: `Something went wrong in getting ticket details: ${error}`,
      });
  }
};

export default {
  handleCreateTicket,
  handleDeleteTicket,
  handleEditTicket,
  handleGetTicketByCode,
  handleGetListTicket,
  handleGetTicketByUserCode,
  handleGetTicketDetailsById,
};
