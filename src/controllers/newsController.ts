import { Request, Response } from 'express';
import { createNews, deleteNews, editNews, getAllNews, getNewsById } from '../services/newsService';

const handleCreateNews = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newNews = await createNews(data);
    res.status(201).json({ message: 'News created successfully', news: newNews });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong in creating news' });
  }
};

const handleDeleteNews = async (req: Request, res: Response) => {
  const newsId = parseInt(req.params.id);
  try {
    const result: any = await deleteNews(newsId);
    if (result.errorCode) {
      return res.status(404).json({ error: result.errorMessage });
    }
    res.status(200).json({ message: result.errorMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleEditNews = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result: any = await editNews(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, news: result.news });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetAllNews = async (req: Request, res: Response) => {
  try {
    const data = await getAllNews();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetNewsById = async (req: Request, res: Response) => {
  const newsId = parseInt(req.params.id);
  try {
    const data = await getNewsById(newsId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  handleCreateNews,
  handleDeleteNews,
  handleEditNews,
  handleGetAllNews,
  handleGetNewsById
};
