import { Op } from 'sequelize';

import PlanScreenMovie from '../models/PlanScreenMovie';
import { numberSeatInRoom } from './seatsService';

export const checkPlanScreenMovieId = async(planScreenMovieId : number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
    if (!planScreenMovie) {
      return {
        errCode: 1,
        message: 'PlanScreenMovie not found'
      };
    } else {
      return {
        errCode: 0,
        message: 'PlanScreenMovie found',
        planScreenMovieId: planScreenMovie.planScreenMovieId,
    }
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error checking PlanScreenMovieId: ${error}`
    };
  }
}

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

    planScreenMovie.roomId = data.roomId || planScreenMovie.roomId,
    planScreenMovie.movieId = data.movieId || planScreenMovie.movieId,
    planScreenMovie.startTime = data.startTime || planScreenMovie.startTime,
    planScreenMovie.endTime = data.endTime || planScreenMovie.endTime,
    planScreenMovie.dateScreen = data.dateScreen || planScreenMovie.dateScreen,
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
    const { roomId, movieId, schedule} = data;
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

export const getPlanScreenMovieIdForCreateTicket = async (data: any) => {
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

    const planScreenMovies = await PlanScreenMovie.findAll({
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

    if (planScreenMovies.length > 0) {
      const planScreenMovieIds = planScreenMovies.map(item => item.planScreenMovieId);
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