import e, { Request, Response } from "express";
import {
  createTrailer,
  getAllTrailer,
  getTrailerByCode,
  deleteTrailer,
  updateTrailer,
  getTrailerByMovieCode,
} from "../services/trailerService";

const handleCreateTrailer = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result = await createTrailer(data);
    if (result.errCode === 0) {
      res.status(201).json({
        errCode: result.errCode,
        message: result.message,
        newTrailer: result.newTrailer,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json("Something was wrong when creating trailer");
  }
};

const handleGetTrailerByCode = async (req: Request, res: Response) => {
  const trailerCode = req.query.trailerCode as string;
  try {
    const result = await getTrailerByCode(trailerCode);
    if (result.errCode === 0) {
      res.status(200).json({
        error: result.errCode,
        message: result.message,
        trailer: result.trailer,
      });
    } else {
      res.status(404).json({ error: result.errCode, message: result.message });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getting trailer by id: ${error}`,
    });
  }
};

const handleGetTrailerByMovieCode = async (req: Request, res: Response) => {
  const movieCode = req.query.movieCode as string;
  try {
    console.log(movieCode);
    const result = await getTrailerByMovieCode(movieCode);
    if (result.errCode === 0) {
      res.status(200).json({
        error: result.errCode,
        message: result.message,
        trailer: result.trailer,
      });
    } else {
      res.status(404).json({ error: result.errCode, message: result.message });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getting trailer by movie id: ${error}`,
    });
  }
};

const handleGetAllTrailers = async (req: Request, res: Response) => {
  try {
    const result = await getAllTrailer();
    console.log(result);
    if (result.errCode === 0) {
      res.status(200).json({
        error: result.errCode,
        message: result.message,
        trailers: result.trailers,
      });
    } else {
      res.status(404).json({
        error: result.errCode,
        message: result.message,
        trailers: result.trailers,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getting all trailers: ${error}`,
    });
  }
};

const handleDeleteTrailer = async (req: Request, res: Response) => {
  const trailerCode = req.query.trailerCode as string;
  if (!trailerCode) {
    return res.status(400).json({ message: "Invalid trailer ID" });
  }
  try {
    const result = await deleteTrailer(trailerCode);
    if (result.errCode === 0) {
      res.status(200).json({ error: result.errCode, message: result.message });
    } else {
      res.status(404).json({ error: result.errCode, message: result.message });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in deleting trailer by id: ${error}`,
    });
  }
};

const handleUpdateTrailer = async (req: Request, res: Response) => {
  const data = req.query;
  const trailerCode = data.trailerCode;
  if (!trailerCode) {
    return res.status(400).json({ message: "Invalid trailer ID" });
  }
  try {
    const result = await updateTrailer(data);
    if (result.errCode === 0) {
      res.status(200).json({ error: result.errCode, message: result.message });
    } else {
      res.status(404).json({ error: result.errCode, message: result.message });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in updating trailer by id: ${error}`,
    });
  }
};
export default {
  handleCreateTrailer,
  handleGetTrailerByCode,
  handleGetAllTrailers,
  handleDeleteTrailer,
  handleUpdateTrailer,
  handleGetTrailerByMovieCode,
};
