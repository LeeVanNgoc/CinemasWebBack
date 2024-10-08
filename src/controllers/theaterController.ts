import { Request, Response } from "express";
import {
  createTheater,
  getAllTheaters,
  getTheaterByCode,
  deleteTheater,
  updateTheater,
  getTheatersByCity,
  getUserByTheaterCity,
} from "../services/theaterService";

const handleCreateTheater = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const newTheater = await createTheater(data);
    if (newTheater.errCode === 0) {
      res.status(200).json({
        theater: newTheater.newTheater,
        errCode: newTheater.errCode,
        message: newTheater.message,
      });
    } else {
      res.status(400).json({
        errCode: newTheater.errCode,
        message: newTheater.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in creating theater ${error}` });
  }
};

const handleGetAllTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await getAllTheaters();
    if (theaters.errCode === 0) {
      res.status(200).json({
        errCode: theaters.errCode,
        message: theaters.message,
        theaters: theaters.theaters,
      });
    } else {
      res.status(400).json({
        errCode: theaters.errCode,
        message: theaters.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in getting all theaters ${error}` });
  }
};

const handleDeleteTheater = async (req: Request, res: Response) => {
  const theaterCode = req.query.theaterCode as string;
  try {
    const result = await deleteTheater(theaterCode);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in delete theater ${error}` });
  }
};

const handleGetTheaterByCode = async (req: Request, res: Response) => {
  const theaterCode = req.query.theaterCode as string;
  if (!theaterCode) {
    return res
      .status(400)
      .json({ errCode: 2, message: "Invalid theater code" });
  }
  try {
    const result = await getTheaterByCode(theaterCode);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        theater: result.theater,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getting theater by id ${error}`,
    });
  }
};

const handleGetTheaterByCity = async (req: Request, res: Response) => {
  const city = String(req.query.city);
  console.log(city);

  try {
    const result = await getTheatersByCity(city);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        theaters: result.theaters,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getting theater by city ${error}`,
    });
  }
};

const handleUpdateTheater = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result = await updateTheater(data);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something went wrong in update theater ${error}` });
  }
};

const handleGetUserInTheater = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  try {
    const result = await getUserByTheaterCity(name);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        users: result.users,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong in getting user in theater ${error}`,
    });
  }
};

export default {
  handleCreateTheater,
  handleGetAllTheaters,
  handleDeleteTheater,
  handleGetTheaterByCode,
  handleUpdateTheater,
  handleGetTheaterByCity,
  handleGetUserInTheater,
};
