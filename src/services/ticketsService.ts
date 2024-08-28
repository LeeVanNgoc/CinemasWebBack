import { Op } from "sequelize";
import Tickets from "../models/Tickets";
import PlanScreenMovie from "../models/PlanScreenMovie";
import Room from "../models/Room";
import Movie from "../models/Movie";
import Theater from "../models/Theater";
import User from "../models/User";
import { getUserByCode } from "./userService";
import { sendingBill } from "../middlewares/mailer";
import { triggerAsyncId } from "async_hooks";
import sequelize from "../config/connectDB";
import { getMovieByCode } from "./movieService";

export const createTickets = async (data: any) => {
  try {
    const existingIds = await Tickets.findAll({
      attributes: ["ticketId"],
      order: [["ticketId", "ASC"]],
    });

    const ids = existingIds.map((ticket) => ticket.ticketId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Tickets.findAll({
      attributes: ["ticketCode"],
      order: [["ticketCode", "ASC"]],
    });

    const codes = existingCodes.map((ticket) => ticket.ticketCode);
    let newCode = "TK001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "TK00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "TK0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "TK" + newId;
      }
    }

    const newTicket = await Tickets.create({
      ticketId: newId,
      ticketCode: newCode,
      userCode: data.userCode,
      planScreenMovieCode: data.planScreenMovieCode,
      seats: data.seats,
      bank: data.bank,
      totalPrice: data.totalPrice,
      ticketsDate: new Date(),
    });

    if (newTicket) {
      return {
        newTicket: newTicket,
        errCode: 0,
        message: "Create ticket successfully",
      };
    } else {
      return {
        errCode: 1,
        message: "Failed to create ticket",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating ticket: ${error}`,
    };
  }
};

export const deleteTicket = async (ticketCode: string) => {
  try {
    const ticket = await Tickets.findOne({
      where: { ticketCode: ticketCode },
    });

    if (!ticket) {
      return {
        errCode: 1,
        message: "Not found Ticket",
      };
    } else {
      await ticket.destroy();

      return {
        errCode: 0,
        message: "Ticket deleted successfully",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Delete false by error: ${error}`,
    };
  }
};

export const editTicket = async (data: any) => {
  try {
    const ticket = await Tickets.findOne({
      where: { ticketCode: data.ticketCode },
    });
    if (!ticket) {
      return {
        errCode: 1,
        message: "Not found Ticket",
      };
    }

    ticket.userCode = data.userCode || ticket.userCode;
    ticket.planScreenMovieCode =
      data.planScreenMovieCode || ticket.planScreenMovieCode;
    ticket.seats = data.seats || ticket.seats;
    ticket.bank = data.bank || ticket.bank;
    ticket.totalPrice = data.totalPrice || ticket.totalPrice;
    ticket.TicketsDate = new Date();
    await ticket.save();

    return {
      errCode: 0,
      message: "Ticket updated successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Edit false by error: ${error}`,
    };
  }
};

export const getListTicket = async () => {
  try {
    const tickets = await Tickets.findAll({
      attributes: [
        "ticketCode",
        "userCode",
        "planScreenMovieCode",
        "seats",
        "bank",
        "totalPrice",
        "ticketsDate",
      ],
      raw: true,
    });
    if (tickets === null) {
      return {
        tickets,
        errCode: 1,
        message: "Not found ticket",
      };
    }
    return {
      tickets,
      errCode: 0,
      message: "List ticket fetched successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Get false by error: ${error}`,
    };
  }
};

