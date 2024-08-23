import { Express } from "express";
import BookedSeat from "../models/BookedSeat";
import Tickets from "../models/Tickets";
import PlanScreenMovie from "../models/PlanScreenMovie";

// Lấy phòng từ kế hoạch chiếu phim
const getRoomInPlanScreen = async (planScreenMovieCode: string) => {
  try {
    const room = await PlanScreenMovie.findOne({
      where: { planSCreenMovieCode: planScreenMovieCode },
      attributes: ["roomCode"],
    });
    if (room) {
      return {
        roomCode: room.roomCode,
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
        ticketCode: data.ticketCode,
      },
      attributes: ["seats", "planScreenMovieCode"],
    });
    if (ticket) {
      const planScreenMovieCodes = ticket.map(
        (seat) => seat.planScreenMovieCode
      );
      const planScreenMovieCode = planScreenMovieCodes[0];
      const seats = ticket.map((ticket) => ticket.seats);

      const seatsData = seats.toString();

      const seatData = seatsData.split(",");
      const rows = seatData.map((seat: string) => seat.trim()[0]);
      const cols = seatData.map((seat: string) =>
        parseInt(seat.trim().slice(1))
      );
      return {
        planScreenMovieCode,
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
        planSCreenMovieCode: data.planSCreenMovieCode,
        row: data.row,
        col: data.col,
        roomCode: data.roomCode,
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

    const existingCodes = await BookedSeat.findAll({
      attributes: ["bookedSeatCode"],
      order: [["bookedSeatCode", "ASC"]],
    });

    const codes = existingCodes.map((bookedSeat) => bookedSeat.bookedSeatCode);
    let newCode = "BS001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "BS00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "BS0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "BS" + newId;
      }
    }
    const ticket = await getRowAndColOfSeats(data);

    if (ticket.errCode === 0) {
      const planScreenMovieCode = String(ticket.planScreenMovieCode) || "";
      const rows = ticket.rows || [];
      const cols = ticket.cols || [];
      const room = await getRoomInPlanScreen(planScreenMovieCode);
      const bookedSeats = rows.map((row: string, index: number) => {
        return {
          bookedSeatId: newId + index,
          bookedSeatCode: newCode + index,
          planScreenMovieCode: planScreenMovieCode,
          row: row,
          col: cols[index],
          roomCode: room.roomCode,
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

export const getRowAndColOfBookedSeat = async (planScreenMovieCode: string) => {
  try {
    const bookedSeat = await BookedSeat.findAll({
      where: { planScreenMovieCode: planScreenMovieCode },
      attributes: ["row", "col"],
    });
    const rowAndColStrings = bookedSeat.map((seat) => `${seat.row}${seat.col}`);

    const rowAndColArray = bookedSeat.map((seat) => [seat.row, seat.col]);

    console.log(rowAndColStrings);
    console.log(rowAndColArray);

    return {
      rowAndCol: rowAndColStrings,
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
