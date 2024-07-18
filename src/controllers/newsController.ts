import { Request, Response } from 'express';
import { createNews, deleteNews, getAllNews, getNewsById } from '../services/newsService';

const handleCreateNews = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const newNews = await createNews(title, content);
    res.status(201).json({ message: 'News created successfully', news: newNews });
  } catch (error) {
    console.error('Error handling create news request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetAllNews = async (req: Request, res: Response) => {
  try {
    const news = await getAllNews();
    res.status(200).json({ news });
  } catch (error) {
    console.error('Error handling get all news request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleGetNewsById = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  try {
    const news = await getNewsById(postId);
    if (!news) {
      return res.status(404).json({ error: 'News not found!' });
    }
    res.status(200).json({ news });
  } catch (error) {
    console.error('Error handling get news by id request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDeleteNews = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  try {
    await deleteNews(postId);
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error handling delete news request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  handleCreateNews,
  handleGetAllNews,
  handleGetNewsById,
  handleDeleteNews,
};
