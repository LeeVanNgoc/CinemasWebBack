import sequelize from "../config/connectDB";

import Room from "../models/Room";
import Seat from "../models/Seat";
import { getTheaterByCode } from "../services/theaterService";
import { numberSeatInRoom } from "../services/seatsService";

export const createRoom = async (data: any) => {
  try {
    const existingIds = await Room.findAll({
      attributes: ["roomId"],
      order: [["roomId", "ASC"]],
    });

    const ids = existingIds.map((room) => room.roomId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Room.findAll({
      attributes: ["roomCode"],
      order: [["roomCode", "ASC"]],
    });

    const codes = existingCodes.map((room) => room.roomCode);
    let newCode = "R001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "R00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "R0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "R" + newId;
      }
    }

    const newRoom = await Room.create({
      roomId: newId,
      roomCode: newCode,
      theaterCode: data.theaterCode,
      type: data.type,
      numberSeats: data.numberSeats,
      isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
    });

    if (newRoom) {
      return {
        errCode: 0,
        message: "Room created successfully",
        room: newRoom,
      };
    } else {
      return {
        errCode: 1,
        message: "Failed to create room",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating room: ${error}`,
    };
  }
};

export const updateNumberSeatInRoom = async (roomCode: string) => {
  try {
    const seats = await numberSeatInRoom(roomCode);
    const numberSeat = seats.numberSeat;
    console.log(numberSeat);

    const room = await Room.findOne({
      where: { roomCode: roomCode },
    });

    if (!room) {
      return {
        errCode: 1,
        message: "Room not found",
      };
    }
    if (numberSeat === 0) {
      return {
        errCode: 2,
        message: "Room has no seats",
      };
    } else {
      room.numberSeats = numberSeat || room.numberSeats;
      await room.save();
      return {
        room,
        errCode: 0,
        message: "update complete number seats",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting number of seats in room by code ${error}`,
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
      message: `Error deleting room: ${error}`,
    };
  }
};

export const editRoom = async (data: any) => {
  const roomId = data.roomId;
  try {
    if (!roomId) {
      return { errCode: 4, message: "Missing required parameters!" };
    }

    const room = await Room.findOne({ where: { roomId } });
    if (!room) {
      return { errCode: 1, message: "Room not found!" };
    }

    if (data.type !== undefined) room.type = data.type;
    if (data.numberSeats !== undefined) room.numberSeats = data.numberSeats;
    if (data.isAvailable !== undefined) room.isAvailable = data.isAvailable;

    await room.save();

    return {
      errCode: 0,
      message: "Update the room succeeds!",
      room,
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating room: ${error}`,
    };
  }
};

export const getAllRooms = async () => {
  try {
    const rooms = await Room.findAll();
    return {
      errCode: 0,
      message: "Get all rooms success",
      rooms,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting rooms: ${error}`,
    };
  }
};

export const getRoomById = async (roomId: number) => {
  try {
    const room = await Room.findOne({ where: { roomId } });
    if (!room) {
      return {
        errCode: 1,
        message: "Room not found",
      };
    }
    return {
      errCode: 0,
      message: "Get room success",
      room,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting room: ${error}`,
    };
  }
};

export const getRoomInTheater = async (theaterCode: string) => {
  try {
    console.log(theaterCode);

    const roomsCheck = await Room.findAll({
      where: { theaterCode: theaterCode },
      raw: true,
      attributes: [
        "roomCode",
        "theaterCode",
        "type",
        "numberSeats",
        "isAvailable",
      ],
    });

    if (roomsCheck.length > 0) {
      let temporaryRooms: any[] = [];
      for (const room of roomsCheck) {
        const theaterCode: string = room.theaterCode;

        const theater = await getTheaterByCode(theaterCode);
        if (theater) {
          temporaryRooms.push({
            roomCode: room.roomCode,
            theaterCode: theater.theater?.theaterCode,
            type: room.type,
            numberSeats: room.numberSeats,
            isAvailable: true,
          });
        }
      }

      return {
        rooms: temporaryRooms,
        errCode: 0,
        message: "Rooms processed successfully",
      };
    } else {
      return {
        errCode: 2,
        message: "No rooms found with the given theaterId",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting rooms in this theater: ${error}`,
    };
  }
};

export const getListRoomInformation = async () => {
  try {
    const rooms = await Room.findAll({
      attributes: ["roomCode", "theaterCode", "type", "isAvailable"],
    });

    // Sử dụng Promise.all để xử lý các truy vấn song song cho số ghế của từng phòng
    const roomsWithSeats = await Promise.all(
      rooms.map(async (room) => {
        const numberSeat = await numberSeatInRoom(room.roomCode);
        return {
          roomCode: room.roomCode,
          theaterCode: room.theaterCode,
          type: room.type,
          isAvailable: room.isAvailable,
          totalSeats: numberSeat.numberSeat,
        };
      })
    );
    if (roomsWithSeats.length > 0) {
      return {
        errCode: 0,
        message: "get success total seat in room",
        data: roomsWithSeats,
      };
    } else {
      return {
        errCode: 1,
        message: "Not seat on room",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting total seats in room: ${error}`,
    };
  }
};