export const getTicketByCode = async (ticketCode: string) => {
  try {
    if (!ticketCode) {
      return {
        errCode: 2,
        message: "TicketCode is required",
      };
    }
    const ticket = await Tickets.findOne({
      where: { ticketCode: ticketCode },
      attributes: [
        "ticketCode",
        "userCode",
        "planScreenMovieCode",
        "seats",
        "bank",
        "totalPrice",
        "ticketsDate",
      ],
      raw: true,
    });
    if (!ticket) {
      return {
        errCode: 1,
        message: "Not found Ticket",
      };
    }
    return {
      ticket,
      errCode: 0,
      message: "Ticket fetched successfully",
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Get false by error: ${error}`,
    };
  }
};

export const getTicketByUserCode = async (userCode: string) => {
  try {
    if (!userCode) {
      return {
        errCode: 2,
        message: "Missing required parameters",
      };
    }

    const ticket = await Tickets.findAll({
      where: {
        userCode: userCode,
      },
      attributes: ["ticketCode"],
      raw: true,
    });

    if (ticket.length > 0) {
      const ticketCodes = ticket.map((item) => item.ticketCode);
      return {
        errCode: 0,
        message: "Get ticketCode success",
        ticketCodes,
      };
    } else {
      return {
        errCode: 1,
        message: "No ticketCode found",
      };
    }
  } catch (error) {
    console.error("Error in getTicketByUserCode:", error);
    return {
      errCode: 3,
      message: `Error getting ticketCode: ${error}`,
    };
  }
};

export const getTicketDetailsByCode = async (ticketCode: string) => {
  try {
    const ticket = await Tickets.findOne({
      where: { ticketCode },
      attributes: [
        "ticketCode",
        "userCode",
        "seats",
        "bank",
        "totalPrice",
        "planScreenMovieCode",
      ],
      include: [
        {
          model: PlanScreenMovie,
          as: "planScreenMovie",
          attributes: [
            "roomCode",
            "movieCode",
            "startTime",
            "endTime",
            "dateScreen",
          ],
        },
      ],
      raw: true,
    });

    if (!ticket) {
      return {
        errCode: 1,
        message: "Ticket not found",
      };
    }
    // const userCode = ticket.userCode;
    // const user = await getUserByCode(userCode);
    // const userEmail = user.users?.email;

    // await sendingBill(userEmail, ticketCode);
    return {
      ticket,
      errCode: 0,
      message: "Get ticket details successfully",
    };
  } catch (error) {
    console.error("Error in getTicketDetailsByCode:", error);
    return {
      errCode: 3,
      message: `Error retrieving ticket details: ${error}`,
    };
  }
};

export const sendingBillForUser = async (ticketCode: string) => {
  try {
    const ticket = await Tickets.findOne({
      where: { ticketCode },
      attributes: [
        "ticketCode",
        "userCode",
        "seats",
        "bank",
        "totalPrice",
        "planScreenMovieCode",
      ],
      include: [
        {
          model: PlanScreenMovie,
          as: "planScreenMovie",
          attributes: [
            "roomCode",
            "movieCode",
            "startTime",
            "endTime",
            "dateScreen",
          ],
        },
      ],
    });

    if (!ticket) {
      return {
        errCode: 1,
        message: "Ticket not found",
      };
    }
    const userCode = ticket.userCode;
    const user = await getUserByCode(userCode);
    const userEmail = user.users?.email;

    await sendingBill(userEmail, ticketCode);
    return {
      ticket,
      errCode: 0,
      message: "Get ticket details successfully",
    };
  } catch (error) {
    console.error("Error in getTicketDetailsById:", error);
    return {
      errCode: 3,
      message: `Error retrieving ticket details: ${error}`,
    };
  }
};

export const getRevenueByDate = async (startDate: string, endDate: string) => {
  const planScreenMovies = await PlanScreenMovie.findAll({
    where: {
      dateScreen: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const planScreenMovieCodes = planScreenMovies.map(
    (plan) => plan.planScreenMovieCode
  );

  const tickets = await Tickets.findAll({
    where: {
      planScreenMovieCode: {
        [Op.in]: planScreenMovieCodes,
      },
    },
  });

  const totalRevenue = tickets.reduce(
    (total, ticket) => total + ticket.totalPrice,
    0
  );

  return {
    totalRevenue,
    startDate,
    endDate,
  };
};

export const getRevenueByTheaterAndDate = async (
  theaterCode: string,
  startDate: string,
  endDate: string
) => {
  const theater = await Theater.findOne({
    where: { theaterCode },
  });

  if (!theater) {
    throw new Error("theater not found");
  }

  const planScreenMovies = await PlanScreenMovie.findAll({
    where: {
      dateScreen: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: Room,
        as: "room",
        where: {
          theaterCode: theaterCode,
        },
      },
    ],
  });

  const planScreenMovieCodes = planScreenMovies.map(
    (plan) => plan.planScreenMovieCode
  );

  const tickets = await Tickets.findAll({
    where: {
      planScreenMovieCode: {
        [Op.in]: planScreenMovieCodes,
      },
    },
  });

  const totalRevenue = tickets.reduce(
    (total, ticket) => total + ticket.totalPrice,
    0
  );

  return {
    theaterName: theater.name,
    totalRevenue,
    startDate,
    endDate,
  };
};

export const getRevenueByMovie = async (
  movieCode: string,
  startDate: string,
  endDate: string
) => {
  const movie = await Movie.findOne({
    where: { movieCode },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  const planScreenMovies = await PlanScreenMovie.findAll({
    where: {
      movieCode,
      dateScreen: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const planScreenMovieCodes = planScreenMovies.map(
    (plan) => plan.planScreenMovieCode
  );

  const tickets = await Tickets.findAll({
    where: {
      planScreenMovieCode: {
        [Op.in]: planScreenMovieCodes,
      },
    },
  });

  const totalRevenue = tickets.reduce(
    (total, ticket) => total + ticket.totalPrice,
    0
  );

  return {
    movieTitle: movie.title,
    totalRevenue,
    startDate,
    endDate,
  };
};

export const getRevenueForAllMovie = async (
  startDate: string,
  endDate: string
) => {
  try {
    // Lấy tất cả các phim
    const movies = await Movie.findAll({
      attributes: ["movieCode", "title"],
      raw: true,
    });

    if (!movies || movies.length === 0) {
      throw new Error("Movies not found");
    }

    // Lấy tất cả các suất chiếu phim trong khoảng thời gian
    const planScreenMovies = await PlanScreenMovie.findAll({
      where: {
        dateScreen: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ["planScreenMovieCode", "movieCode"],
      raw: true,
    });

    if (!planScreenMovies || planScreenMovies.length === 0) {
      throw new Error("No screenings found in the given date range");
    }

    const planScreenMovieCodes = planScreenMovies.map(
      (plan) => plan.planScreenMovieCode
    );

    // Lấy tất cả vé tương ứng với các suất chiếu trong khoảng thời gian
    const tickets = await Tickets.findAll({
      where: {
        planScreenMovieCode: {
          [Op.in]: planScreenMovieCodes,
        },
      },
      attributes: ["planScreenMovieCode", "totalPrice"],
      raw: true,
    });

    // Tạo một object để chứa tổng doanh thu cho từng phim
    const revenueByMovie: Record<string, number> = {};

    // Duyệt qua tất cả các suất chiếu và tổng hợp doanh thu cho từng phim
    tickets.forEach((ticket) => {
      const planScreenMovie = planScreenMovies.find(
        (plan) => plan.planScreenMovieCode === ticket.planScreenMovieCode
      );
      if (planScreenMovie) {
        const movieCode = planScreenMovie.movieCode;
        if (!revenueByMovie[movieCode]) {
          revenueByMovie[movieCode] = 0;
        }
        revenueByMovie[movieCode] += ticket.totalPrice;
      }
    });

    // Tạo kết quả cuối cùng với thông tin tiêu đề phim và doanh thu
    const result = movies.map((movie) => {
      return {
        movieCode: movie.movieCode,
        movieTitle: movie.title,
        totalRevenue: revenueByMovie[movie.movieCode] || 0, // Nếu chưa có doanh thu, set về 0
      };
    });

    return {
      errCode: 0,
      message: "Get revenue for all movies success",
      revenueData: result,
      startDate,
      endDate,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting revenue for all movies: ${error}`,
    };
  }
};

