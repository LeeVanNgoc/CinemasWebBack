import { DateOnlyDataType, Op } from "sequelize";

import PlanScreenMovie from "../models/PlanScreenMovie";
import { numberSeatInRoom } from "./seatsService";

export const checkplanScreenMovieCode = async (planScreenMovieCode: number) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({
      where: { planScreenMovieCode },
    });
    if (!planScreenMovie) {
      return {
        errCode: 1,
        message: "PlanScreenMovie not found",
      };
    } else {
      return {
        errCode: 0,
        message: "PlanScreenMovie found",
        planScreenMovieCode: planScreenMovie.planScreenMovieCode,
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error checking planScreenMovieCode: ${error}`,
    };
  }
};

export const deletePlanScreenMovie = async (planScreenMovieCode: string) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({
      where: { planScreenMovieCode: planScreenMovieCode },
    });
    if (!planScreenMovie) {
      return { errCode: 1, message: "PlanScreenMovie not found" };
    } else {
      await planScreenMovie.destroy();
      return { errCode: 0, message: "PlanScreenMovie deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting PlanScreenMovie: ${error}`,
    };
  }
};

export const editPlanScreenMovie = async (data: any) => {
  const { planScreenMovieCode, roomCode, movieCode, startTime, endTime, dateScreen } =
    data;
  try {
    if (!planScreenMovieCode) {
      return { errCode: 4, message: "Missing required parameters!" };
    }

    const planScreenMovie = await PlanScreenMovie.findOne({
      where: { planScreenMovieCode },
    });
    if (!planScreenMovie) {
      return { errCode: 1, message: "PlanScreenMovie not found!" };
    }

    // Cập nhật các giá trị mới nếu có
    if (roomCode !== undefined) {
      planScreenMovie.roomCode = roomCode;
    }
    if (movieCode !== undefined) {
      planScreenMovie.movieCode = movieCode;
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
      message: "Update the PlanScreenMovie succeeds!",
      planScreenMovie,
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating PlanScreenMovie: ${error}`, // Trả về thông báo lỗi chi tiết hơn
    };
  }
};

export const getAllPlanScreenMovies = async () => {
  try {
    const planScreenMovies = await PlanScreenMovie.findAll();
    return {
      errCode: 0,
      message: "Get all PlanScreenMovies success",
      planScreenMovies,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting PlanScreenMovies: ${error}`,
    };
  }
};

export const getPlanScreenMovieByCode = async (planScreenMovieCode: string) => {
  try {
    const planScreenMovie = await PlanScreenMovie.findOne({
      where: { planScreenMovieCode: planScreenMovieCode },
    });
    if (!planScreenMovie) {
      return {
        errCode: 1,
        message: "PlanScreenMovie not found",
      };
    }
    return {
      errCode: 0,
      message: "Get PlanScreenMovie success",
      planScreenMovie,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting PlanScreenMovie: ${error}`,
    };
  }
};

export const createPlanScreenMovie = async (
  roomCode: string,
  movieCode: string,
  dateScreen: string,
  times: string[]
) => {
  try {
    const existingIds = await PlanScreenMovie.findAll({
      attributes: ["planScreenMovieId"],
      order: [["planScreenMovieId", "ASC"]],
    });

    const ids = existingIds.map((psm) => psm.planScreenMovieId);
    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await PlanScreenMovie.findAll({
      attributes: ["planScreenMovieCode"],
      order: [["planScreenMovieCode", "ASC"]],
    });

    const codes = existingCodes.map(
      (planScreenMovie) => planScreenMovie.planScreenMovieCode
    );
    let newCode = "PSM001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "PSM00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "PSM0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "PSM" + newId;
      }
    }

    const newPlanScreenMovies = [];

    const existingSchedules = await PlanScreenMovie.findAll({
      where: {
        roomCode,
        dateScreen,
      },
    });

    for (const time of times) {
      const [startTime, endTime] = time.split("-");

      // Kiểm tra giá trị startTime và endTime
      if (!startTime || !endTime) {
        return {
          errCode: 4,
          message: `Invalid time format for time ${time}. Please provide both start and end times.`,
        };
      }

      if (startTime < "10:00" || endTime > "23:00") {
        return {
          errCode: 4,
          message: `Invalid time format for time ${time}. Please provide start and end times between 10:00-23:00`,
        };
      }

      const hasConflict = existingSchedules.some((schedule) => {
        const existingStartTime = schedule.getDataValue("startTime");
        const existingEndTime = schedule.getDataValue("endTime");

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
        planScreenMovieCode: newCode,
        roomCode,
        movieCode,
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
        message: "PlanScreenMovies created successfully",
        planScreenMovies: newPlanScreenMovies,
      };
    } else {
      return {
        errCode: 1,
        message: "No PlanScreenMovies created",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating PlanScreenMovies: ${error}`,
    };
  }
};

export const getPlanScreenMovieCodeForCreateTicket = async (data: any) => {
  try {
    if (!data.roomCode) {
      return {
        errCode: 2,
        message: "Missing roomCode parameter",
      };
    }
    if (!data.movieCode) {
      return {
        errCode: 2,
        message: "Missing movieCode parameter",
      };
    }
    if (!data.startTime) {
      return {
        errCode: 2,
        message: "Missing startTime parameter",
      };
    }
    if (!data.dateScreen) {
      return {
        errCode: 2,
        message: "Missing dateScreen parameter",
      };
    }

    // Convert dateScreen to Date object
    const dateScreen = new Date(data.dateScreen);
    // Set time to start of day
    dateScreen.setUTCHours(0, 0, 0, 0);

    const planScreenMovies = await PlanScreenMovie.findAll({
      where: {
        roomCode: data.roomCode,
        movieCode: data.movieCode,
        startTime: data.startTime,
        dateScreen: {
          [Op.gte]: dateScreen,
          [Op.lt]: new Date(dateScreen.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      attributes: ["planScreenMovieCode"],
      raw: true,
    });

    if (planScreenMovies.length > 0) {
      const planScreenMovieCodes = planScreenMovies.map(
        (item) => item.planScreenMovieCode
      );
      return {
        errCode: 0,
        message: "Get planScreenMovieCode success",
        planScreenMovieCodes,
      };
    } else {
      return {
        errCode: 1,
        message: "No planScreenMovieCode found",
      };
    }
  } catch (error) {
    console.error("Error in getplanScreenMovieCodeForCreateTicket:", error);
    return {
      errCode: 3,
      message: `Error getting planScreenMovieCode: ${error}`,
    };
  }
};

export const getStartTime = async (data: any) => {
  try {
    const startTimePlan = await PlanScreenMovie.findAll({
      where: {
        movieCode: data.movieCode,
        dateScreen: data.dateScreen,
      },
      attributes: ["roomCode", "startTime"],
      raw: true,
    });

    if (startTimePlan.length > 0) {
      return {
        errCode: 0,
        message: "Get startTime success",
        startTimePlanScreen: startTimePlan,
      };
    } else {
      return {
        errCode: 1,
        message: "No startTime found",
      };
    }
  } catch (error) {
    console.error("Error in startTime:", error);
    return {
      errCode: 3,
      message: `Error getting startTime: ${error}`,

    };
  }
};
