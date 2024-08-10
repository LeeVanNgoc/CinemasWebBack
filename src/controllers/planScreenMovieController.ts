import { Request, Response } from "express";
import {
  deletePlanScreenMovie,
  editPlanScreenMovie,
  getAllPlanScreenMovies,
  getPlanScreenMovieById,
  createPlanScreenMovie,
  getPlanScreenMovieIdForCreateTicket,
  getStartTime,
} from "../services/planScreenMovieService";

const handleDeletePlanScreenMovie = async (req: Request, res: Response) => {
  const planScreenMovieId = Number(req.query.planScreenMovieId);
  if (isNaN(planScreenMovieId)) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid PlanScreenMovie ID" });
  }
  try {
    const result = await deletePlanScreenMovie(planScreenMovieId);
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
  const planScreenMovieId = Number(req.query.planScreenMovieId);
  const roomId = req.query.roomId ? Number(req.query.roomId) : undefined;
  const movieId = req.query.movieId ? Number(req.query.movieId) : undefined;
  const dateScreen = req.query.dateScreen as string;
  const times = req.query.times as string;

  if (isNaN(planScreenMovieId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid PlanScreenMovie ID" });
  }
  if (!roomId) {
    return res.status(400).json({ errCode: 2, error: 'Missing roomId parameters' });
  }
  if (!movieId) {
    return res.status(400).json({ errCode: 2, error: 'Missing movieId parameter' });
  }
  if (!dateScreen) {
    return res.status(400).json({ errCode: 2, error: 'Missing dateScreen parameter' });
  }
  if (times.length === 0) {
    return res.status(400).json({ errCode: 2, error: 'Missing times parameter' });
  }

  let startTime, endTime;
  if (times) {
    [startTime, endTime] = times.split("-");
  }

  const data = {
    planScreenMovieId,
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

const handleGetPlanScreenMovieById = async (req: Request, res: Response) => {
  const planScreenMovieId = Number(req.query.planScreenMovieId);
  if (isNaN(planScreenMovieId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid PlanScreenMovie ID" });
  }
  try {
    const result = await getPlanScreenMovieById(planScreenMovieId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
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
  const roomId = Number(req.query.roomId);
  const movieId = Number(req.query.movieId);
  const dateScreen = req.query.dateScreen as string;
  const times = (req.query.times as string).split(",");

  if (!roomId || !movieId || !dateScreen || times.length === 0) {
    return res.status(400).json({ errCode: 2, message: "Missing roomId parameter" });
  }
  if (!movieId) {
    return res.status(400).json({ errCode: 2, error: 'Missing movieId parameter' });
  }
  if (!dateScreen) {
    return res.status(400).json({ errCode: 2, error: 'Missing dateScreen parameter' });
  }
  if (times.length === 0) {
    return res.status(400).json({ errCode: 2, error: 'Missing times parameter' });
  }

  try {
    const planScreenWithMovie = await createPlanScreenMovie(
      roomId,
      movieId,
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

const handleGetplanScreenMovieIdForCreateTicket = async (
  req: Request,
  res: Response
) => {
  const data = {
    roomId: Number(req.query.roomId),
    movieId: Number(req.query.movieId),
    startTime: req.query.startTime as string,
    dateScreen: req.query.dateScreen as string,
  };

  try {
    const planScreenMovieId = await getPlanScreenMovieIdForCreateTicket(data);
    if (planScreenMovieId.errCode === 0) {
      res.status(200).json({
        errCode: planScreenMovieId.errCode,
        message: planScreenMovieId.message,
        planScreenMovieId: planScreenMovieId.planScreenMovieIds,
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
  handleGetPlanScreenMovieById,
  handleCreatePlanScreenMovie,
  handleGetplanScreenMovieIdForCreateTicket,
  handleGetStartTime,
};