export const getAllTicketForUser = async (userCode: string) => {
  try {
    const allTicket: any = await Tickets.findAll({
      where: { userCode: userCode },
      attributes: [
        "ticketCode",
        "userCode",
        "seats",
        "bank",
        "totalPrice",
        "planScreenMovieCode",
      ],
      include: [
        {
          model: PlanScreenMovie,
          as: "planScreenMovie",
          attributes: [
            "roomCode",
            "movieCode",
            "startTime",
            "endTime",
            "dateScreen",
          ],
        },
      ],
    });

    if (allTicket && allTicket.length > 0) {
      const ticketDataPromises = allTicket.map(async (ticket: any) => {
        const movie = await getMovieByCode(ticket.planScreenMovie.movieCode);
        const movieTitle = movie?.movie?.title || "Unknown Title";
        const user = await getUserByCode(ticket.userCode);
        const userName: string = user?.users?.userName || "Unknown User";

        return {
          ticketCode: ticket.ticketCode,
          userName: userName,
          seats: ticket.seats,
          bank: ticket.bank,
          totalPrice: ticket.totalPrice,
          planMovieCode: ticket.planScreenMovieCode,
          room: ticket.planScreenMovie.roomCode,
          movieTitle: movieTitle,
          startTime: ticket.planScreenMovie.startTime,
          endTime: ticket.planScreenMovie.endTime,
          dateScreen: ticket.planScreenMovie.dateScreen,
        };
      });

      // Đợi tất cả các Promise hoàn thành
      const ticketData = await Promise.all(ticketDataPromises);

      return {
        errCode: 0,
        message: "Get all ticket success",
        ticketData: ticketData,
      };
    } else {
      return {
        errCode: 1,
        message: "Ticket not found",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error retrieving ticket details: ${error}`,
    };
  }
};

export const getAverageAgeOfUsers = async () => {
  try {
    const tickets = await Tickets.findAll({
      attributes: ["userCode"],
      group: ["userCode"],
      raw: true,
    });

    if (!tickets || tickets.length === 0) {
      return {
        errCode: 1,
        message: "No users found with tickets",
      };
    }

    const userCodes = tickets.map((ticket) => ticket.userCode);

    const users = await User.findAll({
      where: {
        userCode: {
          [Op.in]: userCodes,
        },
      },
      attributes: ["birthYear"],
      raw: true,
    });

    if (!users || users.length === 0) {
      return {
        errCode: 1,
        message: "No users found with the given user codes",
      };
    }

    const currentYear = new Date().getFullYear();
    const totalAge = users.reduce((sum, user) => {
      const age = currentYear - user.birthYear;
      return sum + age;
    }, 0);

    const averageAge = totalAge / users.length;

    return {
      errCode: 0,
      message: "Average age calculated successfully",
      averageAge,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error calculating average age: ${error}`,
    };
  }
};

export const getAverageAgeByTheater = async (theaterCode: string) => {
  try {
    // Lấy tất cả các tickets liên quan đến theaterCode
    const tickets = await Tickets.findAll({
      include: [
        {
          model: PlanScreenMovie,
          as: "planScreenMovie",
          attributes: [],
          include: [
            {
              model: Room,
              as: "room",
              attributes: [],
              where: { theaterCode }, // Lọc theo theaterCode trong Room
            },
          ],
        },
      ],
      attributes: ["userCode"],
      group: ["userCode"], // Group theo userCode để đảm bảo không bị trùng lặp
      raw: true,
    });

    if (!tickets || tickets.length === 0) {
      return {
        errCode: 1,
        message: "No users found with tickets in this theater",
      };
    }

    const userCodes = tickets.map((ticket) => ticket.userCode);

    // Lấy danh sách người dùng dựa trên userCodes
    const users = await User.findAll({
      where: {
        userCode: {
          [Op.in]: userCodes, // Lọc chỉ những user có userCode trong theaterCode cụ thể
        },
      },
      attributes: ["birthYear"],
      raw: true,
    });

    if (!users || users.length === 0) {
      return {
        errCode: 1,
        message: "No users found with the given user codes",
      };
    }

    const currentYear = new Date().getFullYear();
    const totalAge = users.reduce((sum, user) => {
      const age = currentYear - user.birthYear;
      return sum + age;
    }, 0);

    const averageAge = totalAge / users.length;

    return {
      errCode: 0,
      message: "Average age calculated successfully",
      averageAge,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error calculating average age: ${error}`,
    };
  }
};
