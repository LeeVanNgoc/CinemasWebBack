import e, { Request, Response } from "express";
import { createTrailer, getAllTrailer, getTrailerById, deleteTrailer, updateTrailer, getTrailerByMovieId } from "../services/trailerService";

const handleCreateTrailer = async (req: Request, res: Response) => {
    const data = req.query;
    try {
        const result = await createTrailer(data);
        if (result.errCode === 0) {
            res.status(201).json({
                errCode: result.errCode,
                message: result.message,
                newTrailer: result.newTrailer
            });
        } else {
            res.status(400).json({
                errCode: result.errCode,
                message: result.message
            });
        }
    } catch (error) {
        res.status(500).json('Something was wrong when creating trailer');
    }
}

const handleGetTrailerById = async (req: Request, res: Response) => {
    const trailerId = Number(req.query.trailerId);
    try {
        const result = await getTrailerById(trailerId);
        if (result.errCode === 0) {
            res.status(200).json({ error: result.errCode, message: result.message, trailer: result.trailer });
        } else {
            res.status(404).json({ error: result.errCode, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: `Something went wrong in getting trailer by id: ${error}` });
    }
}

const handleGetTrailerByMovieId = async (req: Request, res: Response) => {
    const movieId = Number(req.query.movieId);
    try {
        console.log(movieId);
        const result = await getTrailerByMovieId(movieId);
        if (result.errCode === 0) {
            res.status(200).json({ error: result.errCode, message: result.message, trailer: result.trailer });
        } else {
            res.status(404).json({ error: result.errCode, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: `Something went wrong in getting trailer by movie id: ${error}` });
    }
}

const handleGetAllTrailers = async (req: Request, res: Response) => {
    try {
        const result = await getAllTrailer();
        console.log(result);
        if (result.errCode === 0) {
            res.status(200).json({ error: result.errCode, message: result.message, trailers: result.trailers });
        } else {
            res.status(404).json({ error: result.errCode, message: result.message, trailers: result.trailers });
        }
    } catch (error) {
        res.status(500).json({
            error: `Something went wrong in getting all trailers: ${error}`
        });
    }
}

const handleDeleteTrailer = async (req: Request, res: Response) => {
    const trailerId = Number(req.query.trailerId);
    if (isNaN(trailerId)) {
        return res.status(400).json({ message: 'Invalid trailer ID' });
    }
    try {
        const result = await deleteTrailer(trailerId);
        if (result.errCode === 0) {
            res.status(200).json({ error: result.errCode, message: result.message });
        } else {
            res.status(404).json({ error: result.errCode, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: `Something went wrong in deleting trailer by id: ${error}` });
    }
}

const handleUpdateTrailer = async (req: Request, res: Response) => {
    const data = req.query;
    const trailerId = Number(data.trailerId);
    if (isNaN(trailerId)) {
        return res.status(400).json({ message: 'Invalid trailer ID' });
    }
    try {
        const result = await updateTrailer(data);
        if (result.errCode === 0) {
            res.status(200).json({ error: result.errCode, message: result.message });
        } else {
            res.status(404).json({ error: result.errCode, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: `Something went wrong in updating trailer by id: ${error}` });
    }
}
export default {
    handleCreateTrailer,
    handleGetTrailerById,
    handleGetAllTrailers,
    handleDeleteTrailer,
    handleUpdateTrailer,
    handleGetTrailerByMovieId,
}