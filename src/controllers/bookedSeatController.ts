import { Request, Response } from "express";
import {
  createNewBookedSeat,
  getRowAndColOfBookedSeat,
  getRowAndColOfSeats,
} from "../services/bookedSeatService";

const handleGetRowAndColOfSeats = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const rowAndCol2 = await getRowAndColOfSeats(data);
    if (rowAndCol2.errCode === 0) {
      res.status(200).json({
        planScreenMovieCode: rowAndCol2.planScreenMovieCode,
        rows: rowAndCol2.rows,
        cols: rowAndCol2.cols,
        errCode: rowAndCol2.errCode,
        message: rowAndCol2.message,
      });
    } else {
      res.status(400).json({
        errCode: rowAndCol2.errCode,
        error: rowAndCol2.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Get row and col of seats error: ${error}` });
  }
};

const handleBookSeat = async (req: Request, res: Response) => {
  const data = req.query;
  console.log(data);

  try {
    const newBookedSeat = await createNewBookedSeat(data);
    if (newBookedSeat.errCode === 0) {
      res.status(201).json({
        newBookedSeat: newBookedSeat.newBookedSeat,
        errCode: newBookedSeat.errCode,
        message: newBookedSeat.message,
      });
    } else {
      res.status(400).json({
        errCode: newBookedSeat.errCode,
        error: newBookedSeat.message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Book seat reduce by error ${error}` });
  }
};

const handleGetRowAndColOfBookedSeat = async (req: Request, res: Response) => {
  const planScreenMovieCode = String(req.query.planScreenMovieCode);
  try {
    const rowAndCol = await getRowAndColOfBookedSeat(planScreenMovieCode);
    if (rowAndCol.errCode === 0) {
      res.status(200).json({
        rowAndCol: rowAndCol.rowAndCol,
        errCode: rowAndCol.errCode,
        message: rowAndCol.message,
      });
    } else {
      res.status(400).json({
        errCode: rowAndCol.errCode,
        error: rowAndCol.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Get row and col of booked seat error ${error}` });
  }
};

export default {
  handleBookSeat,
  handleGetRowAndColOfBookedSeat,
  handleGetRowAndColOfSeats,
};
