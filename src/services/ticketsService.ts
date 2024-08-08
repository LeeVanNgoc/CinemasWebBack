import Tickets from "../models/Tickets";

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

    const newTicket = await Tickets.create({
      ticketId: newId,
      userId: data.userId,
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

    ticket.userId = data.userId || ticket.userId;
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
        "ticketId",
        "userId",
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

export const getTicketById = async (ticketId: number) => {
  try {
    if (!ticketId) {
      return {
        errCode: 2,
        message: "TicketId is required",
      };
    }
    const ticket = await Tickets.findOne({
      where: { ticketId: ticketId },
      attributes: [
        "ticketId",
        "userId",
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

export const getTicketByUserId = async (userId: number) => {
  try {
    if (!userId) {
      return {
        errCode: 2,
        message: "Missing required parameters",
      };
    }

    const ticket = await Tickets.findAll({
      where: {
        userId: userId,
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
    console.error("Error in getTicketByUserId:", error);
    return {
      errCode: 3,
      message: `Error getting ticketId: ${error}`,
    };
  }
};
