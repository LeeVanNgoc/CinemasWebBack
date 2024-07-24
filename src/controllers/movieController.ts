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
  const movieId = parseInt(req.params.id);
  try {
    const result: any = await deleteMovie(movieId);
    if (result.errorCode) {
      return res.status(404).json({ error: result.errorMessage });
    }
    res.status(200).json({ message: result.errorMessage });
  } catch (error) {
		res.status(500).json({ error: `Something went wrong in deletting movies: ${error}` });
  }
};

const handleEditMovie = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result: any = await editMovie(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, movie: result.movie });
  } catch (error) {
		res.status(500).json({ error: `Something went wrong in editting movies: ${error}` });
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
  const movieId = parseInt(req.params.id);
  try {
    const data = await getMovieById(movieId);
    res.status(200).json({ data });
  } catch (error) {
		res.status(500).json({ error: `Something went wrong in getting movies: ${error}` });
  }
};

export default {
  handleCreateMovie,
  handleDeleteMovie,
  handleEditMovie,
  handleGetAllMovies,
  handleGetMovieById
};
