import { Request, Response } from "express";
import {
  deletePlanScreenMovie,
  editPlanScreenMovie,
  getAllPlanScreenMovies,
  getPlanScreenMovieByCode,
  createPlanScreenMovie,
  getPlanScreenMovieCodeForCreateTicket,
  getStartTime,
  getListPlanScreenInformation,
  getMovieDetailsByDate,
  getMonthlyMovieStats,
  getMovieByRoom,
  getScreeningSchedule
} from "../services/planScreenMovieService";

const handleDeletePlanScreenMovie = async (req: Request, res: Response) => {
  const planScreenMovieCode = req.query.planScreenMovieCode as string;
  if (!planScreenMovieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid PlanScreenMovie Code" });
  }
  try {
    const result = await deletePlanScreenMovie(planScreenMovieCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in deleting PlanScreenMovie: ${error}`,
    });
  }
};

const handleEditPlanScreenMovie = async (req: Request, res: Response) => {
  const planScreenMovieCode = req.query.planScreenMovieCode as string;
  const roomCode = req.query.roomCode as string;
  const movieCode = req.query.movieCode as String;
  const dateScreen = req.query.dateScreen as string;
  const startTime = req.query.startTime as string;
  const endTime = req.query.endTime as string;

  if (!planScreenMovieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid planScreenMovieCode" });
  }
  if (!roomCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing roomCode parameters" });
  }
  if (!movieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing movieCode parameter" });
  }
  if (!dateScreen) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing dateScreen parameter" });
  }
  if (!startTime) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing start times parameter" });
  }

  if (!endTime) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing start times parameter" });
  }

  const data = {
    planScreenMovieCode,
    roomCode,
    movieCode,
    startTime,
    endTime,
    dateScreen,
  };
  try {
    const result = await editPlanScreenMovie(data);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      planScreenMovie: result.planScreenMovie,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in editing PlanScreenMovie: ${error}`,
    });
  }
};

const handleGetAllPlanScreenMovies = async (req: Request, res: Response) => {
  try {
    const result = await getAllPlanScreenMovies();
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      planScreenMovies: result.planScreenMovies,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting PlanScreenMovies: ${error}`,
    });
  }
};

const handleGetPlanScreenMovieByCode = async (req: Request, res: Response) => {
  const planScreenMovieCode = req.query.planScreenMovieCode as string;
  if (!planScreenMovieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid PlanScreenMovie Code" });
  }
  try {
    const result = await getPlanScreenMovieByCode(planScreenMovieCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      planScreenMovie: result.planScreenMovie,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting PlanScreenMovie: ${error}`,
    });
  }
};

const handleCreatePlanScreenMovie = async (req: Request, res: Response) => {
  const roomCode = req.query.roomCode as string;
  const movieCode = req.query.movieCode as string;
  const dateScreen = req.query.dateScreen as string;
  const startTime = req.query.startTime as string;
  const endTime = req.query.endTime as string;
  if (!roomCode) {
    return res
      .status(400)
      .json({ errCode: 2, message: "Missing roomCode parameter" });
  }
  if (!movieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing movieCode parameter" });
  }
  if (!dateScreen) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing dateScreen parameter" });
  }
  if (!startTime) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing end time parameter" });
  }
  if (!endTime) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing start time parameter" });
  }

  try {
    const planScreenWithMovie = await createPlanScreenMovie(
      roomCode,
      movieCode,
      dateScreen,
      startTime,
      endTime
    );
    if (planScreenWithMovie.errCode === 0) {
      res.status(200).json({
        errCode: planScreenWithMovie.errCode,
        message: planScreenWithMovie.message,
        newPlanScreen: planScreenWithMovie.newPlanScreen,
      });
    } else {
      res.status(400).json({
        errCode: planScreenWithMovie.errCode,
        message: planScreenWithMovie.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in handle create plan screen movie ${error}` });
  }
};

const handleGetplanScreenMovieCodeForCreateTicket = async (req: Request, res: Response) => {
  const data = {
    roomCode: req.query.roomCode as string,
    movieCode: req.query.movieCode as string,
    startTime: req.query.startTime as string,
    dateScreen: req.query.dateScreen as string,
    theaterCode: req.query.theaterCode as string,
  };

  try {
    const planScreenMovieCode = await getPlanScreenMovieCodeForCreateTicket(
      data
    );
    if (planScreenMovieCode.errCode === 0) {
      res.status(200).json({
        errCode: planScreenMovieCode.errCode,
        message: planScreenMovieCode.message,
        planScreenMovieCode: planScreenMovieCode.planScreenMovieCodes,
      });
    } else {
      res.status(400).json({
        errCode: planScreenMovieCode.errCode,
        message: planScreenMovieCode.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in handle get plan screen movie code for create ticket ${error}`,
    });
  }
};

