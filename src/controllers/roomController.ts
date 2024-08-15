import { Request, Response } from "express";
import {
  createRoom,
  deleteRoom,
  editRoom,
  getAllRooms,
  getRoomById,
  getRoomInTheater,
  updateNumberSeatInRoom,
  getListRoomInformation,
} from "../services/roomService";

const handleCreateRoom = async (req: Request, res: Response) => {
  const { theaterCode, type, numberSeats, isAvailable } = req.query;
  console.log(theaterCode);

  if (!theaterCode || !type || !numberSeats) {
    return res
      .status(400)
      .json({ errCode: 4, error: "Missing required parameters!" });
  }

  const data = {
    theaterCode: theaterCode,
    type: type as string,
    numberSeats: Number(numberSeats),
    isAvailable: isAvailable === "true", // Convert isAvailable to boolean
  };

  try {
    const result = await createRoom(data);
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({
      errCode: result.errCode,
      message: result.message,
      room: result.room,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in creating room: ${error}`,
    });
  }
};

const handleDeleteRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.query.roomId);
  if (isNaN(roomId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid room ID" });
  }
  try {
    const result = await deleteRoom(roomId);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in deleting room: ${error}`,
    });
  }
};

const handleEditRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.query.roomId);
  if (isNaN(roomId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid room ID" });
  }

  const data = {
    roomId,
    theaterId: req.query.theaterId ? Number(req.query.theaterId) : undefined,
    type: req.query.type as string,
    numberSeats: req.query.numberSeats
      ? Number(req.query.numberSeats)
      : undefined,
    isAvailable: req.query.isAvailable === "true", // Convert isAvailable to boolean
  };

  try {
    const result = await editRoom(data);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      room: result.room,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in editing room: ${error}`,
    });
  }
};

const handleGetAllRooms = async (req: Request, res: Response) => {
  try {
    const result = await getAllRooms();
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      rooms: result.rooms,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting rooms: ${error}`,
    });
  }
};

const handleGetRoomById = async (req: Request, res: Response) => {
  const roomId = Number(req.query.roomId);
  if (isNaN(roomId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid room ID" });
  }
  try {
    const result = await getRoomById(roomId);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      room: result.room,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting room: ${error}`,
    });
  }
};

const handleGetRoomInTheater = async (req: Request, res: Response) => {
  const theaterCode = req.query.theaterCode as string;
  if (!theaterCode) {
    return res.status(400).json({ errCode: 2, error: "Invalid theater ID" });
  }
  try {
    const result = await getRoomInTheater(theaterCode);
    if (result.errCode !== 0) {
      return res.status(404).json({
        errCode: result.errCode,
        error: result.message,
      });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      rooms: result.rooms,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting rooms in theater: ${error}`,
    });
  }
};

const handleUpdateNumberSeatInRoom = async (req: Request, res: Response) => {
  const roomCode = req.query.roomCode as string;
  console.log(roomCode);

  try {
    if (!roomCode) {
      return res
        .status(400)
        .json({ errCode: 2, error: "Missing required parameters!" });
    }
    const result = await updateNumberSeatInRoom(roomCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      romm: result.room,
      errCode: result.errCode,
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in updating room: ${error}`,
    });
  }
};

const handleGetListRoomInformation = async (req: Request, res: Response) => {
  try {
    const result = await getListRoomInformation();
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      roomData: result.data,
      errCode: result.errCode,
      message: result.message,
    });
  } catch (error) {}
};
export default {
  handleCreateRoom,
  handleDeleteRoom,
  handleEditRoom,
  handleGetAllRooms,
  handleGetRoomById,
  handleGetRoomInTheater,
  handleUpdateNumberSeatInRoom,
  handleGetListRoomInformation,
};
