import Tickets from "../models/Tickets";
import PlanScreenMovie from "../models/PlanScreenMovie";

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
      planScreenMovieId: data.planScreenMovieId,
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

export const deleteTicket = async (ticketId: number) => {
  try {
    const ticket = await Tickets.findOne({
      where: { ticketId: ticketId },
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
      where: { ticketId: data.ticketId },
    });
    if (!ticket) {
      return {
        errCode: 1,
        message: "Not found Ticket",
      };
    }

    ticket.userCode = data.userCode || ticket.userCode;
    ticket.planScreenMovieId =
      data.planScreenMovieId || ticket.planScreenMovieId;
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
        "planScreenMovieId",
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
        "planScreenMovieId",
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
      attributes: ["ticketId"],
      raw: true,
    });

    if (ticket.length > 0) {
      const ticketIds = ticket.map((item) => item.ticketId);
      return {
        errCode: 0,
        message: "Get ticketId success",
        ticketIds,
      };
    } else {
      return {
        errCode: 1,
        message: "No ticketId found",
      };
    }
  } catch (error) {
    console.error("Error in getTicketByUserCode:", error);
    return {
      errCode: 3,
      message: `Error getting ticketId: ${error}`,
    };
  }
};

export const getTicketDetailsById = async (ticketCode: string) => {
  try {
    const ticket = await Tickets.findOne({
      where: { ticketCode },
      attributes: [
        "ticketCode",
        "userCode",
        "seats",
        "bank",
        "totalPrice",
        "planScreenMovieId",
      ],
      include: [
        {
          model: PlanScreenMovie,
          as: "planScreenMovie",
          attributes: [
            "roomId",
            "movieId",
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
