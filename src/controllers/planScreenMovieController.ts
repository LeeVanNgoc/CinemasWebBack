import { Request, Response } from "express";
import {
  deletePlanScreenMovie,
  editPlanScreenMovie,
  getAllPlanScreenMovies,
  getPlanScreenMovieByCode,
  createPlanScreenMovie,
  getPlanScreenMovieCodeForCreateTicket,
  getStartTime,
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
  const roomId = req.query.roomId ? Number(req.query.roomId) : undefined;
  const movieId = req.query.movieId ? Number(req.query.movieId) : undefined;
  const dateScreen = req.query.dateScreen as string;
  const times = req.query.times as string;

  if (!planScreenMovieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid PlanScreenMovie Code" });
  }
  if (!roomId) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing roomId parameters" });
  }
  if (!movieId) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing movieId parameter" });
  }
  if (!dateScreen) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing dateScreen parameter" });
  }
  if (times.length === 0) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing times parameter" });
  }

  let startTime, endTime;
  if (times) {
    [startTime, endTime] = times.split("-");
  }

  const data = {
    planScreenMovieCode,
    roomId,
    movieId,
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
  const roomCode = String(req.query.roomCode);
  const movieCode = String(req.query.movieCode);
  const dateScreen = req.query.dateScreen as string;
  const times = (req.query.times as string).split(",");

  if (!roomCode || !movieCode || !dateScreen || times.length === 0) {
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
  if (times.length === 0) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing times parameter" });
  }

  try {
    const planScreenWithMovie = await createPlanScreenMovie(
      roomCode,
      movieCode,
      dateScreen,
      times
    );
    if (planScreenWithMovie.errCode === 0) {
      res.status(200).json({
        errCode: planScreenWithMovie.errCode,
        message: planScreenWithMovie.message,
        planScreenMovies: planScreenWithMovie.planScreenMovies,
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

const handleGetplanScreenMovieCodeForCreateTicket = async (
  req: Request,
  res: Response
) => {
  const data = {
    roomCode: req.query.roomCode as string,
    movieCode: req.query.movieId as string,
    startTime: req.query.startTime as string,
    dateScreen: req.query.dateScreen as string,
  };

  try {
    const planScreenMovieId = await getPlanScreenMovieCodeForCreateTicket(data);
    if (planScreenMovieId.errCode === 0) {
      res.status(200).json({
        errCode: planScreenMovieId.errCode,
        message: planScreenMovieId.message,
        planScreenMovieId: planScreenMovieId.planScreenMovieCodes,
      });
    } else {
      res.status(400).json({
        errCode: planScreenMovieId.errCode,
        message: planScreenMovieId.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error in handle get plan screen movie id for create ticket ${error}`,
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

export default {
  handleDeletePlanScreenMovie,
  handleEditPlanScreenMovie,
  handleGetAllPlanScreenMovies,
  handleGetPlanScreenMovieByCode,
  handleCreatePlanScreenMovie,
  handleGetplanScreenMovieCodeForCreateTicket,
  handleGetStartTime,
};
