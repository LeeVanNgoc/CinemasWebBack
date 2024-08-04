import { Request, Response } from 'express';
import { 
  createPlanScreenMovie, 
  deletePlanScreenMovie, 
  editPlanScreenMovie, 
  getAllPlanScreenMovies, 
  getPlanScreenMovieById, 
  createPlanScreenMovieWithMovie, 
  getPlanScreenMovieIdForCreateTicket 
} from '../services/planScreenMovieService';

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
  const planScreenMovieId = Number(req.query.planScreenMovieId);
  if (isNaN(planScreenMovieId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid PlanScreenMovie ID' });
  }
  try {
    const result = await deletePlanScreenMovie(planScreenMovieId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting PlanScreenMovie: ${error}` });
  }
};

const handleEditPlanScreenMovie = async (req: Request, res: Response) => {
  const planScreenMovieId = Number(req.query.planScreenMovieId);
  if (isNaN(planScreenMovieId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid PlanScreenMovie ID' });
  }
  const data = req.query
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
  const planScreenMovieId = Number(req.query.planScreenMovieId);
  if (isNaN(planScreenMovieId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid PlanScreenMovie ID' });
  }
  try {
    const result = await getPlanScreenMovieById(planScreenMovieId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, planScreenMovie: result.planScreenMovie });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting PlanScreenMovie: ${error}` });
  }
}

// const handleCreatePlanScreenWithMovie = async(req: Request, res: Response) => {
//   const data = req.query
//   try {
//     const planScreenWithMovie = await createPlanScreenMovieWithMovie(data);
//     if (planScreenWithMovie.errCode === 0) {
//       res.status(200).json({ 
//         errCode: planScreenWithMovie.errCode, 
//         message: planScreenWithMovie.message ,
//         planScreenMovie: planScreenWithMovie.planScreenMovie
//       });
//     } else {
//       res.status(400).json({ 
//         errCode: planScreenWithMovie.errCode,
//         message: planScreenWithMovie.message
//       });
//     }
//   } catch (error) {
//       res.status(500).json({message: `Error in handle create plan screen movie with movie ${error}`});
//   }
// }

const handleCreatePlanScreenWithMovie = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const planScreenWithMovie = await createPlanScreenMovieWithMovie(data);
    if (planScreenWithMovie.errCode === 0) {
      res.status(200).json({
        errCode: planScreenWithMovie.errCode,
        message: planScreenWithMovie.message,
        planScreenMovies: planScreenWithMovie.planScreenMovies
      });
    } else {
      res.status(400).json({
        errCode: planScreenWithMovie.errCode,
        message: planScreenWithMovie.message
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error in handle create plan screen movie with movie ${error}` });
  }
};


const handleGetPlanScreenMovieIdForCreateTicket = async(req: Request, res: Response) => {
  const data = req.query
  try {
    const planScreenMovieId = await getPlanScreenMovieIdForCreateTicket(data);
    if (planScreenMovieId.errCode === 0) {
      res.status(200).json({
        errCode: planScreenMovieId.errCode,
        message: planScreenMovieId.message,
        planScreenMovieIds: planScreenMovieId.planScreenMovieIds
      });
    } else {
      res.status(400).json({
        errCode: planScreenMovieId.errCode,
        message: planScreenMovieId.message
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error in handle get plan screen movie id for create ticket ${error}` });
  }
 
}

export default {
  handleCreatePlanScreenMovie,
  handleDeletePlanScreenMovie,
  handleEditPlanScreenMovie,
  handleGetAllPlanScreenMovies,
  handleGetPlanScreenMovieById,
  handleCreatePlanScreenWithMovie,
  handleGetPlanScreenMovieIdForCreateTicket,
};
