import { DateOnlyDataType, Op } from "sequelize";

import PlanScreenMovie from "../models/PlanScreenMovie";
import { getMovieByCode } from "./movieService";
import Movie from "../models/Movie";
import Genres from "../models/Genres";
import Room from "../models/Room";
import Sequelize from "sequelize";
import { getRoomInTheater } from "./roomService";
import { Theater } from "../models";
import { any } from "joi";

export const checkplanScreenMovieCode = async (planScreenMovieCode: string) => {
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
  const {
    planScreenMovieCode,
    roomCode,
    movieCode,
    startTime,
    endTime,
    dateScreen,
  } = data;
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
    if (!planScreenMovies) {
      return {
        errCode: 1,
        message: "No PlanScreenMovie found",
      };
    } else {
    }
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

export const getListPlanScreenInformation = async () => {
  try {
    const planScreenMovies = await PlanScreenMovie.findAll({
      attributes: [
        "planScreenMovieCode",
        "roomCode",
        "movieCode",
        "startTime",
        "endTime",
        "dateScreen",
      ],
    });

    const planScreenMovieData = await Promise.all(
      planScreenMovies.map(async (planScreenMovie) => {
        const movie = await getMovieByCode(planScreenMovie.movieCode);
        return {
          planScreenMovieCode: planScreenMovie.planScreenMovieCode,
          roomCode: planScreenMovie.roomCode,
          movieCode: planScreenMovie.movieCode,
          movieTitle: movie.movie?.title,
          startTime: planScreenMovie.startTime,
          endTime: planScreenMovie.endTime,
          dateScreen: planScreenMovie.dateScreen,
        };
      })
    );

    if (!planScreenMovies) {
      return {
        errCode: 1,
        message: "No PlanScreenMovie found",
      };
    } else {
      return {
        errCode: 0,
        message: "Get all PlanScreenMovies success",
        data: planScreenMovieData,
      };
    }
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting PlanScreenMovies: ${error}`,
    };
  }
};

export const getListPlanScreenInformationByTheaterCode = async (
  theaterCode: string
) => {
  try {
    const rooms = await getRoomInTheater(theaterCode);
    const roomCodes = rooms.rooms?.map((room) => room.roomCode);

    if (!roomCodes || roomCodes.length === 0) {
      return {
        errCode: 1,
        message: "No rooms found in this theater",
      };
    }

    const planScreenMovies = await PlanScreenMovie.findAll({
      where: {
        roomCode: {
          [Op.in]: roomCodes,
        },
      },
      attributes: [
        "planScreenMovieCode",
        "roomCode",
        "movieCode",
        "startTime",
        "endTime",
        "dateScreen",
      ],
    });

    const planScreenMovieData = await Promise.all(
      planScreenMovies.map(async (planScreenMovie) => {
        const movie = await getMovieByCode(planScreenMovie.movieCode);
        return {
          planScreenMovieCode: planScreenMovie.planScreenMovieCode,
          roomCode: planScreenMovie.roomCode,
          movieCode: planScreenMovie.movieCode,
          movieTitle: movie.movie?.title,
          startTime: planScreenMovie.startTime,
          endTime: planScreenMovie.endTime,
          dateScreen: planScreenMovie.dateScreen,
        };
      })
    );

    if (!planScreenMovies) {
      return {
        errCode: 1,
        message: "No PlanScreenMovie found",
      };
    } else {
      return {
        errCode: 0,
        message: "Get all PlanScreenMovies success",
        data: planScreenMovieData,
      };
    }
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

export const createPlanScreenMovie2 = async (
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
export const createPlanScreenMovie = async (
  roomCode: string,
  movieCode: string,
  dateScreen: string,
  startTime: string,
  endTime: string
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

    const existingSchedules = await PlanScreenMovie.findAll({
      where: {
        roomCode,
        dateScreen,
        startTime,
      },
    });

    if (existingSchedules.length > 0) {
      return {
        errCode: 2,
        message: `Schedule conflict detected for date ${dateScreen}`,
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

    if (newPlanScreen) {
      return {
        errCode: 0,
        message: "PlanScreenMovies created successfully",
        newPlanScreen: newPlanScreen,
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
    if (!data.theaterCode) {
      return {
        errCode: 2,
        message: "Missing theaterCode parameter",
      };
    }

    // Convert dateScreen to Date object
    const dateScreen = new Date(data.dateScreen);
    // Set time to start of day
    dateScreen.setUTCHours(0, 0, 0, 0);

    const planScreenMovies = await PlanScreenMovie.findAll({
      include: [
        {
          model: Room,
          as: "room",
          where: { theaterCode: data.theaterCode },
          attributes: [],
        },
      ],
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
    console.error("Error in getPlanScreenMovieCodeForCreateTicket:", error);
    return {
      errCode: 3,
      message: `Error getting planScreenMovieCode: ${error}`,
    };
  }
};

export const getStartTime = async (data: any) => {
  try {
    const startTimePlan = await PlanScreenMovie.findAll({
      include: [
        {
          model: Room,
          as: "room",
          where: { theaterCode: data.theaterCode },
          attributes: [],
        },
      ],
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

// export const getMovieDetailsByDate = async (dateScreen: string) => {
//   try {
//     const planScreenMovie = await PlanScreenMovie.findAll({
//       where: { dateScreen },
//       attributes: [
//         "planScreenMovieCode",
//       ],
//       include: [
//         {
//           model: Movie,
//           as: "movie",
//           attributes: [
//             "title",
//             "description",
//             "duration",
//             "country",
//             "image",
//           ],
//           include: [
//             {
//               model: Genres,
//               as: "genre",
//               attributes: ["name"],
//             }
//           ]
//         },
//       ],
//     });

//     if (!planScreenMovie || planScreenMovie.length === 0) {
//       return {
//         errCode: 1,
//         message: "Movie screening not found for the given date",
//       };
//     }

//     // Transform the result to include genre name
//     // const transformedResult = planScreenMovie.map(psm => ({
//     //   ...psm.get({ plain: true }),
//     //   movie: psm.movie ? {
//     //     ...psm.movie.get({ plain: true }),
//     //     genreName: psm.movie.genre ? psm.movie.genre.name : null
//     //   } : null
//     // }));

//     const transformedResult = planScreenMovie.map(psm => ({
//       ...psm.get({ plain: true }),
//       movie: psm.movie ? {
//         title: psm.movie.title,
//         description: psm.movie.description,
//         duration: psm.movie.duration,
//         country: psm.movie.country,
//         image: psm.movie.image,
//         genreName: psm.movie.genre ? psm.movie.genre.name : null
//       } : null
//     }));

//     return {
//       errCode: 0,
//       message: "Get movie details successfully",
//       planScreenMovie: transformedResult
//     };
//   } catch (error) {
//     console.error("Error in getMovieDetailsByDate:", error);
//     return {
//       errCode: 3,
//       message: `Error retrieving movie details: ${error}`,
//     };
//   }
// };

export const getMovieDetailsByDate = async (
  dateScreen: string,
  theaterCode: string
) => {
  try {
    const movies = await getMovieByRoom(theaterCode);
    const planScreenMovies = await PlanScreenMovie.findAll({
      where: { dateScreen: dateScreen },
      attributes: ["planScreenMovieCode"],
      include: [
        {
          model: Movie,
          as: "movie",
          attributes: [
            "movieCode",
            "title",
            "description",
            "releaseDate",
            "duration",
            "country",
            "image",
          ],
          include: [
            {
              model: Genres,
              as: "genre",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!planScreenMovies || planScreenMovies.length === 0) {
      return {
        errCode: 1,
        message: "Movie screening not found for the given date",
      };
    }

    const movieDetailsMap: {
      [key: string]: {
        movie: {
          movieCode: string;
          title: string;
          description: string;
          releaseDate: any;
          duration: number;
          country: string;
          image: string;
          genreName: string | null;
        };
        planScreenMovieCodes: string[];
      };
    } = {};

    planScreenMovies.forEach((psm) => {
      const movie = psm.movie;
      if (movie) {
        const key = `${movie.title}-${movie.description}-${movie.duration}-${
          movie.country
        }-${movie.image}-${movie.genre ? movie.genre.name : null}`;

        if (!movieDetailsMap[key]) {
          movieDetailsMap[key] = {
            movie: {
              movieCode: movie.movieCode,
              title: movie.title,
              description: movie.description,
              duration: movie.duration,
              releaseDate: movie.releaseDate,
              country: movie.country,
              image: movie.image,
              genreName: movie.genre ? movie.genre.name : null,
            },
            planScreenMovieCodes: [],
          };
        }

        movieDetailsMap[key].planScreenMovieCodes.push(psm.planScreenMovieCode);
      }
    });

    const transformedResult = Object.values(movieDetailsMap);

    return {
      errCode: 0,
      message: "Get movie details successfully",
      movies: transformedResult,
    };
  } catch (error) {
    console.error("Error in getMovieDetailsByDate:", error);
    return {
      errCode: 3,
      message: `Error retrieving movie details: ${error}`,
    };
  }
};

export const getMovieByRoom = async (theaterCode: string) => {
  try {
    const getRoom = await getRoomInTheater(theaterCode);
    const roomsInTheater = getRoom.rooms;
    let roomCodesInTheater: any = [];

    roomCodesInTheater = roomsInTheater?.map((room) => room.roomCode);

    if (roomCodesInTheater?.length > 0) {
      // Dùng Promise.all để thực hiện nhiều truy vấn cùng lúc cho tất cả các roomCode
      const moviesInRooms = await Promise.all(
        roomCodesInTheater.map(async (roomCode: string) => {
          const planScreenMovies = await PlanScreenMovie.findAll({
            where: { roomCode: roomCode },
            attributes: [],
            include: [
              {
                model: Movie,
                as: "movie",
                attributes: [
                  "movieCode",
                  "title",
                  "description",
                  "releaseDate",
                  "duration",
                  "country",
                  "image",
                ],
              },
            ],
          });
          return planScreenMovies.map(
            (planScreenMovie: any) => planScreenMovie.movie
          );
        })
      );

      // Kết hợp tất cả các kết quả lại thành một mảng duy nhất
      const allMovies = moviesInRooms.flat();

      if (allMovies.length > 0) {
        return {
          errCode: 0,
          message: "Get movies by room success",
          movies: allMovies,
        };
      } else {
        return {
          errCode: 1,
          message: "No movies found in these rooms",
        };
      }
    } else {
      return {
        errCode: 1,
        message: "No rooms found in the theater",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error retrieving movie by room: ${error}`,
    };
  }
};

