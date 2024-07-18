import { Request, Response } from 'express';
import { createGenre, deleteGenre, editGenre, getAllGenres, getGenreById } from '../services/genreService';

const handleCreateGenre = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newGenre = await createGenre(data);
    res.status(201).json({ message: 'Genre created successfully', genre: newGenre });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong in creating genre' });
  }
};

const handleDeleteGenre = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  try {
    const result: any = await deleteGenre(genreId);
    if (result.errorCode) {
      return res.status(404).json({ error: result.errorMessage });
    }
    res.status(200).json({ message: result.errorMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleEditGenre = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result: any = await editGenre(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, genre: result.genre });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetAllGenres = async (req: Request, res: Response) => {
  try {
    const data = await getAllGenres();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetGenreById = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  try {
    const data = await getGenreById(genreId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  handleCreateGenre,
  handleDeleteGenre,
  handleEditGenre,
  handleGetAllGenres,
  handleGetGenreById
};
