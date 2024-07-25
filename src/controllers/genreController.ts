import { Request, Response } from 'express';
import { createGenre, deleteGenre, editGenre, getAllGenres, getGenreById } from '../services/genreService';

const handleCreateGenre = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await createGenre(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, genre: result.genre });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating genres: ${error}` });
  }
};

const handleDeleteGenre = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  if (isNaN(genreId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid genre ID' });
  }
  try {
    const result: any = await deleteGenre(genreId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting genres: ${error}` });
  }
};

const handleEditGenre = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result: any = await editGenre(data);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, genre: result.genre });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in editing genres: ${error}` });
  }
};

const handleGetAllGenres = async (req: Request, res: Response) => {
  try {
    const result = await getAllGenres();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, genres: result.genres });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting genres: ${error}` });
  }
};

const handleGetGenreById = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  if (isNaN(genreId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid genre ID' });
  }
  try {
    const result: any = await getGenreById(genreId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, genre: result.genre });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting genres: ${error}` });
  }
};

export default {
  handleCreateGenre,
  handleDeleteGenre,
  handleEditGenre,
  handleGetAllGenres,
  handleGetGenreById
};