export const getMonthlyMovieStats = async (
  month: number,
  year: number,
  theaterCode: string
) => {
  try {
    const startDate = new Date(year, month - 1, 1); // Bắt đầu từ ngày đầu tiên của tháng
    const endDate = new Date(year, month, 0); // Ngày cuối cùng của tháng

    const whereConditions: any = {
      dateScreen: {
        [Op.between]: [startDate, endDate],
      },
    };

    if (theaterCode) {
      whereConditions["$room.theaterCode$"] = theaterCode;
    }

    const stats = await PlanScreenMovie.findAll({
      where: whereConditions,
      include: [
        {
          model: Movie,
          as: "movie",
          attributes: ["title"],
        },
        {
          model: Room,
          as: "room",
          attributes: [],
          where: { theaterCode: theaterCode },
        },
      ],
      attributes: [
        [
          Sequelize.fn("COUNT", Sequelize.col("planScreenMovieCode")),
          "screeningCount",
        ],
      ],
      group: ["movie.title"],
    });

    if (!stats || stats.length === 0) {
      return {
        errCode: 1,
        message: "No screening stats found for the given month and theater",
      };
    }

    const transformedResult = stats.map((stat: any) => ({
      movieTitle: stat.movie ? stat.movie.title : "Unknown Movie",
      screeningCount: stat.get("screeningCount"),
    }));

    return {
      errCode: 0,
      message: "Get monthly movie stats successfully",
      stats: transformedResult,
    };
  } catch (error) {
    console.error("Error in getMonthlyMovieStats:", error);
    return {
      errCode: 3,
      message: `Error retrieving movie stats: ${error}`,
    };
  }
};

