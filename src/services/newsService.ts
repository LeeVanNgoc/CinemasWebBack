import News from '../models/News';

export const createNews = async (data: any) => {
  try {
    const existingIds = await News.findAll({
      attributes: ['postId'],
      order: [['postId', 'ASC']],
      raw: true
    });

    let newId = 1;
    for (let i = 0; i < existingIds.length; i++) {
      if (existingIds[i].postId !== newId) {
        break;
      }
      newId++;
    }

    const newNews = await News.create({
      postId: newId,
      title: data.title,
      content: data.content,
      postDate: new Date(),
    });

    return newNews;
  } catch (error) {
    throw error;
  }
};

export const deleteNews = async (newsId: number) => {
  try {
    const news = await News.findOne({ where: { postId: newsId } });
    if (!news) {
      return { errorCode: 1, errorMessage: "Not found news" };
    } else {
      await news.destroy();
      return { errorCode: 0, errorMessage: "News deleted successfully" };
    }
  } catch (error) {
    throw error;
  }
};

export const editNews = async (data: any) => {
  try {
    const { id, title, content } = data;
    if (!id) {
      throw new Error('Missing required parameters: id');
    }

    const news = await News.findOne({ where: { postId: id } });
    if (!news) {
      throw new Error('News not found!');
    }

    if (title) {
      news.title = title;
    }
    if (content) {
      news.content = content;
    }

    await news.save();

    return { message: 'Update the news succeeds!', news };
  } catch (error) {
    throw error;
  }
};


export const getAllNews = async () => {
  try {
    const news = await News.findAll({
      attributes: ['postId', 'title', 'content', 'postDate'],
      raw: true,
    });
    return news;
  } catch (error) {
    throw error;
  }
};

export const getNewsById = async (newsId: number) => {
  try {
    const news = await News.findOne({
      where: { postId: newsId },
      attributes: ['postId', 'title', 'content', 'postDate'],
      raw: true,
    });
    if (!news) {
      throw new Error('News not found');
    }
    return news;
  } catch (error) {
    throw error;
  }
};