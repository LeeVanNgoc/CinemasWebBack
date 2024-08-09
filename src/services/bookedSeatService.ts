import { Express } from "express";
import BookedSeat from "../models/BookedSeat";
import Tickets from "../models/Tickets";
import PlanScreenMovie from "../models/PlanScreenMovie";

// Lấy phòng từ kế hoạch chiếu phim
const getRoomInPlanScreen = async (planScreenMovieId: number) => {
  try {
    const room = await PlanScreenMovie.findOne({
      where: { planSCreenMovieId: planScreenMovieId },
      attributes: ["roomId"],
    });
    if (room) {
      return {
        roomId: room.roomId,
        errCode: 0,
        message: "Get room successfuly",
      };
    } else {
      return {
        errCode: 1,
        message: "No room found",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `False to get room ${error}`,
    };
  }
};

// Tách hàng và cột
export const getRowAndColOfSeats = async (data: any) => {
  try {
    const ticket = await Tickets.findAll({
      where: {
        ticketId: data.ticketId,
      },
      attributes: ["seats", "planScreenMovieId"],
    });
    if (ticket) {
      const planScreenMovieIds = ticket.map((seat) => seat.planScreenMovieId);
      const planScreenMovieId = planScreenMovieIds[0];
      const seats = ticket.map((ticket) => ticket.seats);

      const seatsData = seats.toString();

      const seatData = seatsData.split(",");
      const rows = seatData.map((seat: string) => seat.trim()[0]);
      const cols = seatData.map((seat: string) => parseInt(seat.trim()[1]));
      return {
        planScreenMovieId,
        rows,
        cols,
        errCode: 0,
        message: "Get row and col of seats successfuly",
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
      message: `False to get row and col of seats ${error}`,
    };
  }
};

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
    const ticket = await getRowAndColOfSeats(data);

    if (ticket.errCode === 0) {
      const planScreenMovieId = Number(ticket.planScreenMovieId) || 0;
      const rows = ticket.rows || [];
      const cols = ticket.cols || [];
      const room = await getRoomInPlanScreen(planScreenMovieId);
      const bookedSeats = rows.map((row: string, index: number) => {
        return {
          bookedSeatId: newId + index, // Cung cấp ID duy nhất cho từng bản ghi
          planScreenMovieId: planScreenMovieId,
          row: row,
          col: cols[index],
          roomId: data.roomId,
        };
      });
      const newBookedSeat = await BookedSeat.bulkCreate(bookedSeats);
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
    } else {
      return {
        errCode: 2,
        message: "Ticket not found",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `False to create new booked seat ${error}`,
    };
  }
};

export const getRowAndColOfBookedSeat = async (planScreenMovieId: number) => {
  try {
    const bookedSeat = await BookedSeat.findAll({
      where: { planScreenMovieId: planScreenMovieId },
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