export const getScreeningSchedule = async (
  theaterCode: string,
  dateScreen: string
) => {
  try {
    const whereConditions: any = { dateScreen };

    const schedule = await PlanScreenMovie.findAll({
      include: [
        {
          model: Room,
          as: "room",
          where: { theaterCode: theaterCode },
          attributes: ["roomCode", "type"],
        },
        {
          model: Movie,
          as: "movie",
          attributes: [
            "movieCode",
            "title",
            "duration",
            "image",
            "country",
            "description",
            "releaseDate",
          ],
        },
      ],
      where: whereConditions,
      attributes: ["planScreenMovieCode", "startTime", "endTime"],
      order: [["startTime", "ASC"]],
    });

    if (schedule.length === 0) {
      return {
        errCode: 1,
        message: "No screenings found for the given theater, date, and movie",
      };
    }

    const groupedSchedule = schedule.reduce((acc: any, screening: any) => {
      const movie = screening.movie;
      if (!acc[movie.movieCode]) {
        acc[movie.movieCode] = {
          movieCode: movie.movieCode,
          movieTitle: movie.title,
          movieDuration: movie.duration,
          movieImage: movie.image,
          movieCountry: movie.country,
          movieDescription: movie.description,
          movieReleaseDate: movie.releaseDate,
          screenings: [],
        };
      }
      acc[movie.movieCode].screenings.push({
        planScreenMovieCode: screening.planScreenMovieCode,
        roomCode: screening.room.roomCode,
        roomType: screening.room.type,
        startTime: screening.startTime,
        endTime: screening.endTime,
      });
      return acc;
    }, {});

    const formattedSchedule = Object.values(groupedSchedule);

    return {
      errCode: 0,
      message: "Get screening schedule successfully",
      schedule: formattedSchedule,
    };
  } catch (error) {
    console.error("Error in getScreeningScheduleByTheaterAndDate:", error);
    return {
      errCode: 3,
      message: `Error retrieving screening schedule: ${error}`,
    };
  }
};
