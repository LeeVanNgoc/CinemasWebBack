import { Request, Response } from 'express';
import { createGenre, deleteGenre, getAllGenres, getGenreById } from '../services/genreService';

const handleCreateGenre = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newGenre = await createGenre(name);
    res.status(201).json({ message: 'Genre created successfully', genre: newGenre });
  } catch (error) {
    console.error('Error handling create genre request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json({ genres });
  } catch (error) {
    console.error('Error handling get all genres request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetGenreById = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  try {
    const genre = await getGenreById(genreId);
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found!' });
    }
    res.status(200).json({ genre });
  } catch (error) {
    console.error('Error handling get genre by id request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDeleteGenre = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  try {
    await deleteGenre(genreId);
    res.status(200).json({ message: 'Genre deleted successfully' });
  } catch (error) {
    console.error('Error handling delete genre request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  handleCreateGenre,
  handleGetAllGenres,
  handleGetGenreById,
  handleDeleteGenre,
};