const handleGetStartTime = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const startTime = await getStartTime(data);
    if (startTime.errCode === 0) {
      res.status(200).json({
        errCode: startTime.errCode,
        message: startTime.message,
        planScreens: startTime.startTimePlanScreen,
      });
    } else {
      res.status(400).json({
        errCode: startTime.errCode,
        message: startTime.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in handle get start time: ${error}`,
    });
  }
};

const handleGetListPlanScreenInformation = async (
  req: Request,
  res: Response
) => {
  try {
    const planScreenMovies = await getListPlanScreenInformation();
    if (planScreenMovies.errCode === 0) {
      res.status(200).json({
        errCode: planScreenMovies.errCode,
        message: planScreenMovies.message,
        planScreenMovies: planScreenMovies.data,
      });
    } else {
      res.status(400).json({
        errCode: planScreenMovies.errCode,
        message: planScreenMovies.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in handle get list plan screen information: ${error}`,
    });
  }
};

// const handleGetMovieDetailsByDate = async (req: Request, res: Response) => {
//   const dateScreen = req.query.dateScreen as string;

//   if (!dateScreen) {
//     return res.status(400).json({ message: "Invalid dateScreen" });
//   }

//   try {
//     const result = await getMovieDetailsByDate(dateScreen);
//     if (result.errCode === 0) {
//       res.status(200).json({
//         errCode: result.errCode,
//         message: result.message,
//         planScreenMovie: result.planScreenMovie,
//       });
//     } else {
//       res.status(404).json({
//         errCode: result.errCode,
//         message: result.message,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: `Something went wrong in getMovieDetailsByDate: ${error}`,
//     });
//   }
// };

const handleGetMovieDetailsByDate = async (req: Request, res: Response) => {
  const dateScreen = req.query.dateScreen as string;
  const theaterCode = req.query.theaterCode as string;

  if (!dateScreen) {
    return res.status(400).json({ message: "Invalid dateScreen" });
  }

  try {
    const result = await getMovieDetailsByDate(dateScreen, theaterCode);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        movies: result.movies,
      });
    } else {
      res.status(404).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getMovieDetailsByDate: ${error}`,
    });
  }
};

const handleGetMonthlyMovieStats = async (req: Request, res: Response) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ message: "Invalid month or year" });
  }

  try {
    const monthNumber = parseInt(month as string);
    const yearNumber = parseInt(year as string);

    const result = await getMonthlyMovieStats(monthNumber, yearNumber);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        stats: result.stats,
      });
    } else {
      res.status(404).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getMonthlyMovieStats: ${error}`,
    });
  }
};

const handleGetMovieInRoom = async (req: Request, res: Response) => {
  const theaterCode = req.query.theaterCode as string;
  if (!theaterCode) {
    return res.status(400).json({ message: "Invalid theaterCode" });
  }
  try {
    const movies = await getMovieByRoom(theaterCode);
    if (movies.errCode === 0) {
      res.status(200).json({
        errCode: movies.errCode,
        message: movies.message,
        movies: movies.movies,
      });
    } else {
      res.status(404).json({
        errCode: movies.errCode,
        message: movies.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getMovieInRoom: ${error}`,
    });
  }
};

const handleGetScreeningSchedule = async (req: Request, res: Response) => {
  const theaterCode = req.query.theaterCode as string;
  const dateScreen = req.query.dateScreen as string;

  if (!theaterCode) {
    return res.status(400).json({ message: "Missing theaterCode" });
  }
  if (!dateScreen) {
    return res.status(400).json({ message: "Missing dateScreen" });
  }

  try {
    const result = await getScreeningSchedule(theaterCode, dateScreen);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        schedule: result.schedule,
      });
    } else {
      res.status(404).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getScreeningSchedule: ${error}`,
    });
  }
};

export default {
  handleDeletePlanScreenMovie,
  handleEditPlanScreenMovie,
  handleGetAllPlanScreenMovies,
  handleGetPlanScreenMovieByCode,
  handleCreatePlanScreenMovie,
  handleGetplanScreenMovieCodeForCreateTicket,
  handleGetStartTime,
  handleGetListPlanScreenInformation,
  handleGetMovieDetailsByDate,
  handleGetMonthlyMovieStats,
  handleGetMovieInRoom,
  handleGetScreeningSchedule
};
