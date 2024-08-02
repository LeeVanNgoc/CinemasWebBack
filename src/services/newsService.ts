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
      image: data.image,
    });

    return {
      errCode: 0,
      message: 'News created successfully',
      news: newNews
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating news: ${error}`
    };
  }
};

export const deleteNews = async (newsId: number) => {
  try {
    const news = await News.findOne({ where: { postId: newsId } });
    if (!news) {
      return { errCode: 1, message: "News not found" };
    } else {
      await news.destroy();
      return { errCode: 0, message: "News deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting news: ${error}`
    };
  }
};

export const editNews = async (data: any) => {
  try {
    const { id, title, content } = data;
    if (!id) {
      return { errCode: 4, message: 'Missing required parameters: id' };
    }

    const news = await News.findOne({ where: { postId: id } });
    if (!news) {
      return { errCode: 1, message: 'News not found!' };
    }

    if (title) {
      news.title = title;
    }
    if (content) {
      news.content = content;
    }

    await news.save();

    return {
      errCode: 0,
      message: 'Update the news succeeds!',
      news
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating news: ${error}`
    };
  }
};

export const getAllNews = async () => {
  try {
    const news = await News.findAll({
      attributes: ['postId', 'title', 'content', 'postDate', 'image'],
      raw: true,
    });
    return {
      errCode: 0,
      message: 'Get all news success',
      news: news
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting news: ${error}`
    };
  }
};

export const getNewsById = async (newsId: number) => {
  try {
    const news = await News.findOne({
      where: { postId: newsId },
      attributes: ['postId', 'title', 'content', 'postDate', 'image'],
      raw: true,
    });
    if (!news) {
      return {
        errCode: 1,
        message: 'News not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get news success',
      news: news
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting news: ${error}`
    };
  }
};
