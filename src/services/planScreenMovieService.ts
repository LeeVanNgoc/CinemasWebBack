import { DateOnlyDataType, Op } from 'sequelize';

import PlanScreenMovie from '../models/PlanScreenMovie';
import { numberSeatInRoom } from './seatsService';

export const checkPlanScreenMovieId = async (planScreenMovieId: number) => {
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
  const { planScreenMovieId, roomId, movieId, startTime, endTime, dateScreen } = data;

  try {
    if (!planScreenMovieId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const planScreenMovie = await PlanScreenMovie.findOne({ where: { planScreenMovieId } });
    if (!planScreenMovie) {
      return { errCode: 1, message: 'PlanScreenMovie not found!' };
    }

    // Cập nhật các giá trị mới nếu có
    if (roomId !== undefined) {
      planScreenMovie.roomId = roomId;
    }
    if (movieId !== undefined) {
      planScreenMovie.movieId = movieId;
    }
    if (startTime) {
      planScreenMovie.startTime = startTime;
    }
    if (endTime) {
      planScreenMovie.endTime = endTime;
    }
    if (dateScreen) {
      planScreenMovie.dateScreen = dateScreen;
    }

    // Lưu các thay đổi
    await planScreenMovie.save();

    return {
      errCode: 0,
      message: 'Update the PlanScreenMovie succeeds!',
      planScreenMovie
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating PlanScreenMovie: ${error}` // Trả về thông báo lỗi chi tiết hơn
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

export const createPlanScreenMovie = async (roomId: number, movieId: number, dateScreen: string, times: string[]) => {
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

    const newPlanScreenMovies = [];

    const existingSchedules = await PlanScreenMovie.findAll({
      where: {
        roomId,
        dateScreen,
      },
    });

    for (const time of times) {
      const [startTime, endTime] = time.split('-');

      // Kiểm tra giá trị startTime và endTime
      if (!startTime || !endTime) {
        return {
          errCode: 4,
          message: `Invalid time format for time ${time}. Please provide both start and end times.`,
        };
      }

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

      // Tạo PlanScreenMovie với giá trị mới
      const newPlanScreen = await PlanScreenMovie.create({
        planScreenMovieId: newId,
        roomId,
        movieId,
        startTime,
        endTime,
        dateScreen,
      });

      newPlanScreenMovies.push(newPlanScreen);
      newId++;
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
        message: 'No PlanScreenMovieId found',
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

export const getStartTime = async (data: any) => {
  try {
    const startTimePlan = await PlanScreenMovie.findAll({
      where: {
        movieId: data.movieId,
        dateScreen: data.dateScreen,
      },
      attributes: ["roomId", "startTime"],
      raw: true,
    });

    if (startTimePlan.length > 0) {
      return {
        errCode: 0,
        message: "Get PlanScreenMovieId success",
        startTimePlanScreen: startTimePlan,
      };
    } else {
      return {
        errCode: 1,
        message: "No PlanScreenMovieId found",
      };
    }
  } catch (error) {
    console.error("Error in getPlanScreenMovieIdByMovieId:", error);
    return {
      errCode: 3,
      message: `Error getting PlanScreenMovieId: ${error}`,
    };
  }
};
