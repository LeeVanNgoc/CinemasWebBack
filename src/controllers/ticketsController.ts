import { Request, Response } from "express";
import {
  createTickets,
  deleteTicket,
  editTicket,
  getTicketByCode,
  getListTicket,
  getTicketByUserCode,
  getTicketDetailsByCode,
  getRevenueByDate,
  getRevenueByTheaterAndDate,
  getRevenueByMovie,
  getRevenueForAllMovie,
  sendingBillForUser,
  getAverageAgeOfUsers,
  getAverageAgeByTheater
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
  const ticketCode = req.query.ticketCode as string;

  if (!ticketCode) {
    return res.status(400).json({ message: "Invalid ticket ID" }); // Xử lý khi ID không hợp lệ
  }
  try {
    const result = await deleteTicket(ticketCode);
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
      res.status(200).json({
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
    const ticketCode = await getTicketByUserCode(userCode);
    if (ticketCode.errCode === 0) {
      res.status(200).json({
        errCode: ticketCode.errCode,
        message: ticketCode.message,
        ticketCode: ticketCode.ticketCodes,
      });
    } else {
      res.status(400).json({
        errCode: ticketCode.errCode,
        message: ticketCode.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in handle get ticketId by userId ${error}` });
  }
};

const handleGetTicketDetailsByCode = async (req: Request, res: Response) => {
  const ticketCode = req.query.ticketCode as string;

  if (!ticketCode) {
    return res.status(400).json({ message: "Invalid ticket Code" });
  }

  try {
    const result = await sendingBillForUser(ticketCode);
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
    res.status(500).json({
      error: `Something went wrong in getting ticket details: ${error}`,
    });
  }
};

const handleGSendingBill = async (req: Request, res: Response) => {
  const ticketCode = req.query.ticketCode as string;

  if (!ticketCode) {
    return res.status(400).json({ message: "Invalid ticket Code" });
  }

  try {
    const result = await sendingBillForUser(ticketCode);
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
    res.status(500).json({
      error: `Something went wrong in getting ticket details: ${error}`,
    });
  }
};

const handleGetRevenueByDate = async(req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const revenueData = await getRevenueByDate(
      startDate as string,
      endDate as string
    );
    res.status(200).json(revenueData);
  } catch (error) {
    console.error("Error fetching revenue data:", error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to retrieve revenue data", details: error });
  }
}


const handleGetRevenueByTheaterAndDate = async(req: Request, res: Response) => {
  const { theaterCode, startDate, endDate } = req.query;

  try {
    const revenueData = await getRevenueByTheaterAndDate(
      theaterCode as string,
      startDate as string,
      endDate as string
    );
    res.status(200).json(revenueData);
  } catch (error) {
    console.error("Error fetching revenue data by theater and date:", error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Failed to retrieve revenue data", details: error });
  }
}

const handleGetRevenueByMovie = async(req: Request, res: Response) => {
  const { movieCode, startDate, endDate } = req.query;

  try {
    const revenueData = await getRevenueByMovie(
      movieCode as string,
      startDate as string,
      endDate as string
    );
    res.status(200).json(revenueData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve revenue data", details: error });
  }
}
export async function handleGetRevenueForAllMovie(req: Request, res: Response) {
  const { startDate, endDate } = req.query;

  try {
    const revenueData = await getRevenueForAllMovie(
      startDate as string,
      endDate as string
    );
    res.status(200).json(revenueData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve revenue data", details: error });
  }
}

const handleGetAverageAgeOfUsers = async (req: Request, res: Response) => {
  try {
    const averageAge = await getAverageAgeOfUsers();
    res.status(200).json({
      averageAge,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      message: `Failed to get average age of users: ${error}`,
    });
  }
};

const handleGetAverageAgeByTheater = async (req: Request, res: Response) => {
  const { theaterCode } = req.query;

  try {
    const averageAge = await getAverageAgeByTheater(theaterCode as string);

    if (averageAge) {
      res.status(200).json({ averageAge });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({
      error: `Failed to retrieve average age: ${error}`,
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
  handleGetTicketDetailsByCode,
  handleGetRevenueByDate,
  handleGetRevenueByTheaterAndDate,
  handleGetRevenueByMovie,
  handleGetRevenueForAllMovie,
  handleGSendingBill,
  handleGetAverageAgeOfUsers,
  handleGetAverageAgeByTheater
};
