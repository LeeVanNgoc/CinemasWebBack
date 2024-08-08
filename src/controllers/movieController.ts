import { Request, Response } from 'express';
import { createMovie, deleteMovie, editMovie, getAllMovies, getMovieById } from '../services/movieService';

const handleCreateMovie = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  const description = req.query.description as string;
  const duration = req.query.duration as string;
  const country = req.query.country as string;
  const genreId = Number(req.query.genreId);
  const releaseDate = req.query.releaseDate as string;
  const image = req.query.image as string;
  if (!title || !description || !releaseDate || !duration || !country || !genreId || !image) {
    return res.status(400).json({ errCode: 2, error: 'Missing required parameters' });
  }

  try {
    const result = await createMovie({ title, description, releaseDate, duration, country, genreId, image });
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating movies: ${error}` });
  }
};

const handleDeleteMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.query.movieId);
  if (isNaN(movieId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid movie ID' });
  }
  try {
    const result = await deleteMovie(movieId);
    if (result.errCode !== 0) {
      return res.status(401).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting movies: ${error}` });
  }
};

const handleEditMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.query.movieId);
  const title = req.query.title as string;
  const description = req.query.description as string;
  const duration = req.query.duration as string;
  const country = req.query.country as string;
  const genreId = Number(req.query.genreId);
  const releaseDate = req.query.releaseDate as string;
  const image = req.query.image as string;

  if (isNaN(movieId) || !title || !description || !releaseDate || !duration || !country || !genreId || !image) {
    return res.status(400).json({ errCode: 2, error: 'Invalid movie ID or missing parameters' });
  }

  try {
    const result = await editMovie({ movieId, title, description, releaseDate, duration, country, genreId, image });
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in editing movies: ${error}` });
  }
};

const handleGetAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await getAllMovies();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, movies: result.movies });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting movies: ${error}` });
  }
};

const handleGetMovieById = async (req: Request, res: Response) => {
  const movieId = Number(req.query.movieId);
  if (isNaN(movieId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid movie ID' });
  }
  try {
    const result = await getMovieById(movieId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting movie: ${error}` });
  }
};

export default {
  handleCreateMovie,
  handleDeleteMovie,
  handleEditMovie,
  handleGetAllMovies,
  handleGetMovieById
};
