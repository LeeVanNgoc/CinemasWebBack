import { Request, Response } from "express";
import {
  createNews,
  deleteNews,
  editNews,
  getAllNews,
  getNewsById,
} from "../services/newsService";

const handleCreateNews = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result = await createNews(data);
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({
      errCode: result.errCode,
      message: result.message,
      news: result.news,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in creating news: ${error}`,
    });
  }
};

const handleDeleteNews = async (req: Request, res: Response) => {
  const postId = parseInt(req.query.postId as string);
  if (isNaN(postId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid news ID" });
  }
  try {
    const result = await deleteNews(postId);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in deleting news: ${error}`,
    });
  }
};

const handleEditNews = async (req: Request, res: Response) => {
  const data = req.query;
  const postId = Number(data.postId);
  if (isNaN(postId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid news ID" });
  }
  try {
    const result = await editNews(data);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      news: result.news,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in editing news: ${error}`,
    });
  }
};

const handleGetAllNews = async (req: Request, res: Response) => {
  try {
    const result = await getAllNews();
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      news: result.news,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting news: ${error}`,
    });
  }
};

const handleGetNewsById = async (req: Request, res: Response) => {
  const postId = Number(req.query.postId);
  if (isNaN(postId)) {
    return res.status(400).json({ errCode: 2, error: "Invalid news ID" });
  }
  try {
    const result = await getNewsById(postId);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      news: result.news,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting news: ${error}`,
    });
  }
};

export default {
  handleCreateNews,
  handleDeleteNews,
  handleEditNews,
  handleGetAllNews,
  handleGetNewsById,
};
