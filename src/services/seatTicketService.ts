import SeatTickets from "../models/SeatTicket";


// Check ticket exist
export const checkTicketExist = async (ticketId: number) => {
    try {
        const seatTicket = await SeatTickets.findOne({
            where: { ticketId : ticketId }
        });
        if (!seatTicket) {
            return {
                errCode: 1,
                message: 'No ticket created',
            };
        } else {
            return {
                errCode: 0,
                message: 'Ticket is exist',
            };
        }
    } catch (error) {
        return {
            errCode: 3,
            message: `Get ticket failed ${error}`,
        };
    }
};

// Create Seat ticket 
export const createSeatTicket = async (data: any) => {
	try {
        const checkTicket = await checkTicketExist(data.ticketId);
        if (checkTicket.errCode === 0) {
            return {
                errCode: 2,
                message: 'Ticket is exist, please put other ticket id',
            };
        }
		const newSeatTicket = await SeatTickets.create({
            seatId: data.seatId,
            ticketId: data.ticketId,
        });
		return {
			newSeatTicket,
			errCode : 0,
			message: 'Create Seat ticket successfuly',
		};
	} catch (error) {
		return {
			errCode: 3,
			message: 'Create Seat ticket failed',
		};
	}
};

// Get Seat ticket by id
export const getSeatTicketById = async (stId: number) => {
    try {
        const seatTicket = await SeatTickets.findOne({
			where: {stId : stId}
		});
        if (!seatTicket) {
            return {
                errCode: 1,
                message: 'Seat ticket not found',
            };
        }
        return {
            seatTicket,
            errCode : 0,
            message: 'Get Seat ticket successfuly',
        };
    } catch (error) {
        return {
            errCode : 3,
            message: `Error get Seat ticket by id ${error}`,
        };
    }
};

// Get all Seat tickets

export const getAllSeatTickets = async () => {
    try {
        const seatTickets = await SeatTickets.findAll();
        return {
            seatTickets,
            errCode : 0,
            message: 'Get all Seat tickets successfuly',
        };
    } catch (error) {
        return {
            errCode : 3,
            message: `Error get all Seat tickets ${error}`,
        };
    }
};

// Update Seat ticket by id
export const updateSeatTicket = async (data: any) => {
    const stId = data.stId
    try {
        if (!stId) {
            return {
                errCode: 2,
                message: 'Seat ticket id is required',
            };
        }
        const seatTicket = await SeatTickets.findOne({
			where: { stId: stId },
		});
        if (!seatTicket) {
            return {
                errCode: 1,
                message: 'Seat ticket not found',
            };
        }
		seatTicket.seatId = data.seatId || seatTicket.seatId;
		seatTicket.ticketId = data.ticketId || seatTicket.ticketId;
        await seatTicket.save();
        return {
            seatTicket,
            errCode : 0,
            message: 'Update Seat ticket successfuly',
        };
    } catch (error) {
        return {
            errCode: 3,
            message: `Error update Seat ticket by id ${error}`,
        };
    }
};

// Delete Seat ticket by id
export const deleteSeatTicket = async (stId: number) => {
    try {
        const seatTicket = await SeatTickets.findByPk(stId);
        if (!seatTicket) {
            return {
                errCode: 1,
                message: 'Seat ticket not found',
            };
        }
        await seatTicket.destroy();
        return {
            errCode : 0,
            message: 'Delete Seat ticket successfuly',
        };
    } catch (error) {
        return {
            errCode : 3,
            message: `Error delete Seat ticket by id ${error}`,
        };
    }
};