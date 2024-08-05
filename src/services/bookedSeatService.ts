import { Express } from "express";
import BookedSeat from "../models/BookedSeat";

export const createNewBookedSeat = async (data: any) => {
	try {
		const existingIds = await BookedSeat.findAll({
			attributes: ['bookedSeatId'],
			order: [['bookedSeatId', 'ASC']]
		});

		const ids = existingIds.map(bookedSeat => bookedSeat.BookedSeatId);
		let newId = 1;
		while (ids.includes(newId)) {
			newId++;
		}
		const newBookedSeat = await BookedSeat.create({
			bookedSeatId: data.bookedSeatId,
			roomId: data.roomId,
			planSCreenMovieId: data.planSCreenMovieId,
			row: data.row,
			col: data.col,
		});
		if (newBookedSeat) {
			return {
				newBookedSeat: newBookedSeat,
				errCode: 0,
				message: 'Create new booked seat successfuly',
			};
		} else {
			return {
				errCode: 1,
				message: 'Create new booked seat failed',
			}
		}
	} catch (error) {
		return ({
			errCode: 3,
			message: `False to create new booked seat ${error}`,
		})
	}
}

export const getRowAndColOfBookedSeat = async (planSCreenMovieId: number) => {
	try {
		const rowAndCol = await BookedSeat.findAll({
			where: { planSCreenMovieId: planSCreenMovieId },
			attributes: ['row', 'col']
		});
		return {
			rowAndCol: rowAndCol,
			errCode: 0,
			message: 'Get row and col of booked seat successfuly',
		};
	} catch (error) {
		return {
			errCode: 3,
			message: `False to get row and col of booked seat ${error}`,
		}
	}
}