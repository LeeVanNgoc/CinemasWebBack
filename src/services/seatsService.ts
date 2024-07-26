import Seat from "../models/Seat";

// Create new Seat 
export const createSeat = async (data: any) => {
	try {
		const newSeat = await Seat.create({
			row : data.row,
			col : data.col,
            type : data.type,
            roomId : data.roomId,
            isAvailable : data.isAvailable,
		});
		return {
			newSeat,
			errCode : 0,
			message: 'Create seat successfuly',
		};
	} catch (error) {
		return {
			errCode: 3,
			message: 'Create seat failed',
		};
	}
};

// Get all seat
export const getAllSeats = async () => {
	try {
		const seats = await Seat.findAll();
		return {
			seats,
			errCode: 0,
			message: 'Get all seats successfuly',
		};
	} catch (error) {
		return {
			errCode: 3,
			message: 'Get all seats failed',
		};
	}
};

// Get Seat by id
export const getSeatById = async (seatId: number) => {
    try {
        const seat = await Seat.findOne({
			where: {seatId: seatId},
            raw: true,
		});
        if (!seat) {
            return {
                errCode: 1,
                message: 'Seat not found',
            };
        }
        return {
            seat,
            errCode: 0,
            message: 'Get seat successfuly',
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
			where : {seatId : data.seatId}
		});
        if (!seat) {
            return {
                errCode: 1,
                message: 'Seat not found',
            };
        }
		seat.isAvailable = data.status || seat.isAvailable;
        await seat.save();
        return {
            seat,
            errCode: 0,
            message: 'Update seat successfuly',
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
			where : {seatId : seatId}
		});
        if (!seat) {
            return {
                errCode: 1,
                message: 'Seat not found',
            };
        }
        await seat.destroy();
        return {
            errCode: 0,
            message: 'Delete seat successfuly',
        };
    } catch (error) {
        return {
            errCode: 3,
            message: `Error delete seat by id ${error}`,
        };
    }
};