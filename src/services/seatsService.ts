import { Tickets } from "../models";
import Seat from "../models/Seat";

//Check row exist
export const checkSeat = async (data: any) => {
  try {
    const seats = await Seat.findOne({
      where: { row: data.row, col: data.col, roomCode: data.roomCode },
    });
    if (!seats) {
      return {
        errCode: 1,
        message: "No seats created",
      };
    } else {
      return {
        errCode: 0,
        message: "Seat is exist",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Get seats in row failed ${error}`,
    };
  }
};

export const createSeat = async (data: any) => {
  try {
    const existingIds = await Seat.findAll({
      attributes: ["seatId"],
      order: [["seatId", "ASC"]],
    });

    const ids = existingIds.map((seat) => seat.seatId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Seat.findAll({
      attributes: ["seatCode"],
      order: [["seatCode", "ASC"]],
    });

    const codes = existingCodes.map((seat) => seat.seatCode);
    let newCode = "S001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "S00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "S0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "S" + newId;
      }
    }

    const seat = await checkSeat(data);
    if (seat.errCode === 0) {
      return {
        errCode: 1,
        message: "Seat already exist",
      };
    }
    const newSeat = await Seat.create({
      seatId: newId,
      seatCode: newCode,
      row: data.row,
      col: data.col,
      type: data.type,
      roomCode: data.roomCode,
      isAvailable: data.isAvailable,
    });
    return {
      newSeat,
      errCode: 0,
      message: "Create seat successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Create seat failed by error ${error}`,
    };
  }
};

export const getAllSeats = async () => {
  try {
    const seats = await Seat.findAll();
    return {
      seats,
      errCode: 0,
      message: "Get all seats successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: "Get all seats failed",
    };
  }
};

// Get Seat by id
export const getSeatById = async (seatId: number) => {
  try {
    const seat = await Seat.findOne({
      where: { seatId: seatId },
      raw: true,
    });
    if (!seat) {
      return {
        errCode: 1,
        message: "Seat not found",
      };
    }
    return {
      seat,
      errCode: 0,
      message: "Get seat successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get seat by id ${error}`,
    };
  }
};

// Update Seat by id
export const updateSeat = async (data: any) => {
  try {
    const seat = await Seat.findOne({
      where: { seatId: data.seatId },
    });
    if (!seat) {
      return {
        errCode: 1,
        message: "Seat not found",
      };
    }
    seat.row = data.row || seat.row;
    seat.isAvailable = data.isAvailable || seat.isAvailable;
    await seat.save();
    return {
      seat,
      errCode: 0,
      message: "Update seat successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error update seat by id ${error}`,
    };
  }
};

// Delete Seat by id
export const deleteSeat = async (seatId: number) => {
  try {
    const seat = await Seat.findOne({
      where: { seatId: seatId },
    });
    if (!seat) {
      return {
        errCode: 1,
        message: "Seat not found",
      };
    }
    await seat.destroy();
    return {
      errCode: 0,
      message: "Delete seat successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error delete seat by id ${error}`,
    };
  }
};

//Get number seat of one room
export const numberSeatInRoom = async (roomCode: string) => {
  try {
    const seats = await Seat.findAll({ where: { roomCode: roomCode } });
    return {
      numberSeat: seats.length,
      errCode: 0,
      message: "Get number seat successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get number seat in room ${error}`,
    };
  }
};

//Get row and column of one room
export const getRowAndColumnInRoom = async (roomCode: string) => {
  try {
    const seats = await Seat.findAll({ where: { roomCode: roomCode } });
    let numberCol = 0;
    for (let index = 0; index < seats.length; index++) {
      const maxCol = seats[index].col;
      if (numberCol < maxCol) {
        numberCol = maxCol;
      }
    }
    const rowAndColumn = {
      numberRow: seats.length / numberCol,
      numberCol: numberCol,
    };
    if (seats) {
      return {
        numberRow: rowAndColumn.numberRow,
        numberCol: rowAndColumn.numberCol,
        errCode: 0,
        message: "Get row and column successfuly",
      };
    } else {
      return {
        errCode: 1,
        message: "No seats found",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get row and column in room ${error}`,
    };
  }
};
const findSmallestAvailableId = async () => {
  const existingSeats = await Seat.findAll({
    attributes: ["seatId"],
    order: [["seatId", "ASC"]],
  });
  const existingIds = existingSeats.map((seat) => seat.seatId);

  let newId = 1;
  for (const id of existingIds) {
    if (id === newId) {
      newId++;
    } else {
      break;
    }
  }
  return newId;
};

export const autoCreateSeats = async (
  roomCode: string,
  vipRows: string[],
  regularRows: string[],
  doubleRows: string[],
  columns: number
) => {
  try {
    const newSeats: Seat[] = [];

    const createSeatIfNotExist = async (
      row: string,
      col: number,
      type: string
    ) => {
      const data = { row, col, type, roomCode, isAvailable: true };
      const existingSeat = await checkSeat(data);
      if (existingSeat.errCode === 0) {
        return {
          errCode: 1,
          message: `Seat at row ${row} and col ${col} already exists`,
        };
      }
      const newId = await findSmallestAvailableId();
      const newSeat = await Seat.create({ seatId: newId, ...data });
      newSeats.push(newSeat);
      return { errCode: 0 };
    };

    for (let col = 1; col <= columns; col++) {
      for (const row of vipRows) {
        const result = await createSeatIfNotExist(row, col, "VIP");
        if (result.errCode !== 0) return result;
      }
      for (const row of regularRows) {
        const result = await createSeatIfNotExist(row, col, "Regular");
        if (result.errCode !== 0) return result;
      }
      for (const row of doubleRows) {
        const result = await createSeatIfNotExist(row, col, "Double");
        if (result.errCode !== 0) return result;
      }
    }
    return {
      newSeats,
      errCode: 0,
      message: "Automated seat creation successful",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Automated seat creation failed ${error}`,
    };
  }
};

export const getSeatInRoom = async (roomCode: string) => {
  try {
    const seats = await Seat.findAll({ where: { roomCode: roomCode } });
    if (seats) {
      return {
        seats,
        errCode: 0,
        message: "Get seats successfuly",
      };
    } else {
      return {
        errCode: 1,
        message: "No seats found",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get seats in room ${error}`,
    };
  }
};

export const createMultipleSeat = async (data: any) => {
  try {
    const { rows } = data;

    if (!Array.isArray(rows)) {
      return {
        errCode: 2,
        message: "Invalid input: rows array is required",
      };
    }

    const createdSeats = [];
    for (const rowData of rows) {
      const { id: row, columns } = rowData;

      for (const colData of columns) {
        const { col, roomCode, type, isAvailable } = colData;

        const existingSeat = await Seat.findOne({
          where: { row, col, roomCode },
        });

        if (existingSeat) {
          continue;
        }

        const existingIds = await Seat.findAll({
          attributes: ["seatId"],
          order: [["seatId", "ASC"]],
        });
        const ids = existingIds.map((seat) => seat.seatId);

        let newId = 1;
        while (ids.includes(newId)) {
          newId++;
        }

        const newSeat = await Seat.create({
          seatId: newId,
          row,
          col,
          type,
          roomCode,
          isAvailable,
          seatCode: Seat.generateSeatCode(col, row),
        });

        createdSeats.push(newSeat);
      }
    }

    if (createdSeats.length === 0) {
      return {
        errCode: 1,
        message: "No new seats created, they may already exist",
      };
    }

    return {
      createdSeats,
      errCode: 0,
      message: "Seats created successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Create seats failed: ${error}`,
    };
  }
};
export const editMultipleSeat = async (data: any) => {
  try {
    const { rows } = data;

    if (!Array.isArray(rows)) {
      return {
        errCode: 2,
        message: "Invalid input: rows array is required",
      };
    }

    const updatedSeats = [];
    for (const rowData of rows) {
      const { id: row, columns } = rowData;

      for (const colData of columns) {
        const { col, roomCode, type, isAvailable } = colData;

        // Check if seat exists
        const existingSeat = await Seat.findOne({
          where: { row, col, roomCode },
        });

        if (!existingSeat) {
          return {
            errCode: 1,
            message: `Seat at row ${row}, col ${col}, room ${roomCode} does not exist`,
          };
        }

        // Update the seat with the new values
        await existingSeat.update({
          type,
          isAvailable,
          seatCode: Seat.generateSeatCode(col, row),
        });

        updatedSeats.push(existingSeat);
      }
    }

    if (updatedSeats.length === 0) {
      return {
        errCode: 1,
        message: "No seats were updated, they may not exist",
      };
    }

    return {
      updatedSeats,
      errCode: 0,
      message: "Seats updated successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Edit seats failed: ${error}`,
    };
  }
};

export const deleteSeatInRoom = async (roomCode: string) => {
  try {
    const seats = await Seat.destroy({ where: { roomCode: roomCode } });
    if (seats) {
      return {
        errCode: 0,
        message: "Seats deleted successfully",
      };
    } else {
      return {
        errCode: 1,
        message: "No seats found to delete",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting seats in room ${error}`,
    };
  }
};
