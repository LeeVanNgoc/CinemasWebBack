import Tickets from "../models/Ticket";

export const createTickets = async (data: any) => {
  try {
    const newTicket = await Tickets.create({
      userId: data.userId,
      psmId: data.psmId,
      stId: data.stId,
      bank: data.bank,
      price: data.price,
      ticketsDate: new Date(),
    });

    if (newTicket) {
      return {
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
      errCode: 2,
      message: `Error creating ticket: ${error}`,
    };
  }
};

export const deleteTicket = async (ticketId : number) => {
    try {
      const ticket = await Tickets.findOne({
		    where: {ticketId : ticketId}
	    });
  
      if (!ticket) {
        return {
          errCode: 1,
          message: "Not found Ticket"
        }
      } else {
        await ticket.destroy();
  
        return {
          errCode: 0,
          message: "Ticket deleted successfully"
        }
      }
    } catch (error) {
      return {
        errCode : 2,
        message : `Delete false by error: ${error}`,
      }
    }
};

export const editTicket = async (data: any) => {
  try {
    const ticket = await Tickets.findOne({
      where: {ticketId: data.ticketId},
    })
    if (!ticket) {
      return {
        errCode: 1,
        message: "Not found Ticket"
      }
    }

    ticket.userId = data.userId || ticket.userId;
    ticket.psmId = data.psmId || ticket.psmId;
    ticket.stId = data.stId || ticket.stId;
    ticket.bank = data.bank || ticket.bank;
    ticket.price = data.price || ticket.price;
    ticket.TicketsDate = new Date();
    await ticket.save();

    return {
      errCode: 0,
      message: "Ticket updated successfully",
    }
  } catch (error) {
    return {
      errCode : 2,
      message : `Edit false by error: ${error}`,
    }
  }
}

export const getListTicket = async() => {
  try {
    const tickets = await Tickets.findAll({
      attributes: ['ticketId', 'userId', 'psmId','stId', 'bank', 'price', 'ticketsDate'],
      raw: true,
    });
    if (tickets === null) {
      return {
        tickets,
        errCode: 1,
        message: "Not found ticket",
      }
    }
    return {
      tickets,
      errCode: 0,
      message: "List ticket fetched successfully",
    };
  } catch (error) {
    return(error)
  }
    
}

export const getTicketById = async (ticketId : number) => {
  try {
    if (!ticketId) {
      return {
        errCode : 2,
        message : "TicketId is required"
      }
    }
    const ticket = await Tickets.findOne({
      where: {ticketId: ticketId},
      attributes: ['ticketId', 'userId', 'psmId','stId', 'bank', 'price', 'ticketsDate'],
      raw: true,
    });
    if (!ticket) {
      return {
        errCode: 1,
        message: "Not found Ticket"
      }
    }
    return {
      ticket,
      errCode: 0,
      message: "Ticket fetched successfully",
    };
  } catch (error) {
    return {
      message : `Get false by error: ${error}`,
    }
  }
}