import { Express } from "express";
import BookedSeat from "../models/BookedSeat";

// Kiểm tra sự tồn tại của ghế đã được đặt trong 1 ca chiếu
export const checkExistSeatWasBooked = async (data: any) => {
  try {
    const bookedSeat = await BookedSeat.findOne({
      where: {
        planSCreenMovieId: data.planSCreenMovieId,
        row: data.row,
        col: data.col,
        roomId: data.roomId,
      },
    });
    if (bookedSeat) {
      return {
        errCode: 0,
        message: "Seat was booked",
      };
    } else {
      return {
        errCode: 1,
        message: "Seat was not booked",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `False to check seat was booked ${error}`,
    };
  }
};

export const createNewBookedSeat = async (data: any) => {
  try {
    const checkExitSeat = await checkExistSeatWasBooked(data);
    if (checkExitSeat.errCode === 0) {
      return {
        errCode: 2,
        message: "Seat was already booked",
      };
    }
    const existingIds = await BookedSeat.findAll({
      attributes: ["bookedSeatId"],
      order: [["bookedSeatId", "ASC"]],
    });

    const ids = existingIds.map((bookedSeat) => bookedSeat.bookedSeatId);
    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }
    const newBookedSeat = await BookedSeat.create({
      bookedSeatId: newId,
      roomId: data.roomId,
      planSCreenMovieId: data.planSCreenMovieId,
      row: data.row,
      col: data.col,
    });
    if (newBookedSeat) {
      return {
        newBookedSeat: newBookedSeat,
        errCode: 0,
        message: "Create new booked seat successfuly",
      };
    } else {
      return {
        errCode: 1,
        message: "Create new booked seat failed",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `False to create new booked seat ${error}`,
    };
  }
};

export const getRowAndColOfBookedSeat = async (planSCreenMovieId: number) => {
  try {
    const bookedSeat = await BookedSeat.findAll({
      where: { planSCreenMovieId: planSCreenMovieId },
      attributes: ["row", "col"],
    });
    const rowAndColStrings = bookedSeat.map((seat) => `${seat.row}${seat.col}`);

    const rowAndColArray = bookedSeat.map((seat) => [seat.row, seat.col]);

    console.log(rowAndColStrings);
    console.log(rowAndColArray);

    return {
      rowAndCol: rowAndColArray,
      errCode: 0,
      message: "Get row and col of booked seat successfuly",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `False to get row and col of booked seat ${error}`,
    };
  }
};
