import News from '../models/News';

export const createNews = async (title: string, content: string) => {
  try {
    const newNews = await News.create({ title, content });
    return newNews;
  } catch (error) {
    throw error;
  }
};

export const getAllNews = async () => {
  try {
    const news = await News.findAll({
      attributes: ['postId', 'title', 'content', 'postDate'],
    });
    return news;
  } catch (error) {
    throw error;
  }
};

export const getNewsById = async (postId: number) => {
  try {
    const news = await News.findByPk(postId, {
      attributes: ['postId', 'title', 'content', 'postDate'],
    });
    return news;
  } catch (error) {
    throw error;
  }
};

export const deleteNews = async (postId: number) => {
  try {
    const news = await News.findByPk(postId);
    if (!news) {
      throw new Error('News post not found');
    }
    await news.destroy();
  } catch (error) {
    throw error;
  }
};
