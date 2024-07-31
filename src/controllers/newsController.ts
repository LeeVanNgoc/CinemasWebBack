import { Request, Response } from 'express';
import { createNews, deleteNews, editNews, getAllNews, getNewsById } from '../services/newsService';

const handleCreateNews = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await createNews(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, news: result.news });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating news: ${error}` });
  }
};

const handleDeleteNews = async (req: Request, res: Response) => {
  const newsId = parseInt(req.query.id as string);
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
  const newsId = parseInt(req.query.id as string);
  if (isNaN(newsId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid news ID' });
  }
  const data = { ...req.body, id: newsId };
  try {
    const result = await editNews(data);
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
  const newsId = parseInt(req.query.id as string);
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
  handleGetNewsById
};
