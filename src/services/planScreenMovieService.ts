import exp from 'constants';
import { Op } from 'sequelize';
import PlanScreenMovie from '../models/PlanScreenMovie';
import { numberSeatInRoom } from './seatsService';
import moment from 'moment';

export const createPlanScreenMovie = async (data: any) => {
  try {
    const existingIds = await PlanScreenMovie.findAll({
      attributes: ['planScreenMovieId'],
      order: [['planScreenMovieId', 'ASC']]
    });

    const ids = existingIds.map(psm => psm.planScreenMovieId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newPlanScreenMovie = await PlanScreenMovie.create({
      planScreenMovieId: newId,
      roomId: data.roomId,
      movieId: data.movieId,
      startTime: data.startTime,
      endTime: data.endTime,
      dateScreen: data.dateScreen,
      space: data.space,
    });

    return {
      errCode: 0,
      message: 'PlanScreenMovie created successfully',
      planScreenMovie: newPlanScreenMovie
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating PlanScreenMovie: ${error}`
    };
  }
};

export const deletePlanScreenMovie = async (planScreenMovieId: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
    if (!planScreenMovie) {
      return { errCode: 1, message: "PlanScreenMovie not found" };
    } else {
      await planScreenMovie.destroy();
      return { errCode: 0, message: "PlanScreenMovie deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting PlanScreenMovie: ${error}`
    };
  }
};

export const editPlanScreenMovie = async (data: any) => {
  const planScreenMovieId = data.planScreenMovieId;
  try {
    if (!planScreenMovieId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
    if (!planScreenMovie) {
      return { errCode: 1, message: 'PlanScreenMovie not found!' };
    }

    Object.assign(planScreenMovie, data);
    await planScreenMovie.save();

    return {
      errCode: 0,
      message: 'Update the PlanScreenMovie succeeds!',
      planScreenMovie
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating PlanScreenMovie: ${error}`
    };
  }
};

export const getAllPlanScreenMovies = async () => {
  try {
    const planScreenMovies = await PlanScreenMovie.findAll();
    return {
      errCode: 0,
      message: 'Get all PlanScreenMovies success',
      planScreenMovies
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting PlanScreenMovies: ${error}`
    };
  }
};

export const getPlanScreenMovieById = async (planScreenMovieId: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
    if (!planScreenMovie) {
      return {
        errCode: 1,
        message: 'PlanScreenMovie not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get PlanScreenMovie success',
      planScreenMovie
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting PlanScreenMovie: ${error}`
    };
  }
};

export const createPlanScreenMovieWithMovie = async (data: any) => {
  try {
    const { roomId, movieId, schedule} = data; // Include dateScreen here
    const numberSeat = await numberSeatInRoom(roomId);
    const existingIds = await PlanScreenMovie.findAll({
      attributes: ['planScreenMovieId'],
      order: [['planScreenMovieId', 'ASC']]
    });

    const ids = existingIds.map(psm => psm.planScreenMovieId);
    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newPlanScreenMovies = [];

    for (const item of schedule) {
      const { dateScreen, times } = item;

      const existingSchedules = await PlanScreenMovie.findAll({
        where: {
          roomId,
          dateScreen: dateScreen,
        },
      });

      for (const time of times) {
        const [startTime, endTime] = time.split('-');

        const hasConflict = existingSchedules.some(schedule => {
          const existingStartTime = schedule.getDataValue('startTime');
          const existingEndTime = schedule.getDataValue('endTime');

          return (
            (startTime >= existingStartTime && startTime < existingEndTime) ||
            (endTime > existingStartTime && endTime <= existingEndTime) ||
            (startTime <= existingStartTime && endTime >= existingEndTime)
          );
        });

        if (hasConflict) {
          return {
            errCode: 2,
            message: `Schedule conflict detected for date ${dateScreen} and time ${time}`,
          };
        }

        const newPlanScreen = await PlanScreenMovie.create({
          planScreenMovieId: newId,
          roomId: roomId,
          movieId: movieId,
          startTime: startTime,
          endTime: endTime,
          dateScreen: dateScreen,
          space: numberSeat.numberSeat,
        });

        newPlanScreenMovies.push(newPlanScreen);
        newId++;
      }
    }

    if (newPlanScreenMovies.length > 0) {
      return {
        errCode: 0,
        message: 'PlanScreenMovies created successfully',
        planScreenMovies: newPlanScreenMovies,
      };
    } else {
      return {
        errCode: 1,
        message: 'No PlanScreenMovies created',
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating PlanScreenMovies: ${error}`,
    };
  }
};

