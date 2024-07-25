import { Request, Response } from 'express';
import { createMovie, deleteMovie, editMovie, getAllMovies, getMovieById } from '../services/movieService';

const handleCreateMovie = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await createMovie(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ error: result.message });
    }
    res.status(201).json({ message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong in creating movies: ${error}` });
  }
};

const handleDeleteMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieid);
  if (isNaN(movieId)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }
  try {
    const result = await deleteMovie(movieId);
    if (result.errCode !== 0) {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong in deleting movies: ${error}` });
  }
};

const handleEditMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieid);
  if (isNaN(movieId)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }
  const data = { ...req.body, movieid: movieId };
  try {
    const result = await editMovie(data);
    if (result.errCode !== 0) {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json({ message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong in editing movies: ${error}` });
  }
};

const handleGetAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await getAllMovies();
    if (result.errCode !== 0) {
      return res.status(400).json({ error: result.message });
    }
    res.status(200).json({ message: result.message, movies: result.movies });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong in getting movies: ${error}` });
  }
};

const handleGetMovieById = async (req: Request, res: Response) => {
  const movieId = Number(req.params.movieid);
  if (isNaN(movieId)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }
  try {
    const result = await getMovieById(movieId);
    if (result.errCode !== 0) {
      return res.status(404).json({ error: result.message });
    }
    res.status(200).json({ message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong in getting movie: ${error}` });
  }
};

export default {
  handleCreateMovie,
  handleDeleteMovie,
  handleEditMovie,
  handleGetAllMovies,
  handleGetMovieById
};
