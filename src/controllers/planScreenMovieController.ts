import { Request, Response } from 'express';
import { createPlanScreenMovie, deletePlanScreenMovie, editPlanScreenMovie, getAllPlanScreenMovies, getPlanScreenMovieById } from '../services/PlanScreenMovieService';

const handleCreatePlanScreenMovie = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await createPlanScreenMovie(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, planScreenMovie: result.planScreenMovie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating PlanScreenMovie: ${error}` });
  }
};

const handleDeletePlanScreenMovie = async (req: Request, res: Response) => {
  const psmId = Number(req.params.psmId);
  if (isNaN(psmId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid PlanScreenMovie ID' });
  }
  try {
    const result = await deletePlanScreenMovie(psmId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting PlanScreenMovie: ${error}` });
  }
};

const handleEditPlanScreenMovie = async (req: Request, res: Response) => {
  const psmId = Number(req.params.psmId);
  if (isNaN(psmId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid PlanScreenMovie ID' });
  }
  const data = { ...req.body, psmId: psmId };
  try {
    const result = await editPlanScreenMovie(data);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, planScreenMovie: result.planScreenMovie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in editing PlanScreenMovie: ${error}` });
  }
};

const handleGetAllPlanScreenMovies = async (req: Request, res: Response) => {
  try {
    const result = await getAllPlanScreenMovies();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, planScreenMovies: result.planScreenMovies });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting PlanScreenMovies: ${error}` });
  }
};

const handleGetPlanScreenMovieById = async (req: Request, res: Response) => {
  const psmId = Number(req.params.psmId);
  if (isNaN(psmId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid PlanScreenMovie ID' });
  }
  try {
    const result = await getPlanScreenMovieById(psmId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, planScreenMovie: result.planScreenMovie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting PlanScreenMovie: ${error}` });
  }
};

export default {
  handleCreatePlanScreenMovie,
  handleDeletePlanScreenMovie,
  handleEditPlanScreenMovie,
  handleGetAllPlanScreenMovies,
  handleGetPlanScreenMovieById
};
