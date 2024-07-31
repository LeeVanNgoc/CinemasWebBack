import { Request, Response } from 'express';
import { createRoom, deleteRoom, editRoom, getAllRooms, getRoomById } from '../services/roomService';

const handleCreateRoom = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result = await createRoom(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, room: result.room });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating room: ${error}` });
  }
};

const handleDeleteRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  if (isNaN(roomId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid room ID' });
  }
  try {
    const result = await deleteRoom(roomId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting room: ${error}` });
  }
};

const handleEditRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  if (isNaN(roomId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid room ID' });
  }
  const data = { ...req.body, roomId: roomId };
  try {
    const result = await editRoom(data);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, room: result.room });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in editing room: ${error}` });
  }
};

const handleGetAllRooms = async (req: Request, res: Response) => {
  try {
    const result = await getAllRooms();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, rooms: result.rooms });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting rooms: ${error}` });
  }
};

const handleGetRoomById = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  if (isNaN(roomId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid room ID' });
  }
  try {
    const result = await getRoomById(roomId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, room: result.room });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting room: ${error}` });
  }
};

export default {
  handleCreateRoom,
  handleDeleteRoom,
  handleEditRoom,
  handleGetAllRooms,
  handleGetRoomById
};
