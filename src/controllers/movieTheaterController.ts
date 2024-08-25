import { Request, Response } from "express";
import {
  createNewMovieTheater,
  deleteMovieTheater,
  getAllMovieTheater,
  getMovieFromThearter,
} from "../services/movieTheaterService";

const handleCreateNewMovieTheater = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result = await createNewMovieTheater(data);
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({
      errCode: result.errCode,
      message: result.message,
      movieTheater: result.movieTheater,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in creating movie genre: ${error}`,
    });
  }
};

const handleDeleteMovieTheater = async (req: Request, res: Response) => {
  const movieTheaterCode = String(req.query.movieTheaterCode);
  if (!movieTheaterCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid movie genre ID" });
  }
  try {
    const result = await deleteMovieTheater(movieTheaterCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in deleting movie genre: ${error}`,
    });
  }
};

const handleGetAllMovieTheater = async (req: Request, res: Response) => {
  try {
    const result = await getAllMovieTheater();
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      movieTheater: result.movieTheater,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting movie genres: ${error}`,
    });
  }
};

const handleGetMovieFromTheater = async (req: Request, res: Response) => {
  const theaterCode = String(req.query.theaterCode);
  if (!theaterCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Invalid movie genre ID" });
  }
  try {
    const result = await getMovieFromThearter(theaterCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      allMovieTheaters: result.allMovieTheaters,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting movie genre: ${error}`,
    });
  }
};

export default {
  handleCreateNewMovieTheater,
  handleDeleteMovieTheater,
  handleGetAllMovieTheater,
  handleGetMovieFromTheater,
};
