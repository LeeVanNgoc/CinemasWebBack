import Room from '../models/Room';

export const createRoom = async (data: any) => {
  try {
    const existingIds = await Room.findAll({
      attributes: ['roomId'],
      order: [['roomId', 'ASC']]
    });

    const ids = existingIds.map(room => room.roomId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newRoom = await Room.create({
      roomId: newId,
      theaterId: data.theaterId,
      type: data.type,
      numberSeats: data.numberSeats,
      isAvailable: data.isAvailable,
    });
    if (newRoom) {
      return {
        errCode: 0,
        message: 'Room created successfully',
        room: newRoom
      };
    } else {
      return {
        errCode: 1,
        message: 'Failed to create room'
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating room: ${error}`
    };
  }
};

export const deleteRoom = async (roomId: number) => {
  try {
    const room = await Room.findOne({ where: { roomId } });
    if (!room) {
      return { errCode: 1, message: "Room not found" };
    } else {
      await room.destroy();
      return { errCode: 0, message: "Room deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting room: ${error}`
    };
  }
};

export const editRoom = async (data: any) => {
  const roomId = data.roomId;
  try {
    if (!roomId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const room = await Room.findOne({ where: { roomId } });
    if (!room) {
      return { errCode: 1, message: 'Room not found!' };
    }

    room.type = data.type || room.type;
    room.isAvailable = data.isAvailable || room.isAvailable;
    await room.save();

    return {
      errCode: 0,
      message: 'Update the room succeeds!',
      room
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating room: ${error}`
    };
  }
};

export const getAllRooms = async () => {
  try {
    const rooms = await Room.findAll();
    return {
      errCode: 0,
      message: 'Get all rooms success',
      rooms
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting rooms: ${error}`
    };
  }
};

export const getRoomById = async (roomId: number) => {
  try {
    const room = await Room.findOne({ where: { roomId } });
    if (!room) {
      return {
        errCode: 1,
        message: 'Room not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get room success',
      room
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting room: ${error}`
    };
  }
};
