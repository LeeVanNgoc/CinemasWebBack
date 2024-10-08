import { Request, Response } from 'express';
import { createGenre, deleteGenre, editGenre, getAllGenres, getGenreByCode } from '../services/genreService';

const handleCreateGenre = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const description = req.query.description as string;

  if (!name) {
    return res.status(400).json({ errCode: 2, message: 'Missing name parameter' });
  }
  if (!description) {
    return res.status(400).json({ errCode: 2, message: 'Missing name or description' });
  }
  try {
    const result = await createGenre({ name, description });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ errCode: 3, message: `Something went wrong in creating genres: ${error}` });
  }
};

const handleDeleteGenre = async (req: Request, res: Response) => {
  const genreCode = req.query.genreCode as string;
  if (!(genreCode)) {
    return res.status(400).json({ errCode: 2, message: 'Invalid genreCode' });
  }
  try {
    const result = await deleteGenre(genreCode);
    if (result.errCode) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errCode: 3, message: `Something went wrong in deleting genres: ${error}` });
  }
};

const handleEditGenre = async (req: Request, res: Response) => {
  const genreCode = req.query.genreCode as string;
  const name = req.query.name as string;
  const description = req.query.description as string;
  if (!(genreCode)) {
    return res.status(400).json({ errCode: 2, message: 'Missing genreCode parameter' });
  }
  if (!name) {
    return res.status(400).json({ errCode: 2, message: 'Missing name parameter' });
  }
  if (!description) {
    return res.status(400).json({ errCode: 2, message: 'Missing name or description' });
  }
  try {
    const result = await editGenre({ genreCode, name, description });
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, message: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, genre: result.genre });
  } catch (error) {
    res.status(500).json({ errCode: 3, message: `Something went wrong in editing genre: ${error}` });
  }
};

const handleGetAllGenres = async (req: Request, res: Response) => {
  try {
    const result = await getAllGenres();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errCode: 3, message: `Something went wrong in getting genres: ${error}` });
  }
};

const handleGetGenreByCode = async (req: Request, res: Response) => {
  const genreCode = req.query.genreCode as string;
  if (!(genreCode)) {
    return res.status(400).json({ errCode: 2, message: 'Invalid genreCode' });
  }
  try {
    const result = await getGenreByCode(genreCode);
    if (result.errCode) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errCode: 3, message: `Something went wrong in getting genres: ${error}` });
  }
};

export default {
  handleCreateGenre,
  handleDeleteGenre,
  handleEditGenre,
  handleGetAllGenres,
  handleGetGenreByCode,
};
