import { Request, Response } from 'express';
import * as movieService from '../services/movieService';

const handleCreateMovie = async (req: Request, res: Response) => {
  const movieData = req.body;
  try {
    const newMovie = await movieService.createMovie(movieData);
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDeleteMovie = async (req: Request, res: Response) => {
  const movieId = parseInt(req.params.id);
  try {
    await movieService.deleteMovie(movieId);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleEditMovie = async (req: Request, res: Response) => {
  const movieData = req.body;
  try {
    const updatedMovie = await movieService.editMovie(movieData);
    res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json({ movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetMovieById = async (req: Request, res: Response) => {
  const movieId = parseInt(req.params.id);
  try {
    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.status(200).json({ movie });
    }
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  handleCreateMovie,
  handleDeleteMovie,
  handleEditMovie,
  handleGetAllMovies,
  handleGetMovieById,
};
