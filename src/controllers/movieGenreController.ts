import { Request, Response } from 'express';
import {
  createMovieGenre,
  deleteMovieGenre,
  getAllMovieGenres,
  getMovieGenreById,
} from '../services/movieGenreService';

const handleCreateMovieGenre = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await createMovieGenre(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, movieGenre: result.movieGenre });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating movie genre: ${error}` });
  }
};

const handleDeleteMovieGenre = async (req: Request, res: Response) => {
  const movieGenreId = Number(req.params.movieGenreId);
  if (isNaN(movieGenreId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid movie genre ID' });
  }
  try {
    const result = await deleteMovieGenre(movieGenreId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting movie genre: ${error}` });
  }
};

const handleGetAllMovieGenres = async (req: Request, res: Response) => {
  try {
    const result = await getAllMovieGenres();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, movieGenres: result.movieGenres });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting movie genres: ${error}` });
  }
};

const handleGetMovieGenreById = async (req: Request, res: Response) => {
  const movieGenreId = Number(req.params.movieGenreId);
  if (isNaN(movieGenreId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid movie genre ID' });
  }
  try {
    const result = await getMovieGenreById(movieGenreId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, movieGenre: result.movieGenre });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting movie genre: ${error}` });
  }
};

export default {
  handleCreateMovieGenre,
  handleDeleteMovieGenre,
  handleGetAllMovieGenres,
  handleGetMovieGenreById,
};
