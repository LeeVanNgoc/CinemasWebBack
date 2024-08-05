import { Op } from 'sequelize';

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
        const existingIds = await SeatTickets.findAll({
            attributes: ['seatTicketId'],
            order: [['seatTicketId', 'ASC']]
        });

        const ids = existingIds.map(seatTickets => seatTickets.seatTicketId);

        let newId = 1;
        while (ids.includes(newId)) {
            newId++;
        }
		const newSeatTicket = await SeatTickets.create({
            seatTicketId: newId,
            seatId: data.seatId,
            ticketId: data.ticketId,
            screenDate: data.screenDate,
            isBooked: false,
        });
		return {
			newSeatTicket,
			errCode : 0,
			message: 'Create Seat ticket successfuly',
		};
	} catch (error) {
		return {
			errCode: 3,
			message: `Create Seat ticket failed ${error}`,
		};
	}
};

// Get Seat ticket by id
export const getSeatTicketById = async (seatTicketId: number) => {
    try {
        const seatTicket = await SeatTickets.findOne({
			where: {seatTicketId : seatTicketId}
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
    const seatTicketId = data.seatTicketId
    try {
        if (!seatTicketId) {
            return {
                errCode: 2,
                message: 'Seat ticket id is required',
            };
        }
        const seatTicket = await SeatTickets.findOne({
			where: { seatTicketId: seatTicketId },
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
export const deleteSeatTicket = async (seatTicketId: number) => {
    try {
        const seatTicket = await SeatTickets.findByPk(seatTicketId);
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

// Get Seat ticket by seatId and ticketId and dateScreen
export const getSeatTicketBySeatIdAndTicketIdAndScreenDate = async (data: any) => {
    try {
        if (!data.roomId || !data.movieId || !data.startTime || !data.dateScreen) {
          return {
            errCode: 2,
            message: 'Missing required parameters',
          };
        }
    
        // Convert dateScreen to Date object
        const dateScreen = new Date(data.dateScreen);
        // Set time to start of day
        dateScreen.setUTCHours(0, 0, 0, 0);
    
        const seatTickets = await SeatTickets.findAll({
          where: {
            roomId: data.roomId,
            movieId: data.movieId,
            startTime: data.startTime,
            dateScreen: {
              [Op.gte]: dateScreen,
              [Op.lt]: new Date(dateScreen.getTime() + 24 * 60 * 60 * 1000)
            }
          },
          attributes: ['planScreenMovieId'],
          raw: true
        });
    
        if (seatTickets.length > 0) {
          const planScreenMovieIds = seatTickets.map(item => item.seatTicketId);
          return {
            errCode: 0,
            message: 'Get PlanScreenMovieId success',
            planScreenMovieIds,
          };
        } else {
          return {
            errCode: 1,
            message: 'No PlanScreenMovie found',
          };
        }
      } catch (error) {
        console.error('Error in getPlanScreenMovieIdForCreateTicket:', error);
        return {
          errCode: 3,
          message: `Error getting PlanScreenMovieId: ${error}`,
        };
      }
    };