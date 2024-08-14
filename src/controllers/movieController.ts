import { Request, Response } from "express";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getMovieByCode,
  getMovieByTitle,
} from "../services/movieService";

const handleCreateMovie = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  const description = req.query.description as string;
  const duration = req.query.duration as string;
  const country = req.query.country as string;
  const genreCode = req.query.genreCode as string;
  const releaseDate = req.query.releaseDate as string;
  const image = req.query.image as string;

  if (!title) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing title parameter" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing description parameter" });
  }
  if (!releaseDate) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing releaseDate parameter" });
  }
  if (!duration) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing duration parameter" });
  }
  if (!country) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing country parameter" });
  }
  if (!genreCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing genreCode parameter" });
  }
  if (!image) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing image parameter" });
  }

  try {
    const result = await createMovie({
      title,
      description,
      releaseDate,
      duration,
      country,
      genreCode,
      image,
    });
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({
      errCode: result.errCode,
      message: result.message,
      movie: result.movie,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in creating movies: ${error}`,
    });
  }
};

const handleDeleteMovie = async (req: Request, res: Response) => {
  const movieCode = req.query.movieCode as string;
  if (!movieCode) {
    return res.status(400).json({ errCode: 2, error: "Invalid movie ID" });
  }
  try {
    const result = await deleteMovie(movieCode);
    if (result.errCode !== 0) {
      return res
        .status(401)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in deleting movies: ${error}`,
    });
  }
};

const handleEditMovie = async (req: Request, res: Response) => {
  const movieCode = req.query.movieCode as string;
  const title = req.query.title as string;
  const description = req.query.description as string;
  const duration = req.query.duration as string;
  const country = req.query.country as string;
  const genreCode = req.query.genreCode as string;
  const releaseDate = req.query.releaseDate as string;
  const image = req.query.image as string;

  if (!movieCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing movieCode parameter" });
  }
  if (!title) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing title parameter" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing description parameter" });
  }
  if (!releaseDate) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing releaseDate parameter" });
  }
  if (!duration) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing duration parameter" });
  }
  if (!country) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing country parameter" });
  }
  if (!genreCode) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing genreCode parameter" });
  }
  if (!image) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing image parameter" });
  }

  try {
    const result = await editMovie({
      movieCode,
      title,
      description,
      releaseDate,
      duration,
      country,
      genreCode,
      image,
    });
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      movie: result.movie,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in editing movies: ${error}`,
    });
  }
};

const handleGetAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await getAllMovies();
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      movies: result.movies,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting movies: ${error}`,
    });
  }
};

const handleGetMovieByCode = async (req: Request, res: Response) => {
  const movieCode = req.query.movieCode as string;
  if (!movieCode) {
    return res.status(400).json({
      errCode: 2,
      error: `Invalid movie Code, movieCode is ${movieCode}`,
    });
  }
  try {
    const result = await getMovieByCode(movieCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      movie: result.movie,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting movie: ${error}`,
    });
  }
};

const handleGetMovieByTitle = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  if (title) {
    return res.status(400).json({ errCode: 2, error: "Invalid movie ID" });
  }
  try {
    const result = await getMovieByTitle(title);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      movie: result.movie,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting movie: ${error}`,
    });
  }
};

export default {
  handleCreateMovie,
  handleDeleteMovie,
  handleEditMovie,
  handleGetAllMovies,
  handleGetMovieByCode,
  handleGetMovieByTitle,
};
