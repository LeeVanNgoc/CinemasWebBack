import { Request, Response } from "express";
import {
  createNews,
  deleteNews,
  editNews,
  getAllNews,
  getNewsById,
} from "../services/newsService";

const handleCreateNews = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  const content = req.query.content as string;
  const image = req.query.image as string;
  const link = req.query.link as string;

  if (!title || !content || !image || !link) {
    return res.status(400).json({ errCode: 2, error: 'Missing required parameters' });
  }
  
  try {
    const result = await createNews({ title, content, image, link });
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, news: result.news });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating news: ${error}` });
  }
};

const handleDeleteNews = async (req: Request, res: Response) => {
  const newsId = parseInt(req.query.newsId as string);
  if (isNaN(newsId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid news ID' });
  }
  try {
    const result = await deleteNews(newsId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting news: ${error}` });
  }
};

const handleEditNews = async (req: Request, res: Response) => {
  const newsId = Number(req.query.newsId);
  const title = req.query.title as string;
  const content = req.query.content as string;
  const image = req.query.image as string;
  const link = req.query.link as string;

  if (isNaN(newsId) || !title || !content || !image || !link) {
    return res.status(400).json({ errCode: 2, error: 'Invalid news ID or missing parameters' });
  }

  try {
    const result = await editNews({ newsId, title, content, image, link });
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, news: result.news });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in editing news: ${error}` });
  }
};

const handleGetAllNews = async (req: Request, res: Response) => {
  try {
    const result = await getAllNews();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, news: result.news });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting news: ${error}` });
  }
};

const handleGetNewsById = async (req: Request, res: Response) => {
  const newsId = Number(req.query.newsId);
  if (isNaN(newsId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid news ID' });
  }
  try {
    const result = await getNewsById(newsId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, news: result.news });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting news: ${error}` });
  }
};

export default {
  handleCreateNews,
  handleDeleteNews,
  handleEditNews,
  handleGetAllNews,
  handleGetNewsById,
};
