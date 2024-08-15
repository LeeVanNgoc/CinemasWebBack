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
  const times = req.query.times as string;

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
    movieCode: req.query.movieCode as string,
    startTime: req.query.startTime as string,
    dateScreen: req.query.dateScreen as string,
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

export default {
  handleDeletePlanScreenMovie,
  handleEditPlanScreenMovie,
  handleGetAllPlanScreenMovies,
  handleGetPlanScreenMovieByCode,
  handleCreatePlanScreenMovie,
  handleGetplanScreenMovieCodeForCreateTicket,
  handleGetStartTime,
  handleGetListPlanScreenInformation,
};
