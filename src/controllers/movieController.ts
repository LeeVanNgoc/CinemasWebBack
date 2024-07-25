import { Request, Response } from 'express';
import { createMovie, deleteMovie, editMovie, getAllMovies, getMovieById } from '../services/movieService';

const handleCreateMovie = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newMovie = await createMovie(data);
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
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
    const result: any = await deleteMovie(movieId);
    if (result.errorCode) {
      return res.status(404).json({ error: result.errorMessage });
    }
    res.status(200).json({ message: result.errorMessage });
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
    const result: any = await editMovie(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, movie: result.movie });
  } catch (error) {
    res.status(500).json({ error: `Something went wrong in editing movies: ${error}` });
  }
};

const handleGetAllMovies = async (req: Request, res: Response) => {
  try {
    const data = await getAllMovies();
    res.status(200).json({ data });
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
    const movie = await getMovieById(movieId);
    res.status(200).json({ data: movie });
  } catch (error) {
    if (error instanceof Error && error.message === 'Movie not found') {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.status(500).json({ error: `Something went wrong in getting movie: ${error}` });
    }
  }
};

export default {
  handleCreateMovie,
  handleDeleteMovie,
  handleEditMovie,
  handleGetAllMovies,
  handleGetMovieById
};