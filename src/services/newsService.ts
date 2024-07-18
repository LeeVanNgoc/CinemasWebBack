import News from '../models/News';


export const createNews = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newNews = await News.create({
        title: data.title,
        content: data.content,
        postDate: new Date(),
      });
      resolve(newNews);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteNews = async (newsId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await News.findOne({ where: { postId: newsId } });

      if (!news) {
        resolve({ errorCode: 1, errorMessage: "Not found news" });
      } else {
        await news.destroy();
        resolve({ errorCode: 0, errorMessage: "News deleted successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const editNews = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const news = await News.findOne({ where: { postId: id } });

      if (!news) {
        return resolve({ error: 'News not found!' });
      } else {
        news.title = data.title || news.title;
        news.content = data.content || news.content;
        await news.save();
      }

      resolve({ message: 'Update the news succeeds!', news });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllNews = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await News.findAll({
        attributes: ['postId', 'title', 'content', 'postDate'],
        raw: true,
      });
      resolve(news);
    } catch (error) {
      reject(error);
    }
  });
};

export const getNewsById = async (newsId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await News.findOne({
        where: { postId: newsId },
        attributes: ['postId', 'title', 'content', 'postDate'],
        raw: true,
      });
      resolve(news);
    } catch (error) {
      reject(error);
    }
  });
};
