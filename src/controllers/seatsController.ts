import { Request, Response } from "express";
import {
  createSeat,
  getAllSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
  autoCreateSeats,
  numberSeatInRoom,
  getRowAndColumnInRoom,
  getSeatInRoom,
  createMultipleSeat,
  editMultipleSeat,
  deleteSeatInRoom,
} from "../services/seatsService";

const handleCreateSeat = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const newSeat = await createSeat(data);
    if (newSeat.errCode === 0) {
      res.status(201).json({
        errCode: newSeat.errCode,
        message: newSeat.message,
      });
    } else {
      res.status(400).json({
        errCode: newSeat.errCode,
        message: newSeat.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong in creating new seat ${error}` });
  }
};

const handleGetAllSeats = async (req: Request, res: Response) => {
  try {
    const seats = await getAllSeats();
    if (seats.errCode === 0) {
      res.status(200).json({
        error: seats.errCode,
        message: seats.message,
        seats: seats.seats,
      });
    } else {
      res.status(404).json({
        error: seats.errCode,
        message: seats.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong in getting all seats ${error}` });
  }
};

const handleGetSeatById = async (req: Request, res: Response) => {
  const seatId = Number(req.query.seatId);
  if (isNaN(seatId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const seat = await getSeatById(seatId);
    if (seat.errCode === 0) {
      res.status(200).json({
        error: seat.errCode,
        message: seat.message,
        seat: seat.seat,
      });
    } else {
      res.status(404).json({
        error: seat.errCode,
        message: seat.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong in getting seat by id ${error}` });
  }
};

const handleUpdateSeat = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const updatedSeat = await updateSeat(data);
    if (updatedSeat.errCode === 0) {
      res.status(200).json({
        error: updatedSeat.errCode,
        message: updatedSeat.message,
        seat: updatedSeat.seat,
      });
    } else {
      res.status(404).json({
        error: updatedSeat.errCode,
        message: updatedSeat.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong in updating seat by id ${error}`,
    });
  }
};

const handleDeleteSeat = async (req: Request, res: Response) => {
  const seatId = Number(req.query.seatId);
  try {
    const deletedSeat = await deleteSeat(seatId);
    if (deletedSeat.errCode === 0) {
      res.status(200).json({
        error: deletedSeat.errCode,
        message: deletedSeat.message,
      });
    } else {
      res.status(404).json({
        error: deletedSeat.errCode,
        message: deletedSeat.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong in deleting seat by id ${error}`,
    });
  }
};

const handleAutoCreateSeats = async (req: Request, res: Response) => {
  const { roomId, vipRows, regularRows, doubleRows, columns } = req.query;

  try {
    const result = await autoCreateSeats(
      roomId as string,
      (vipRows as string).split(","),
      (regularRows as string).split(","),
      (doubleRows as string).split(","),
      Number(columns)
    );

    if (result.errCode === 0) {
      res.status(201).json({
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong in creating seats ${error}` });
  }
};

const handleGetNumberSeatInRoom = async (req: Request, res: Response) => {
  const roomCode = req.query.roomCode as string;
  try {
    const getNumberSeatInRoom = await numberSeatInRoom(roomCode);
    if (getNumberSeatInRoom.errCode === 0) {
      res.status(200).json({
        errCode: getNumberSeatInRoom.errCode,
        message: getNumberSeatInRoom.message,
        numberSeat: getNumberSeatInRoom.numberSeat,
      });
    } else {
      res.status(400).json({
        errCode: getNumberSeatInRoom.errCode,
        message: getNumberSeatInRoom.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong in getting number seat in room: ${error}`,
    });
  }
};

const handleGetNumberRowAndRow = async (req: Request, res: Response) => {
  const roomCode = req.query.roomCode as string;
  try {
    const getNumberRowAndRow = await getRowAndColumnInRoom(roomCode);
    if (getNumberRowAndRow.errCode === 0) {
      res.status(200).json({
        errCode: getNumberRowAndRow.errCode,
        message: getNumberRowAndRow.message,
        numberRow: getNumberRowAndRow.numberRow,
        numberCol: getNumberRowAndRow.numberCol,
      });
    } else {
      res.status(400).json({
        errCode: getNumberRowAndRow.errCode,
        message: getNumberRowAndRow.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong in getting number row and row in room: ${error}`,
    });
  }
};

const handleGetSeatInOneRoom = async (req: Request, res: Response) => {
  const roomCode = req.query.roomCode as string;
  console.log("Check roomCode in handle get Seat in room : ", roomCode);
  try {
    const seatInOneRoom = await getSeatInRoom(roomCode);
    if (seatInOneRoom.errCode === 0) {
      res.status(200).json({
        errCode: seatInOneRoom.errCode,
        message: seatInOneRoom.message,
        seats: seatInOneRoom.seats,
      });
    } else {
      res.status(400).json({
        errCode: seatInOneRoom.errCode,
        message: seatInOneRoom.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong in getting seat in room: ${error}`,
    });
  }
};

const handleCreateMultipleSeat = async (req: Request, res: Response) => {
  try {
    const { rows } = req.body;

    if (!Array.isArray(rows)) {
      return res.status(400).json({
        errCode: 2,
        message: "Invalid input: rows array is required",
      });
    }

    const seatCreationResults = [];
    for (const row of rows) {
      const result = await createMultipleSeat({ rows: [row] });
      seatCreationResults.push(result);
    }

    const errors = seatCreationResults.filter((result) => result.errCode !== 0);

    if (errors.length > 0) {
      return res.status(207).json({
        errCode: 1,
        message: "Some seats could not be created",
        errors,
      });
    }

    res.status(201).json({
      errCode: 0,
      message: "All seats created successfully",
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      message: `Internal server error: ${error}`,
    });
  }
};

const handleEditMultipleSeat = async (req: Request, res: Response) => {
  try {
    const { rows } = req.body;

    if (!Array.isArray(rows)) {
      return res.status(400).json({
        errCode: 2,
        message: "Invalid input: rows array is required",
      });
    }

    const seatUpdateResults = [];
    for (const row of rows) {
      const result = await editMultipleSeat({ rows: [row] });
      seatUpdateResults.push(result);
    }

    const errors = seatUpdateResults.filter((result) => result.errCode !== 0);

    if (errors.length > 0) {
      return res.status(207).json({
        errCode: 1,
        message: "Some seats could not be updated",
        errors,
      });
    }

    res.status(200).json({
      errCode: 0,
      message: "All seats updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      message: `Internal server error: ${error}`,
    });
  }
};

const handleDeleteSeatInRoom = async (req: Request, res: Response) => {
  const roomCode = req.query.roomCode as string;
  if (!roomCode) {
    return res.status(400).json({
      errCode: 2,
      message: "Invalid input: roomCode is required",
    });
  }
  try {
    const result = await deleteSeatInRoom(roomCode);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong in deleting seats in room: ${error}`,
    });
  }
};

export default {
  handleCreateSeat,
  handleGetAllSeats,
  handleGetSeatById,
  handleUpdateSeat,
  handleDeleteSeat,
  handleAutoCreateSeats,
  handleGetNumberSeatInRoom,
  handleGetNumberRowAndRow,
  handleGetSeatInOneRoom,
  handleCreateMultipleSeat,
  handleEditMultipleSeat,
  handleDeleteSeatInRoom,
};
